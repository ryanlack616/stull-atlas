/**
 * Glaze Data Store
 * 
 * Central store for all glaze recipes
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GlazeRecipe, GlazePlotPoint, MaterialDatasetId } from '@/types'
import { parseCone } from '@/calculator/parseCone'
import {
  type MolarWeightSetId,
  getMolarWeightSetIds,
  recomputeUMF,
} from '@/domain/molarWeights'

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
  
  // Get plot points for current dataset (optionally recomputed for a molar weight set)
  getPlotPoints: (datasetId: MaterialDatasetId, weightSetId?: MolarWeightSetId) => GlazePlotPoint[]
  
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

/**
 * Precomputed molar-weight variant caches.
 * Key = `${datasetId}::${weightSetId}`, value = { version, points }
 * Built once after glazes load, invalidated when _version changes.
 */
const _molarCaches = new Map<string, { version: number; points: GlazePlotPoint[] }>()

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
    
    getPlotPoints: (datasetId, weightSetId) => {
      const version = get()._version

      // ── Fast path: default weights (or no set specified) ──
      if (!weightSetId || weightSetId === 'app_default') {
        if (_plotCache && _plotCache.version === version && _plotCache.datasetId === datasetId) {
          return _plotCache.points
        }

        const points = buildPlotPoints(get().getGlazesArray(), datasetId)
        _plotCache = { version, datasetId, points }

        // Also seed the molar cache for 'app_default'
        _molarCaches.set(`${datasetId}::app_default`, { version, points })

        return points
      }

      // ── Molar-weight variant path ──
      const cacheKey = `${datasetId}::${weightSetId}`
      const cached = _molarCaches.get(cacheKey)
      if (cached && cached.version === version) return cached.points

      // Ensure base (app_default / glazy_current) points exist
      if (!_plotCache || _plotCache.version !== version || _plotCache.datasetId !== datasetId) {
        const base = buildPlotPoints(get().getGlazesArray(), datasetId)
        _plotCache = { version, datasetId, points: base }
        _molarCaches.set(`${datasetId}::app_default`, { version, points: base })
      }

      // Recompute from original UMFs with the target weight set
      // Glazy data was computed with glazy_current weights;
      // user recipes use app_default. For simplicity, treat all
      // stored UMFs as originating from glazy_current (they're
      // nearly identical to app_default — <0.03% difference).
      const fromSet: MolarWeightSetId = 'glazy_current'
      const glazes = get().getGlazesArray()
      const points = buildPlotPointsRecomputed(glazes, datasetId, fromSet, weightSetId)
      _molarCaches.set(cacheKey, { version, points })
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

// ── Helper: resolve a glaze's UMF for a given material dataset ──

function resolveUMF(g: GlazeRecipe, datasetId: MaterialDatasetId) {
  let umf = g.umf.get(datasetId)
  if (!umf) {
    for (const [, u] of g.umf) {
      if (u) { umf = u; break }
    }
  }
  return umf ?? null
}

// ── Helper: extract a GlazePlotPoint from a UMF ──

function umfToPlotPoint(
  g: GlazeRecipe,
  umf: import('@/types').UMF,
): GlazePlotPoint {
  const SiO2  = umf.SiO2?.value ?? 0
  const Al2O3 = umf.Al2O3?.value ?? 0
  const R2O = (umf.Li2O?.value ?? 0) + (umf.Na2O?.value ?? 0) + (umf.K2O?.value ?? 0)
  const RO  = (umf.MgO?.value ?? 0) + (umf.CaO?.value ?? 0) + (umf.BaO?.value ?? 0) +
              (umf.SrO?.value ?? 0) + (umf.ZnO?.value ?? 0)

  return {
    id: g.id,
    name: g.name,
    source: g.source,
    x: SiO2,
    y: Al2O3,
    cone: parseCone(g.coneRange[0]),
    surfaceType: g.surfaceType,
    glazeTypeId: g.glazeTypeId ?? null,
    fluxRatio: RO > 0.001 ? R2O / RO : 0,
    boron: umf.B2O3?.value ?? 0,
    confidence: g.umfConfidence,
  }
}

/**
 * Build plot points using the stored UMF values (no weight-set recomputation).
 */
function buildPlotPoints(
  glazes: GlazeRecipe[],
  datasetId: MaterialDatasetId,
): GlazePlotPoint[] {
  return glazes
    .map(g => {
      const umf = resolveUMF(g, datasetId)
      if (!umf) return null
      return umfToPlotPoint(g, umf)
    })
    .filter((p): p is GlazePlotPoint => p !== null)
}

/**
 * Build plot points with UMFs recomputed from one molar-weight set to another.
 */
function buildPlotPointsRecomputed(
  glazes: GlazeRecipe[],
  datasetId: MaterialDatasetId,
  fromSetId: MolarWeightSetId,
  toSetId: MolarWeightSetId,
): GlazePlotPoint[] {
  return glazes
    .map(g => {
      const umf = resolveUMF(g, datasetId)
      if (!umf) return null
      const adjusted = recomputeUMF(umf, fromSetId, toSetId)
      return umfToPlotPoint(g, adjusted)
    })
    .filter((p): p is GlazePlotPoint => p !== null)
}

/**
 * Precompute plot points for every molar-weight set.
 * Called once after glazes load. Runs in ~5ms for 4000 glazes × 6 sets.
 */
export function precomputeAllMolarVariants(datasetId: MaterialDatasetId) {
  const state = useGlazeStore.getState()
  const version = state._version
  const glazes = state.getGlazesArray()

  // Base (original UMF, no recomputation)
  const base = buildPlotPoints(glazes, datasetId)
  _plotCache = { version, datasetId, points: base }
  _molarCaches.set(`${datasetId}::app_default`, { version, points: base })
  _molarCaches.set(`${datasetId}::glazy_current`, { version, points: base })

  // Recomputed variants
  const fromSet: MolarWeightSetId = 'glazy_current'
  for (const setId of getMolarWeightSetIds()) {
    if (setId === 'app_default' || setId === 'glazy_current') continue
    const cacheKey = `${datasetId}::${setId}`
    const points = buildPlotPointsRecomputed(glazes, datasetId, fromSet, setId)
    _molarCaches.set(cacheKey, { version, points })
  }

  if (typeof console !== 'undefined') {
    console.log(
      `[molar] Precomputed ${_molarCaches.size} plot-point variants ` +
      `(${glazes.length} glazes × ${_molarCaches.size} sets)`
    )
  }
}
