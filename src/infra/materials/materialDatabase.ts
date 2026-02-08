/**
 * Infra: Material Database
 *
 * Loads oxide-analysis data from bundled datasets and exposes
 * lookup / fuzzy-matching / analysis retrieval.
 */

import { Material, MaterialDatasetId, OxideSymbol } from '@/types'
import digitalfireData from '@/data/materials/digitalfire.json'

class MaterialDatabase {
  private materials: Map<string, Material> = new Map()
  private aliases: Map<string, string> = new Map() // alias → canonical id
  private analyses: Map<string, Map<MaterialDatasetId, Record<OxideSymbol, number>>> = new Map()
  private lois: Map<string, number> = new Map() // LOI per material

  constructor() {
    this.loadDigitalfire()
  }

  // ── Private loaders ────────────────────────────────────────

  private loadDigitalfire() {
    const data = digitalfireData as any

    for (const mat of data.materials) {
      const material: Material = {
        id: mat.id,
        primaryName: mat.primaryName,
        aliases: mat.aliases || [],
        category: mat.category,
        defaultDataset: 'digitalfire_2024',
        discontinued: mat.discontinued || false,
      }

      if (mat.loi !== undefined) {
        this.lois.set(mat.id, mat.loi)
      }

      const analysis: Record<string, number> = {}
      for (const [oxide, value] of Object.entries(mat.analysis)) {
        analysis[oxide as OxideSymbol] = value as number
      }

      if (!this.analyses.has(mat.id)) {
        this.analyses.set(mat.id, new Map())
      }
      this.analyses.get(mat.id)!.set('digitalfire_2024', analysis as Record<OxideSymbol, number>)

      this.materials.set(mat.id, material)

      this.aliases.set(mat.primaryName.toLowerCase(), mat.id)
      for (const alias of mat.aliases || []) {
        this.aliases.set(alias.toLowerCase(), mat.id)
      }
    }
  }

  // ── Public API ─────────────────────────────────────────────

  resolve(name: string, datasetId: MaterialDatasetId): Material | null {
    const normalized = name.toLowerCase().trim()
    if (!normalized) return null

    const id = this.aliases.get(normalized)
    if (id) return this.materials.get(id) || null

    if (normalized.length < 3) return null

    let bestMatch: { materialId: string; score: number } | null = null

    for (const [alias, materialId] of this.aliases) {
      let score = 0

      if (alias === normalized) {
        score = 100
      } else if (alias.startsWith(normalized)) {
        score = 80 - (alias.length - normalized.length)
      } else if (normalized.startsWith(alias) && alias.length >= 4) {
        score = 60 - (normalized.length - alias.length)
      } else if (alias.includes(normalized) && normalized.length >= 4) {
        score = 40 - (alias.length - normalized.length)
      } else {
        continue
      }

      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { materialId, score }
      }
    }

    return bestMatch ? this.materials.get(bestMatch.materialId) || null : null
  }

  getAnalysis(materialId: string, datasetId: MaterialDatasetId): Record<OxideSymbol, number> | null {
    const materialAnalyses = this.analyses.get(materialId)
    if (!materialAnalyses) return null

    if (materialAnalyses.has(datasetId)) return materialAnalyses.get(datasetId)!

    const firstAvailable = materialAnalyses.values().next().value
    return firstAvailable || null
  }

  getAllMaterials(): Material[] {
    return Array.from(this.materials.values())
  }

  getMaterial(id: string): Material | null {
    return this.materials.get(id) || null
  }

  getDatasets(): MaterialDatasetId[] {
    const datasets = new Set<MaterialDatasetId>()
    for (const analyses of this.analyses.values()) {
      for (const datasetId of analyses.keys()) {
        datasets.add(datasetId)
      }
    }
    return Array.from(datasets)
  }

  getMaterialCount(): number {
    return this.materials.size
  }

  getLoi(materialId: string): number | null {
    return this.lois.get(materialId) ?? null
  }
}

/** Singleton — eagerly created at import time */
export const materialDatabase = new MaterialDatabase()

export default materialDatabase

export type { MaterialDatabase }
