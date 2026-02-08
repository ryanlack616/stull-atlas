/**
 * Response Surface Methodology (RSM) Module
 *
 * Maps the cost landscape in the neighborhood of a solution,
 * producing a quadratic approximation that helps the user:
 *   1. Understand sensitivity — which materials have the biggest effect
 *   2. Predict how small weight changes affect UMF
 *   3. Identify stable recipes (flat minima) vs fragile ones (sharp minima)
 *
 * Works as a post-processor: run the GA or gradient optimizer first,
 * then pass the result here for analysis.
 */

import { OxideSymbol, MaterialDatasetId } from '@/types'
import { MOLECULAR_WEIGHTS, FLUX_OXIDES, EPSILON, roundTo } from './constants'
import type { OxideTarget } from './optimizer'
import type { MaterialDatabase as IMatDB } from './umf'

// ─── Public types ──────────────────────────────────────────────

export interface SensitivityResult {
  /** Material name */
  material: string
  /** Material index */
  index: number
  /** How much the cost changes per 1% weight change (gradient magnitude) */
  sensitivity: number
  /** Dominant oxide affected */
  dominantOxide: OxideSymbol
  /** Direction: 'increase' if adding more helps, 'decrease' if less is better */
  direction: 'increase' | 'decrease' | 'stable'
}

export interface RSMAnalysis {
  /** Sensitivity of each material */
  sensitivities: SensitivityResult[]
  /** Stability score (0 = very fragile, 1 = very stable) */
  stability: number
  /** Stability description */
  stabilityLabel: 'fragile' | 'moderate' | 'stable' | 'very stable'
  /** Quadratic coefficients (curvature estimate) */
  curvatures: number[]
  /** Optimal direction of steepest descent, if not yet converged */
  steepestDescent: number[] | null
  /** Human-readable interpretation */
  interpretation: string
}

// ─── Matrix helpers (shared with optimizer) ────────────────────

type OxideMatrix = number[][]
const ALL_UMF_OXIDES: OxideSymbol[] = Object.keys(MOLECULAR_WEIGHTS) as OxideSymbol[]

function buildOxideMatrix(
  materialIds: string[], db: IMatDB, datasetId: MaterialDatasetId,
): { matrix: OxideMatrix; oxides: OxideSymbol[]; names: string[] } {
  const oxides = ALL_UMF_OXIDES
  const matrix: number[][] = []
  const names: string[] = []
  for (const id of materialIds) {
    const mat = db.resolve(id, datasetId)
    const analysis = mat ? db.getAnalysis(mat.id, datasetId) : null
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

// ─── RSM Analysis ──────────────────────────────────────────────

/**
 * Analyze the response surface around a given recipe.
 * 
 * @param weights - Material fractions (summing to 1)
 * @param materialIds - Material IDs
 * @param targets - Optimization targets
 * @param datasetId - Material dataset
 * @param db - Material database
 */
export function analyzeResponseSurface(
  weights: number[],
  materialIds: string[],
  targets: OxideTarget[],
  datasetId: MaterialDatasetId,
  db: IMatDB,
): RSMAnalysis {
  const n = weights.length
  const { matrix, oxides, names } = buildOxideMatrix(materialIds, db, datasetId)

  const baseUMF = computeUMF(weights, matrix, oxides)
  const baseCost = cost(baseUMF, targets)

  const h = 0.005 // perturbation size (0.5%)

  // Compute gradient and curvature for each material
  const gradient: number[] = new Array(n).fill(0)
  const curvatures: number[] = new Array(n).fill(0)

  for (let i = 0; i < n; i++) {
    const wp = [...weights]
    const wm = [...weights]
    wp[i] = Math.min(wp[i] + h, 1)
    wm[i] = Math.max(wm[i] - h, 0)

    // Renormalize (keep on simplex approximately)
    const spP = wp.reduce((s, v) => s + v, 0)
    const spM = wm.reduce((s, v) => s + v, 0)
    if (spP > 0) wp.forEach((_, j) => wp[j] /= spP)
    if (spM > 0) wm.forEach((_, j) => wm[j] /= spM)

    const cp = cost(computeUMF(wp, matrix, oxides), targets)
    const cm = cost(computeUMF(wm, matrix, oxides), targets)

    gradient[i] = (cp - cm) / (2 * h)
    curvatures[i] = (cp - 2 * baseCost + cm) / (h * h)
  }

  // Sensitivities
  const sensitivities: SensitivityResult[] = []
  for (let i = 0; i < n; i++) {
    // Find which oxide is most affected by changing this material
    const baseUmfVals = oxides.map(o => baseUMF[o] ?? 0)
    const wp = [...weights]
    wp[i] += h
    const sp = wp.reduce((s, v) => s + v, 0)
    wp.forEach((_, j) => wp[j] /= sp)
    const pertUMF = computeUMF(wp, matrix, oxides)

    let maxDelta = 0
    let dominantOxide: OxideSymbol = 'SiO2'
    for (let o = 0; o < oxides.length; o++) {
      const delta = Math.abs((pertUMF[oxides[o]] ?? 0) - baseUmfVals[o])
      if (delta > maxDelta) {
        maxDelta = delta
        dominantOxide = oxides[o]
      }
    }

    sensitivities.push({
      material: names[i],
      index: i,
      sensitivity: roundTo(Math.abs(gradient[i]) * 100, 3), // per 1% change
      dominantOxide,
      direction: gradient[i] < -0.001 ? 'increase' : gradient[i] > 0.001 ? 'decrease' : 'stable',
    })
  }

  sensitivities.sort((a, b) => b.sensitivity - a.sensitivity)

  // Stability: average curvature (higher curvature = more stable/less likely to drift)
  // But we want the inverse — sharp minima = stable, flat = less predictable
  const avgCurvature = curvatures.reduce((s, v) => s + Math.abs(v), 0) / n
  const stability = Math.min(1, avgCurvature * 5) // scale to 0-1

  const stabilityLabel: RSMAnalysis['stabilityLabel'] =
    stability > 0.7 ? 'very stable' :
    stability > 0.4 ? 'stable' :
    stability > 0.15 ? 'moderate' :
    'fragile'

  // Steepest descent direction (if not converged)
  const gradMag = Math.sqrt(gradient.reduce((s, g) => s + g * g, 0))
  const steepestDescent = gradMag > 0.01
    ? gradient.map(g => roundTo(-g / gradMag, 4))
    : null

  // Interpretation
  const topSensitive = sensitivities.filter(s => s.sensitivity > 0.1).slice(0, 3)
  const parts: string[] = []
  
  if (baseCost < 0.001) {
    parts.push('Recipe is well-optimized.')
  } else {
    parts.push(`Residual: ${roundTo(baseCost, 4)}.`)
  }

  parts.push(`Stability: ${stabilityLabel}.`)

  if (topSensitive.length > 0) {
    parts.push(
      `Most sensitive to: ${topSensitive.map(s =>
        `${s.material} (${s.direction === 'increase' ? '↑' : s.direction === 'decrease' ? '↓' : '—'} → ${s.dominantOxide})`
      ).join(', ')}.`
    )
  }

  return {
    sensitivities,
    stability: roundTo(stability, 3),
    stabilityLabel,
    curvatures: curvatures.map(c => roundTo(c, 4)),
    steepestDescent,
    interpretation: parts.join(' '),
  }
}
