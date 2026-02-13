/**
 * Infra: Material Database
 *
 * Loads oxide-analysis data from bundled datasets and exposes
 * lookup / fuzzy-matching / analysis retrieval.
 */

import { Material, OxideSymbol } from '@/types'
import digitalfireData from '@/data/materials/digitalfire.json'

class MaterialDatabase {
  private materials: Map<string, Material> = new Map()
  private aliases: Map<string, string> = new Map() // alias → canonical id
  private analyses: Map<string, Record<OxideSymbol, number>> = new Map()
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
        this.analyses.set(mat.id, analysis as Record<OxideSymbol, number>)
      }

      this.materials.set(mat.id, material)

      this.aliases.set(mat.primaryName.toLowerCase(), mat.id)
      for (const alias of mat.aliases || []) {
        this.aliases.set(alias.toLowerCase(), mat.id)
      }
    }
  }

  // ── Public API ─────────────────────────────────────────────

  resolve(name: string): Material | null {
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

  getAnalysis(materialId: string): Record<OxideSymbol, number> | null {
    return this.analyses.get(materialId) ?? null
  }

  getAllMaterials(): Material[] {
    return Array.from(this.materials.values())
  }

  getMaterial(id: string): Material | null {
    return this.materials.get(id) || null
  }

  getMaterialCount(): number {
    return this.materials.size
  }

  getLoi(materialId: string): number | null {
    return this.lois.get(materialId) ?? null
  }

  // ── Analysis set overrides ─────────────────────────────────

  /** Original analyses from digitalfire.json — never mutated */
  private baseAnalyses: Map<string, Record<OxideSymbol, number>> = new Map()
  private baseLois: Map<string, number> = new Map()
  private overridesActive = false

  /**
   * Snapshot the current (base) analyses so we can restore later.
   * Called once, lazily, before the first override is applied.
   */
  private snapshotBase() {
    if (this.baseAnalyses.size > 0) return // already snapshotted
    for (const [id, analysis] of this.analyses) {
      this.baseAnalyses.set(id, { ...analysis })
    }
    for (const [id, loi] of this.lois) {
      this.baseLois.set(id, loi)
    }
  }

  /**
   * Apply analysis overrides from a material analysis set.
   * Pass an empty map to restore base values (app_default).
   *
   * Only modifies materials that exist in the override map —
   * all other materials keep their base values.
   */
  setAnalysisOverrides(
    overrides: Map<string, { analysis: Partial<Record<OxideSymbol, number>>; loi?: number }>
  ) {
    this.snapshotBase()

    // Start from base values
    for (const [id, analysis] of this.baseAnalyses) {
      this.analyses.set(id, { ...analysis })
    }
    for (const [id, loi] of this.baseLois) {
      this.lois.set(id, loi)
    }

    // Apply overrides on top
    if (overrides.size > 0) {
      for (const [materialId, override] of overrides) {
        if (!this.materials.has(materialId)) continue

        // Merge override analysis with base — override wins
        const base = this.baseAnalyses.get(materialId)
        const merged = base ? { ...base, ...override.analysis } : { ...override.analysis }
        this.analyses.set(materialId, merged as Record<OxideSymbol, number>)

        if (override.loi !== undefined) {
          this.lois.set(materialId, override.loi)
        }
      }
      this.overridesActive = true
    } else {
      this.overridesActive = false
    }
  }

  /** Whether non-default analysis overrides are currently active */
  hasActiveOverrides(): boolean {
    return this.overridesActive
  }
}

/** Singleton — eagerly created at import time */
export const materialDatabase = new MaterialDatabase()

export default materialDatabase

export type { MaterialDatabase }
