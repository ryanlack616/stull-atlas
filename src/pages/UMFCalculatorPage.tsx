/**
 * UMF Calculator Page
 * 
 * The fundamental tool: enter a recipe, see its Unity Molecular Formula.
 * Shows oxide breakdown, validation, surface prediction, and cone limits.
 */

import React, { useState, useCallback } from 'react'
import { RecipeInput } from '@/components/RecipeInput'
import { TraceViewer } from '@/components/TraceViewer'
import { GlazeRecipe, UMF, OxideSymbol, ValidationIssue, CalculationStep } from '@/types'
import { recipeToUMF, getOxideValue } from '@/calculator/umf'
import { PRECISION } from '@/calculator/constants'
import { ALL_CONES } from '@/calculator/parseCone'
import { validateUMFAgainstLimits, validateRecipe, predictSurface, type StullPrediction } from '@/calculator/validation'
import { materialDatabase } from '@/domain/material'
import { useRecipeStore } from '@/stores'
import { exportRecipeCSV } from '@/utils/export'
import { usePageTitle } from '@/hooks/usePageTitle'
import { UMFFingerprint, FluxDonut, OxideRadar } from '@/components/UMFVisuals'
import { calcStyles } from './calc-styles'

const FLUX_OXIDES: OxideSymbol[] = ['Li2O', 'Na2O', 'K2O', 'MgO', 'CaO', 'SrO', 'BaO', 'ZnO', 'PbO']
const STABILIZER_OXIDES: OxideSymbol[] = ['Al2O3', 'B2O3', 'Fe2O3']
const GLASS_FORMER_OXIDES: OxideSymbol[] = ['SiO2', 'TiO2', 'ZrO2', 'SnO2']

const SURFACE_LABELS: Record<StullPrediction, { label: string; color: string }> = {
  matte:     { label: 'Matte',      color: '#4caf50' },
  satin:     { label: 'Satin',      color: '#8bc34a' },
  gloss:     { label: 'Gloss',      color: '#2196f3' },
  underfired:{ label: 'Underfired',  color: '#9e9e9e' },
  crazed:    { label: 'Crazed',     color: '#f44336' },
  unknown:   { label: 'Unknown',    color: '#666' },
}

