/**
 * Validation Module
 * 
 * Cone-specific limit formulas and recipe validation
 */

import {
  UMF,
  GlazeRecipe,
  ValidationResult,
  ValidationIssue,
} from '@/types'
import { getOxideValue } from './umf'
import { roundTo } from './constants'

/**
 * Cone-specific UMF limits
 * Compiled from Digitalfire, Hamer & Hamer, ceramic literature
 */
export interface ConeLimits {
  cone: string
  SiO2: { min: number; max: number }
  Al2O3: { min: number; max: number }
  B2O3: { min: number; max: number }
  KNaO: { min: number; max: number }  // Combined alkalis
  CaO: { min: number; max: number }
  MgO: { min: number; max: number }
  ZnO: { min: number; max: number }
  BaO: { min: number; max: number }
}

/**
 * Published cone limits from ceramic literature
 */
export const CONE_LIMITS: ConeLimits[] = [
  {
    cone: '06',
    SiO2:  { min: 1.5,  max: 3.0 },
    Al2O3: { min: 0.05, max: 0.25 },
    B2O3:  { min: 0.3,  max: 0.8 },
    KNaO:  { min: 0.3,  max: 0.7 },
    CaO:   { min: 0.1,  max: 0.5 },
    MgO:   { min: 0.0,  max: 0.2 },
    ZnO:   { min: 0.0,  max: 0.25 },
    BaO:   { min: 0.0,  max: 0.15 },
  },
  {
    cone: '04',
    SiO2:  { min: 1.8,  max: 3.5 },
    Al2O3: { min: 0.1,  max: 0.3 },
    B2O3:  { min: 0.2,  max: 0.6 },
    KNaO:  { min: 0.25, max: 0.6 },
    CaO:   { min: 0.1,  max: 0.5 },
    MgO:   { min: 0.0,  max: 0.25 },
    ZnO:   { min: 0.0,  max: 0.25 },
    BaO:   { min: 0.0,  max: 0.2 },
  },
  {
    cone: '6',
    SiO2:  { min: 2.5,  max: 4.5 },
    Al2O3: { min: 0.2,  max: 0.5 },
    B2O3:  { min: 0.1,  max: 0.4 },
    KNaO:  { min: 0.2,  max: 0.5 },
    CaO:   { min: 0.2,  max: 0.6 },
    MgO:   { min: 0.0,  max: 0.3 },
    ZnO:   { min: 0.0,  max: 0.3 },
    BaO:   { min: 0.0,  max: 0.2 },
  },
  {
    cone: '9',
    SiO2:  { min: 3.0,  max: 5.0 },
    Al2O3: { min: 0.3,  max: 0.6 },
    B2O3:  { min: 0.0,  max: 0.3 },
    KNaO:  { min: 0.2,  max: 0.45 },
    CaO:   { min: 0.25, max: 0.65 },
    MgO:   { min: 0.0,  max: 0.35 },
    ZnO:   { min: 0.0,  max: 0.3 },
    BaO:   { min: 0.0,  max: 0.25 },
  },
  {
    cone: '10',
    SiO2:  { min: 3.0,  max: 5.5 },
    Al2O3: { min: 0.3,  max: 0.7 },
    B2O3:  { min: 0.0,  max: 0.2 },
    KNaO:  { min: 0.2,  max: 0.4 },
    CaO:   { min: 0.3,  max: 0.7 },
    MgO:   { min: 0.0,  max: 0.35 },
    ZnO:   { min: 0.0,  max: 0.3 },
    BaO:   { min: 0.0,  max: 0.3 },
  },
  {
    cone: '11',  // Stull's original
    SiO2:  { min: 3.0,  max: 6.0 },
    Al2O3: { min: 0.3,  max: 0.8 },
    B2O3:  { min: 0.0,  max: 0.15 },
    KNaO:  { min: 0.2,  max: 0.4 },
    CaO:   { min: 0.3,  max: 0.7 },
    MgO:   { min: 0.0,  max: 0.4 },
    ZnO:   { min: 0.0,  max: 0.3 },
    BaO:   { min: 0.0,  max: 0.3 },
  },
]

/**
 * Find limits for a given cone
 */
export function findLimitsForCone(cone: string | number): ConeLimits | null {
  const coneStr = String(cone)
  return CONE_LIMITS.find(l => l.cone === coneStr) || null
}

/**
 * Get interpolated limits for cones between defined values
 */
