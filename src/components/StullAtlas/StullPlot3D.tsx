/**
 * Stull Plot 3D Component
 * 
 * 3D visualization using Plotly scatter3d + mesh3d for Stull regions.
 * X = SiO2, Y = Al2O3 (canonical Stull axes), Z = user-selectable.
 */

import React, { useMemo, useCallback, useEffect, useState } from 'react'
import createPlotlyComponent from 'react-plotly.js/factory'
import { useGlazeStore, useDatasetStore, useSelectionStore, useThemeStore } from '@/stores'
import { OxideSymbol, GlazePlotPoint, SurfaceType, EpistemicState } from '@/types'

export type ZAxisOption = 
  | 'B2O3' | 'CaO' | 'MgO' | 'Na2O' | 'K2O' | 'ZnO' | 'BaO' | 'Fe2O3'
  | 'cone' | 'flux_ratio' | 'SiO2_Al2O3_ratio'

interface StullPlot3DProps {
  zAxis?: ZAxisOption
  colorBy?: 'cone' | 'surface' | 'source' | 'flux_ratio' | 'confidence' | 'boron' | 'z_axis'
  zoom?: number
  width?: number
  height?: number
}

type PlotData = any
type PlotComponentType = React.ComponentType<any>

// Color scales
const COLOR_SCALES: Record<string, string> = {
  cone: 'RdYlBu',
  surface: 'Viridis',
  source: 'Set1',
  flux_ratio: 'Portland',
  confidence: 'Greys',
  boron: 'YlOrRd'
}

/**
 * Stull regions as mesh3d triangles, laid flat at Z = 0.
 * Triangulated from the original SVG paths.
 */
function buildStullRegionTraces(zFloor: number): PlotData[] {
  const regions: Array<{
    name: string
    vertices: [number, number][]  // [SiO2, Al2O3] pairs
    triangles: [number, number, number][]  // vertex indices
    color: string
  }> = [
    {
      name: 'Unfused',
      vertices: [[0.5, 0.39], [2.8, 1.0], [0.5, 1.0]],
      triangles: [[0, 1, 2]],
      color: 'rgba(120, 120, 120, 0.15)'
    },
    {
      name: 'Matte',
      vertices: [[0.5, 0.05], [0.5, 0.39], [2.8, 1.0], [4.0, 1.0]],
      triangles: [[0, 1, 2], [0, 2, 3]],
      color: 'rgba(76, 175, 80, 0.15)'
    },
    {
      name: 'Semi-Matte',
      vertices: [[1.2, 0.242], [4.0, 1.0], [5.0, 1.0]],
      triangles: [[0, 1, 2]],
      color: 'rgba(139, 195, 74, 0.12)'
    },
    {
      name: 'Crazed',
      vertices: [[0.5, 0.0], [0.5, 0.05], [1.2, 0.242], [1.75, 0.0]],
      triangles: [[0, 1, 2], [0, 2, 3]],
      color: 'rgba(244, 67, 54, 0.15)'
    },
    {
      name: 'Underfired',
      vertices: [[1.75, 0.0], [7.2, 0.65], [7.2, 0.0]],
      triangles: [[0, 1, 2]],
      color: 'rgba(158, 158, 158, 0.15)'
    },
    {
      name: 'Bright Gloss',
      // Simplified polygon for the bright gloss region
      vertices: [
        [0.5, 0.0], [0.5, 0.05], [1.2, 0.242], [1.75, 0.0],
        [2.7, 0.23], [3.3, 0.25], [3.9, 0.28], [4.2, 0.29],
        [5.4, 0.49], [7.2, 0.615], [7.2, 0.0]
      ],
      triangles: [
        [0, 3, 10], [3, 4, 10], [4, 5, 10], [5, 6, 10],
        [6, 7, 10], [7, 8, 10], [8, 9, 10]
      ],
      color: 'rgba(33, 150, 243, 0.10)'
    }
  ]

  return regions.map(region => {
    // Flatten vertices for all triangles
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
      x: allX,
      y: allY,
      z: allZ,
      i: iArr,
      j: jArr,
      k: kArr,
      color: region.color,
      opacity: 0.3,
      flatshading: true,
      hoverinfo: 'text' as const,
      hovertext: region.name,
      name: region.name,
      showlegend: false,
      lighting: { ambient: 1, diffuse: 0, specular: 0 }
    }
  })
}

/**
 * Q-line as a 3D line at the floor
 */
