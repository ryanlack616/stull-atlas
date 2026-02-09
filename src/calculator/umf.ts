/**
 * UMF Calculation Module
 * 
 * The core algorithm: Recipe → Unity Molecular Formula
 * 
 * Philosophy: Smart, not intelligent
 * - Deterministic: Same inputs → same outputs
 * - Transparent: Show your work (trace)
 * - Traceable: Every value knows its origin
 * - Bounded: Refuse to calculate with bad data
 * - Explicit: No silent defaults
 */

import {
  UMF,
  OxideSymbol,
  OxideValue,
  GlazeRecipe,
  Material,
  CalculationResult,
  CalculationStep,
  EpistemicState,
} from '@/types'
import {
  MOLECULAR_WEIGHTS,
  FLUX_OXIDES,
  OXIDE_CLASSES,
  EPSILON,
  roundTo,
  PRECISION,
} from './constants'

/**
 * Material database interface
 */
export interface MaterialDatabase {
  resolve(name: string): Material | null
  getAnalysis(materialId: string): Record<OxideSymbol, number> | null
}

/**
 * Convert a glaze recipe to Unity Molecular Formula
 */
export function recipeToUMF(
  recipe: GlazeRecipe,
  materials: MaterialDatabase,
): CalculationResult<UMF> {
  
  const trace: CalculationStep[] = []
  const warnings: string[] = []
  const errors: string[] = []
  
  // Step 1: Resolve all materials
  trace.push({
    operation: 'begin',
    inputs: { recipe: recipe.name },
    output: 0,
    note: `Starting UMF calculation for "${recipe.name}"`
  })
  
  const resolved: { ingredient: typeof recipe.ingredients[0]; material: Material; analysis: Record<OxideSymbol, number> }[] = []
  
  for (const ing of recipe.ingredients) {
    const material = materials.resolve(ing.material)
    
    if (!material) {
      errors.push(`Unknown material: ${ing.material}`)
      trace.push({
        operation: 'material_resolution',
        inputs: { name: ing.material },
        output: 0,
        note: `FAILED: Could not resolve "${ing.material}"`
      })
      continue
    }
    
    const analysis = materials.getAnalysis(material.id)
    
    if (!analysis) {
      warnings.push(`No analysis for "${ing.material}"`)
      trace.push({
        operation: 'material_resolution',
        inputs: { name: ing.material, materialId: material.id },
        output: 0,
        note: `WARNING: No oxide analysis available for "${material.primaryName}"`
      })
      continue
    }
    
    resolved.push({ ingredient: ing, material, analysis })
    
    // Warn about discontinued materials
    if (material.discontinued) {
      warnings.push(`"${material.primaryName}" is discontinued — analysis data may not match current substitutes`)
    }
    
    // Warn about fuzzy matches
    if (material.primaryName.toLowerCase() !== ing.material.toLowerCase().trim() &&
        !material.aliases.some(a => a.toLowerCase() === ing.material.toLowerCase().trim())) {
      warnings.push(`"${ing.material}" resolved to "${material.primaryName}" via fuzzy match — verify this is correct`)
    }
    
    trace.push({
      operation: 'material_resolution',
      inputs: { name: ing.material },
      output: 1,
      note: `Resolved "${ing.material}" → ${material.primaryName}${material.discontinued ? ' (DISCONTINUED)' : ''}`
    })
  }
  
  if (errors.length > 0) {
    return {
      value: null,
      confidence: 'unknown',
      warnings,
      errors,
      trace
    }
  }
  
  if (resolved.length === 0) {
    errors.push('No materials could be resolved')
    return {
      value: null,
      confidence: 'unknown',
      warnings,
      errors,
      trace
    }
  }
  
  // Step 2: Calculate moles of each oxide
  const oxideMoles: Partial<Record<OxideSymbol, number>> = {}
  
  for (const { ingredient, material, analysis } of resolved) {
    for (const [oxide, weightPercent] of Object.entries(analysis)) {
      if (weightPercent === 0) continue
      
      const oxideSymbol = oxide as OxideSymbol
      const molecularWeight = MOLECULAR_WEIGHTS[oxideSymbol]
      
      if (!molecularWeight) {
        warnings.push(`Unknown molecular weight for ${oxide}`)
        continue
      }
      
      // grams of oxide = amount * (weight% / 100)
      const grams = ingredient.amount * (weightPercent / 100)
      
      // moles = grams / molecular weight
      const moles = grams / molecularWeight
      
      oxideMoles[oxideSymbol] = (oxideMoles[oxideSymbol] || 0) + moles
      
      trace.push({
        operation: 'oxide_contribution',
        inputs: {
          material: material.primaryName,
          amount: ingredient.amount,
          oxide: oxideSymbol,
          weightPercent,
          molecularWeight
        },
        output: moles,
        note: `${ingredient.amount}g ${material.primaryName} × ${weightPercent}% ${oxide} ÷ ${molecularWeight} = ${roundTo(moles, 4)} mol`
      })
    }
  }
  
  // Step 3: Sum flux moles (R2O + RO)
  let fluxMoles = 0
  
  for (const oxide of FLUX_OXIDES) {
    fluxMoles += oxideMoles[oxide] || 0
  }
  
  trace.push({
    operation: 'flux_sum',
    inputs: Object.fromEntries(
      FLUX_OXIDES.map(o => [o, oxideMoles[o] || 0])
    ),
    output: fluxMoles,
    note: `Total flux moles: ${roundTo(fluxMoles, 4)}`
  })
  
  if (fluxMoles < EPSILON) {
    errors.push('No flux oxides found - cannot calculate UMF (division by zero)')
    return {
      value: null,
      confidence: 'unknown',
      warnings,
      errors,
      trace
    }
  }
  
  // Step 4: Normalize to unity (divide all by flux sum)
  const umf: UMF = {}
  
  for (const [oxide, moles] of Object.entries(oxideMoles)) {
    if (moles === undefined || moles === 0) continue
    
    const normalized = moles / fluxMoles
    const oxideSymbol = oxide as OxideSymbol
    
    umf[oxideSymbol] = {
      value: roundTo(normalized, PRECISION.moles),
      precision: PRECISION.umfOxide,
      state: 'inferred',
      source: 'calculated from recipe'
    }
    
    trace.push({
      operation: 'normalize',
      inputs: { oxide, moles, fluxMoles },
      output: normalized,
      note: `${oxide}: ${roundTo(moles, 4)} ÷ ${roundTo(fluxMoles, 4)} = ${roundTo(normalized, 4)}`
    })
  }
  
  // Step 5: Calculate derived values
  const SiO2 = umf.SiO2?.value || 0
  const Al2O3 = umf.Al2O3?.value || 0
  
  // R2O:RO ratio
  const R2O = OXIDE_CLASSES.R2O.reduce((sum, o) => sum + (umf[o]?.value || 0), 0)
  const RO = OXIDE_CLASSES.RO.reduce((sum, o) => sum + (umf[o]?.value || 0), 0)
  
  umf._meta = {
    SiO2_Al2O3_ratio: Al2O3 > EPSILON ? roundTo(SiO2 / Al2O3, 2) : 0,
    R2O_RO_ratio: RO > EPSILON ? roundTo(R2O / RO, 2) : 0,
    totalFluxMoles: fluxMoles,
    confidence: warnings.length > 0 ? 'assumed' : 'inferred'
  }
  
  trace.push({
    operation: 'derived_values',
    inputs: { SiO2, Al2O3, R2O, RO },
    output: umf._meta as unknown as Record<string, number>,
    note: `SiO2:Al2O3 = ${umf._meta.SiO2_Al2O3_ratio}, R2O:RO = ${umf._meta.R2O_RO_ratio}`
  })
  
  // Verify flux sum is 1.0
  const verifyFluxSum = FLUX_OXIDES.reduce((sum, o) => sum + (umf[o]?.value || 0), 0)
  
  if (Math.abs(verifyFluxSum - 1.0) > EPSILON) {
    warnings.push(`Flux sum ${roundTo(verifyFluxSum, 4)} != 1.0 (rounding error)`)
  }
  
  trace.push({
    operation: 'verify',
    inputs: { expectedFluxSum: 1.0, actualFluxSum: verifyFluxSum },
    output: Math.abs(verifyFluxSum - 1.0) < EPSILON ? 1 : 0,
    note: `Verification: flux sum = ${roundTo(verifyFluxSum, 4)}`
  })
  
  return {
    value: umf,
    confidence: warnings.length > 0 ? 'assumed' : 'inferred',
    warnings,
    errors,
    trace
  }
}

