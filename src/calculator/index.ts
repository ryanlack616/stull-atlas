/**
 * Stull Atlas Calculator
 * 
 * Core calculation engine for glaze chemistry
 * 
 * Philosophy: Smart, not intelligent
 * - Deterministic: Same inputs → same outputs, always
 * - Transparent: Show your work (trace)
 * - Traceable: Every value knows its origin
 * - Bounded: Refuse to calculate with bad data
 * - Explicit: No silent defaults or assumptions
 */

export * from './constants'
export * from './umf'
export * from './validation'
export * from './parseCone'
export * from './blends'
export * from './optimizer'
export * from './geneticOptimizer'
export * from './responseSurface'
