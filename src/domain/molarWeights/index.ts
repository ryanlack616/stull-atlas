/**
 * Molar Weight Service
 *
 * Domain layer for the multi-era molar weight system.
 * Loads the comprehensive database (1912-2024) and provides
 * typed access to populated weight sets.
 *
 * Key insight: molecular weights are NOT constants — they change
 * across eras, authorities, and rounding conventions. This service
 * lets the calculator layer swap weight sets dynamically.
 */

import { OxideSymbol, UMF } from '@/types'
import database from '@/data/molar_weights_database.json'

// ─── Types ─────────────────────────────────────────────────────

/** IDs of weight sets that have populated oxide data */
export type MolarWeightSetId =
  | 'crc_2003'
  | 'iupac_2021'
  | 'iupac_2023'
  | 'glazy_current'
  | 'digitalfire_current'
  | 'app_default'

export interface MolarWeightSetInfo {
  id: MolarWeightSetId
  name: string
  year: number | null
  source: string
  authority: string
  notes: string
  oxideCount: number
}

/** The shape every consumer needs: OxideSymbol → g/mol */
export type MolarWeights = Record<OxideSymbol, number>

// ─── Constants ─────────────────────────────────────────────────

/**
 * The 27 OxideSymbol keys the app tracks.
 * Used to subset the larger oxide maps in the database.
 */
const APP_OXIDES: OxideSymbol[] = [
  'Li2O', 'Na2O', 'K2O',
  'MgO', 'CaO', 'SrO', 'BaO', 'ZnO', 'PbO',
  'Al2O3', 'B2O3', 'Fe2O3',
  'SiO2', 'TiO2', 'ZrO2', 'SnO2',
  'MnO', 'MnO2', 'NiO', 'CuO', 'Cu2O', 'CoO', 'Cr2O3', 'P2O5', 'F',
]

/**
 * Current hardcoded values from constants.ts — the implicit "app default".
 * Serves as fallback when a database set is missing an oxide.
 */
const APP_DEFAULT_WEIGHTS: MolarWeights = {
  Li2O:   29.88,
  Na2O:   61.98,
  K2O:    94.20,
  MgO:    40.30,
  CaO:    56.08,
  SrO:   103.62,
  BaO:   153.33,
  ZnO:    81.38,
  PbO:   223.20,
  Al2O3: 101.96,
  B2O3:   69.62,
  Fe2O3: 159.69,
  SiO2:   60.08,
  TiO2:   79.87,
  ZrO2:  123.22,
  SnO2:  150.71,
  MnO:    70.94,
  MnO2:   86.94,
  NiO:    74.69,
  CuO:    79.55,
  Cu2O:  143.09,
  CoO:    74.93,
  Cr2O3: 151.99,
  P2O5:  141.94,
  F:      19.00,
}

// ─── Database access ───────────────────────────────────────────

interface RawWeightSet {
  set_id: string
  name: string
  year: number | null
  source: string
  authority: string
  status: string
  notes?: string
  oxides: Record<string, number>
}

const allSets = (database as unknown as { molar_weight_sets: RawWeightSet[] }).molar_weight_sets

/** Only sets with actual oxide data */
const populatedSets = allSets.filter(
  (s) => s.status === 'populated' && Object.keys(s.oxides).length > 0
)

// ─── Pre-built weight maps ─────────────────────────────────────

/**
 * Convert a raw oxide map from the database to Record<OxideSymbol, number>,
 * falling back to APP_DEFAULT_WEIGHTS for any missing oxide.
 */
function buildWeights(raw: Record<string, number>): MolarWeights {
  const result = { ...APP_DEFAULT_WEIGHTS }
  for (const oxide of APP_OXIDES) {
    if (oxide in raw) {
      result[oxide] = raw[oxide]
    }
    // Special case: "F" in the database might be stored differently
    // The JSON stores fluorine under its element key — check both
  }
  return result
}

/** Cache: setId → MolarWeights */
const weightCache = new Map<MolarWeightSetId, MolarWeights>()

// Pre-populate the app_default entry
weightCache.set('app_default', APP_DEFAULT_WEIGHTS)

// Pre-populate from database
for (const rawSet of populatedSets) {
  const id = rawSet.set_id as MolarWeightSetId
  weightCache.set(id, buildWeights(rawSet.oxides))
}

// ─── Public API ────────────────────────────────────────────────

/**
 * Get all available molar weight sets (populated only).
 * Always includes 'app_default'.
 */
