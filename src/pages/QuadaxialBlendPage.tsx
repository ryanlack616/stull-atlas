/**
 * Quadaxial Blend Calculator Page
 * 
 * Four corner recipes on a simplex tetrahedron.
 * Four-component systematic exploration.
 */

import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipeInput } from '@/components/RecipeInput'
import { GlazeRecipe, SimplexPoint, UMF } from '@/types'
import { simplexBlend, simplexPointCount } from '@/calculator/blends/simplex'
import { recipeToUMF } from '@/calculator/umf'
import { materialDatabase } from '@/domain/material'
import { useRecipeStore } from '@/stores'
import { exportBlendCSV, printLabels } from '@/utils/export'
import { formatSiAlRatio, formatOxideDisplay, actionBtnStyle } from '@/utils/blend'
import { usePageTitle } from '@/hooks/usePageTitle'
import { calcStyles } from './calc-styles'

const CORNER_COLORS = ['#e74c3c', '#2ecc71', '#3498db', '#f39c12']
const CORNER_LABELS = ['A', 'B', 'C', 'D']

export function QuadaxialBlendPage() {
  usePageTitle('Quadaxial Blend')
  const [recipes, setRecipes] = useState<(GlazeRecipe | null)[]>([null, null, null, null])
  const [divisions, setDivisions] = useState(4)
  const [results, setResults] = useState<SimplexPoint[] | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const { setBlendResults } = useRecipeStore()
  const navigate = useNavigate()

  const pointCount = simplexPointCount(4, divisions)

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
    const umfResults = recs.map(r => recipeToUMF(r, materialDatabase))

    const allErrors = umfResults.flatMap(u => u.errors)
    const umfs = umfResults.map(u => u.value)

    if (umfs.some(u => !u)) {
      setErrors(allErrors.length > 0 ? allErrors : ['Could not calculate UMF for one or more recipes'])
      return
    }

    const validUmfs = umfs.filter((u): u is UMF => u !== null)
    const result = simplexBlend(
      { type: 'quadaxial', recipes: recs, divisions },
      validUmfs
    )

    if (result.value) {
      setResults(result.value)
      setErrors([...result.warnings])
    } else {
      setErrors([...result.errors])
    }
  }, [recipes, divisions, canCalculate])

  return (
    <div className="calc-page">
      <div className="calc-sidebar" onKeyDown={e => { if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) calculate() }}>
        <div className="calc-section">
          <h2>Quadaxial Blend</h2>
          <p className="subtitle">
            Four corners on a simplex tetrahedron — systematic four-component exploration
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
                max="10"
                value={divisions}
                onChange={e => { setDivisions(Number(e.target.value)); setResults(null) }}
              />
              <span className="range-value">{divisions}</span>
            </div>
          </div>
          <div className="point-count">
            <strong>{pointCount}</strong> blend points
            {pointCount > 200 && (
              <span style={{ color: '#e67e22', marginLeft: 8 }}>
                (that's a lot of test tiles)
              </span>
            )}
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
          Calculate Quadaxial
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
                  style={actionBtnStyle}
                >View on Explorer</button>
                <button
                  onClick={() => exportBlendCSV(
                    results!.map(pt => ({
                      label: pt.coordinates.map((c,j) => `${Math.round(c*100)}${['A','B','C','D'][j]}`).join(':'),
                      umf: pt.umf,
                      meta: Object.fromEntries(pt.coordinates.map((c,j) => [`${['A','B','C','D'][j]}%`, Math.round(c*100)])),
                    })),
                    'quadaxial-blend.csv'
                  )}
                  style={actionBtnStyle}
                >CSV</button>
                <button
                  onClick={() => printLabels(results!.map(pt => ({
                    label: pt.coordinates.map((c,j) => `${Math.round(c*100)}${['A','B','C','D'][j]}`).join(':'),
                    umf: pt.umf,
                  })))}
                  style={actionBtnStyle}
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
                    <th style={{ color: CORNER_COLORS[3] }}>D%</th>
                    <th>SiO₂</th>
                    <th>Al₂O₃</th>
                    <th>B₂O₃</th>
                    <th>Na₂O</th>
                    <th>K₂O</th>
                    <th>CaO</th>
                    <th>Si:Al</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((pt, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{Math.round(pt.coordinates[0] * 100)}</td>
                      <td>{Math.round(pt.coordinates[1] * 100)}</td>
                      <td>{Math.round(pt.coordinates[2] * 100)}</td>
                      <td>{Math.round(pt.coordinates[3] * 100)}</td>
                      <td>{formatOxideDisplay(pt.umf, 'SiO2')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'Al2O3')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'B2O3')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'Na2O')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'K2O')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'CaO')}</td>
                      <td>{formatSiAlRatio(pt.umf)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">◇</div>
            <p>Enter four corner recipes and hit calculate</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              Division of 4 → {simplexPointCount(4, 4)} points, 
              {' '}6 → {simplexPointCount(4, 6)} points
            </p>
          </div>
        )}
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

export default QuadaxialBlendPage