export function interpolateLimits(cone: number): ConeLimits | null {
  // Find bracketing cones
  const coneValues = CONE_LIMITS.map(l => ({
    ...l,
    numericCone: parseCone(l.cone)
  })).sort((a, b) => a.numericCone - b.numericCone)
  
  const numericCone = cone
  
  // Find lower and upper bounds
  let lower = coneValues[0]
  let upper = coneValues[coneValues.length - 1]  
  for (let i = 0; i < coneValues.length - 1; i++) {
    if (coneValues[i].numericCone <= numericCone && coneValues[i + 1].numericCone >= numericCone) {
      lower = coneValues[i]
      upper = coneValues[i + 1]
      break
    }
  }
  
  if (lower.numericCone === upper.numericCone) {
    return lower
  }
  
  // Interpolation factor
  const t = (numericCone - lower.numericCone) / (upper.numericCone - lower.numericCone)
  
  // Interpolate each limit
  return {
    cone: String(cone),
    SiO2:  interpolateRange(lower.SiO2, upper.SiO2, t),
    Al2O3: interpolateRange(lower.Al2O3, upper.Al2O3, t),
    B2O3:  interpolateRange(lower.B2O3, upper.B2O3, t),
    KNaO:  interpolateRange(lower.KNaO, upper.KNaO, t),
    CaO:   interpolateRange(lower.CaO, upper.CaO, t),
    MgO:   interpolateRange(lower.MgO, upper.MgO, t),
    ZnO:   interpolateRange(lower.ZnO, upper.ZnO, t),
    BaO:   interpolateRange(lower.BaO, upper.BaO, t),
  }
}

function interpolateRange(
  a: { min: number; max: number },
  b: { min: number; max: number },
  t: number
): { min: number; max: number } {
  return {
    min: roundTo(a.min * (1 - t) + b.min * t, 2),
    max: roundTo(a.max * (1 - t) + b.max * t, 2),
  }
}

function parseCone(cone: string): number {
  // Handle negative cones like "06"
  if (cone.startsWith('0')) {
    return -parseInt(cone, 10)
  }
  return parseInt(cone, 10)
}

/**
 * Validate UMF against cone limits
 */
export function validateUMFAgainstLimits(
  umf: UMF,
  cone: string | number
): ValidationIssue[] {
  const limits = findLimitsForCone(cone) || interpolateLimits(typeof cone === 'string' ? parseCone(cone) : cone)
  
  if (!limits) {
    return [{
      oxide: 'cone',
      value: typeof cone === 'number' ? cone : 0,
      limit: { min: 0, max: 0 },
      severity: 'warning',
      message: `No limit data available for cone ${cone}`
    }]
  }
  
  const issues: ValidationIssue[] = []
  
  // Check each oxide
  const checks: { oxide: string; umfKey: string | string[]; limitKey: keyof ConeLimits }[] = [
    { oxide: 'SiO2', umfKey: 'SiO2', limitKey: 'SiO2' },
    { oxide: 'Al2O3', umfKey: 'Al2O3', limitKey: 'Al2O3' },
    { oxide: 'B2O3', umfKey: 'B2O3', limitKey: 'B2O3' },
    { oxide: 'K2O+Na2O', umfKey: ['K2O', 'Na2O'], limitKey: 'KNaO' },
    { oxide: 'CaO', umfKey: 'CaO', limitKey: 'CaO' },
    { oxide: 'MgO', umfKey: 'MgO', limitKey: 'MgO' },
    { oxide: 'ZnO', umfKey: 'ZnO', limitKey: 'ZnO' },
    { oxide: 'BaO', umfKey: 'BaO', limitKey: 'BaO' },
  ]
  
  for (const check of checks) {
    let value: number
    
    if (Array.isArray(check.umfKey)) {
      value = check.umfKey.reduce((sum, key) => sum + getOxideValue(umf, key as any), 0)
    } else {
      value = getOxideValue(umf, check.umfKey as any)
    }
    
    const range = limits[check.limitKey] as { min: number; max: number }
    
    if (value < range.min && value > 0.001) {  // Don't warn about zero values
      issues.push({
        oxide: check.oxide,
        value,
        limit: range,
        severity: value < range.min * 0.5 ? 'error' : 'warning',
        message: `${check.oxide} (${roundTo(value, 2)}) below typical minimum (${range.min}) for cone ${cone}`
      })
    }
    
    if (value > range.max) {
      issues.push({
        oxide: check.oxide,
        value,
        limit: range,
        severity: value > range.max * 1.5 ? 'error' : 'warning',
        message: `${check.oxide} (${roundTo(value, 2)}) above typical maximum (${range.max}) for cone ${cone}`
      })
    }
  }
  
  return issues
}

