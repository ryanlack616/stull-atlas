/**
 * Triaxial Blend Calculator Page
 * 
 * Three corner recipes on a simplex triangle.
 * Classic ceramic triaxial test tile layout.
 */

import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipeInput } from '@/components/RecipeInput'
import { GlazeRecipe, SimplexPoint, OxideSymbol } from '@/types'
import { simplexBlend, simplexPointCount } from '@/calculator/blends/simplex'
import { recipeToUMF } from '@/calculator/umf'
import { materialDatabase } from '@/domain/material'
import { useRecipeStore } from '@/stores'
import { exportBlendCSV, printLabels } from '@/utils/export'
import { usePageTitle } from '@/hooks/usePageTitle'
import { calcStyles } from './calc-styles'

const CORNER_COLORS = ['#e74c3c', '#2ecc71', '#3498db']
const CORNER_LABELS = ['A', 'B', 'C']

export function TriaxialBlendPage() {
  usePageTitle('Triaxial Blend')
  const [recipes, setRecipes] = useState<(GlazeRecipe | null)[]>([null, null, null])
  const [divisions, setDivisions] = useState(5)
  const [results, setResults] = useState<SimplexPoint[] | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const { setBlendResults } = useRecipeStore()
  const navigate = useNavigate()

  const pointCount = simplexPointCount(3, divisions)

  const updateRecipe = useCallback((index: number, recipe: GlazeRecipe) => {
    setRecipes(prev => {
      const next = [...prev]
      next[index] = recipe
      return next
    })
    setResults(null)
  }, [])

  const canCalculate = useMemo(() => {
    return recipes.every(r =>
      r && r.ingredients.some(ing => ing.material.trim() && ing.amount > 0)
    )
  }, [recipes])

  const calculate = useCallback(() => {
    if (!canCalculate) return
    setErrors([])

    const recs = recipes as GlazeRecipe[]
    const umfResults = recs.map(r => recipeToUMF(r, materialDatabase, 'digitalfire_2024'))
    
    const allErrors = umfResults.flatMap(u => u.errors)
    const umfs = umfResults.map(u => u.value)

    if (umfs.some(u => !u)) {
      setErrors(allErrors.length > 0 ? allErrors : ['Could not calculate UMF for one or more recipes'])
      return
    }

    const result = simplexBlend(
      { type: 'triaxial', recipes: recs, divisions },
      umfs as any
    )

    if (result.value) {
      setResults(result.value)
      setErrors([...result.warnings])
    } else {
      setErrors([...result.errors])
    }
  }, [recipes, divisions, canCalculate])

  const getOxideValue = (umf: any, oxide: OxideSymbol): string => {
    const val = umf[oxide]
    if (!val) return '—'
    if (typeof val === 'number') return val.toFixed(3)
    if (val.value !== undefined) return val.value.toFixed(3)
    return '—'
  }

  return (
    <div className="calc-page">
      <div className="calc-sidebar" onKeyDown={e => { if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) calculate() }}>
        <div className="calc-section">
          <h2>Triaxial Blend</h2>
          <p className="subtitle">
            Three corners on a simplex triangle — every combination that sums to 100%
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
                type="range"
                min="2"
                max="15"
                value={divisions}
                onChange={e => { setDivisions(Number(e.target.value)); setResults(null) }}
              />
              <span className="range-value">{divisions}</span>
            </div>
          </div>
          <div className="point-count">
            <strong>{pointCount}</strong> blend points
          </div>
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
        {results ? (
          <div className="results-panel">
            <div className="results-header">
              <h3>Results — {results.length} points</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => { setBlendResults(results!); navigate('/') }}
                  style={actionBtn}
                >View on Explorer</button>
                <button
                  onClick={() => exportBlendCSV(
                    results!.map(pt => ({
                      label: `${Math.round(pt.coordinates[0]*100)}:${Math.round(pt.coordinates[1]*100)}:${Math.round(pt.coordinates[2]*100)}`,
                      umf: pt.umf,
                      meta: { 'A%': Math.round(pt.coordinates[0]*100), 'B%': Math.round(pt.coordinates[1]*100), 'C%': Math.round(pt.coordinates[2]*100) },
                    })),
                    'triaxial-blend.csv'
                  )}
                  style={actionBtn}
                >CSV</button>
                <button
                  onClick={() => printLabels(results!.map(pt => ({
                    label: `${Math.round(pt.coordinates[0]*100)}A:${Math.round(pt.coordinates[1]*100)}B:${Math.round(pt.coordinates[2]*100)}C`,
                    umf: pt.umf,
                  })))}
                  style={actionBtn}
                >Print Labels</button>
              </div>
            </div>
            <div className="results-scroll">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{ color: CORNER_COLORS[0] }}>A%</th>
                    <th style={{ color: CORNER_COLORS[1] }}>B%</th>
                    <th style={{ color: CORNER_COLORS[2] }}>C%</th>
                    <th>SiO₂</th>
                    <th>Al₂O₃</th>
                    <th>B₂O₃</th>
                    <th>Na₂O</th>
                    <th>K₂O</th>
                    <th>CaO</th>
                    <th>MgO</th>
                    <th>Si:Al</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((pt, i) => {
                    const siAl = (() => {
                      const si = pt.umf.SiO2
                      const al = pt.umf.Al2O3
                      const siVal = si ? (typeof si === 'number' ? si : si.value) : 0
                      const alVal = al ? (typeof al === 'number' ? al : al.value) : 0
                      return alVal > 0 ? (siVal / alVal).toFixed(1) : '—'
                    })()

                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{Math.round(pt.coordinates[0] * 100)}</td>
                        <td>{Math.round(pt.coordinates[1] * 100)}</td>
                        <td>{Math.round(pt.coordinates[2] * 100)}</td>
                        <td>{getOxideValue(pt.umf, 'SiO2')}</td>
                        <td>{getOxideValue(pt.umf, 'Al2O3')}</td>
                        <td>{getOxideValue(pt.umf, 'B2O3')}</td>
                        <td>{getOxideValue(pt.umf, 'Na2O')}</td>
                        <td>{getOxideValue(pt.umf, 'K2O')}</td>
                        <td>{getOxideValue(pt.umf, 'CaO')}</td>
                        <td>{getOxideValue(pt.umf, 'MgO')}</td>
                        <td>{siAl}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">△</div>
            <p>Enter three corner recipes and hit calculate</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              Division of 5 → {simplexPointCount(3, 5)} points, 10 → {simplexPointCount(3, 10)} points
            </p>
          </div>
        )}
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

export default TriaxialBlendPage

const actionBtn: React.CSSProperties = {
  padding: '4px 10px', background: 'var(--bg-input)', border: '1px solid var(--border-secondary)',
  borderRadius: 4, color: '#aaa', fontSize: 11, cursor: 'pointer',
}
