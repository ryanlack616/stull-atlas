import { describe, expect, it } from 'vitest'
import { GlazeRecipe, SimplexPoint } from '@/types'

/**
 * Tests for recipe serialization logic.
 * Now that UMF is a plain object (UMF | null) instead of a Map,
 * serialization is straightforward JSON.stringify/parse.
 */

function makeRecipe(id: string, umf: any): GlazeRecipe {
  return {
    id,
    name: `Test ${id}`,
    source: 'user',
    ingredients: [{ material: 'Silica', amount: 100, unit: 'weight' as const }],
    umf,
    coneRange: [6, 6],
    atmosphere: 'oxidation',
    surfaceType: 'unknown',
    umfConfidence: 'unknown',
    verified: false,
  }
}

describe('Recipe serialization', () => {
  it('round-trips a recipe with UMF object', () => {
    const recipe = makeRecipe('r1', { SiO2: { value: 3.5 }, Al2O3: { value: 0.35 } })

    const json = JSON.stringify([recipe])
    const restored: GlazeRecipe[] = JSON.parse(json)

    expect(restored).toHaveLength(1)
    expect(restored[0].umf).toEqual({
      SiO2: { value: 3.5 },
      Al2O3: { value: 0.35 },
    })
  })

  it('handles null UMF', () => {
    const recipe = makeRecipe('r2', null)
    const json = JSON.stringify([recipe])
    const restored: GlazeRecipe[] = JSON.parse(json)

    expect(restored[0].umf).toBeNull()
  })

  it('preserves all oxide values through round-trip', () => {
    const umf = {
      SiO2: { value: 3.5 },
      Al2O3: { value: 0.35 },
      CaO: { value: 0.4 },
      K2O: { value: 0.2 },
    }
    const recipe = makeRecipe('r3', umf)
    const json = JSON.stringify([recipe])
    const restored: GlazeRecipe[] = JSON.parse(json)

    expect(restored[0].umf).toEqual(umf)
  })
})

describe('Blend results serialization', () => {
  it('round-trips SimplexPoints with recipe UMF', () => {
    const points: SimplexPoint[] = [
      {
        coords: [0.5, 0.3, 0.2],
        recipe: makeRecipe('blend-1', { SiO2: { value: 3.0 }, CaO: { value: 0.4 } }),
      } as any,
    ]

    const json = JSON.stringify(points)
    const restored: SimplexPoint[] = JSON.parse(json)

    expect(restored).toHaveLength(1)
    expect(restored[0].recipe.umf).toEqual({
      SiO2: { value: 3.0 },
      CaO: { value: 0.4 },
    })
  })

  it('handles points without recipes', () => {
    const points: SimplexPoint[] = [
      { coords: [1, 0, 0], recipe: undefined } as any,
    ]

    const json = JSON.stringify(points)
    const restored: SimplexPoint[] = JSON.parse(json)

    expect(restored).toHaveLength(1)
  })
})
