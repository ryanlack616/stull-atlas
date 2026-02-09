/**
 * Tests for Insight XML parser and Glazy CSV parser
 */
// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { deserializeInsightXML } from '../insightXml'
import { isGlazyCSV, deserializeGlazyCSV } from '../glazyCSV'

// ─── Insight XML ───────────────────────────────────────────

describe('deserializeInsightXML', () => {
  it('parses a single recipe with ingredients', () => {
    const xml = `
      <recipe>
        <name>Clear Gloss</name>
        <cone>6</cone>
        <atmosphere>oxidation</atmosphere>
        <ingredient>
          <name>Custer Feldspar</name>
          <amount>40</amount>
        </ingredient>
        <ingredient>
          <name>Silica</name>
          <amount>30</amount>
        </ingredient>
        <ingredient>
          <name>Whiting</name>
          <amount>20</amount>
        </ingredient>
        <ingredient>
          <name>EPK Kaolin</name>
          <amount>10</amount>
        </ingredient>
      </recipe>
    `
    const recipes = deserializeInsightXML(xml)
    expect(recipes).toHaveLength(1)
    expect(recipes[0].name).toBe('Clear Gloss')
    expect(recipes[0].ingredients).toHaveLength(4)
    expect(recipes[0].ingredients[0].material).toBe('Custer Feldspar')
    expect(recipes[0].ingredients[0].amount).toBe(40)
  })

  it('parses multiple <recipe> nodes', () => {
    const xml = `
      <recipes>
        <recipe>
          <name>A</name>
          <ingredient><name>Silica</name><amount>50</amount></ingredient>
          <ingredient><name>Whiting</name><amount>50</amount></ingredient>
        </recipe>
        <recipe>
          <name>B</name>
          <ingredient><name>Kaolin</name><amount>100</amount></ingredient>
        </recipe>
      </recipes>
    `
    const recipes = deserializeInsightXML(xml)
    expect(recipes).toHaveLength(2)
    expect(recipes[0].name).toBe('A')
    expect(recipes[1].name).toBe('B')
  })

  it('extracts UMF data when present', () => {
    const xml = `
      <recipe>
        <name>Test</name>
        <ingredient><name>Feldspar</name><amount>100</amount></ingredient>
        <umf>
          <SiO2>3.5</SiO2>
          <Al2O3>0.35</Al2O3>
        </umf>
      </recipe>
    `
    const recipes = deserializeInsightXML(xml)
    expect(recipes).toHaveLength(1)
    const umf = recipes[0].umf!
    expect(umf.SiO2!.value).toBe(3.5)
    expect(umf.Al2O3!.value).toBe(0.35)
  })

  it('returns empty array for empty ingredients', () => {
    const xml = `<recipe><name>Empty</name></recipe>`
    const recipes = deserializeInsightXML(xml)
    expect(recipes).toHaveLength(0)
  })

  it('throws on invalid XML', () => {
    expect(() => deserializeInsightXML('<not closed')).toThrow('Invalid XML')
  })

  it('handles attribute-based ingredient format', () => {
    const xml = `
      <recipe>
        <name>Attr Style</name>
        <ingredient name="Silica" amount="60" />
        <ingredient name="Whiting" amount="40" />
      </recipe>
    `
    const recipes = deserializeInsightXML(xml)
    expect(recipes).toHaveLength(1)
    expect(recipes[0].ingredients).toHaveLength(2)
    expect(recipes[0].ingredients[0].material).toBe('Silica')
    expect(recipes[0].ingredients[0].amount).toBe(60)
  })
})

// ─── Glazy CSV ─────────────────────────────────────────────

describe('isGlazyCSV', () => {
  it('detects Glazy CSV by SiO2_umf header', () => {
    expect(isGlazyCSV('id,name,SiO2_umf,Al2O3_umf')).toBe(true)
  })

  it('detects Glazy CSV by from_orton_cone header', () => {
    expect(isGlazyCSV('id,name,from_orton_cone,to_orton_cone')).toBe(true)
  })

  it('rejects generic CSV headers', () => {
    expect(isGlazyCSV('name,silica,kaolin,feldspar')).toBe(false)
  })
})

describe('deserializeGlazyCSV', () => {
  const header = 'id,name,from_orton_cone,to_orton_cone,surface_type,SiO2_umf,Al2O3_umf,CaO_umf,Na2O_umf,K2O_umf,B2O3_umf,MgO_umf,BaO_umf,SrO_umf,ZnO_umf,MnO_umf,Fe2O3_umf,TiO2_umf,ZrO2_umf,P2O5_umf,V2O5_umf,Cr2O3_umf,NiO_umf,CuO_umf,CoO_umf,SnO2_umf,Li2O_umf'

  it('parses a well-formed row', () => {
    const csv = [
      header,
      '123,Clear Gloss,6,6,1,3.5,0.35,0.6,0.2,0.15,0,0.05,0,0,0,0,0.01,0,0,0,0,0,0,0,0,0,0',
    ].join('\n')

    const recipes = deserializeGlazyCSV(csv)
    expect(recipes).toHaveLength(1)
    expect(recipes[0].name).toBe('Clear Gloss')
    expect(recipes[0].id).toBe('glazy_123')
    const umf = recipes[0].umf!
    expect(umf.SiO2!.value).toBe(3.5)
    expect(umf.Al2O3!.value).toBe(0.35)
    expect(umf.CaO!.value).toBe(0.6)
  })

  it('skips rows without UMF data', () => {
    const csv = [
      header,
      '456,Empty,,,,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
    ].join('\n')

    const recipes = deserializeGlazyCSV(csv)
    expect(recipes).toHaveLength(0)
  })

  it('handles multiple rows', () => {
    const csv = [
      header,
      '1,A,6,6,1,3.0,0.3,0.5,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
      '2,B,10,10,3,4.0,0.4,0.7,0.1,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
    ].join('\n')

    const recipes = deserializeGlazyCSV(csv)
    expect(recipes).toHaveLength(2)
    expect(recipes[0].name).toBe('A')
    expect(recipes[1].name).toBe('B')
  })

  it('returns empty for header-only CSV', () => {
    const csv = header
    const recipes = deserializeGlazyCSV(csv)
    expect(recipes).toHaveLength(0)
  })

  it('maps surface type correctly', () => {
    const csv = [
      header,
      '1,Satin,6,6,2,3.0,0.3,0.5,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
    ].join('\n')

    const recipes = deserializeGlazyCSV(csv)
    expect(recipes[0].surfaceType).toBe('satin')
  })
})
