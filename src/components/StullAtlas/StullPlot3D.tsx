/**
 * Stull Plot 3D Component
 *
 * Full-featured 3D visualization of the Stull chart using Plotly scatter3d,
 * mesh3d, and surface traces.
 *
 * X = SiO2, Y = Al2O3 (canonical Stull axes), Z = user-selectable.
 *
 * Features:
 *   - Scatter cloud with discrete cone colorscale (parity with 2D)
 *   - Stull region meshes + Q-line on the floor plane
 *   - Temperature contour bands on the floor
 *   - Selected glaze highlight ring
 *   - Blend result overlay (from calculator pages)
 *   - Cluster / void highlights (from analysis panel)
 *   - Nadaraya-Watson fitted surface with projected contours
 *   - Smart drop lines (only for small datasets or selected points)
 *   - Camera presets (default, top-down, side-X, side-Y)
 */

import React, { useMemo, useCallback, useEffect, useState, useRef } from 'react'
import createPlotlyComponent from 'react-plotly.js/factory'
import { useGlazeStore, useSelectionStore, useRecipeStore, useThemeStore, useMolarWeightStore } from '@/stores'
import { OxideSymbol, GlazePlotPoint, SurfaceType, EpistemicState } from '@/types'
import { getOxideValue } from '@/calculator/umf'
import { fitSurface, type SurfaceGrid } from '@/analysis/surfaceFit'
import { classifySurface, SURFACE_TYPE_COLORS_RGBA, type SurfaceClassifyGrid } from '@/analysis/surfaceClassify'
import { glazeTypeColor, glazeTypeName } from '@/domain/glaze'
import { useFilteredPoints } from '@/hooks'

// ─── Public types ──────────────────────────────────────────────

export type ZAxisOption =
  | 'B2O3' | 'CaO' | 'MgO' | 'Na2O' | 'K2O' | 'ZnO' | 'BaO' | 'Fe2O3'
  | 'cone' | 'flux_ratio' | 'SiO2_Al2O3_ratio'

export type CameraPreset = 'default' | 'top' | 'side-x' | 'side-y'

type ColorByOption = 'cone' | 'surface' | 'source' | 'flux_ratio' | 'confidence' | 'boron' | 'z_axis' | 'glaze_type'

export interface LightPosition {
  x: number
  y: number
  z: number
}

export interface ProximityWeights {
  x: number   // SiO2 weight (0–1)
  y: number   // Al2O3 weight (0–1)
  z: number   // Z-axis weight (0–1)
  cone: number   // Cone similarity weight (0–1)
  surface: number // Surface type match weight (0–1)
}

export const DEFAULT_PROXIMITY_WEIGHTS: ProximityWeights = {
  x: 0.5,
  y: 0.5,
  z: 0.5,
  cone: 0.0,
  surface: 0.0,
}

export interface ProximityNeighbor {
  id: string
  name: string
  distance: number // weighted normalized distance
  x: number
  y: number
  z: number
  cone: number | null
  surfaceType: string
  // Per-axis similarity (0 = identical, 1 = max range apart)
  dx: number  // normalized delta on SiO2
  dy: number  // normalized delta on Al2O3
  dz: number  // normalized delta on Z-axis
  dCone: number   // normalized cone delta (0–1)
  dSurface: number // surface mismatch (0 = same, 1 = different)
}

export interface ProximityStats {
  visible: number
  total: number
  nearby: ProximityNeighbor[]
}

interface StullPlot3DProps {
  zAxis?: ZAxisOption
  colorBy?: ColorByOption
  zoom?: number
  width?: number
  height?: number
  // Feature parity with 2D
  highlightPointIds?: string[]
  highlightCircle?: { x: number; y: number; r: number } | null
  // Surface fitting
  showSurface?: boolean
  surfaceOpacity?: number
  // Camera
  cameraPreset?: CameraPreset
  // 3D perspective (FOV)
  perspective?: number
  // Light source position
  lightPosition?: LightPosition
  // Surface type prediction heatmap on the floor plane
  showPrediction?: boolean
  // Callback when fitted surface grid updates (for export)
  onSurfaceGridReady?: (grid: SurfaceGrid | null, scatterPoints: { x: number; y: number; z: number; name: string }[]) => void
  // 3D-specific controls
  autoRotate?: boolean
  autoRotateSpeed?: number
  pointSize?: number
  zStretch?: number
  // Proximity filter — only show glazes within this normalized radius of the selected glaze
  proximityRadius?: number | null
  // Override which glaze ID is the center of the proximity sphere ("pin" feature)
  proximityCenterId?: string | null
  // Aesthetic Compass — axis weights for proximity distance calculation
  proximityWeights?: ProximityWeights
  // Glaze ID hovered in the nearby list — show highlight marker in 3D
  hoveredNeighborId?: string | null
  // Callback reporting proximity filter stats (visible count, total count, ranked nearby list)
  onProximityStats?: (stats: ProximityStats | null) => void
  // Callback to reset camera from inside (e.g. double-click)
  onResetCamera?: () => void
}

type PlotData = any
type PlotComponentType = React.ComponentType<any>

// ─── Discrete cone colorscale (matches 2D) ─────────────────────

const CONE_COLORSCALE: [number, string][] = [
  [0,        '#6366f1'], [0.5 / 14, '#6366f1'],   // Cone 04 — indigo
  [0.5 / 14, '#3b82f6'], [1.5 / 14, '#3b82f6'],   // Cone 03 — blue
  [1.5 / 14, '#06b6d4'], [2.5 / 14, '#06b6d4'],   // Cone 02 — cyan
  [2.5 / 14, '#14b8a6'], [3.5 / 14, '#14b8a6'],   // Cone 01 — teal
  [3.5 / 14, '#10b981'], [4.5 / 14, '#10b981'],   // Cone 0  — emerald
  [4.5 / 14, '#22c55e'], [5.5 / 14, '#22c55e'],   // Cone 1  — green
  [5.5 / 14, '#84cc16'], [6.5 / 14, '#84cc16'],   // Cone 2  — lime
  [6.5 / 14, '#a3e635'], [7.5 / 14, '#a3e635'],   // Cone 3  — chartreuse
  [7.5 / 14, '#facc15'], [8.5 / 14, '#facc15'],   // Cone 4  — yellow
  [8.5 / 14, '#f59e0b'], [9.5 / 14, '#f59e0b'],   // Cone 5  — amber
  [9.5 / 14, '#f97316'], [10.5 / 14, '#f97316'],  // Cone 6  — orange
  [10.5 / 14, '#ef4444'], [11.5 / 14, '#ef4444'],  // Cone 7  — red
  [11.5 / 14, '#dc2626'], [12.5 / 14, '#dc2626'],  // Cone 8  — crimson
  [12.5 / 14, '#e11d48'], [13.5 / 14, '#e11d48'],  // Cone 9  — rose
  [13.5 / 14, '#a855f7'], [1,        '#a855f7'],   // Cone 10 — purple
]

const COLOR_SCALES: Record<string, string | [number, string][]> = {
  cone: CONE_COLORSCALE as any,
  surface: 'Viridis',
  source: 'Set1',
  flux_ratio: 'Portland',
  confidence: 'Greys',
  boron: 'YlOrRd',
  z_axis: 'Viridis',
}

