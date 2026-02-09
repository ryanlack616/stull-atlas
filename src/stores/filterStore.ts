/**
 * Filter Store — Global plot data filtering
 *
 * Manages atmosphere, surface, cone range, and glaze type filters.
 * Both StullPlot and StullPlot3D consume these to show/hide points.
 */

import { create } from 'zustand'
import type { Atmosphere, SurfaceType } from '@/types'

export interface FilterState {
  /** Which atmospheres to show (empty = show all) */
  atmospheres: Set<string>
  /** Which surface types to show (empty = show all) */
  surfaces: Set<string>
  /** Cone range [min, max] inclusive. null = no filter */
  coneMin: number | null
  coneMax: number | null
  /** Only show glazes with recipe data */
  hasIngredients: boolean
  /** Only show glazes with images */
  hasImages: boolean
  /** Active filter count (for badge) */
  activeCount: number
}

interface FilterActions {
  toggleAtmosphere: (atmo: string) => void
  toggleSurface: (surf: string) => void
  setConeRange: (min: number | null, max: number | null) => void
  setHasIngredients: (v: boolean) => void
  setHasImages: (v: boolean) => void
  clearAll: () => void
}

function countActive(state: FilterState): number {
  let n = 0
  if (state.atmospheres.size > 0) n++
  if (state.surfaces.size > 0) n++
  if (state.coneMin !== null || state.coneMax !== null) n++
  if (state.hasIngredients) n++
  if (state.hasImages) n++
  return n
}

export const useFilterStore = create<FilterState & FilterActions>()((set) => ({
  atmospheres: new Set(),
  surfaces: new Set(),
  coneMin: null,
  coneMax: null,
  hasIngredients: false,
  hasImages: false,
  activeCount: 0,

  toggleAtmosphere: (atmo) => set((s) => {
    const next = new Set(s.atmospheres)
    if (next.has(atmo)) next.delete(atmo)
    else next.add(atmo)
    const ns = { ...s, atmospheres: next }
    return { ...ns, activeCount: countActive(ns) }
  }),

  toggleSurface: (surf) => set((s) => {
    const next = new Set(s.surfaces)
    if (next.has(surf)) next.delete(surf)
    else next.add(surf)
    const ns = { ...s, surfaces: next }
    return { ...ns, activeCount: countActive(ns) }
  }),

  setConeRange: (min, max) => set((s) => {
    const ns = { ...s, coneMin: min, coneMax: max }
    return { ...ns, activeCount: countActive(ns) }
  }),

  setHasIngredients: (v) => set((s) => {
    const ns = { ...s, hasIngredients: v }
    return { ...ns, activeCount: countActive(ns) }
  }),

  setHasImages: (v) => set((s) => {
    const ns = { ...s, hasImages: v }
    return { ...ns, activeCount: countActive(ns) }
  }),

  clearAll: () => set({
    atmospheres: new Set(),
    surfaces: new Set(),
    coneMin: null,
    coneMax: null,
    hasIngredients: false,
    hasImages: false,
    activeCount: 0,
  }),
}))
