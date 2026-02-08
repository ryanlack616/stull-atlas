/**
 * Hook: useSimilarity
 *
 * Computes similar glazes given the current selection and oxide weights.
 * Calls the domain findSimilarGlazes service.
 */

import { useMemo, useState, useCallback } from 'react'
import { GlazeRecipe, OxideSymbol } from '@/types'
import { findSimilarGlazes, type SimilarityResult } from '@/domain/glaze'

const SIMILARITY_OXIDES: OxideSymbol[] = [
  'SiO2', 'Al2O3', 'B2O3', 'Na2O', 'K2O',
  'CaO', 'MgO', 'ZnO', 'SrO', 'BaO',
]

export function useSimilarity(
  target: GlazeRecipe | null,
  allGlazes: Map<string, GlazeRecipe>,
  datasetId: string,
) {
  const [weights, setWeights] = useState<Record<OxideSymbol, number>>(() =>
    SIMILARITY_OXIDES.reduce((acc, o) => ({ ...acc, [o]: 1 }), {} as Record<OxideSymbol, number>),
  )
  const [count, setCount] = useState(6)

  const resetWeights = useCallback(() => {
    setWeights(
      SIMILARITY_OXIDES.reduce((acc, o) => ({ ...acc, [o]: 1 }), {} as Record<OxideSymbol, number>),
    )
  }, [])

  const updateWeight = useCallback((oxide: OxideSymbol, value: number) => {
    setWeights((prev) => ({ ...prev, [oxide]: value }))
  }, [])

  const results: SimilarityResult[] = useMemo(() => {
    if (!target) return []
    const candidates = Array.from(allGlazes.values())
    return findSimilarGlazes(target, candidates, {
      datasetId,
      weights,
      count,
      oxides: SIMILARITY_OXIDES,
    })
  }, [target, allGlazes, datasetId, weights, count])

  return {
    results,
    weights,
    count,
    setCount,
    updateWeight,
    resetWeights,
    oxides: SIMILARITY_OXIDES,
  }
}
