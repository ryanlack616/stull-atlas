/**
 * Tests for surface type classification
 */
import { describe, it, expect } from 'vitest'
import { classifySurface, SURFACE_TYPE_COLORS, SURFACE_TYPE_COLORS_RGBA } from '../surfaceClassify'
import type { SurfaceClassifyPoint } from '../surfaceClassify'

describe('classifySurface', () => {
  const makePoints = (
    type: 'gloss' | 'matte' | 'satin',
    xCenter: number,
    yCenter: number,
    count: number,
    spread = 0.3,
  ): SurfaceClassifyPoint[] =>
    Array.from({ length: count }, (_, i) => ({
      x: xCenter + (Math.random() - 0.5) * spread,
      y: yCenter + (Math.random() - 0.5) * spread * 0.3,
      surfaceType: type,
    }))

  it('returns null cells when no data', () => {
    const result = classifySurface([], {
      xRange: [0.5, 7.2],
      yRange: [0, 1],
      resolution: 5,
    })
    expect(result.stats.validCells).toBe(0)
    expect(result.cells.length).toBe(5)
  })

  it('predicts matte in matte-dominated region', () => {
    // Cluster of matte glazes around (3.0, 0.5)
    const points = makePoints('matte', 3.0, 0.5, 50)
    const result = classifySurface(points, {
      xRange: [0.5, 7.2],
      yRange: [0, 1],
      resolution: 10,
    })

    expect(result.stats.validCells).toBeGreaterThan(0)

    // The cell nearest (3.0, 0.5) should predict matte
    const xi = Math.round(((3.0 - 0.5) / (7.2 - 0.5)) * 9)
    const yi = Math.round((0.5 / 1.0) * 9)
    const cell = result.cells[yi]?.[xi]
    expect(cell).not.toBeNull()
    expect(cell!.type).toBe('matte')
    expect(cell!.confidence).toBeGreaterThan(0.5)
  })

  it('separates matte and gloss regions', () => {
    // Matte cluster at low SiO2, gloss cluster at high SiO2
    const points = [
      ...makePoints('matte', 2.0, 0.5, 30, 0.5),
      ...makePoints('gloss', 5.0, 0.3, 30, 0.5),
    ]
    const result = classifySurface(points, {
      xRange: [0.5, 7.2],
      yRange: [0, 1],
      resolution: 10,
    })

    // Check matte region
    const xiMatte = Math.round(((2.0 - 0.5) / (7.2 - 0.5)) * 9)
    const yiMatte = Math.round((0.5 / 1.0) * 9)
    const matteCell = result.cells[yiMatte]?.[xiMatte]
    expect(matteCell?.type).toBe('matte')

    // Check gloss region
    const xiGloss = Math.round(((5.0 - 0.5) / (7.2 - 0.5)) * 9)
    const yiGloss = Math.round((0.3 / 1.0) * 9)
    const glossCell = result.cells[yiGloss]?.[xiGloss]
    expect(glossCell?.type).toBe('gloss')
  })

  it('excludes unknown surface types from classification', () => {
    const points: SurfaceClassifyPoint[] = [
      { x: 3.0, y: 0.5, surfaceType: 'unknown' },
      { x: 3.1, y: 0.5, surfaceType: 'unknown' },
      { x: 3.2, y: 0.5, surfaceType: 'unknown' },
    ]
    const result = classifySurface(points, {
      xRange: [0.5, 7.2],
      yRange: [0, 1],
      resolution: 5,
    })
    expect(result.stats.validCells).toBe(0)
  })

  it('grid dimensions match resolution', () => {
    const points = makePoints('satin', 3.0, 0.5, 20)
    const result = classifySurface(points, {
      xRange: [0.5, 7.2],
      yRange: [0, 1],
      resolution: 15,
    })
    expect(result.xCoords.length).toBe(15)
    expect(result.yCoords.length).toBe(15)
    expect(result.cells.length).toBe(15)
    expect(result.cells[0]!.length).toBe(15)
  })
})

describe('SURFACE_TYPE_COLORS', () => {
  it('has entries for all main types', () => {
    expect(SURFACE_TYPE_COLORS.gloss).toBeTruthy()
    expect(SURFACE_TYPE_COLORS.matte).toBeTruthy()
    expect(SURFACE_TYPE_COLORS.satin).toBeTruthy()
    expect(SURFACE_TYPE_COLORS.crystalline).toBeTruthy()
  })

  it('RGBA returns valid rgba string', () => {
    const rgba = SURFACE_TYPE_COLORS_RGBA('matte', 0.5)
    expect(rgba).toMatch(/^rgba\(\d+, \d+, \d+, 0\.5\)$/)
  })
})
