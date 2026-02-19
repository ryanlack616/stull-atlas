/**
 * Stull Plot Component
 * 
 * Main visualization using Plotly WebGL scattergl
 */

import React, { useMemo, useCallback, useEffect, useState } from 'react'
import createPlotlyComponent from 'react-plotly.js/factory'
import { useGlazeStore, useSelectionStore, useRecipeStore, useThemeStore, useMolarWeightStore } from '@/stores'
import { OxideSymbol, GlazePlotPoint, SurfaceType, EpistemicState } from '@/types'
import { getOxideValue } from '@/calculator/umf'
import { roundTo } from '@/calculator'
import { CONE_LIMITS, interpolateLimits, ConeLimits } from '@/calculator/validation'
import { formatCone, CONE_TICK_VALS, CONE_TICK_TEXT } from '@/calculator/parseCone'
import { glazeTypeColor, glazeTypeName } from '@/domain/glaze'
import { useFilteredPoints } from '@/hooks'
import { features } from '@/featureFlags'

interface StullPlotProps {
  xAxis?: OxideSymbol
  yAxis?: OxideSymbol
  colorBy?: 'cone' | 'surface' | 'source' | 'flux_ratio' | 'confidence' | 'boron' | 'z_axis' | 'glaze_type'
  zoom?: number
  width?: number
  height?: number
  highlightPointIds?: string[]
  highlightCircle?: { x: number; y: number; r: number } | null
  densityMap?: { grid: number[][]; bounds: { xMin: number; xMax: number; yMin: number; yMax: number }; resolution: number; maxDensity: number } | null
  /** Show limit formula overlays */
  showLimits?: boolean
  /** If set, highlight this specific cone's limits prominently */
  limitCone?: string | null
}

type PlotComponentType = React.ComponentType<any>

// Color scales for different properties
const COLOR_SCALES: Record<string, string> = {
  surface: 'Viridis',
  source: 'Set1',
  flux_ratio: 'Portland',
  confidence: 'Greys',
  boron: 'YlOrRd'
}

// Discrete cone colorscale — one distinct color per cone value
// Range: -6 (cone 06) to 13, total span = 19, boundaries at half-integers
const CONE_COLORSCALE: [number, string][] = [
  [0,        '#818cf8'], [0.5 / 19, '#818cf8'],   // Cone 06 — light indigo
  [0.5 / 19, '#6366f1'], [1.5 / 19, '#6366f1'],   // Cone 05 — indigo
  [1.5 / 19, '#3b82f6'], [2.5 / 19, '#3b82f6'],   // Cone 04 — blue
  [2.5 / 19, '#06b6d4'], [3.5 / 19, '#06b6d4'],   // Cone 03 — cyan
  [3.5 / 19, '#14b8a6'], [4.5 / 19, '#14b8a6'],   // Cone 02 — teal
  [4.5 / 19, '#10b981'], [5.5 / 19, '#10b981'],   // Cone 01 — emerald
  [5.5 / 19, '#22c55e'], [6.5 / 19, '#22c55e'],   // Cone 0  — green
  [6.5 / 19, '#84cc16'], [7.5 / 19, '#84cc16'],   // Cone 1  — lime-green
  [7.5 / 19, '#a3e635'], [8.5 / 19, '#a3e635'],   // Cone 2  — lime
  [8.5 / 19, '#d9f99d'], [9.5 / 19, '#d9f99d'],   // Cone 3  — pale lime
  [9.5 / 19, '#facc15'], [10.5 / 19, '#facc15'],  // Cone 4  — yellow
  [10.5 / 19, '#f59e0b'], [11.5 / 19, '#f59e0b'],  // Cone 5  — amber
  [11.5 / 19, '#f97316'], [12.5 / 19, '#f97316'],  // Cone 6  — orange
  [12.5 / 19, '#ef4444'], [13.5 / 19, '#ef4444'],  // Cone 7  — red
  [13.5 / 19, '#dc2626'], [14.5 / 19, '#dc2626'],  // Cone 8  — crimson
  [14.5 / 19, '#e11d48'], [15.5 / 19, '#e11d48'],  // Cone 9  — rose
  [15.5 / 19, '#a855f7'], [16.5 / 19, '#a855f7'],  // Cone 10 — purple
  [16.5 / 19, '#7c3aed'], [17.5 / 19, '#7c3aed'],  // Cone 11 — violet
  [17.5 / 19, '#6d28d9'], [18.5 / 19, '#6d28d9'],  // Cone 12 — deep violet
  [18.5 / 19, '#581c87'], [1,        '#581c87'],   // Cone 13 — dark purple
]

