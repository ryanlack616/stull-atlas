import { describe, expect, it } from 'vitest'
import {
  spaceFillingSample,
  STULL_BOUNDS,
  DEFAULT_UMF_BOUNDS,
} from '@/calculator/blends/spacefilling'

describe('spaceFillingSample', () => {

  // ---- LHS with STULL_BOUNDS (original test, kept) -----------------------

  it('returns requested number of samples (LHS + STULL_BOUNDS)', () => {
    const result = spaceFillingSample({
      type: 'lhs',
      bounds: STULL_BOUNDS,
      count: 12,
      seed: 123
    })

    expect(result.errors.length).toBe(0)
    expect(result.value).not.toBeNull()
    expect(result.value?.length).toBe(12)
  })

  it('rejects empty bounds', () => {
    const result = spaceFillingSample({ type: 'sobol', bounds: {}, count: 5 })
    expect(result.value).toBeNull()
    expect(result.errors.length).toBeGreaterThan(0)
  })

  // ---- LHS with DEFAULT_UMF_BOUNDS (high-dimensional) --------------------

  it('LHS works with full 8-dimensional DEFAULT_UMF_BOUNDS', () => {
    const result = spaceFillingSample({
      type: 'lhs',
      bounds: DEFAULT_UMF_BOUNDS,
      count: 50,
      seed: 42
    })

    expect(result.errors).toHaveLength(0)
    expect(result.value).not.toBeNull()
    expect(result.value!.length).toBe(50)
  })

  // ---- Sobol sequence ----------------------------------------------------

  it('Sobol returns correct count with STULL_BOUNDS', () => {
    const result = spaceFillingSample({
      type: 'sobol',
      bounds: STULL_BOUNDS,
      count: 20,
    })

    expect(result.errors).toHaveLength(0)
    expect(result.value!.length).toBe(20)
  })

  it('Sobol works with DEFAULT_UMF_BOUNDS', () => {
    const result = spaceFillingSample({
      type: 'sobol',
      bounds: DEFAULT_UMF_BOUNDS,
      count: 30,
    })

    expect(result.errors).toHaveLength(0)
    expect(result.value!.length).toBe(30)
  })

  // ---- Halton sequence ---------------------------------------------------

  it('Halton returns correct count with STULL_BOUNDS', () => {
    const result = spaceFillingSample({
      type: 'halton',
      bounds: STULL_BOUNDS,
      count: 15,
    })

    expect(result.errors).toHaveLength(0)
    expect(result.value!.length).toBe(15)
  })

  it('Halton works with DEFAULT_UMF_BOUNDS', () => {
    const result = spaceFillingSample({
      type: 'halton',
      bounds: DEFAULT_UMF_BOUNDS,
      count: 25,
    })

    expect(result.errors).toHaveLength(0)
    expect(result.value!.length).toBe(25)
  })

  // ---- Non-flux samples stay within bounds --------------------------------

  it('SiO2 and Al2O3 values fall within specified bounds', () => {
    // Flux oxides get normalized so may exceed raw bounds,
    // but glass formers (SiO2) and stabilizers (Al2O3) should stay in range
    const bounds = { SiO2: { min: 2.0, max: 5.0 }, Al2O3: { min: 0.15, max: 0.6 } }
    const result = spaceFillingSample({
      type: 'lhs',
      bounds,
      count: 100,
      seed: 999
    })

    for (const sample of result.value!) {
      const sio2 = sample.umf.SiO2
      const al2o3 = sample.umf.Al2O3
      if (sio2 && 'value' in sio2) {
        expect(sio2.value).toBeGreaterThanOrEqual(bounds.SiO2.min - 0.01)
        expect(sio2.value).toBeLessThanOrEqual(bounds.SiO2.max + 0.01)
      }
      if (al2o3 && 'value' in al2o3) {
        expect(al2o3.value).toBeGreaterThanOrEqual(bounds.Al2O3.min - 0.01)
        expect(al2o3.value).toBeLessThanOrEqual(bounds.Al2O3.max + 0.01)
      }
    }
  })

  // ---- Determinism -------------------------------------------------------

  it('LHS is deterministic with same seed', () => {
    const a = spaceFillingSample({ type: 'lhs', bounds: STULL_BOUNDS, count: 10, seed: 777 })
    const b = spaceFillingSample({ type: 'lhs', bounds: STULL_BOUNDS, count: 10, seed: 777 })

    for (let i = 0; i < a.value!.length; i++) {
      expect(a.value![i].umf.SiO2?.value).toBe(b.value![i].umf.SiO2?.value)
      expect(a.value![i].umf.Al2O3?.value).toBe(b.value![i].umf.Al2O3?.value)
    }
  })

  it('LHS produces different results with different seeds', () => {
    const a = spaceFillingSample({ type: 'lhs', bounds: STULL_BOUNDS, count: 10, seed: 1 })
    const b = spaceFillingSample({ type: 'lhs', bounds: STULL_BOUNDS, count: 10, seed: 2 })

    // At least one sample should differ
    const differs = a.value!.some((s, i) =>
      s.umf.SiO2?.value !== b.value![i].umf.SiO2?.value
    )
    expect(differs).toBe(true)
  })

  // ---- Edge cases --------------------------------------------------------

  it('handles count of 1', () => {
    const result = spaceFillingSample({
      type: 'lhs',
      bounds: STULL_BOUNDS,
      count: 1,
      seed: 42
    })

    expect(result.errors).toHaveLength(0)
    expect(result.value!.length).toBe(1)
  })

  it('rejects inverted bounds (max < min)', () => {
    const result = spaceFillingSample({
      type: 'lhs',
      bounds: { SiO2: { min: 5.0, max: 2.0 } },
      count: 10,
    })

    expect(result.value).toBeNull()
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('rejects unknown sampling type', () => {
    const result = spaceFillingSample({
      type: 'bogus' as any,
      bounds: STULL_BOUNDS,
      count: 5,
    })

    expect(result.value).toBeNull()
    expect(result.errors.length).toBeGreaterThan(0)
  })

  // ---- Produces trace ----------------------------------------------------

  it('includes calculation trace', () => {
    const result = spaceFillingSample({
      type: 'lhs',
      bounds: STULL_BOUNDS,
      count: 5,
      seed: 42
    })

    expect(result.trace.length).toBeGreaterThan(0)
    const ops = result.trace.map(s => s.operation)
    expect(ops).toContain('spacefill_start')
    expect(ops).toContain('spacefill_complete')
  })
})
