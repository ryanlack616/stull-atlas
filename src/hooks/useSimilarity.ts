/**
 * Hook: useSimilarity
 *
 * Computes similar glazes given the current selection and oxide weights.
 * Calls the domain findSimilarGlazes service.
 */

import { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { GlazeRecipe, OxideSymbol } from '@/types'
import { findSimilarGlazes, type SimilarityResult } from '@/domain/glaze'

const SIMILARITY_OXIDES: OxideSymbol[] = [
  'SiO2', 'Al2O3', 'B2O3', 'Na2O', 'K2O',
  'CaO', 'MgO', 'ZnO', 'SrO', 'BaO',
]

export function useSimilarity(
  target: GlazeRecipe | null,
  allGlazes: Map<string, GlazeRecipe>,
) {
  const [weights, setWeights] = useState<Record<OxideSymbol, number>>(() =>
    SIMILARITY_OXIDES.reduce((acc, o) => ({ ...acc, [o]: 1 }), {} as Record<OxideSymbol, number>),
  )
  const [count, setCount] = useState(6)

  // Debounce weights to avoid re-running expensive similarity on every slider tick
  const [debouncedWeights, setDebouncedWeights] = useState(weights)
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    debounceTimer.current = setTimeout(() => setDebouncedWeights(weights), 150)
    return () => clearTimeout(debounceTimer.current)
  }, [weights])

  const resetWeights = useCallback(() => {
    const reset = SIMILARITY_OXIDES.reduce((acc, o) => ({ ...acc, [o]: 1 }), {} as Record<OxideSymbol, number>)
    setWeights(reset)
    setDebouncedWeights(reset) // immediate update on reset
  }, [])

  const updateWeight = useCallback((oxide: OxideSymbol, value: number) => {
    setWeights((prev) => ({ ...prev, [oxide]: value }))
  }, [])

  const results: SimilarityResult[] = useMemo(() => {
    if (!target) return []
    const candidates = Array.from(allGlazes.values())
    return findSimilarGlazes(target, candidates, {
      weights: debouncedWeights,
      count,
      oxides: SIMILARITY_OXIDES,
    })
  }, [target, allGlazes, debouncedWeights, count])

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
