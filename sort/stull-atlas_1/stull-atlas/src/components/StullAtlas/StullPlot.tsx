/**
 * Stull Plot Component
 * 
 * Main visualization using Plotly WebGL scattergl
 */

import React, { useMemo, useCallback } from 'react'
import Plot from 'react-plotly.js'
import { useGlazeStore, useDatasetStore, useSelectionStore } from '@/stores'
import { OxideSymbol, GlazePlotPoint, SurfaceType, EpistemicState } from '@/types'
import { roundTo } from '@/calculator'

interface StullPlotProps {
  xAxis?: OxideSymbol
  yAxis?: OxideSymbol
  colorBy?: 'cone' | 'surface' | 'source' | 'flux_ratio' | 'confidence' | 'boron'
  width?: number
  height?: number
}

// Color scales for different properties
const COLOR_SCALES: Record<string, string> = {
  cone: 'RdYlBu',
  surface: 'Viridis',
  source: 'Set1',
  flux_ratio: 'Portland',
  confidence: 'Greys',
  boron: 'YlOrRd'
}

// Stull chart regions (cone 11, 0.3:0.7 flux ratio)
const STULL_REGIONS = {
  matte: { 
    path: 'M 1.5 0.3 L 2.5 0.5 L 2.5 0.8 L 1.5 0.8 Z',
    color: 'rgba(76, 175, 80, 0.1)',
    label: 'Matte'
  },
  satin: {
    path: 'M 2.5 0.3 L 4.0 0.5 L 4.0 0.8 L 2.5 0.8 L 2.5 0.5 Z',
    color: 'rgba(255, 193, 7, 0.1)',
    label: 'Satin'
  },
  gloss: {
    path: 'M 4.0 0.2 L 5.5 0.4 L 5.5 0.8 L 4.0 0.8 L 4.0 0.5 Z',
    color: 'rgba(33, 150, 243, 0.1)',
    label: 'Gloss'
  },
  underfired: {
    path: 'M 5.5 0.1 L 6.5 0.1 L 6.5 0.5 L 5.5 0.5 Z',
    color: 'rgba(158, 158, 158, 0.1)',
    label: 'Underfired'
  },
  crazed: {
    path: 'M 1.0 0.1 L 2.0 0.1 L 2.0 0.3 L 1.0 0.3 Z',
    color: 'rgba(244, 67, 54, 0.1)',
    label: 'Crazed'
  }
}

export function StullPlot({ 
  xAxis = 'SiO2', 
  yAxis = 'Al2O3',
  colorBy = 'cone',
  width,
  height
}: StullPlotProps) {
  
  const { currentDataset } = useDatasetStore()
  const { getPlotPoints } = useGlazeStore()
  const { selectedGlaze, setSelectedGlaze, setHoveredPoint, selectedForBlend } = useSelectionStore()
  
  // Get plot data
  const plotPoints = useMemo(() => {
    return getPlotPoints(currentDataset)
  }, [getPlotPoints, currentDataset])
  
  // Filter out invalid points
  const validPoints = useMemo(() => {
    return plotPoints.filter(p => 
      p.x != null && p.y != null && 
      !isNaN(p.x) && !isNaN(p.y) &&
      p.x > 0 && p.y > 0
    )
  }, [plotPoints])
  
  // Calculate color values
  const colorValues = useMemo(() => {
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
      colorscale: COLOR_SCALES[colorBy] || 'Viridis',
      colorbar: {
        title: getColorBarTitle(colorBy),
        thickness: 15,
        len: 0.5
      },
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
    hovertemplate: 
      '<b>%{text}</b><br>' +
      `${xAxis}: %{x:.2f}<br>` +
      `${yAxis}: %{y:.2f}<br>` +
      '<extra></extra>'
  }), [validPoints, colorValues, colorBy, xAxis, yAxis, selectedGlaze, selectedForBlend])
  
  // Layout with Stull regions
  const layout = useMemo(() => ({
    xaxis: {
      title: { text: xAxis, font: { color: '#aaa' } },
      range: [1.0, 6.5],
      gridcolor: '#333',
      zerolinecolor: '#444',
      tickfont: { color: '#888' }
    },
    yaxis: {
      title: { text: yAxis, font: { color: '#aaa' } },
      range: [0.05, 0.85],
      gridcolor: '#333',
      zerolinecolor: '#444',
      tickfont: { color: '#888' }
    },
    paper_bgcolor: '#1a1a1a',
    plot_bgcolor: '#1e1e1e',
    font: { color: '#ccc' },
    dragmode: 'pan' as const,
    hovermode: 'closest' as const,
    margin: { l: 60, r: 30, t: 30, b: 60 },
    // Stull region annotations
    annotations: Object.entries(STULL_REGIONS).map(([key, region]) => ({
      x: getRegionCenter(key).x,
      y: getRegionCenter(key).y,
      text: region.label,
      showarrow: false,
      font: { color: 'rgba(255,255,255,0.3)', size: 12 }
    })),
    shapes: Object.values(STULL_REGIONS).map(region => ({
      type: 'path' as const,
      path: region.path,
      fillcolor: region.color,
      line: { width: 0 }
    }))
  }), [xAxis, yAxis])
  
  // Click handler
  const handleClick = useCallback((event: any) => {
    const point = event.points?.[0]
    if (point?.customdata) {
      const glazeStore = useGlazeStore.getState()
      const glaze = glazeStore.glazes.get(point.customdata)
      if (glaze) {
        setSelectedGlaze(glaze)
      }
    }
  }, [setSelectedGlaze])
  
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
        confidence: 'inferred'
      })
    }
  }, [setHoveredPoint])
  
  const config = {
    displayModeBar: true,
    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d'] as any[],
    scrollZoom: true,
    doubleClick: 'reset' as const
  }
  
  return (
    <Plot
      data={[trace]}
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

function getRegionCenter(region: string): { x: number; y: number } {
  const centers: Record<string, { x: number; y: number }> = {
    matte: { x: 2.0, y: 0.65 },
    satin: { x: 3.25, y: 0.55 },
    gloss: { x: 4.75, y: 0.5 },
    underfired: { x: 6.0, y: 0.3 },
    crazed: { x: 1.5, y: 0.2 }
  }
  return centers[region] || { x: 3, y: 0.4 }
}

export default StullPlot
