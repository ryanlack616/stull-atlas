/**
 * Glaze UMF Utilities
 * 
 * Calculates UMF values for multiple datasets.
 */

import { GlazeRecipe, MaterialDatasetId } from '@/types'
import { recipeToUMF } from '@/calculator'
import { materialDatabase } from '@/infra/materials'

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