// ─── Camera presets ─────────────────────────────────────────────

const CAMERA_PRESETS: Record<CameraPreset, (zoom: number) => { eye: any; up: any }> = {
  default: (z) => ({
    eye: { x: 1.5 / z, y: -1.8 / z, z: 1.2 / z },
    up: { x: 0, y: 0, z: 1 },
  }),
  top: (z) => ({
    eye: { x: 0.001, y: -0.001, z: 3.0 / z },
    up: { x: 0, y: 1, z: 0 },
  }),
  'side-x': (z) => ({
    eye: { x: 0, y: -3.0 / z, z: 0.5 / z },
    up: { x: 0, y: 0, z: 1 },
  }),
  'side-y': (z) => ({
    eye: { x: 3.0 / z, y: 0, z: 0.5 / z },
    up: { x: 0, y: 0, z: 1 },
  }),
}

// ─── Stull region geometry ──────────────────────────────────────

function buildStullRegionTraces(zFloor: number): PlotData[] {
  const regions: Array<{
    name: string
    vertices: [number, number][]
    triangles: [number, number, number][]
    color: string
  }> = [
    {
      name: 'Unfused',
      vertices: [[0.5, 0.39], [2.8, 1.0], [0.5, 1.0]],
      triangles: [[0, 1, 2]],
      color: 'rgba(120, 120, 120, 0.15)',
    },
    {
      name: 'Matte',
      vertices: [[0.5, 0.05], [0.5, 0.39], [2.8, 1.0], [4.0, 1.0]],
      triangles: [[0, 1, 2], [0, 2, 3]],
      color: 'rgba(76, 175, 80, 0.15)',
    },
    {
      name: 'Semi-Matte',
      vertices: [[1.2, 0.242], [4.0, 1.0], [5.0, 1.0]],
      triangles: [[0, 1, 2]],
      color: 'rgba(139, 195, 74, 0.12)',
    },
    {
      name: 'Crazed',
      vertices: [[0.5, 0.0], [0.5, 0.05], [1.2, 0.242], [1.75, 0.0]],
      triangles: [[0, 1, 2], [0, 2, 3]],
      color: 'rgba(244, 67, 54, 0.15)',
    },
    {
      name: 'Underfired',
      vertices: [[1.75, 0.0], [7.2, 0.65], [7.2, 0.0]],
      triangles: [[0, 1, 2]],
      color: 'rgba(158, 158, 158, 0.15)',
    },
    {
      name: 'Bright Gloss',
      vertices: [
        [0.5, 0.0], [0.5, 0.05], [1.2, 0.242], [1.75, 0.0],
        [2.7, 0.23], [3.3, 0.25], [3.9, 0.28], [4.2, 0.29],
        [5.4, 0.49], [7.2, 0.615], [7.2, 0.0],
      ],
      triangles: [
        [0, 3, 10], [3, 4, 10], [4, 5, 10], [5, 6, 10],
        [6, 7, 10], [7, 8, 10], [8, 9, 10],
      ],
      color: 'rgba(33, 150, 243, 0.10)',
    },
  ]

  return regions.map(region => {
    const allX: number[] = []
    const allY: number[] = []
    const allZ: number[] = []
    const iArr: number[] = []
    const jArr: number[] = []
    const kArr: number[] = []

    for (const v of region.vertices) {
      allX.push(v[0])
      allY.push(v[1])
      allZ.push(zFloor)
    }
    for (const tri of region.triangles) {
      iArr.push(tri[0])
      jArr.push(tri[1])
      kArr.push(tri[2])
    }

    return {
      type: 'mesh3d' as const,
      x: allX, y: allY, z: allZ,
      i: iArr, j: jArr, k: kArr,
      color: region.color,
      opacity: 0.3,
      flatshading: true,
      hoverinfo: 'text' as const,
      hovertext: region.name,
      name: region.name,
      showlegend: false,
      lighting: { ambient: 1, diffuse: 0, specular: 0 },
    }
  })
}

// ─── Temperature contour bands on floor ─────────────────────────

function buildTempContourTraces(zFloor: number, isDark: boolean): PlotData[] {
  // Simplified temperature zone boundaries from Derek Philipau's empirical data
  // Shown as translucent bands on the floor — gives context without clutter
  const zones: Array<{
    label: string
    vertices: [number, number][]
    triangles: [number, number, number][]
    color: string
  }> = [
    {
      label: '1280°C',
      vertices: [[1.8, 0.4], [1.8, 0.85], [6.6, 0.85], [6.6, 0.4]],
      triangles: [[0, 1, 2], [0, 2, 3]],
      color: isDark ? 'rgba(239, 68, 68, 0.06)' : 'rgba(239, 68, 68, 0.04)',
    },
    {
      label: '1260°C',
      vertices: [[2.0, 0.45], [2.0, 0.80], [6.2, 0.80], [6.2, 0.45]],
      triangles: [[0, 1, 2], [0, 2, 3]],
      color: isDark ? 'rgba(245, 158, 11, 0.06)' : 'rgba(245, 158, 11, 0.04)',
    },
    {
      label: '1240°C',
      vertices: [[2.4, 0.50], [2.4, 0.75], [5.8, 0.75], [5.8, 0.50]],
      triangles: [[0, 1, 2], [0, 2, 3]],
      color: isDark ? 'rgba(234, 179, 8, 0.06)' : 'rgba(234, 179, 8, 0.04)',
    },
  ]

  return zones.map(zone => {
    const allX: number[] = []
    const allY: number[] = []
    const allZ: number[] = []
    const iArr: number[] = []
    const jArr: number[] = []
    const kArr: number[] = []

    for (const v of zone.vertices) {
      allX.push(v[0])
      allY.push(v[1])
      allZ.push(zFloor)
    }
    for (const tri of zone.triangles) {
      iArr.push(tri[0])
      jArr.push(tri[1])
      kArr.push(tri[2])
    }

    return {
      type: 'mesh3d' as const,
      x: allX, y: allY, z: allZ,
      i: iArr, j: jArr, k: kArr,
      color: zone.color,
      opacity: 0.5,
      flatshading: true,
      hoverinfo: 'text' as const,
      hovertext: zone.label,
      name: zone.label,
      showlegend: false,
      lighting: { ambient: 1, diffuse: 0, specular: 0 },
    }
  })
}

// ─── Q-line ─────────────────────────────────────────────────────

function buildQLineTrace(zFloor: number): PlotData {
  return {
    type: 'scatter3d' as const,
    mode: 'lines' as const,
    x: [1.8, 4.2, 6.0, 7.2],
    y: [0.2, 0.6, 0.8, 0.92],
    z: [zFloor, zFloor, zFloor, zFloor],
    line: { color: 'rgba(255, 255, 255, 0.4)', width: 3, dash: 'dot' },
    hoverinfo: 'text' as const,
    hovertext: 'Q-line',
    name: 'Q-line',
    showlegend: false,
  }
}

// ─── Surface trace from fitted grid ─────────────────────────────

