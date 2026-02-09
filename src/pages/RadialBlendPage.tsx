/**
 * Radial Blend Page
 * 
 * Center recipe with multiple spokes outward.
 * Each spoke is a line of additions from 0 to max.
 */

import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipeInput } from '@/components/RecipeInput'
import { GlazeRecipe, GridPoint, OxideSymbol, SimplexPoint, UMF } from '@/types'
import { recipeToUMF, getOxideValue } from '@/calculator/umf'
import { radialBlend } from '@/calculator/blends/grid'
import { materialDatabase } from '@/domain/material'
import { useRecipeStore } from '@/stores'
import { exportBlendCSV, printLabels, actionBtnStyle } from '@/utils'
import { usePageTitle } from '@/hooks'
import { calcStyles } from './calc-styles'

interface AdditionInput {
  material: string
  maxPercent: number
}

const DEFAULT_ADDITIONS: AdditionInput[] = [
  { material: '', maxPercent: 10 },
  { material: '', maxPercent: 10 },
]

export function RadialBlendPage() {
  usePageTitle('Radial Blend')
  const [centerRecipe, setCenterRecipe] = useState<GlazeRecipe | null>(null)
  const [additions, setAdditions] = useState<AdditionInput[]>(DEFAULT_ADDITIONS)
  const [stepsPerSpoke, setStepsPerSpoke] = useState(5)
  const [results, setResults] = useState<GridPoint[] | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const { setBlendResults } = useRecipeStore()
  const navigate = useNavigate()

  const updateAddition = useCallback((index: number, updates: Partial<AdditionInput>) => {
    setAdditions(prev => {
      const next = [...prev]
      next[index] = { ...next[index], ...updates }
      return next
    })
    setResults(null)
  }, [])

  const addRow = useCallback(() => {
    setAdditions(prev => [...prev, { material: '', maxPercent: 10 }])
    setResults(null)
  }, [])

  const removeRow = useCallback((index: number) => {
    setAdditions(prev => prev.filter((_, i) => i !== index))
    setResults(null)
  }, [])

  const canCalculate = centerRecipe &&
    centerRecipe.ingredients.some(i => i.material.trim() && i.amount > 0) &&
    additions.length > 0 &&
    additions.every(a => a.material.trim() && a.maxPercent > 0)

  const calculate = useCallback(() => {
    if (!centerRecipe) return

    setErrors([])

    const centerResult = recipeToUMF(centerRecipe, materialDatabase)
    if (!centerResult.value) {
      setErrors(centerResult.errors.length > 0 ? centerResult.errors : ['Failed to calculate center UMF'])
      return
    }

    const resolvedAdditions = additions.map(a => {
      const material = materialDatabase.resolve(a.material)
      return { input: a, material }
    })

    const missing = resolvedAdditions.filter(r => !r.material)
    if (missing.length > 0) {
      setErrors(missing.map(m => `Unknown material: ${m.input.material}`))
      return
    }

    const blendResult = radialBlend(
      centerRecipe,
      centerResult.value,
      resolvedAdditions.map(r => ({
        material: r.material!,
        materialName: r.material!.primaryName,
        min: 0,
        max: r.input.maxPercent,
        steps: stepsPerSpoke,
      })),
      stepsPerSpoke,
      materialDatabase
    )

    if (blendResult.value) {
      setResults(blendResult.value)
      setErrors(blendResult.warnings)
    } else {
      setErrors(blendResult.errors)
    }
  }, [centerRecipe, additions, stepsPerSpoke])

  const getVal = (umf: UMF, oxide: OxideSymbol): string => {
    const val = getOxideValue(umf, oxide)
    if (!val || Number.isNaN(val)) return '—'
    return val.toFixed(3)
  }

  return (
    <div className="calc-page">
      <div className="calc-sidebar" onKeyDown={e => { if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) calculate() }}>
        <div className="calc-section">
          <h2>Radial Blend</h2>
          <p className="subtitle">
            Center recipe with spokes out to each addition max
          </p>
        </div>

        <div className="calc-section">
          <h3>Center Recipe</h3>
          <RecipeInput
            label="Center Glaze"
            color="#6366F1"
            recipe={centerRecipe}
            onChange={setCenterRecipe}
          />
        </div>

        <div className="calc-section">
          <h3>Additions (spokes)</h3>
          {additions.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'end', marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={a.material}
                  onChange={e => updateAddition(i, { material: e.target.value })}
                  placeholder="Material name..."
                  list="common-materials"
                  style={inputStyle}
                />
              </div>
              <div style={{ width: 90 }}>
                <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>Max %</label>
                <input
                  type="number"
                  value={a.maxPercent}
                  onChange={e => updateAddition(i, { maxPercent: parseFloat(e.target.value) || 0 })}
                  min={1} max={50} step={1}
                  style={inputStyle}
                />
              </div>
              {additions.length > 1 && (
                <button onClick={() => removeRow(i)} style={removeBtnStyle}>Remove</button>
              )}
            </div>
          ))}
          <button onClick={addRow} style={addBtnStyle}>+ Add Addition</button>
        </div>

        <div className="calc-section">
          <h3>Steps per Spoke</h3>
          <div className="calc-controls">
            <div className="control-row">
              <input
                type="range"
                min="2"
                max="10"
                value={stepsPerSpoke}
                onChange={e => setStepsPerSpoke(Number(e.target.value))}
              />
              <span className="range-value">{stepsPerSpoke}</span>
            </div>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="calc-section">
            {errors.map((err, i) => (
              <p key={i} style={{ color: '#e74c3c', fontSize: 13, margin: '4px 0' }}>⚠ {err}</p>
            ))}
          </div>
        )}

        <button className="calc-button" onClick={calculate} disabled={!canCalculate}>
          Generate Radial Blend
        </button>
      </div>

      <div className="calc-main">
        {results ? (
          <div className="results-panel">
            <div className="results-header">
              <h3>Results — {results.length} points</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => {
                    const asPoints: SimplexPoint[] = results!.map((pt, i) => ({
                      index: i,
                      coordinates: [1, 0, 0],
                      recipe: pt.recipe,
                      umf: pt.umf,
                      label: pt.label,
                    }))
                    setBlendResults(asPoints)
                    navigate('/')
                  }}
                  style={actionBtnStyle}
                >
                  View on Explorer
                </button>
                <button
                  onClick={() => exportBlendCSV(
                    results!.map((pt, i) => ({
                      label: pt.label || `S${i + 1}`,
                      umf: pt.umf,
                      meta: pt.coordinates.reduce((acc, val, idx) => {
                        acc[`A${idx + 1}`] = val
                        return acc
                      }, {} as Record<string, number>),
                    })),
                    'radial-blend.csv'
                  )}
                  style={actionBtnStyle}
                >
                  CSV
                </button>
                <button
                  onClick={() => printLabels(results!.map(pt => ({ label: pt.label || 'Radial', umf: pt.umf, recipe: pt.recipe })))}
                  style={actionBtnStyle}
                >
                  Print Labels
                </button>
              </div>
            </div>
            <div className="results-scroll">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Label</th>
                    <th>SiO2</th>
                    <th>Al2O3</th>
                    <th>B2O3</th>
                    <th>Na2O</th>
                    <th>K2O</th>
                    <th>CaO</th>
                    <th>MgO</th>
                    <th>ZnO</th>
                    <th>Si:Al</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((pt, i) => {
                    const si = getOxideValue(pt.umf, 'SiO2')
                    const al = getOxideValue(pt.umf, 'Al2O3')
                    const ratio = al > 0 ? (si / al).toFixed(1) : '—'
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{pt.label}</td>
                        <td>{getVal(pt.umf, 'SiO2')}</td>
                        <td>{getVal(pt.umf, 'Al2O3')}</td>
                        <td>{getVal(pt.umf, 'B2O3')}</td>
                        <td>{getVal(pt.umf, 'Na2O')}</td>
                        <td>{getVal(pt.umf, 'K2O')}</td>
                        <td>{getVal(pt.umf, 'CaO')}</td>
                        <td>{getVal(pt.umf, 'MgO')}</td>
                        <td>{getVal(pt.umf, 'ZnO')}</td>
                        <td>{ratio}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">*</div>
            <p>Enter a center recipe and additions, then generate</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              Each addition creates a spoke from 0 to max
            </p>
          </div>
        )}
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

export default RadialBlendPage

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-tertiary)',
  border: '1px solid var(--border-primary)',
  borderRadius: 6,
  padding: '8px 10px',
  color: 'var(--text-bright)',
  fontSize: 13,
  width: '100%'
}

const addBtnStyle: React.CSSProperties = {
  padding: '6px 10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)',
  borderRadius: 6, color: '#aaa', fontSize: 12, cursor: 'pointer'
}

const removeBtnStyle: React.CSSProperties = {
  padding: '6px 10px', background: '#2a1515', border: '1px solid #553',
  borderRadius: 6, color: '#e74c3c', fontSize: 11, cursor: 'pointer'
}
