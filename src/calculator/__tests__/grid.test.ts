import { describe, expect, it } from 'vitest'
import { gridPointCount, radialBlend } from '@/calculator/blends/grid'
import { createOxideValue, type MaterialDatabase } from '@/calculator/umf'
import type { GlazeRecipe, UMF } from '@/types'

const materials: MaterialDatabase = {
  resolve: (name: string) => ({
    id: name.toLowerCase(),
    primaryName: name,
    aliases: [name],
  } as any),
  getAnalysis: (materialId: string) => {
    if (materialId.includes('silica')) return { SiO2: 100 }
    if (materialId.includes('whiting')) return { CaO: 56.1, CO2: 43.9 } as any
    return { SiO2: 100 }
  }
}

function baseRecipe(): GlazeRecipe {
  return {
    id: 'base',
    name: 'Base',
    source: 'user',
    ingredients: [{ material: 'Silica', amount: 100, unit: 'weight' }],
    umf: new Map(),
    coneRange: [6, 6],
    atmosphere: 'oxidation',
    surfaceType: 'unknown',
    umfConfidence: 'unknown',
    verified: false,
  }
}

describe('gridPointCount', () => {
  it('multiplies step counts', () => {
    expect(gridPointCount([{ steps: 3 } as any, { steps: 5 } as any])).toBe(15)
  })
})

describe('radialBlend', () => {
  it('creates center + spokes × steps', () => {
    const recipe = baseRecipe()
    const center: UMF = {
      SiO2: createOxideValue(1, 'inferred', 'test'),
      Al2O3: createOxideValue(0.2, 'inferred', 'test')
    }

    const result = radialBlend(
      recipe,
      center,
      [
        { material: { id: 'whiting' } as any, materialName: 'Whiting', min: 0, max: 10, steps: 3 },
        { material: { id: 'silica' } as any, materialName: 'Silica', min: 0, max: 10, steps: 3 }
      ],
      3,
      materials,
      'digitalfire_2024'
    )

    expect(result.value).not.toBeNull()
    expect(result.value?.length).toBe(1 + 2 * 3)
  })
})