export function getMolarWeightSetInfos(): MolarWeightSetInfo[] {
  const infos: MolarWeightSetInfo[] = [
    {
      id: 'app_default',
      name: 'App Default (≈ IUPAC 2023 Rounded)',
      year: 2023,
      source: 'Stull Atlas',
      authority: 'app',
      notes: 'Current hardcoded values — close to IUPAC 2023 with practical rounding',
      oxideCount: APP_OXIDES.length,
    },
  ]

  for (const rawSet of populatedSets) {
    infos.push({
      id: rawSet.set_id as MolarWeightSetId,
      name: rawSet.name,
      year: rawSet.year,
      source: rawSet.source,
      authority: rawSet.authority,
      notes: rawSet.notes ?? '',
      oxideCount: Object.keys(rawSet.oxides).length,
    })
  }

  return infos
}

/**
 * Get a specific molar weight set by ID.
 * Returns the full Record<OxideSymbol, number> ready for the calculator.
 */
export function getMolarWeights(id: MolarWeightSetId): MolarWeights {
  const cached = weightCache.get(id)
  if (cached) return cached
  // Fallback — shouldn't happen for known IDs
  return APP_DEFAULT_WEIGHTS
}

/**
 * Get the default molar weights (matches current constants.ts).
 */
export function getDefaultWeights(): MolarWeights {
  return APP_DEFAULT_WEIGHTS
}

/**
 * Get all populated set IDs in display order.
 */
export function getMolarWeightSetIds(): MolarWeightSetId[] {
  return ['app_default', ...populatedSets.map(s => s.set_id as MolarWeightSetId)]
}

/**
 * Compare two weight sets, returning per-oxide differences.
 * Useful for the UI to highlight what actually changes.
 */
export function compareWeightSets(
  a: MolarWeightSetId,
  b: MolarWeightSetId,
): { oxide: OxideSymbol; a: number; b: number; diff: number; pctDiff: number }[] {
  const wa = getMolarWeights(a)
  const wb = getMolarWeights(b)
  return APP_OXIDES.map(oxide => {
    const va = wa[oxide]
    const vb = wb[oxide]
    return {
      oxide,
      a: va,
      b: vb,
      diff: vb - va,
      pctDiff: va !== 0 ? ((vb - va) / va) * 100 : 0,
    }
  }).filter(d => Math.abs(d.diff) > 0.0001)
}

// ─── UMF Recomputation ────────────────────────────────────────

/**
 * Recompute a UMF from one molar-weight set to another.
 *
 * Math: Given a UMF computed with MW_from, recover relative oxide
 * weights (weight_i ∝ UMF_i × MW_from_i), then re-derive moles
 * with MW_to and re-normalise so that flux oxides sum to 1.0.
 *
 *   moles_new_i  = UMF_old_i × MW_from_i / MW_to_i
 *   Σ_flux_new   = Σ(moles_new for flux oxides)
 *   UMF_new_i    = moles_new_i / Σ_flux_new
 */
export function recomputeUMF(
  umf: UMF,
  fromSetId: MolarWeightSetId,
  toSetId: MolarWeightSetId,
): UMF {
  if (fromSetId === toSetId) return umf

  const fromW = getMolarWeights(fromSetId)
  const toW   = getMolarWeights(toSetId)

  // Step 1: compute raw moles under the new weight set
  const rawMoles: Partial<Record<OxideSymbol, number>> = {}
  for (const oxide of APP_OXIDES) {
    const ov = umf[oxide]
    if (!ov || ov.value === 0) continue
    rawMoles[oxide] = ov.value * (fromW[oxide] / toW[oxide])
  }

  // Step 2: sum flux moles for re-normalisation
  let fluxSum = 0
  for (const oxide of RECOMPUTE_FLUX_OXIDES) {
    fluxSum += rawMoles[oxide] ?? 0
  }
  if (fluxSum === 0) fluxSum = 1 // degenerate — no flux

  // Step 3: build new UMF
  const result: UMF = {}
  for (const oxide of APP_OXIDES) {
    const ov = umf[oxide]
    if (!ov || ov.value === 0) continue
    result[oxide] = {
      ...ov,
      value: (rawMoles[oxide] ?? 0) / fluxSum,
    }
  }

  return result
}

/** Flux oxides used for UMF normalisation — must match types/umf.ts FLUX_OXIDES */
const RECOMPUTE_FLUX_OXIDES: OxideSymbol[] = [
  'Li2O', 'Na2O', 'K2O',
  'MgO', 'CaO', 'SrO', 'BaO', 'ZnO', 'PbO',
]
