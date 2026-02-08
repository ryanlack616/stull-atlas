/**
 * Stull Atlas
 * 
 * Main container component for the glaze explorer
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { StullPlot } from './StullPlot'
import { StullPlot3D, ZAxisOption } from './StullPlot3D'
import { DatasetSwitcher } from './DatasetSwitcher'
import { ComparePanel } from './ComparePanel'
import { AnalysisPanel } from '@/components/AnalysisPanel'
import { useSelectionStore, useGlazeStore, useDatasetStore } from '@/stores'
import { useSimilarity } from '@/hooks'
import { OxideSymbol, GlazeRecipe, MaterialDatasetId } from '@/types'
import type { DensityMap } from '@/analysis/density'
import { explorerStyles } from './explorer-styles'

type ColorByOption = 'cone' | 'surface' | 'source' | 'flux_ratio' | 'confidence' | 'boron' | 'z_axis'

/** Subscript helper for oxide formulas */
const subscript = (s: string) => s.replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>')

export function StullAtlas() {
  const [xAxis, setXAxis] = useState<OxideSymbol>('SiO2')
  const [yAxis, setYAxis] = useState<OxideSymbol>('Al2O3')
  const [colorBy, setColorBy] = useState<ColorByOption>('cone')
  const [zoom, setZoom] = useState(1)
  const [is3D, setIs3D] = useState(false)
  const [zAxis, setZAxis] = useState<ZAxisOption>('B2O3')
  
  // Auto-switch to z_axis coloring when entering 3D or changing Z axis
  useEffect(() => {
    if (is3D) setColorBy('z_axis')
  }, [is3D, zAxis])
  
  const { selectedGlaze, showSidebar, sidebarTab, toggleSidebar, setSidebarTab, setSelectedGlaze, addToCompare, compareGlazes, removeFromCompare, clearCompare } = useSelectionStore()
  const { glazes } = useGlazeStore()
  const { currentDataset } = useDatasetStore()
  
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
  } = useSimilarity(selectedGlaze, glazes, currentDataset)
  
  const axisOptions: OxideSymbol[] = [
    'SiO2', 'Al2O3', 'B2O3', 
    'Na2O', 'K2O', 'CaO', 'MgO', 'ZnO', 'BaO'
  ]
  
  const colorOptions: { value: ColorByOption; label: string }[] = [
    ...(is3D ? [{ value: 'z_axis' as ColorByOption, label: '↕ Z Axis' }] : []),
    { value: 'cone', label: 'Cone' },
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
          
          <DatasetSwitcher />
          
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
            <StullPlot3D
              zAxis={zAxis}
              colorBy={colorBy}
              zoom={zoom}
            />
          ) : (
            <StullPlot 
              xAxis={xAxis}
              yAxis={yAxis}
              colorBy={colorBy}
              zoom={zoom}
              highlightPointIds={highlightPointIds}
              highlightCircle={highlightCircle}
              densityMap={showDensity ? densityMap : null}
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
            </div>
            
            {sidebarTab === 'detail' && (
              <>
                {selectedGlaze ? (
              <div className="glaze-detail" role="tabpanel" aria-label="Selected glaze details">
                <div className="sr-only" aria-live="polite">
                  Selected: {selectedGlaze.name}, Cone {selectedGlaze.coneRange[0]} to {selectedGlaze.coneRange[1]}, {selectedGlaze.surfaceType} surface
                </div>
                <h2>{selectedGlaze.name}</h2>
                <div className="detail-section">
                  <h4>Source</h4>
                  <p>{selectedGlaze.source}</p>
                  {selectedGlaze.sourceUrl && (
                    <a href={selectedGlaze.sourceUrl} target="_blank" rel="noopener noreferrer">
                      View original →
                    </a>
                  )}
                </div>
                
                <div className="detail-section">
                  <h4>Firing</h4>
                  <p>Cone {selectedGlaze.coneRange[0]} - {selectedGlaze.coneRange[1]}</p>
                  <p>{selectedGlaze.atmosphere}</p>
                </div>
                
                {/* UMF Values */}
                {(() => {
                  const umf = selectedGlaze.umf.get(currentDataset)
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
                                    <td dangerouslySetInnerHTML={{ __html: subscript(ox) }} />
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

                <div className="detail-section">
                  <h4>Recipe</h4>
                  <table className="recipe-table">
                    <tbody>
                      {selectedGlaze.ingredients.map((ing, i) => (
                        <tr key={i}>
                          <td>{ing.material}</td>
                          <td className="amount">{ing.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              <ComparePanel
                glazes={compareGlazes}
                currentDataset={currentDataset}
                onRemove={removeFromCompare}
                onClear={clearCompare}
                onSelect={setSelectedGlaze}
              />
            )}
            
            {sidebarTab === 'analysis' && (
              <AnalysisPanel
                onHighlightCluster={handleHighlightCluster}
                onHighlightVoid={handleHighlightVoid}
                onDensityMap={handleDensityMap}
              />
            )}
          </aside>
        )}
      
      <style>{explorerStyles}</style>
    </div>
  )
}

export default StullAtlas
