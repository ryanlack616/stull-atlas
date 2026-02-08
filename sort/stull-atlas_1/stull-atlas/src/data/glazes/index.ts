/**
 * Glaze Data Loader
 * 
 * Loads glaze recipes and calculates UMF for each dataset
 */

import { GlazeRecipe, MaterialDatasetId, UMF, Ingredient, Atmosphere, SurfaceType } from '@/types'
import { recipeToUMF, MaterialDatabase } from '@/calculator'
import { materialDatabase } from '../materials'
import sampleGlazes from './sample-glazes.json'

/**
 * Load sample glazes
 */
export function loadSampleGlazes(): GlazeRecipe[] {
  const data = sampleGlazes as any
  const recipes: GlazeRecipe[] = []
  
  for (const glaze of data.glazes) {
    const recipe: GlazeRecipe = {
      id: glaze.id,
      name: glaze.name,
      source: glaze.source as any,
      coneRange: glaze.coneRange,
      atmosphere: (glaze.atmosphere || 'unknown') as Atmosphere,
      surfaceType: (glaze.surfaceType || 'unknown') as SurfaceType,
      ingredients: glaze.ingredients.map((ing: any) => ({
        material: ing.material,
        amount: ing.amount,
        unit: 'weight' as const
      })),
      umf: new Map(),
      notes: glaze.notes,
      umfConfidence: 'inferred',
      verified: false
    }
    
    recipes.push(recipe)
  }
  
  return recipes
}

/**
 * Calculate UMF for all recipes across all datasets
 */
export function calculateAllUMF(
  recipes: GlazeRecipe[],
  datasetIds: MaterialDatasetId[] = ['digitalfire_2024']
): GlazeRecipe[] {
  
  const results: GlazeRecipe[] = []
  
  for (const recipe of recipes) {
    const updatedRecipe = { ...recipe, umf: new Map(recipe.umf) }
    
    for (const datasetId of datasetIds) {
      const result = recipeToUMF(recipe, materialDatabase, datasetId)
      
      if (result.value) {
        updatedRecipe.umf.set(datasetId, result.value)
        updatedRecipe.umfConfidence = result.confidence
      }
    }
    
    results.push(updatedRecipe)
  }
  
  return results
}

/**
 * Import glazes from JSON format
 */
export function importGlazesFromJSON(json: string): GlazeRecipe[] {
  try {
    const data = JSON.parse(json)
    const glazes = data.glazes || data
    
    if (!Array.isArray(glazes)) {
      throw new Error('Expected array of glazes')
    }
    
    return glazes.map((g: any, i: number) => ({
      id: g.id || `imported_${Date.now()}_${i}`,
      name: g.name || `Imported Glaze ${i + 1}`,
      source: g.source || 'user',
      sourceUrl: g.sourceUrl,
      coneRange: g.coneRange || [6, 6],
      atmosphere: g.atmosphere || 'oxidation',
      surfaceType: g.surfaceType || 'unknown',
      ingredients: (g.ingredients || []).map((ing: any) => ({
        material: ing.material || ing.name,
        amount: ing.amount || ing.quantity || 0,
        unit: 'weight' as const
      })),
      umf: new Map(),
      notes: g.notes,
      umfConfidence: 'unknown' as const,
      verified: false
    }))
  } catch (e) {
    console.error('Failed to import glazes:', e)
    return []
  }
}

/**
 * Export glazes to JSON format
 */
export function exportGlazesToJSON(recipes: GlazeRecipe[]): string {
  const exportData = {
    exportedAt: new Date().toISOString(),
    count: recipes.length,
    glazes: recipes.map(r => ({
      id: r.id,
      name: r.name,
      source: r.source,
      sourceUrl: r.sourceUrl,
      coneRange: r.coneRange,
      atmosphere: r.atmosphere,
      surfaceType: r.surfaceType,
      ingredients: r.ingredients,
      notes: r.notes
    }))
  }
  
  return JSON.stringify(exportData, null, 2)
}

/**
 * Parse CSV glaze data
 */
export function importGlazesFromCSV(csv: string): GlazeRecipe[] {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) return []
  
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  const recipes: GlazeRecipe[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    const row: Record<string, string> = {}
    
    headers.forEach((h, j) => {
      row[h] = values[j] || ''
    })
    
    // Parse ingredients (expecting columns like "silica", "feldspar", etc.)
    const ingredients: Ingredient[] = []
    for (const [key, value] of Object.entries(row)) {
      if (['name', 'cone', 'atmosphere', 'surface', 'notes', 'source'].includes(key)) continue
      const amount = parseFloat(value)
      if (!isNaN(amount) && amount > 0) {
        ingredients.push({
          material: key,
          amount,
          unit: 'weight'
        })
      }
    }
    
    if (ingredients.length > 0) {
      recipes.push({
        id: `csv_${Date.now()}_${i}`,
        name: row.name || `CSV Import ${i}`,
        source: 'user',
        coneRange: [row.cone || '6', row.cone || '6'],
        atmosphere: (row.atmosphere || 'oxidation') as Atmosphere,
        surfaceType: (row.surface || 'unknown') as SurfaceType,
        ingredients,
        umf: new Map(),
        notes: row.notes,
        umfConfidence: 'unknown',
        verified: false
      })
    }
  }
  
  return recipes
}
