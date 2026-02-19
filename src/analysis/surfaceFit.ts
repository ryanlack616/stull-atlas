/**
 * Surface Fitting for 3D Stull Plot
 *
 * Nadaraya-Watson kernel regression: produces a smooth surface from
 * scattered (x, y, z) observations. This answers the ceramicist's
 * question "how does Z vary across the SiO2–Al2O3 landscape?"
 *
 * The algorithm:
 *   1. Lay a regular grid over the Stull chart
 *   2. For each cell, take a distance-weighted average of nearby Z values
 *   3. Cells with too few neighbors are marked invalid (no extrapolation)
 *   4. Optional gaussian smoothing pass for visual polish
 *
 * The resulting surface reveals trends invisible in a point cloud:
 * boron concentration gradients, flux-ratio corridors, cone-temperature
 * contours — relationships that matter for glaze development.
 */

/**
 * Fitted surface result
 */
export interface SurfaceGrid {
  /** Unique x (SiO2) grid coordinates */
  xCoords: number[]
  /** Unique y (Al2O3) grid coordinates */
  yCoords: number[]
  /** z values — z[yi][xi], NaN for invalid cells */
  z: (number | null)[][]
  /** Stats about the fit */
  stats: {
    validCells: number
    totalCells: number
    zMin: number
    zMax: number
    zMean: number
  }
}

/**
 * Configuration for surface fitting
 */
export interface SurfaceFitConfig {
  /** Grid bounds [min, max] for the x axis (SiO2) */
  xRange: [number, number]
  /** Grid bounds [min, max] for the y axis (Al2O3) */
  yRange: [number, number]
  /** Grid cells per dimension (default: 35) */
  resolution?: number
  /** Kernel bandwidth — larger = smoother (default: auto) */
  bandwidth?: number
  /** Minimum total weight to consider a cell valid (default: 0.5) */
  minWeight?: number
}

/**
 * Gaussian kernel: weight falls off exponentially with distance
 */
function gaussianKernel(distSq: number, hSq: number): number {
  return Math.exp(-distSq / (2 * hSq))
}

/**
 * Auto-select bandwidth using Silverman's rule of thumb,
 * adapted for 2D with different scales on each axis
 */
function autoBandwidth(
  points: { x: number; y: number }[],
  xRange: [number, number],
  yRange: [number, number],
): number {
  const n = points.length
  if (n < 4) return 0.3

  // Compute standard deviations in normalized [0,1] space
  const xSpan = xRange[1] - xRange[0] || 1
  const ySpan = yRange[1] - yRange[0] || 1

  const xs = points.map(p => (p.x - xRange[0]) / xSpan)
  const ys = points.map(p => (p.y - yRange[0]) / ySpan)

  const xMean = xs.reduce((a, b) => a + b, 0) / n
  const yMean = ys.reduce((a, b) => a + b, 0) / n

  const xStd = Math.sqrt(xs.reduce((s, x) => s + (x - xMean) ** 2, 0) / n) || 0.1
  const yStd = Math.sqrt(ys.reduce((s, y) => s + (y - yMean) ** 2, 0) / n) || 0.1

  const avgStd = (xStd + yStd) / 2

  // Silverman: h = 1.06 * σ * n^(-1/5), scaled up slightly for visual smoothness
  const h = 1.4 * avgStd * Math.pow(n, -0.2)
  return Math.max(h, 0.03) // floor to prevent overfitting
}

/**
 * Compute the weighted local estimate for a single grid cell.
 * Returns null if total weight is below threshold.
 */
function kernelEstimate(
  nx: number,
  ny: number,
  normPoints: { nx: number; ny: number; z: number; robustWeight: number }[],
  hSq: number,
  minWeight: number,
): number | null {
  let weightedSum = 0
  let weightSum = 0

  for (const p of normPoints) {
    const dx = nx - p.nx
    const dy = ny - p.ny
    const distSq = dx * dx + dy * dy
    const w = gaussianKernel(distSq, hSq) * p.robustWeight
    weightedSum += w * p.z
    weightSum += w
  }

  return weightSum >= minWeight ? weightedSum / weightSum : null
}

/**
 * Compute a local estimate at a data point's own location (for residuals).
 * Uses leave-one-out by skipping the point's own index.
 */
function kernelEstimateAtPoint(
  pointIdx: number,
  normPoints: { nx: number; ny: number; z: number; robustWeight: number }[],
  hSq: number,
): number | null {
  const p0 = normPoints[pointIdx]
  let weightedSum = 0
  let weightSum = 0

  for (let i = 0; i < normPoints.length; i++) {
    if (i === pointIdx) continue
    const p = normPoints[i]
    const dx = p0.nx - p.nx
    const dy = p0.ny - p.ny
    const distSq = dx * dx + dy * dy
    const w = gaussianKernel(distSq, hSq) * p.robustWeight
    weightedSum += w * p.z
    weightSum += w
  }

  return weightSum > 0.01 ? weightedSum / weightSum : null
}

