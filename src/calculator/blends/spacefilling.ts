/**
 * Space-Filling Sampling
 * 
 * Latin Hypercube, Sobol, Halton sequences
 * For computational exploration of UMF space
 */

import {
  UMF,
  UMFBounds,
  SpaceFillingSample,
  SpaceFillingSampleConfig,
  CalculationResult,
  CalculationStep,
  OxideSymbol,
} from '@/types'
import { createOxideValue, getOxideValue } from '../umf'
import { FLUX_OXIDES, OXIDE_CLASSES, EPSILON, roundTo } from '../constants'

/**
 * Seeded random number generator (Mulberry32)
 */
function createRNG(seed: number): () => number {
  return () => {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

/**
 * Fisher-Yates shuffle with seeded RNG
 */
function shuffle<T>(array: T[], rng: () => number): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Latin Hypercube Sampling
 * Ensures good coverage by stratifying each dimension
 */
export function latinHypercubeSample(
  bounds: UMFBounds,
  n: number,
  seed: number = 42
): SpaceFillingSample[] {
  
  const rng = createRNG(seed)
  const dimensions = Object.keys(bounds) as OxideSymbol[]
  const samples: SpaceFillingSample[] = []
  
  // Create n bins per dimension, with random position within each bin
  const bins: Record<string, number[]> = {}
  
  for (const dim of dimensions) {
    const { min, max } = bounds[dim]
    const values: number[] = []
    
    for (let i = 0; i < n; i++) {
      const binMin = min + (max - min) * (i / n)
      const binMax = min + (max - min) * ((i + 1) / n)
      values.push(binMin + rng() * (binMax - binMin))
    }
    
    // Shuffle to break correlation between dimensions
    bins[dim] = shuffle(values, rng)
  }
  
  // Combine dimensions
  for (let i = 0; i < n; i++) {
    const umf: Partial<UMF> = {}
    const coordinates: Record<string, number> = {}
    
    for (const dim of dimensions) {
      const value = bins[dim][i]
      coordinates[dim] = value
      umf[dim as OxideSymbol] = createOxideValue(value, 'inferred', `LHS sample ${i}`)
    }
    
    samples.push({
      index: i,
      umf: normalizeUMFFluxes(umf as UMF),
      coordinates
    })
  }
  
  return samples
}

/**
 * Sobol sequence generator (simplified 2D)
 * Quasi-random, low-discrepancy sequence
 */
export function sobolSample(
  bounds: UMFBounds,
  n: number
): SpaceFillingSample[] {
  
  const dimensions = Object.keys(bounds) as OxideSymbol[]
  const samples: SpaceFillingSample[] = []
  
  // Direction numbers for Sobol sequence (simplified)
  // In production, use a proper Sobol library
  
  for (let i = 0; i < n; i++) {
    const umf: Partial<UMF> = {}
    const coordinates: Record<string, number> = {}
    
    // Van der Corput sequence for each dimension
    for (let d = 0; d < dimensions.length; d++) {
      const dim = dimensions[d]
      const { min, max } = bounds[dim]
      
      // Radical inverse with different bases for each dimension
      const base = getPrime(d)
      const vanDerCorput = radicalInverse(i + 1, base)
      
      const value = min + vanDerCorput * (max - min)
      coordinates[dim] = value
      umf[dim] = createOxideValue(value, 'inferred', `Sobol sample ${i}`)
    }
    
    samples.push({
      index: i,
      umf: normalizeUMFFluxes(umf as UMF),
      coordinates
    })
  }
  
  return samples
}

/**
 * Halton sequence
 * Another quasi-random sequence using different prime bases per dimension
 */
export function haltonSample(
  bounds: UMFBounds,
  n: number
): SpaceFillingSample[] {
  
  const dimensions = Object.keys(bounds) as OxideSymbol[]
  const samples: SpaceFillingSample[] = []
  
  for (let i = 0; i < n; i++) {
    const umf: Partial<UMF> = {}
    const coordinates: Record<string, number> = {}
    
    for (let d = 0; d < dimensions.length; d++) {
      const dim = dimensions[d]
      const { min, max } = bounds[dim]
      
      const base = getPrime(d)
      const haltonValue = radicalInverse(i + 1, base)
      
      const value = min + haltonValue * (max - min)
      coordinates[dim] = value
      umf[dim] = createOxideValue(value, 'inferred', `Halton sample ${i}`)
    }
    
    samples.push({
      index: i,
      umf: normalizeUMFFluxes(umf as UMF),
      coordinates
    })
  }
  
  return samples
}

/**
 * Radical inverse function (base conversion)
 */
function radicalInverse(n: number, base: number): number {
  let result = 0
  let f = 1 / base
  let i = n
  
  while (i > 0) {
    result += f * (i % base)
    i = Math.floor(i / base)
    f /= base
  }
  
  return result
}

/**
 * Get nth prime number
 */
function getPrime(n: number): number {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
  return primes[n % primes.length]
}

/**
 * Normalize UMF so fluxes sum to 1.0
 */
function normalizeUMFFluxes(umf: UMF): UMF {
  const fluxSum = FLUX_OXIDES.reduce((sum, oxide) => {
    return sum + (getOxideValue(umf, oxide) || 0)
  }, 0)
  
  if (fluxSum < EPSILON) {
    return umf
  }
  
  const normalized: UMF = { ...umf }
  
  for (const key of Object.keys(umf)) {
    if (key === '_meta') continue
    const oxide = key as OxideSymbol
    const current = getOxideValue(umf, oxide)
    if (FLUX_OXIDES.includes(oxide)) {
      // Normalize flux oxides
      normalized[oxide] = createOxideValue(
        current / fluxSum,
        'inferred',
        'normalized'
      )
    }
    // Non-flux oxides stay as-is (they're relative to normalized flux = 1)
  }
  
  // Recalculate meta
  const SiO2 = getOxideValue(normalized, 'SiO2')
  const Al2O3 = getOxideValue(normalized, 'Al2O3')
  const R2O = OXIDE_CLASSES.R2O.reduce((sum, o) => sum + getOxideValue(normalized, o), 0)
  const RO = OXIDE_CLASSES.RO.reduce((sum, o) => sum + getOxideValue(normalized, o), 0)
  
  normalized._meta = {
    SiO2_Al2O3_ratio: Al2O3 > EPSILON ? roundTo(SiO2 / Al2O3, 2) : 0,
    R2O_RO_ratio: RO > EPSILON ? roundTo(R2O / RO, 2) : 0,
    totalFluxMoles: 1,
    confidence: 'inferred'
  }
  
  return normalized
}

/**
 * Main space-filling sample function
 */
export function spaceFillingSample(
  config: SpaceFillingSampleConfig
): CalculationResult<SpaceFillingSample[]> {
  
  const { type, bounds, count, seed } = config
  const trace: CalculationStep[] = []
  const warnings: string[] = []
  const errors: string[] = []
  
  // Validate bounds
  if (Object.keys(bounds).length === 0) {
    errors.push('Bounds are required')
    return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  for (const [key, range] of Object.entries(bounds)) {
    if (range.max <= range.min) {
      errors.push(`Invalid bounds for ${key}: max (${range.max}) <= min (${range.min})`)
    }
  }
  
  if (errors.length > 0) {
    return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  trace.push({
    operation: 'spacefill_start',
    inputs: { type, dimensions: Object.keys(bounds).length, count },
    output: 0,
    note: `Generating ${count} ${type.toUpperCase()} samples in ${Object.keys(bounds).length}D space`
  })
  
  let samples: SpaceFillingSample[]
  
  switch (type) {
    case 'lhs':
      samples = latinHypercubeSample(bounds, count, seed || 42)
      break
    case 'sobol':
      samples = sobolSample(bounds, count)
      break
    case 'halton':
      samples = haltonSample(bounds, count)
      break
    default:
      errors.push(`Unknown sampling type: ${type}`)
      return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  trace.push({
    operation: 'spacefill_complete',
    inputs: { expected: count },
    output: samples.length,
    note: `Generated ${samples.length} samples`
  })
  
  return {
    value: samples,
    confidence: 'inferred',
    warnings,
    errors,
    trace
  }
}

/**
 * Default bounds for glaze UMF space (mid-fire)
 */
export const DEFAULT_UMF_BOUNDS: UMFBounds = {
  SiO2:  { min: 2.0, max: 5.0 },
  Al2O3: { min: 0.15, max: 0.6 },
  B2O3:  { min: 0, max: 0.5 },
  Na2O:  { min: 0, max: 0.4 },
  K2O:   { min: 0, max: 0.4 },
  CaO:   { min: 0.1, max: 0.7 },
  MgO:   { min: 0, max: 0.35 },
  ZnO:   { min: 0, max: 0.3 },
}

/**
 * Stull-chart-specific bounds (2D: SiO2 vs Al2O3)
 */
export const STULL_BOUNDS: UMFBounds = {
  SiO2:  { min: 1.5, max: 6.0 },
  Al2O3: { min: 0.1, max: 0.8 },
}
