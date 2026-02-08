import { describe, expect, it } from 'vitest'
import { materialDatabase } from '../materialDatabase'

describe('MaterialDatabase', () => {
  // ── Resolution ──────────────────────────────────────────────

  describe('resolve', () => {
    it('resolves exact primary name', () => {
      const mat = materialDatabase.resolve('EPK Kaolin', 'digitalfire_2024')
      expect(mat).not.toBeNull()
      expect(mat!.primaryName).toBe('EPK Kaolin')
    })

    it('resolves by alias (case insensitive)', () => {
      const mat = materialDatabase.resolve('edgar plastic kaolin', 'digitalfire_2024')
      expect(mat).not.toBeNull()
      expect(mat!.id).toBe('epk')
    })

    it('resolves by partial match (prefix)', () => {
      const mat = materialDatabase.resolve('Custer', 'digitalfire_2024')
      expect(mat).not.toBeNull()
      expect(mat!.primaryName).toBe('Custer Feldspar')
    })

    it('resolves case-insensitively', () => {
      const mat = materialDatabase.resolve('SILICA', 'digitalfire_2024')
      expect(mat).not.toBeNull()
      expect(mat!.category).toBe('silica')
    })

    it('returns null for empty string', () => {
      expect(materialDatabase.resolve('', 'digitalfire_2024')).toBeNull()
    })

    it('returns null for whitespace-only', () => {
      expect(materialDatabase.resolve('   ', 'digitalfire_2024')).toBeNull()
    })

    it('returns null for unknown material', () => {
      expect(materialDatabase.resolve('XyzNotAMaterial', 'digitalfire_2024')).toBeNull()
    })

    it('returns null for very short unknown strings', () => {
      expect(materialDatabase.resolve('ab', 'digitalfire_2024')).toBeNull()
    })
  })

  // ── Analysis retrieval ──────────────────────────────────────

  describe('getAnalysis', () => {
    it('returns oxide analysis for a known material', () => {
      const analysis = materialDatabase.getAnalysis('silica', 'digitalfire_2024')
      expect(analysis).not.toBeNull()
      expect(analysis!.SiO2).toBeCloseTo(100, 0)
    })

    it('returns null for unknown material id', () => {
      expect(materialDatabase.getAnalysis('nonexistent', 'digitalfire_2024')).toBeNull()
    })

    it('has valid oxide percentages (0-100)', () => {
      for (const mat of materialDatabase.getAllMaterials()) {
        const analysis = materialDatabase.getAnalysis(mat.id, 'digitalfire_2024')
        if (analysis) {
          for (const [, val] of Object.entries(analysis)) {
            expect(val).toBeGreaterThanOrEqual(0)
            expect(val).toBeLessThanOrEqual(100)
          }
        }
      }
    })
  })

  // ── getAllMaterials ─────────────────────────────────────────

  describe('getAllMaterials', () => {
    it('returns at least 19 materials', () => {
      expect(materialDatabase.getAllMaterials().length).toBeGreaterThanOrEqual(19)
    })

    it('every material has required fields', () => {
      for (const mat of materialDatabase.getAllMaterials()) {
        expect(mat.id).toBeTruthy()
        expect(mat.primaryName).toBeTruthy()
        expect(mat.category).toBeTruthy()
        expect(mat.defaultDataset).toBe('digitalfire_2024')
      }
    })

    it('no duplicate ids', () => {
      const ids = materialDatabase.getAllMaterials().map(m => m.id)
      expect(new Set(ids).size).toBe(ids.length)
    })
  })

  // ── getLoi ──────────────────────────────────────────────────

  describe('getLoi', () => {
    it('returns LOI for materials that have it', () => {
      // EPK should have a high LOI (around 12-14%)
      const loi = materialDatabase.getLoi('epk')
      expect(loi).not.toBeNull()
      expect(loi!).toBeGreaterThan(5)
    })

    it('returns null for materials without LOI', () => {
      const loi = materialDatabase.getLoi('nonexistent')
      expect(loi).toBeNull()
    })
  })

  // ── Discontinued materials ─────────────────────────────────

  describe('discontinued flag', () => {
    it('active materials have discontinued = false', () => {
      const silica = materialDatabase.resolve('Silica', 'digitalfire_2024')
      expect(silica).not.toBeNull()
      expect(silica!.discontinued).toBe(false)
    })

    it('all materials have a boolean discontinued field', () => {
      for (const mat of materialDatabase.getAllMaterials()) {
        expect(typeof mat.discontinued).toBe('boolean')
      }
    })
  })

  // ── Dataset listing ────────────────────────────────────────

  describe('getDatasets', () => {
    it('includes digitalfire_2024', () => {
      expect(materialDatabase.getDatasets()).toContain('digitalfire_2024')
    })
  })
})
