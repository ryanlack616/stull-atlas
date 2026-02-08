/**
 * Tests for Material Substitutions
 */

import { describe, it, expect } from 'vitest'
import {
  findSubstitutions,
  findRecipeSubstitutions,
  getSubstitutionCategories,
} from '../materialSubstitutions'

describe('findSubstitutions', () => {
  it('finds substitutes for Custer Feldspar', () => {
    const subs = findSubstitutions('Custer Feldspar')
    expect(subs.length).toBeGreaterThan(0)
    const names = subs.map(s => s.substitute)
    expect(names).toContain('G-200 Feldspar')
    expect(names).toContain('Minspar 200')
  })

  it('resolves aliases (EPK → EPK Kaolin)', () => {
    const subs = findSubstitutions('EPK')
    expect(subs.length).toBeGreaterThan(0)
    expect(subs[0].original).toBe('EPK Kaolin')
  })

  it('is case-insensitive', () => {
    const upper = findSubstitutions('CUSTER FELDSPAR')
    const lower = findSubstitutions('custer feldspar')
    expect(upper.length).toBe(lower.length)
    expect(upper.length).toBeGreaterThan(0)
  })

  it('returns empty for unknown materials', () => {
    const subs = findSubstitutions('Unobtanium')
    expect(subs).toEqual([])
  })

  it('returns empty for single-member groups', () => {
    const subs = findSubstitutions('Zinc Oxide')
    expect(subs).toEqual([])
  })

  it('rates quality correctly', () => {
    const subs = findSubstitutions('Custer Feldspar')
    // All potash feldspars should be quality 1 (same ratio)
    for (const sub of subs) {
      expect(sub.quality).toBe(1)
    }
  })

  it('adjusts amount for Nepheline Syenite vs F-4', () => {
    const subs = findSubstitutions('F-4 Feldspar')
    const neph = subs.find(s => s.substitute === 'Nepheline Syenite')
    expect(neph).toBeDefined()
    // Nepheline has ratio 0.75, F-4 has 1.0, so subs should be 75%
    expect(neph!.adjustment).toContain('75%')
    expect(neph!.quality).toBeGreaterThanOrEqual(2)
  })

  it('handles Whiting group with Wollastonite and Dolomite', () => {
    const subs = findSubstitutions('Whiting')
    expect(subs.length).toBeGreaterThanOrEqual(2)
    const woll = subs.find(s => s.substitute === 'Wollastonite')
    expect(woll).toBeDefined()
    expect(woll!.adjustment).toContain('140%')
  })

  it('handles Calcined Alumina vs Alumina Hydrate', () => {
    const subs = findSubstitutions('Alumina Hydrate')
    const calc = subs.find(s => s.substitute === 'Calcined Alumina')
    expect(calc).toBeDefined()
    expect(calc!.adjustment).toContain('65%')
  })

  it('sorts by quality (best first)', () => {
    const subs = findSubstitutions('Talc')
    if (subs.length > 1) {
      for (let i = 1; i < subs.length; i++) {
        expect(subs[i].quality).toBeGreaterThanOrEqual(subs[i - 1].quality)
      }
    }
  })
})

describe('findRecipeSubstitutions', () => {
  it('returns subs for a typical recipe', () => {
    const result = findRecipeSubstitutions([
      'Custer Feldspar',
      'Silica',
      'EPK Kaolin',
      'Whiting',
    ])
    expect(result.size).toBeGreaterThanOrEqual(3)
    expect(result.has('Custer Feldspar')).toBe(true)
    expect(result.has('EPK Kaolin')).toBe(true)
    expect(result.has('Whiting')).toBe(true)
  })

  it('skips materials with no substitutes', () => {
    const result = findRecipeSubstitutions(['Zinc Oxide', 'Barium Carbonate'])
    // Single-member groups won't appear
    expect(result.has('Zinc Oxide')).toBe(false)
    expect(result.has('Barium Carbonate')).toBe(false)
  })
})

describe('getSubstitutionCategories', () => {
  it('returns known categories', () => {
    const cats = getSubstitutionCategories()
    expect(cats.length).toBeGreaterThan(5)
    const names = cats.map(c => c.category)
    expect(names).toContain('Potash Feldspar')
    expect(names).toContain('Silica')
    expect(names).toContain('Calcium Source')
  })

  it('each category has materials', () => {
    const cats = getSubstitutionCategories()
    for (const cat of cats) {
      expect(cat.materials.length).toBeGreaterThan(0)
    }
  })
})
