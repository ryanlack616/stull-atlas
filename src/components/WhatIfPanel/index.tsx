/**
 * What-If Panel
 * 
 * Interactive oxide adjustment sliders that let potters explore
 * "what happens if I increase SiO₂?" in real time.
 * 
 * Takes a calculated UMF as starting point, lets you drag any oxide,
 * and shows immediate surface prediction + limit changes.
 */

import React, { useState, useCallback, useMemo } from 'react'
import { UMF, OxideSymbol } from '@/types'
import { getOxideValue, createOxideValue } from '@/calculator/umf'
import { predictSurface, validateUMFAgainstLimits, type StullPrediction } from '@/calculator/validation'
import { OxideLink } from '@/components/UMFVisuals/OxideLink'

// Oxides we allow adjustment on (the ones that matter for Stull)
const ADJUSTABLE_OXIDES: { oxide: OxideSymbol; label: string; group: string; max: number; step: number }[] = [
  // Fluxes
  { oxide: 'Na2O',  label: 'Na₂O',  group: 'Flux (R₂O)',  max: 0.8,  step: 0.01 },
  { oxide: 'K2O',   label: 'K₂O',   group: 'Flux (R₂O)',  max: 0.8,  step: 0.01 },
  { oxide: 'Li2O',  label: 'Li₂O',  group: 'Flux (R₂O)',  max: 0.5,  step: 0.01 },
  { oxide: 'CaO',   label: 'CaO',   group: 'Flux (RO)',   max: 1.0,  step: 0.01 },
  { oxide: 'MgO',   label: 'MgO',   group: 'Flux (RO)',   max: 0.6,  step: 0.01 },
  { oxide: 'ZnO',   label: 'ZnO',   group: 'Flux (RO)',   max: 0.5,  step: 0.01 },
  { oxide: 'BaO',   label: 'BaO',   group: 'Flux (RO)',   max: 0.4,  step: 0.01 },
  { oxide: 'SrO',   label: 'SrO',   group: 'Flux (RO)',   max: 0.4,  step: 0.01 },
  // Stabilizers
  { oxide: 'Al2O3', label: 'Al₂O₃', group: 'Stabilizer',  max: 1.0,  step: 0.01 },
  { oxide: 'B2O3',  label: 'B₂O₃',  group: 'Stabilizer',  max: 1.0,  step: 0.01 },
  // Glass formers
  { oxide: 'SiO2',  label: 'SiO₂',  group: 'Glass Former', max: 8.0,  step: 0.05 },
]

const SURFACE_COLORS: Record<StullPrediction, string> = {
  matte:     '#4caf50',
  satin:     '#8bc34a',
  gloss:     '#2196f3',
  underfired:'#9e9e9e',
  crazed:    '#f44336',
  unknown:   '#666',
}

interface WhatIfPanelProps {
  /** The original calculated UMF to start from */
  baseUMF: UMF
  /** Target cone for limit validation */
  cone: string
  /** Callback when the user wants to see the adjusted point on the Stull chart */
  onPositionChange?: (sio2: number, al2o3: number) => void
}

