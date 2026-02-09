/**
 * Stull Atlas
 * 
 * Main container component for the glaze explorer
 */

import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react'
import { StullPlot } from './StullPlot'
import { MolarSetPicker } from './MolarSetPicker'

import { useSelectionStore, useGlazeStore, useFilterStore } from '@/stores'
import { useSimilarity } from '@/hooks'
import { OxideSymbol, GlazeRecipe } from '@/types'
import type { DensityMap } from '@/analysis/density'
import type { ZAxisOption, CameraPreset, LightPosition } from './StullPlot3D'
import { zAxisLabel } from './StullPlot3D'
import type { SurfaceGrid } from '@/analysis/surfaceFit'
import { UMFFingerprint, FluxDonut, OxideRadar, GlazeTypeBadge, ConeRangeBar, MiniStull, DatasetStats, RecipeBar, OxideTd } from '@/components/UMFVisuals'
import { explorerStyles } from './explorer-styles'
import { exportPlotAsImage, exportAsPrintPDF, exportSurfaceAsOBJ, exportSurfaceAsSTL, exportScatterAsCSV } from '@/utils'

// Lazy-load heavy components that aren't always visible
const StullPlot3D = lazy(() => import('./StullPlot3D').then(m => ({ default: m.StullPlot3D })))
const ComparePanel = lazy(() => import('./ComparePanel').then(m => ({ default: m.ComparePanel })))
const AnalysisPanel = lazy(() => import('@/components/AnalysisPanel').then(m => ({ default: m.AnalysisPanel })))
const DigitalfirePanel = lazy(() => import('@/components/DigitalfirePanel').then(m => ({ default: m.DigitalfirePanel })))

type ColorByOption = 'cone' | 'surface' | 'source' | 'flux_ratio' | 'confidence' | 'boron' | 'z_axis' | 'glaze_type'

/** Subscript helper for oxide formulas (kept for backward compat, prefer OxideTd) */
const subscript = (s: string) => s.replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>')

/* ── Filter Panel ── */
const ATMO_OPTIONS = ['oxidation', 'reduction', 'neutral', 'unknown'] as const
const SURFACE_OPTIONS = ['gloss', 'satin', 'matte', 'crystalline', 'crawl', 'unknown'] as const

