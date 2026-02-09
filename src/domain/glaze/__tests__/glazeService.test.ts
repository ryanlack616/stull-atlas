/**
 * Glaze Service Tests
 */

import { describe, it, expect } from 'vitest'
import { importGlazesFromFile, findSimilarGlazes, exportGlazesToJSON } from '../glazeService'
import type { SimilarityOptions } from '../glazeService'
import type { GlazeRecipe, UMF } from '@/types'
import type { OxideValue } from '@/types/epistemic'

// ── Helpers ──────────────────────────────────────────────────

function ov(value: number): OxideValue {
  return { value, precision: 4, state: 'declared', source: 'test' }
}

function makeRecipe(id: string, umfValues?: Partial<Record<keyof UMF, number>>): GlazeRecipe {
  const entries = Object.entries(umfValues ?? {}) as [keyof UMF, number][]
  const umf = Object.fromEntries(entries.map(([k, v]) => [k, ov(v)])) as UMF

  return {
    id,
    name: `Glaze ${id}`,
    source: 'user',
    ingredients: [],
    umf,
    coneRange: [6, 6],
    atmosphere: 'oxidation',
    surfaceType: 'gloss',
    umfConfidence: 'declared',
    verified: false,
  }
}

// ── importGlazesFromFile ─────────────────────────────────────

describe('importGlazesFromFile', () => {
  it('returns empty array for unrecognizable content', () => {
    const result = importGlazesFromFile('not valid anything', 'recipes.txt')
    expect(result).toEqual([])
  })

  it('dispatches to JSON parser for .json files', () => {
    const json = JSON.stringify([{
      id: '1', name: 'Test', source: 'user',
      ingredients: [{ material: 'Silica', amount: 30, unit: 'weight' }],
      coneRange: [6, 6], atmosphere: 'oxidation', surfaceType: 'gloss',
      umfConfidence: 'measured', verified: false,
    }])
    const result = importGlazesFromFile(json, 'recipes.json')
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Test')
  })

  it('returns empty for bad JSON in .json file', () => {
    const result = importGlazesFromFile('{{bad json', 'recipes.json')
    expect(result).toEqual([])
  })
})

// ── exportGlazesToJSON ───────────────────────────────────────

describe('exportGlazesToJSON', () => {
  it('produces valid JSON string', () => {
    const recipe = makeRecipe('r1', { SiO2: 3.5, Al2O3: 0.4 })
    const json = exportGlazesToJSON([recipe])
    expect(() => JSON.parse(json)).not.toThrow()
    const parsed = JSON.parse(json)
    expect(parsed.count).toBe(1)
    expect(parsed.glazes).toHaveLength(1)
    expect(parsed.glazes[0].name).toBe('Glaze r1')
  })
})

// ── findSimilarGlazes ────────────────────────────────────────

describe('findSimilarGlazes', () => {
  const target = makeRecipe('target', { SiO2: 3.0, Al2O3: 0.3, CaO: 0.7 })
  const close = makeRecipe('close', { SiO2: 3.1, Al2O3: 0.3, CaO: 0.7 })
  const far   = makeRecipe('far',   { SiO2: 5.0, Al2O3: 1.0, CaO: 0.1 })
  const mid   = makeRecipe('mid',   { SiO2: 3.5, Al2O3: 0.5, CaO: 0.5 })

  const opts: SimilarityOptions = {}

  it('returns candidates sorted by distance', () => {
    const results = findSimilarGlazes(target, [target, close, far, mid], opts)
    expect(results.length).toBe(3) // excludes target itself
    expect(results[0].glaze.id).toBe('close')
    expect(results[1].glaze.id).toBe('mid')
    expect(results[2].glaze.id).toBe('far')
  })

  it('respects count option', () => {
    const results = findSimilarGlazes(target, [close, far, mid], { ...opts, count: 1 })
    expect(results.length).toBe(1)
    expect(results[0].glaze.id).toBe('close')
  })

  it('returns empty if target has no UMF for dataset', () => {
    const noUmf: GlazeRecipe = { ...target, umf: null }
    const results = findSimilarGlazes(noUmf, [close], opts)
    expect(results).toEqual([])
  })

  it('skips candidates with no UMF', () => {
    const noUmf: GlazeRecipe = { ...close, umf: null }
    const results = findSimilarGlazes(target, [noUmf, mid], opts)
    expect(results.length).toBe(1)
    expect(results[0].glaze.id).toBe('mid')
  })

  it('applies custom oxide weights', () => {
    // With high SiO2 weight, distance to 'far' (SiO2=5.0) becomes much larger
    const weighted = findSimilarGlazes(target, [close, far], {
      ...opts,
      weights: { SiO2: 100 },
    })
    expect(weighted[0].glaze.id).toBe('close')
    expect(weighted[1].dist).toBeGreaterThan(weighted[0].dist * 5)
  })
})
