/**
 * Biaxial Blend Page
 * 
 * Add two materials independently to a base recipe.
 * Creates a 2D grid of test tiles.
 */

import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipeInput } from '@/components/RecipeInput'
import { GlazeRecipe, UMF, OxideSymbol } from '@/types'
import { recipeToUMF, getOxideValue } from '@/calculator/umf'
import { materialDatabase } from '@/domain/material'
import { useRecipeStore } from '@/stores'
import { ALL_CONES } from '@/calculator/parseCone'
import { validateUMFAgainstLimits, predictSurface, type StullPrediction } from '@/calculator/validation'
import { exportBlendCSV, printLabels } from '@/utils/export'
import { actionBtnStyle } from '@/utils/blend'
import { usePageTitle } from '@/hooks/usePageTitle'
import { calcStyles } from './calc-styles'

interface GridResult {
  row: number
  col: number
  addAPercent: number
  addBPercent: number
  umf: UMF | null
  surface: StullPrediction
  recipe: GlazeRecipe
}

const SURFACE_COLORS: Record<StullPrediction, string> = {
  matte: '#4caf50',
  satin: '#8bc34a',
  gloss: '#2196f3',
  underfired: '#9e9e9e',
  crazed: '#f44336',
  unknown: '#444',
}

export function BiaxialBlendPage() {
  usePageTitle('Biaxial Blend')
  const [baseRecipe, setBaseRecipe] = useState<GlazeRecipe | null>(null)
  const [additionA, setAdditionA] = useState({ material: '', maxPercent: 15 })
  const [additionB, setAdditionB] = useState({ material: '', maxPercent: 15 })
  const [divisions, setDivisions] = useState(5)
  const [results, setResults] = useState<GridResult[]>([])
  const [cone, setCone] = useState('6')
  const { setBlendResults } = useRecipeStore()
  const navigate = useNavigate()

  const calculate = useCallback(() => {
    if (!baseRecipe) return
    if (!additionA.material.trim() || !additionB.material.trim()) return

    const gridResults: GridResult[] = []

    for (let row = 0; row <= divisions; row++) {
      for (let col = 0; col <= divisions; col++) {
        const addAPercent = (row / divisions) * additionA.maxPercent
        const addBPercent = (col / divisions) * additionB.maxPercent

        // Build modified recipe
        const modifiedRecipe: GlazeRecipe = {
          ...baseRecipe,
          id: `biaxial_${row}_${col}`,
          name: `${additionA.material} ${addAPercent.toFixed(1)}% + ${additionB.material} ${addBPercent.toFixed(1)}%`,
          ingredients: [
            ...baseRecipe.ingredients,
            ...(addAPercent > 0 ? [{ material: additionA.material, amount: addAPercent, unit: 'weight' as const }] : []),
            ...(addBPercent > 0 ? [{ material: additionB.material, amount: addBPercent, unit: 'weight' as const }] : []),
          ],
        }

        const result = recipeToUMF(modifiedRecipe, materialDatabase, 'digitalfire_2024')
        const umf = result.value || null
        const surface: StullPrediction = umf ? predictSurface(umf) : 'unknown'

        gridResults.push({ row, col, addAPercent, addBPercent, umf, surface, recipe: modifiedRecipe })
      }
    }

    setResults(gridResults)

    // Bridge results to explorer
    const blendPoints = gridResults
      .filter(r => r.umf)
      .map((r, i) => ({
        index: i,
        coordinates: [1 - (r.addAPercent + r.addBPercent) / 100, r.addAPercent / 100, r.addBPercent / 100],
        recipe: r.recipe,
        umf: r.umf!,
      }))
    setBlendResults(blendPoints)
  }, [baseRecipe, additionA, additionB, divisions, cone, setBlendResults])

  const canCalculate = baseRecipe &&
    baseRecipe.ingredients.some(i => i.material.trim() && i.amount > 0) &&
    additionA.material.trim() &&
    additionB.material.trim()

  const totalPoints = (divisions + 1) * (divisions + 1)

  return (
    <div className="calc-page">
      <div className="calc-sidebar" onKeyDown={e => { if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) calculate() }}>
        <div className="calc-section">
          <h2>Biaxial Blend</h2>
          <p className="subtitle">
            Add two materials independently to a base recipe — creates a {divisions + 1}×{divisions + 1} grid
          </p>
        </div>

        <div className="calc-section">
          <h3>Base Recipe</h3>
          <RecipeInput
            label="Base Glaze"
            color="#6366F1"
            recipe={baseRecipe}
            onChange={setBaseRecipe}
          />
        </div>

        <div className="calc-section">
          <h3>Addition A (rows ↓)</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'end' }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                value={additionA.material}
                onChange={e => setAdditionA(a => ({ ...a, material: e.target.value }))}
                placeholder="Material name..."
                list="common-materials"
                style={inputStyle}
              />
            </div>
            <div style={{ width: 80 }}>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>Max %</label>
              <input
                type="number"
                value={additionA.maxPercent}
                onChange={e => setAdditionA(a => ({ ...a, maxPercent: parseFloat(e.target.value) || 0 }))}
                min={1} max={50} step={1}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <div className="calc-section">
          <h3>Addition B (columns →)</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'end' }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                value={additionB.material}
                onChange={e => setAdditionB(b => ({ ...b, material: e.target.value }))}
                placeholder="Material name..."
                list="common-materials"
                style={inputStyle}
              />
            </div>
            <div style={{ width: 80 }}>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>Max %</label>
              <input
                type="number"
                value={additionB.maxPercent}
                onChange={e => setAdditionB(b => ({ ...b, maxPercent: parseFloat(e.target.value) || 0 }))}
                min={1} max={50} step={1}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <div className="calc-section">
          <h3>Grid</h3>
          <div className="calc-controls">
            <div className="control-row">
              <label>Divisions</label>
              <input
                type="range" min={2} max={10} step={1}
                value={divisions}
                onChange={e => setDivisions(Number(e.target.value))}
              />
              <span className="range-value">{divisions}</span>
            </div>
            <div className="point-count">
              <strong>{totalPoints}</strong> test tiles
            </div>
            <div className="control-row">
              <label>Cone</label>
              <select value={cone} onChange={e => setCone(e.target.value)}
                style={{ flex: 1, padding: '6px 8px', background: 'var(--bg-input)', border: '1px solid var(--border-secondary)', borderRadius: 6, color: 'var(--text-bright)', fontSize: 13 }}>
                {ALL_CONES.map(c => <option key={c} value={c}>Cone {c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button className="calc-button" onClick={calculate} disabled={!canCalculate}>
          Generate Grid
        </button>
      </div>

      <div className="calc-main">
        {results.length > 0 ? (
          <>
            {/* Visual grid */}
            <div className="results-panel">
              <div className="results-header">
                <h3>Surface Prediction Grid</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => navigate('/')}
                    style={actionBtnStyle}
                  >View on Explorer</button>
                  <button
                    onClick={() => exportBlendCSV(
                      results.filter(r => r.umf).map(r => ({
                        label: `${additionA.material} ${r.addAPercent.toFixed(1)}% + ${additionB.material} ${r.addBPercent.toFixed(1)}%`,
                        umf: r.umf!,
                        meta: { [`${additionA.material}%`]: r.addAPercent, [`${additionB.material}%`]: r.addBPercent, surface: r.surface },
                      })),
                      'biaxial-blend.csv'
                    )}
                    style={actionBtnStyle}
                  >CSV</button>
                  <button
                    onClick={() => printLabels(
                      results.filter(r => r.umf).map(r => ({
                        label: `${additionA.material} ${r.addAPercent.toFixed(1)}% / ${additionB.material} ${r.addBPercent.toFixed(1)}%`,
                        umf: r.umf!,
                      }))
                    )}
                    style={actionBtnStyle}
                  >Print Labels</button>
                </div>
              </div>
              <div style={{ padding: 16, overflowX: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Column header */}
                  <div style={{ display: 'flex', gap: 2, marginLeft: 60 }}>
                    {Array.from({ length: divisions + 1 }, (_, col) => (
                      <div key={col} style={{ width: 48, textAlign: 'center', fontSize: 10, color: 'var(--text-secondary)' }}>
                        {((col / divisions) * additionB.maxPercent).toFixed(1)}%
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-muted)', marginLeft: 60, marginBottom: 4 }}>
                    → {additionB.material}
                  </div>

                  {Array.from({ length: divisions + 1 }, (_, row) => (
                    <div key={row} style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <div style={{ width: 56, textAlign: 'right', fontSize: 10, color: 'var(--text-secondary)', paddingRight: 4 }}>
                        {((row / divisions) * additionA.maxPercent).toFixed(1)}%
                      </div>
                      {Array.from({ length: divisions + 1 }, (_, col) => {
                        const r = results[row * (divisions + 1) + col]
                        if (!r) return null
                        return (
                          <div
                            key={col}
                            title={`${additionA.material}: ${r.addAPercent.toFixed(1)}%\n${additionB.material}: ${r.addBPercent.toFixed(1)}%\nSurface: ${r.surface}`}
                            style={{
                              width: 48, height: 48,
                              background: SURFACE_COLORS[r.surface],
                              borderRadius: 4,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 10, color: 'var(--text-bright)', fontWeight: 600,
                              opacity: r.umf ? 1 : 0.3,
                              cursor: 'default',
                            }}
                          >
                            {r.surface === 'unknown' ? '?' : r.surface.charAt(0).toUpperCase()}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', width: 56, textAlign: 'right', marginTop: 4 }}>
                    ↓ {additionA.material}
                  </div>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                  {Object.entries(SURFACE_COLORS).filter(([k]) => k !== 'unknown').map(([key, color]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-secondary)' }}>
                      <div style={{ width: 12, height: 12, background: color, borderRadius: 2 }} />
                      {key}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data table */}
            <div className="results-panel">
              <div className="results-header">
                <h3>UMF Data</h3>
              </div>
              <div className="results-scroll" style={{ maxHeight: 400 }}>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>{additionA.material}</th>
                      <th>{additionB.material}</th>
                      <th>Surface</th>
                      <th>SiO₂</th>
                      <th>Al₂O₃</th>
                      <th>B₂O₃</th>
                      <th>CaO</th>
                      <th>Na₂O+K₂O</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.filter(r => r.umf).map((r, i) => (
                      <tr key={i}>
                        <td>{r.addAPercent.toFixed(1)}%</td>
                        <td>{r.addBPercent.toFixed(1)}%</td>
                        <td style={{ color: SURFACE_COLORS[r.surface] }}>{r.surface}</td>
                        <td>{getOxideValue(r.umf!, 'SiO2').toFixed(2)}</td>
                        <td>{getOxideValue(r.umf!, 'Al2O3').toFixed(3)}</td>
                        <td>{getOxideValue(r.umf!, 'B2O3').toFixed(3)}</td>
                        <td>{getOxideValue(r.umf!, 'CaO').toFixed(3)}</td>
                        <td>{(getOxideValue(r.umf!, 'Na2O') + getOxideValue(r.umf!, 'K2O')).toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="icon">▦</div>
            <p>Enter a base recipe + two additions</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              For example: add silica and alumina independently to explore the Stull chart
            </p>
          </div>
        )}
      </div>

      <style>{calcStyles}</style>

      <datalist id="common-materials">
        {materialDatabase.getAllMaterials().map(m => (
          <option key={m.primaryName} value={m.primaryName} />
        ))}
      </datalist>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', background: 'var(--bg-input)',
  border: '1px solid var(--border-secondary)', borderRadius: 6, color: 'var(--text-bright)',
  fontSize: 13, boxSizing: 'border-box',
}

export default BiaxialBlendPage
