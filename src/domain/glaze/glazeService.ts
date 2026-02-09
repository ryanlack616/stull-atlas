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

import { GlazeRecipe, OxideSymbol, UMF } from '@/types'
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
 * Batch-calculate UMF for every recipe.
 */
export function calculateAllUMF(
  recipes: GlazeRecipe[],
): GlazeRecipe[] {
  const results: GlazeRecipe[] = []

  for (const recipe of recipes) {
    const result = recipeToUMF(recipe, materialDatabase)

    if (result.value) {
      results.push({ ...recipe, umf: result.value, umfConfidence: result.confidence })
    } else {
      results.push({ ...recipe })
    }
  }

  return results
}

// ── Similarity ────────────────────────────────────────────────

export interface SimilarityResult {
  glaze: GlazeRecipe
  dist: number
}

export interface SimilarityOptions {
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
    weights = {},
    count = 6,
    oxides = DEFAULT_SIMILARITY_OXIDES,
  } = options

  const baseUmf = target.umf
  if (!baseUmf) return []

  const baseVec = oxides.map((o) => getOxideValue(baseUmf, o) || 0)
  const w = oxides.map((o) => weights[o] ?? 1)

  return candidates
    .filter((g) => g.id !== target.id)
    .map((g) => {
      const umf = g.umf
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
