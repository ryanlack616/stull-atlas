/**
 * Recipe Optimizer / Constraint Solver
 *
 * Given target oxide values (or ranges), find a recipe that meets them.
 * Uses an iterative gradient-free approach:
 *   1. Start with equal-weight proportions of selected materials
 *   2. Compute the UMF
 *   3. Adjust weights toward the target using projected gradient descent
 *   4. Repeat until constraints are satisfied or max iterations reached
 *
 * Philosophy: Transparent & bounded
 *   - Every step is traceable
 *   - Refuse to claim success on loose convergence
 *   - Works with the existing MaterialDatabase
 */

import { OxideSymbol, Material } from '@/types'
import { MOLECULAR_WEIGHTS, FLUX_OXIDES, EPSILON, roundTo } from './constants'
import type { MaterialDatabase as IMatDB } from './umf'

// ─── Public types ──────────────────────────────────────────────────

export interface OxideTarget {
  oxide: OxideSymbol
  /** Target value (moles in UMF) */
  target?: number
  /** Optional range — solver tries to land value inside [min,max] */
  min?: number
  max?: number
  /** How important this constraint is (1 = normal, higher = stricter) */
  weight?: number
}

export interface OptimizerInput {
  /** Materials the solver may use */
  materialIds: string[]
  /** What chemistry to aim for */
  targets: OxideTarget[]
  /** Cone for limit validation */
  cone?: string
  /** Max iterations (default 2000) */
  maxIterations?: number
  /** Tolerance for "close enough" (default 0.02) */
  tolerance?: number
  /** Lock specific material amounts (index → fraction 0-1) */
  locks?: Record<number, number>
}

export interface OptimizerResult {
  /** Optimized recipe weights (fractions summing to 1) */
  weights: number[]
  /** Material IDs corresponding to each weight */
  materialIds: string[]
  /** Material names */
  materialNames: string[]
  /** Resulting UMF oxide values */
  umf: Partial<Record<OxideSymbol, number>>
  /** How well each target was met */
  targetResults: TargetResult[]
  /** Overall cost / residual */
  residual: number
  /** Did the solver converge? */
  converged: boolean
  /** How many iterations it took */
  iterations: number
  /** Human-readable summary */
  summary: string
}

export interface TargetResult {
  oxide: OxideSymbol
  target: number | null
  min: number | null
  max: number | null
  actual: number
  satisfied: boolean
  delta: number
}

// ─── Helpers ───────────────────────────────────────────────────────

type OxideMatrix = number[][] // [materialIndex][oxideIndex] = moles per gram

const ALL_UMF_OXIDES: OxideSymbol[] = Object.keys(MOLECULAR_WEIGHTS) as OxideSymbol[]

/**
 * Build oxide-per-gram matrix for a list of materials.
 * Row i = material i, column j = moles of oxide j contributed per gram.
 */
function buildOxideMatrix(
  materialIds: string[],
  db: IMatDB,
): { matrix: OxideMatrix; oxides: OxideSymbol[]; names: string[] } {
  const oxides = ALL_UMF_OXIDES
  const matrix: number[][] = []
  const names: string[] = []

  for (const id of materialIds) {
    const mat = db.resolve(id)
    const analysis = mat ? db.getAnalysis(mat.id) : null
    names.push(mat?.primaryName ?? id)

    const row: number[] = []
    for (const oxide of oxides) {
      const wt = analysis?.[oxide] ?? 0
      // weight% → moles per gram = (wt/100) / MW
      const mw = MOLECULAR_WEIGHTS[oxide]
      row.push(mw ? (wt / 100) / mw : 0)
    }
    matrix.push(row)
  }

  return { matrix, oxides, names }
}

/**
 * Given material fractions (summing to ~1), compute UMF oxide values.
 */
function computeUMF(
  weights: number[],
  matrix: OxideMatrix,
  oxides: OxideSymbol[],
): Partial<Record<OxideSymbol, number>> {
  // 1. Sum oxide moles from each material
  const totalMoles: number[] = new Array(oxides.length).fill(0)
  for (let m = 0; m < weights.length; m++) {
    for (let o = 0; o < oxides.length; o++) {
      totalMoles[o] += weights[m] * matrix[m][o]
    }
  }

  // 2. Sum flux moles for unity normalization
  let fluxSum = 0
  for (let o = 0; o < oxides.length; o++) {
    if (FLUX_OXIDES.includes(oxides[o])) {
      fluxSum += totalMoles[o]
    }
  }

  if (fluxSum < EPSILON) fluxSum = EPSILON // avoid /0

  // 3. Normalize
  const umf: Partial<Record<OxideSymbol, number>> = {}
  for (let o = 0; o < oxides.length; o++) {
    const val = totalMoles[o] / fluxSum
    if (val > EPSILON) {
      umf[oxides[o]] = roundTo(val, 4)
    }
  }
  return umf
}

/**
 * Compute cost function: sum of weighted squared deltas from targets.
 */
