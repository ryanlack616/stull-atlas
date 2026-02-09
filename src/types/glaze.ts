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
  amount: number
  unit: 'weight' | 'volume'  // almost always weight
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
  colorFamily?: string
  colorDescription?: string

  // Glaze type classification (Derek Philipau taxonomy)
  glazeTypeId?: number | null
  
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
