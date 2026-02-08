/**
 * Simplex Blend Calculator
 * 
 * Line blend, triaxial, quadaxial, pentaxial, n-axial
 * All materials sum to 100%
 */

import {
  GlazeRecipe,
  UMF,
  SimplexPoint,
  SimplexBlendConfig,
  CalculationResult,
  CalculationStep,
  Ingredient,
} from '@/types'
import { interpolateUMFs } from '../umf'
import { EPSILON, roundTo } from '../constants'
import { parseConeOrZero as parseCone } from '../parseCone'

/**
 * Generate all points on an n-simplex with given divisions
 * Yields barycentric coordinates that sum to 1.0
 */
export function* generateSimplexPoints(
  n: number,       // number of materials/recipes
  divisions: number // steps per edge
): Generator<number[]> {
  
  function* recurse(remaining: number, depth: number, current: number[]): Generator<number[]> {
    if (depth === n - 1) {
      yield [...current, remaining / divisions]
      return
    }
    
    for (let i = 0; i <= remaining; i++) {
      yield* recurse(remaining - i, depth + 1, [...current, i / divisions])
    }
  }
  
  yield* recurse(divisions, 0, [])
}

/**
 * Calculate number of points in a simplex
 * C(n + k - 1, k - 1) where n = divisions, k = materials
 */
export function simplexPointCount(materials: number, divisions: number): number {
  return binomial(divisions + materials - 1, materials - 1)
}

/**
 * Binomial coefficient
 */
function binomial(n: number, k: number): number {
  if (k > n) return 0
  if (k === 0 || k === n) return 1
  
  let result = 1
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1)
  }
  return Math.round(result)
}

/**
 * Interpolate recipes by barycentric coordinates
 * Creates a new recipe with weighted ingredient amounts
 */