function buildQLineTrace(zFloor: number): PlotData {
  return {
    type: 'scatter3d' as const,
    mode: 'lines' as const,
    x: [1.8, 4.2, 6.0, 7.2],
    y: [0.2, 0.6, 0.8, 0.92],
    z: [zFloor, zFloor, zFloor, zFloor],
    line: {
      color: 'rgba(255, 255, 255, 0.4)',
      width: 3,
      dash: 'dot'
    },
    hoverinfo: 'text' as const,
    hovertext: 'Q-line',
    name: 'Q-line',
    showlegend: false
  }
}

export function StullPlot3D({ 
  zAxis = 'B2O3',
  colorBy = 'cone',
  zoom = 1,
  width,
  height
}: StullPlot3DProps) {

  const [PlotComponent, setPlotComponent] = useState<PlotComponentType | null>(null)

  useEffect(() => {
    let active = true
    import('plotly.js-gl3d-dist-min').then((mod) => {
      if (!active) return
      const Plot = createPlotlyComponent((mod as any).default ?? mod)
      setPlotComponent(() => Plot)
    })
    return () => { active = false }
  }, [])
  
  const { currentDataset } = useDatasetStore()
  const { getPlotPoints, glazes } = useGlazeStore()
  const { selectedGlaze, setSelectedGlaze, setHoveredPoint } = useSelectionStore()
  const { theme } = useThemeStore()

  // Theme-dependent Plotly colors
  const plotColors = useMemo(() => {
    const isDark = theme === 'dark'
    return {
      paper: isDark ? '#1a1a1a' : '#ffffff',
      bg: isDark ? '#1a1a1a' : '#f5f5f5',
      axisbg: isDark ? '#1e1e1e' : '#f8f8f8',
      grid: isDark ? '#333' : '#ddd',
      zeroline: isDark ? '#444' : '#ccc',
      axisTitle: isDark ? '#aaa' : '#555',
      tick: isDark ? '#888' : '#666',
      font: isDark ? '#ccc' : '#333',
      regionLabel: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.22)',
    }
  }, [theme])
  
  // Get plot data — we'll pull Z values directly from the glaze store
  const plotData = useMemo(() => {
    const points = getPlotPoints(currentDataset)
    return points.filter(p => 
      p.x != null && p.y != null && 
      !isNaN(p.x) && !isNaN(p.y) &&
      p.x > 0 && p.y > 0 &&
      p.cone != null && p.cone >= -4 && p.cone <= 10
    ).map(p => {
      // Get full glaze for UMF access
      const glaze = glazes.get(p.id)
      const umfData = glaze?.umf?.get(currentDataset)
      
      let z = 0
      switch (zAxis) {
        case 'cone':
          z = p.cone ?? 6
          break
        case 'flux_ratio':
          z = p.fluxRatio
          break
        case 'SiO2_Al2O3_ratio':
          z = (p.x > 0 && p.y > 0) ? p.x / p.y : 0
          break
        case 'B2O3':
          z = umfData?.B2O3?.value ?? p.boron ?? 0
          break
        default:
          // Any oxide from UMF
          z = (umfData as any)?.[zAxis]?.value ?? 0
          break
      }
      
      return { ...p, z }
    })
  }, [getPlotPoints, currentDataset, glazes, zAxis])
  
  // Color values
  const colorValues = useMemo(() => {
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
  }, [plotData, colorBy])
  
  // Compute Z range for floor placement
  const zRange = useMemo(() => {
    const zs = plotData.map(p => p.z).filter(z => isFinite(z) && !isNaN(z))
    if (zs.length === 0) return { min: 0, max: 1 }
    const min = Math.min(...zs)
    const max = Math.max(...zs)
    return { min, max: max === min ? min + 1 : max }
  }, [plotData])
  
  const zFloor = zRange.min - (zRange.max - zRange.min) * 0.05

  // Main scatter trace  
  const scatterTrace = useMemo((): PlotData => ({
    type: 'scatter3d' as const,
    mode: 'markers' as const,
    x: plotData.map(p => p.x),
    y: plotData.map(p => p.y),
    z: plotData.map(p => p.z),
    customdata: plotData.map(p => p.id),
    text: plotData.map(p => p.name),
    marker: {
      size: 2.5,
      opacity: 0.8,
      color: colorValues,
      colorscale: colorBy === 'z_axis' ? 'Viridis' : (COLOR_SCALES[colorBy] || 'Viridis'),
      reversescale: colorBy === 'cone',
      cmin: colorBy === 'cone' ? -4 : undefined,
      cmax: colorBy === 'cone' ? 10 : undefined,
      colorbar: {
        title: colorBy === 'z_axis' ? zAxisLabel(zAxis) : getColorBarTitle(colorBy),
        thickness: 15,
        len: 0.5,
        tickvals: colorBy === 'cone' ? [-4, -2, 0, 2, 4, 6, 8, 10] : undefined,
        ticktext: colorBy === 'cone' ? ['04', '02', '0', '2', '4', '6', '8', '10'] : undefined
      },
      line: { width: 0 }
    },
    hoverinfo: 'text' as const,
    hovertemplate: 
      '<b>%{text}</b><br>' +
      'SiO2: %{x:.2f}<br>' +
      'Al2O3: %{y:.2f}<br>' +
      `${zAxisLabel(zAxis)}: %{z:.3f}<br>` +
      '<extra></extra>',
    name: 'Glazes',
    showlegend: false
  }), [plotData, colorValues, colorBy, zAxis])
  
  // Region + Q-line traces at the floor  
  const regionTraces = useMemo(() => buildStullRegionTraces(zFloor), [zFloor])
  const qLineTrace = useMemo(() => buildQLineTrace(zFloor), [zFloor])
  
  // Drop lines from each point down to the floor (sample for performance)
  const dropLines = useMemo((): PlotData | null => {
    // Only show drop lines for selected points or skip if too many
    if (plotData.length > 500) return null
    
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
      x: xs,
      y: ys,
      z: zs,
      line: { color: 'rgba(255,255,255,0.06)', width: 1 },
      hoverinfo: 'skip' as const,
      showlegend: false,
      name: 'droplines'
    }
  }, [plotData, zFloor])
  
  // Region labels as scatter3d text
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
    name: 'labels'
  }), [zFloor, plotColors])
  
  // Assemble all traces
  const traces = useMemo(() => {
    const t: PlotData[] = [
      ...regionTraces,
      qLineTrace,
      regionLabels,
      scatterTrace,
    ]
    if (dropLines) t.splice(t.length - 1, 0, dropLines)
    return t
  }, [regionTraces, qLineTrace, regionLabels, scatterTrace, dropLines])
  
  // Layout
  const layout = useMemo(() => ({
    scene: {
      xaxis: {
        title: { text: 'SiO2', font: { color: plotColors.axisTitle } },
        range: [0.5, 7.2],
        gridcolor: plotColors.grid,
        zerolinecolor: plotColors.zeroline,
        tickfont: { color: plotColors.tick },
        backgroundcolor: plotColors.axisbg,
      },
      yaxis: {
        title: { text: 'Al2O3', font: { color: plotColors.axisTitle } },
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
      camera: {
        eye: { x: 1.5 / zoom, y: -1.8 / zoom, z: 1.2 / zoom },
        up: { x: 0, y: 0, z: 1 }
      },
      aspectmode: 'manual' as const,
      aspectratio: { x: 2, y: 1, z: 0.8 }
    },
    paper_bgcolor: plotColors.paper,
    font: { color: plotColors.font },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    hovermode: 'closest' as const,
    showlegend: false
  }), [zAxis, zoom, plotColors])
  
  // Click handler
  const handleClick = useCallback((event: any) => {
    const point = event.points?.[0]
    if (point?.customdata) {
      const glaze = useGlazeStore.getState().glazes.get(point.customdata)
      if (glaze) {
        setSelectedGlaze(glaze)
      }
    }
  }, [setSelectedGlaze])

  // Hover handler
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
        confidence: 'inferred'
      })
    }
  }, [setHoveredPoint])
  
  const config = {
    displayModeBar: true,
    modeBarButtonsToRemove: ['select2d', 'lasso2d'] as any[],
    scrollZoom: true
  }

  if (!PlotComponent) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: width || '100%', height: height || '100%',
        color: '#777', fontSize: 13
      }}>
        Loading 3D plot…
      </div>
    )
  }
  
  return (
    <PlotComponent
      data={traces as any}
      layout={layout as any}
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

// Helpers
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
  return ({ cone: 'Cone', surface: 'Surface', source: 'Source', flux_ratio: 'R2O:RO', confidence: 'Confidence', boron: 'B2O3' })[c] || c
}

function zAxisLabel(z: ZAxisOption): string {
  const labels: Record<ZAxisOption, string> = {
    B2O3: 'B₂O₃',
    CaO: 'CaO',
    MgO: 'MgO',
    Na2O: 'Na₂O',
    K2O: 'K₂O',
    ZnO: 'ZnO',
    BaO: 'BaO',
    Fe2O3: 'Fe₂O₃',
    cone: 'Cone',
    flux_ratio: 'R₂O:RO',
    SiO2_Al2O3_ratio: 'SiO₂:Al₂O₃'
  }
  return labels[z] || z
}

export default StullPlot3D
