import { describe, expect, it } from 'vitest'
import {
  recipeToUMF,
  interpolateUMF,
  interpolateUMFs,
  getOxideValue,
  createOxideValue,
  type MaterialDatabase,
} from '@/calculator/umf'
import type { GlazeRecipe, UMF, OxideSymbol } from '@/types'

// ---------------------------------------------------------------------------
//  Test material database — hand-verified oxide analyses
// ---------------------------------------------------------------------------

const ANALYSES: Record<string, Record<string, number>> = {
  silica:          { SiO2: 100 },
  whiting:         { CaO: 56.10 },
  epk:             { SiO2: 45.87, Al2O3: 37.62, Fe2O3: 0.81, TiO2: 0.36, CaO: 0.18, MgO: 0.12, K2O: 0.35, Na2O: 0.07 },
  custer_feldspar: { SiO2: 68.50, Al2O3: 17.35, Fe2O3: 0.08, CaO: 0.30, MgO: 0.00, K2O: 10.28, Na2O: 3.04 },
  dolomite:        { CaO: 30.41, MgO: 21.86 },
  talc:            { SiO2: 63.37, MgO: 31.88 },
  zinc_oxide:      { ZnO: 100 },
  wollastonite:    { SiO2: 51.72, CaO: 46.16, Fe2O3: 0.20 },
}

const testMaterials: MaterialDatabase = {
  resolve(name: string) {
    const id = name.toLowerCase().replace(/\s+/g, '_')
    if (ANALYSES[id]) {
      return { id, primaryName: name, aliases: [name] } as any
    }
    // try without underscores
    for (const key of Object.keys(ANALYSES)) {
      if (key === id || key.replace(/_/g, '') === id.replace(/_/g, '')) {
        return { id: key, primaryName: name, aliases: [name] } as any
      }
    }
    return null
  },
  getAnalysis(materialId: string) {
    return (ANALYSES[materialId] as Record<OxideSymbol, number>) || null
  },
}

function recipe(name: string, ingredients: { material: string; amount: number }[]): GlazeRecipe {
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    source: 'user',
    ingredients: ingredients.map(i => ({ ...i, unit: 'weight' as const })),
    umf: new Map(),
    coneRange: [6, 6],
    atmosphere: 'oxidation',
    surfaceType: 'unknown',
    umfConfidence: 'unknown',
    verified: false,
  }
}

// ---------------------------------------------------------------------------
//  recipeToUMF – core calculation
// ---------------------------------------------------------------------------

