/**
 * Selection Store
 * 
 * Manages UI selection state
 */

import { create } from 'zustand'
import { GlazeRecipe, GlazePlotPoint } from '@/types'

interface SelectionState {
  // Selected glaze (clicked)
  selectedGlaze: GlazeRecipe | null
  selectedPoint: GlazePlotPoint | null
  
  // Hovered glaze
  hoveredGlaze: GlazeRecipe | null
  hoveredPoint: GlazePlotPoint | null
  
  // Multi-select for blends
  selectedForBlend: GlazeRecipe[]
  maxBlendSelection: number
  
  // View state
  showSidebar: boolean
  sidebarTab: 'detail' | 'blend' | 'analysis'
}

interface SelectionActions {
  // Single selection
  setSelectedGlaze: (glaze: GlazeRecipe | null) => void
  setSelectedPoint: (point: GlazePlotPoint | null) => void
  
  // Hover
  setHoveredGlaze: (glaze: GlazeRecipe | null) => void
  setHoveredPoint: (point: GlazePlotPoint | null) => void
  
  // Blend selection
  addToBlendSelection: (glaze: GlazeRecipe) => void
  removeFromBlendSelection: (id: string) => void
  clearBlendSelection: () => void
  setMaxBlendSelection: (max: number) => void
  
  // Sidebar
  toggleSidebar: () => void
  setSidebarTab: (tab: 'detail' | 'blend' | 'analysis') => void
  
  // Clear all
  clearSelection: () => void
}

export const useSelectionStore = create<SelectionState & SelectionActions>((set) => ({
  selectedGlaze: null,
  selectedPoint: null,
  hoveredGlaze: null,
  hoveredPoint: null,
  selectedForBlend: [],
  maxBlendSelection: 5,  // Default max for pentaxial
  showSidebar: true,
  sidebarTab: 'detail',
  
  setSelectedGlaze: (glaze) => set({ 
    selectedGlaze: glaze,
    showSidebar: glaze !== null
  }),
  
  setSelectedPoint: (point) => set({ selectedPoint: point }),
  
  setHoveredGlaze: (glaze) => set({ hoveredGlaze: glaze }),
  
  setHoveredPoint: (point) => set({ hoveredPoint: point }),
  
  addToBlendSelection: (glaze) => set((state) => {
    // Don't add duplicates
    if (state.selectedForBlend.some(g => g.id === glaze.id)) {
      return state
    }
    
    // Enforce max selection
    if (state.selectedForBlend.length >= state.maxBlendSelection) {
      return state
    }
    
    return {
      selectedForBlend: [...state.selectedForBlend, glaze]
    }
  }),
  
  removeFromBlendSelection: (id) => set((state) => ({
    selectedForBlend: state.selectedForBlend.filter(g => g.id !== id)
  })),
  
  clearBlendSelection: () => set({ selectedForBlend: [] }),
  
  setMaxBlendSelection: (max) => set((state) => ({
    maxBlendSelection: max,
    // Trim if current selection exceeds new max
    selectedForBlend: state.selectedForBlend.slice(0, max)
  })),
  
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
  
  setSidebarTab: (tab) => set({ sidebarTab: tab, showSidebar: true }),
  
  clearSelection: () => set({
    selectedGlaze: null,
    selectedPoint: null,
    hoveredGlaze: null,
    hoveredPoint: null,
    selectedForBlend: []
  })
}))
