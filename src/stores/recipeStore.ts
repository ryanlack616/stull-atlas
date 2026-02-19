/**
 * Recipe Store
 * 
 * Persistent storage for user-entered recipes.
 * Survives page reloads via localStorage.
 * When authenticated, syncs to Supabase for cross-device access.
 */

import { create } from 'zustand'
import { GlazeRecipe, SimplexPoint } from '@/types'
import {
  fetchCloudRecipes,
  upsertCloudRecipe,
  deleteCloudRecipe,
  pushAllToCloud,
  clearCloudRecipes,
  mergeRecipes,
} from '@/infra/supabase/recipeSync'

const STORAGE_KEY = 'stull-atlas-recipes'
const BLEND_RESULTS_KEY = 'stull-atlas-blend-results'
const STORAGE_VERSION = 1

// ── Serialization helpers ───────────────────────────────────────────

/** Convert a GlazeRecipe to a plain object for JSON (now a no-op since UMF is already a plain object) */
function serializeRecipe(r: GlazeRecipe): any {
  return r
}

/** Restore a GlazeRecipe from a deserialized plain object */
function deserializeRecipe(raw: any): GlazeRecipe {
  // Handle legacy Map-serialized data: if umf is an object with dataset keys, flatten it
  if (raw.umf && typeof raw.umf === 'object' && !raw.umf.SiO2 && !raw.umf._meta) {
    // Legacy format: { digitalfire_2024: { SiO2: ..., Al2O3: ... } }
    const keys = Object.keys(raw.umf)
    if (keys.length > 0 && typeof raw.umf[keys[0]] === 'object') {
      raw.umf = raw.umf[keys[0]]  // take first dataset's UMF
    }
  }
  return { ...raw, umf: raw.umf ?? null }
}

interface RecipeState {
  recipes: GlazeRecipe[]
  blendResults: SimplexPoint[]  // results from calculators, for plotting on explorer
  blendRecipes: GlazeRecipe[]   // pre-selected glazes to send to blend calculator pages
  _syncUserId: string | null    // non-null when signed in — enables cloud sync
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

  // Pre-fill blend calculator recipes from explorer
  setBlendRecipes: (recipes: GlazeRecipe[]) => void
  clearBlendRecipes: () => void

  // Cloud sync
  syncFromCloud: (userId: string) => Promise<void>
  setSyncUserId: (userId: string | null) => void
}

function loadFromStorage(): GlazeRecipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    const data = parsed._v ? parsed.recipes : parsed // handle versioned or legacy
    return (data as any[]).map(deserializeRecipe)
  } catch (e) {
    console.warn('Failed to load recipes from localStorage:', e)
    return []
  }
}

function saveToStorage(recipes: GlazeRecipe[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      _v: STORAGE_VERSION,
      recipes: recipes.map(serializeRecipe),
    }))
  } catch (e) {
    console.warn('Failed to save recipes to localStorage:', e)
  }
}

function loadBlendResults(): SimplexPoint[] {
  try {
    const raw = localStorage.getItem(BLEND_RESULTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    const data = parsed._v ? parsed.points : parsed // handle versioned or legacy
    return (data as any[]).map((p: any) => ({
      ...p,
      recipe: p.recipe ? deserializeRecipe(p.recipe) : p.recipe,
    }))
  } catch (e) {
    console.warn('Failed to load blend results from localStorage:', e)
    return []
  }
}

function saveBlendResults(points: SimplexPoint[]) {
  try {
    localStorage.setItem(BLEND_RESULTS_KEY, JSON.stringify({
      _v: STORAGE_VERSION,
      points: points.map(p => ({
        ...p,
        recipe: p.recipe ? serializeRecipe(p.recipe) : p.recipe,
      })),
    }))
  } catch (e) {
    console.warn('Failed to save blend results:', e)
  }
}

export const useRecipeStore = create<RecipeState & RecipeActions>((set, get) => ({
  recipes: loadFromStorage(),
  blendResults: loadBlendResults(),
  blendRecipes: [],
  _syncUserId: null,

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
    // Fire-and-forget cloud sync
    const uid = get()._syncUserId
    if (uid) upsertCloudRecipe(recipe, uid)
    return { recipes: next }
  }),

  removeRecipe: (id) => set((state) => {
    const next = state.recipes.filter(r => r.id !== id)
    saveToStorage(next)
    const uid = get()._syncUserId
    if (uid) deleteCloudRecipe(id, uid)
    return { recipes: next }
  }),

  updateRecipe: (id, updates) => set((state) => {
    const next = state.recipes.map(r => 
      r.id === id ? { ...r, ...updates } : r
    )
    saveToStorage(next)
    const updated = next.find(r => r.id === id)
    const uid = get()._syncUserId
    if (uid && updated) upsertCloudRecipe(updated, uid)
    return { recipes: next }
  }),

  getRecipe: (id) => {
    return get().recipes.find(r => r.id === id)
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY)
    const uid = get()._syncUserId
    if (uid) clearCloudRecipes(uid)
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

  setBlendRecipes: (recipes) => set({ blendRecipes: recipes }),
  clearBlendRecipes: () => set({ blendRecipes: [] }),

  // ── Cloud sync ──────────────────────────────────────────────────
  setSyncUserId: (userId) => set({ _syncUserId: userId }),

  syncFromCloud: async (userId) => {
    const cloud = await fetchCloudRecipes(userId)
    const local = get().recipes
    const merged = mergeRecipes(local, cloud)

    // Push any local-only recipes to the cloud
    const cloudIds = new Set(cloud.map(r => r.id))
    const localOnly = local.filter(r => !cloudIds.has(r.id))
    if (localOnly.length > 0) {
      pushAllToCloud(localOnly, userId)
    }

    saveToStorage(merged)
    set({ recipes: merged, _syncUserId: userId })
  },
}))
