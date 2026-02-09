/**
 * Tests for the validation module
 * 
 * Covers cone limits, UMF validation, recipe validation, and Stull surface prediction
 */

import { describe, it, expect } from 'vitest'
import {
  findLimitsForCone,
  interpolateLimits,
  validateUMFAgainstLimits,
  validateRecipe,
  predictSurface,
  CONE_LIMITS,
  type ConeLimits,
  type StullPrediction,
} from '../validation'
import { UMF, GlazeRecipe } from '@/types'

// ── helpers ──────────────────────────────────────────────────────────

/** Build a UMF with oxide values wrapped as { value, confidence } */
function makeUMF(oxides: Record<string, number>): UMF {
  const umf: UMF = {}
  for (const [key, val] of Object.entries(oxides)) {
    ;(umf as any)[key] = { value: val, confidence: 1 }
  }
  return umf
}

function makeRecipe(ingredients: { material: string; amount: number }[]): GlazeRecipe {
  return {
    id: 'test',
    name: 'Test Glaze',
    source: 'user',
    ingredients: ingredients.map(i => ({ ...i, unit: 'weight' as const })),
    umf: null,
    coneRange: [6, 6],
    atmosphere: 'oxidation',
    surfaceType: 'gloss',
    umfConfidence: 'declared',
    verified: false,
  }
}

// ── findLimitsForCone ────────────────────────────────────────────────

describe('findLimitsForCone', () => {
  it('returns limits for a defined cone', () => {
    const limits = findLimitsForCone('6')
    expect(limits).not.toBeNull()
    expect(limits!.cone).toBe('6')
    expect(limits!.SiO2.min).toBe(2.5)
    expect(limits!.SiO2.max).toBe(4.5)
  })

  it('returns null for an undefined cone', () => {
    expect(findLimitsForCone('3')).toBeNull()
    expect(findLimitsForCone('13')).toBeNull()
  })

  it('accepts numeric input', () => {
    const limits = findLimitsForCone(9)
    expect(limits).not.toBeNull()
    expect(limits!.cone).toBe('9')
  })

  it('finds low-fire cones like 06', () => {
    const limits = findLimitsForCone('06')
    expect(limits).not.toBeNull()
    expect(limits!.B2O3.min).toBe(0.3) // low-fire needs boron
  })

  it('covers all defined cones', () => {
    for (const l of CONE_LIMITS) {
      expect(findLimitsForCone(l.cone)).toBe(l)
    }
  })
})

// ── interpolateLimits ────────────────────────────────────────────────

describe('interpolateLimits', () => {
  it('returns exact limits when cone matches a defined value', () => {
    // parseCone('06') → -6, but interpolateLimits takes numeric
    const limits = interpolateLimits(6)
    expect(limits).not.toBeNull()
    expect(limits!.SiO2.min).toBe(2.5)
  })

  it('interpolates between bracketing cones', () => {
    // Between cone 6 (SiO2 min 2.5, max 4.5) and cone 9 (SiO2 min 3.0, max 5.0)
    // Cone 7 → t = 1/3
    const limits = interpolateLimits(7)
    expect(limits).not.toBeNull()
    expect(limits!.SiO2.min).toBeGreaterThan(2.5)
    expect(limits!.SiO2.min).toBeLessThan(3.0)
  })

  it('clamps to lowest cone for very low values', () => {
    const limits = interpolateLimits(-10)
    expect(limits).not.toBeNull()
    // Should get lowest-cone limits
  })

  it('clamps to highest cone for very high values', () => {
    const limits = interpolateLimits(14)
    expect(limits).not.toBeNull()
    // Should get highest-cone limits
  })

  it('returns a ConeLimits with all required fields', () => {
    const limits = interpolateLimits(8)
    expect(limits).not.toBeNull()
    expect(limits!.SiO2).toHaveProperty('min')
    expect(limits!.SiO2).toHaveProperty('max')
    expect(limits!.Al2O3).toHaveProperty('min')
    expect(limits!.B2O3).toHaveProperty('min')
    expect(limits!.KNaO).toHaveProperty('min')
    expect(limits!.CaO).toHaveProperty('min')
  })
})

// ── validateUMFAgainstLimits ─────────────────────────────────────────

