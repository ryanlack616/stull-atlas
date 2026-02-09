/**
 * Hook: useImportExport
 *
 * Encapsulates file import (JSON / CSV) and export logic.
 * Lazy-loads the domain glaze service so it stays code-split.
 */

import { useState, useCallback, useRef } from 'react'
import { useGlazeStore, useRecipeStore } from '@/stores'

type GlazeService = typeof import('@/domain/glaze')

let servicePromise: Promise<GlazeService> | null = null

function getService(): Promise<GlazeService> {
  if (!servicePromise) {
    servicePromise = import('@/domain/glaze').catch((err) => {
      servicePromise = null // allow retry on next call
      throw err
    })
  }
  return servicePromise
}

export interface ImportResult {
  count: number
  errors: string[]
}

export function useImportExport() {
  const loadGlazes = useGlazeStore(s => s.loadGlazes)
  const getGlazesArray = useGlazeStore(s => s.getGlazesArray)
  const stats = useGlazeStore(s => s.stats)
  const recipes = useRecipeStore(s => s.recipes)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Import ────────────────────────────────────────────────

  const importFromFile = useCallback(
    async (file: File) => {
      const text = await file.text()
      const errors: string[] = []
      let imported: any[] = []

      try {
        const svc = await getService()

        // Smart import — auto-detect format from filename
        imported = svc.importGlazesFromFile(text, file.name)

        if (imported.length === 0) {
          errors.push('No valid glazes found in file')
        } else {
          const withUMF = svc.calculateAllUMF(imported)
          loadGlazes(withUMF)
        }
      } catch (err: any) {
        errors.push(err.message || 'Failed to parse file')
      }

      setImportResult({ count: imported.length, errors })
    },
    [loadGlazes],
  )

  const importFromJSON = useCallback(
    async (json: string) => {
      try {
        const svc = await getService()
        const imported = svc.importGlazesFromJSON(json)
        if (imported.length > 0) {
          const withUMF = svc.calculateAllUMF(imported)
          loadGlazes(withUMF)
          setImportResult({ count: imported.length, errors: [] })
        } else {
          setImportResult({ count: 0, errors: ['No valid glazes found'] })
        }
      } catch (err: any) {
        setImportResult({ count: 0, errors: [err.message] })
      }
    },
    [loadGlazes],
  )

  // ── Export ────────────────────────────────────────────────

  const exportAllGlazes = useCallback(async () => {
    const svc = await getService()
    const glazes = getGlazesArray()
    const json = svc.exportGlazesToJSON(glazes)
    downloadString(json, 'stull-atlas-glazes.json', 'application/json')
  }, [getGlazesArray])

  const exportSavedRecipes = useCallback(async () => {
    const svc = await getService()
    const json = svc.exportGlazesToJSON(recipes)
    downloadString(json, 'stull-atlas-saved-recipes.json', 'application/json')
  }, [recipes])

  return {
    importResult,
    importFromFile,
    importFromJSON,
    exportAllGlazes,
    exportSavedRecipes,
    fileInputRef,
    stats,
    recipes,
  }
}

// ── Helpers (private) ─────────────────────────────────────────

function downloadString(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