/**
 * Validate a glaze recipe
 */
export function validateRecipe(recipe: GlazeRecipe): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const suggestions: string[] = []
  const issues: ValidationIssue[] = []
  
  // Must have ingredients
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    errors.push('Recipe has no ingredients')
    return { valid: false, errors, warnings, suggestions, issues }
  }
  
  // Check ingredient amounts
  for (const ing of recipe.ingredients) {
    if (ing.amount <= 0) {
      errors.push(`Invalid amount for ${ing.material}: ${ing.amount}`)
    }
    if (ing.amount > 1000) {
      warnings.push(`Large amount for ${ing.material}: ${ing.amount} - verify this is correct`)
    }
  }
  
  // Total should be reasonable
  const total = recipe.ingredients.reduce((s, i) => s + i.amount, 0)
  if (total < 50) {
    warnings.push(`Total batch size (${roundTo(total, 1)}) is small - amounts may be percentages`)
  }
  if (total > 10000) {
    warnings.push(`Total batch size (${roundTo(total, 1)}) is very large`)
  }
  
  // Check for flux materials
  const fluxKeywords = ['feldspar', 'frit', 'whiting', 'dolomite', 'talc', 'zinc',
    'calcium', 'wollastonite', 'bone ash', 'lithium', 'soda ash', 'pearl ash',
    'borax', 'colemanite', 'ulexite', 'gerstley', 'strontium', 'barium',
    'nepheline', 'cornwall', 'petalite', 'spodumene']
  const hasFlux = recipe.ingredients.some(i =>
    fluxKeywords.some(f => i.material.toLowerCase().includes(f))
  )
  if (!hasFlux) {
    warnings.push('No obvious flux material detected - glaze may not melt')
  }
  
  // Check for glass former
  const silicaKeywords = ['silica', 'flint', 'quartz']
  const hasGlassFormer = recipe.ingredients.some(i =>
    silicaKeywords.some(s => i.material.toLowerCase().includes(s))
  )
  if (!hasGlassFormer) {
    suggestions.push('Consider adding silica for glaze stability')
  }
  
  // Check for alumina source
  const aluminaKeywords = ['kaolin', 'clay', 'alumina', 'epk', 'grolleg', 'tile 6',
    'ball clay', 'goldart', 'hawthorne', 'redart', 'fire clay', 'bentonite',
    'xx sagger', 'calcined']
  const hasAlumina = recipe.ingredients.some(i =>
    aluminaKeywords.some(a => i.material.toLowerCase().includes(a))
  )
  if (!hasAlumina) {
    warnings.push('No clay/alumina source - glaze may run excessively')
  }
  
  // Check for potentially hazardous materials
  const hazardKeywords = ['lead', 'barium', 'cadmium']
  const hazardMaterials = recipe.ingredients.filter(i =>
    hazardKeywords.some(h => i.material.toLowerCase().includes(h))
  )
  if (hazardMaterials.length > 0) {
    warnings.push(`Recipe contains potentially hazardous materials: ${hazardMaterials.map(m => m.material).join(', ')}`)
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    suggestions,
    issues
  }
}

/**
 * Stull chart surface prediction
 */
export type StullPrediction = 'matte' | 'satin' | 'gloss' | 'underfired' | 'crazed' | 'unknown'

/**
 * Predict surface based on Stull chart position
 * Based on Stull's original research at cone 11 with 0.3 R2O : 0.7 RO
 */
export function predictSurface(umf: UMF): StullPrediction {
  const SiO2 = getOxideValue(umf, 'SiO2')
  const Al2O3 = getOxideValue(umf, 'Al2O3')
  
  if (Al2O3 < 0.1 || SiO2 < 1.0) {
    return 'unknown'
  }
  
  const ratio = SiO2 / Al2O3
  
  // Stull's findings:
  // - Ratio < 5:1 = matte (at cone 11)
  // - Ratio 5-8:1 = satin
  // - Ratio > 8:1 = glossy
  // - Very high ratio (>12:1) = underfired
  // - Low silica = crazed
  
  if (SiO2 < 2.0 && Al2O3 < 0.3) {
    return 'crazed'
  }
  
  if (ratio > 12) {
    return 'underfired'
  }
  
  if (ratio < 5) {
    return 'matte'
  }
  
  if (ratio < 8) {
    return 'satin'
  }
  
  return 'gloss'
}
