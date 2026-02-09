import { describe, expect, it } from 'vitest'
import { triangulateSurfaceGrid, buildOBJContent, buildSTLBuffer } from '@/utils/export'

// ── Test fixture: simple 3x3 grid ────────────────────────────

function make3x3Grid() {
  return {
    xCoords: [1, 2, 3],
    yCoords: [0, 0.5, 1],
    z: [
      [1, 2, 3],       // y=0
      [4, 5, 6],       // y=0.5
      [7, 8, 9],       // y=1
    ],
  }
}

// ── Triangulation ────────────────────────────────────────────

describe('triangulateSurfaceGrid', () => {
  it('produces correct vertex count for a full grid', () => {
    const { vertices } = triangulateSurfaceGrid(make3x3Grid())
    // 3×3 = 9 vertices, all valid
    expect(vertices).toHaveLength(9)
  })

  it('produces correct face count for a full grid', () => {
    const { faces } = triangulateSurfaceGrid(make3x3Grid())
    // 2×2 quads × 2 triangles each = 8 faces
    expect(faces).toHaveLength(8)
  })

  it('skips quads with null z values', () => {
    const grid = {
      xCoords: [1, 2, 3],
      yCoords: [0, 0.5, 1],
      z: [
        [1, 2, null],    // top-right corner null
        [4, 5, 6],
        [7, 8, 9],
      ],
    }
    const { vertices, faces } = triangulateSurfaceGrid(grid)
    // 8 valid vertices (one null skipped)
    expect(vertices).toHaveLength(8)
    // Only the bottom-left 2×2 area has all 4 corners → 2 faces from (0,0)-(1,1) quad
    // Top-right quad at (0,1)-(1,2) missing corner → 0 faces from top row right
    // But (1,0)-(2,1) and (1,1)-(2,2) quads are all valid → 4 faces
    // (0,0)-(1,1) valid → 2 faces
    // Total valid faces: 6
    expect(faces).toHaveLength(6)
  })

  it('returns empty for entirely null grid', () => {
    const grid = {
      xCoords: [1, 2],
      yCoords: [0, 1],
      z: [[null, null], [null, null]],
    }
    const { vertices, faces } = triangulateSurfaceGrid(grid)
    expect(vertices).toHaveLength(0)
    expect(faces).toHaveLength(0)
  })

  it('handles 1x1 grid (no faces possible)', () => {
    const grid = {
      xCoords: [1],
      yCoords: [0],
      z: [[5]],
    }
    const { vertices, faces } = triangulateSurfaceGrid(grid)
    expect(vertices).toHaveLength(1)
    expect(faces).toHaveLength(0)
  })

  it('vertices contain correct coordinates', () => {
    const grid = {
      xCoords: [1, 2],
      yCoords: [0, 1],
      z: [[10, 20], [30, 40]],
    }
    const { vertices } = triangulateSurfaceGrid(grid)
    expect(vertices).toHaveLength(4)
    // z[yi][xi] → vertex = (xCoords[xi], yCoords[yi], z[yi][xi])
    expect(vertices).toContainEqual([1, 0, 10])
    expect(vertices).toContainEqual([2, 0, 20])
    expect(vertices).toContainEqual([1, 1, 30])
    expect(vertices).toContainEqual([2, 1, 40])
  })

  it('face indices are 1-based', () => {
    const { faces } = triangulateSurfaceGrid(make3x3Grid())
    for (const [a, b, c] of faces) {
      expect(a).toBeGreaterThanOrEqual(1)
      expect(b).toBeGreaterThanOrEqual(1)
      expect(c).toBeGreaterThanOrEqual(1)
    }
  })
})

// ── OBJ Export ──────────────────────────────────────────────

describe('buildOBJContent', () => {
  it('produces valid OBJ with header comments', () => {
    const obj = buildOBJContent(make3x3Grid(), { zLabel: 'CaO' })
    expect(obj).toContain('# Stull Atlas 3D Surface Export')
    expect(obj).toContain('Z = CaO')
    expect(obj).toContain('o FittedSurface')
  })

  it('contains correct number of vertex lines', () => {
    const obj = buildOBJContent(make3x3Grid())
    const vLines = obj.split('\n').filter(l => l.startsWith('v '))
    expect(vLines).toHaveLength(9)
  })

  it('contains correct number of face lines', () => {
    const obj = buildOBJContent(make3x3Grid())
    const fLines = obj.split('\n').filter(l => l.startsWith('f '))
    expect(fLines).toHaveLength(8)
  })

  it('includes scatter points as second group', () => {
    const obj = buildOBJContent(make3x3Grid(), {
      scatterPoints: [
        { x: 1.5, y: 0.3, z: 2.1, name: 'Test Glaze' },
        { x: 2.5, y: 0.7, z: 4.5 },
      ],
    })
    expect(obj).toContain('o GlazePoints')
    // 9 surface vertices + 2 scatter points = 11 total 'v' lines
    const vLines = obj.split('\n').filter(l => l.startsWith('v '))
    expect(vLines).toHaveLength(11)
    // 2 point primitives
    const pLines = obj.split('\n').filter(l => l.startsWith('p '))
    expect(pLines).toHaveLength(2)
  })

  it('vertex coordinates have 6 decimal places', () => {
    const obj = buildOBJContent({
      xCoords: [1.5],
      yCoords: [0.3],
      z: [[2.1]],
    })
    expect(obj).toContain('v 1.500000 0.300000 2.100000')
  })
})

// ── STL Export ──────────────────────────────────────────────

describe('buildSTLBuffer', () => {
  it('produces correct buffer size', () => {
    const buf = buildSTLBuffer(make3x3Grid())
    // 80 header + 4 count + 8 faces × 50 bytes = 484
    expect(buf.byteLength).toBe(80 + 4 + 8 * 50)
  })

  it('header contains description', () => {
    const buf = buildSTLBuffer(make3x3Grid())
    const header = new TextDecoder().decode(new Uint8Array(buf, 0, 44))
    expect(header).toContain('Stull Atlas')
  })

  it('triangle count matches face count', () => {
    const buf = buildSTLBuffer(make3x3Grid())
    const view = new DataView(buf)
    const numTriangles = view.getUint32(80, true)
    expect(numTriangles).toBe(8)
  })

  it('handles empty grid gracefully', () => {
    const buf = buildSTLBuffer({
      xCoords: [1],
      yCoords: [0],
      z: [[5]],
    })
    const view = new DataView(buf)
    const numTriangles = view.getUint32(80, true)
    expect(numTriangles).toBe(0)
    // 80 header + 4 count + 0 faces
    expect(buf.byteLength).toBe(84)
  })

  it('normals are unit length', () => {
    const buf = buildSTLBuffer({
      xCoords: [0, 1],
      yCoords: [0, 1],
      z: [[0, 0], [0, 1]],
    })
    const view = new DataView(buf)
    // First triangle normal starts at offset 84
    const nx = view.getFloat32(84, true)
    const ny = view.getFloat32(88, true)
    const nz = view.getFloat32(92, true)
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz)
    expect(len).toBeCloseTo(1.0, 4)
  })
})
