import { describe, expect, it, beforeEach } from 'vitest'
import { GlazeRecipe, SimplexPoint } from '@/types'

/**
 * Tests for recipe serialization logic (Map ↔ Object).
 * These test the pure serialization helpers extracted from recipeStore.
 */

// Replicate the serialization logic from recipeStore (pure functions)
function serializeRecipes(recipes: GlazeRecipe[]): string {
  const serializable = recipes.map(r => ({
    ...r,
    umf: Object.fromEntries(r.umf),
  }))
  return JSON.stringify(serializable)
}

function deserializeRecipes(raw: string): GlazeRecipe[] {
  const parsed = JSON.parse(raw)
  return parsed.map((r: any) => ({
    ...r,
    umf: new Map(Object.entries(r.umf || {})),
  }))
}

function serializeBlendResults(points: SimplexPoint[]): string {
  const serializable = points.map(p => ({
    ...p,
    recipe: p.recipe ? {
      ...p.recipe,
      umf: Object.fromEntries(p.recipe.umf),
    } : p.recipe,
  }))
  return JSON.stringify(serializable)
}

function deserializeBlendResults(raw: string): SimplexPoint[] {
  const parsed = JSON.parse(raw)
  return parsed.map((p: any) => ({
    ...p,
    recipe: p.recipe ? {
      ...p.recipe,
      umf: new Map(Object.entries(p.recipe.umf || {})),
    } : p.recipe,
  }))
}

function makeRecipe(id: string, umfEntries: [string, any][]): GlazeRecipe {
  return {
    id,
    name: `Test ${id}`,
    source: 'user',
    ingredients: [{ material: 'Silica', amount: 100, unit: 'weight' as const }],
    umf: new Map(umfEntries),
    coneRange: [6, 6],
    atmosphere: 'oxidation',
    surfaceType: 'unknown',
    umfConfidence: 'unknown',
    verified: false,
  }
}

describe('Recipe serialization', () => {
  it('round-trips a recipe with UMF Map', () => {
    const recipe = makeRecipe('r1', [
      ['digitalfire_2024', { SiO2: { value: 3.5 }, Al2O3: { value: 0.35 } }],
    ])

    const json = serializeRecipes([recipe])
    const restored = deserializeRecipes(json)

    expect(restored).toHaveLength(1)
    expect(restored[0].umf).toBeInstanceOf(Map)
    expect(restored[0].umf.size).toBe(1)
    expect(restored[0].umf.get('digitalfire_2024')).toEqual({
      SiO2: { value: 3.5 },
      Al2O3: { value: 0.35 },
    })
  })

  it('handles empty UMF Map', () => {
    const recipe = makeRecipe('r2', [])
    const json = serializeRecipes([recipe])
    const restored = deserializeRecipes(json)

    expect(restored[0].umf).toBeInstanceOf(Map)
    expect(restored[0].umf.size).toBe(0)
  })

  it('handles multiple UMF dataset entries', () => {
    const recipe = makeRecipe('r3', [
      ['digitalfire_2024', { SiO2: { value: 3.5 } }],
      ['glazy_default', { SiO2: { value: 3.6 } }],
    ])

    const json = serializeRecipes([recipe])
    const restored = deserializeRecipes(json)

    expect(restored[0].umf.size).toBe(2)
    expect(restored[0].umf.has('digitalfire_2024')).toBe(true)
    expect(restored[0].umf.has('glazy_default')).toBe(true)
  })
})

describe('Blend results serialization', () => {
  it('round-trips SimplexPoints with recipe Maps', () => {
    const points: SimplexPoint[] = [
      {
        coords: [0.5, 0.3, 0.2],
        recipe: makeRecipe('blend-1', [
          ['digitalfire_2024', { SiO2: { value: 3.0 }, CaO: { value: 0.4 } }],
        ]),
      } as any,
    ]

    const json = serializeBlendResults(points)
    const restored = deserializeBlendResults(json)

    expect(restored).toHaveLength(1)
    expect(restored[0].recipe.umf).toBeInstanceOf(Map)
    expect(restored[0].recipe.umf.get('digitalfire_2024')).toEqual({
      SiO2: { value: 3.0 },
      CaO: { value: 0.4 },
    })
  })

  it('handles points without recipes', () => {
    const points: SimplexPoint[] = [
      { coords: [1, 0, 0], recipe: undefined } as any,
    ]

    const json = serializeBlendResults(points)
    const restored = deserializeBlendResults(json)

    expect(restored).toHaveLength(1)
    expect(restored[0].recipe).toBeUndefined()
  })

  it('JSON.stringify of a Map yields {} without serialization helper', () => {
    // This proves why the serialization fix was needed
    const map = new Map([['foo', 'bar']])
    expect(JSON.stringify(map)).toBe('{}')
    // But Object.fromEntries preserves it
    expect(JSON.stringify(Object.fromEntries(map))).toBe('{"foo":"bar"}')
  })
})
