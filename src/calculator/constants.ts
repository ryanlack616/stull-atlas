/**
 * Calculator Constants
 * 
 * Molecular weights, oxide classifications, and precision rules.
 * 
 * ARCHITECTURE NOTE (2025-02):
 * MOLECULAR_WEIGHTS is now dynamic — backed by the molarWeightStore.
 * The `getActiveWeights()` function returns whatever weight set the
 * user has selected (IUPAC 2023, CRC 2003, Glazy, etc.).
 * The `MOLECULAR_WEIGHTS` constant is kept as the DEFAULT / fallback
 * and is used during app init before the store hydrates.
 */

import { OxideSymbol, OXIDE_CLASSES as _OXIDE_CLASSES, FLUX_OXIDES as _FLUX_OXIDES } from '@/types'

/**
 * Default molecular weights (g/mol) for all ceramic oxides.
 * Close to IUPAC 2023 with practical rounding.
 * Used as fallback when the store hasn't loaded yet.
 */
export const DEFAULT_MOLECULAR_WEIGHTS: Record<OxideSymbol, number> = {
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
 * Module-level reference to the active weight set.
 * Updated by `setActiveWeights()` whenever the molarWeightStore changes.
 * Starts as DEFAULT_MOLECULAR_WEIGHTS.
 */
let _activeWeights: Record<OxideSymbol, number> = DEFAULT_MOLECULAR_WEIGHTS

/**
 * Get the currently active molecular weights.
 * This is the primary access point for all calculator functions.
 */
export function getActiveWeights(): Record<OxideSymbol, number> {
  return _activeWeights
}

/**
 * Set the active molecular weights.
 * Called by the molarWeightStore subscription (see stores/molarWeightStore.ts).
 * Do NOT call this from calculator functions — it's a store concern.
 */
export function setActiveWeights(weights: Record<OxideSymbol, number>): void {
  _activeWeights = weights
}

/**
 * Live reference — consumers that read MOLECULAR_WEIGHTS get the active set.
 * Uses a Proxy so existing code like `MOLECULAR_WEIGHTS[oxide]` and
 * `Object.keys(MOLECULAR_WEIGHTS)` continue to work without changes.
 */
export const MOLECULAR_WEIGHTS: Record<OxideSymbol, number> = new Proxy(
  DEFAULT_MOLECULAR_WEIGHTS,
  {
    get(_target, prop, receiver) {
      if (prop === Symbol.toPrimitive || prop === Symbol.iterator) {
        return Reflect.get(_activeWeights, prop, receiver)
      }
      return Reflect.get(_activeWeights, prop as string)
    },
    ownKeys() {
      return Reflect.ownKeys(_activeWeights)
    },
    getOwnPropertyDescriptor(_target, prop) {
      return Object.getOwnPropertyDescriptor(_activeWeights, prop)
    },
    has(_target, prop) {
      return prop in _activeWeights
    },
  }
) as Record<OxideSymbol, number>

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
