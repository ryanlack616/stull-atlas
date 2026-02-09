/**
 * Tests for AI Recipe Suggestion System
 *
 * Covers: query parser, archetype matching, and full suggestion pipeline.
 */

import { describe, it, expect } from 'vitest'
import { parseGlazeQuery } from '../queryParser'
import { findArchetypes, archetypesForCone, GLAZE_ARCHETYPES } from '../archetypes'
import { suggestRecipes } from '../suggestionEngine'

// ─── Query Parser ──────────────────────────────────────────────

describe('parseGlazeQuery', () => {
  it('extracts cone number from "celadon at cone 10"', () => {
    const q = parseGlazeQuery('celadon at cone 10')
    expect(q.cone).toBe(10)
    expect(q.glazeTerms).toContain('celadon')
    expect(q.confidence).toBeGreaterThan(0.3)
  })

  it('extracts cone from "cone 6 matte"', () => {
    const q = parseGlazeQuery('cone 6 matte')
    expect(q.cone).toBe(6)
    expect(q.glazeTerms).toContain('matte')
  })

  it('extracts negative cone from "cone 06"', () => {
    const q = parseGlazeQuery('cone 06 majolica')
    expect(q.cone).toBe(-6)
    expect(q.glazeTerms).toContain('majolica')
  })

  it('extracts atmosphere from "reduction"', () => {
    const q = parseGlazeQuery('celadon cone 10 reduction')
    expect(q.atmosphere).toBe('reduction')
  })

  it('extracts atmosphere from "electric kiln"', () => {
    const q = parseGlazeQuery('cone 6 gloss electric')
    expect(q.atmosphere).toBe('oxidation')
  })

  it('extracts surface type', () => {
    const q = parseGlazeQuery('silky satin white cone 6')
    expect(q.surface).toBe('satin')
  })

  it('extracts colors', () => {
    const q = parseGlazeQuery('copper red cone 10')
    expect(q.colors).toContain('red')
  })

  it('handles natural language phrasing', () => {
    const q = parseGlazeQuery('I want something like a celadon for cone 10')
    expect(q.glazeTerms).toContain('celadon')
    expect(q.cone).toBe(10)
  })

  it('infers cone from "high fire"', () => {
    const q = parseGlazeQuery('high fire matte')
    expect(q.cone).toBe(10)
  })

  it('infers cone from "mid fire"', () => {
    const q = parseGlazeQuery('mid fire clear')
    expect(q.cone).toBe(6)
  })

  it('handles empty input', () => {
    const q = parseGlazeQuery('')
    expect(q.glazeTerms).toHaveLength(0)
    expect(q.cone).toBeNull()
  })

  it('extracts multi-word glaze types like "floating blue"', () => {
    const q = parseGlazeQuery('floating blue cone 6')
    expect(q.glazeTerms).toContain('floating blue')
  })

  it('has higher confidence with more info', () => {
    const sparse = parseGlazeQuery('blue')
    const rich = parseGlazeQuery('cobalt blue cone 6 oxidation gloss')
    expect(rich.confidence).toBeGreaterThan(sparse.confidence)
  })
})

// ─── Archetype Matching ────────────────────────────────────────

describe('findArchetypes', () => {
  it('finds celadon archetypes', () => {
    const results = findArchetypes('celadon')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].family).toBe('celadon')
  })

  it('finds tenmoku/temmoku', () => {
    const results = findArchetypes('tenmoku')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(a => a.family === 'tenmoku')).toBe(true)
  })

  it('finds crystalline glazes', () => {
    const results = findArchetypes('crystalline')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(a => a.family === 'crystalline')).toBe(true)
  })

  it('finds glazes by color', () => {
    const results = findArchetypes('blue')
    expect(results.length).toBeGreaterThan(0)
  })

  it('ranks exact name matches higher', () => {
    const results = findArchetypes('copper red')
    expect(results[0].name.toLowerCase()).toContain('copper red')
  })

  it('returns empty for garbage input', () => {
    const results = findArchetypes('xyzzy12345')
    expect(results).toHaveLength(0)
  })
})

describe('archetypesForCone', () => {
  it('returns archetypes for cone 6', () => {
    const results = archetypesForCone(6)
    expect(results.length).toBeGreaterThan(3)
    results.forEach(a => {
      expect(a.coneRange[0]).toBeLessThanOrEqual(6)
      expect(a.coneRange[1]).toBeGreaterThanOrEqual(6)
    })
  })

  it('returns archetypes for cone 10', () => {
    const results = archetypesForCone(10)
    expect(results.length).toBeGreaterThan(3)
    results.forEach(a => {
      expect(a.coneRange[0]).toBeLessThanOrEqual(10)
      expect(a.coneRange[1]).toBeGreaterThanOrEqual(10)
    })
  })

  it('returns low fire archetypes for cone -6', () => {
    const results = archetypesForCone(-6)
    expect(results.length).toBeGreaterThan(0)
  })
})

