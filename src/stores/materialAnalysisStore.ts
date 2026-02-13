/**
 * Material Analysis Store
 *
 * Zustand store for managing the active material analysis set.
 *
 * Design: When the user switches sets, this store pushes
 * per-material overrides into the MaterialDatabase singleton
 * so that every consumer (UMF calculator, materials page,
 * blend calculator, etc.) picks up the new values automatically.
 *
 * Mirrors the molarWeightStore pattern exactly.
 */

import { create } from 'zustand'
import {
  type MaterialAnalysisSetId,
  type MaterialAnalysisSetInfo,
  getAnalysisSetInfos,
  getAnalysisOverrides,
  getDefaultAnalysisSetId,
} from '@/domain/materialAnalysis'
import { materialDatabase } from '@/infra/materials'

// ─── State shape ───────────────────────────────────────────────

interface MaterialAnalysisState {
  /** Currently active analysis set ID */
  currentSetId: MaterialAnalysisSetId

  /** All available set infos (cached on init) */
  availableSets: MaterialAnalysisSetInfo[]
}

interface MaterialAnalysisActions {
  /** Switch to a specific analysis set */
  setAnalysisSet: (id: MaterialAnalysisSetId) => void
}

// ─── Store ─────────────────────────────────────────────────────

export const useMaterialAnalysisStore = create<MaterialAnalysisState & MaterialAnalysisActions>(
  (set) => ({
    // ── Initial state ──────────────────────────────────────────
    currentSetId: getDefaultAnalysisSetId(),
    availableSets: getAnalysisSetInfos(),

    // ── Actions ────────────────────────────────────────────────

    setAnalysisSet: (id) => {
      set({ currentSetId: id })
    },
  })
)

/**
 * Keep the MaterialDatabase singleton in sync with the store.
 * When the analysis set changes, push overrides into the DB
 * so all consumers see the new values immediately.
 */
useMaterialAnalysisStore.subscribe(
  (state) => {
    const overrides = getAnalysisOverrides(state.currentSetId)
    materialDatabase.setAnalysisOverrides(overrides)
  }
)