function buildSurfaceTrace(
  surface: SurfaceGrid,
  zAxis: ZAxisOption,
  opacity: number,
  isDark: boolean,
  lightPos?: LightPosition,
): PlotData {
  return {
    type: 'surface' as const,
    x: surface.xCoords,
    y: surface.yCoords,
    z: surface.z,
    opacity,
    colorscale: 'Viridis',
    showscale: false,
    hoverinfo: 'z' as const,
    hovertemplate: `${zAxisLabel(zAxis)}: %{z:.3f}<extra>Surface</extra>`,
    name: 'Fitted Surface',
    showlegend: false,
    contours: {
      z: {
        show: true,
        usecolormap: true,
        highlightcolor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
        project: { z: true },
      },
    },
    lighting: lightPos ? {
      ambient: 0.5,
      diffuse: 0.8,
      specular: 0.4,
      roughness: 0.4,
      fresnel: 0.2,
    } : {
      ambient: 0.8,
      diffuse: 0.3,
      specular: 0.15,
      roughness: 0.6,
    },
    lightposition: lightPos
      ? { x: lightPos.x * 100000, y: lightPos.y * 100000, z: lightPos.z * 100000 }
      : { x: 0, y: 0, z: 10000 },
  }
}

// ─── Highlight sphere (void detection) ──────────────────────────

function buildHighlightSphere(
  center: { x: number; y: number },
  radius: number,
  zFloor: number,
  zCeiling: number,
): PlotData {
  // Render as a vertical cylinder of lines
  const segments = 32
  const xs: (number | null)[] = []
  const ys: (number | null)[] = []
  const zs: (number | null)[] = []

  // Floor ring
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    xs.push(center.x + radius * Math.cos(angle))
    ys.push(center.y + radius * Math.sin(angle))
    zs.push(zFloor)
  }
  xs.push(null); ys.push(null); zs.push(null)

  // Ceiling ring
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    xs.push(center.x + radius * Math.cos(angle))
    ys.push(center.y + radius * Math.sin(angle))
    zs.push(zCeiling)
  }
  xs.push(null); ys.push(null); zs.push(null)

  // Vertical pillars (4 cardinal points)
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2
    const px = center.x + radius * Math.cos(angle)
    const py = center.y + radius * Math.sin(angle)
    xs.push(px, px, null)
    ys.push(py, py, null)
    zs.push(zFloor, zCeiling, null)
  }

  return {
    type: 'scatter3d' as const,
    mode: 'lines' as const,
    x: xs, y: ys, z: zs,
    line: { color: 'rgba(244, 67, 54, 0.5)', width: 2, dash: 'dash' },
    hoverinfo: 'text' as const,
    hovertext: 'Void region',
    name: 'Void',
    showlegend: false,
  }
}

// ─── Main component ─────────────────────────────────────────────