describe('recipeToUMF', () => {
  // ---- Happy path --------------------------------------------------------

  it('calculates UMF for a simple two-material recipe', () => {
    // 100g Custer Feldspar + 50g Silica
    const r = recipe('Simple', [
      { material: 'Custer Feldspar', amount: 100 },
      { material: 'Silica', amount: 50 },
    ])

    const result = recipeToUMF(r, testMaterials, 'digitalfire_2024')

    expect(result.errors).toHaveLength(0)
    expect(result.value).not.toBeNull()

    const umf = result.value!
    // Fluxes should sum to 1.0
    const fluxSum =
      (umf.K2O?.value || 0) +
      (umf.Na2O?.value || 0) +
      (umf.CaO?.value || 0) +
      (umf.MgO?.value || 0)

    expect(fluxSum).toBeCloseTo(1.0, 3)
    // SiO2 should be > 1 (lots of glass former)
    expect(umf.SiO2?.value).toBeGreaterThan(1)
    // Al2O3 should be present from feldspar
    expect(umf.Al2O3?.value).toBeGreaterThan(0)
  })

  it('calculates a classic cone-6 glaze correctly', () => {
    // A typical cone 6 recipe:
    // Custer Feldspar 40, Silica 30, Whiting 15, EPK 15
    const r = recipe('Cone 6 Gloss', [
      { material: 'Custer Feldspar', amount: 40 },
      { material: 'Silica', amount: 30 },
      { material: 'Whiting', amount: 15 },
      { material: 'EPK', amount: 15 },
    ])

    const result = recipeToUMF(r, testMaterials, 'digitalfire_2024')

    expect(result.errors).toHaveLength(0)
    const umf = result.value!

    // Sanity checks for a typical cone 6 glaze:
    // SiO2 typically 2.5-5.0, Al2O3 typically 0.2-0.6
    expect(umf.SiO2?.value).toBeGreaterThan(2)
    expect(umf.SiO2?.value).toBeLessThan(6)
    expect(umf.Al2O3?.value).toBeGreaterThan(0.1)
    expect(umf.Al2O3?.value).toBeLessThan(1)

    // CaO should be present from whiting
    expect(umf.CaO?.value).toBeGreaterThan(0.2)
    // K2O from feldspar
    expect(umf.K2O?.value).toBeGreaterThan(0.1)

    // SiO2:Al2O3 ratio metadata
    expect(umf._meta).toBeDefined()
    expect(umf._meta!.SiO2_Al2O3_ratio).toBeGreaterThan(4)
  })

  it('handles single-material recipe (pure silica + flux)', () => {
    // Wollastonite is both flux (CaO) and glass former (SiO2)
    const r = recipe('Pure Wollastonite', [
      { material: 'Wollastonite', amount: 100 },
    ])

    const result = recipeToUMF(r, testMaterials, 'digitalfire_2024')
    expect(result.errors).toHaveLength(0)
    const umf = result.value!

    // CaO is the only major flux → should dominate
    expect(umf.CaO?.value).toBeGreaterThan(0.9)
    // SiO2 present from wollastonite's silica content
    expect(umf.SiO2?.value).toBeGreaterThan(0)
  })

  it('handles recipe with all flux types (R2O + RO)', () => {
    const r = recipe('Multi Flux', [
      { material: 'Custer Feldspar', amount: 40 },
      { material: 'Whiting', amount: 20 },
      { material: 'Dolomite', amount: 10 },
      { material: 'Zinc Oxide', amount: 5 },
      { material: 'Silica', amount: 25 },
    ])

    const result = recipeToUMF(r, testMaterials, 'digitalfire_2024')
    expect(result.errors).toHaveLength(0)
    const umf = result.value!

    // Multiple fluxes present
    expect(umf.K2O?.value).toBeGreaterThan(0)
    expect(umf.CaO?.value).toBeGreaterThan(0)
    expect(umf.MgO?.value).toBeGreaterThan(0)
    expect(umf.ZnO?.value).toBeGreaterThan(0)

    // R2O:RO ratio metadata
    expect(umf._meta!.R2O_RO_ratio).toBeGreaterThan(0)
  })

  // ---- Epistemic tracking ------------------------------------------------

  it('tags each oxide value with epistemic state', () => {
    const r = recipe('Tracked', [
      { material: 'Custer Feldspar', amount: 100 },
    ])

    const result = recipeToUMF(r, testMaterials, 'digitalfire_2024')
    const umf = result.value!

    expect(umf.SiO2?.state).toBe('inferred')
    expect(umf.SiO2?.source).toContain('digitalfire_2024')
    expect(umf.K2O?.precision).toBeDefined()
  })

  it('produces a non-empty calculation trace', () => {
    const r = recipe('Traced', [
      { material: 'Silica', amount: 50 },
      { material: 'Whiting', amount: 50 },
    ])

    const result = recipeToUMF(r, testMaterials, 'digitalfire_2024')
    expect(result.trace.length).toBeGreaterThan(0)

    // Should include begin, material_resolution, oxide_contribution, normalize, verify steps
    const ops = result.trace.map(s => s.operation)
    expect(ops).toContain('begin')
    expect(ops).toContain('material_resolution')
    expect(ops).toContain('oxide_contribution')
    expect(ops).toContain('normalize')
    expect(ops).toContain('verify')
  })

  // ---- Error handling ----------------------------------------------------

  it('returns error for unknown material', () => {
    const r = recipe('Bad', [
      { material: 'Unobtainium', amount: 100 },
    ])

    const result = recipeToUMF(r, testMaterials, 'digitalfire_2024')
    expect(result.value).toBeNull()
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors[0]).toContain('Unobtainium')
  })

  it('returns error for recipe with no flux oxides', () => {
    const r = recipe('No Flux', [
      { material: 'Silica', amount: 100 },
    ])

    const result = recipeToUMF(r, testMaterials, 'digitalfire_2024')
    expect(result.value).toBeNull()
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors[0]).toContain('flux')
  })

  it('returns error for empty ingredient list', () => {
    const r = recipe('Empty', [])

    const result = recipeToUMF(r, testMaterials, 'digitalfire_2024')
    expect(result.value).toBeNull()
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('warns but succeeds when missing analysis for one material', () => {
    // Create a database where EPK has no analysis
    const partialDb: MaterialDatabase = {
      resolve(name) { return testMaterials.resolve(name, 'digitalfire_2024') },
      getAnalysis(materialId) {
        if (materialId === 'epk') return null
        return testMaterials.getAnalysis(materialId, 'digitalfire_2024')
      },
    }

    const r = recipe('Partial', [
      { material: 'Custer Feldspar', amount: 60 },
      { material: 'EPK', amount: 20 },
      { material: 'Silica', amount: 20 },
    ])

    const result = recipeToUMF(r, partialDb, 'digitalfire_2024')
    // Should succeed (feldspar has flux) but warn about EPK
    expect(result.value).not.toBeNull()
    expect(result.warnings.length).toBeGreaterThan(0)
  })

  // ---- Determinism -------------------------------------------------------

  it('produces identical results for identical inputs', () => {
    const r = recipe('Deterministic', [
      { material: 'Custer Feldspar', amount: 40 },
      { material: 'Whiting', amount: 20 },
      { material: 'Silica', amount: 30 },
      { material: 'EPK', amount: 10 },
    ])

    const a = recipeToUMF(r, testMaterials, 'digitalfire_2024')
    const b = recipeToUMF(r, testMaterials, 'digitalfire_2024')

    expect(a.value!.SiO2?.value).toBe(b.value!.SiO2?.value)
    expect(a.value!.Al2O3?.value).toBe(b.value!.Al2O3?.value)
    expect(a.value!.CaO?.value).toBe(b.value!.CaO?.value)
    expect(a.value!.K2O?.value).toBe(b.value!.K2O?.value)
  })

  it('is proportionally invariant (doubling amounts gives same UMF)', () => {
    const r1 = recipe('Normal', [
      { material: 'Custer Feldspar', amount: 40 },
      { material: 'Silica', amount: 30 },
      { material: 'Whiting', amount: 15 },
    ])
    const r2 = recipe('Doubled', [
      { material: 'Custer Feldspar', amount: 80 },
      { material: 'Silica', amount: 60 },
      { material: 'Whiting', amount: 30 },
    ])

    const a = recipeToUMF(r1, testMaterials, 'digitalfire_2024')
    const b = recipeToUMF(r2, testMaterials, 'digitalfire_2024')

    expect(a.value!.SiO2?.value).toBeCloseTo(b.value!.SiO2?.value!, 3)
    expect(a.value!.Al2O3?.value).toBeCloseTo(b.value!.Al2O3?.value!, 3)
    expect(a.value!.CaO?.value).toBeCloseTo(b.value!.CaO?.value!, 3)
  })
})

