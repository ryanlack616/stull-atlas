/**
 * Surface Type Classification for Stull Chart
 *
 * Nadaraya-Watson kernel classification: for each grid cell on the Stull chart,
 * predicts the most probable surface type (matte/gloss/satin/etc.) from nearby
 * labeled glazes using distance-weighted voting.
 *
 * This paints the chart with "will this be matte?" regions — the single most
 * useful prediction for potters choosing a target chemistry.
 *
 * Algorithm:
 *   1. Lay a regular grid over the SiO2–Al2O3 plane
 *   2. For each cell, weight-average the surface type labels of nearby glazes
 *      using a Gaussian kernel (same math as surfaceFit.ts)
 *   3. Report the dominant surface type + confidence (0–1)
 *   4. Cells with too few neighbors are marked 'unknown'
 *
 * Performance: O(resolution² × n_points), typically 30² × 8000 ≈ 7.2M ops.
 * Still fast enough for interactive use (~50ms).
 */

import type { SurfaceType } from '@/types'

// ─── Types ────────────────────────────────────────────────────────

export interface SurfaceClassifyPoint {
  x: number        // SiO2
  y: number        // Al2O3
  surfaceType: SurfaceType
}

export interface SurfaceClassifyCell {
  /** Predicted surface type */
  type: SurfaceType
  /** Confidence 0–1 (fraction of weighted vote for this type) */
  confidence: number
  /** Vote distribution per surface type */
  votes: Partial<Record<SurfaceType, number>>
}

export interface SurfaceClassifyGrid {
  /** Unique x (SiO2) grid coordinates */
  xCoords: number[]
  /** Unique y (Al2O3) grid coordinates */
  yCoords: number[]
  /** Grid cells — cells[yi][xi] */
  cells: (SurfaceClassifyCell | null)[][]
  /** Stats */
  stats: {
    validCells: number
    totalCells: number
    /** Count of each surface type across all valid cells */
    typeCounts: Partial<Record<SurfaceType, number>>
  }
}

export interface SurfaceClassifyConfig {
  /** Grid bounds [min, max] for x axis (SiO2) */
  xRange: [number, number]
  /** Grid bounds [min, max] for y axis (Al2O3) */
  yRange: [number, number]
  /** Grid cells per dimension (default: 30) */
  resolution?: number
  /** Kernel bandwidth — larger = smoother (default: auto) */
  bandwidth?: number
  /** Minimum total weight to consider a cell valid (default: 0.3) */
  minWeight?: number
  /** Minimum confidence to report a prediction (default: 0.3) */
  minConfidence?: number
}

// ─── Kernel ───────────────────────────────────────────────────────

function gaussianKernel(distSq: number, hSq: number): number {
  return Math.exp(-distSq / (2 * hSq))
}

/**
 * Auto-select bandwidth using Silverman's rule of thumb for 2D
 */
function autoBandwidth(
  points: { x: number; y: number }[],
  xRange: [number, number],
  yRange: [number, number],
): number {
  const n = points.length
  if (n < 4) return 0.3

  const xSpan = xRange[1] - xRange[0] || 1
  const ySpan = yRange[1] - yRange[0] || 1

  const xs = points.map(p => (p.x - xRange[0]) / xSpan)
  const ys = points.map(p => (p.y - yRange[0]) / ySpan)

  const xMean = xs.reduce((a, b) => a + b, 0) / n
  const yMean = ys.reduce((a, b) => a + b, 0) / n

  const xStd = Math.sqrt(xs.reduce((s, x) => s + (x - xMean) ** 2, 0) / n) || 0.1
  const yStd = Math.sqrt(ys.reduce((s, y) => s + (y - yMean) ** 2, 0) / n) || 0.1

  const avgStd = (xStd + yStd) / 2
  // Slightly larger bandwidth than regression for smoother classification boundaries
  const h = 1.6 * avgStd * Math.pow(n, -0.2)
  return Math.max(h, 0.03)
}

// ─── Main classifier ─────────────────────────────────────────────

