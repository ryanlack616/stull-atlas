/**
 * Glaze Recipe Types
 */

import { UMF } from './umf'
import { EpistemicState } from './epistemic'

/**
 * Data source identifiers
 */
export type GlazeSource =
  | 'glazy'
  | 'digitalfire'
  | 'user'
  | 'calculated'
  | string

/**
 * Firing atmosphere
 */
export type Atmosphere = 'oxidation' | 'reduction' | 'neutral' | 'unknown'

/**
 * Glazy base type (top-level category)
 * Maps to Glazy's base_type_id URL param:
 *   110 = Clay Bodies, 400 = Slips & Engobes, 440 = Overglazes,
 *   450 = Underglazes, 460 = Glazes, 1180 = Refractory
 */
export type BaseType =
  | 'glaze'        // 460
  | 'clay_body'    // 110
  | 'slip'         // 400
  | 'overglaze'    // 440
  | 'underglaze'   // 450
  | 'refractory'   // 1180

export const BASE_TYPE_IDS: Record<number, BaseType> = {
  110: 'clay_body',
  400: 'slip',
  440: 'overglaze',
  450: 'underglaze',
  460: 'glaze',
  1180: 'refractory',
}

/**
 * Transparency rating (Glazy field)
 */
export type Transparency = 'opaque' | 'translucent' | 'transparent' | 'unknown'

/**
 * Recipe lifecycle status (matches Glazy's Draft → Testing → Production → Discontinued)
 */
export type RecipeStatus = 'draft' | 'testing' | 'production' | 'discontinued'

/**
 * Surface finish type
 */
export type SurfaceType =
  | 'gloss'
  | 'satin'
  | 'matte'
  | 'crystalline'
  | 'crawl'
  | 'unknown'

/**
 * Single ingredient in a recipe
 */
export interface Ingredient {
  material: string           // as written in source
  materialId?: string        // normalized ID if matched
  glazyMaterialId?: number   // Glazy's internal material ID (for round-trip)
  amount: number
  unit: 'weight' | 'volume'  // almost always weight
  isAdditional?: boolean     // true = colorant/addition (above 100%), false = base ingredient
  confidence?: EpistemicState
}

/**
 * Complete glaze recipe
 */
export interface GlazeRecipe {
  id: string
  name: string
  source: GlazeSource
  sourceUrl?: string
  
  // Recipe as entered
  ingredients: Ingredient[]
  
  // Calculated UMF (Unity Molecular Formula)
  umf: UMF | null
  
  // Firing info
  coneRange: [number | string, number | string]
  atmosphere: Atmosphere
  
  // Properties (often user-reported)
  surfaceType: SurfaceType
  transparency?: Transparency
  colorFamily?: string
  colorDescription?: string

  // Glazy-compatible taxonomy
  baseType?: BaseType              // top-level: glaze, clay_body, slip, etc.
  glazeTypeId?: number | null      // Glazy sub-type ID (470=Clear, 540=Tenmoku, etc.)
  baseTypeId?: number | null       // Glazy base_type_id for round-trip (460,110,etc.)
  subtypeId?: number | null        // Glazy subtype_id for round-trip

  // Metadata
  status?: RecipeStatus            // Draft → Testing → Production → Discontinued
  country?: string                 // ISO 3166-1 alpha-2 or display name
  description?: string             // Separate from notes — longer explanation
  specificGravity?: number         // measured SG for mixing

  // Images if available
  images?: string[]
  
  // Notes
  notes?: string
  
  // Epistemic tracking
  umfConfidence: EpistemicState
  verified: boolean
  
  // Timestamps
  createdAt?: string
  updatedAt?: string
}

/**
 * Simplified glaze for plotting (computed from GlazeRecipe)
 */
export interface GlazePlotPoint {
  id: string
  name: string
  source: GlazeSource
  
  // Current UMF position (depends on active dataset)
  x: number  // SiO2
  y: number  // Al2O3
  
  // For coloring/filtering
  cone: number | null
  surfaceType: SurfaceType
  glazeTypeId: number | null
  fluxRatio: number  // R2O:RO
  boron: number
  
  // Confidence
  confidence: EpistemicState
}

/**
 * Glaze collection/group
 */
export interface GlazeCollection {
  id: string
  name: string
  description?: string
  glazeIds: string[]
  createdAt: string
}