// ---------------------------------------------------------------------------
//  interpolateUMF – two-endpoint blending
// ---------------------------------------------------------------------------

describe('interpolateUMF', () => {
  const umfA: UMF = {
    SiO2: createOxideValue(3.0, 'inferred', 'test'),
    Al2O3: createOxideValue(0.3, 'inferred', 'test'),
    CaO: createOxideValue(0.6, 'inferred', 'test'),
    K2O: createOxideValue(0.4, 'inferred', 'test'),
  }
  const umfB: UMF = {
    SiO2: createOxideValue(4.0, 'inferred', 'test'),
    Al2O3: createOxideValue(0.5, 'inferred', 'test'),
    CaO: createOxideValue(0.8, 'inferred', 'test'),
    Na2O: createOxideValue(0.2, 'inferred', 'test'),
  }

  it('returns A at t=0', () => {
    const r = interpolateUMF(umfA, umfB, 0)
    expect(r.SiO2?.value).toBeCloseTo(3.0, 3)
    expect(r.Al2O3?.value).toBeCloseTo(0.3, 3)
  })

  it('returns B at t=1', () => {
    const r = interpolateUMF(umfA, umfB, 1)
    expect(r.SiO2?.value).toBeCloseTo(4.0, 3)
    expect(r.Al2O3?.value).toBeCloseTo(0.5, 3)
  })

  it('returns midpoint at t=0.5', () => {
    const r = interpolateUMF(umfA, umfB, 0.5)
    expect(r.SiO2?.value).toBeCloseTo(3.5, 3)
    expect(r.Al2O3?.value).toBeCloseTo(0.4, 3)
  })

  it('handles oxides present in only one endpoint', () => {
    const r = interpolateUMF(umfA, umfB, 0.5)
    // K2O only in A → 0.4 * 0.5 = 0.2
    expect(r.K2O?.value).toBeCloseTo(0.2, 3)
    // Na2O only in B → 0.2 * 0.5 = 0.1
    expect(r.Na2O?.value).toBeCloseTo(0.1, 3)
  })

  it('includes _meta with SiO2:Al2O3 ratio', () => {
    const r = interpolateUMF(umfA, umfB, 0.5)
    expect(r._meta).toBeDefined()
    expect(r._meta!.SiO2_Al2O3_ratio).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
//  interpolateUMFs – barycentric multi-point blending
// ---------------------------------------------------------------------------

describe('interpolateUMFs', () => {
  const corners: UMF[] = [
    { SiO2: createOxideValue(3.0, 'inferred', 'a'), CaO: createOxideValue(1.0, 'inferred', 'a') },
    { SiO2: createOxideValue(5.0, 'inferred', 'b'), CaO: createOxideValue(1.0, 'inferred', 'b') },
    { SiO2: createOxideValue(4.0, 'inferred', 'c'), K2O: createOxideValue(1.0, 'inferred', 'c') },
  ]

  it('returns first corner at weight [1,0,0]', () => {
    const r = interpolateUMFs(corners, [1, 0, 0])
    expect(r.SiO2?.value).toBeCloseTo(3.0, 3)
  })

  it('returns centroid at equal weights', () => {
    const r = interpolateUMFs(corners, [1/3, 1/3, 1/3])
    expect(r.SiO2?.value).toBeCloseTo(4.0, 2) // (3+5+4)/3
  })

  it('throws when weights do not sum to 1', () => {
    expect(() => interpolateUMFs(corners, [0.5, 0.5, 0.5])).toThrow('sum to 1')
  })

  it('throws when array lengths mismatch', () => {
    expect(() => interpolateUMFs(corners, [0.5, 0.5])).toThrow('count')
  })
})

// ---------------------------------------------------------------------------
//  getOxideValue helper
// ---------------------------------------------------------------------------

describe('getOxideValue', () => {
  it('returns numeric value from OxideValue', () => {
    const umf: UMF = { SiO2: createOxideValue(3.14, 'inferred', 'test') }
    expect(getOxideValue(umf, 'SiO2')).toBeCloseTo(3.14, 2)
  })

  it('returns 0 for missing oxide', () => {
    const umf: UMF = {}
    expect(getOxideValue(umf, 'SiO2')).toBe(0)
  })
})