describe('validateUMFAgainstLimits', () => {
  it('returns no issues for a well-balanced cone 6 glaze', () => {
    const umf = makeUMF({
      SiO2: 3.5, Al2O3: 0.35, B2O3: 0.2,
      Na2O: 0.15, K2O: 0.15, CaO: 0.4, MgO: 0.1
    })
    const issues = validateUMFAgainstLimits(umf, '6')
    expect(issues).toHaveLength(0)
  })

  it('flags SiO2 above maximum', () => {
    const umf = makeUMF({ SiO2: 6.0, Al2O3: 0.35, CaO: 0.4 })
    const issues = validateUMFAgainstLimits(umf, '6')
    const siIssue = issues.find(i => i.oxide === 'SiO2')
    expect(siIssue).toBeDefined()
    expect(siIssue!.message).toContain('above')
  })

  it('flags SiO2 below minimum', () => {
    const umf = makeUMF({ SiO2: 1.5, Al2O3: 0.35, CaO: 0.4 })
    const issues = validateUMFAgainstLimits(umf, '6')
    const siIssue = issues.find(i => i.oxide === 'SiO2')
    expect(siIssue).toBeDefined()
    expect(siIssue!.message).toContain('below')
  })

  it('checks combined KNaO (alkalis)', () => {
    const umf = makeUMF({ SiO2: 3.5, Al2O3: 0.35, Na2O: 0.5, K2O: 0.3, CaO: 0.4 })
    const issues = validateUMFAgainstLimits(umf, '6')
    const alkaliIssue = issues.find(i => i.oxide === 'K2O+Na2O')
    expect(alkaliIssue).toBeDefined()
    expect(alkaliIssue!.value).toBeCloseTo(0.8)
  })

  it('does not warn about zero values', () => {
    // ZnO = 0 should not trigger "below minimum 0.0" 
    const umf = makeUMF({ SiO2: 3.5, Al2O3: 0.35, CaO: 0.4 })
    const issues = validateUMFAgainstLimits(umf, '6')
    const znIssue = issues.find(i => i.oxide === 'ZnO')
    expect(znIssue).toBeUndefined()
  })

  it('assigns error severity to extreme violations', () => {
    const umf = makeUMF({ SiO2: 10.0, Al2O3: 0.35, CaO: 0.4 })
    const issues = validateUMFAgainstLimits(umf, '6')
    const siIssue = issues.find(i => i.oxide === 'SiO2')
    expect(siIssue).toBeDefined()
    expect(siIssue!.severity).toBe('error')
  })

  it('assigns warning severity to mild violations', () => {
    const umf = makeUMF({ SiO2: 4.8, Al2O3: 0.35, CaO: 0.4 })
    const issues = validateUMFAgainstLimits(umf, '6')
    const siIssue = issues.find(i => i.oxide === 'SiO2')
    expect(siIssue).toBeDefined()
    expect(siIssue!.severity).toBe('warning')
  })

  it('handles unknown cone gracefully', () => {
    const umf = makeUMF({ SiO2: 3.5, Al2O3: 0.35 })
    // interpolateLimits will still return something
    const issues = validateUMFAgainstLimits(umf, '7')
    expect(Array.isArray(issues)).toBe(true)
  })
})

// ── validateRecipe ───────────────────────────────────────────────────

