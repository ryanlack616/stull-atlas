/**
 * Zustand Stores
 *
 * Reactive state management for the entire application.
 * Each store is a self-contained Zustand slice — no cross-store imports.
 * Components pick stores by importing from '@/stores'.
 *
 *   useGlazeStore        – loaded glazes, plot points, molar variant cache
 *   useMolarWeightStore  – active molar weight set selection
 *   useSelectionStore    – hovered/selected glaze in the explorer
 *   useRecipeStore       – user’s saved recipes (localStorage-persisted)
 *   useThemeStore        – dark/light mode
 *   useFilterStore       – atmosphere, cone, surface, ingredient filters
 *   useAuthStore         – Supabase auth, tier gating, trial status
 */

import { enableMapSet } from 'immer'
enableMapSet()

export { useGlazeStore, precomputeAllMolarVariants } from './glazeStore'
export { useMolarWeightStore } from './molarWeightStore'
export { useMaterialAnalysisStore } from './materialAnalysisStore'
export { useSelectionStore } from './selectionStore'
export { useRecipeStore } from './recipeStore'
export { useThemeStore } from './themeStore'
export { useFilterStore } from './filterStore'
export { useAuthStore, getTrialStatus, hasTierAccess, isFreePeriodActive, isDemoMode } from './authStore'
