/**
 * Genetic Algorithm (GA) Optimizer
 *
 * Evolutionary search for glaze recipes. Complements the gradient-free
 * optimizer in optimizer.ts for cases where:
 *   - The search space is highly non-convex
 *   - Multiple local optima exist
 *   - The user wants diverse candidate recipes
 *
 * Approach:
 *   1. Initialize a population of random recipes (weights on the simplex)
 *   2. Evaluate fitness via UMF cost
 *   3. Select parents via tournament selection
 *   4. Crossover (blend weights) and mutate
 *   5. Repeat for N generations
 *   6. Return top-K diverse solutions
 */

import { OxideSymbol } from '@/types'
import { MOLECULAR_WEIGHTS, FLUX_OXIDES, EPSILON, roundTo } from './constants'
import type { OxideTarget, OptimizerResult, TargetResult } from './optimizer'
import type { MaterialDatabase as IMatDB } from './umf'

// ─── Types ─────────────────────────────────────────────────────

export interface GAConfig {
  /** Materials the solver may use */
  materialIds: string[]
  /** What chemistry to aim for */
  targets: OxideTarget[]
  /** Population size (default 80) */
  populationSize?: number
  /** Number of generations (default 200) */
  generations?: number
  /** Mutation rate 0-1 (default 0.15) */
  mutationRate?: number
  /** Crossover rate 0-1 (default 0.7) */
  crossoverRate?: number
  /** Tournament size (default 3) */
  tournamentSize?: number
  /** How many diverse solutions to return (default 5) */
  topK?: number
  /** Tolerance for target satisfaction (default 0.02) */
  tolerance?: number
  /** Lock specific material amounts (index → fraction 0-1) */
  locks?: Record<number, number>
  /** Callback for progress */
  onProgress?: (gen: number, bestCost: number) => void
}

export interface GAResult {
  /** Best solution */
  best: OptimizerResult
  /** Top-K diverse solutions */
  alternatives: OptimizerResult[]
  /** Convergence history (gen → best cost) */
  history: { generation: number; bestCost: number; avgCost: number }[]
  /** Total generations run */
  totalGenerations: number
}

// ─── Internal matrix types ─────────────────────────────────────

type OxideMatrix = number[][]
const ALL_UMF_OXIDES: OxideSymbol[] = Object.keys(MOLECULAR_WEIGHTS) as OxideSymbol[]

function buildOxideMatrix(
  materialIds: string[], db: IMatDB,
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
      const mw = MOLECULAR_WEIGHTS[oxide]
      row.push(mw ? (wt / 100) / mw : 0)
    }
    matrix.push(row)
  }
  return { matrix, oxides, names }
}

function computeUMF(
  weights: number[], matrix: OxideMatrix, oxides: OxideSymbol[],
): Partial<Record<OxideSymbol, number>> {
  const totalMoles: number[] = new Array(oxides.length).fill(0)
  for (let m = 0; m < weights.length; m++) {
    for (let o = 0; o < oxides.length; o++) {
      totalMoles[o] += weights[m] * matrix[m][o]
    }
  }
  let fluxSum = 0
  for (let o = 0; o < oxides.length; o++) {
    if (FLUX_OXIDES.includes(oxides[o])) fluxSum += totalMoles[o]
  }
  if (fluxSum < EPSILON) fluxSum = EPSILON
  const umf: Partial<Record<OxideSymbol, number>> = {}
  for (let o = 0; o < oxides.length; o++) {
    const val = totalMoles[o] / fluxSum
    if (val > EPSILON) umf[oxides[o]] = roundTo(val, 4)
  }
  return umf
}

function cost(umf: Partial<Record<OxideSymbol, number>>, targets: OxideTarget[]): number {
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
    }
  }
  return total
}

// ─── GA operations ─────────────────────────────────────────────

