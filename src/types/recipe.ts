/**
 * Stull Atlas Glaze Recipe Standard — TypeScript Types
 *
 * Canonical type definitions for the complete glaze recipe schema.
 * Matches docs/glaze-recipe-schema.json (JSON Schema v1.0.0).
 *
 * ARCHITECTURE:
 *   - GlazeRecipeV2 is the FULL representation (storage, import/export, API)
 *   - GlazeRecipe (existing) remains for backward compat during migration
 *   - GlazePlotPoint (existing) remains the lightweight projection for rendering
 *
 * The schema covers 10 dimensions:
 *   1. Identity & Provenance
 *   2. Ingredients (with material resolution)
 *   3. Chemistry (wt%, mol%, UMF — all three representations)
 *   4. Firing context (cone, schedule, kiln, atmosphere)
 *   5. Outcomes (surface, color, defects, results)
 *   6. Calculated properties (COE, melt temp, Stull region, validation)
 *   7. Batch calculations (gram weights, water, SG)
 *   8. Lineage (parent, blend origin, revisions)
 *   9. Images & media
 *  10. Epistemic tracking on every section
 */

import { EpistemicState, OxideValue, CalculationStep } from './epistemic'
import { OxideSymbol, UMF } from './umf'

// ── Enums & Literals ────────────────────────────────────────────

export type Atmosphere =
  | 'oxidation' | 'reduction' | 'neutral'
  | 'soda' | 'salt' | 'wood' | 'raku'
  | 'unknown'

export type SurfaceTypeV2 =
  | 'glossy' | 'semi-glossy' | 'satin' | 'satin-matte' | 'semi-matte'
  | 'matte' | 'smooth-matte' | 'stony-matte' | 'dry-matte'
  | 'crystalline' | 'crawl' | 'crackle'
  | 'unknown'

export type Transparency = 'transparent' | 'translucent' | 'semi-opaque' | 'opaque' | 'unknown'

export type BaseType = 'glaze' | 'clay_body' | 'slip' | 'engobe' | 'overglaze' | 'underglaze' | 'refractory' | 'wash'

export type RecipeStatus = 'draft' | 'testing' | 'production' | 'archived' | 'discontinued'

export type KilnType = 'electric' | 'gas' | 'wood' | 'soda' | 'salt' | 'raku' | 'pit' | 'anagama' | 'noborigama' | 'other' | 'unknown'

export type ApplicationMethod = 'dip' | 'pour' | 'brush' | 'spray' | 'sponge' | 'trailer' | 'layered' | 'other' | 'unknown'

export type CoolingRate = 'crash' | 'fast' | 'moderate' | 'slow' | 'controlled-cooling' | 'unknown'

export type ChemistrySource = 'calculated' | 'analyzed' | 'declared' | 'imported'

export type DefectType =
  | 'crazing' | 'shivering' | 'crawling' | 'pinholing' | 'blistering'
  | 'dunting' | 'color-variation' | 'running' | 'settling' | 'underfired'
  | 'overfired' | 'devitrification' | 'leaching' | 'other'

export type StullRegion = 'unfused' | 'matte' | 'semi_matte' | 'bright_gloss' | 'underfired' | 'crazed' | 'outside'

export type CrazingRisk = 'none' | 'low' | 'moderate' | 'high' | 'certain'

export type BlendOriginType = 'line' | 'triaxial' | 'quadaxial' | 'biaxial' | 'radial' | 'modification' | 'other'

// ── Tracked Value ───────────────────────────────────────────────

export interface TrackedNumber {
  value: number
  confidence: EpistemicState
  precision?: number
  source?: string
  measuredAt?: string
}

// ── Oxide Analysis ──────────────────────────────────────────────

/** Oxide composition — keys are OxideSymbol, values are raw numbers or tracked */
export type OxideAnalysis = Partial<Record<OxideSymbol, number | TrackedNumber>>

// ── Ingredient ──────────────────────────────────────────────────

