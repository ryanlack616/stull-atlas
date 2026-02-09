/**
 * Clustering (DBSCAN) Tests
 */

import { describe, it, expect } from 'vitest'
import { dbscan, findOptimalEpsilon, getClusterStats } from '../clustering'
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

describe('dbscan', () => {
  it('finds distinct clusters in well-separated groups', () => {
    const clusterA = Array.from({ length: 10 }, (_, i) =>
      makePoint(2 + i * 0.01, 0.2 + i * 0.01, `a${i}`),
    )
    const clusterB = Array.from({ length: 10 }, (_, i) =>
      makePoint(5 + i * 0.01, 0.8 + i * 0.01, `b${i}`),
    )
    const result = dbscan([...clusterA, ...clusterB], { epsilon: 0.3, minPoints: 3 })

    expect(result.clusters.length).toBe(2)
    expect(result.noise.length).toBe(0)
  })

  it('all points are noise if epsilon is tiny', () => {
    const points = Array.from({ length: 10 }, (_, i) =>
      makePoint(i, i * 0.1, `n${i}`),
    )
    const result = dbscan(points, { epsilon: 0.001, minPoints: 5 })

    expect(result.clusters.length).toBe(0)
    expect(result.noise.length).toBe(10)
  })

  it('single large cluster if epsilon is very big', () => {
    const points = Array.from({ length: 15 }, (_, i) =>
      makePoint(3 + i * 0.1, 0.3 + i * 0.01, `c${i}`),
    )
    const result = dbscan(points, { epsilon: 10, minPoints: 3 })

    expect(result.clusters.length).toBe(1)
    expect(result.clusters[0].pointIds.length).toBe(15)
    expect(result.noise.length).toBe(0)
  })

  it('returns empty results for no points', () => {
    const result = dbscan([])
    expect(result.clusters.length).toBe(0)
    expect(result.noise.length).toBe(0)
  })
})

describe('findOptimalEpsilon', () => {
  it('returns a sorted array of k-distances', () => {
    const points = Array.from({ length: 20 }, (_, i) =>
      makePoint(2 + Math.random(), 0.2 + Math.random() * 0.5, `e${i}`),
    )
    const eps = findOptimalEpsilon(points)
    expect(eps.length).toBeGreaterThan(0)
    // Should be sorted ascending
    for (let i = 1; i < eps.length; i++) {
      expect(eps[i]).toBeGreaterThanOrEqual(eps[i - 1])
    }
  })

  it('returns empty array for too few points', () => {
    const eps = findOptimalEpsilon([makePoint(1, 1)])
    expect(eps.length).toBe(0)
  })
})

describe('getClusterStats', () => {
  it('returns stats matching cluster count', () => {
    const clusterA = Array.from({ length: 8 }, (_, i) =>
      makePoint(2 + i * 0.01, 0.2 + i * 0.01, `a${i}`),
    )
    const clusterB = Array.from({ length: 8 }, (_, i) =>
      makePoint(5 + i * 0.01, 0.8 + i * 0.01, `b${i}`),
    )
    const result = dbscan([...clusterA, ...clusterB], { epsilon: 0.3, minPoints: 3 })
    const stats = getClusterStats(result)

    expect(stats.clusterCount).toBe(2)
    expect(stats.noisePoints).toBe(0)
    expect(stats.totalPoints).toBe(16)
  })
})
