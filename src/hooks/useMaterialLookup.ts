/**
 * Hook: useMaterialLookup
 *
 * Convenience hook for resolving material names from the domain layer.
 */

import { useMemo } from 'react'
import { materialDatabase, getAllMaterials } from '@/domain/material'
import type { Material, MaterialDatasetId } from '@/types'

/**
 * Returns the materialDatabase singleton and a memoized list of all materials.
 */
export function useMaterialLookup(datasetId: MaterialDatasetId = 'digitalfire_2024') {
  const allMaterials = useMemo(() => getAllMaterials(), [])

  return {
    materialDatabase,
    allMaterials,
    resolve: (name: string) => materialDatabase.resolve(name, datasetId),
    getAnalysis: (materialId: string) => materialDatabase.getAnalysis(materialId, datasetId),
  }
}