describe('validateRecipe', () => {
  it('returns valid for a well-formed recipe', () => {
    const recipe = makeRecipe([
      { material: 'Custer Feldspar', amount: 40 },
      { material: 'Silica', amount: 25 },
      { material: 'Whiting', amount: 15 },
      { material: 'EPK Kaolin', amount: 20 },
    ])
    const result = validateRecipe(recipe)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('flags empty ingredients', () => {
    const recipe = makeRecipe([])
    const result = validateRecipe(recipe)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Recipe has no ingredients')
  })

  it('flags zero or negative amounts', () => {
    const recipe = makeRecipe([
      { material: 'Silica', amount: 0 },
      { material: 'Kaolin', amount: -5 },
    ])
    const result = validateRecipe(recipe)
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('warns about very large amounts', () => {
    const recipe = makeRecipe([
      { material: 'Custer Feldspar', amount: 5000 },
      { material: 'Silica', amount: 5001 },
    ])
    const result = validateRecipe(recipe)
    expect(result.warnings.some(w => w.includes('large'))).toBe(true)
  })

  it('warns when no flux is detected', () => {
    const recipe = makeRecipe([
      { material: 'Silica', amount: 50 },
      { material: 'EPK Kaolin', amount: 50 },
    ])
    const result = validateRecipe(recipe)
    expect(result.warnings.some(w => w.includes('flux'))).toBe(true)
  })

  it('suggests silica when no glass former present', () => {
    const recipe = makeRecipe([
      { material: 'Custer Feldspar', amount: 60 },
      { material: 'Whiting', amount: 20 },
      { material: 'EPK Kaolin', amount: 20 },
    ])
    const result = validateRecipe(recipe)
    expect(result.suggestions.some(s => s.includes('silica'))).toBe(true)
  })

  it('warns when no alumina/clay source detected', () => {
    const recipe = makeRecipe([
      { material: 'Custer Feldspar', amount: 50 },
      { material: 'Silica', amount: 30 },
      { material: 'Whiting', amount: 20 },
    ])
    const result = validateRecipe(recipe)
    expect(result.warnings.some(w => w.includes('clay') || w.includes('alumina'))).toBe(true)
  })

  it('warns about hazardous materials', () => {
    const recipe = makeRecipe([
      { material: 'Lead bisilicate', amount: 50 },
      { material: 'Silica', amount: 25 },
      { material: 'Kaolin', amount: 25 },
    ])
    const result = validateRecipe(recipe)
    expect(result.warnings.some(w => w.includes('hazardous'))).toBe(true)
  })

  it('recognizes common clay names as alumina sources', () => {
    for (const clay of ['EPK', 'Grolleg', 'Ball Clay', 'Goldart', 'Bentonite']) {
      const recipe = makeRecipe([
        { material: 'Custer Feldspar', amount: 50 },
        { material: 'Silica', amount: 25 },
        { material: clay, amount: 25 },
      ])
      const result = validateRecipe(recipe)
      // Should NOT warn about missing alumina
      expect(result.warnings.some(w => w.includes('alumina'))).toBe(false)
    }
  })
})

// ── predictSurface ───────────────────────────────────────────────────

describe('predictSurface', () => {
  it('predicts matte for low Si:Al ratio', () => {
    // ratio < 5 → matte
    const umf = makeUMF({ SiO2: 2.0, Al2O3: 0.5, CaO: 0.5 })
    expect(predictSurface(umf)).toBe('matte')
  })

  it('predicts satin for medium Si:Al ratio', () => {
    // ratio 5-8 → satin
    const umf = makeUMF({ SiO2: 3.0, Al2O3: 0.5, CaO: 0.5 })
    expect(predictSurface(umf)).toBe('satin')
  })

  it('predicts gloss for high Si:Al ratio', () => {
    // ratio > 8 → gloss
    const umf = makeUMF({ SiO2: 5.0, Al2O3: 0.5, CaO: 0.5 })
    expect(predictSurface(umf)).toBe('gloss')
  })

  it('predicts underfired for very high ratio', () => {
    // ratio > 12 → underfired
    const umf = makeUMF({ SiO2: 7.0, Al2O3: 0.5, CaO: 0.5 })
    expect(predictSurface(umf)).toBe('underfired')
  })

  it('predicts crazed for low SiO2 + low Al2O3', () => {
    const umf = makeUMF({ SiO2: 1.5, Al2O3: 0.2, CaO: 0.5 })
    expect(predictSurface(umf)).toBe('crazed')
  })

  it('returns unknown for very low alumina', () => {
    const umf = makeUMF({ SiO2: 3.0, Al2O3: 0.05, CaO: 0.5 })
    expect(predictSurface(umf)).toBe('unknown')
  })

  it('returns unknown for very low silica', () => {
    const umf = makeUMF({ SiO2: 0.5, Al2O3: 0.5, CaO: 0.5 })
    expect(predictSurface(umf)).toBe('unknown')
  })

  it('handles UMF with missing oxides', () => {
    const umf = makeUMF({})
    expect(predictSurface(umf)).toBe('unknown')
  })
})