// Stull chart regions — empirical boundaries from Ray Stull (1912)
// Path geometry from derekphilipau/vue-plotly-umf-charts (GPL-3.0)
// X axis = SiO2 (UMF), Y axis = Al2O3 (UMF)
// Range: X [0.5, 7.2], Y [0, 1.0]
const STULL_REGIONS = {
  unfused: {
    path: 'M 0.5,0.39 L 2.8,1.0 L 0.5,1.0 Z',
    color: 'rgba(120, 120, 120, 0.12)',
    label: 'Unfused'
  },
  matte: {
    path: 'M 0.5,0.05 L 0.5,0.39 L 2.8,1.0 L 4.0,1.0 Z',
    color: 'rgba(76, 175, 80, 0.12)',
    label: 'Matte'
  },
  semi_matte: {
    path: 'M 1.2,0.242 L 4.0,1.0 L 5.0,1.0 Z',
    color: 'rgba(139, 195, 74, 0.10)',
    label: 'Semi-Matte'
  },
  bright_gloss: {
    // The region below the Q-line where glazes are smooth and glossy
    path: 'M 0.5,0.0 L 0.5,1.0 L 1.67,1.0 L 2.1,0.5 L 2.38,0.25 L 2.7,0.23 L 3.3,0.25 L 3.9,0.28 L 4.2,0.29 L 5.4,0.49 L 7.2,0.615 L 7.2,0 Z',
    color: 'rgba(33, 150, 243, 0.08)',
    label: 'Bright Gloss'
  },
  underfired: {
    path: 'M 1.75,0.0 L 7.2,0.65 L 7.2,0.0 Z',
    color: 'rgba(158, 158, 158, 0.12)',
    label: 'Underfired'
  },
  crazed: {
    // High Al2O3 relative to SiO2 — glaze doesn't fit the clay body
    path: 'M 0.5,0.0 L 0.5,0.05 L 1.2,0.242 L 1.75,0.0 Z',
    color: 'rgba(244, 67, 54, 0.12)',
    label: 'Crazed'
  }
}

// Stull Q-line — the empirical dividing line between matte and gloss
// Glazes near this line tend to be satin/semi-gloss
const STULL_Q_LINE = {
  path: 'M 1.8,0.2 L 4.2,0.6 L 6.0,0.8 L 7.2,0.92',
  color: 'rgba(255, 255, 255, 0.35)',
  label: 'Q-line'
}

