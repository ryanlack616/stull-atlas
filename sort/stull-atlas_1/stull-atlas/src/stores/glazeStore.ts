/**
 * Glaze Data Store
 * 
 * Central store for all glaze recipes
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GlazeRecipe, GlazePlotPoint, MaterialDatasetId } from '@/types'

interface GlazeState {
  // All loaded glazes
  glazes: Map<string, GlazeRecipe>
  
  // Loading state
  isLoading: boolean
  loadError: string | null
  
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
  stats: {
    total: 0,
    bySource: {},
    byCone: {}
  }
}

export const useGlazeStore = create<GlazeState & GlazeActions>()(
  immer((set, get) => ({
    ...initialState,
    
    loadGlazes: (glazes) => set((state) => {
      for (const glaze of glazes) {
        state.glazes.set(glaze.id, glaze)
      }
      updateStats(state)
    }),
    
    addGlaze: (glaze) => set((state) => {
      state.glazes.set(glaze.id, glaze)
      updateStats(state)
    }),
    
    removeGlaze: (id) => set((state) => {
      state.glazes.delete(id)
      updateStats(state)
    }),
    
    updateGlaze: (id, updates) => set((state) => {
      const existing = state.glazes.get(id)
      if (existing) {
        state.glazes.set(id, { ...existing, ...updates })
      }
    }),
    
    getGlazesArray: () => {
      return Array.from(get().glazes.values())
    },
    
    getPlotPoints: (datasetId) => {
      const glazes = get().getGlazesArray()
      
      return glazes
        .filter(g => g.umf.has(datasetId))
        .map(g => {
          const umf = g.umf.get(datasetId)!
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

function parseCone(cone: string | number): number | null {
  if (typeof cone === 'number') return cone
  if (!cone) return null
  if (cone.startsWith('0')) return -parseInt(cone, 10)
  const parsed = parseInt(cone, 10)
  return isNaN(parsed) ? null : parsed
}