export function WhatIfPanel({ baseUMF, cone, onPositionChange }: WhatIfPanelProps) {
  // Track adjustments as deltas from the original UMF
  const [deltas, setDeltas] = useState<Record<string, number>>({})
  
  // Build the adjusted UMF by applying deltas
  const adjustedUMF = useMemo(() => {
    const umf = { ...baseUMF } as any
    // Deep clone _meta
    if (baseUMF._meta) {
      umf._meta = { ...baseUMF._meta }
    }
    
    for (const [oxide, delta] of Object.entries(deltas)) {
      if (delta === 0) continue
      const original = getOxideValue(baseUMF, oxide as OxideSymbol)
      const newValue = Math.max(0, original + delta)
      umf[oxide] = createOxideValue(newValue, 'assumed', 'what-if')
    }
    
    // Recalculate meta
    const sio2 = getOxideValue(umf, 'SiO2')
    const al2o3 = getOxideValue(umf, 'Al2O3')
    if (al2o3 > 0.001) {
      umf._meta = {
        ...umf._meta,
        SiO2_Al2O3_ratio: sio2 / al2o3,
      }
    }
    
    return umf as UMF
  }, [baseUMF, deltas])
  
  // Predictions
  const baseSurface = useMemo(() => predictSurface(baseUMF), [baseUMF])
  const adjustedSurface = useMemo(() => predictSurface(adjustedUMF), [adjustedUMF])
  const adjustedIssues = useMemo(
    () => validateUMFAgainstLimits(adjustedUMF, cone),
    [adjustedUMF, cone]
  )
  
  const hasChanges = Object.values(deltas).some(d => d !== 0)
  
  const baseSiO2 = getOxideValue(baseUMF, 'SiO2')
  const baseAl2O3 = getOxideValue(baseUMF, 'Al2O3')
  const adjSiO2 = getOxideValue(adjustedUMF, 'SiO2')
  const adjAl2O3 = getOxideValue(adjustedUMF, 'Al2O3')
  
  // Notify parent of position change for Stull overlay
  const handleSliderChange = useCallback((oxide: string, delta: number) => {
    setDeltas(prev => {
      const next = { ...prev, [oxide]: delta }
      return next
    })
  }, [])
  
  // Notify parent when position changes
  React.useEffect(() => {
    if (onPositionChange && hasChanges) {
      onPositionChange(adjSiO2, adjAl2O3)
    }
  }, [adjSiO2, adjAl2O3, hasChanges, onPositionChange])
  
  const reset = useCallback(() => setDeltas({}), [])
  
  // Group the sliders
  const groups = useMemo(() => {
    const map = new Map<string, typeof ADJUSTABLE_OXIDES>()
    for (const item of ADJUSTABLE_OXIDES) {
      const base = getOxideValue(baseUMF, item.oxide)
      // Only show oxides that are present OR are important (SiO2, Al2O3)
      if (base > 0.001 || item.oxide === 'SiO2' || item.oxide === 'Al2O3') {
        if (!map.has(item.group)) map.set(item.group, [])
        map.get(item.group)!.push(item)
      }
    }
    return map
  }, [baseUMF])
  
  return (
    <div className="whatif-panel">
      <div className="whatif-header">
        <h3>What If...?</h3>
        <p className="whatif-desc">Drag an oxide to explore how changes affect the glaze.</p>
        {hasChanges && (
          <button className="whatif-reset" onClick={reset}>Reset All</button>
        )}
      </div>
      
      {/* Surface prediction comparison */}
      <div className="whatif-prediction">
        <div className="pred-row">
          <span className="pred-label">Original:</span>
          <span className="pred-value" style={{ color: SURFACE_COLORS[baseSurface] }}>
            {baseSurface}
          </span>
          <span className="pred-detail">
            SiO₂:Al₂O₃ = {baseAl2O3 > 0 ? (baseSiO2 / baseAl2O3).toFixed(1) : '—'}
          </span>
        </div>
        {hasChanges && (
          <div className="pred-row">
            <span className="pred-label">Adjusted:</span>
            <span className="pred-value" style={{ color: SURFACE_COLORS[adjustedSurface] }}>
              {adjustedSurface}
              {adjustedSurface !== baseSurface && ' ⬅ changed!'}
            </span>
            <span className="pred-detail">
              SiO₂:Al₂O₃ = {adjAl2O3 > 0 ? (adjSiO2 / adjAl2O3).toFixed(1) : '—'}
            </span>
          </div>
        )}
      </div>
      
      {/* Position delta */}
      {hasChanges && (
        <div className="whatif-position">
          <span>Stull position: ({baseSiO2.toFixed(2)}, {baseAl2O3.toFixed(2)}) → ({adjSiO2.toFixed(2)}, {adjAl2O3.toFixed(2)})</span>
        </div>
      )}
      
      {/* Oxide sliders by group */}
      {Array.from(groups.entries()).map(([groupName, oxides]) => (
        <div key={groupName} className="whatif-group">
          <div className="group-label">{groupName}</div>
          {oxides.map(({ oxide, label, max, step }) => {
            const base = getOxideValue(baseUMF, oxide)
            const delta = deltas[oxide] || 0
            const current = Math.max(0, base + delta)
            const changed = Math.abs(delta) > 0.001
            
            // Determine slider range: allow going down to 0 and up to max or 2x original
            const sliderMin = -base  // can go to zero
            const sliderMax = Math.max(max - base, base * 2)
            
            return (
              <div key={oxide} className={`whatif-slider-row ${changed ? 'changed' : ''}`}>
                <div className="slider-label">
                  <span className="oxide-name">{label}</span>
                  <span className="oxide-value">
                    <span className="orig">{base.toFixed(3)}</span>
                    {changed && (
                      <>
                        <span className="arrow"> → </span>
                        <span className="adjusted" style={{ color: delta > 0 ? '#4caf50' : '#ef4444' }}>
                          {current.toFixed(3)}
                        </span>
                        <span className="delta" style={{ color: delta > 0 ? '#4caf50' : '#ef4444' }}>
                          ({delta > 0 ? '+' : ''}{delta.toFixed(3)})
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <input
                  type="range"
                  min={sliderMin}
                  max={sliderMax}
                  step={step}
                  value={delta}
                  onChange={e => handleSliderChange(oxide, parseFloat(e.target.value))}
                  className="whatif-slider"
                  style={{
                    '--fill': changed 
                      ? (delta > 0 ? '#4caf50' : '#ef4444')
                      : 'var(--text-muted)'
                  } as React.CSSProperties}
                />
              </div>
            )
          })}
        </div>
      ))}
      
      {/* Limit issues for adjusted UMF */}
      {hasChanges && adjustedIssues.length > 0 && (
        <div className="whatif-issues">
          <div className="issues-label">Limit Warnings (Cone {cone})</div>
          {adjustedIssues.map((issue, i) => (
            <div key={i} className="issue-row" style={{ 
              color: issue.severity === 'error' ? '#ef4444' : '#f59e0b' 
            }}>
              {issue.severity === 'error' ? '⛔' : '⚠'} {issue.message}
            </div>
          ))}
        </div>
      )}
      
      <style>{whatIfStyles}</style>
    </div>
  )
}

const whatIfStyles = `
  .whatif-panel {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    padding: 16px;
  }
  
  .whatif-header {
    margin-bottom: 12px;
  }
  
  .whatif-header h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-bright);
    margin: 0 0 4px;
  }
  
  .whatif-desc {
    font-size: 12px;
    color: var(--text-muted);
    margin: 0;
  }
  
  .whatif-reset {
    margin-top: 8px;
    padding: 4px 12px;
    font-size: 11px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-secondary);
    cursor: pointer;
  }
  
  .whatif-reset:hover {
    border-color: var(--accent);
    color: var(--text-bright);
  }
  
  .whatif-prediction {
    background: var(--bg-primary);
    border-radius: 6px;
    padding: 10px 12px;
    margin-bottom: 12px;
  }
  
  .pred-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }
  
  .pred-row:last-child {
    margin-bottom: 0;
  }
  
  .pred-label {
    font-size: 11px;
    color: var(--text-muted);
    min-width: 56px;
  }
  
  .pred-value {
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
  }
  
  .pred-detail {
    font-size: 11px;
    color: var(--text-muted);
    font-family: 'SF Mono', monospace;
    margin-left: auto;
  }
  
  .whatif-position {
    font-size: 11px;
    color: var(--text-muted);
    font-family: 'SF Mono', monospace;
    padding: 6px 8px;
    background: var(--bg-primary);
    border-radius: 4px;
    margin-bottom: 12px;
  }
  
  .whatif-group {
    margin-bottom: 12px;
  }
  
  .group-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-muted);
    margin-bottom: 6px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border-secondary);
  }
  
  .whatif-slider-row {
    padding: 4px 0;
  }
  
  .whatif-slider-row.changed {
    background: rgba(99, 102, 241, 0.05);
    margin: 0 -8px;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .slider-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
  }
  
  .oxide-name {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-label);
  }
  
  .oxide-value {
    font-size: 11px;
    font-family: 'SF Mono', monospace;
    color: var(--text-secondary);
  }
  
  .oxide-value .arrow {
    color: var(--text-muted);
    margin: 0 2px;
  }
  
  .oxide-value .delta {
    font-size: 10px;
    margin-left: 4px;
  }
  
  .whatif-slider {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--border-secondary);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  
  .whatif-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: var(--fill, var(--text-muted));
    border: 2px solid var(--bg-primary);
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  
  .whatif-slider::-moz-range-thumb {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: var(--fill, var(--text-muted));
    border: 2px solid var(--bg-primary);
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  
  .whatif-issues {
    margin-top: 12px;
    padding: 10px 12px;
    background: var(--bg-primary);
    border-radius: 6px;
    border: 1px solid var(--border-secondary);
  }
  
  .issues-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .issue-row {
    font-size: 12px;
    margin-bottom: 3px;
    line-height: 1.4;
  }
`

export default WhatIfPanel