// Temperature contours from Derek Philipau's empirical data
// These show where glazes mature at different temperatures (°C)
// Source: https://github.com/derekphilipau/ceramic-chemistry-visualization
const TEMP_CONTOURS = {
  1280: {
    path: 'M 1.8 0.4 L 1.8 0.85 L 6.6 0.85 L 6.6 0.4 Z',
    color: 'rgba(255, 255, 255, 0.4)',
    label: '1280°C'
  },
  1270: {
    path: 'M 1.8 0.68 L 2.0 0.69 L 2.05 0.8 L 2.12 0.85 L 6.6 0.85 L 6.6 0.455 L 6.35 0.43 L 5.8 0.4 L 1.8 0.4 Z',
    color: 'rgba(255, 255, 204, 0.4)',
    label: '1270°C'
  },
  1260: {
    path: 'M 1.8 0.642 L 2.05 0.66 L 2.18 0.8 L 2.28 0.85 L 5.55 0.85 L 6.1 0.83 L 6.6 0.83 L 6.6 0.483 L 6.2 0.46 L 5.75 0.45 L 5.4 0.422 L 5.05 0.4 L 1.8 0.4 Z',
    color: 'rgba(255, 255, 136, 0.4)',
    label: '1260°C'
  },
  1250: {
    path: 'M 1.8 0.63 L 2.25 0.66 L 2.4 0.76 L 2.35 0.81 L 2.43 0.85 L 4.3 0.85 L 4.6 0.84 L 5.0 0.86 L 5.55 0.82 L 6.1 0.8 L 6.6 0.79 L 6.6 0.58 L 6.2 0.55 L 5.65 0.49 L 5.4 0.48 L 5.05 0.47 L 4.35 0.4 L 1.8 0.4 Z',
    color: 'rgba(255, 255, 34, 0.4)',
    label: '1250°C'
  },
  1240: {
    path: 'M 2.7 0.85 L 2.65 0.8 L 2.71 0.765 L 2.6 0.72 L 2.45 0.655 L 2.0 0.618 L 1.8 0.58 L 1.8 0.4 L 3.55 0.424 L 4.2 0.438 L 4.6 0.475 L 4.9 0.505 L 4.96 0.545 L 5.4 0.572 L 6.0 0.62 L 6.2 0.67 L 6.1 0.72 L 5.55 0.77 L 5.05 0.77 L 4.8 0.79 L 4.42 0.821 L 4.1 0.84 L 3.9 0.85 Z',
    color: 'rgba(255, 221, 0, 0.4)',
    label: '1240°C'
  }
}

