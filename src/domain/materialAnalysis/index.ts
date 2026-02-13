/**
 * Material Analysis Service
 *
 * Domain layer for the multi-era material analysis system.
 * Loads analysis_sets.json and provides typed access to
 * per-material oxide weight-percent data from different eras/authorities.
 *
 * Analogous to domain/molarWeights but for the OTHER axis:
 * molar weights change HOW you convert wt% to moles,
 * analysis sets change WHAT wt% values you start with.
 */

import { OxideSymbol } from '@/types'
import database from '@/data/materials/analysis_sets.json'

// ─── Types ─────────────────────────────────────────────────────

/** IDs of analysis sets that have populated material data */
export type MaterialAnalysisSetId = 'app_default' | 'digitalfire_2024' | string

export interface MaterialAnalysisSetInfo {
  id: MaterialAnalysisSetId
  name: string
  year: number
  source: string
  authority: string
  status: string
  notes: string
  materialCount: number
}

/** Per-material override: oxide wt% analysis and LOI */
export interface MaterialAnalysisOverride {
  analysis: Partial<Record<OxideSymbol, number>>
  loi?: number
}

// ─── Database access ───────────────────────────────────────────

interface RawAnalysisSet {
  set_id: string
  name: string
  year: number
  source: string
  authority: string
  status: string
  notes?: string
  materials: Record<string, {
    analysis: Record<string, number>
    loi?: number
  }>
}

const allSets = (database as unknown as { analysis_sets: RawAnalysisSet[] }).analysis_sets

/** Only sets with actual material data OR the app_default (always shown) */
const availableSets = allSets.filter(
  (s) => s.status === 'populated' || s.set_id === 'app_default'
)

// ─── Pre-built override maps ───────────────────────────────────

type OverrideMap = Map<string, MaterialAnalysisOverride>

/** Cache: setId → Map<materialId, override> */
const overrideCache = new Map<MaterialAnalysisSetId, OverrideMap>()

// app_default has no overrides — it uses the built-in digitalfire.json values
overrideCache.set('app_default', new Map())

// Build override maps for populated sets
for (const rawSet of allSets) {
  if (rawSet.set_id === 'app_default') continue
  if (rawSet.status !== 'populated') continue

  const overrides: OverrideMap = new Map()
  for (const [matId, data] of Object.entries(rawSet.materials)) {
    overrides.set(matId, {
      analysis: data.analysis as Partial<Record<OxideSymbol, number>>,
      loi: data.loi,
    })
  }
  overrideCache.set(rawSet.set_id as MaterialAnalysisSetId, overrides)
}

// ─── Public API ────────────────────────────────────────────────

/**
 * Get all available analysis sets.
 * Always includes 'app_default' first.
 */
export function getAnalysisSetInfos(): MaterialAnalysisSetInfo[] {
  return availableSets.map((rawSet) => ({
    id: rawSet.set_id as MaterialAnalysisSetId,
    name: rawSet.name,
    year: rawSet.year,
    source: rawSet.source,
    authority: rawSet.authority,
    status: rawSet.status,
    notes: rawSet.notes ?? '',
    materialCount: Object.keys(rawSet.materials).length,
  }))
}

/**
 * Get all analysis overrides for a given set.
 * Returns a Map of materialId → { analysis, loi }.
 * For 'app_default', returns an empty map (no overrides).
 */
export function getAnalysisOverrides(id: MaterialAnalysisSetId): OverrideMap {
  return overrideCache.get(id) ?? new Map()
}

/**
 * Get a specific material's analysis from a given set.
 * Returns null if the set doesn't override that material.
 */
export function getMaterialAnalysisForSet(
  setId: MaterialAnalysisSetId,
  materialId: string,
): MaterialAnalysisOverride | null {
  const overrides = overrideCache.get(setId)
  if (!overrides) return null
  return overrides.get(materialId) ?? null
}

/**
 * Get the default analysis set ID.
 */
export function getDefaultAnalysisSetId(): MaterialAnalysisSetId {
  return 'app_default'
}

/**
 * Get all populated set IDs in display order.
 */
export function getAnalysisSetIds(): MaterialAnalysisSetId[] {
  return availableSets.map(s => s.set_id as MaterialAnalysisSetId)
}

/**
 * Compare two analysis sets for a specific material.
 * Returns per-oxide differences where values diverge.
 */
export function compareAnalysisSets(
  a: MaterialAnalysisSetId,
  b: MaterialAnalysisSetId,
  materialId: string,
): { oxide: string; a: number; b: number; diff: number }[] {
  const overridesA = overrideCache.get(a)
  const overridesB = overrideCache.get(b)

  const matA = overridesA?.get(materialId)
  const matB = overridesB?.get(materialId)

  if (!matA && !matB) return []

  // Collect all oxides mentioned in either set
  const allOxides = new Set<string>()
  if (matA) Object.keys(matA.analysis).forEach(o => allOxides.add(o))
  if (matB) Object.keys(matB.analysis).forEach(o => allOxides.add(o))

  return Array.from(allOxides).map(oxide => {
    const va = matA?.analysis[oxide as OxideSymbol] ?? 0
    const vb = matB?.analysis[oxide as OxideSymbol] ?? 0
    return { oxide, a: va, b: vb, diff: vb - va }
  }).filter(d => Math.abs(d.diff) > 0.001)
}
