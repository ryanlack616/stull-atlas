import { describe, expect, it } from 'vitest'
import { buildBlendCSV } from '@/utils/export'
import { createOxideValue } from '@/calculator/umf'
import type { UMF } from '@/types'

describe('buildBlendCSV', () => {
  it('builds CSV for grid blends with meta', () => {
    const umf: UMF = {
      SiO2: createOxideValue(2.5, 'inferred', 'test'),
      Al2O3: createOxideValue(0.35, 'inferred', 'test')
    }

    const csv = buildBlendCSV([
      { label: 'A0/B0', umf, meta: { A: 0, B: 0 } },
      { label: 'A10/B5', umf, meta: { A: 10, B: 5 } }
    ])

    expect(csv.split('\n')[0]).toBe('Label,A,B,SiO2,Al2O3,B2O3,Na2O,K2O,CaO,MgO,ZnO,BaO,SrO,Li2O,Fe2O3,TiO2')
    expect(csv).toContain('"A10/B5",10,5,2.5000,0.3500')
  })

  it('builds CSV for radial blends without meta', () => {
    const umf: UMF = {
      SiO2: createOxideValue(3.1, 'inferred', 'test'),
      Al2O3: createOxideValue(0.28, 'inferred', 'test')
    }

    const csv = buildBlendCSV([
      { label: 'center', umf },
      { label: 'spoke-1', umf }
    ])

    const header = csv.split('\n')[0]
    expect(header.startsWith('Label,SiO2,Al2O3')).toBe(true)
    expect(csv).toContain('"spoke-1",3.1000,0.2800')
  })
})
