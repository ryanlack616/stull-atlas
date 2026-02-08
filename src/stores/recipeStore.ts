/**
 * Recipe Store
 * 
 * Persistent storage for user-entered recipes.
 * Survives page reloads via localStorage.
 */

import { create } from 'zustand'
import { GlazeRecipe, SimplexPoint } from '@/types'

const STORAGE_KEY = 'stull-atlas-recipes'
const BLEND_RESULTS_KEY = 'stull-atlas-blend-results'

interface RecipeState {
  recipes: GlazeRecipe[]
  blendResults: SimplexPoint[]  // results from calculators, for plotting on explorer
}

interface RecipeActions {
  saveRecipe: (recipe: GlazeRecipe) => void
  removeRecipe: (id: string) => void
  updateRecipe: (id: string, updates: Partial<GlazeRecipe>) => void
  getRecipe: (id: string) => GlazeRecipe | undefined
  clearAll: () => void
  
  // Blend results bridge to explorer
  setBlendResults: (points: SimplexPoint[]) => void
  clearBlendResults: () => void
}

function loadFromStorage(): GlazeRecipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    // Restore Map from serialized form
    return parsed.map((r: any) => ({
      ...r,
      umf: new Map(Object.entries(r.umf || {})),
    }))
  } catch {
    return []
  }
}

function saveToStorage(recipes: GlazeRecipe[]) {
  try {
    // Serialize Maps to plain objects
    const serializable = recipes.map(r => ({
      ...r,
      umf: Object.fromEntries(r.umf),
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable))
  } catch (e) {
    console.warn('Failed to save recipes to localStorage:', e)
  }
}

function loadBlendResults(): SimplexPoint[] {
  try {
    const raw = localStorage.getItem(BLEND_RESULTS_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveBlendResults(points: SimplexPoint[]) {
  try {
    localStorage.setItem(BLEND_RESULTS_KEY, JSON.stringify(points))
  } catch (e) {
    console.warn('Failed to save blend results:', e)
  }
}

export const useRecipeStore = create<RecipeState & RecipeActions>((set, get) => ({
  recipes: loadFromStorage(),
  blendResults: loadBlendResults(),

  saveRecipe: (recipe) => set((state) => {
    // Replace if same id exists, else append
    const existing = state.recipes.findIndex(r => r.id === recipe.id)
    const next = [...state.recipes]
    if (existing >= 0) {
      next[existing] = recipe
    } else {
      next.push(recipe)
    }
    saveToStorage(next)
    return { recipes: next }
  }),

  removeRecipe: (id) => set((state) => {
    const next = state.recipes.filter(r => r.id !== id)
    saveToStorage(next)
    return { recipes: next }
  }),

  updateRecipe: (id, updates) => set((state) => {
    const next = state.recipes.map(r => 
      r.id === id ? { ...r, ...updates } : r
    )
    saveToStorage(next)
    return { recipes: next }
  }),

  getRecipe: (id) => {
    return get().recipes.find(r => r.id === id)
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ recipes: [] })
  },

  setBlendResults: (points) => {
    saveBlendResults(points)
    set({ blendResults: points })
  },

  clearBlendResults: () => {
    localStorage.removeItem(BLEND_RESULTS_KEY)
    set({ blendResults: [] })
  },
}))