export function interpolateRecipes(
  recipes: GlazeRecipe[],
  weights: number[]
): GlazeRecipe {
  if (recipes.length !== weights.length) {
    throw new Error('Recipe count must match weight count')
  }
  
  // Verify weights sum to 1
  const weightSum = weights.reduce((a, b) => a + b, 0)
  if (Math.abs(weightSum - 1.0) > EPSILON) {
    throw new Error(`Weights must sum to 1.0, got ${weightSum}`)
  }
  
  // Collect all unique materials
  const materialAmounts = new Map<string, number>()
  
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]
    const weight = weights[i]
    
    for (const ing of recipe.ingredients) {
      const current = materialAmounts.get(ing.material) || 0
      materialAmounts.set(ing.material, current + ing.amount * weight)
    }
  }
  
  // Create blended ingredients
  const ingredients: Ingredient[] = Array.from(materialAmounts.entries())
    .filter(([_, amount]) => amount > EPSILON)
    .map(([material, amount]) => ({
      material,
      amount: roundTo(amount, 2),
      unit: 'weight' as const
    }))
  
  // Generate label
  const label = recipes.map((r, i) => {
    const pct = Math.round(weights[i] * 100)
    if (pct === 0) return null
    // Use first letter or first few chars of recipe name
    const initial = r.name.substring(0, 1).toUpperCase()
    return `${initial}${pct}`
  }).filter(Boolean).join('-')
  
  return {
    id: `blend_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: `Blend: ${label}`,
    source: 'calculated',
    ingredients,
    umf: new Map(),
    coneRange: [
      Math.min(...recipes.map(r => parseCone(r.coneRange[0]))),
      Math.max(...recipes.map(r => parseCone(r.coneRange[1])))
    ],
    atmosphere: recipes[0].atmosphere,
    surfaceType: 'unknown',
    umfConfidence: 'inferred',
    verified: false
  }
}

/**
 * Main simplex blend function
 */
export function simplexBlend(
  config: SimplexBlendConfig,
  inputUMFs: UMF[]
): CalculationResult<SimplexPoint[]> {
  
  const { recipes, divisions, constraints } = config
  const trace: CalculationStep[] = []
  const warnings: string[] = []
  const errors: string[] = []
  
  // Validation
  if (recipes.length < 2) {
    errors.push('Need at least 2 recipes for simplex blend')
    return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  if (recipes.length !== inputUMFs.length) {
    errors.push('Recipe count must match UMF count')
    return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  if (divisions < 1) {
    errors.push('Divisions must be at least 1')
    return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  // Check for null UMFs
  const validUMFs = inputUMFs.every(umf => umf !== null)
  if (!validUMFs) {
    errors.push('One or more input recipes has invalid UMF')
    return { value: null, confidence: 'unknown', warnings, errors, trace }
  }
  
  trace.push({
    operation: 'simplex_start',
    inputs: { 
      recipeCount: recipes.length, 
      divisions,
      expectedPoints: simplexPointCount(recipes.length, divisions)
    },
    output: 0,
    note: `Starting ${getSimplexName(recipes.length)} blend with ${divisions} divisions`
  })
  
  const points: SimplexPoint[] = []
  let index = 0
  
  for (const coords of generateSimplexPoints(recipes.length, divisions)) {
    // Apply constraints if any
    if (constraints) {
      const { minPercentages, maxPercentages } = constraints
      let valid = true
      
      if (minPercentages) {
        for (let i = 0; i < coords.length; i++) {
          if (coords[i] < (minPercentages[i] || 0)) {
            valid = false
            break
          }
        }
      }
      
      if (maxPercentages) {
        for (let i = 0; i < coords.length; i++) {
          if (coords[i] > (maxPercentages[i] || 1)) {
            valid = false
            break
          }
        }
      }
      
      if (!valid) continue
    }
    
    // Interpolate recipe
    const blendedRecipe = interpolateRecipes(recipes, coords)
    
    // Interpolate UMF
    const blendedUMF = interpolateUMFs(inputUMFs, coords)
    
    // Generate label
    const label = coords.map((c, i) => {
      const pct = Math.round(c * 100)
      if (pct === 0) return null
      const initial = recipes[i].name.substring(0, 1).toUpperCase()
      return `${initial}${pct}`
    }).filter(Boolean).join('-')
    
    points.push({
      index,
      coordinates: coords,
      recipe: blendedRecipe,
      umf: blendedUMF,
      label
    })
    
    index++
  }
  
  trace.push({
    operation: 'simplex_complete',
    inputs: { expectedPoints: simplexPointCount(recipes.length, divisions) },
    output: points.length,
    note: `Generated ${points.length} blend points`
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
 * Get human-readable name for simplex type
 */
function getSimplexName(n: number): string {
  const names: Record<number, string> = {
    2: 'line',
    3: 'triaxial',
    4: 'quadaxial',
    5: 'pentaxial',
    6: 'hexaxial'
  }
  return names[n] || `${n}-axial`
}

/**
 * Convenience functions for specific blend types
 */

export function lineBlend(
  a: GlazeRecipe,
  b: GlazeRecipe,
  aUMF: UMF,
  bUMF: UMF,
  steps: number
): CalculationResult<SimplexPoint[]> {
  return simplexBlend(
    { type: 'line', recipes: [a, b], divisions: steps },
    [aUMF, bUMF]
  )
}

export function triaxialBlend(
  recipes: [GlazeRecipe, GlazeRecipe, GlazeRecipe],
  umfs: [UMF, UMF, UMF],
  divisions: number
): CalculationResult<SimplexPoint[]> {
  return simplexBlend(
    { type: 'triaxial', recipes, divisions },
    umfs
  )
}

export function quadaxialBlend(
  recipes: [GlazeRecipe, GlazeRecipe, GlazeRecipe, GlazeRecipe],
  umfs: [UMF, UMF, UMF, UMF],
  divisions: number
): CalculationResult<SimplexPoint[]> {
  return simplexBlend(
    { type: 'quadaxial', recipes, divisions },
    umfs
  )
}

/**
 * Get corner points only (for preview)
 */
export function getSimplexCorners(
  recipes: GlazeRecipe[],
  umfs: UMF[]
): SimplexPoint[] {
  return recipes.map((recipe, i) => {
    const coords = new Array(recipes.length).fill(0)
    coords[i] = 1
    
    return {
      index: i,
      coordinates: coords,
      recipe,
      umf: umfs[i],
      label: recipe.name
    }
  })
}

/**
 * Get edge midpoints (for preview)
 */
export function getSimplexMidpoints(
  recipes: GlazeRecipe[],
  umfs: UMF[]
): SimplexPoint[] {
  const midpoints: SimplexPoint[] = []
  let index = 0
  
  for (let i = 0; i < recipes.length; i++) {
    for (let j = i + 1; j < recipes.length; j++) {
      const coords = new Array(recipes.length).fill(0)
      coords[i] = 0.5
      coords[j] = 0.5
      
      midpoints.push({
        index: index++,
        coordinates: coords,
        recipe: interpolateRecipes(recipes, coords),
        umf: interpolateUMFs(umfs, coords),
        label: `${recipes[i].name.substring(0, 1)}${recipes[j].name.substring(0, 1)}-50`
      })
    }
  }
  
  return midpoints
}
