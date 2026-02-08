/**
 * Unity Molecular Formula Types
 * The coordinate system for glaze chemistry
 */

import { OxideValue, EpistemicState } from './epistemic'

/**
 * All oxide symbols used in ceramic chemistry
 */
export type OxideSymbol =
  // Fluxes - R2O (alkalis)
  | 'Li2O' | 'Na2O' | 'K2O'
  // Fluxes - RO (alkaline earths + others)
  | 'MgO' | 'CaO' | 'SrO' | 'BaO' | 'ZnO' | 'PbO'
  // Stabilizers - R2O3
  | 'Al2O3' | 'B2O3' | 'Fe2O3'
  // Glass formers - RO2
  | 'SiO2' | 'TiO2' | 'ZrO2' | 'SnO2'
  // Colorants / misc
  | 'MnO' | 'MnO2' | 'NiO' | 'CuO' | 'Cu2O' | 'CoO' | 'Cr2O3' | 'P2O5' | 'F'

/**
 * Oxide classifications for grouping
 */
export const R2O_OXIDES: OxideSymbol[] = ['Li2O', 'Na2O', 'K2O']
export const RO_OXIDES: OxideSymbol[] = ['MgO', 'CaO', 'SrO', 'BaO', 'ZnO', 'PbO']
export const R2O3_OXIDES: OxideSymbol[] = ['Al2O3', 'B2O3', 'Fe2O3']
export const RO2_OXIDES: OxideSymbol[] = ['SiO2', 'TiO2', 'ZrO2', 'SnO2']
export const FLUX_OXIDES: OxideSymbol[] = [...R2O_OXIDES, ...RO_OXIDES]

/**
 * Unity Molecular Formula
 * Fluxes (R2O + RO) normalized to sum to 1.0
 */
export interface UMF {
  // Fluxes - R2O
  Li2O?: OxideValue
  Na2O?: OxideValue
  K2O?: OxideValue
  
  // Fluxes - RO
  MgO?: OxideValue
  CaO?: OxideValue
  SrO?: OxideValue
  BaO?: OxideValue
  ZnO?: OxideValue
  PbO?: OxideValue
  
  // Stabilizers
  Al2O3?: OxideValue
  B2O3?: OxideValue
  Fe2O3?: OxideValue
  
  // Glass formers
  SiO2?: OxideValue
  TiO2?: OxideValue
  ZrO2?: OxideValue
  SnO2?: OxideValue
  
  // Colorants (tracked but not in core UMF)
  MnO?: OxideValue
  NiO?: OxideValue
  CuO?: OxideValue
  CoO?: OxideValue
  Cr2O3?: OxideValue
  P2O5?: OxideValue
  
  // Calculated metadata
  _meta?: UMFMeta
}

/**
 * Derived UMF values
 */
export interface UMFMeta {
  SiO2_Al2O3_ratio: number
  R2O_RO_ratio: number
  totalFluxMoles: number
  confidence: EpistemicState
}

/**
 * Bounds for UMF space (for sampling, limits)
 */
export interface UMFBounds {
  [key: string]: { min: number; max: number }
}

/**
 * A point in UMF space with position and optional recipe
 */
export interface UMFPoint {
  id: string
  x: number  // typically SiO2
  y: number  // typically Al2O3
  umf: UMF
  glazeId?: string
}