export function StullPlot({ 
  xAxis = 'SiO2', 
  yAxis = 'Al2O3',
  colorBy = 'cone',
  zoom = 1,
  width,
  height,
  highlightPointIds,
  highlightCircle,
  densityMap,
  showLimits = false,
  limitCone = null,
}: StullPlotProps) {

  const [PlotComponent, setPlotComponent] = useState<PlotComponentType | null>(null)
  const [plotError, setPlotError] = useState(false)
  const [loadSlow, setLoadSlow] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let active = true
    setPlotError(false)
    setLoadSlow(false)
    const slowTimer = setTimeout(() => { if (active) setLoadSlow(true) }, 12000)
    import('plotly.js-gl2d-dist-min').then((mod) => {
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
  const selectedGlaze = useSelectionStore(s => s.selectedGlaze)
  const setSelectedGlaze = useSelectionStore(s => s.setSelectedGlaze)
  const setHoveredPoint = useSelectionStore(s => s.setHoveredPoint)
  const selectedForBlend = useSelectionStore(s => s.selectedForBlend)
  const addToBlendSelection = useSelectionStore(s => s.addToBlendSelection)
  const setSidebarTab = useSelectionStore(s => s.setSidebarTab)
  const blendResults = useRecipeStore(s => s.blendResults)
  const theme = useThemeStore(s => s.theme)
  
  // Theme-dependent Plotly colors (CSS vars don't work in Plotly JS objects)
  const plotColors = useMemo(() => {
    const isDark = theme === 'dark'
    return {
      paper: isDark ? '#1a1a1a' : '#ffffff',
      plot: isDark ? '#1e1e1e' : '#f8f8f8',
      grid: isDark ? '#333' : '#ddd',
      zeroline: isDark ? '#444' : '#ccc',
      axisTitle: isDark ? '#aaa' : '#555',
      tick: isDark ? '#888' : '#666',
      font: isDark ? '#ccc' : '#333',
      regionLabel: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)',
      regionLabelStrong: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.22)',
      qLabel: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)',
      tempLabel: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
      coneBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
      limitFill: isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)',
      limitBorder: isDark ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.4)',
      limitLabel: isDark ? 'rgba(59,130,246,0.7)' : 'rgba(59,130,246,0.6)',
      limitDimBorder: isDark ? 'rgba(150,150,150,0.15)' : 'rgba(100,100,100,0.12)',
    }
  }, [theme])

  // Build limit formula overlay shapes + annotations
  const limitOverlay = useMemo(() => {
    if (!showLimits) return { shapes: [], annotations: [] }
    
    // Map oxide axis name to ConeLimits key
    const oxideKey = (axis: string): keyof ConeLimits | null => {
      const map: Record<string, keyof ConeLimits> = {
        SiO2: 'SiO2', Al2O3: 'Al2O3', B2O3: 'B2O3',
        Na2O: 'KNaO', K2O: 'KNaO', // Combined alkalis
        CaO: 'CaO', MgO: 'MgO', ZnO: 'ZnO', BaO: 'BaO',
      }
      return map[axis] ?? null
    }
    
    const xKey = oxideKey(xAxis)
    const yKey = oxideKey(yAxis)
    if (!xKey || !yKey) return { shapes: [], annotations: [] }
    
    const shapes: any[] = []
    const annotations: any[] = []
    
    // Determine which cone to highlight
    const highlightCone = limitCone || null
    
    for (const cl of CONE_LIMITS) {
      const xRange = cl[xKey] as { min: number; max: number }
      const yRange = cl[yKey] as { min: number; max: number }
      if (!xRange || !yRange) continue
      
      const isHighlighted = highlightCone === cl.cone
      
      shapes.push({
        type: 'rect' as const,
        x0: xRange.min, x1: xRange.max,
        y0: yRange.min, y1: yRange.max,
        fillcolor: isHighlighted ? plotColors.limitFill : 'transparent',
        line: {
          color: isHighlighted ? plotColors.limitBorder : plotColors.limitDimBorder,
          width: isHighlighted ? 2 : 1,
          dash: isHighlighted ? 'solid' as const : 'dot' as const,
        },
        layer: 'below' as const,
      })
      
      // Label at top-right corner of each rectangle
      annotations.push({
        x: xRange.max,
        y: yRange.max,
        text: `▲${cl.cone}`,
        showarrow: false,
        font: {
          color: isHighlighted ? plotColors.limitBorder : plotColors.limitDimBorder,
          size: isHighlighted ? 11 : 9,
        },
        xanchor: 'right',
        yanchor: 'bottom',
      })
    }
    
    return { shapes, annotations }
  }, [showLimits, limitCone, xAxis, yAxis, plotColors])
  
  // Get plot data
  const rawPlotPoints = useMemo(() => {
    return getPlotPoints(activeWeightSetId)
  }, [getPlotPoints, activeWeightSetId])
  const plotPoints = useFilteredPoints(rawPlotPoints)
  
  // Build blend overlay trace from calculator results
  const blendTrace = useMemo(() => {
    if (blendResults.length === 0) return null
    
    const xs = blendResults.map(p => getOxideValue(p.umf, xAxis))
    const ys = blendResults.map(p => getOxideValue(p.umf, yAxis))
    const labels = blendResults.map((p, i) => p.recipe?.name || `Blend ${i + 1}`)
    
    return {
      type: 'scattergl' as const,
      mode: 'markers' as const,
      x: xs,
      y: ys,
      text: labels,
      name: 'Blend Results',
      marker: {
        size: 8,
        symbol: 'diamond',
        color: '#ff9800',
        opacity: 0.9,
        line: { width: 1, color: '#fff' },
      },
      hoverinfo: 'text' as const,
      hovertemplate: `<b>%{text}</b><br>${xAxis}: %{x:.2f}<br>${yAxis}: %{y:.2f}<extra>Blend</extra>`,
    }
  }, [blendResults, xAxis, yAxis])
  
  // Highlight circle (for void visualization)
  const circleShape = useMemo(() => {
    if (!highlightCircle) return null
    const { x, y, r } = highlightCircle
    return {
      type: 'circle' as const,
      xref: 'x' as const,
      yref: 'y' as const,
      x0: x - r,
      y0: y - r,
      x1: x + r,
      y1: y + r,
      fillcolor: 'rgba(244, 67, 54, 0.08)',
      line: { color: 'rgba(244, 67, 54, 0.5)', width: 2, dash: 'dash' as const },
      layer: 'above' as const,
    }
  }, [highlightCircle])

  // Filter out invalid points — allow full cone range [-6, 13] and null-cone glazes
  const validPoints = useMemo(() => {
    return plotPoints.filter(p => 
      p.x != null && p.y != null && 
      !isNaN(p.x) && !isNaN(p.y) &&
      p.x > 0 && p.y > 0 &&
      (p.cone == null || (p.cone >= -6 && p.cone <= 13))
    )
  }, [plotPoints])

  // Highlight trace for selected cluster or search results
  const highlightTrace = useMemo(() => {
    if (!highlightPointIds || highlightPointIds.length === 0) return null
    const highlighted = validPoints.filter(p => highlightPointIds.includes(p.id))
    if (highlighted.length === 0) return null
    return {
      type: 'scattergl' as const,
      mode: 'markers' as const,
      x: highlighted.map(p => p.x),
      y: highlighted.map(p => p.y),
      text: highlighted.map(p => p.name),
      name: 'Highlighted',
      marker: {
        size: 10,
        symbol: 'circle',
        color: 'rgba(255, 235, 59, 0.8)',
        line: { width: 2, color: '#fff' },
      },
      hoverinfo: 'text' as const,
      hovertemplate: `<b>%{text}</b><br>${xAxis}: %{x:.2f}<br>${yAxis}: %{y:.2f}<extra>Cluster</extra>`,
    }
  }, [highlightPointIds, validPoints, xAxis, yAxis])

  // Density heatmap contour trace
  const densityTrace = useMemo(() => {
    if (!densityMap || densityMap.grid.length === 0) return null
    const { grid, bounds, resolution } = densityMap
    const xVals = Array.from({ length: resolution }, (_, i) =>
      bounds.xMin + (i / (resolution - 1)) * (bounds.xMax - bounds.xMin)
    )
    const yVals = Array.from({ length: grid.length }, (_, j) =>
      bounds.yMin + (j / (grid.length - 1)) * (bounds.yMax - bounds.yMin)
    )
    return {
      type: 'contour' as const,
      x: xVals,
      y: yVals,
      z: grid,
      name: 'Density',
      showscale: false,
      contours: { coloring: 'heatmap' as const },
      colorscale: [
        [0, 'rgba(0,0,0,0)'],
        [0.2, 'rgba(33,150,243,0.08)'],
        [0.4, 'rgba(33,150,243,0.15)'],
        [0.6, 'rgba(255,235,59,0.2)'],
        [0.8, 'rgba(255,152,0,0.25)'],
        [1, 'rgba(244,67,54,0.3)'],
      ] as any,
      hoverinfo: 'skip' as const,
    }
  }, [densityMap])
  
  // Calculate color values
  const colorValues = useMemo(() => {
    if (colorBy === 'glaze_type') {
      // Discrete per-point hex colors from the taxonomy
      return validPoints.map(p => glazeTypeColor(p.glazeTypeId))
    }
    return validPoints.map(p => {
      switch (colorBy) {
        case 'cone':
          return p.cone ?? 6  // default to cone 6
        case 'surface':
          return surfaceTypeToNumber(p.surfaceType)
        case 'source':
          return sourceToNumber(p.source)
        case 'flux_ratio':
          return p.fluxRatio
        case 'confidence':
          return confidenceToNumber(p.confidence)
        case 'boron':
          return p.boron
        default:
          return 0
      }
    })
  }, [validPoints, colorBy])
  
  // Build trace
  const trace = useMemo(() => ({
    type: 'scattergl' as const,
    mode: 'markers' as const,
    x: validPoints.map(p => p.x),
    y: validPoints.map(p => p.y),
    customdata: validPoints.map(p => p.id),
    text: validPoints.map(p => p.name),
    marker: {
      size: 5,
      opacity: 0.7,
      color: colorValues,
      ...(colorBy === 'glaze_type' ? {} : {
        colorscale: colorBy === 'cone' ? CONE_COLORSCALE : (COLOR_SCALES[colorBy] || 'Viridis'),
        reversescale: false,
        cmin: colorBy === 'cone' ? -6 : undefined,
        cmax: colorBy === 'cone' ? 13 : undefined,
        colorbar: {
          title: getColorBarTitle(colorBy),
          thickness: 15,
          len: 0.7,
          tickvals: colorBy === 'cone' ? CONE_TICK_VALS : undefined,
          ticktext: colorBy === 'cone' ? CONE_TICK_TEXT : undefined,
        },
      }),
      line: {
        width: validPoints.map(p => {
          if (selectedGlaze?.id === p.id) return 2
          if (selectedForBlend.some(g => g.id === p.id)) return 1.5
          return 0
        }),
        color: validPoints.map(p => {
          if (selectedGlaze?.id === p.id) return 'white'
          if (selectedForBlend.some(g => g.id === p.id)) return 'orange'
          return 'transparent'
        })
      }
    },
    hoverinfo: 'text' as const,
    hovertemplate: validPoints.map(p => {
      const parts = [
        `<b>${p.name}</b>`,
        `${xAxis}: ${p.x.toFixed(2)}`,
        `${yAxis}: ${p.y.toFixed(2)}`,
        `Cone: ${p.cone != null ? formatCone(p.cone) : 'unknown'}`,
      ]
      if (colorBy === 'glaze_type') parts.push(glazeTypeName(p.glazeTypeId))
      return parts.join('<br>') + '<extra></extra>'
    }),
  }), [validPoints, colorValues, colorBy, xAxis, yAxis, selectedGlaze, selectedForBlend])
  
  // Calculate zoomed axis ranges — Stull chart canonical range
  const xCenter = 3.85   // Center of [0.5, 7.2]
  const yCenter = 0.5    // Center of [0, 1.0]
  const xHalfSpan = 3.35 / zoom  // Half of 6.7 range
  const yHalfSpan = 0.5 / zoom   // Half of 1.0 range
  
  // Layout with Stull regions
  const layout = useMemo(() => ({
    xaxis: {
      title: { text: xAxis, font: { color: plotColors.axisTitle } },
      range: [xCenter - xHalfSpan, xCenter + xHalfSpan],
      gridcolor: plotColors.grid,
      zerolinecolor: plotColors.zeroline,
      tickfont: { color: plotColors.tick }
    },
    yaxis: {
      title: { text: yAxis, font: { color: plotColors.axisTitle } },
      range: [yCenter - yHalfSpan, yCenter + yHalfSpan],
      gridcolor: plotColors.grid,
      zerolinecolor: plotColors.zeroline,
      tickfont: { color: plotColors.tick }
    },
    paper_bgcolor: plotColors.paper,
    plot_bgcolor: plotColors.plot,
    font: { color: plotColors.font },
    dragmode: 'pan' as const,
    hovermode: 'closest' as const,
    margin: { l: 60, r: 30, t: 30, b: 60 },
    // Stull region annotations + temperature labels
    annotations: [
      // Region labels positioned at visual centers of each region
      { x: 1.5, y: 0.75, text: 'UNFUSED', showarrow: false, font: { color: plotColors.regionLabel, size: 11 }, textangle: -35 },
      { x: 2.3, y: 0.55, text: 'MATTE', showarrow: false, font: { color: plotColors.regionLabelStrong, size: 12 }, textangle: -35 },
      { x: 3.4, y: 0.65, text: 'SEMI-MATTE', showarrow: false, font: { color: plotColors.regionLabel, size: 10 }, textangle: -30 },
      { x: 4.5, y: 0.25, text: 'BRIGHT GLOSS', showarrow: false, font: { color: plotColors.regionLabel, size: 11 } },
      { x: 5.0, y: 0.1, text: 'UNDERFIRED', showarrow: false, font: { color: plotColors.regionLabelStrong, size: 10 }, textangle: -15 },
      { x: 1.2, y: 0.08, text: 'CRAZED', showarrow: false, font: { color: plotColors.regionLabelStrong, size: 10 } },
      // Q-line label
      { x: 6.8, y: 0.88, text: 'Q', showarrow: false, font: { color: plotColors.qLabel, size: 11, family: 'serif' } },
      // Temperature contour labels
      ...(features.tempContours ? [
        { x: 6.4, y: 0.42, text: '1280°C', showarrow: false, font: { color: plotColors.tempLabel, size: 9 } },
        { x: 6.4, y: 0.48, text: '1270°C', showarrow: false, font: { color: 'rgba(255,255,204,0.6)', size: 9 } },
        { x: 6.4, y: 0.52, text: '1260°C', showarrow: false, font: { color: 'rgba(255,255,136,0.7)', size: 9 } },
        { x: 6.4, y: 0.60, text: '1250°C', showarrow: false, font: { color: 'rgba(255,255,34,0.7)', size: 9 } },
        { x: 5.9, y: 0.68, text: '1240°C', showarrow: false, font: { color: 'rgba(255,221,0,0.8)', size: 9 } },
      ] : []),
      // Limit formula labels
      ...limitOverlay.annotations,
    ] as any,
    shapes: [
      // Stull region fills
      ...Object.values(STULL_REGIONS).map(region => ({
        type: 'path' as const,
        path: region.path,
        fillcolor: region.color,
        line: { width: 0 },
        layer: 'below' as const
      })),
      // Q-line (dashed, subtle)
      {
        type: 'path' as const,
        path: STULL_Q_LINE.path,
        fillcolor: 'transparent',
        line: { color: STULL_Q_LINE.color, width: 1.5, dash: 'dot' as const },
        layer: 'below' as const
      },
      // Temperature contour lines
      ...(features.tempContours ? Object.values(TEMP_CONTOURS).map(contour => ({
        type: 'path' as const,
        path: contour.path,
        fillcolor: 'transparent',
        line: { color: contour.color, width: 1 },
        layer: 'below' as const
      })) : []),
      // Limit formula rectangles (dynamic per axis pair)
      ...limitOverlay.shapes,
      ...(circleShape ? [circleShape] : [])
    ]
  }), [xAxis, yAxis, xHalfSpan, yHalfSpan, circleShape, plotColors, limitOverlay])
  
  // Click handler — shift+click adds to blend selection
  const handleClick = useCallback((event: any) => {
    const point = event.points?.[0]
    if (point?.customdata) {
      const glazeStore = useGlazeStore.getState()
      const glaze = glazeStore.glazes.get(point.customdata)
      if (glaze) {
        const nativeEvent = event.event as MouseEvent | undefined
        if (nativeEvent?.shiftKey) {
          addToBlendSelection(glaze)
          setSidebarTab('blend')
        } else {
          setSelectedGlaze(glaze)
        }
      }
    }
  }, [setSelectedGlaze, addToBlendSelection, setSidebarTab])
  
  // Hover handler
  const handleHover = useCallback((event: any) => {
    const point = event.points?.[0]
    if (point) {
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
    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d'] as any[],
    scrollZoom: true,
    doubleClick: 'reset' as const
  }

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
            <span>Chart engine failed to load</span>
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
            <span>Loading chart engine…</span>
            {loadSlow && <span style={{ fontSize: 11, color: '#666' }}>Slow connection — still trying…</span>}
          </>
        )}
      </div>
    )
  }
  
  return (
    <PlotComponent
      data={[...(densityTrace ? [densityTrace] : []), trace, ...(blendTrace ? [blendTrace] : []), ...(highlightTrace ? [highlightTrace] : [])] as any}
      layout={layout}
      config={config}
      onClick={handleClick}
      onHover={handleHover}
      useResizeHandler
      style={{ 
        width: width || '100%', 
        height: height || '100%' 
      }}
    />
  )
}

// Helper functions
function surfaceTypeToNumber(surface: SurfaceType): number {
  const map: Record<SurfaceType, number> = {
    matte: 1,
    satin: 2,
    gloss: 3,
    crystalline: 4,
    crawl: 5,
    unknown: 0
  }
  return map[surface] ?? 0
}

function sourceToNumber(source: string): number {
  const map: Record<string, number> = {
    glazy: 1,
    digitalfire: 2,
    user: 3,
    calculated: 4
  }
  return map[source] ?? 0
}

function confidenceToNumber(confidence: EpistemicState): number {
  const map: Record<EpistemicState, number> = {
    unknown: 0,
    assumed: 1,
    inferred: 2,
    declared: 3,
    verified: 4
  }
  return map[confidence] ?? 0
}

function getColorBarTitle(colorBy: string): string {
  const titles: Record<string, string> = {
    cone: 'Cone',
    surface: 'Surface',
    source: 'Source',
    flux_ratio: 'R2O:RO',
    confidence: 'Confidence',
    boron: 'B2O3'
  }
  return titles[colorBy] || colorBy
}

export default StullPlot