/**
 * Create an OxideValue with full tracking
 */
export function createOxideValue(
  value: number,
  state: EpistemicState,
  source: string
): OxideValue {
  return {
    value: roundTo(value, PRECISION.moles),
    precision: PRECISION.umfOxide,
    state,
    source
  }
}

/**
 * Get the numeric value from a UMF oxide, defaulting to 0
 */
export function getOxideValue(umf: UMF, oxide: OxideSymbol): number {
  return umf[oxide]?.value || 0
}

/**
 * Interpolate between two UMFs
 */
export function interpolateUMF(a: UMF, b: UMF, t: number): UMF {
  const result: UMF = {}
  
  const allOxides = new Set<OxideSymbol>([
    ...Object.keys(a).filter(k => k !== '_meta') as OxideSymbol[],
    ...Object.keys(b).filter(k => k !== '_meta') as OxideSymbol[]
  ])
  
  for (const oxide of allOxides) {
    const aVal = getOxideValue(a, oxide)
    const bVal = getOxideValue(b, oxide)
    const interpolated = aVal * (1 - t) + bVal * t
    
    if (interpolated > EPSILON) {
      result[oxide] = createOxideValue(interpolated, 'inferred', `interpolated t=${t}`)
    }
  }
  
  // Recalculate meta
  const SiO2 = getOxideValue(result, 'SiO2')
  const Al2O3 = getOxideValue(result, 'Al2O3')
  const R2O = OXIDE_CLASSES.R2O.reduce((sum, o) => sum + getOxideValue(result, o), 0)
  const RO = OXIDE_CLASSES.RO.reduce((sum, o) => sum + getOxideValue(result, o), 0)
  
  result._meta = {
    SiO2_Al2O3_ratio: Al2O3 > EPSILON ? roundTo(SiO2 / Al2O3, 2) : 0,
    R2O_RO_ratio: RO > EPSILON ? roundTo(R2O / RO, 2) : 0,
    totalFluxMoles: 0, // not meaningful for interpolated
    confidence: 'inferred'
  }
  
  return result
}