const SURFACE_TYPES: SurfaceType[] = ['gloss', 'matte', 'satin', 'crystalline', 'crawl']

/**
 * Classify each grid cell on the Stull chart by predicted surface type.
 */
export function classifySurface(
  points: SurfaceClassifyPoint[],
  config: SurfaceClassifyConfig,
): SurfaceClassifyGrid {
  const {
    xRange,
    yRange,
    resolution = 30,
    minWeight = 0.3,
    minConfidence = 0.3,
  } = config

  const bandwidth = config.bandwidth ?? autoBandwidth(points, xRange, yRange)

  // Build grid
  const xSpan = xRange[1] - xRange[0]
  const ySpan = yRange[1] - yRange[0]
  const xCoords = Array.from({ length: resolution }, (_, i) =>
    xRange[0] + (i / (resolution - 1)) * xSpan
  )
  const yCoords = Array.from({ length: resolution }, (_, j) =>
    yRange[0] + (j / (resolution - 1)) * ySpan
  )

  // Normalize distances
  const xScale = 1 / (xSpan || 1)
  const yScale = 1 / (ySpan || 1)
  const hSq = bandwidth * bandwidth

  // Filter to labeled points only, pre-normalize
  const labeled = points
    .filter(p => p.surfaceType && p.surfaceType !== 'unknown')
    .map(p => ({
      nx: (p.x - xRange[0]) * xScale,
      ny: (p.y - yRange[0]) * yScale,
      type: p.surfaceType,
    }))

  if (labeled.length === 0) {
    return {
      xCoords,
      yCoords,
      cells: yCoords.map(() => xCoords.map(() => null)),
      stats: { validCells: 0, totalCells: resolution * resolution, typeCounts: {} },
    }
  }

  // Classify each cell
  const cells: (SurfaceClassifyCell | null)[][] = []
  let validCells = 0
  const typeCounts: Partial<Record<SurfaceType, number>> = {}

  for (let j = 0; j < resolution; j++) {
    const row: (SurfaceClassifyCell | null)[] = []
    const ny = (yCoords[j] - yRange[0]) * yScale

    for (let i = 0; i < resolution; i++) {
      const nx = (xCoords[i] - xRange[0]) * xScale

      // Accumulate weighted votes per surface type
      const votes: Partial<Record<SurfaceType, number>> = {}
      let totalWeight = 0

      for (const p of labeled) {
        const dx = nx - p.nx
        const dy = ny - p.ny
        const distSq = dx * dx + dy * dy
        const w = gaussianKernel(distSq, hSq)
        votes[p.type] = (votes[p.type] ?? 0) + w
        totalWeight += w
      }

      if (totalWeight >= minWeight) {
        // Find dominant type
        let bestType: SurfaceType = 'unknown'
        let bestScore = 0
        for (const st of SURFACE_TYPES) {
          const v = votes[st] ?? 0
          if (v > bestScore) {
            bestScore = v
            bestType = st
          }
        }

        const confidence = totalWeight > 0 ? bestScore / totalWeight : 0

        if (confidence >= minConfidence) {
          row.push({ type: bestType, confidence, votes })
          validCells++
          typeCounts[bestType] = (typeCounts[bestType] ?? 0) + 1
        } else {
          row.push(null) // uncertain / mixed region
        }
      } else {
        row.push(null) // not enough data
      }
    }
    cells.push(row)
  }

  return {
    xCoords,
    yCoords,
    cells,
    stats: { validCells, totalCells: resolution * resolution, typeCounts },
  }
}

// ─── Color mapping ────────────────────────────────────────────────

export const SURFACE_TYPE_COLORS: Record<SurfaceType, string> = {
  gloss: '#3b82f6',       // blue
  matte: '#22c55e',       // green
  satin: '#f59e0b',       // amber
  crystalline: '#a855f7', // purple
  crawl: '#ef4444',       // red
  unknown: '#6b7280',     // grey
}

export const SURFACE_TYPE_COLORS_RGBA = (type: SurfaceType, alpha: number): string => {
  const hex = SURFACE_TYPE_COLORS[type] ?? '#6b7280'
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
