/**
 * Flux Triaxial Explorer
 *
 * An interactive triaxial blend where:
 *   X-axis  = Flux Ratio (R₂O : RO)
 *   Y-axis  = Estimated Melting Temperature (°C)
 *   Color   = B₂O₃ (boron content)
 *
 * Three corner recipes define the blend space.  A flux-shift slider
 * nudges the R₂O ↔ RO partition across *all* blend points, so you
 * can watch the swarm slide along the flux-ratio axis in real time.
 *
 * "Adjust the flux ratio and see the points move on the map."
 *   — Henry Crissman, 2024
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import createPlotlyComponent from 'react-plotly.js/factory'
import { RecipeInput } from '@/components/RecipeInput'
import { GlazeRecipe, SimplexPoint, UMF } from '@/types'
import { simplexBlend, simplexPointCount } from '@/calculator/blends/simplex'
import { recipeToUMF, getOxideValue } from '@/calculator/umf'
import { estimateMeltTemp, computeFluxRatio, applyFluxShift } from '@/calculator/meltEstimate'
import { materialDatabase } from '@/domain/material'
import { useRecipeStore } from '@/stores'
import { exportBlendCSV, printLabels, formatOxideDisplay, actionBtnStyle } from '@/utils'
import { usePageTitle } from '@/hooks'
import { calcStyles } from './calc-styles'

// ─── Constants ─────────────────────────────────────────────────

const CORNER_COLORS = ['#e74c3c', '#2ecc71', '#3498db']
const CORNER_LABELS = ['A', 'B', 'C']

type PlotComponentType = React.ComponentType<any>

// ─── Derived point with flux / temp / boron ────────────────────

interface FluxPoint {
  index: number
  coordinates: number[]       // [A%, B%, C%] weights
  umf: UMF                    // original UMF
  shiftedUmf: UMF             // UMF after flux-shift
  fluxRatio: number           // R₂O / RO (shifted)
  meltTemp: number            // estimated melting °C (shifted)
  boron: number               // B₂O₃ value
  label: string
  recipe?: GlazeRecipe
}

// ─── Component ─────────────────────────────────────────────────

export function FluxTriaxialPage() {
  usePageTitle('Flux Triaxial')

  // Corner recipes
  const [recipes, setRecipes] = useState<(GlazeRecipe | null)[]>([null, null, null])
  const [divisions, setDivisions] = useState(5)
  const [fluxShift, setFluxShift] = useState(0)          // −0.3 … +0.3
  const [rawResults, setRawResults] = useState<SimplexPoint[] | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const { setBlendResults } = useRecipeStore()
  const navigate = useNavigate()

  // Lazy Plotly
  const [PlotComponent, setPlotComponent] = useState<PlotComponentType | null>(null)
  const [plotError, setPlotError] = useState(false)

  useEffect(() => {
    let active = true
    import('plotly.js-gl2d-dist-min').then((mod) => {
      if (!active) return
      const Plot = createPlotlyComponent((mod as any).default ?? mod)
      setPlotComponent(() => Plot)
    }).catch(() => {
      if (active) setPlotError(true)
    })
    return () => { active = false }
  }, [])

  const pointCount = simplexPointCount(3, divisions)

  const updateRecipe = useCallback((index: number, recipe: GlazeRecipe) => {
    setRecipes(prev => {
      const next = [...prev]
      next[index] = recipe
      return next
    })
    setRawResults(null)
  }, [])

  const canCalculate = useMemo(() => {
    return recipes.every(r =>
      r && r.ingredients.some(ing => ing.material.trim() && ing.amount > 0)
    )
  }, [recipes])

  // Calculate blend
  const calculate = useCallback(() => {
    if (!canCalculate) return
    setErrors([])

    const recs = recipes as GlazeRecipe[]
    const umfResults = recs.map(r => recipeToUMF(r, materialDatabase))
    const allErrors = umfResults.flatMap(u => u.errors)
    const umfs = umfResults.map(u => u.value)

    if (umfs.some(u => !u)) {
      setErrors(allErrors.length > 0 ? allErrors : ['Could not calculate UMF for one or more recipes'])
      return
    }

    const validUmfs = umfs.filter((u): u is UMF => u !== null)
    const result = simplexBlend(
      { type: 'triaxial', recipes: recs, divisions },
      validUmfs
    )

    if (result.value) {
      setRawResults(result.value)
      setErrors([...result.warnings])
    } else {
      setErrors([...result.errors])
    }
  }, [recipes, divisions, canCalculate])

  // Derive flux-shifted points whenever results or shift changes
  const fluxPoints: FluxPoint[] = useMemo(() => {
    if (!rawResults) return []
    return rawResults.map((pt, i) => {
      const shifted = applyFluxShift(pt.umf, fluxShift)
      return {
        index: i,
        coordinates: pt.coordinates,
        umf: pt.umf,
        shiftedUmf: shifted,
        fluxRatio: computeFluxRatio(shifted),
        meltTemp: estimateMeltTemp(shifted),
        boron: getOxideValue(shifted, 'B2O3'),
        label: `${Math.round(pt.coordinates[0] * 100)}A:${Math.round(pt.coordinates[1] * 100)}B:${Math.round(pt.coordinates[2] * 100)}C`,
        recipe: pt.recipe,
      }
    })
  }, [rawResults, fluxShift])

  // ─── Chart traces ──────────────────────────────────────────

  const chartData = useMemo(() => {
    if (fluxPoints.length === 0) return null

    const xs = fluxPoints.map(p => p.fluxRatio)
    const ys = fluxPoints.map(p => p.meltTemp)
    const colors = fluxPoints.map(p => p.boron)
    const labels = fluxPoints.map(p => p.label)
    const hoverText = fluxPoints.map(p =>
      `<b>${p.label}</b><br>` +
      `Flux Ratio: ${p.fluxRatio.toFixed(3)}<br>` +
      `Est. Temp: ${Math.round(p.meltTemp)}°C<br>` +
      `B₂O₃: ${p.boron.toFixed(3)}<br>` +
      `SiO₂: ${getOxideValue(p.shiftedUmf, 'SiO2').toFixed(2)}<br>` +
      `Al₂O₃: ${getOxideValue(p.shiftedUmf, 'Al2O3').toFixed(2)}`
    )

    const maxBoron = Math.max(...colors, 0.01)

    return [{
      type: 'scattergl' as const,
      mode: 'markers' as const,
      x: xs,
      y: ys,
      text: hoverText,
      hoverinfo: 'text' as const,
      marker: {
        size: fluxPoints.map(p => 8 + p.boron * 20),   // bigger = more boron
        color: colors,
        colorscale: 'YlOrRd',
        cmin: 0,
        cmax: maxBoron,
        colorbar: {
          title: 'B₂O₃',
          thickness: 14,
          len: 0.65,
        },
        line: { width: 1, color: 'rgba(255,255,255,0.5)' },
        opacity: 0.9,
      },
    }]
  }, [fluxPoints])

  const chartLayout = useMemo(() => {
    // Auto-range with some padding
    let xMin = 0, xMax = 1, yMin = 1100, yMax = 1350
    if (fluxPoints.length > 0) {
      const xs = fluxPoints.map(p => p.fluxRatio)
      const ys = fluxPoints.map(p => p.meltTemp)
      const xPad = Math.max((Math.max(...xs) - Math.min(...xs)) * 0.15, 0.05)
      const yPad = Math.max((Math.max(...ys) - Math.min(...ys)) * 0.15, 10)
      xMin = Math.min(...xs) - xPad
      xMax = Math.max(...xs) + xPad
      yMin = Math.min(...ys) - yPad
      yMax = Math.max(...ys) + yPad
    }

    return {
      xaxis: {
        title: { text: 'Flux Ratio (R₂O : RO)', font: { color: '#aaa' } },
        range: [xMin, xMax],
        gridcolor: 'rgba(255,255,255,0.07)',
        zerolinecolor: 'rgba(255,255,255,0.15)',
        tickfont: { color: '#888' },
      },
      yaxis: {
        title: { text: 'Est. Melting Temperature (°C)', font: { color: '#aaa' } },
        range: [yMin, yMax],
        gridcolor: 'rgba(255,255,255,0.07)',
        zerolinecolor: 'rgba(255,255,255,0.15)',
        tickfont: { color: '#888' },
      },
      paper_bgcolor: '#1a1a1a',
      plot_bgcolor: '#111',
      font: { color: '#ccc' },
      dragmode: 'pan' as const,
      hovermode: 'closest' as const,
      margin: { l: 65, r: 20, t: 30, b: 55 },
      annotations: [{
        x: 0.5,
        y: 1.02,
        xref: 'paper' as const,
        yref: 'paper' as const,
        text: fluxShift !== 0
          ? `Flux shift: ${fluxShift > 0 ? '+' : ''}${fluxShift.toFixed(2)} (R₂O ${fluxShift > 0 ? '↑' : '↓'})`
          : '',
        showarrow: false,
        font: { color: '#ff9800', size: 11 },
      }],
    }
  }, [fluxPoints, fluxShift])

  const plotConfig = {
    displayModeBar: true,
    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d'] as any[],
    scrollZoom: true,
    doubleClick: 'reset' as const,
  }

  // ─── View on Explorer ──────────────────────────────────────

  const viewOnExplorer = useCallback(() => {
    if (!rawResults) return
    setBlendResults(rawResults)
    navigate('/')
  }, [rawResults, setBlendResults, navigate])

  // ─── Render ────────────────────────────────────────────────

  return (
    <div className="calc-page">
      <div className="calc-sidebar" onKeyDown={e => { if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) calculate() }}>
        <div className="calc-section">
          <h2>Flux Triaxial</h2>
          <p className="subtitle">
            Three corners blended — plotted by flux ratio vs estimated melting temperature, colored by boron.
          </p>
        </div>

        <div className="calc-section">
          <h3>Corner Recipes</h3>
          {CORNER_LABELS.map((label, i) => (
            <RecipeInput
              key={label}
              label={`Corner ${label}`}
              color={CORNER_COLORS[i]}
              recipe={recipes[i]}
              onChange={r => updateRecipe(i, r)}
              compact
            />
          ))}
        </div>

        <div className="calc-section">
          <h3>Divisions</h3>
          <div className="calc-controls">
            <div className="control-row">
              <input
                type="range" min="2" max="15"
                value={divisions}
                onChange={e => { setDivisions(Number(e.target.value)); setRawResults(null) }}
              />
              <span className="range-value">{divisions}</span>
            </div>
          </div>
          <div className="point-count">
            <strong>{pointCount}</strong> blend points
          </div>
        </div>

        {/* Flux Shift Slider */}
        <div className="calc-section">
          <h3>
            Flux Shift
            <span style={{ fontSize: 11, color: '#888', fontWeight: 400, marginLeft: 8 }}>
              {fluxShift === 0 ? '(neutral)' : fluxShift > 0 ? '→ more R₂O' : '→ more RO'}
            </span>
          </h3>
          <div className="calc-controls">
            <div className="control-row">
              <input
                type="range"
                min="-0.30" max="0.30" step="0.01"
                value={fluxShift}
                onChange={e => setFluxShift(Number(e.target.value))}
                style={{ flex: 1 }}
              />
              <span className="range-value" style={{ minWidth: 48, textAlign: 'right' }}>
                {fluxShift > 0 ? '+' : ''}{fluxShift.toFixed(2)}
              </span>
            </div>
          </div>
          <p style={{ fontSize: 11, color: '#666', margin: '4px 0 0' }}>
            Shifts R₂O ↔ RO partition. Drag to watch points move.
          </p>
          {fluxShift !== 0 && (
            <button
              onClick={() => setFluxShift(0)}
              style={{ ...actionBtnStyle, marginTop: 4, fontSize: 11, padding: '2px 10px' }}
            >Reset</button>
          )}
        </div>

        {errors.length > 0 && (
          <div className="calc-section">
            {errors.map((err, i) => (
              <p key={i} style={{ color: '#e74c3c', fontSize: 13, margin: '4px 0' }}>⚠ {err}</p>
            ))}
          </div>
        )}

        <button
          className="calc-button"
          onClick={calculate}
          disabled={!canCalculate}
        >
          Calculate Triaxial
        </button>
      </div>

      <div className="calc-main">
        {fluxPoints.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
            {/* Chart */}
            <div style={{ flex: '1 1 50%', minHeight: 320 }}>
              {PlotComponent ? (
                <PlotComponent
                  data={chartData}
                  layout={chartLayout}
                  config={plotConfig}
                  useResizeHandler
                  style={{ width: '100%', height: '100%' }}
                />
              ) : plotError ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#777' }}>
                  ⚠ Chart engine failed to load
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#777' }}>
                  Loading chart engine…
                </div>
              )}
            </div>

            {/* Results table */}
            <div className="results-panel" style={{ flex: '1 1 50%', minHeight: 200, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="results-header">
                <h3>Results — {fluxPoints.length} points</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={viewOnExplorer} style={actionBtnStyle}>
                    View on Stull Map
                  </button>
                  <button
                    onClick={() => exportBlendCSV(
                      fluxPoints.map(pt => ({
                        label: pt.label,
                        umf: pt.shiftedUmf,
                        meta: {
                          'A%': Math.round(pt.coordinates[0] * 100),
                          'B%': Math.round(pt.coordinates[1] * 100),
                          'C%': Math.round(pt.coordinates[2] * 100),
                          'Flux Ratio': pt.fluxRatio.toFixed(3),
                          'Est °C': Math.round(pt.meltTemp),
                          'B2O3': pt.boron.toFixed(3),
                        },
                      })),
                      'flux-triaxial.csv'
                    )}
                    style={actionBtnStyle}
                  >CSV</button>
                  <button
                    onClick={() => printLabels(fluxPoints.map(pt => ({
                      label: pt.label,
                      umf: pt.shiftedUmf,
                    })))}
                    style={actionBtnStyle}
                  >Print Labels</button>
                </div>
              </div>
              <div className="results-scroll" style={{ flex: 1, overflow: 'auto' }}>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th style={{ color: CORNER_COLORS[0] }}>A%</th>
                      <th style={{ color: CORNER_COLORS[1] }}>B%</th>
                      <th style={{ color: CORNER_COLORS[2] }}>C%</th>
                      <th>Flux Ratio</th>
                      <th>Est °C</th>
                      <th>B₂O₃</th>
                      <th>SiO₂</th>
                      <th>Al₂O₃</th>
                      <th>Na₂O</th>
                      <th>K₂O</th>
                      <th>CaO</th>
                      <th>MgO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fluxPoints.map((pt, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{Math.round(pt.coordinates[0] * 100)}</td>
                        <td>{Math.round(pt.coordinates[1] * 100)}</td>
                        <td>{Math.round(pt.coordinates[2] * 100)}</td>
                        <td style={{ fontWeight: 600, color: '#ff9800' }}>{pt.fluxRatio.toFixed(3)}</td>
                        <td style={{ fontWeight: 600, color: '#4fc3f7' }}>{Math.round(pt.meltTemp)}</td>
                        <td style={{ color: pt.boron > 0.01 ? '#ffb74d' : '#555' }}>{pt.boron.toFixed(3)}</td>
                        <td>{formatOxideDisplay(pt.shiftedUmf, 'SiO2')}</td>
                        <td>{formatOxideDisplay(pt.shiftedUmf, 'Al2O3')}</td>
                        <td>{formatOxideDisplay(pt.shiftedUmf, 'Na2O')}</td>
                        <td>{formatOxideDisplay(pt.shiftedUmf, 'K2O')}</td>
                        <td>{formatOxideDisplay(pt.shiftedUmf, 'CaO')}</td>
                        <td>{formatOxideDisplay(pt.shiftedUmf, 'MgO')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon" style={{ fontSize: 42 }}>⚗</div>
            <h3 style={{ margin: '8px 0 4px', color: '#ddd' }}>Flux Triaxial Explorer</h3>
            <p>Enter three corner recipes, then calculate to see blend points plotted by flux ratio, melting temperature, and boron.</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 8 }}>
              Division of 5 → {simplexPointCount(3, 5)} points &nbsp;·&nbsp; 10 → {simplexPointCount(3, 10)} points
            </p>
            <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(255,152,0,0.08)', borderRadius: 8, border: '1px solid rgba(255,152,0,0.15)', maxWidth: 400, fontSize: 13, color: '#bbb', lineHeight: 1.5 }}>
              <strong style={{ color: '#ff9800' }}>How it works:</strong><br />
              X-axis shows <strong>flux ratio</strong> (R₂O ÷ RO).<br />
              Y-axis shows <strong>estimated melting temperature</strong>.<br />
              Dot size &amp; color show <strong>boron</strong> (B₂O₃).<br />
              Drag the <strong>Flux Shift</strong> slider to move all points.
            </div>
          </div>
        )}
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

export default FluxTriaxialPage
