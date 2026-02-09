/**
 * Grid Blend Calculator
 * 
 * Biaxial, factorial, and radial blends
 * Independent variables that don't need to sum to anything
 */

import {
  GlazeRecipe,
  UMF,
  GridPoint,
  GridBlendConfig,
  Addition,
  CalculationResult,
  CalculationStep,
  Ingredient,
} from '@/types'
import { MaterialDatabase, recipeToUMF, createOxideValue } from '../umf'
import { EPSILON, roundTo } from '../constants'

/**
 * Generate all combinations for a grid
 */
export function* generateGridPoints(additions: Addition[]): Generator<number[]> {
  if (additions.length === 0) {
    yield []
    return
  }
  
  const [first, ...rest] = additions
  const stepSize = first.steps > 1 
    ? (first.max - first.min) / (first.steps - 1)
    : 0
  
  for (let i = 0; i < first.steps; i++) {
    const value = first.min + i * stepSize
    for (const remaining of generateGridPoints(rest)) {
      yield [roundTo(value, 2), ...remaining]
    }
  }
}

/**
 * Calculate number of points in a grid
 */
export function gridPointCount(additions: Addition[]): number {
  return additions.reduce((product, a) => product * a.steps, 1)
}

/**
 * Clone a recipe deeply
 */
function cloneRecipe(recipe: GlazeRecipe): GlazeRecipe {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map(ing => ({ ...ing })),
    umf: recipe.umf ? { ...recipe.umf } : null,
    coneRange: [...recipe.coneRange] as [string | number, string | number],
  }
}

/**
 * Main grid blend function
 */
export function gridBlend(
  config: GridBlendConfig,
  materials: MaterialDatabase,
): CalculationResult<GridPoint[]> {
  
  const { baseRecipe, additions } = config
  const trace: CalculationStep[] = []
  const warnings: string[] = []
  const errors: string[] = []
  
  // Validation
  if (!baseRecipe) {
    errors.push('Base recipe is required')
    return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  if (additions.length === 0) {
    errors.push('At least one addition is required')
    return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  // Validate additions
  for (const addition of additions) {
    if (addition.steps < 1) {
      errors.push(`Addition "${addition.materialName}" must have at least 1 step`)
    }
    if (addition.max < addition.min) {
      errors.push(`Addition "${addition.materialName}" has max < min`)
    }
  }
  
  if (errors.length > 0) {
    return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  trace.push({
    operation: 'grid_start',
    inputs: {
      baseRecipe: baseRecipe.name,
      additions: additions.map(a => `${a.materialName}: ${a.min}-${a.max} (${a.steps} steps)`),
      expectedPoints: gridPointCount(additions)
    },
    output: 0,
    note: `Starting grid blend with ${additions.length} variable(s)`
  })
  
  const points: GridPoint[] = []
  let index = 0
  
  for (const coords of generateGridPoints(additions)) {
    // Create modified recipe
    const modified = cloneRecipe(baseRecipe)
    modified.id = `grid_${Date.now()}_${index}`
    
    // Add each material at the specified amount
    const additionLabels: string[] = []
    
    for (let i = 0; i < additions.length; i++) {
      const addition = additions[i]
      const amount = coords[i]
      
      if (amount > EPSILON) {
        modified.ingredients.push({
          material: addition.materialName,
          materialId: addition.material.id,
          amount,
          unit: 'weight'
        })
        additionLabels.push(`+${roundTo(amount, 1)} ${addition.materialName}`)
      }
    }
    
    modified.name = `${baseRecipe.name} ${additionLabels.join(' ')}`
    
    // Calculate UMF for the modified recipe
    const umfResult = recipeToUMF(modified, materials)
    
    if (umfResult.errors.length > 0) {
      warnings.push(`Could not calculate UMF for point ${index}: ${umfResult.errors.join(', ')}`)
    }
    
    const label = coords.map((c, i) => 
      `${additions[i].materialName.substring(0, 3)}:${roundTo(c, 1)}`
    ).join(' ')
    
    points.push({
      index,
      coordinates: coords,
      recipe: modified,
      umf: umfResult.value || {} as UMF,
      label
    })
    
    index++
  }
  
  trace.push({
    operation: 'grid_complete',
    inputs: { expectedPoints: gridPointCount(additions) },
    output: points.length,
    note: `Generated ${points.length} grid points`
  })
  
  return {
    value: points,
    confidence: 'inferred',
    warnings,
    errors,
    trace
  }
}

/**
 * Convenience function for biaxial blend
 */
export function biaxialBlend(
  baseRecipe: GlazeRecipe,
  additionA: Addition,
  additionB: Addition,
  materials: MaterialDatabase,
): CalculationResult<GridPoint[]> {
  return gridBlend(
    { type: 'biaxial', baseRecipe, additions: [additionA, additionB] },
    materials,
  )
}

/**
 * Radial blend: center recipe with spokes outward
 * Each spoke is a line blend from center to a modified version
 */
export function radialBlend(
  centerRecipe: GlazeRecipe,
  centerUMF: UMF,
  additions: Addition[],
  stepsPerSpoke: number,
  materials: MaterialDatabase,
): CalculationResult<GridPoint[]> {
  
  const trace: CalculationStep[] = []
  const warnings: string[] = []
  const errors: string[] = []
  const points: GridPoint[] = []
  
  // Center point
  points.push({
    index: 0,
    coordinates: new Array(additions.length).fill(0),
    recipe: centerRecipe,
    umf: centerUMF,
    label: 'center'
  })
  
  let index = 1
  
  // Each addition creates a spoke
  for (let spokeIndex = 0; spokeIndex < additions.length; spokeIndex++) {
    const addition = additions[spokeIndex]
    
    for (let step = 1; step <= stepsPerSpoke; step++) {
      const t = step / stepsPerSpoke
      const amount = addition.min + (addition.max - addition.min) * t
      
      // Create coords (all zeros except this spoke)
      const coords = new Array(additions.length).fill(0)
      coords[spokeIndex] = amount
      
      // Create modified recipe
      const modified = cloneRecipe(centerRecipe)
      modified.id = `radial_${Date.now()}_${index}`
      modified.ingredients.push({
        material: addition.materialName,
        materialId: addition.material.id,
        amount,
        unit: 'weight'
      })
      modified.name = `${centerRecipe.name} +${roundTo(amount, 1)} ${addition.materialName}`
      
      // Calculate UMF
      const umfResult = recipeToUMF(modified, materials)
      
      points.push({
        index,
        coordinates: coords,
        recipe: modified,
        umf: umfResult.value || {} as UMF,
        label: `${addition.materialName.substring(0, 3)}:${roundTo(amount, 1)}`
      })
      
      index++
    }
  }
  
  trace.push({
    operation: 'radial_complete',
    inputs: { 
      center: centerRecipe.name,
      spokes: additions.length,
      stepsPerSpoke
    },
    output: points.length,
    note: `Generated ${points.length} radial points (1 center + ${additions.length} spokes × ${stepsPerSpoke} steps)`
  })
  
  return {
    value: points,
    confidence: 'inferred',
    warnings,
    errors,
    trace
  }
}

/**
 * Create an Addition from material and range
 */
export function createAddition(
  materialName: string,
  materialId: string,
  min: number,
  max: number,
  steps: number
): Addition {
  return {
    material: { id: materialId } as any,  // Will be resolved by grid blend
    materialName,
    min,
    max,
    steps
  }
}
