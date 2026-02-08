/**
 * Calculator Constants
 * 
 * Molecular weights, oxide classifications, and precision rules
 */

import { OxideSymbol, OXIDE_CLASSES as _OXIDE_CLASSES, FLUX_OXIDES as _FLUX_OXIDES } from '@/types'

/**
 * Molecular weights (g/mol) for all ceramic oxides
 * Source: Standard atomic weights
 */
export const MOLECULAR_WEIGHTS: Record<OxideSymbol, number> = {
  // Fluxes - R2O (alkalis)
  Li2O:   29.88,
  Na2O:   61.98,
  K2O:    94.20,
  
  // Fluxes - RO (alkaline earths + others)
  MgO:    40.30,
  CaO:    56.08,
  SrO:   103.62,
  BaO:   153.33,
  ZnO:    81.38,
  PbO:   223.20,
  
  // Stabilizers - R2O3
  Al2O3: 101.96,
  B2O3:   69.62,
  Fe2O3: 159.69,
  
  // Glass formers - RO2
  SiO2:   60.08,
  TiO2:   79.87,
  ZrO2:  123.22,
  SnO2:  150.71,
  
  // Colorants / misc
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

/**
 * Oxide classifications — re-exported from types for backward compat
 */
export const OXIDE_CLASSES = _OXIDE_CLASSES

export const FLUX_OXIDES: OxideSymbol[] = _FLUX_OXIDES

/**
 * Precision settings for different contexts
 */
export const PRECISION = {
  umfOxide: 2,      // 0.35 Al2O3
  umfRatio: 2,      // SiO2:Al2O3 = 8.50
  weight: 1,        // 45.5g
  percentage: 2,    // 65.32%
  temperature: 0,   // 1220°C
  moles: 4,         // internal calculations
} as const

/**
 * Scale factor for integer math (avoids floating point errors)
 * Store as: Math.round(value * SCALE)
 * Display as: stored / SCALE
 */
export const SCALE = 10000  // 4 decimal places

/**
 * Epsilon for floating point comparison
 */
export const EPSILON = 0.0001

/**
 * Compare two numbers with epsilon tolerance
 */
export function floatEqual(a: number, b: number, epsilon = EPSILON): boolean {
  return Math.abs(a - b) < epsilon
}

/**
 * Round to specified precision
 */
export function roundTo(value: number, precision: number): number {
  const factor = Math.pow(10, precision)
  return Math.round(value * factor) / factor
}

/**
 * Format number for display
 */
export function formatNumber(value: number, precision: number): string {
  return value.toFixed(precision)
}

/**
 * Convert to scaled integer for storage
 */
export function toScaled(value: number): number {
  return Math.round(value * SCALE)
}

/**
 * Convert from scaled integer for display
 */
export function fromScaled(scaled: number): number {
  return scaled / SCALE
}