/** Random point on the simplex (Dirichlet distribution with alpha=1) */
function randomSimplex(n: number, locks?: Record<number, number>): number[] {
  const raw = new Array(n).fill(0)
  let lockedSum = 0
  for (let i = 0; i < n; i++) {
    if (locks && i in locks) {
      raw[i] = locks[i]
      lockedSum += locks[i]
    } else {
      raw[i] = -Math.log(Math.random() + 1e-10)
    }
  }
  let freeSum = raw.reduce((s, v, i) => (locks && i in locks) ? s : s + v, 0)
  const budget = Math.max(1 - lockedSum, 0)
  if (freeSum < EPSILON) freeSum = EPSILON
  for (let i = 0; i < n; i++) {
    if (!(locks && i in locks)) raw[i] = (raw[i] / freeSum) * budget
  }
  return raw
}

/** BLX-alpha crossover */
function crossover(a: number[], b: number[], alpha: number = 0.3, locks?: Record<number, number>): number[] {
  const child = new Array(a.length)
  for (let i = 0; i < a.length; i++) {
    if (locks && i in locks) {
      child[i] = locks[i]
      continue
    }
    const lo = Math.min(a[i], b[i])
    const hi = Math.max(a[i], b[i])
    const range = hi - lo
    child[i] = lo - alpha * range + Math.random() * (1 + 2 * alpha) * range
    child[i] = Math.max(0, child[i])
  }
  return projectSimplex(child, locks)
}

/** Gaussian mutation */
function mutate(w: number[], rate: number, strength: number = 0.1, locks?: Record<number, number>): number[] {
  const out = [...w]
  for (let i = 0; i < out.length; i++) {
    if (locks && i in locks) continue
    if (Math.random() < rate) {
      out[i] += (Math.random() - 0.5) * 2 * strength
      out[i] = Math.max(0, out[i])
    }
  }
  return projectSimplex(out, locks)
}

function projectSimplex(w: number[], locks?: Record<number, number>): number[] {
  const out = w.map((v, i) => (locks && i in locks) ? locks[i] : Math.max(v, 0))
  let lockedSum = 0, freeSum = 0
  for (let i = 0; i < out.length; i++) {
    if (locks && i in locks) lockedSum += out[i]
    else freeSum += out[i]
  }
  const budget = Math.max(1 - lockedSum, 0)
  if (freeSum < EPSILON) {
    const freeCount = out.filter((_, i) => !(locks && i in locks)).length
    for (let i = 0; i < out.length; i++) {
      if (!(locks && i in locks)) out[i] = budget / freeCount
    }
  } else {
    const scale = budget / freeSum
    for (let i = 0; i < out.length; i++) {
      if (!(locks && i in locks)) out[i] *= scale
    }
  }
  return out
}

/** Tournament selection */
function tournament(
  pop: number[][], fitness: number[], k: number,
): number[] {
  let bestIdx = Math.floor(Math.random() * pop.length)
  for (let i = 1; i < k; i++) {
    const idx = Math.floor(Math.random() * pop.length)
    if (fitness[idx] < fitness[bestIdx]) bestIdx = idx
  }
  return [...pop[bestIdx]]
}

/** Diversity metric (Euclidean distance between two weight vectors) */
function diversity(a: number[], b: number[]): number {
  let sum = 0
  for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2
  return Math.sqrt(sum)
}

// ─── Main GA solver ────────────────────────────────────────────

