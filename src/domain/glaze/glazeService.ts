/**
 * Domain: Glaze Service
 *
 * Pure business logic for glaze operations:
 *  - Loading datasets
 *  - Importing / exporting
 *  - UMF calculation
 *  - Similarity search
 *
 * Depends on infra/ for data access, calculator/ for math.
 * No React, no Zustand, no DOM.
 */

import { GlazeRecipe, MaterialDatasetId, OxideSymbol, UMF } from '@/types'
import { recipeToUMF, getOxideValue } from '@/calculator/umf'
import {
  loadGlazyDataset,
  deserializeGlazesJSON,
  serializeGlazesJSON,
  deserializeGlazesCSV,
  deserializeInsightXML,
  isGlazyCSV,
  deserializeGlazyCSV,
} from '@/infra/glazes'
import { materialDatabase } from '@/infra/materials'

// ── Data loading ──────────────────────────────────────────────

export { loadGlazyDataset }

// ── Import / Export ───────────────────────────────────────────

export function importGlazesFromJSON(json: string): GlazeRecipe[] {
  return deserializeGlazesJSON(json)
}

export function exportGlazesToJSON(recipes: GlazeRecipe[]): string {
  return serializeGlazesJSON(recipes)
}

export function importGlazesFromCSV(csv: string): GlazeRecipe[] {
  // Auto-detect Glazy's native CSV format
  const firstLine = csv.split('\n')[0] ?? ''
  if (isGlazyCSV(firstLine)) {
    return deserializeGlazyCSV(csv)
  }
  return deserializeGlazesCSV(csv)
}

/**
 * Import from Insight XML format
 */
export function importGlazesFromXML(xml: string): GlazeRecipe[] {
  return deserializeInsightXML(xml)
}

/**
 * Smart import — auto-detect format from file extension + content.
 */
export function importGlazesFromFile(text: string, filename: string): GlazeRecipe[] {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.xml')) return importGlazesFromXML(text)
  if (lower.endsWith('.csv')) return importGlazesFromCSV(text)
  if (lower.endsWith('.json')) return importGlazesFromJSON(text)
  // Try JSON first, fall back to CSV
  try { return importGlazesFromJSON(text) } catch { /* ignore */ }
  try { return importGlazesFromCSV(text) } catch { /* ignore */ }
  return []
}

// ── UMF Calculation ───────────────────────────────────────────

/**
 * Batch-calculate UMF for every recipe across the given datasets.
 */
export function calculateAllUMF(
  recipes: GlazeRecipe[],
  datasetIds: MaterialDatasetId[] = ['digitalfire_2024'],
): GlazeRecipe[] {
  const results: GlazeRecipe[] = []

  for (const recipe of recipes) {
    const updatedRecipe = { ...recipe, umf: new Map(recipe.umf) }

    for (const datasetId of datasetIds) {
      const result = recipeToUMF(recipe, materialDatabase, datasetId)

      if (result.value) {
        updatedRecipe.umf.set(datasetId, result.value)
        updatedRecipe.umfConfidence = result.confidence
      }
    }

    results.push(updatedRecipe)
  }

  return results
}

// ── Similarity ────────────────────────────────────────────────

export interface SimilarityResult {
  glaze: GlazeRecipe
  dist: number
}

export interface SimilarityOptions {
  /** Which dataset's UMF to compare */
  datasetId: string
  /** Per-oxide weighting (default 1.0 each) */
  weights?: Partial<Record<OxideSymbol, number>>
  /** How many results to return */
  count?: number
  /** Oxides to compare on */
  oxides?: OxideSymbol[]
}

const DEFAULT_SIMILARITY_OXIDES: OxideSymbol[] = [
  'SiO2', 'Al2O3', 'B2O3', 'Na2O', 'K2O',
  'CaO', 'MgO', 'ZnO', 'SrO', 'BaO',
]

/**
 * Find the N most similar glazes to `target` using weighted Euclidean distance.
 */
export function findSimilarGlazes(
  target: GlazeRecipe,
  candidates: GlazeRecipe[],
  options: SimilarityOptions,
): SimilarityResult[] {
  const {
    datasetId,
    weights = {},
    count = 6,
    oxides = DEFAULT_SIMILARITY_OXIDES,
  } = options

  const baseUmf = target.umf.get(datasetId)
  if (!baseUmf) return []

  const baseVec = oxides.map((o) => getOxideValue(baseUmf, o) || 0)
  const w = oxides.map((o) => weights[o] ?? 1)

  return candidates
    .filter((g) => g.id !== target.id)
    .map((g) => {
      const umf = g.umf.get(datasetId)
      if (!umf) return null
      const vec = oxides.map((o) => getOxideValue(umf, o) || 0)
      const dist = Math.sqrt(
        vec.reduce((sum, v, i) => sum + w[i] * (v - baseVec[i]) ** 2, 0),
      )
      return { glaze: g, dist }
    })
    .filter((v): v is SimilarityResult => v !== null)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, count)
}