export function StullPlot3D({
  zAxis = 'B2O3',
  colorBy = 'cone',
  zoom = 1,
  width,
  height,
  highlightPointIds,
  highlightCircle,
  showSurface = true,
  surfaceOpacity = 0.35,
  showPrediction = false,
  cameraPreset = 'default',
  perspective = 0.5,
  lightPosition,
  onSurfaceGridReady,
  autoRotate = false,
  autoRotateSpeed = 0.5,
  pointSize = 2.5,
  zStretch = 0.8,
  proximityRadius = null,
  proximityCenterId = null,
  proximityWeights = DEFAULT_PROXIMITY_WEIGHTS,
  hoveredNeighborId = null,
  onProximityStats,
  onResetCamera,
}: StullPlot3DProps) {
  const [PlotComponent, setPlotComponent] = useState<PlotComponentType | null>(null)
  const [plotError, setPlotError] = useState(false)
  const [loadSlow, setLoadSlow] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const plotRef = useRef<any>(null)
  const plotlyRef = useRef<any>(null) // Plotly module for programmatic calls

  // Track user camera so selecting a glaze doesn't reset the view
  const userCameraRef = useRef<any>(null)
  const rotationAngleRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    let active = true
    setPlotError(false)
    setLoadSlow(false)
    const slowTimer = setTimeout(() => { if (active) setLoadSlow(true) }, 12000)
    import('plotly.js-gl3d-dist-min').then((mod) => {
      if (!active) return
      clearTimeout(slowTimer)
      const Plotly = (mod as any).default ?? mod
      plotlyRef.current = Plotly
      const Plot = createPlotlyComponent(Plotly)
      setPlotComponent(() => Plot)
    }).catch(() => {
      if (!active) return
      clearTimeout(slowTimer)
      setPlotError(true)
    })
    return () => { active = false; clearTimeout(slowTimer) }
  }, [retryCount])

  const getPlotPoints = useGlazeStore(s => s.getPlotPoints)
  const activeWeightSetId = useMolarWeightStore(s => s.currentSetId)
  const glazes = useGlazeStore(s => s.glazes)
  const selectedGlaze = useSelectionStore(s => s.selectedGlaze)
  const setSelectedGlaze = useSelectionStore(s => s.setSelectedGlaze)
  const setHoveredPoint = useSelectionStore(s => s.setHoveredPoint)
  const blendResults = useRecipeStore(s => s.blendResults)
  const theme = useThemeStore(s => s.theme)

  const isDark = theme === 'dark'

  // Theme colors
  const plotColors = useMemo(() => ({
    paper: isDark ? '#1a1a1a' : '#ffffff',
    bg: isDark ? '#1a1a1a' : '#f5f5f5',
    axisbg: isDark ? '#1e1e1e' : '#f8f8f8',
    grid: isDark ? '#333' : '#ddd',
    zeroline: isDark ? '#444' : '#ccc',
    axisTitle: isDark ? '#aaa' : '#555',
    tick: isDark ? '#888' : '#666',
    font: isDark ? '#ccc' : '#333',
    regionLabel: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.22)',
  }), [isDark])

  // ─── Plot data with Z extraction ─────────────────────────────

  const rawPoints = useMemo(() => getPlotPoints(activeWeightSetId), [getPlotPoints, activeWeightSetId])
  const filteredPoints = useFilteredPoints(rawPoints)

  const plotData = useMemo(() => {
    return filteredPoints.filter(p =>
      p.x != null && p.y != null &&
      !isNaN(p.x) && !isNaN(p.y) &&
      p.x > 0 && p.y > 0 &&
      p.cone != null && p.cone >= -4 && p.cone <= 10
    ).map(p => {
      const glaze = glazes.get(p.id)
      const umfData = glaze?.umf

      let z = 0
      switch (zAxis) {
        case 'cone':
          z = p.cone ?? 6; break
        case 'flux_ratio':
          z = p.fluxRatio; break
        case 'SiO2_Al2O3_ratio':
          z = (p.x > 0 && p.y > 0) ? p.x / p.y : 0; break
        case 'B2O3':
          z = umfData?.B2O3?.value ?? p.boron ?? 0; break
        default:
          z = (umfData as any)?.[zAxis]?.value ?? 0; break
      }

      return { ...p, z }
    }).filter(p => isFinite(p.z))
  }, [filteredPoints, glazes, zAxis])

  // ─── Proximity filter (Aesthetic Compass) ──────────────────────
  // Weighted normalized Euclidean distance: √(Σ wᵢ · δᵢ²)
  // Axes x/y/z are normalized to 0-1 by data range.
  // Cone and surface type are extra dimensions controlled by weights.

  const { visibleData, proximityCenter, axisRanges, nearby } = useMemo(() => {
    if (proximityRadius == null || !selectedGlaze || plotData.length === 0) {
      return { visibleData: plotData, proximityCenter: null, axisRanges: null, nearby: [] as ProximityNeighbor[] }
    }

    // Find center point — use pinned center if provided, else selected glaze
    const centerId = proximityCenterId ?? selectedGlaze.id
    const center = plotData.find(p => p.id === centerId)
    if (!center) {
      return { visibleData: plotData, proximityCenter: null, axisRanges: null, nearby: [] as ProximityNeighbor[] }
    }

    // Compute axis ranges for normalization (use loops to avoid stack overflow on large datasets)
    let xMin = Infinity, xMax = -Infinity
    let yMin = Infinity, yMax = -Infinity
    let zMin_ = Infinity, zMax_ = -Infinity
    let coneMin = Infinity, coneMax = -Infinity
    for (const p of plotData) {
      if (p.x < xMin) xMin = p.x
      if (p.x > xMax) xMax = p.x
      if (p.y < yMin) yMin = p.y
      if (p.y > yMax) yMax = p.y
      if (isFinite(p.z)) {
        if (p.z < zMin_) zMin_ = p.z
        if (p.z > zMax_) zMax_ = p.z
      }
      if (p.cone != null) {
        if (p.cone < coneMin) coneMin = p.cone
        if (p.cone > coneMax) coneMax = p.cone
      }
    }
    const xRange = Math.max(xMax - xMin, 0.001)
    const yRange = Math.max(yMax - yMin, 0.001)
    const zRange_ = Math.max(zMin_ < Infinity ? zMax_ - zMin_ : 1, 0.001)
    const coneRange = Math.max(coneMax - coneMin, 1)
    const ranges = { x: xRange, y: yRange, z: zRange_ }

    // Weights — clamp to [0, 1]
    const w = proximityWeights
    const wx = Math.max(0, Math.min(1, w.x))
    const wy = Math.max(0, Math.min(1, w.y))
    const wz = Math.max(0, Math.min(1, w.z))
    const wCone = Math.max(0, Math.min(1, w.cone))
    const wSurface = Math.max(0, Math.min(1, w.surface))
    // Total weight for normalization so changing weights doesn't shrink/grow the sphere radius
    const wTotal = wx + wy + wz + wCone + wSurface
    const wNorm = wTotal > 0 ? Math.sqrt(wTotal) : 1

    const filtered: typeof plotData = []
    const distances: { point: typeof plotData[0]; dist: number; dx: number; dy: number; dz: number; dCone: number; dSurface: number }[] = []

    const centerCone = center.cone ?? 6
    const centerSurface = center.surfaceType ?? 'unknown'

    for (const p of plotData) {
      // Normalized axis deltas (0–1 range)
      const dx = (p.x - center.x) / ranges.x
      const dy = (p.y - center.y) / ranges.y
      const dz = (p.z - center.z) / ranges.z
      // Cone delta (normalized 0–1)
      const dCone = (p.cone != null && center.cone != null)
        ? Math.abs((p.cone - centerCone) / coneRange)
        : 0.5 // unknown cone gets moderate penalty
      // Surface match (0 = same, 1 = different)
      const dSurface = (p.surfaceType ?? 'unknown') === centerSurface ? 0 : 1

      // Weighted distance: √(Σ wᵢ · δᵢ²) / √(Σ wᵢ) to normalize
      const rawDist = Math.sqrt(
        wx * dx * dx +
        wy * dy * dy +
        wz * dz * dz +
        wCone * dCone * dCone +
        wSurface * dSurface * dSurface
      ) / wNorm

      if (rawDist <= proximityRadius) {
        filtered.push(p)
        if (p.id !== center.id) {
          distances.push({
            point: p,
            dist: rawDist,
            dx: Math.abs(dx),
            dy: Math.abs(dy),
            dz: Math.abs(dz),
            dCone,
            dSurface,
          })
        }
      }
    }

    // Always include the center point
    if (!filtered.find(p => p.id === center.id)) {
      filtered.push(center)
    }

    // Sort by weighted distance for the ranked list
    distances.sort((a, b) => a.dist - b.dist)
    const nearby: ProximityNeighbor[] = distances.slice(0, 50).map(d => ({
      id: d.point.id,
      name: d.point.name,
      distance: d.dist,
      x: d.point.x,
      y: d.point.y,
      z: d.point.z,
      cone: d.point.cone,
      surfaceType: d.point.surfaceType ?? 'unknown',
      dx: d.dx,
      dy: d.dy,
      dz: d.dz,
      dCone: d.dCone,
      dSurface: d.dSurface,
    }))

    return {
      visibleData: filtered,
      proximityCenter: center,
      axisRanges: ranges,
      nearby,
    }
  }, [plotData, selectedGlaze, proximityRadius, proximityCenterId, proximityWeights])

  // Report proximity stats to parent
  useEffect(() => {
    if (proximityRadius != null && proximityCenter) {
      onProximityStats?.({ visible: visibleData.length, total: plotData.length, nearby })
    } else {
      onProximityStats?.(null)
    }
  }, [visibleData.length, plotData.length, proximityRadius, proximityCenter, nearby, onProximityStats])

  // ─── Stable color range from full dataset ─────────────────────
  // Prevents color scale from shifting when proximity filter changes the visible subset

  const colorRange = useMemo(() => {
    if (colorBy === 'cone' || colorBy === 'glaze_type') return null
    let min = Infinity, max = -Infinity
    for (const p of plotData) {
      let v: number
      switch (colorBy) {
        case 'z_axis': v = p.z; break
        case 'surface': v = surfaceToNum(p.surfaceType); break
        case 'source': v = sourceToNum(p.source); break
        case 'flux_ratio': v = p.fluxRatio; break
        case 'confidence': v = confToNum(p.confidence); break
        case 'boron': v = p.boron; break
        default: v = 0
      }
      if (isFinite(v)) {
        if (v < min) min = v
        if (v > max) max = v
      }
    }
    if (min === Infinity) return null
    return { min, max: max === min ? min + 1 : max }
  }, [plotData, colorBy])

  // ─── Color values ─────────────────────────────────────────────

  const colorValues = useMemo(() => {
    if (colorBy === 'glaze_type') {
      return visibleData.map(p => glazeTypeColor(p.glazeTypeId))
    }
    return visibleData.map(p => {
      switch (colorBy) {
        case 'z_axis': return p.z
        case 'cone': return p.cone ?? 6
        case 'surface': return surfaceToNum(p.surfaceType)
        case 'source': return sourceToNum(p.source)
        case 'flux_ratio': return p.fluxRatio
        case 'confidence': return confToNum(p.confidence)
        case 'boron': return p.boron
        default: return 0
      }
    })
  },
  [visibleData, colorBy])

  // ─── Z range and floor ────────────────────────────────────────

  const zRange = useMemo(() => {
    let min = Infinity, max = -Infinity
    for (const p of plotData) {
      const z = p.z
      if (isFinite(z) && !isNaN(z)) {
        if (z < min) min = z
        if (z > max) max = z
      }
    }
    if (min === Infinity) return { min: 0, max: 1 }
    return { min, max: max === min ? min + 1 : max }
  }, [plotData])

  const zFloor = zRange.min - (zRange.max - zRange.min) * 0.05

  // ─── Fitted surface ──────────────────────────────────────────

  const surfaceGrid = useMemo((): SurfaceGrid | null => {
    if (!showSurface || plotData.length < 10) return null
    return fitSurface(
      plotData.map(p => ({ x: p.x, y: p.y, z: p.z })),
      {
        xRange: [0.5, 7.2],
        yRange: [0, 1.0],
        resolution: 40,
      },
    )
  }, [plotData, showSurface])

  // Notify parent when surface grid changes (for 3D export)
  useEffect(() => {
    onSurfaceGridReady?.(surfaceGrid, plotData.map((p: any) => ({ x: p.x, y: p.y, z: p.z, name: p.name ?? '' })))
  }, [surfaceGrid, plotData, onSurfaceGridReady])

  // ─── Surface type prediction heatmap ──────────────────────────

  const predictionGrid = useMemo((): SurfaceClassifyGrid | null => {
    if (!showPrediction || plotData.length < 10) return null

    // Use ALL plotData for prediction (not just visible/proximity-filtered)
    const points = plotData
      .filter(p => p.surfaceType && p.surfaceType !== 'unknown')
      .map(p => ({ x: p.x, y: p.y, surfaceType: p.surfaceType }))

    if (points.length < 5) return null

    return classifySurface(points, {
      xRange: [0.5, 7.2],
      yRange: [0.0, 1.0],
      resolution: 30,
    })
  }, [plotData, showPrediction])

  // Build mesh3d trace for prediction heatmap on the floor plane
  const predictionTrace = useMemo((): PlotData | null => {
    if (!predictionGrid) return null

    const { xCoords, yCoords, cells } = predictionGrid
    const nx = xCoords.length
    const ny = yCoords.length

    // Build a triangle mesh: each grid cell becomes 2 triangles
    // Vertices: one per grid node
    const vertX: number[] = []
    const vertY: number[] = []
    const vertZ: number[] = []
    // Per-vertex color (facecolor at vertex based on cell prediction)
    const vertIntensity: number[] = []
    // Triangles
    const iArr: number[] = []
    const jArr: number[] = []
    const kArr: number[] = []
    // Face colors
    const faceColors: string[] = []

    // Put vertices on the floor plane, slightly above to avoid z-fighting
    const meshZ = zFloor + (zRange.max - zRange.min) * 0.001

    // Create vertex grid
    for (let yi = 0; yi < ny; yi++) {
      for (let xi = 0; xi < nx; xi++) {
        vertX.push(xCoords[xi])
        vertY.push(yCoords[yi])
        vertZ.push(meshZ)
        const cell = cells[yi]?.[xi]
        vertIntensity.push(cell?.confidence ?? 0)
      }
    }

    // Create triangles — only where both cells are valid
    for (let yi = 0; yi < ny - 1; yi++) {
      for (let xi = 0; xi < nx - 1; xi++) {
        const cell = cells[yi]?.[xi]
        const cellRight = cells[yi]?.[xi + 1]
        const cellUp = cells[yi + 1]?.[xi]
        const cellUpRight = cells[yi + 1]?.[xi + 1]

        // Skip if any corner is invalid
        if (!cell || !cellRight || !cellUp || !cellUpRight) continue

        // Vertex indices
        const bl = yi * nx + xi       // bottom-left
        const br = yi * nx + xi + 1   // bottom-right
        const tl = (yi + 1) * nx + xi     // top-left
        const tr = (yi + 1) * nx + xi + 1 // top-right

        // Use the dominant surface type for the face color
        // Average confidence for alpha
        const avgConf1 = (cell.confidence + cellRight.confidence + cellUp.confidence) / 3
        const avgConf2 = (cellRight.confidence + cellUp.confidence + cellUpRight.confidence) / 3

        // Triangle 1: bl, br, tl
        iArr.push(bl)
        jArr.push(br)
        kArr.push(tl)
        faceColors.push(SURFACE_TYPE_COLORS_RGBA(cell.type, 0.15 + avgConf1 * 0.35))

        // Triangle 2: br, tr, tl
        iArr.push(br)
        jArr.push(tr)
        kArr.push(tl)
        faceColors.push(SURFACE_TYPE_COLORS_RGBA(cellUpRight.type, 0.15 + avgConf2 * 0.35))
      }
    }

    if (iArr.length === 0) return null

    return {
      type: 'mesh3d' as const,
      x: vertX,
      y: vertY,
      z: vertZ,
      i: iArr,
      j: jArr,
      k: kArr,
      facecolor: faceColors,
      opacity: 0.6,
      flatshading: true,
      hoverinfo: 'skip' as const,
      name: 'Surface Prediction',
      showlegend: false,
      lighting: { ambient: 1, diffuse: 0, specular: 0 },
    } as unknown as PlotData
  }, [predictionGrid, zFloor, zRange.max])

  // ─── Main scatter trace ───────────────────────────────────────

  const scatterTrace = useMemo((): PlotData => {
    const isCone = colorBy === 'cone'
    return {
      type: 'scatter3d' as const,
      mode: 'markers' as const,
      x: visibleData.map(p => p.x),
      y: visibleData.map(p => p.y),
      z: visibleData.map(p => p.z),
      customdata: visibleData.map(p => p.id),
      text: visibleData.map(p => p.name),
      marker: {
        size: pointSize,
        opacity: showSurface ? 0.65 : 0.8,
        color: colorValues,
        ...(colorBy === 'glaze_type' ? {} : {
          colorscale: isCone ? CONE_COLORSCALE : (COLOR_SCALES[colorBy] || 'Viridis'),
          reversescale: false,
          cmin: isCone ? -4 : colorRange?.min,
          cmax: isCone ? 10 : colorRange?.max,
          colorbar: {
            title: colorBy === 'z_axis' ? zAxisLabel(zAxis) : getColorBarTitle(colorBy),
            thickness: 15,
            len: 0.5,
            tickvals: isCone ? [-4, -2, 0, 2, 4, 6, 8, 10] : undefined,
            ticktext: isCone ? ['04', '02', '0', '2', '4', '6', '8', '10'] : undefined,
          },
        }),
        line: { width: 0 },
      },
      hoverinfo: 'text' as const,
      hovertemplate: visibleData.map(p => {
        const parts = [
          `<b>${p.name}</b>`,
          `SiO\u2082: ${p.x.toFixed(2)}`,
          `Al\u2082O\u2083: ${p.y.toFixed(2)}`,
          `${zAxisLabel(zAxis)}: ${zAxis === 'cone' ? p.z : p.z.toFixed(3)}`,
        ]
        if (p.cone != null) parts.push(`Cone: ${p.cone}`)
        if (p.surfaceType && p.surfaceType !== 'unknown') parts.push(`Surface: ${p.surfaceType}`)
        if (p.source && p.source !== 'unknown') parts.push(`Source: ${p.source}`)
        return parts.join('<br>') + '<extra></extra>'
      }),
      name: 'Glazes',
      showlegend: false,
    }
  }, [visibleData, colorValues, colorBy, colorRange, zAxis, showSurface, pointSize])

  // ─── Selected glaze highlight ─────────────────────────────────

  const selectedTrace = useMemo((): PlotData | null => {
    if (!selectedGlaze) return null
    const match = visibleData.find(p => p.id === selectedGlaze.id)
    if (!match) return null

    return {
      type: 'scatter3d' as const,
      mode: 'markers' as const,
      x: [match.x],
      y: [match.y],
      z: [match.z],
      text: [match.name],
      marker: {
        size: 10,
        symbol: 'circle',
        color: 'rgba(255, 255, 255, 0.9)',
        line: { width: 3, color: '#facc15' },
      },
      hoverinfo: 'text' as const,
      hovertemplate: '<b>%{text}</b> (selected)<extra></extra>',
      name: 'Selected',
      showlegend: false,
    }
  }, [selectedGlaze, visibleData])

  // ─── Selected glaze drop line ─────────────────────────────────

  const selectedDropLine = useMemo((): PlotData | null => {
    if (!selectedGlaze) return null
    const match = visibleData.find(p => p.id === selectedGlaze.id)
    if (!match) return null

    return {
      type: 'scatter3d' as const,
      mode: 'lines' as const,
      x: [match.x, match.x],
      y: [match.y, match.y],
      z: [match.z, zFloor],
      line: { color: 'rgba(250, 204, 21, 0.6)', width: 2, dash: 'dot' },
      hoverinfo: 'skip' as const,
      showlegend: false,
      name: 'selected-drop',
    }
  }, [selectedGlaze, visibleData, zFloor])

  // ─── Blend overlay ────────────────────────────────────────────

  const blendTrace = useMemo((): PlotData | null => {
    if (blendResults.length === 0) return null

    const xs = blendResults.map(p => getOxideValue(p.umf, 'SiO2'))
    const ys = blendResults.map(p => getOxideValue(p.umf, 'Al2O3'))
    const zs = blendResults.map(p => {
      switch (zAxis) {
        case 'cone': return 6
        case 'flux_ratio': {
          const r2o = (p.umf.Na2O?.value ?? 0) + (p.umf.K2O?.value ?? 0) + (p.umf.Li2O?.value ?? 0)
          const ro = (p.umf.CaO?.value ?? 0) + (p.umf.MgO?.value ?? 0) + (p.umf.ZnO?.value ?? 0) +
                     (p.umf.BaO?.value ?? 0) + (p.umf.SrO?.value ?? 0)
          return (r2o + ro) > 0 ? r2o / (r2o + ro) : 0
        }
        case 'SiO2_Al2O3_ratio': {
          const si = getOxideValue(p.umf, 'SiO2')
          const al = getOxideValue(p.umf, 'Al2O3')
          return al > 0 ? si / al : 0
        }
        default:
          return getOxideValue(p.umf, zAxis as OxideSymbol)
      }
    })
    const labels = blendResults.map((p, i) => p.recipe?.name || `Blend ${i + 1}`)

    return {
      type: 'scatter3d' as const,
      mode: 'markers' as const,
      x: xs, y: ys, z: zs,
      text: labels,
      marker: {
        size: 6,
        symbol: 'diamond',
        color: '#ff9800',
        opacity: 0.9,
        line: { width: 1, color: '#fff' },
      },
      hoverinfo: 'text' as const,
      hovertemplate:
        '<b>%{text}</b><br>' +
        'SiO\u2082: %{x:.2f}<br>' +
        'Al\u2082O\u2083: %{y:.2f}<br>' +
        `${zAxisLabel(zAxis)}: %{z:.3f}<br>` +
        '<extra>Blend</extra>',
      name: 'Blend Results',
      showlegend: false,
    }
  }, [blendResults, zAxis])

  // ─── Cluster highlight ────────────────────────────────────────

  const highlightTrace = useMemo((): PlotData | null => {
    if (!highlightPointIds || highlightPointIds.length === 0) return null
    const highlighted = visibleData.filter(p => highlightPointIds.includes(p.id))
    if (highlighted.length === 0) return null

    return {
      type: 'scatter3d' as const,
      mode: 'markers' as const,
      x: highlighted.map(p => p.x),
      y: highlighted.map(p => p.y),
      z: highlighted.map(p => p.z),
      text: highlighted.map(p => p.name),
      marker: {
        size: 7,
        symbol: 'circle',
        color: 'rgba(255, 235, 59, 0.85)',
        line: { width: 2, color: '#fff' },
      },
      hoverinfo: 'text' as const,
      hovertemplate:
        '<b>%{text}</b><br>' +
        'SiO\u2082: %{x:.2f}<br>' +
        'Al\u2082O\u2083: %{y:.2f}<br>' +
        `${zAxisLabel(zAxis)}: %{z:.3f}<br>` +
        '<extra>Cluster</extra>',
      name: 'Highlighted',
      showlegend: false,
    }
  }, [highlightPointIds, visibleData, zAxis])

  // ─── Void highlight sphere ────────────────────────────────────

  const voidTrace = useMemo((): PlotData | null => {
    if (!highlightCircle) return null
    return buildHighlightSphere(
      highlightCircle,
      highlightCircle.r,
      zFloor,
      zRange.max,
    )
  }, [highlightCircle, zFloor, zRange.max])

  // ─── Smart drop lines ────────────────────────────────────────

  const dropLines = useMemo((): PlotData | null => {
    if (visibleData.length > 300) return null

    const xs: (number | null)[] = []
    const ys: (number | null)[] = []
    const zs: (number | null)[] = []

    for (const p of visibleData) {
      xs.push(p.x, p.x, null)
      ys.push(p.y, p.y, null)
      zs.push(p.z, zFloor, null)
    }

    return {
      type: 'scatter3d' as const,
      mode: 'lines' as const,
      x: xs, y: ys, z: zs,
      line: { color: 'rgba(255,255,255,0.04)', width: 1 },
      hoverinfo: 'skip' as const,
      showlegend: false,
      name: 'droplines',
    }
  }, [visibleData, zFloor])

  // ─── Floor region traces ──────────────────────────────────────

  const regionTraces = useMemo(() => buildStullRegionTraces(zFloor), [zFloor])
  const tempContours = useMemo(() => buildTempContourTraces(zFloor, isDark), [zFloor, isDark])
  const qLineTrace = useMemo(() => buildQLineTrace(zFloor), [zFloor])

  // ─── Region labels ────────────────────────────────────────────

  const regionLabels = useMemo((): PlotData => ({
    type: 'scatter3d' as const,
    mode: 'text' as const,
    x: [1.5, 2.3, 3.4, 4.5, 5.0, 1.2],
    y: [0.75, 0.55, 0.65, 0.25, 0.1, 0.08],
    z: Array(6).fill(zFloor),
    text: ['UNFUSED', 'MATTE', 'SEMI-MATTE', 'BRIGHT GLOSS', 'UNDERFIRED', 'CRAZED'],
    textfont: { color: plotColors.regionLabel, size: 10 },
    hoverinfo: 'skip' as const,
    showlegend: false,
    name: 'labels',
  }), [zFloor, plotColors])

  // ─── Proximity sphere wireframe ─────────────────────────────

  const proximitySphereTrace = useMemo((): PlotData | null => {
    if (!proximityCenter || !axisRanges || proximityRadius == null) return null

    const N = 24 // meridians / parallels
    const cx = proximityCenter.x
    const cy = proximityCenter.y
    const cz = proximityCenter.z
    const rx = proximityRadius * axisRanges.x
    const ry = proximityRadius * axisRanges.y
    const rz = proximityRadius * axisRanges.z

    const xs: (number | null)[] = []
    const ys: (number | null)[] = []
    const zs: (number | null)[] = []

    // Latitude rings (horizontal circles)
    for (let i = 0; i <= N; i += 3) {
      const phi = (Math.PI * i) / N - Math.PI / 2
      const cosPhi = Math.cos(phi)
      const sinPhi = Math.sin(phi)
      for (let j = 0; j <= N; j++) {
        const theta = (2 * Math.PI * j) / N
        xs.push(cx + rx * cosPhi * Math.cos(theta))
        ys.push(cy + ry * cosPhi * Math.sin(theta))
        zs.push(cz + rz * sinPhi)
      }
      xs.push(null); ys.push(null); zs.push(null) // break line
    }

    // Longitude rings (vertical circles)
    for (let j = 0; j < N; j += 3) {
      const theta = (2 * Math.PI * j) / N
      const cosTheta = Math.cos(theta)
      const sinTheta = Math.sin(theta)
      for (let i = 0; i <= N; i++) {
        const phi = (Math.PI * i) / N - Math.PI / 2
        xs.push(cx + rx * Math.cos(phi) * cosTheta)
        ys.push(cy + ry * Math.cos(phi) * sinTheta)
        zs.push(cz + rz * Math.sin(phi))
      }
      xs.push(null); ys.push(null); zs.push(null)
    }

    return {
      type: 'scatter3d',
      mode: 'lines',
      x: xs,
      y: ys,
      z: zs,
      line: { color: 'rgba(255,165,0,0.35)', width: 1.5 },
      hoverinfo: 'skip',
      showlegend: false,
      name: 'proximity-sphere',
      connectgaps: false,
    } as unknown as PlotData
  }, [proximityCenter, axisRanges, proximityRadius])

  // ─── Assemble all traces ──────────────────────────────────────

  const traces = useMemo(() => {
    const t: PlotData[] = [
      ...regionTraces,
      ...tempContours,
      qLineTrace,
      regionLabels,
    ]

    if (dropLines) t.push(dropLines)

    // Surface prediction heatmap (floor overlay)
    if (predictionTrace) t.push(predictionTrace)

    if (surfaceGrid && showSurface) {
      const proximityActive = proximityRadius != null && visibleData.length < plotData.length
      t.push(buildSurfaceTrace(
        surfaceGrid, zAxis,
        proximityActive ? Math.min(surfaceOpacity, 0.15) : surfaceOpacity,
        isDark, lightPosition,
      ))
    }

    t.push(scatterTrace)

    if (highlightTrace) t.push(highlightTrace)
    if (voidTrace) t.push(voidTrace)
    if (blendTrace) t.push(blendTrace)
    if (selectedTrace) t.push(selectedTrace)
    if (selectedDropLine) t.push(selectedDropLine)
    if (proximitySphereTrace) t.push(proximitySphereTrace)

    // Distance lines from center to top neighbors
    if (proximityCenter && nearby.length > 0) {
      const topN = nearby.slice(0, 8) // lines to 8 nearest
      const lineXs: (number | null)[] = []
      const lineYs: (number | null)[] = []
      const lineZs: (number | null)[] = []
      for (const n of topN) {
        lineXs.push(proximityCenter.x, n.x, null)
        lineYs.push(proximityCenter.y, n.y, null)
        lineZs.push(proximityCenter.z, n.z, null)
      }
      t.push({
        type: 'scatter3d',
        mode: 'lines',
        x: lineXs, y: lineYs, z: lineZs,
        line: { color: 'rgba(250, 204, 21, 0.25)', width: 1.5, dash: 'dot' },
        hoverinfo: 'skip',
        showlegend: false,
        name: 'proximity-lines',
        connectgaps: false,
      } as unknown as PlotData)
    }

    // Hovered neighbor cross-highlight
    if (hoveredNeighborId) {
      const hovered = visibleData.find(p => p.id === hoveredNeighborId)
      if (hovered) {
        t.push({
          type: 'scatter3d' as const,
          mode: 'markers' as const,
          x: [hovered.x],
          y: [hovered.y],
          z: [hovered.z],
          text: [hovered.name],
          marker: {
            size: 12,
            symbol: 'circle',
            color: 'rgba(250, 204, 21, 0.2)',
            line: { width: 2.5, color: '#facc15' },
          },
          hoverinfo: 'skip' as const,
          showlegend: false,
          name: 'hovered-neighbor',
        })
        // Drop line for hovered neighbor
        t.push({
          type: 'scatter3d' as const,
          mode: 'lines' as const,
          x: [hovered.x, hovered.x],
          y: [hovered.y, hovered.y],
          z: [hovered.z, zFloor],
          line: { color: 'rgba(250, 204, 21, 0.4)', width: 1.5, dash: 'dot' as const },
          hoverinfo: 'skip' as const,
          showlegend: false,
          name: 'hovered-drop',
        })
      }
    }

    return t
  }, [
    regionTraces, tempContours, qLineTrace, regionLabels,
    dropLines, surfaceGrid, showSurface, surfaceOpacity, zAxis, isDark, lightPosition,
    predictionTrace,
    scatterTrace, highlightTrace, voidTrace, blendTrace,
    selectedTrace, selectedDropLine, proximitySphereTrace,
    proximityRadius, visibleData.length, plotData.length,
    proximityCenter, nearby, hoveredNeighborId, zFloor,
  ])

  // ─── Layout ───────────────────────────────────────────────────

  // Use user's manually-orbited camera if available, otherwise preset
  const presetCamera = CAMERA_PRESETS[cameraPreset](zoom)
  const camera = userCameraRef.current ?? presetCamera

  // When cameraPreset or zoom changes from the UI, reset user camera
  useEffect(() => {
    userCameraRef.current = null
  }, [cameraPreset, zoom])

  // ─── Auto-rotate turntable ────────────────────────────────────

  useEffect(() => {
    if (!autoRotate) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      return
    }

    let lastTime = performance.now()

    const tick = (now: number) => {
      const el = plotRef.current?.el
      const Plotly = plotlyRef.current

      // Poll until Plotly DOM is ready (handles toggling rotate before load)
      if (!el || !Plotly) {
        lastTime = now // keep timer current to avoid angle jump when ready
        animFrameRef.current = requestAnimationFrame(tick)
        return
      }

      const dt = (now - lastTime) / 1000
      lastTime = now
      rotationAngleRef.current += autoRotateSpeed * dt * 0.5

      const angle = rotationAngleRef.current
      const radius = 2.5 / zoom
      const eye = {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: 1.2 / zoom,
      }

      try {
        Plotly.relayout(el, {
          'scene.camera.eye': eye,
          'scene.camera.up': { x: 0, y: 0, z: 1 },
        })
      } catch { /* element detached or not ready */ }

      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
    }
  }, [autoRotate, autoRotateSpeed, zoom])

  // Stop auto-rotate when user manually orbits
  const handleRelayoutWrapped = useCallback((update: any) => {
    const cam = update?.['scene.camera']
    if (cam && !autoRotate) {
      userCameraRef.current = cam
    }
    // If user manually drags while auto-rotating, capture the angle
    if (cam?.eye && autoRotate) {
      rotationAngleRef.current = Math.atan2(cam.eye.y, cam.eye.x)
    }
  }, [autoRotate])

  // Perspective projection config (Plotly uses "projection" inside camera)
  const cameraWithProjection = useMemo(() => ({
    ...camera,
    projection: {
      type: perspective > 0.01 ? 'perspective' as const : 'orthographic' as const,
    },
  }), [camera, perspective])

  const layout = useMemo(() => ({
    scene: {
      xaxis: {
        title: { text: 'SiO\u2082', font: { color: plotColors.axisTitle } },
        range: [0.5, 7.2],
        gridcolor: plotColors.grid,
        zerolinecolor: plotColors.zeroline,
        tickfont: { color: plotColors.tick },
        backgroundcolor: plotColors.axisbg,
      },
      yaxis: {
        title: { text: 'Al\u2082O\u2083', font: { color: plotColors.axisTitle } },
        range: [0, 1.0],
        gridcolor: plotColors.grid,
        zerolinecolor: plotColors.zeroline,
        tickfont: { color: plotColors.tick },
        backgroundcolor: plotColors.axisbg,
      },
      zaxis: {
        title: { text: zAxisLabel(zAxis), font: { color: plotColors.axisTitle } },
        gridcolor: plotColors.grid,
        zerolinecolor: plotColors.zeroline,
        tickfont: { color: plotColors.tick },
        backgroundcolor: plotColors.axisbg,
      },
      bgcolor: plotColors.bg,
      camera: cameraWithProjection,
      aspectmode: 'manual' as const,
      aspectratio: { x: 2, y: 1, z: zStretch },
    },
    paper_bgcolor: plotColors.paper,
    font: { color: plotColors.font },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    hovermode: 'closest' as const,
    showlegend: false,
    uirevision: 'stull3d',
  }), [zAxis, plotColors, cameraWithProjection, zStretch])

  // ─── Event handlers ───────────────────────────────────────────

  // Capture user's manual camera changes — handled in handleRelayoutWrapped above

  const handleClick = useCallback((event: any) => {
    const point = event.points?.[0]
    // Only select from scatter traces (not surface/mesh/region traces)
    if (point?.customdata && point?.data?.type === 'scatter3d' && point?.data?.mode === 'markers') {
      const glaze = useGlazeStore.getState().glazes.get(point.customdata)
      if (glaze) setSelectedGlaze(glaze)
    }
  }, [setSelectedGlaze])

  const handleHover = useCallback((event: any) => {
    const point = event.points?.[0]
    if (point?.customdata && point?.data?.type === 'scatter3d' && point?.data?.mode === 'markers') {
      const glaze = useGlazeStore.getState().glazes.get(point.customdata)
      if (glaze) {
        const coneVal = glaze.coneRange?.[0]
        setHoveredPoint({
          id: point.customdata,
          name: glaze.name,
          source: glaze.source ?? 'unknown',
          x: point.x,
          y: point.y,
          cone: typeof coneVal === 'number' ? coneVal : null,
          surfaceType: glaze.surfaceType ?? 'unknown',
          fluxRatio: glaze.umf?._meta?.R2O_RO_ratio ?? 0,
          boron: glaze.umf?.B2O3?.value ?? 0,
          confidence: glaze.umfConfidence ?? 'inferred',
          glazeTypeId: glaze.glazeTypeId ?? null
        })
      }
    }
  }, [setHoveredPoint])

  const config = useMemo(() => ({
    displayModeBar: true,
    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'toImage'] as any[],
    scrollZoom: true,
    displaylogo: false,
  }), [])

  // ─── Loading state ────────────────────────────────────────────

  if (!PlotComponent) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 8,
        width: width || '100%', height: height || '100%',
        color: '#777', fontSize: 13,
        background: 'var(--bg-secondary, #1a1a1a)',
        borderRadius: 8,
        ...(!plotError ? { animation: 'pulse 1.5s ease-in-out infinite' } : {}),
      }}>
        <style>{`@keyframes pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }`}</style>
        {plotError ? (
          <>
            <span style={{ fontSize: 22 }}>⚠</span>
            <span>3D engine failed to load</span>
            <button
              onClick={() => setRetryCount(c => c + 1)}
              style={{
                marginTop: 4, padding: '6px 16px', borderRadius: 6,
                border: '1px solid #555', background: 'var(--bg-tertiary, #252525)',
                color: '#ccc', cursor: 'pointer', fontSize: 13,
              }}
            >
              Tap to retry
            </button>
          </>
        ) : (
          <>
            <span>Loading 3D engine…</span>
            {loadSlow && <span style={{ fontSize: 11, color: '#666' }}>Slow connection — still trying…</span>}
          </>
        )}
      </div>
    )
  }

  return (
    <PlotComponent
      ref={plotRef}
      data={traces as any}
      layout={layout as any}
      config={config}
      onClick={handleClick}
      onHover={handleHover}
      onRelayout={handleRelayoutWrapped}
      useResizeHandler
      style={{ width: width || '100%', height: height || '100%' }}
    />
  )
}

