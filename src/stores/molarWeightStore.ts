/**
 * Molar Weight Store
 *
 * Zustand store for managing the active molar weight set.
 * Cycles between
 * selected weight sets on a timer so users can see how their
 * glazes shift on the Stull chart.
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
  getMolarWeightSetIds,
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

  /** Wiggle animation state */
  wiggle: {
    isAnimating: boolean
    animationSpeed: number // ms between frames
    currentIndex: number
    setsToCompare: MolarWeightSetId[]
  }
}

interface MolarWeightActions {
  /** Switch to a specific weight set */
  setMolarWeightSet: (id: MolarWeightSetId) => void

  /** Start wiggle animation across selected sets */
  startWiggle: (sets?: MolarWeightSetId[]) => void

  /** Stop wiggle animation */
  stopWiggle: () => void

  /** Advance one frame (manual step) */
  stepWiggle: () => void

  /** Change animation speed (ms between frames) */
  setWiggleSpeed: (speed: number) => void

  /** Update which sets to include in the wiggle */
  setWiggleSets: (sets: MolarWeightSetId[]) => void
}

// ─── Module-level interval handle ──────────────────────────────

let _molarWiggleInterval: ReturnType<typeof setInterval> | null = null

// ─── Store ─────────────────────────────────────────────────────

export const useMolarWeightStore = create<MolarWeightState & MolarWeightActions>(
  (set, get) => ({
    // ── Initial state ──────────────────────────────────────────
    currentSetId: 'app_default',
    weights: getDefaultWeights(),
    availableSets: getMolarWeightSetInfos(),

    wiggle: {
      isAnimating: false,
      animationSpeed: 800, // slower than dataset wiggle — let users read the labels
      currentIndex: 0,
      setsToCompare: getMolarWeightSetIds(),
    },

    // ── Actions ────────────────────────────────────────────────

    setMolarWeightSet: (id) => {
      set({
        currentSetId: id,
        weights: getMolarWeights(id),
      })
    },

    startWiggle: (sets) => {
      const state = get()
      const toCompare = sets ?? state.wiggle.setsToCompare

      if (toCompare.length < 2) return // need at least 2 sets to wiggle

      // Clear any existing interval
      if (_molarWiggleInterval !== null) {
        clearInterval(_molarWiggleInterval)
        _molarWiggleInterval = null
      }

      // Start animation
      _molarWiggleInterval = setInterval(() => {
        const current = get()
        if (!current.wiggle.isAnimating) {
          if (_molarWiggleInterval !== null) {
            clearInterval(_molarWiggleInterval)
            _molarWiggleInterval = null
          }
          return
        }

        const nextIndex =
          (current.wiggle.currentIndex + 1) % current.wiggle.setsToCompare.length
        const nextSetId = current.wiggle.setsToCompare[nextIndex]

        set({
          currentSetId: nextSetId,
          weights: getMolarWeights(nextSetId),
          wiggle: {
            ...current.wiggle,
            currentIndex: nextIndex,
          },
        })
      }, state.wiggle.animationSpeed)

      // Set initial state — start at index 0 with the first set
      const firstSet = toCompare[0]
      set({
        currentSetId: firstSet,
        weights: getMolarWeights(firstSet),
        wiggle: {
          ...state.wiggle,
          isAnimating: true,
          setsToCompare: toCompare,
          currentIndex: 0,
        },
      })
    },

    stopWiggle: () => {
      if (_molarWiggleInterval !== null) {
        clearInterval(_molarWiggleInterval)
        _molarWiggleInterval = null
      }
      set((state) => ({
        wiggle: {
          ...state.wiggle,
          isAnimating: false,
        },
      }))
    },

    stepWiggle: () => {
      set((state) => {
        const nextIndex =
          (state.wiggle.currentIndex + 1) % state.wiggle.setsToCompare.length
        const nextSetId = state.wiggle.setsToCompare[nextIndex]

        return {
          currentSetId: nextSetId,
          weights: getMolarWeights(nextSetId),
          wiggle: {
            ...state.wiggle,
            currentIndex: nextIndex,
          },
        }
      })
    },

    setWiggleSpeed: (speed) => {
      const state = get()

      set({
        wiggle: {
          ...state.wiggle,
          animationSpeed: speed,
        },
      })

      // If currently animating, restart with new speed
      if (state.wiggle.isAnimating) {
        if (_molarWiggleInterval !== null) {
          clearInterval(_molarWiggleInterval)
        }
        _molarWiggleInterval = setInterval(() => {
          const current = get()
          if (!current.wiggle.isAnimating) {
            if (_molarWiggleInterval !== null) {
              clearInterval(_molarWiggleInterval)
              _molarWiggleInterval = null
            }
            return
          }

          const nextIndex =
            (current.wiggle.currentIndex + 1) % current.wiggle.setsToCompare.length
          const nextSetId = current.wiggle.setsToCompare[nextIndex]

          set({
            currentSetId: nextSetId,
            weights: getMolarWeights(nextSetId),
            wiggle: {
              ...current.wiggle,
              currentIndex: nextIndex,
            },
          })
        }, speed)
      }
    },

    setWiggleSets: (sets) => {
      set((state) => ({
        wiggle: {
          ...state.wiggle,
          setsToCompare: sets,
          currentIndex: 0,
        },
      }))
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