function FilterPanel() {
  const [open, setOpen] = useState(true)
  const {
    atmospheres, surfaces, coneMin, coneMax,
    hasIngredients, hasImages, activeCount,
    toggleAtmosphere, toggleSurface, setConeRange,
    setHasIngredients, setHasImages, clearAll,
  } = useFilterStore()

  return (
    <div className="control-group filter-panel">
      <h3
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, userSelect: 'none' }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ fontSize: 10, transition: 'transform 0.15s', transform: open ? 'rotate(90deg)' : 'rotate(0)' }}>&#9654;</span>
        Filters
        {activeCount > 0 && (
          <span className="filter-badge">{activeCount}</span>
        )}
      </h3>
      {open && (
        <div className="filter-body">
          {/* Atmosphere */}
          <div className="filter-section">
            <span className="filter-label">Atmosphere</span>
            <div className="filter-chips">
              {ATMO_OPTIONS.map(a => (
                <button
                  key={a}
                  className={`filter-chip ${atmospheres.has(a) ? 'active' : ''}`}
                  onClick={() => toggleAtmosphere(a)}
                  aria-pressed={atmospheres.has(a)}
                  aria-label={`Atmosphere: ${a}`}
                >
                  {a === 'unknown' ? '?' : a.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Surface */}
          <div className="filter-section">
            <span className="filter-label">Surface</span>
            <div className="filter-chips">
              {SURFACE_OPTIONS.map(s => (
                <button
                  key={s}
                  className={`filter-chip ${surfaces.has(s) ? 'active' : ''}`}
                  onClick={() => toggleSurface(s)}
                  aria-pressed={surfaces.has(s)}
                  aria-label={`Surface: ${s}`}
                >
                  {s === 'unknown' ? '?' : s === 'crystalline' ? 'crys' : s.slice(0, 4)}
                </button>
              ))}
            </div>
          </div>

          {/* Cone range */}
          <div className="filter-section">
            <span className="filter-label">Cone range</span>
            <div className="cone-range-inputs">
              <input
                type="number"
                className="cone-input"
                placeholder="min"
                value={coneMin ?? ''}
                onChange={e => {
                  const v = e.target.value === '' ? null : Number(e.target.value)
                  setConeRange(v, coneMax)
                }}
                min={-4}
                max={14}
              />
              <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>to</span>
              <input
                type="number"
                className="cone-input"
                placeholder="max"
                value={coneMax ?? ''}
                onChange={e => {
                  const v = e.target.value === '' ? null : Number(e.target.value)
                  setConeRange(coneMin, v)
                }}
                min={-4}
                max={14}
              />
            </div>
          </div>

          {/* Flags */}
          <div className="filter-section">
            <label className="filter-flag">
              <input type="checkbox" checked={hasIngredients} onChange={e => setHasIngredients(e.target.checked)} />
              Has recipe
            </label>
            <label className="filter-flag">
              <input type="checkbox" checked={hasImages} onChange={e => setHasImages(e.target.checked)} />
              Has photo
            </label>
          </div>

          {activeCount > 0 && (
            <button className="filter-clear" onClick={clearAll}>
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export function StullAtlas() {
  const [xAxis, setXAxis] = useState<OxideSymbol>('SiO2')
  const [yAxis, setYAxis] = useState<OxideSymbol>('Al2O3')
  const [colorBy, setColorBy] = useState<ColorByOption>('cone')
  const [zoom, setZoom] = useState(1)
  const [is3D, setIs3D] = useState(false)
  const [zAxis, setZAxis] = useState<ZAxisOption>('B2O3')
  const [showSurface, setShowSurface] = useState(true)
  const [surfaceOpacity, setSurfaceOpacity] = useState(0.35)
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('default')
  const [showLimits, setShowLimits] = useState(false)
  const [limitCone, setLimitCone] = useState<string>('6')
  const [perspective, setPerspective] = useState(0.5)
  const [lightEnabled, setLightEnabled] = useState(false)
  const [lightPosition, setLightPosition] = useState<LightPosition>({ x: 1, y: -1, z: 2 })
  const [surfaceGridRef, setSurfaceGridRef] = useState<SurfaceGrid | null>(null)
  const [scatterPointsRef, setScatterPointsRef] = useState<{ x: number; y: number; z: number; name: string }[]>([])
  
  const handleSurfaceGridReady = useCallback((grid: SurfaceGrid | null, scatter: { x: number; y: number; z: number; name: string }[]) => {
    setSurfaceGridRef(grid)
    setScatterPointsRef(scatter)
  }, [])
  
  // Auto-switch to z_axis coloring when entering 3D or changing Z axis
  useEffect(() => {
    if (is3D) setColorBy('z_axis')
  }, [is3D, zAxis])
  
  const selectedGlaze = useSelectionStore(s => s.selectedGlaze)
  const showSidebar = useSelectionStore(s => s.showSidebar)
  const sidebarTab = useSelectionStore(s => s.sidebarTab)
  const toggleSidebar = useSelectionStore(s => s.toggleSidebar)
  const setSidebarTab = useSelectionStore(s => s.setSidebarTab)
  const setSelectedGlaze = useSelectionStore(s => s.setSelectedGlaze)
  const addToCompare = useSelectionStore(s => s.addToCompare)
  const compareGlazes = useSelectionStore(s => s.compareGlazes)
  const removeFromCompare = useSelectionStore(s => s.removeFromCompare)
  const clearCompare = useSelectionStore(s => s.clearCompare)
  // Use selectors for frequently-changing state to avoid re-rendering the whole tree
  const glazes = useGlazeStore(s => s.glazes)
  
  // Highlight state for analysis panel → plot bridge
  const [highlightPointIds, setHighlightPointIds] = useState<string[]>([])
  const [highlightCircle, setHighlightCircle] = useState<{ x: number; y: number; r: number } | null>(null)

  const handleHighlightCluster = useCallback((pointIds: string[]) => {
    setHighlightPointIds(pointIds)
    setHighlightCircle(null)
  }, [])

  const handleHighlightVoid = useCallback((center: { x: number; y: number }, radius: number) => {
    setHighlightCircle({ x: center.x, y: center.y, r: radius })
    setHighlightPointIds([])
  }, [])

  // Density heatmap state
  const [densityMap, setDensityMap] = useState<DensityMap | null>(null)
  const [showDensity, setShowDensity] = useState(false)

  const handleDensityMap = useCallback((map: DensityMap | null) => {
    setDensityMap(map)
    if (map) setShowDensity(true)
  }, [])

  const similarityOxides: OxideSymbol[] = ['SiO2', 'Al2O3', 'B2O3', 'Na2O', 'K2O', 'CaO', 'MgO', 'ZnO', 'SrO', 'BaO']
  
  const {
    results: similarGlazes,
    weights: similarityWeights,
    count: similarityCount,
    setCount: setSimilarityCount,
    updateWeight,
    resetWeights,
    oxides,
  } = useSimilarity(selectedGlaze, glazes)
  
  const axisOptions: OxideSymbol[] = [
    'SiO2', 'Al2O3', 'B2O3', 
    'Na2O', 'K2O', 'CaO', 'MgO', 'ZnO', 'BaO'
  ]
  
  const colorOptions: { value: ColorByOption; label: string }[] = [
    ...(is3D ? [{ value: 'z_axis' as ColorByOption, label: '↕ Z Axis' }] : []),
    { value: 'cone', label: 'Cone' },
    { value: 'glaze_type', label: 'Glaze Type' },
    { value: 'surface', label: 'Surface' },
    { value: 'source', label: 'Source' },
    { value: 'flux_ratio', label: 'R2O:RO Ratio' },
    { value: 'boron', label: 'Boron' },
    { value: 'confidence', label: 'Confidence' }
  ]
  
  const zAxisOptions: { value: ZAxisOption; label: string }[] = [
    { value: 'B2O3', label: 'B₂O₃ (Boron)' },
    { value: 'CaO', label: 'CaO (Calcium)' },
    { value: 'MgO', label: 'MgO (Magnesium)' },
    { value: 'Na2O', label: 'Na₂O (Sodium)' },
    { value: 'K2O', label: 'K₂O (Potassium)' },
    { value: 'ZnO', label: 'ZnO (Zinc)' },
    { value: 'BaO', label: 'BaO (Barium)' },
    { value: 'Fe2O3', label: 'Fe₂O₃ (Iron)' },
    { value: 'cone', label: 'Cone (Temperature)' },
    { value: 'flux_ratio', label: 'R₂O:RO Ratio' },
    { value: 'SiO2_Al2O3_ratio', label: 'SiO₂:Al₂O₃ Ratio' }
  ]
  
  return (
    <div className="stull-explorer" role="application" aria-label="Stull Chart Glaze Explorer">
      <aside className="controls-panel" aria-label="Plot controls">
          <div className="control-group">
            <h3 id="axes-heading">Axes</h3>
            <div className="axis-controls" role="group" aria-labelledby="axes-heading">
              <label>
                X Axis
                <select 
                  value={xAxis} 
                  onChange={(e) => setXAxis(e.target.value as OxideSymbol)}
                >
                  {axisOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label>
                Y Axis
                <select 
                  value={yAxis} 
                  onChange={(e) => setYAxis(e.target.value as OxideSymbol)}
                >
                  {axisOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          
          <div className="control-group">
            <h3>Color By</h3>
            <select 
              value={colorBy} 
              onChange={(e) => setColorBy(e.target.value as ColorByOption)}
              className="color-select"
            >
              {colorOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <h3>View</h3>
            <button
              className={`view-toggle ${is3D ? 'active' : ''}`}
              onClick={() => setIs3D(!is3D)}
              aria-pressed={is3D}
              aria-label={is3D ? 'Switch to 2D view' : 'Switch to 3D view'}
            >
              {is3D ? '◆ 3D' : '◇ 2D'}
            </button>
            
            {is3D && (
              <>
                <div className="z-axis-control">
                  <label>
                    Z Axis
                    <select
                      value={zAxis}
                      onChange={(e) => setZAxis(e.target.value as ZAxisOption)}
                    >
                      {zAxisOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="three-d-extras">
                  <label className="surface-toggle">
                    <input
                      type="checkbox"
                      checked={showSurface}
                      onChange={e => setShowSurface(e.target.checked)}
                    />
                    Fitted Surface
                  </label>
                  {showSurface && (
                    <div className="surface-opacity">
                      <span>Opacity</span>
                      <input
                        type="range"
                        min="0.1"
                        max="0.8"
                        step="0.05"
                        value={surfaceOpacity}
                        onChange={e => setSurfaceOpacity(Number(e.target.value))}
                      />
                      <span className="opacity-value">{Math.round(surfaceOpacity * 100)}%</span>
                    </div>
                  )}
                </div>

                <div className="camera-presets">
                  <span className="presets-label">Camera</span>
                  <div className="preset-buttons">
                    {(['default', 'top', 'side-x', 'side-y'] as CameraPreset[]).map(preset => (
                      <button
                        key={preset}
                        className={`preset-btn ${cameraPreset === preset ? 'active' : ''}`}
                        onClick={() => setCameraPreset(preset)}
                        title={{
                          default: 'Perspective view',
                          top: 'Top-down (birds eye)',
                          'side-x': 'Side view along Al\u2082O\u2083',
                          'side-y': 'Side view along SiO\u2082',
                        }[preset]}
                      >
                        {{
                          default: '\u2B22',
                          top: '\u2B9D',
                          'side-x': '\u2B9E',
                          'side-y': '\u2B9C',
                        }[preset]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="perspective-control">
                  <span className="presets-label">Perspective</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={perspective}
                      onChange={e => setPerspective(Number(e.target.value))}
                      title={perspective < 0.01 ? 'Orthographic' : `Perspective: ${Math.round(perspective * 100)}%`}
                      style={{ flex: 1 }}
                    />
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', minWidth: 36, textAlign: 'right' }}>
                      {perspective < 0.01 ? 'Ortho' : `${Math.round(perspective * 100)}%`}
                    </span>
                  </div>
                </div>

                <div className="light-control">
                  <label className="surface-toggle">
                    <input
                      type="checkbox"
                      checked={lightEnabled}
                      onChange={e => setLightEnabled(e.target.checked)}
                    />
                    Light Source
                  </label>
                  {lightEnabled && (
                    <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {(['x', 'y', 'z'] as const).map(axis => (
                        <div key={axis} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                          <span style={{ width: 12, color: 'var(--text-secondary)' }}>{axis.toUpperCase()}</span>
                          <input
                            type="range"
                            min="-3"
                            max="3"
                            step="0.1"
                            value={lightPosition[axis]}
                            onChange={e => setLightPosition(prev => ({ ...prev, [axis]: Number(e.target.value) }))}
                            style={{ flex: 1 }}
                          />
                          <span style={{ fontSize: 11, color: 'var(--text-dim)', minWidth: 28, textAlign: 'right' }}>
                            {lightPosition[axis].toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="control-group">
            <h3>Zoom</h3>
            <div className="zoom-control">
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                aria-label={`Zoom level: ${zoom.toFixed(1)}x`}
              />
              <span className="zoom-value">{zoom.toFixed(1)}x</span>
            </div>
            <button 
              className="reset-zoom"
              onClick={() => setZoom(1)}
            >
              Reset
            </button>
          </div>
          
          <div className="control-group">
            <h3>Limit Formulas</h3>
            <label className="surface-toggle" style={{ marginBottom: 4 }}>
              <input
                type="checkbox"
                checked={showLimits}
                onChange={e => setShowLimits(e.target.checked)}
              />
              Show Limits
            </label>
            {showLimits && (
              <div style={{ marginTop: 4 }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Highlight Cone
                  <select
                    value={limitCone}
                    onChange={e => setLimitCone(e.target.value)}
                    style={{ marginLeft: 6, fontSize: 12 }}
                  >
                    <option value="06">Cone 06</option>
                    <option value="04">Cone 04</option>
                    <option value="6">Cone 6</option>
                    <option value="9">Cone 9</option>
                    <option value="10">Cone 10</option>
                    <option value="11">Cone 11</option>
                  </select>
                </label>
                <p style={{ fontSize: 10, color: 'var(--text-tertiary)', margin: '4px 0 0', lineHeight: 1.3 }}>
                  Safe oxide ranges from Digitalfire &amp; ceramic literature
                </p>
              </div>
            )}
          </div>
          
          <div className="control-group">
            <h3>Export</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button
                className="reset-zoom"
                onClick={() => exportPlotAsImage('png', 'stull-atlas-chart')}
                title="Save chart as a high-res PNG image"
              >
                📷 Save Image (PNG)
              </button>
              <button
                className="reset-zoom"
                onClick={() => exportPlotAsImage('svg', 'stull-atlas-chart')}
                title="Save chart as SVG vector graphic"
              >
                🖼 Save Image (SVG)
              </button>
              <button
                className="reset-zoom"
                onClick={() => exportAsPrintPDF('Stull Atlas')}
                title="Print or save as PDF"
              >
                🖨 Print / PDF
              </button>
              {is3D && surfaceGridRef && (
                <>
                  <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0', paddingTop: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>3D Surface</span>
                  </div>
                  <button
                    className="reset-zoom"
                    onClick={() => exportSurfaceAsOBJ(surfaceGridRef, {
                      zLabel: zAxisLabel(zAxis),
                      scatterPoints: scatterPointsRef,
                    })}
                    title="Export surface mesh as OBJ — opens in Blender, MeshLab, etc."
                  >
                    🧊 Surface Mesh (OBJ)
                  </button>
                  <button
                    className="reset-zoom"
                    onClick={() => exportSurfaceAsSTL(surfaceGridRef)}
                    title="Export surface mesh as STL — for 3D printing or CAD tools"
                  >
                    🔺 Surface Mesh (STL)
                  </button>
                  <button
                    className="reset-zoom"
                    onClick={() => exportScatterAsCSV(scatterPointsRef, { zLabel: zAxisLabel(zAxis) })}
                    title="Export glaze scatter points as CSV with 3D coordinates"
                  >
                    📊 3D Points (CSV)
                  </button>
                </>
              )}
            </div>
          </div>
          
          <MolarSetPicker />
          <DatasetStats />

          {/* ── Filter Panel ── */}
          <FilterPanel />
          
          {densityMap && (
            <div className="control-group">
              <h3>Overlays</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showDensity}
                  onChange={e => setShowDensity(e.target.checked)}
                />
                Density Heatmap
              </label>
            </div>
          )}
        </aside>
        
        <main className="plot-container" aria-label="Stull chart visualization">
          {is3D ? (
            <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-secondary)', fontSize: 14 }}>Loading 3D view...</div>}>
              <StullPlot3D
                zAxis={zAxis}
                colorBy={colorBy}
                zoom={zoom}
                highlightPointIds={highlightPointIds}
                highlightCircle={highlightCircle}
                showSurface={showSurface}
                surfaceOpacity={surfaceOpacity}
                cameraPreset={cameraPreset}
                perspective={perspective}
                lightPosition={lightEnabled ? lightPosition : undefined}
                onSurfaceGridReady={handleSurfaceGridReady}
              />
            </Suspense>
          ) : (
            <StullPlot 
              xAxis={xAxis}
              yAxis={yAxis}
              colorBy={colorBy}
              zoom={zoom}
              highlightPointIds={highlightPointIds}
              highlightCircle={highlightCircle}
              densityMap={showDensity ? densityMap : null}
              showLimits={showLimits}
              limitCone={showLimits ? limitCone : null}
            />
          )}
        </main>
        
        {showSidebar && (
          <aside className="detail-panel" aria-label="Glaze details">
            <button className="close-sidebar" onClick={toggleSidebar} aria-label="Close sidebar">×</button>
            
            {/* Sidebar tabs */}
            <div className="sidebar-tabs" role="tablist" aria-label="Detail panel views">
              <button 
                className={`sidebar-tab ${sidebarTab === 'detail' ? 'active' : ''}`}
                onClick={() => setSidebarTab('detail')}
                role="tab"
                aria-selected={sidebarTab === 'detail'}
              >
                Detail
              </button>
              <button 
                className={`sidebar-tab ${sidebarTab === 'compare' ? 'active' : ''}`}
                onClick={() => setSidebarTab('compare')}
                role="tab"
                aria-selected={sidebarTab === 'compare'}
              >
                Compare{compareGlazes.length > 0 ? ` (${compareGlazes.length})` : ''}
              </button>
              <button 
                className={`sidebar-tab ${sidebarTab === 'analysis' ? 'active' : ''}`}
                onClick={() => setSidebarTab('analysis')}
                role="tab"
                aria-selected={sidebarTab === 'analysis'}
              >
                Analysis
              </button>
              <button 
                className={`sidebar-tab ${sidebarTab === 'knowledge' ? 'active' : ''}`}
                onClick={() => setSidebarTab('knowledge')}
                role="tab"
                aria-selected={sidebarTab === 'knowledge'}
                title="Ceramic knowledge from Tony Hansen's Digitalfire Reference Library"
              >
                Knowledge
              </button>
            </div>
            
            {sidebarTab === 'detail' && (
              <>
                {selectedGlaze ? (
              <div className="glaze-detail" role="tabpanel" aria-label="Selected glaze details">
                <div className="sr-only" aria-live="polite">
                  Selected: {selectedGlaze.name}, Cone {selectedGlaze.coneRange[0]} to {selectedGlaze.coneRange[1]}, {selectedGlaze.surfaceType} surface
                </div>
                <h2>{selectedGlaze.name}</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                  <GlazeTypeBadge glazeTypeId={selectedGlaze.glazeTypeId} showParent />
                </div>
                <div className="detail-section">
                  <h4>Source</h4>
                  <p>{selectedGlaze.source}</p>
                  {selectedGlaze.sourceUrl && (
                    <a href={selectedGlaze.sourceUrl} target="_blank" rel="noopener noreferrer">
                      View original →
                    </a>
                  )}
                  {selectedGlaze.id.startsWith('glazy_') && (
                    <a
                      href={`https://glazy.org/recipes/${selectedGlaze.id.replace('glazy_', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, marginTop: 4 }}
                    >
                      View on Glazy →
                    </a>
                  )}
                </div>
                
                <div className="detail-section">
                  <h4>Firing</h4>
                  <ConeRangeBar coneRange={selectedGlaze.coneRange} />
                  {selectedGlaze.atmosphere !== 'unknown' && (
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-label)' }}>{selectedGlaze.atmosphere}</p>
                  )}
                </div>
                
                {/* UMF Values */}
                {(() => {
                  const umf = selectedGlaze.umf
                  if (!umf) return null
                  const oxideGroups = [
                    { label: 'Fluxes (R₂O)', oxides: ['Li2O', 'Na2O', 'K2O'] as const },
                    { label: 'Fluxes (RO)', oxides: ['CaO', 'MgO', 'ZnO', 'BaO', 'SrO'] as const },
                    { label: 'Stabilizers', oxides: ['Al2O3', 'B2O3', 'Fe2O3'] as const },
                    { label: 'Glass Formers', oxides: ['SiO2', 'TiO2', 'ZrO2'] as const },
                  ]
                  return (
                    <div className="detail-section">
                      <h4>UMF</h4>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                          <FluxDonut umf={umf} size={56} />
                          <MiniStull x={umf.SiO2?.value ?? 0} y={umf.Al2O3?.value ?? 0} size={56} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <UMFFingerprint umf={umf} showLabels width={160} />
                          <OxideRadar umf={umf} size={130} />
                        </div>
                      </div>
                      <table className="recipe-table" style={{ fontSize: 12 }}>
                        <tbody>
                          {oxideGroups.map(group => {
                            const rows = group.oxides
                              .filter(ox => (umf[ox]?.value ?? 0) > 0.001)
                              .map(ox => ({ ox, val: umf[ox]?.value ?? 0 }))
                            if (rows.length === 0) return null
                            return (
                              <React.Fragment key={group.label}>
                                <tr><td colSpan={2} style={{ color: 'var(--text-muted)', fontSize: 11, paddingTop: 6 }}>{group.label}</td></tr>
                                {rows.map(({ ox, val }) => (
                                  <tr key={ox}>
                                    <OxideTd oxide={ox} />
                                    <td className="amount">{val.toFixed(3)}</td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            )
                          })}
                          {umf._meta && (
                            <>
                              <tr><td colSpan={2} style={{ color: 'var(--text-muted)', fontSize: 11, paddingTop: 6 }}>Ratios</td></tr>
                              <tr>
                                <td>Si:Al</td>
                                <td className="amount">{umf._meta.SiO2_Al2O3_ratio.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td>R₂O:RO</td>
                                <td className="amount">{umf._meta.R2O_RO_ratio.toFixed(2)}</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )
                })()}

                {/* Glaze Image */}
                {selectedGlaze.images && selectedGlaze.images.length > 0 && (
                  <div className="detail-section">
                    <h4>Photo</h4>
                    <img
                      src={selectedGlaze.images[0]}
                      alt={selectedGlaze.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        maxHeight: 180,
                        objectFit: 'cover',
                        borderRadius: 6,
                        border: '1px solid var(--border-primary)',
                      }}
                    />
                  </div>
                )}

                <div className="detail-section">
                  <h4>Recipe</h4>
                  {selectedGlaze.ingredients.length > 0 ? (
                    <>
                      <RecipeBar ingredients={selectedGlaze.ingredients} />
                      <table className="recipe-table" style={{ marginTop: 6 }}>
                        <tbody>
                          {selectedGlaze.ingredients.map((ing, i) => (
                            <tr key={i}>
                              <td>{ing.material}</td>
                              <td className="amount">{ing.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: 0 }}>No recipe data available</p>
                  )}
                </div>

                <div className="detail-section">
                  <h4>Similar Glazes</h4>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <select
                      value={similarityCount}
                      onChange={(e) => setSimilarityCount(Number(e.target.value))}
                      style={{
                        width: 70,
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: 6,
                        color: 'var(--text-label)',
                        fontSize: 12,
                        padding: '4px 6px'
                      }}
                    >
                      {[3, 6, 9, 12].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <button
                      onClick={resetWeights}
                      style={{
                        background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: 6,
                        color: 'var(--text-label)', fontSize: 12, padding: '4px 8px', cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                    {oxides.map(oxide => (
                      <label key={oxide} style={{ display: 'grid', gridTemplateColumns: '58px 1fr 40px', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-label)' }}>
                        <span>{oxide}</span>
                        <input
                          type="range"
                          min="0"
                          max="3"
                          step="0.25"
                          value={similarityWeights[oxide] ?? 1}
                          onChange={(e) => updateWeight(oxide, Number(e.target.value))}
                        />
                        <span style={{ color: 'var(--text-muted)', textAlign: 'right' }}>{(similarityWeights[oxide] ?? 1).toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                  {similarGlazes.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {similarGlazes.map(({ glaze, dist }, i) => (
                        <button
                          key={glaze.id}
                          onClick={() => setSelectedGlaze(glaze)}
                          style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '6px 8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)',
                            borderRadius: 6, color: 'var(--text-label)', fontSize: 12, cursor: 'pointer'
                          }}
                        >
                          <span style={{ textAlign: 'left' }}>{glaze.name}</span>
                          <span style={{ color: 'var(--text-muted)' }}>{dist.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: 0 }}>No similar matches found</p>
                  )}
                </div>
                
                {selectedGlaze.notes && (
                  <div className="detail-section">
                    <h4>Notes</h4>
                    <p>{selectedGlaze.notes}</p>
                  </div>
                )}

                {/* Add to Compare button */}
                <button
                  className="add-compare-btn"
                  onClick={() => addToCompare(selectedGlaze)}
                  disabled={compareGlazes.length >= 3 || compareGlazes.some(g => g.id === selectedGlaze.id)}
                  title={compareGlazes.some(g => g.id === selectedGlaze.id) ? 'Already in comparison' : compareGlazes.length >= 3 ? 'Max 3 glazes' : 'Add to comparison'}
                >
                  {compareGlazes.some(g => g.id === selectedGlaze.id) ? '✓ In Compare' : '+ Add to Compare'}
                </button>
              </div>
            ) : (
              <div className="no-selection">
                <p>Click a point to see glaze details</p>
              </div>
            )}
              </>
            )}
            
            {sidebarTab === 'compare' && (
              <Suspense fallback={<div style={{ padding: 16, fontSize: 13, color: 'var(--text-secondary)' }}>Loading compare...</div>}>
                <ComparePanel
                  glazes={compareGlazes}
                  onRemove={removeFromCompare}
                  onClear={clearCompare}
                  onSelect={setSelectedGlaze}
                />
              </Suspense>
            )}
            
            {sidebarTab === 'analysis' && (
              <Suspense fallback={<div style={{ padding: 16, fontSize: 13, color: 'var(--text-secondary)' }}>Loading analysis...</div>}>
                <AnalysisPanel
                  onHighlightCluster={handleHighlightCluster}
                  onHighlightVoid={handleHighlightVoid}
                  onDensityMap={handleDensityMap}
                />
              </Suspense>
            )}
            
            {sidebarTab === 'knowledge' && (
              <Suspense fallback={<div style={{ padding: 16, fontSize: 13, color: 'var(--text-secondary)' }}>Loading knowledge...</div>}>
                <DigitalfirePanel
                  selectedGlaze={selectedGlaze}
                />
              </Suspense>
            )}
          </aside>
        )}
      
      <style>{explorerStyles}</style>
    </div>
  )
}

export default StullAtlas
