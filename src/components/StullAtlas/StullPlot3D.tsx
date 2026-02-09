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
import { glazeTypeColor, glazeTypeName } from '@/domain/glaze/glazeTypes'
import { useFilteredPoints } from '@/hooks/useFilteredPoints'

// ─── Public types ──────────────────────────────────────────────

export type ZAxisOption =
  | 'B2O3' | 'CaO' | 'MgO' | 'Na2O' | 'K2O' | 'ZnO' | 'BaO' | 'Fe2O3'
  | 'cone' | 'flux_ratio' | 'SiO2_Al2O3_ratio'

export type CameraPreset = 'default' | 'top' | 'side-x' | 'side-y'

type ColorByOption = 'cone' | 'surface' | 'source' | 'flux_ratio' | 'confidence' | 'boron' | 'z_axis' | 'glaze_type'

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
    lighting: {
      ambient: 0.8,
      diffuse: 0.3,
      specular: 0.15,
      roughness: 0.6,
    },
    lightposition: { x: 0, y: 0, z: 10000 },
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
  cameraPreset = 'default',
}: StullPlot3DProps) {
  const [PlotComponent, setPlotComponent] = useState<PlotComponentType | null>(null)
  const [plotError, setPlotError] = useState(false)
  const [loadSlow, setLoadSlow] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const plotRef = useRef<any>(null)

  useEffect(() => {
    let active = true
    setPlotError(false)
    setLoadSlow(false)
    const slowTimer = setTimeout(() => { if (active) setLoadSlow(true) }, 12000)
    import('plotly.js-gl3d-dist-min').then((mod) => {
      if (!active) return
      clearTimeout(slowTimer)
      const Plot = createPlotlyComponent((mod as any).default ?? mod)
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
    })
  }, [filteredPoints, glazes, zAxis])

  // ─── Color values ─────────────────────────────────────────────

  const colorValues = useMemo(() => {
    if (colorBy === 'glaze_type') {
      return plotData.map(p => glazeTypeColor(p.glazeTypeId))
    }
    return plotData.map(p => {
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
  [plotData, colorBy])

  // ─── Z range and floor ────────────────────────────────────────

  const zRange = useMemo(() => {
    const zs = plotData.map(p => p.z).filter(z => isFinite(z) && !isNaN(z))
    if (zs.length === 0) return { min: 0, max: 1 }
    const min = Math.min(...zs)
    const max = Math.max(...zs)
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

  // ─── Main scatter trace ───────────────────────────────────────

  const scatterTrace = useMemo((): PlotData => {
    const isCone = colorBy === 'cone'
    return {
      type: 'scatter3d' as const,
      mode: 'markers' as const,
      x: plotData.map(p => p.x),
      y: plotData.map(p => p.y),
      z: plotData.map(p => p.z),
      customdata: plotData.map(p => p.id),
      text: plotData.map(p => p.name),
      marker: {
        size: 2.5,
        opacity: showSurface ? 0.65 : 0.8,
        color: colorValues,
        ...(colorBy === 'glaze_type' ? {} : {
          colorscale: isCone ? CONE_COLORSCALE : (COLOR_SCALES[colorBy] || 'Viridis'),
          reversescale: false,
          cmin: isCone ? -4 : undefined,
          cmax: isCone ? 10 : undefined,
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
      hovertemplate:
        '<b>%{text}</b><br>' +
        'SiO\u2082: %{x:.2f}<br>' +
        'Al\u2082O\u2083: %{y:.2f}<br>' +
        `${zAxisLabel(zAxis)}: %{z:.3f}<br>` +
        '<extra></extra>',
      name: 'Glazes',
      showlegend: false,
    }
  }, [plotData, colorValues, colorBy, zAxis, showSurface])

  // ─── Selected glaze highlight ─────────────────────────────────

  const selectedTrace = useMemo((): PlotData | null => {
    if (!selectedGlaze) return null
    const match = plotData.find(p => p.id === selectedGlaze.id)
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
  }, [selectedGlaze, plotData])

  // ─── Selected glaze drop line ─────────────────────────────────

  const selectedDropLine = useMemo((): PlotData | null => {
    if (!selectedGlaze) return null
    const match = plotData.find(p => p.id === selectedGlaze.id)
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
  }, [selectedGlaze, plotData, zFloor])

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
    const highlighted = plotData.filter(p => highlightPointIds.includes(p.id))
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
  }, [highlightPointIds, plotData, zAxis])

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
    if (plotData.length > 300) return null

    const xs: (number | null)[] = []
    const ys: (number | null)[] = []
    const zs: (number | null)[] = []

    for (const p of plotData) {
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
  }, [plotData, zFloor])

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

  // ─── Assemble all traces ──────────────────────────────────────

  const traces = useMemo(() => {
    const t: PlotData[] = [
      ...regionTraces,
      ...tempContours,
      qLineTrace,
      regionLabels,
    ]

    if (dropLines) t.push(dropLines)

    if (surfaceGrid && showSurface) {
      t.push(buildSurfaceTrace(surfaceGrid, zAxis, surfaceOpacity, isDark))
    }

    t.push(scatterTrace)

    if (highlightTrace) t.push(highlightTrace)
    if (voidTrace) t.push(voidTrace)
    if (blendTrace) t.push(blendTrace)
    if (selectedTrace) t.push(selectedTrace)
    if (selectedDropLine) t.push(selectedDropLine)

    return t
  }, [
    regionTraces, tempContours, qLineTrace, regionLabels,
    dropLines, surfaceGrid, showSurface, surfaceOpacity, zAxis, isDark,
    scatterTrace, highlightTrace, voidTrace, blendTrace,
    selectedTrace, selectedDropLine,
  ])

  // ─── Layout ───────────────────────────────────────────────────

  const camera = CAMERA_PRESETS[cameraPreset](zoom)

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
      camera,
      aspectmode: 'manual' as const,
      aspectratio: { x: 2, y: 1, z: 0.8 },
    },
    paper_bgcolor: plotColors.paper,
    font: { color: plotColors.font },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    hovermode: 'closest' as const,
    showlegend: false,
  }), [zAxis, plotColors, camera])

  // ─── Event handlers ───────────────────────────────────────────

  const handleClick = useCallback((event: any) => {
    const point = event.points?.[0]
    if (point?.customdata) {
      const glaze = useGlazeStore.getState().glazes.get(point.customdata)
      if (glaze) setSelectedGlaze(glaze)
    }
  }, [setSelectedGlaze])

  const handleHover = useCallback((event: any) => {
    const point = event.points?.[0]
    if (point?.customdata) {
      setHoveredPoint({
        id: point.customdata,
        name: point.text,
        source: 'unknown',
        x: point.x,
        y: point.y,
        cone: null,
        surfaceType: 'unknown',
        fluxRatio: 0,
        boron: 0,
        confidence: 'inferred',
        glazeTypeId: null
      })
    }
  }, [setHoveredPoint])

  const config = {
    displayModeBar: true,
    modeBarButtonsToRemove: ['select2d', 'lasso2d'] as any[],
    scrollZoom: true,
  }

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
