/**
 * Surface Fitting Tests
 */

import { describe, it, expect } from 'vitest'
import { fitSurface, SurfaceGrid } from '../surfaceFit'

describe('fitSurface', () => {
  it('returns empty grid for no points', () => {
    const result = fitSurface([], {
      xRange: [0, 10],
      yRange: [0, 10],
      resolution: 5,
    })
    expect(result.stats.validCells).toBe(0)
    expect(result.xCoords).toHaveLength(5)
    expect(result.yCoords).toHaveLength(5)
    expect(result.z).toHaveLength(5)
    result.z.forEach(row => {
      row.forEach(cell => expect(cell).toBeNull())
    })
  })

  it('fits a flat surface for constant Z', () => {
    const points = Array.from({ length: 50 }, (_, i) => ({
      x: 1 + (i % 10) * 0.5,
      y: 0.1 + Math.floor(i / 10) * 0.2,
      z: 42,
    }))

    const result = fitSurface(points, {
      xRange: [0.5, 7.2],
      yRange: [0, 1.0],
      resolution: 10,
    })

    expect(result.stats.validCells).toBeGreaterThan(0)
    // All valid cells should be close to 42
    for (const row of result.z) {
      for (const val of row) {
        if (val !== null) {
          expect(val).toBeCloseTo(42, 1)
        }
      }
    }
  })

  it('captures a linear gradient', () => {
    // Z increases with X
    const points = Array.from({ length: 100 }, (_, i) => {
      const x = 1 + Math.random() * 5
      const y = 0.1 + Math.random() * 0.8
      return { x, y, z: x * 2 }
    })

    const result = fitSurface(points, {
      xRange: [0.5, 7.2],
      yRange: [0, 1.0],
      resolution: 10,
    })

    expect(result.stats.validCells).toBeGreaterThan(0)
    expect(result.stats.zMax).toBeGreaterThan(result.stats.zMin)

    // Check that right side has higher values than left side
    const leftCols = result.z.flatMap(row => row.slice(0, 3).filter(v => v !== null)) as number[]
    const rightCols = result.z.flatMap(row => row.slice(7).filter(v => v !== null)) as number[]
    
    if (leftCols.length > 0 && rightCols.length > 0) {
      const leftMean = leftCols.reduce((a, b) => a + b, 0) / leftCols.length
      const rightMean = rightCols.reduce((a, b) => a + b, 0) / rightCols.length
      expect(rightMean).toBeGreaterThan(leftMean)
    }
  })

  it('produces valid stats', () => {
    const points = [
      { x: 2, y: 0.3, z: 10 },
      { x: 3, y: 0.4, z: 20 },
      { x: 4, y: 0.5, z: 30 },
      { x: 5, y: 0.6, z: 40 },
      { x: 6, y: 0.7, z: 50 },
    ]

    const result = fitSurface(points, {
      xRange: [0.5, 7.2],
      yRange: [0, 1.0],
      resolution: 8,
      bandwidth: 0.3,
    })

    expect(result.stats.zMin).toBeLessThanOrEqual(result.stats.zMean)
    expect(result.stats.zMax).toBeGreaterThanOrEqual(result.stats.zMean)
    expect(result.stats.totalCells).toBe(64) // 8x8
  })

  it('respects minWeight to avoid extrapolation', () => {
    // Single point in a corner — most of the grid should be null
    const result = fitSurface(
      [{ x: 1, y: 0.1, z: 5 }],
      {
        xRange: [0.5, 7.2],
        yRange: [0, 1.0],
        resolution: 10,
        bandwidth: 0.05,
        minWeight: 0.5,
      },
    )

    const nullCount = result.z.flat().filter(v => v === null).length
    expect(nullCount).toBeGreaterThan(80) // most cells should be invalid
  })
})
