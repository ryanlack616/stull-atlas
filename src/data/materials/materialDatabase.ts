/**
 * Material Database
 * 
 * Loads and manages material oxide analyses from multiple datasets
 */

import { Material, MaterialDatasetId, OxideSymbol } from '@/types'
import digitalfireData from './digitalfire.json'

/**
 * In-memory material database
 */
class MaterialDatabase {
  private materials: Map<string, Material> = new Map()
  private aliases: Map<string, string> = new Map()  // alias -> canonical id
  private analyses: Map<string, Map<MaterialDatasetId, Record<OxideSymbol, number>>> = new Map()

  constructor() {
    this.loadDigitalfire()
  }

  /**
   * Load Digitalfire material data
   */
  private loadDigitalfire() {
    const data = digitalfireData as any

    for (const mat of data.materials) {
      const material: Material = {
        id: mat.id,
        primaryName: mat.primaryName,
        aliases: mat.aliases || [],
        category: mat.category,
        analyses: new Map(),
        defaultDataset: 'digitalfire_2024'
      }

      // Store analysis
      const analysis: Record<string, number> = {}
      for (const [oxide, value] of Object.entries(mat.analysis)) {
        analysis[oxide as OxideSymbol] = value as number
      }

      if (!this.analyses.has(mat.id)) {
        this.analyses.set(mat.id, new Map())
      }
      this.analyses.get(mat.id)!.set('digitalfire_2024', analysis as Record<OxideSymbol, number>)

      // Store material
      this.materials.set(mat.id, material)

      // Build alias map
      this.aliases.set(mat.primaryName.toLowerCase(), mat.id)
      for (const alias of mat.aliases || []) {
        this.aliases.set(alias.toLowerCase(), mat.id)
      }
    }
  }

  /**
   * Resolve a material name to its canonical form
   */
  resolve(name: string, datasetId: MaterialDatasetId): Material | null {
    const normalized = name.toLowerCase().trim()
    if (!normalized) return null

    // Try exact match first
    const id = this.aliases.get(normalized)
    if (id) {
      return this.materials.get(id) || null
    }

    // Scored fuzzy match — prefer exact, starts-with, then contains
    // Require minimum 3 characters to avoid false positives
    if (normalized.length < 3) return null

    let bestMatch: { materialId: string; score: number } | null = null

    for (const [alias, materialId] of this.aliases) {
      let score = 0

      if (alias === normalized) {
        score = 100  // exact (already handled above, but just in case)
      } else if (alias.startsWith(normalized)) {
        score = 80 - (alias.length - normalized.length)  // shorter alias = better
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

    return bestMatch ? (this.materials.get(bestMatch.materialId) || null) : null
  }

  /**
   * Get oxide analysis for a material from a specific dataset
   */
  getAnalysis(materialId: string, datasetId: MaterialDatasetId): Record<OxideSymbol, number> | null {
    const materialAnalyses = this.analyses.get(materialId)
    if (!materialAnalyses) return null

    // Try requested dataset first
    if (materialAnalyses.has(datasetId)) {
      return materialAnalyses.get(datasetId)!
    }

    // Fall back to any available dataset
    const firstAvailable = materialAnalyses.values().next().value
    return firstAvailable || null
  }

  /**
   * Get all materials
   */
  getAllMaterials(): Material[] {
    return Array.from(this.materials.values())
  }

  /**
   * Get material by ID
   */
  getMaterial(id: string): Material | null {
    return this.materials.get(id) || null
  }

  /**
   * Get available datasets
   */
  getDatasets(): MaterialDatasetId[] {
    const datasets = new Set<MaterialDatasetId>()
    for (const analyses of this.analyses.values()) {
      for (const datasetId of analyses.keys()) {
        datasets.add(datasetId)
      }
    }
    return Array.from(datasets)
  }

  /**
   * Get material count
   */
  getMaterialCount(): number {
    return this.materials.size
  }
}

// Singleton instance
export const materialDatabase = new MaterialDatabase()

export default materialDatabase