/**
 * Interpolate multiple UMFs with barycentric coordinates
 */
export function interpolateUMFs(umfs: UMF[], weights: number[]): UMF {
  if (umfs.length !== weights.length) {
    throw new Error('UMF count must match weight count')
  }
  
  // Verify weights sum to 1
  const weightSum = weights.reduce((a, b) => a + b, 0)
  if (Math.abs(weightSum - 1.0) > EPSILON) {
    throw new Error(`Weights must sum to 1.0, got ${weightSum}`)
  }
  
  const result: UMF = {}
  
  // Collect all oxides
  const allOxides = new Set<OxideSymbol>()
  for (const umf of umfs) {
    for (const key of Object.keys(umf)) {
      if (key !== '_meta') {
        allOxides.add(key as OxideSymbol)
      }
    }
  }
  
  // Weighted sum
  for (const oxide of allOxides) {
    let sum = 0
    for (let i = 0; i < umfs.length; i++) {
      sum += getOxideValue(umfs[i], oxide) * weights[i]
    }
    
    if (sum > EPSILON) {
      result[oxide] = createOxideValue(sum, 'inferred', `interpolated weights=[${weights.map(w => roundTo(w, 2)).join(',')}]`)
    }
  }
  
  // Recalculate meta
  const SiO2 = getOxideValue(result, 'SiO2')
  const Al2O3 = getOxideValue(result, 'Al2O3')
  const R2O = OXIDE_CLASSES.R2O.reduce((sum, o) => sum + getOxideValue(result, o), 0)
  const RO = OXIDE_CLASSES.RO.reduce((sum, o) => sum + getOxideValue(result, o), 0)
  
  result._meta = {
    SiO2_Al2O3_ratio: Al2O3 > EPSILON ? roundTo(SiO2 / Al2O3, 2) : 0,
    R2O_RO_ratio: RO > EPSILON ? roundTo(R2O / RO, 2) : 0,
    totalFluxMoles: 0,
    confidence: 'inferred'
  }
  
  return result
}