/**
 * Fit a smooth surface through scattered 3D data using
 * Nadaraya-Watson kernel regression with Huber-style robustness.
 *
 * Two-pass approach:
 *   Pass 1: Standard weighted-mean surface (fast)
 *   Outlier detection: Compute residuals, find MAD, downweight > 3×MAD
 *   Pass 2: Recompute surface with adjusted weights
 *
 * This resists outliers (e.g. high-B₂O₃ glazes that would otherwise
 * inflate the surface) without discarding legitimate data.
 *
 * Performance: O(2 × resolution² × n_points + n²), typically fine for
 * ~35² × 8000 ≈ 10M ops total.
 */
export function fitSurface(
  points: { x: number; y: number; z: number }[],
  config: SurfaceFitConfig,
): SurfaceGrid {
  const {
    xRange,
    yRange,
    resolution = 35,
    minWeight = 0.5,
  } = config

  const bandwidth = config.bandwidth ?? autoBandwidth(points, xRange, yRange)

  // Build grid coordinates
  const xSpan = xRange[1] - xRange[0]
  const ySpan = yRange[1] - yRange[0]
  const xCoords = Array.from({ length: resolution }, (_, i) =>
    xRange[0] + (i / (resolution - 1)) * xSpan
  )
  const yCoords = Array.from({ length: resolution }, (_, j) =>
    yRange[0] + (j / (resolution - 1)) * ySpan
  )

  // Normalize distances so bandwidth is isotropic
  const xScale = 1 / (xSpan || 1)
  const yScale = 1 / (ySpan || 1)
  const hSq = bandwidth * bandwidth

  // Pre-normalize point coordinates
  const normPoints = points
    .filter(p => isFinite(p.z) && !isNaN(p.z))
    .map(p => ({
      nx: (p.x - xRange[0]) * xScale,
      ny: (p.y - yRange[0]) * yScale,
      z: p.z,
      robustWeight: 1,  // will be adjusted after pass 1
    }))

  if (normPoints.length === 0) {
    return {
      xCoords,
      yCoords,
      z: yCoords.map(() => xCoords.map(() => null)),
      stats: { validCells: 0, totalCells: resolution * resolution, zMin: 0, zMax: 0, zMean: 0 },
    }
  }

  // ── Pass 1: compute residuals at each data point ──────────────
  // Use leave-one-out estimates to compute residuals
  const residuals: number[] = []
  for (let i = 0; i < normPoints.length; i++) {
    const est = kernelEstimateAtPoint(i, normPoints, hSq)
    residuals.push(est != null ? Math.abs(normPoints[i].z - est) : 0)
  }

  // Compute MAD (median absolute deviation) for robust scale estimate
  const sortedResiduals = residuals.filter(r => r > 0).sort((a, b) => a - b)
  const mad = sortedResiduals.length > 0
    ? sortedResiduals[Math.floor(sortedResiduals.length / 2)] * 1.4826  // scale to match σ
    : 1

  // ── Huber downweighting: points with |residual| > 3×MAD get reduced weight ──
  const threshold = 3 * Math.max(mad, 1e-6)
  let downweighted = 0
  for (let i = 0; i < normPoints.length; i++) {
    if (residuals[i] > threshold) {
      normPoints[i].robustWeight = threshold / residuals[i]
      downweighted++
    }
  }

  // ── Pass 2: final surface with robust weights ─────────────────
  const z: (number | null)[][] = []
  let validCells = 0
  let zMin = Infinity
  let zMax = -Infinity
  let zSum = 0

  for (let j = 0; j < resolution; j++) {
    const row: (number | null)[] = []
    const ny = (yCoords[j] - yRange[0]) * yScale

    for (let i = 0; i < resolution; i++) {
      const nx = (xCoords[i] - xRange[0]) * xScale
      const val = kernelEstimate(nx, ny, normPoints, hSq, minWeight)

      if (val != null) {
        row.push(val)
        validCells++
        if (val < zMin) zMin = val
        if (val > zMax) zMax = val
        zSum += val
      } else {
        row.push(null)
      }
    }
    z.push(row)
  }

  if (downweighted > 0) {
    console.debug(`[surfaceFit] Robust fit downweighted ${downweighted} of ${normPoints.length} points (MAD=${mad.toFixed(4)}, threshold=${threshold.toFixed(4)})`)
  }

  return {
    xCoords,
    yCoords,
    z,
    stats: {
      validCells,
      totalCells: resolution * resolution,
      zMin: validCells > 0 ? zMin : 0,
      zMax: validCells > 0 ? zMax : 0,
      zMean: validCells > 0 ? zSum / validCells : 0,
    },
  }
}