function cost(
  umf: Partial<Record<OxideSymbol, number>>,
  targets: OxideTarget[],
): number {
  let total = 0
  for (const t of targets) {
    const actual = umf[t.oxide] ?? 0
    const w = t.weight ?? 1

    if (t.target !== undefined) {
      total += w * (actual - t.target) ** 2
    } else {
      const lo = t.min ?? -Infinity
      const hi = t.max ?? Infinity
      if (actual < lo) total += w * (actual - lo) ** 2
      else if (actual > hi) total += w * (actual - hi) ** 2
      // else inside range → 0 cost
    }
  }
  return total
}

/**
 * Project weights back onto the simplex (non-negative, sum = 1).
 * Clips negatives then renormalizes.
 */
function projectSimplex(w: number[], locks?: Record<number, number>): number[] {
  const out = w.map((v, i) => (locks && i in locks) ? locks[i] : Math.max(v, 0))

  // Determine how much "budget" is left after locked weights
  let lockedSum = 0
  let freeSum = 0
  for (let i = 0; i < out.length; i++) {
    if (locks && i in locks) lockedSum += out[i]
    else freeSum += out[i]
  }

  const freeBudget = Math.max(1 - lockedSum, 0)
  if (freeSum < EPSILON) {
    // All free weights zeroed — distribute evenly
    const freeCount = out.filter((_, i) => !(locks && i in locks)).length
    for (let i = 0; i < out.length; i++) {
      if (!(locks && i in locks)) out[i] = freeBudget / freeCount
    }
  } else {
    const scale = freeBudget / freeSum
    for (let i = 0; i < out.length; i++) {
      if (!(locks && i in locks)) out[i] *= scale
    }
  }
  return out
}

// ─── Main solver ───────────────────────────────────────────────────

export function optimizeRecipe(
  input: OptimizerInput,
  db: IMatDB,
): OptimizerResult {
  const {
    materialIds,
    targets,
    maxIterations = 2000,
    tolerance = 0.02,
    locks,
  } = input

  const n = materialIds.length
  if (n === 0) {
    return emptyResult('No materials selected')
  }

  const { matrix, oxides, names } = buildOxideMatrix(materialIds, db)

  // Initial weights: equal (or from locks)
  let weights = projectSimplex(new Array(n).fill(1 / n), locks)

  let bestWeights = [...weights]
  let bestCost = Infinity

  // Learning rate schedule: start moderate, decay
  let lr = 0.15
  let actualIterations = maxIterations

  for (let iter = 0; iter < maxIterations; iter++) {
    const umf = computeUMF(weights, matrix, oxides)
    const c = cost(umf, targets)

    if (c < bestCost) {
      bestCost = c
      bestWeights = [...weights]
    }

    if (c < tolerance * tolerance) { actualIterations = iter + 1; break } // converged

    // Numerical gradient (central difference)
    const grad = new Array(n).fill(0)
    const h = 0.0005

    for (let i = 0; i < n; i++) {
      if (locks && i in locks) continue

      const wp = [...weights]
      const wm = [...weights]
      wp[i] += h
      wm[i] -= h

      const cp = cost(computeUMF(projectSimplex(wp, locks), matrix, oxides), targets)
      const cm = cost(computeUMF(projectSimplex(wm, locks), matrix, oxides), targets)
      grad[i] = (cp - cm) / (2 * h)
    }

    // Update with momentum-like effect from adaptive lr
    for (let i = 0; i < n; i++) {
      if (locks && i in locks) continue
      weights[i] -= lr * grad[i]
    }

    weights = projectSimplex(weights, locks)

    // Decay lr
    if (iter % 200 === 199) lr *= 0.7
  }

  // Use best found
  weights = projectSimplex(bestWeights, locks)
  const finalUMF = computeUMF(weights, matrix, oxides)
  const finalCost = cost(finalUMF, targets)
  const converged = finalCost < tolerance * tolerance

  // Build target results
  const targetResults: TargetResult[] = targets.map(t => {
    const actual = finalUMF[t.oxide] ?? 0
    let satisfied = false
    let delta = 0

    if (t.target !== undefined) {
      delta = actual - t.target
      satisfied = Math.abs(delta) < tolerance
    } else {
      const lo = t.min ?? -Infinity
      const hi = t.max ?? Infinity
      if (actual < lo) { delta = actual - lo; satisfied = false }
      else if (actual > hi) { delta = actual - hi; satisfied = false }
      else { delta = 0; satisfied = true }
    }

    return {
      oxide: t.oxide,
      target: t.target ?? null,
      min: t.min ?? null,
      max: t.max ?? null,
      actual: roundTo(actual, 3),
      satisfied,
      delta: roundTo(delta, 3),
    }
  })

  const satisfiedCount = targetResults.filter(r => r.satisfied).length
  const summary = converged
    ? `Converged: all ${targets.length} targets met within tolerance ${tolerance}`
    : `${satisfiedCount}/${targets.length} targets met (residual ${roundTo(finalCost, 4)})`

  return {
    weights: weights.map(w => roundTo(w * 100, 1)), // as percentages
    materialIds,
    materialNames: names,
    umf: finalUMF,
    targetResults,
    residual: roundTo(finalCost, 6),
    converged,
    iterations: actualIterations,
    summary,
  }
}

function emptyResult(summary: string): OptimizerResult {
  return {
    weights: [],
    materialIds: [],
    materialNames: [],
    umf: {},
    targetResults: [],
    residual: Infinity,
    converged: false,
    iterations: 0,
    summary,
  }
}
