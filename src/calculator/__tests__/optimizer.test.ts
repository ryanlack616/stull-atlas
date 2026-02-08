import { describe, expect, it } from 'vitest'
import { optimizeRecipe, type OptimizerInput } from '@/calculator/optimizer'
import type { OxideSymbol } from '@/types'

/**
 * Optimizer integration tests.
 * Uses the real MaterialDatabase singleton.
 */

// Build a mock DB with hand-verified analyses (same pattern as umf.test.ts)
const ANALYSES: Record<string, Record<string, number>> = {
  silica:            { SiO2: 100 },
  whiting:           { CaO: 56.10 },
  epk:               { SiO2: 45.87, Al2O3: 37.62, Fe2O3: 0.81, TiO2: 0.36, CaO: 0.18, MgO: 0.12, K2O: 0.35, Na2O: 0.07 },
  'custer-feldspar': { SiO2: 68.50, Al2O3: 17.35, Fe2O3: 0.08, CaO: 0.30, K2O: 10.28, Na2O: 3.04 },
  talc:              { SiO2: 63.37, MgO: 31.88 },
}

const mockDb = {
  resolve(name: string) {
    const id = name.toLowerCase().replace(/\s+/g, '-')
    if (ANALYSES[id]) return { id, primaryName: name, aliases: [name] } as any
    // Try as-is
    if (ANALYSES[name]) return { id: name, primaryName: name, aliases: [] } as any
    return null
  },
  getAnalysis(materialId: string) {
    return (ANALYSES[materialId] as Record<OxideSymbol, number>) || null
  },
}

describe('optimizeRecipe', () => {
  it('returns empty result with no materials', () => {
    const input: OptimizerInput = {
      materialIds: [],
      targets: [{ oxide: 'SiO2', target: 3.5 }],
      datasetId: 'digitalfire_2024',
    }
    const result = optimizeRecipe(input, mockDb as any)
    expect(result.converged).toBe(false)
    expect(result.weights).toHaveLength(0)
  })

  it('finds a recipe for a simple SiO2 + CaO target', () => {
    const input: OptimizerInput = {
      materialIds: ['custer-feldspar', 'silica', 'whiting', 'epk'],
      targets: [
        { oxide: 'SiO2', target: 3.5, weight: 2 },
        { oxide: 'Al2O3', target: 0.35, weight: 2 },
        { oxide: 'CaO', min: 0.3, max: 0.5 },
      ],
      datasetId: 'digitalfire_2024',
      maxIterations: 3000,
      tolerance: 0.05,
    }

    const result = optimizeRecipe(input, mockDb as any)

    // Should produce non-zero weights
    expect(result.weights.length).toBe(4)
    expect(result.weights.some(w => w > 0)).toBe(true)

    // Weights should sum to ~100%
    const sum = result.weights.reduce((a, b) => a + b, 0)
    expect(sum).toBeCloseTo(100, 0)

    // UMF should have values
    expect(result.umf.SiO2).toBeGreaterThan(0)
    expect(result.umf.Al2O3).toBeGreaterThan(0)

    // Should have target results
    expect(result.targetResults).toHaveLength(3)
  })

  it('handles locked materials', () => {
    const input: OptimizerInput = {
      materialIds: ['custer-feldspar', 'silica', 'whiting'],
      targets: [
        { oxide: 'SiO2', target: 3.0 },
      ],
      datasetId: 'digitalfire_2024',
      locks: { 2: 0.2 }, // lock whiting at 20%
    }

    const result = optimizeRecipe(input, mockDb as any)
    expect(result.weights[2]).toBeCloseTo(20, 0) // whiting locked at 20%
  })

  it('all target results have valid structure', () => {
    const input: OptimizerInput = {
      materialIds: ['custer-feldspar', 'silica'],
      targets: [
        { oxide: 'SiO2', target: 4.0 },
        { oxide: 'Al2O3', min: 0.2, max: 0.5 },
      ],
      datasetId: 'digitalfire_2024',
    }

    const result = optimizeRecipe(input, mockDb as any)

    for (const tr of result.targetResults) {
      expect(tr.oxide).toBeTruthy()
      expect(typeof tr.actual).toBe('number')
      expect(typeof tr.satisfied).toBe('boolean')
      expect(typeof tr.delta).toBe('number')
    }
  })
})