// ─── Helpers ────────────────────────────────────────────────────

function surfaceToNum(s: SurfaceType): number {
  return ({ matte: 1, satin: 2, gloss: 3, crystalline: 4, crawl: 5, unknown: 0 })[s] ?? 0
}
function sourceToNum(s: string): number {
  return ({ glazy: 1, digitalfire: 2, user: 3, calculated: 4 })[s] ?? 0
}
function confToNum(c: EpistemicState): number {
  return ({ unknown: 0, assumed: 1, inferred: 2, declared: 3, verified: 4 })[c] ?? 0
}
function getColorBarTitle(c: string): string {
  return ({ cone: 'Cone', surface: 'Surface', source: 'Source', flux_ratio: 'R\u2082O:RO', confidence: 'Confidence', boron: 'B\u2082O\u2083' })[c] || c
}
export function zAxisLabel(z: ZAxisOption): string {
  const labels: Record<ZAxisOption, string> = {
    B2O3: 'B\u2082O\u2083',
    CaO: 'CaO',
    MgO: 'MgO',
    Na2O: 'Na\u2082O',
    K2O: 'K\u2082O',
    ZnO: 'ZnO',
    BaO: 'BaO',
    Fe2O3: 'Fe\u2082O\u2083',
    cone: 'Cone',
    flux_ratio: 'R\u2082O:RO',
    SiO2_Al2O3_ratio: 'SiO\u2082:Al\u2082O\u2083',
  }
  return labels[z] || z
}

export default StullPlot3D
