/**
 * Dataset Store
 * 
 * Manages material datasets and the wiggle test
 */

import { create } from 'zustand'
import { MaterialDatasetId } from '@/types'

interface DatasetInfo {
  id: MaterialDatasetId
  name: string
  description: string
  materialCount: number
  lastUpdated?: string
}

interface DatasetState {
  // Available datasets
  datasets: DatasetInfo[]
  
  // Current active dataset
  currentDataset: MaterialDatasetId
  
  // Wiggle test state
  wiggleTest: {
    isAnimating: boolean
    animationSpeed: number  // ms between frames
    currentIndex: number
    datasetsToCompare: MaterialDatasetId[]
  }
}

interface DatasetActions {
  // Dataset management
  setCurrentDataset: (id: MaterialDatasetId) => void
  addDataset: (info: DatasetInfo) => void
  removeDataset: (id: MaterialDatasetId) => void
  
  // Wiggle test controls
  startWiggleTest: (datasets?: MaterialDatasetId[]) => void
  stopWiggleTest: () => void
  stepWiggleTest: () => void
  setWiggleSpeed: (speed: number) => void
  
  // Get dataset info
  getDatasetInfo: (id: MaterialDatasetId) => DatasetInfo | undefined
}

const DEFAULT_DATASETS: DatasetInfo[] = [
  {
    id: 'glazy_default',
    name: 'Glazy',
    description: 'Glazy community material data',
    materialCount: 8897
  },
  {
    id: 'digitalfire_2024',
    name: 'Digitalfire',
    description: 'User recipes calculated with Digitalfire material analyses',
    materialCount: 62
  }
]

/** Module-level interval handle — avoids stashing state via `as any` casts */
let _wiggleInterval: ReturnType<typeof setInterval> | null = null

export const useDatasetStore = create<DatasetState & DatasetActions>((set, get) => ({
  datasets: DEFAULT_DATASETS,
  currentDataset: 'glazy_default',
  
  wiggleTest: {
    isAnimating: false,
    animationSpeed: 500,
    currentIndex: 0,
    datasetsToCompare: ['glazy_default', 'digitalfire_2024']
  },
  
  setCurrentDataset: (id) => set({ currentDataset: id }),
  
  addDataset: (info) => set((state) => ({
    datasets: [...state.datasets, info]
  })),
  
  removeDataset: (id) => set((state) => ({
    datasets: state.datasets.filter(d => d.id !== id)
  })),
  
  startWiggleTest: (datasets) => {
    const state = get()
    const toCompare = datasets || state.wiggleTest.datasetsToCompare
    
    // Clear any existing interval first to prevent stacking
    if (_wiggleInterval !== null) {
      clearInterval(_wiggleInterval)
      _wiggleInterval = null
    }
    
    // Start animation interval
    _wiggleInterval = setInterval(() => {
      const current = get()
      if (!current.wiggleTest.isAnimating) {
        if (_wiggleInterval !== null) {
          clearInterval(_wiggleInterval)
          _wiggleInterval = null
        }
        return
      }
      
      const nextIndex = (current.wiggleTest.currentIndex + 1) % current.wiggleTest.datasetsToCompare.length
      const nextDataset = current.wiggleTest.datasetsToCompare[nextIndex]
      
      set({
        currentDataset: nextDataset,
        wiggleTest: {
          ...current.wiggleTest,
          currentIndex: nextIndex,
        }
      })
    }, state.wiggleTest.animationSpeed)
    
    set({
      wiggleTest: {
        ...state.wiggleTest,
        isAnimating: true,
        datasetsToCompare: toCompare,
        currentIndex: 0,
      }
    })
  },
  
  stopWiggleTest: () => {
    if (_wiggleInterval !== null) {
      clearInterval(_wiggleInterval)
      _wiggleInterval = null
    }
    set((state) => ({
      wiggleTest: {
        ...state.wiggleTest,
        isAnimating: false
      }
    }))
  },
  
  stepWiggleTest: () => set((state) => {
    const nextIndex = (state.wiggleTest.currentIndex + 1) % state.wiggleTest.datasetsToCompare.length
    const nextDataset = state.wiggleTest.datasetsToCompare[nextIndex]
    
    return {
      currentDataset: nextDataset,
      wiggleTest: {
        ...state.wiggleTest,
        currentIndex: nextIndex
      }
    }
  }),
  
  setWiggleSpeed: (speed) => set((state) => ({
    wiggleTest: {
      ...state.wiggleTest,
      animationSpeed: speed
    }
  })),
  
  getDatasetInfo: (id) => {
    return get().datasets.find(d => d.id === id)
  }
}))