export function optimizeRecipeGA(config: GAConfig, db: IMatDB): GAResult {
  const {
    materialIds,
    targets,
    populationSize = 80,
    generations = 200,
    mutationRate = 0.15,
    crossoverRate = 0.7,
    tournamentSize = 3,
    topK = 5,
    tolerance = 0.02,
    locks,
    onProgress,
  } = config

  const n = materialIds.length
  if (n === 0) {
    return {
      best: emptyResult('No materials selected'),
      alternatives: [],
      history: [],
      totalGenerations: 0,
    }
  }

  const { matrix, oxides, names } = buildOxideMatrix(materialIds, db)

  // Initialize population
  let population: number[][] = []
  for (let i = 0; i < populationSize; i++) {
    population.push(randomSimplex(n, locks))
  }

  const history: GAResult['history'] = []
  let allTimeBest: number[] = population[0]
  let allTimeBestCost = Infinity

  // Elitism: keep top 2
  const eliteCount = 2

  for (let gen = 0; gen < generations; gen++) {
    // Evaluate fitness
    const fitness = population.map(w => {
      const umf = computeUMF(w, matrix, oxides)
      return cost(umf, targets)
    })

    // Track best
    let genBest = 0
    let genSum = 0
    for (let i = 0; i < fitness.length; i++) {
      genSum += fitness[i]
      if (fitness[i] < fitness[genBest]) genBest = i
    }

    if (fitness[genBest] < allTimeBestCost) {
      allTimeBestCost = fitness[genBest]
      allTimeBest = [...population[genBest]]
    }

    history.push({
      generation: gen,
      bestCost: fitness[genBest],
      avgCost: genSum / fitness.length,
    })

    onProgress?.(gen, fitness[genBest])

    // Early termination
    if (allTimeBestCost < tolerance * tolerance) break

    // Sort by fitness for elitism
    const indices = fitness.map((_, i) => i).sort((a, b) => fitness[a] - fitness[b])
    const elites = indices.slice(0, eliteCount).map(i => [...population[i]])

    // Create next generation
    const nextPop: number[][] = [...elites]

    while (nextPop.length < populationSize) {
      const parent1 = tournament(population, fitness, tournamentSize)
      const parent2 = tournament(population, fitness, tournamentSize)

      let child: number[]
      if (Math.random() < crossoverRate) {
        child = crossover(parent1, parent2, 0.3, locks)
      } else {
        child = [...parent1]
      }

      // Mutation strength decays over generations
      const strength = 0.15 * (1 - gen / generations * 0.5)
      child = mutate(child, mutationRate, strength, locks)

      nextPop.push(child)
    }

    population = nextPop
  }

  // Build result for the best solution
  const bestResult = buildResult(allTimeBest, matrix, oxides, names, materialIds, targets, tolerance)

  // Find top-K diverse alternatives
  const allEvaluated = population.map(w => ({
    weights: w,
    cost: cost(computeUMF(w, matrix, oxides), targets),
  }))
  allEvaluated.sort((a, b) => a.cost - b.cost)

  const alternatives: OptimizerResult[] = []
  const minDiversity = 0.05

  for (const candidate of allEvaluated) {
    if (alternatives.length >= topK - 1) break
    // Check it's diverse enough from existing picks
    const isDiverse = [allTimeBest, ...alternatives.map(() => allTimeBest)].every(
      existing => diversity(candidate.weights, existing) > minDiversity
    )
    if (isDiverse && candidate.cost < tolerance * 10) {
      alternatives.push(buildResult(candidate.weights, matrix, oxides, names, materialIds, targets, tolerance))
    }
  }

  return {
    best: bestResult,
    alternatives,
    history,
    totalGenerations: history.length,
  }
}

function buildResult(
  weights: number[],
  matrix: OxideMatrix,
  oxides: OxideSymbol[],
  names: string[],
  materialIds: string[],
  targets: OxideTarget[],
  tolerance: number,
): OptimizerResult {
  const umf = computeUMF(weights, matrix, oxides)
  const c = cost(umf, targets)
  const converged = c < tolerance * tolerance

  const targetResults: TargetResult[] = targets.map(t => {
    const actual = umf[t.oxide] ?? 0
    let satisfied = false
    let delta = 0
    if (t.target !== undefined) {
      delta = actual - t.target
      satisfied = Math.abs(delta) < tolerance
    } else {
      const lo = t.min ?? -Infinity
      const hi = t.max ?? Infinity
      if (actual < lo) { delta = actual - lo }
      else if (actual > hi) { delta = actual - hi }
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
    ? `GA converged: all ${targets.length} targets met`
    : `GA: ${satisfiedCount}/${targets.length} targets met (residual ${roundTo(c, 4)})`

  return {
    weights: weights.map(w => roundTo(w * 100, 1)),
    materialIds,
    materialNames: names,
    umf,
    targetResults,
    residual: roundTo(c, 6),
    converged,
    iterations: 0,
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
