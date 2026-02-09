/**
 * useFilteredPoints — Apply filter store to plot points
 *
 * Resolves each point against the full GlazeRecipe to apply
 * atmosphere, ingredient, and image filters that aren't part
 * of the lightweight GlazePlotPoint type.
 */

import { useMemo } from 'react'
import { GlazePlotPoint, GlazeRecipe } from '@/types'
import { useFilterStore } from '@/stores'
import { useGlazeStore } from '@/stores'

export function useFilteredPoints(points: GlazePlotPoint[]): GlazePlotPoint[] {
  const { atmospheres, surfaces, coneMin, coneMax, hasIngredients, hasImages, activeCount } = useFilterStore()
  const glazes = useGlazeStore(s => s.glazes)

  return useMemo(() => {
    // Fast path — no filters active
    if (activeCount === 0) return points

    return points.filter(p => {
      const glaze = glazes.get(p.id)

      // Atmosphere filter
      if (atmospheres.size > 0) {
        const atmo = glaze?.atmosphere ?? 'unknown'
        if (!atmospheres.has(atmo)) return false
      }

      // Surface filter
      if (surfaces.size > 0) {
        if (!surfaces.has(p.surfaceType)) return false
      }

      // Cone range filter
      if (coneMin !== null && p.cone !== null && p.cone < coneMin) return false
      if (coneMax !== null && p.cone !== null && p.cone > coneMax) return false

      // Has ingredients filter
      if (hasIngredients && glaze) {
        if (!glaze.ingredients || glaze.ingredients.length === 0) return false
      }

      // Has images filter
      if (hasImages && glaze) {
        if (!glaze.images || glaze.images.length === 0) return false
      }

      return true
    })
  }, [points, atmospheres, surfaces, coneMin, coneMax, hasIngredients, hasImages, activeCount, glazes])
}