export interface IngredientV2 {
  /** Material name as written in original source */
  materialName: string
  /** Normalized material ID (from Stull Atlas material database) */
  materialId?: string
  /** Glazy internal material ID for round-trip fidelity */
  glazyMaterialId?: number
  /** Amount in recipe units (typically parts by weight) */
  amount: number
  /** Measurement unit */
  unit?: 'weight' | 'volume'
  /** True = colorant/addition (above the base 100%) */
  isAddition?: boolean
  /** Particle mesh size if specified (e.g., 200 mesh silica) */
  mesh?: number
  /** Loss on ignition (%) for this specific material lot */
  loi?: number
  /** Material supplier */
  supplier?: string
  /** Supplier lot number for traceability */
  lotNumber?: string
  /** If this material replaced another (e.g., 'EPK' → 'Tile 6') */
  substitutionFor?: string
  /** Oxide analysis for THIS specific lot. Overrides database analysis. */
  analysis?: OxideAnalysis
  confidence?: EpistemicState
}

// ── Firing ──────────────────────────────────────────────────────

export interface FiringSegment {
  /** °C per hour ramp rate. Null/undefined = full speed */
  ratePerHour?: number
  /** Target temperature in °C */
  targetTempC: number
  /** Hold time at target in minutes */
  holdMinutes?: number
  /** Human label: 'slow bisque ramp', 'body reduction', etc. */
  label?: string
}

export interface FiringContext {
  /** Primary cone rating */
  cone?: number | string
  /** Valid cone range [min, max] */
  coneRange?: [number | string, number | string]
  /** Peak firing temperature in °C */
  temperatureC?: number
  /** Temperature range [min, max] in °C */
  temperatureRange?: [number, number]
  atmosphere?: Atmosphere
  kilnType?: KilnType
  /** Ordered firing schedule segments */
  schedule?: FiringSegment[]
  coolingRate?: CoolingRate
  /** Estimated heatwork integral (°C·hours) */
  heatwork?: number
  firingNotes?: string
  confidence?: EpistemicState
}

// ── Chemistry ───────────────────────────────────────────────────

export interface UMFMeta {
  SiO2_Al2O3_ratio: number
  R2O_RO_ratio: number
  totalFluxMoles: number
  R2O_total: number
  RO_total: number
  /** Individual flux contributions as fraction of total flux */
  fluxBreakdown?: Partial<Record<OxideSymbol, number>>
}

export interface Chemistry {
  /** Weight percent analysis. Should sum to ~100%. RAW representation. */
  weightPercent?: OxideAnalysis
  weightPercentSum?: number

  /** Mole percent (each oxide's moles as % of total moles) */
  molePercent?: OxideAnalysis

  /** Unity Molecular Formula — fluxes normalized to 1.0 */
  umf?: OxideAnalysis

  /** Derived UMF metadata */
  umfMeta?: UMFMeta

  /** Total loss on ignition (%) */
  loi?: number

  /** Which molar weight set was used for conversion */
  molarWeightSetId?: string
  molarWeightSetName?: string

  /** How the chemistry was obtained */
  chemistrySource?: ChemistrySource

  confidence?: EpistemicState
}

// ── Outcomes ────────────────────────────────────────────────────

export interface Defect {
  type: DefectType
  severity?: 'minor' | 'moderate' | 'severe'
  notes?: string
}

export interface Outcomes {
  surfaceType?: SurfaceTypeV2
  transparency?: Transparency
  colorFamily?: string
  colorDescription?: string
  /** Approximate color as hex (#RRGGBB) */
  colorHex?: string
  /** Tactile surface quality */
  texture?: string
  /** Clay body this was tested on */
  clayBody?: string
  clayBodyId?: string
  thickness?: 'thin' | 'medium' | 'thick' | 'variable' | 'unknown'
  coats?: number
  applicationMethod?: ApplicationMethod
  defects?: Defect[]
  foodSafe?: boolean
  /** User quality rating 0-5 */
  rating?: number
  outcomeNotes?: string
  confidence?: EpistemicState
}

// ── Calculated Properties ───────────────────────────────────────

