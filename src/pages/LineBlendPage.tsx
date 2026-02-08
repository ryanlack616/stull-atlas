/**
 * Line Blend Calculator Page
 * 
 * Two recipes, n steps between them.
 * The classic 10-step line blend test.
 */

import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipeInput } from '@/components/RecipeInput'
import { GlazeRecipe, SimplexPoint } from '@/types'
import { simplexBlend, simplexPointCount } from '@/calculator/blends/simplex'
import { recipeToUMF } from '@/calculator/umf'
import { materialDatabase } from '@/domain/material'
import { useRecipeStore } from '@/stores'
import { exportBlendCSV, printLabels } from '@/utils/export'
import { formatSiAlRatio, formatOxideDisplay, actionBtnStyle } from '@/utils/blend'
import { usePageTitle } from '@/hooks/usePageTitle'
import { calcStyles } from './calc-styles'

const CORNER_COLORS = ['#e74c3c', '#3498db']

export function LineBlendPage() {
  usePageTitle('Line Blend')
  const [recipes, setRecipes] = useState<(GlazeRecipe | null)[]>([null, null])
  const [divisions, setDivisions] = useState(10)
  const [results, setResults] = useState<SimplexPoint[] | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const { setBlendResults } = useRecipeStore()
  const navigate = useNavigate()
  const pointCount = simplexPointCount(2, divisions)

  const updateRecipe = useCallback((index: number, recipe: GlazeRecipe) => {
    setRecipes(prev => {
      const next = [...prev]
      next[index] = recipe
      return next
    })
    setResults(null)  // clear stale results
  }, [])

  const canCalculate = useMemo(() => {
    return recipes.every(r => 
      r && r.ingredients.some(ing => ing.material.trim() && ing.amount > 0)
    )
  }, [recipes])

  const calculate = useCallback(() => {
    if (!canCalculate) return
    setErrors([])

    const [a, b] = recipes as GlazeRecipe[]
    
    // Calculate UMFs
    const umfA = recipeToUMF(a, materialDatabase, 'digitalfire_2024')
    const umfB = recipeToUMF(b, materialDatabase, 'digitalfire_2024')

    const allErrors: string[] = [...umfA.errors, ...umfB.errors]
    
    if (!umfA.value || !umfB.value) {
      setErrors(allErrors.length > 0 ? allErrors : ['Could not calculate UMF for one or both recipes'])
      return
    }

    const result = simplexBlend(
      { type: 'line', recipes: [a, b], divisions },
      [umfA.value, umfB.value]
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
          <h2>Line Blend</h2>
          <p className="subtitle">
            Two glazes, blended in equal steps from 100:0 to 0:100
          </p>
        </div>

        <div className="calc-section">
          <h3>Recipes</h3>
          <RecipeInput
            label="Glaze A"
            color={CORNER_COLORS[0]}
            recipe={recipes[0]}
            onChange={r => updateRecipe(0, r)}
          />
          <RecipeInput
            label="Glaze B"
            color={CORNER_COLORS[1]}
            recipe={recipes[1]}
            onChange={r => updateRecipe(1, r)}
          />
        </div>

        <div className="calc-section">
          <h3>Divisions</h3>
          <div className="calc-controls">
            <div className="control-row">
              <input
                type="range"
                min="2"
                max="20"
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
          Calculate Line Blend
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
                    setBlendResults(results!)
                    navigate('/')
                  }}
                  style={actionBtnStyle}
                >
                  View on Explorer
                </button>
                <button
                  onClick={() => exportBlendCSV(
                    results!.map((pt, i) => ({
                      label: `${Math.round(pt.coordinates[0] * 100)}:${Math.round(pt.coordinates[1] * 100)}`,
                      umf: pt.umf,
                      meta: { 'A%': Math.round(pt.coordinates[0] * 100), 'B%': Math.round(pt.coordinates[1] * 100) },
                    })),
                    'line-blend.csv'
                  )}
                  style={actionBtnStyle}
                >
                  CSV
                </button>
                <button
                  onClick={() => printLabels(
                    results!.map((pt, i) => ({
                      label: `${Math.round(pt.coordinates[0] * 100)}A : ${Math.round(pt.coordinates[1] * 100)}B`,
                      umf: pt.umf,
                    }))
                  )}
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
                    <th>A%</th>
                    <th>B%</th>
                    <th>SiO₂</th>
                    <th>Al₂O₃</th>
                    <th>B₂O₃</th>
                    <th>Na₂O</th>
                    <th>K₂O</th>
                    <th>CaO</th>
                    <th>MgO</th>
                    <th>ZnO</th>
                    <th>Si:Al</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((pt, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{Math.round(pt.coordinates[0] * 100)}</td>
                      <td>{Math.round(pt.coordinates[1] * 100)}</td>
                      <td>{formatOxideDisplay(pt.umf, 'SiO2')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'Al2O3')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'B2O3')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'Na2O')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'K2O')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'CaO')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'MgO')}</td>
                      <td>{formatOxideDisplay(pt.umf, 'ZnO')}</td>
                      <td>{formatSiAlRatio(pt.umf)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">━━━</div>
            <p>Enter two glaze recipes and hit calculate</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              Materials are resolved against the Digitalfire database
            </p>
          </div>
        )}
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

export default LineBlendPage
