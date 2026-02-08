/**
 * Glaze Data Store
 * 
 * Central store for all glaze recipes
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GlazeRecipe, GlazePlotPoint, MaterialDatasetId } from '@/types'
import { parseCone } from '@/calculator/parseCone'

interface GlazeState {
  // All loaded glazes
  glazes: Map<string, GlazeRecipe>
  
  // Loading state
  isLoading: boolean
  loadError: string | null
  
  // Internal version counter for cache invalidation
  _version: number
  
  // Statistics
  stats: {
    total: number
    bySource: Record<string, number>
    byCone: Record<string, number>
  }
}

interface GlazeActions {
  // Load glazes from various sources
  loadGlazes: (glazes: GlazeRecipe[]) => void
  addGlaze: (glaze: GlazeRecipe) => void
  removeGlaze: (id: string) => void
  updateGlaze: (id: string, updates: Partial<GlazeRecipe>) => void
  
  // Get glazes as array
  getGlazesArray: () => GlazeRecipe[]
  
  // Get plot points for current dataset
  getPlotPoints: (datasetId: MaterialDatasetId) => GlazePlotPoint[]
  
  // Clear all
  clear: () => void
  
  // Set loading state
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const initialState: GlazeState = {
  glazes: new Map(),
  isLoading: false,
  loadError: null,
  _version: 0,
  stats: {
    total: 0,
    bySource: {},
    byCone: {}
  }
}

// Plot-points cache: avoids recomputing on every render
let _plotCache: { version: number; datasetId: MaterialDatasetId; points: GlazePlotPoint[] } | null = null

export const useGlazeStore = create<GlazeState & GlazeActions>()(
  immer((set, get) => ({
    ...initialState,
    
    loadGlazes: (glazes) => set((state) => {
      for (const glaze of glazes) {
        state.glazes.set(glaze.id, glaze)
      }
      state._version++
      updateStats(state)
    }),
    
    addGlaze: (glaze) => set((state) => {
      state.glazes.set(glaze.id, glaze)
      state._version++
      updateStats(state)
    }),
    
    removeGlaze: (id) => set((state) => {
      state.glazes.delete(id)
      state._version++
      updateStats(state)
    }),
    
    updateGlaze: (id, updates) => set((state) => {
      const existing = state.glazes.get(id)
      if (existing) {
        state.glazes.set(id, { ...existing, ...updates })
        state._version++
      }
    }),
    
    getGlazesArray: () => {
      return Array.from(get().glazes.values())
    },
    
    getPlotPoints: (datasetId) => {
      const version = get()._version
      if (_plotCache && _plotCache.version === version && _plotCache.datasetId === datasetId) {
        return _plotCache.points
      }

      const glazes = get().getGlazesArray()
      
      const points = glazes
        .map(g => {
          // Try requested dataset first, then fall back to any available UMF
          let umf = g.umf.get(datasetId)
          if (!umf) {
            // Try alternative datasets — allows user recipes (digitalfire_2024) 
            // to show on the glazy_default view and vice versa
            for (const [, u] of g.umf) {
              if (u) { umf = u; break }
            }
          }
          if (!umf) return null
          
          const SiO2 = umf.SiO2?.value ?? 0
          const Al2O3 = umf.Al2O3?.value ?? 0
          
          // Calculate flux ratio
          const R2O = (umf.Li2O?.value ?? 0) + (umf.Na2O?.value ?? 0) + (umf.K2O?.value ?? 0)
          const RO = (umf.MgO?.value ?? 0) + (umf.CaO?.value ?? 0) + (umf.BaO?.value ?? 0) + 
                     (umf.SrO?.value ?? 0) + (umf.ZnO?.value ?? 0)
          
          return {
            id: g.id,
            name: g.name,
            source: g.source,
            x: SiO2,
            y: Al2O3,
            cone: parseCone(g.coneRange[0]),
            surfaceType: g.surfaceType,
            fluxRatio: RO > 0.001 ? R2O / RO : 0,
            boron: umf.B2O3?.value ?? 0,
            confidence: g.umfConfidence
          }
        })
        .filter((p): p is GlazePlotPoint => p !== null)

      _plotCache = { version, datasetId, points }
      return points
    },
    
    clear: () => set(initialState),
    
    setLoading: (loading) => set((state) => {
      state.isLoading = loading
    }),
    
    setError: (error) => set((state) => {
      state.loadError = error
    })
  }))
)

function updateStats(state: GlazeState) {
  const glazes = Array.from(state.glazes.values())
  
  state.stats.total = glazes.length
  
  // Count by source
  state.stats.bySource = {}
  for (const g of glazes) {
    state.stats.bySource[g.source] = (state.stats.bySource[g.source] || 0) + 1
  }
  
  // Count by cone
  state.stats.byCone = {}
  for (const g of glazes) {
    const cone = String(g.coneRange[0])
    state.stats.byCone[cone] = (state.stats.byCone[cone] || 0) + 1
  }
}
