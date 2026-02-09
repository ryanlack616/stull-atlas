/**
 * Density Analysis Tests
 */

import { describe, it, expect } from 'vitest'
import { calculateDensity, findDensityPeaks, getDensityStats } from '../density'
import type { GlazePlotPoint } from '@/types'

function makePoint(x: number, y: number, id?: string): GlazePlotPoint {
  return {
    id: id ?? `p-${x}-${y}`,
    name: `Point ${x},${y}`,
    source: 'user',
    x, y,
    cone: 6,
    surfaceType: 'gloss',
    glazeTypeId: null,
    fluxRatio: 0.5,
    boron: 0,
    confidence: 'declared',
  }
}

describe('calculateDensity', () => {
  it('returns a density map for a set of points', () => {
    const points = [makePoint(3, 0.3), makePoint(3.1, 0.31), makePoint(3.2, 0.3)]
    const result = calculateDensity(points)

    expect(result.totalPoints).toBe(3)
    expect(result.maxDensity).toBeGreaterThan(0)
    expect(result.grid.length).toBeGreaterThan(0)
    expect(result.bounds).toHaveProperty('xMin')
    expect(result.bounds).toHaveProperty('yMax')
  })

  it('higher density near cluster of close points', () => {
    const cluster = Array.from({ length: 20 }, (_, i) =>
      makePoint(3 + Math.random() * 0.05, 0.3 + Math.random() * 0.05, `c${i}`),
    )
    const outlier = makePoint(6, 1.0, 'outlier')
    const result = calculateDensity([...cluster, outlier])

    expect(result.maxDensity).toBeGreaterThan(0)
    expect(result.totalPoints).toBe(21)
  })

  it('respects resolution config', () => {
    const points = [makePoint(3, 0.3), makePoint(4, 0.5)]
    const lo = calculateDensity(points, { resolution: 10 })
    const hi = calculateDensity(points, { resolution: 50 })

    expect(hi.grid.length).toBeGreaterThan(lo.grid.length)
  })

  it('returns zero maxDensity for empty points', () => {
    const result = calculateDensity([])
    expect(result.totalPoints).toBe(0)
  })
})

describe('findDensityPeaks', () => {
  it('finds peaks in a density map', () => {
    const points = Array.from({ length: 30 }, (_, i) =>
      makePoint(3 + Math.random() * 0.1, 0.3 + Math.random() * 0.1, `p${i}`),
    )
    const density = calculateDensity(points)
    const peaks = findDensityPeaks(density)

    expect(peaks.length).toBeGreaterThanOrEqual(1)
    for (const peak of peaks) {
      expect(peak).toHaveProperty('x')
      expect(peak).toHaveProperty('y')
      expect(peak).toHaveProperty('density')
    }
  })
})

describe('getDensityStats', () => {
  it('returns summary statistics', () => {
    const points = Array.from({ length: 15 }, (_, i) =>
      makePoint(2 + i * 0.3, 0.2 + i * 0.05, `s${i}`),
    )
    const density = calculateDensity(points)
    const stats = getDensityStats(density)

    expect(stats).toHaveProperty('maxDensity')
    expect(stats).toHaveProperty('totalPoints')
    expect(stats.totalPoints).toBe(15)
  })
})