export interface CalculationTrace {
  molarWeightSetId?: string
  molarWeightSetName?: string
  calculatedAt?: string
  steps?: CalculationStep[]
  warnings?: string[]
  errors?: string[]
}

export interface SimilarRecipe {
  recipeId: string
  distance: number
}

export interface CalculatedProperties {
  /** Estimated melting temperature in °C */
  estimatedMeltTempC?: number

  /** Coefficient of thermal expansion (×10⁻⁷ / °C) */
  coe?: number
  /** Individual oxide contributions to COE */
  coeFactor?: Partial<Record<OxideSymbol, number>>
  crazingRisk?: CrazingRisk

  /** Named region on the Stull chart */
  stullRegion?: StullRegion
  stullPosition?: { x: number; y: number }

  /** ML/empirical surface prediction */
  surfacePrediction?: string
  surfaceAgreement?: boolean

  /** Limit check validation results */
  validation?: {
    valid: boolean
    errors: string[]
    warnings: string[]
    suggestions: string[]
    issues: Array<{
      oxide: string
      value: number
      limit: { min: number; max: number }
      severity: 'warning' | 'error'
      message: string
    }>
  }

  /** Most similar recipes by UMF distance */
  similarity?: SimilarRecipe[]

  trace?: CalculationTrace
}

// ── Batch ───────────────────────────────────────────────────────

export interface BatchIngredient {
  materialName: string
  grams: number
}

export interface BatchCalculation {
  batchSizeGrams?: number
  batchIngredients?: BatchIngredient[]
  waterGrams?: number
  specificGravity?: number
  totalWetWeight?: number
}

// ── Lineage ─────────────────────────────────────────────────────

export interface BlendParent {
  recipeId: string
  recipeName?: string
  /** Weight fraction 0–1 */
  proportion: number
}

export interface BlendOrigin {
  type: BlendOriginType
  parents: BlendParent[]
  gridPosition?: { row: number; col: number; label?: string }
}

export interface RevisionEntry {
  timestamp: string
  summary: string
  changedBy?: string
  diff?: Record<string, unknown>
}

export interface Lineage {
  parentRecipeId?: string
  blendOrigin?: BlendOrigin
  derivedRecipeIds?: string[]
  revisions?: RevisionEntry[]
  version?: number
}

// ── Images ──────────────────────────────────────────────────────

export interface RecipeImage {
  url: string
  thumbnailUrl?: string
  caption?: string
  isPrimary?: boolean
  clayBody?: string
  cone?: number | string
  atmosphere?: Atmosphere
  uploadedAt?: string
}

// ── The Complete Recipe ─────────────────────────────────────────

export interface GlazeRecipeV2 {
  // ── Identity ──
  id: string
  name: string
  aliases?: string[]

  // ── Provenance ──
  source: string
  sourceId?: string
  sourceUrl?: string
  author?: string
  license?: string

  // ── Classification ──
  baseType?: BaseType
  glazeTypeId?: number
  glazeTypeName?: string
  subtypeId?: number
  baseTypeId?: number
  status?: RecipeStatus
  country?: string

  // ── Recipe ──
  ingredients: IngredientV2[]
  ingredientTotalBase?: number
  ingredientTotalAll?: number

  // ── Chemistry (all representations) ──
  chemistry?: Chemistry

  // ── Firing ──
  firing?: FiringContext

  // ── Outcomes ──
  outcomes?: Outcomes

  // ── Calculated (derived, cacheable) ──
  calculated?: CalculatedProperties

  // ── Batch ──
  batch?: BatchCalculation

  // ── Lineage ──
  lineage?: Lineage

  // ── Media ──
  images?: RecipeImage[]

  // ── Organization ──
  tags?: string[]
  collections?: string[]
  isFavorite?: boolean

  // ── Notes ──
  description?: string
  notes?: string

  // ── Epistemic ──
  verified?: boolean
  overallConfidence?: EpistemicState

  // ── Timestamps ──
  createdAt?: string
  updatedAt?: string
  importedAt?: string
  originalDate?: string
}
