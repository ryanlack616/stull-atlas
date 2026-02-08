/**
 * Tests for Response Surface Methodology Analysis
 */
import { describe, it, expect } from 'vitest'
import { analyzeResponseSurface } from '../responseSurface'

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

describe('Response Surface Analysis', () => {
  const weights = [0.4, 0.3, 0.15, 0.15] // feldspar, silica, epk, whiting
  const materialIds = ['feldspar', 'silica', 'epk', 'whiting']
  const targets = [
    { oxide: 'SiO2' as const, target: 3.5, weight: 2 },
    { oxide: 'Al2O3' as const, target: 0.35, weight: 2 },
  ]

  it('returns sensitivities for each material', () => {
    const result = analyzeResponseSurface(
      weights, materialIds, targets, 'digitalfire_2024', mockDB as any
    )
    expect(result.sensitivities.length).toBe(4)
    expect(result.sensitivities[0]).toHaveProperty('material')
    expect(result.sensitivities[0]).toHaveProperty('sensitivity')
    expect(result.sensitivities[0]).toHaveProperty('dominantOxide')
    expect(result.sensitivities[0]).toHaveProperty('direction')
  })

  it('returns a valid stability score', () => {
    const result = analyzeResponseSurface(
      weights, materialIds, targets, 'digitalfire_2024', mockDB as any
    )
    expect(result.stability).toBeGreaterThanOrEqual(0)
    expect(result.stability).toBeLessThanOrEqual(1)
    expect(['fragile', 'moderate', 'stable', 'very stable']).toContain(result.stabilityLabel)
  })

  it('provides curvature for each material', () => {
    const result = analyzeResponseSurface(
      weights, materialIds, targets, 'digitalfire_2024', mockDB as any
    )
    expect(result.curvatures.length).toBe(4)
  })

  it('generates a human-readable interpretation', () => {
    const result = analyzeResponseSurface(
      weights, materialIds, targets, 'digitalfire_2024', mockDB as any
    )
    expect(typeof result.interpretation).toBe('string')
    expect(result.interpretation.length).toBeGreaterThan(10)
  })

  it('sensitivities are sorted by magnitude (highest first)', () => {
    const result = analyzeResponseSurface(
      weights, materialIds, targets, 'digitalfire_2024', mockDB as any
    )
    for (let i = 1; i < result.sensitivities.length; i++) {
      expect(result.sensitivities[i].sensitivity)
        .toBeLessThanOrEqual(result.sensitivities[i - 1].sensitivity)
    }
  })
})