export function UMFCalculatorPage() {
  usePageTitle('UMF Calculator')
  const [recipe, setRecipe] = useState<GlazeRecipe | null>(null)
  const [umf, setUMF] = useState<UMF | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [warnings, setWarnings] = useState<string[]>([])
  const [limitsIssues, setLimitsIssues] = useState<ValidationIssue[]>([])
  const [surface, setSurface] = useState<StullPrediction | null>(null)
  const [recipeWarnings, setRecipeWarnings] = useState<string[]>([])
  const [recipeSuggestions, setRecipeSuggestions] = useState<string[]>([])
  const [cone, setCone] = useState('6')
  const [saved, setSaved] = useState(false)
  const [trace, setTrace] = useState<CalculationStep[]>([])
  const [resolvedIngredients, setResolvedIngredients] = useState<{ name: string; resolved: string | null; amount: number; discontinued: boolean }[]>([])

  const { saveRecipe } = useRecipeStore()

  const calculate = useCallback(() => {
    if (!recipe) return
    setErrors([])
    setWarnings([])
    setLimitsIssues([])
    setSurface(null)
    setRecipeWarnings([])
    setRecipeSuggestions([])
    setSaved(false)

    // Validate recipe structure
    const recipeVal = validateRecipe(recipe)
    setRecipeWarnings(recipeVal.warnings)
    setRecipeSuggestions(recipeVal.suggestions)

    if (!recipeVal.valid) {
      setErrors(recipeVal.errors)
      return
    }

    // Calculate UMF
    const result = recipeToUMF(recipe, materialDatabase, 'digitalfire_2024')

    // Build resolved ingredients summary
    const total = recipe.ingredients.reduce((s, ing) => s + (ing.amount || 0), 0)
    const resolvedList = recipe.ingredients
      .filter(ing => ing.material.trim() && ing.amount > 0)
      .map(ing => {
        const mat = materialDatabase.resolve(ing.material.trim(), 'digitalfire_2024')
        return {
          name: ing.material.trim(),
          resolved: mat ? mat.primaryName : null,
          amount: total > 0 ? (ing.amount / total) * 100 : 0,
          discontinued: mat?.discontinued || false,
        }
      })
    setResolvedIngredients(resolvedList)

    // Store trace for "Show Your Work"
    setTrace(result.trace || [])

    if (result.value) {
      setUMF(result.value)
      setWarnings(result.warnings)

      // Validate against cone limits
      const issues = validateUMFAgainstLimits(result.value, cone)
      setLimitsIssues(issues)

      // Predict surface
      const pred = predictSurface(result.value)
      setSurface(pred)
    } else {
      setErrors(result.errors)
    }
  }, [recipe, cone])

  const canCalculate = recipe && recipe.ingredients.some(ing => ing.material.trim() && ing.amount > 0)

  const handleSave = useCallback(() => {
    if (!recipe) return
    saveRecipe(recipe)
    setSaved(true)
  }, [recipe, saveRecipe])

  const renderOxideRow = (oxide: OxideSymbol, label?: string) => {
    if (!umf) return null
    const val = getOxideValue(umf, oxide)
    if (val < 0.001) return null
    return (
      <tr key={oxide}>
        <td>{label || oxide}</td>
        <td>{val.toFixed(PRECISION.umfOxide)}</td>
        <td>
          {limitsIssues
            .filter(i => i.oxide === oxide || (oxide === 'Na2O' && i.oxide === 'K2O+Na2O') || (oxide === 'K2O' && i.oxide === 'K2O+Na2O'))
            .map((issue, j) => (
              <span key={j} style={{ color: issue.severity === 'error' ? '#e74c3c' : '#e67e22', fontSize: 12 }}>
                {issue.severity === 'error' ? '⛔' : '⚠'} {issue.message}
              </span>
            ))
          }
        </td>
      </tr>
    )
  }

  return (
    <div className="calc-page">
      <div className="calc-sidebar" onKeyDown={e => { if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) calculate() }}>
        <div className="calc-section">
          <h2>UMF Calculator</h2>
          <p className="subtitle">
            Enter a recipe → see its Unity Molecular Formula
          </p>
        </div>

        <div className="calc-section">
          <h3>Recipe</h3>
          <RecipeInput
            label="My Glaze"
            color="#6366F1"
            recipe={recipe}
            onChange={setRecipe}
          />
        </div>

        <div className="calc-section">
          <h3>Target Cone</h3>
          <div className="calc-controls">
            <div className="control-row">
              <select
                value={cone}
                onChange={e => { setCone(e.target.value); setUMF(null) }}
                style={{ flex: 1, padding: '8px 10px', background: 'var(--bg-input)', border: '1px solid var(--border-secondary)', borderRadius: 6, color: 'var(--text-bright)', fontSize: 14 }}
              >
                {ALL_CONES.map(c => (
                  <option key={c} value={c}>Cone {c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {recipeWarnings.length > 0 && (
          <div className="calc-section">
            {recipeWarnings.map((w, i) => (
              <p key={i} style={{ color: '#e67e22', fontSize: 12, margin: '4px 0' }}>⚠ {w}</p>
            ))}
          </div>
        )}

        {recipeSuggestions.length > 0 && (
          <div className="calc-section">
            {recipeSuggestions.map((s, i) => (
              <p key={i} style={{ color: '#818CF8', fontSize: 12, margin: '4px 0' }}>💡 {s}</p>
            ))}
          </div>
        )}

        {errors.length > 0 && (
          <div className="calc-section">
            {errors.map((err, i) => (
              <p key={i} style={{ color: '#e74c3c', fontSize: 13, margin: '4px 0' }}>⛔ {err}</p>
            ))}
          </div>
        )}

        <button className="calc-button" onClick={calculate} disabled={!canCalculate}>
          Calculate UMF
        </button>

        {umf && (
          <button
            className="calc-button"
            onClick={handleSave}
            style={{ background: saved ? '#2d5a27' : 'var(--bg-input)', borderColor: saved ? '#4caf50' : 'var(--border-secondary)', marginTop: 4 }}
          >
            {saved ? '✓ Saved' : 'Save Recipe'}
          </button>
        )}

        {umf && recipe && (
          <button
            className="calc-button"
            onClick={() => exportRecipeCSV(recipe, umf)}
            style={{ background: 'var(--bg-input)', borderColor: 'var(--border-secondary)', marginTop: 4 }}
          >
            Export CSV
          </button>
        )}
      </div>

      <div className="calc-main">
        {umf ? (
          <>
            {/* Surface prediction */}
            {surface && (
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 20px', background: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-primary)' }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 4 }}>Predicted Surface</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: SURFACE_LABELS[surface].color }}>
                    {SURFACE_LABELS[surface].label}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>SiO₂:Al₂O₃ ratio</div>
                  <div style={{ fontSize: 18, fontFamily: "'SF Mono', monospace" }}>
                    {umf._meta?.SiO2_Al2O3_ratio?.toFixed(1) ?? '—'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>R₂O:RO ratio</div>
                  <div style={{ fontSize: 18, fontFamily: "'SF Mono', monospace" }}>
                    {umf._meta?.R2O_RO_ratio?.toFixed(2) ?? '—'}
                  </div>
                </div>
              </div>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
              <div style={{ padding: '12px 16px', background: '#2a2200', border: '1px solid #554400', borderRadius: 8 }}>
                {warnings.map((w, i) => (
                  <p key={i} style={{ color: '#e67e22', fontSize: 13, margin: '2px 0' }}>⚠ {w}</p>
                ))}
              </div>
            )}

            {/* UMF Visuals */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '12px 20px', background: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-primary)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <FluxDonut umf={umf} size={72} />
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Flux Unity</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>Oxide Fingerprint</span>
                  <UMFFingerprint umf={umf} showLabels width={280} height={18} />
                </div>
                <OxideRadar umf={umf} size={160} />
              </div>
            </div>

            {/* UMF Table */}
            <div className="results-panel">
              <div className="results-header">
                <h3>Unity Molecular Formula — Cone {cone}</h3>
              </div>
              <div style={{ padding: '0 16px 16px' }}>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Oxide</th>
                      <th>UMF Value</th>
                      <th>Limits Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Fluxes */}
                    <tr><td colSpan={3} style={{ color: 'var(--text-secondary)', fontWeight: 600, paddingTop: 12, borderBottom: '1px solid var(--border-secondary)' }}>Fluxes (R₂O + RO) — sum to 1.0</td></tr>
                    {FLUX_OXIDES.map(o => renderOxideRow(o))}

                    {/* Stabilizers */}
                    <tr><td colSpan={3} style={{ color: 'var(--text-secondary)', fontWeight: 600, paddingTop: 12, borderBottom: '1px solid var(--border-secondary)' }}>Stabilizers (R₂O₃)</td></tr>
                    {STABILIZER_OXIDES.map(o => renderOxideRow(o))}

                    {/* Glass formers */}
                    <tr><td colSpan={3} style={{ color: 'var(--text-secondary)', fontWeight: 600, paddingTop: 12, borderBottom: '1px solid var(--border-secondary)' }}>Glass Formers (RO₂)</td></tr>
                    {GLASS_FORMER_OXIDES.map(o => renderOxideRow(o))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Resolved Materials */}
            {resolvedIngredients.length > 0 && (
              <div className="results-panel">
                <div className="results-header">
                  <h3>Recipe Breakdown</h3>
                </div>
                <div style={{ padding: '0 16px 16px' }}>
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Ingredient</th>
                        <th>Resolved As</th>
                        <th>Weight %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resolvedIngredients.map((ri, i) => (
                        <tr key={i}>
                          <td style={{ fontFamily: 'inherit' }}>{ri.name}</td>
                          <td style={{
                            fontFamily: 'inherit',
                            color: ri.resolved
                              ? (ri.discontinued ? '#f59e0b' : 'var(--text-bright)')
                              : '#ef4444',
                          }}>
                            {ri.resolved || '✗ unresolved'}
                            {ri.discontinued && <span style={{ marginLeft: 6, fontSize: 10, color: '#f59e0b' }}>discontinued</span>}
                          </td>
                          <td style={{ fontFamily: "'SF Mono', monospace" }}>{ri.amount.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Calculation Trace */}
            {trace.length > 0 && (
              <TraceViewer trace={trace} />
            )}

            {/* Limit issues summary */}
            {limitsIssues.length > 0 && (
              <div className="results-panel">
                <div className="results-header">
                  <h3>Cone {cone} Limit Warnings</h3>
                </div>
                <div style={{ padding: '12px 16px' }}>
                  {limitsIssues.map((issue, i) => (
                    <div key={i} style={{
                      padding: '8px 12px',
                      marginBottom: 4,
                      borderRadius: 6,
                      background: issue.severity === 'error' ? '#2a1515' : '#2a2200',
                      border: `1px solid ${issue.severity === 'error' ? '#551515' : '#554400'}`,
                      fontSize: 13,
                      color: issue.severity === 'error' ? '#e74c3c' : '#e67e22',
                    }}>
                      {issue.severity === 'error' ? '⛔' : '⚠'} {issue.message}
                      <span style={{ float: 'right', color: 'var(--text-secondary)' }}>
                        range: {issue.limit.min}–{issue.limit.max}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="icon">⚗</div>
            <p>Enter a recipe and hit Calculate</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              Materials resolved against Digitalfire database
            </p>
          </div>
        )}
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

export default UMFCalculatorPage
