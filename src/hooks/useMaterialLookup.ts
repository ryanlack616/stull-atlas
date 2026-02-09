/**
 * Hook: useMaterialLookup
 *
 * Convenience hook for resolving material names from the domain layer.
 */

import { useMemo } from 'react'
import { materialDatabase, getAllMaterials } from '@/domain/material'
import type { Material } from '@/types'

/**
 * Returns the materialDatabase singleton and a memoized list of all materials.
 */
export function useMaterialLookup() {
  const allMaterials = useMemo(() => getAllMaterials(), [])

  return {
    materialDatabase,
    allMaterials,
    resolve: (name: string) => materialDatabase.resolve(name),
    getAnalysis: (materialId: string) => materialDatabase.getAnalysis(materialId),
  }
}