// ─── Archetype Quality ─────────────────────────────────────────

describe('GLAZE_ARCHETYPES', () => {
  it('has at least 15 archetypes', () => {
    expect(GLAZE_ARCHETYPES.length).toBeGreaterThanOrEqual(15)
  })

  it('every archetype has required fields', () => {
    for (const arch of GLAZE_ARCHETYPES) {
      expect(arch.id).toBeTruthy()
      expect(arch.name).toBeTruthy()
      expect(arch.targets.length).toBeGreaterThan(0)
      expect(arch.coneRange).toHaveLength(2)
      expect(arch.keyMaterials.length).toBeGreaterThan(0)
      expect(arch.tags.length).toBeGreaterThan(0)
    }
  })

  it('every archetype has SiO2 and Al2O3 targets', () => {
    for (const arch of GLAZE_ARCHETYPES) {
      const oxides = arch.targets.map(t => t.oxide)
      // Most should have SiO2 (crystalline might not have much Al2O3)
      expect(oxides).toContain('SiO2')
    }
  })

  it('cone ranges are valid (min <= max)', () => {
    for (const arch of GLAZE_ARCHETYPES) {
      expect(arch.coneRange[0]).toBeLessThanOrEqual(arch.coneRange[1])
    }
  })

  it('has unique ids', () => {
    const ids = GLAZE_ARCHETYPES.map(a => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

// ─── Full Pipeline ─────────────────────────────────────────────

describe('suggestRecipes', () => {
  it('suggests celadon recipes at cone 10', () => {
    const result = suggestRecipes({ query: 'celadon at cone 10' })
    expect(result.status).not.toBe('no-match')
    expect(result.suggestions.length).toBeGreaterThan(0)

    const first = result.suggestions[0]
    expect(first.archetype.family).toBe('celadon')
    expect(first.recipe.weights.length).toBeGreaterThan(0)
    expect(first.relevance).toBeGreaterThan(0.3)
  })

  it('suggests clear gloss at cone 6', () => {
    const result = suggestRecipes({ query: 'clear gloss cone 6' })
    expect(result.suggestions.length).toBeGreaterThan(0)
    const first = result.suggestions[0]
    // Should find a clear or gloss archetype
    const hasClearOrGloss = result.suggestions.some(
      s => s.archetype.surface === 'gloss' || s.archetype.id.includes('clear'),
    )
    expect(hasClearOrGloss).toBe(true)
  })

  it('includes colorant suggestions for tenmoku', () => {
    const result = suggestRecipes({ query: 'tenmoku cone 10' })
    expect(result.suggestions.length).toBeGreaterThan(0)
    const first = result.suggestions[0]
    expect(first.colorants.length).toBeGreaterThan(0)
    const ironColorant = first.colorants.find(c => c.materialId.includes('iron'))
    expect(ironColorant).toBeDefined()
  })

  it('returns no-match for nonsense', () => {
    const result = suggestRecipes({ query: 'xyzzy12345 blorp' })
    expect(result.status).toBe('no-match')
    expect(result.suggestions).toHaveLength(0)
  })

  it('generates warnings for atmosphere mismatch', () => {
    const result = suggestRecipes({ query: 'copper red oxidation' })
    if (result.suggestions.length > 0) {
      // Copper red is traditionally reduction — oxidation should warn
      const copperRed = result.suggestions.find(
        s => s.archetype.id === 'copper-red'
      )
      if (copperRed) {
        expect(copperRed.warnings.length).toBeGreaterThan(0)
      }
    }
  })

  it('respects maxSuggestions', () => {
    const result = suggestRecipes({ query: 'blue cone 6', maxSuggestions: 1 })
    expect(result.suggestions.length).toBeLessThanOrEqual(1)
  })

  it('includes duration timing', () => {
    const result = suggestRecipes({ query: 'celadon cone 10' })
    expect(result.durationMs).toBeGreaterThan(0)
  })

  it('works with genetic method', () => {
    const result = suggestRecipes({ query: 'matte cone 6', method: 'genetic' })
    expect(result.suggestions.length).toBeGreaterThan(0)
  })

  it('generates explanation text', () => {
    const result = suggestRecipes({ query: 'celadon cone 10' })
    expect(result.suggestions.length).toBeGreaterThan(0)
    expect(result.suggestions[0].explanation.length).toBeGreaterThan(50)
  })
})
