/**
 * Molar Weight Store
 *
 * Zustand store for managing the active molar weight set.
 *
 * Design: The store holds the current weights as a plain object.
 * Calculator functions receive `weights` as a parameter,
 * so the store acts as the single source of truth for "which
 * molecular weights are we using right now?"
 */

import { create } from 'zustand'
import {
  type MolarWeightSetId,
  type MolarWeights,
  type MolarWeightSetInfo,
  getMolarWeights,
  getMolarWeightSetInfos,
  getDefaultWeights,
} from '@/domain/molarWeights'
import { setActiveWeights } from '@/calculator/constants'

// ─── State shape ───────────────────────────────────────────────

interface MolarWeightState {
  /** Currently active weight set ID */
  currentSetId: MolarWeightSetId

  /** The actual weights, pre-resolved for fast access */
  weights: MolarWeights

  /** All available set infos (cached on init) */
  availableSets: MolarWeightSetInfo[]
}

interface MolarWeightActions {
  /** Switch to a specific weight set */
  setMolarWeightSet: (id: MolarWeightSetId) => void
}

// ─── Store ─────────────────────────────────────────────────────

export const useMolarWeightStore = create<MolarWeightState & MolarWeightActions>(
  (set) => ({
    // ── Initial state ──────────────────────────────────────────
    currentSetId: 'app_default',
    weights: getDefaultWeights(),
    availableSets: getMolarWeightSetInfos(),

    // ── Actions ────────────────────────────────────────────────

    setMolarWeightSet: (id) => {
      set({
        currentSetId: id,
        weights: getMolarWeights(id),
      })
    },
  })
)

/**
 * Keep the calculator's module-level weights in sync with the store.
 * This is the bridge between Zustand reactivity and the pure calculator layer.
 * Fires immediately with the current value, then on every change.
 */
useMolarWeightStore.subscribe(
  (state) => {
    setActiveWeights(state.weights)
  }
)
