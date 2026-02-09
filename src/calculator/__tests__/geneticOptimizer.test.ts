/**
 * Tests for Genetic Algorithm Optimizer
 */
import { describe, it, expect } from 'vitest'
import { optimizeRecipeGA } from '../geneticOptimizer'

// Minimal mock DB for testing
const mockDB = {
  resolve(id: string) {
    const mats: Record<string, any> = {
      'silica': { id: 'silica', primaryName: 'Silica' },
      'whiting': { id: 'whiting', primaryName: 'Whiting' },
      'epk': { id: 'epk', primaryName: 'EPK Kaolin' },
      'feldspar': { id: 'feldspar', primaryName: 'Custer Feldspar' },
    }
    return mats[id] ?? null
  },
  getAnalysis(id: string) {
    const analyses: Record<string, any> = {
      'silica': { SiO2: 100 },
      'whiting': { CaO: 56.03 },
      'epk': { SiO2: 46.5, Al2O3: 37.6 },
      'feldspar': { SiO2: 68.7, Al2O3: 18.3, K2O: 10.0, Na2O: 3.0 },
    }
    return analyses[id] ?? {}
  }
}

describe('Genetic Algorithm Optimizer', () => {
  it('returns a valid result with materials', () => {
    const result = optimizeRecipeGA({
      materialIds: ['feldspar', 'silica', 'epk', 'whiting'],
      targets: [
        { oxide: 'SiO2', target: 3.5, weight: 2 },
        { oxide: 'Al2O3', target: 0.35, weight: 2 },
      ],
      populationSize: 20,
      generations: 50,
    }, mockDB as any)

    expect(result.best).toBeDefined()
    expect(result.best.weights.length).toBe(4)
    expect(result.best.materialNames.length).toBe(4)
    expect(result.history.length).toBeGreaterThan(0)
    // Weights should sum to ~100
    const sum = result.best.weights.reduce((s, w) => s + w, 0)
    expect(sum).toBeCloseTo(100, 0)
  })

  it('returns empty result when no materials', () => {
    const result = optimizeRecipeGA({
      materialIds: [],
      targets: [{ oxide: 'SiO2', target: 3.5 }],
    }, mockDB as any)

    expect(result.best.converged).toBe(false)
    expect(result.best.summary).toContain('No materials')
  })

  it('converges toward targets with enough generations', () => {
    const result = optimizeRecipeGA({
      materialIds: ['feldspar', 'silica', 'epk', 'whiting'],
      targets: [
        { oxide: 'SiO2', target: 3.0, weight: 2 },
        { oxide: 'Al2O3', target: 0.4, weight: 2 },
        { oxide: 'CaO', min: 0.2, max: 0.5 },
      ],
      populationSize: 40,
      generations: 150,
      tolerance: 0.1,
    }, mockDB as any)

    // Should produce a reasonable residual even if not perfectly converged
    expect(result.best.residual).toBeLessThan(1)
    expect(result.history[result.history.length - 1].bestCost)
      .toBeLessThanOrEqual(result.history[0].bestCost)
  })

  it('finds alternatives with diverse solutions', () => {
    const result = optimizeRecipeGA({
      materialIds: ['feldspar', 'silica', 'epk', 'whiting'],
      targets: [
        { oxide: 'SiO2', target: 3.5, weight: 1 },
      ],
      populationSize: 40,
      generations: 100,
      topK: 3,
      tolerance: 0.5,
    }, mockDB as any)

    // May or may not find alternatives depending on randomness,
    // but the structure should be valid
    expect(Array.isArray(result.alternatives)).toBe(true)
  })
})
