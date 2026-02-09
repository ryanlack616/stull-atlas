/**
 * Recipe Optimizer Page
 *
 * Pick materials, set UMF targets (or ranges), and let the solver find a recipe.
 * Shows the resulting recipe, UMF breakdown, and how well each target was met.
 */

import React, { useState, useCallback, useMemo } from 'react'
import { OxideSymbol } from '@/types'
import { materialDatabase } from '@/domain/material'
import { optimizeRecipe, type OptimizerInput, type OptimizerResult, type OxideTarget } from '@/calculator/optimizer'
import { optimizeRecipeGA, type GAResult, type GAConfig } from '@/calculator/geneticOptimizer'
import { analyzeResponseSurface, type RSMAnalysis } from '@/calculator/responseSurface'
import { CONE_LIMITS } from '@/calculator/validation'
import { usePageTitle } from '@/hooks/usePageTitle'
import { OxideLink } from '@/components/UMFVisuals/OxideLink'
import { calcStyles } from './calc-styles'

const COMMON_OXIDES: OxideSymbol[] = ['SiO2', 'Al2O3', 'B2O3', 'Na2O', 'K2O', 'CaO', 'MgO', 'ZnO', 'BaO']
const ALL_MATERIALS = materialDatabase.getAllMaterials()

const PRESET_TARGETS: Record<string, OxideTarget[]> = {
  'Cone 6 Gloss': [
    { oxide: 'SiO2', target: 3.5, weight: 2 },
    { oxide: 'Al2O3', target: 0.35, weight: 2 },
    { oxide: 'CaO', min: 0.3, max: 0.5 },
    { oxide: 'Na2O', min: 0.1, max: 0.3 },
    { oxide: 'K2O', min: 0.05, max: 0.2 },
  ],
  'Cone 6 Satin': [
    { oxide: 'SiO2', target: 3.0, weight: 2 },
    { oxide: 'Al2O3', target: 0.4, weight: 2 },
    { oxide: 'CaO', min: 0.3, max: 0.5 },
    { oxide: 'MgO', min: 0.1, max: 0.25 },
  ],
  'Cone 6 Matte': [
    { oxide: 'SiO2', target: 2.8, weight: 2 },
    { oxide: 'Al2O3', target: 0.5, weight: 2 },
    { oxide: 'CaO', min: 0.35, max: 0.6 },
    { oxide: 'MgO', min: 0.15, max: 0.3 },
  ],
  'Cone 10 Gloss': [
    { oxide: 'SiO2', target: 4.0, weight: 2 },
    { oxide: 'Al2O3', target: 0.4, weight: 2 },
    { oxide: 'CaO', min: 0.4, max: 0.6 },
    { oxide: 'K2O', min: 0.1, max: 0.3 },
  ],
  'Low Fire Clear (06)': [
    { oxide: 'SiO2', target: 2.2, weight: 2 },
    { oxide: 'Al2O3', target: 0.15, weight: 2 },
    { oxide: 'B2O3', min: 0.3, max: 0.6 },
    { oxide: 'Na2O', min: 0.3, max: 0.5 },
  ],
}

const COMMON_PALETTES: Record<string, string[]> = {
  'Basic Cone 6': ['custer-feldspar', 'silica', 'epk', 'whiting', 'talc', 'zinc-oxide'],
  'Basic Cone 10': ['custer-feldspar', 'silica', 'epk', 'whiting', 'dolomite'],
  'Low Fire': ['ferro-frit-3134', 'ferro-frit-3124', 'silica', 'epk', 'whiting'],
  'Soda Fire': ['nepheline-syenite', 'silica', 'epk', 'whiting', 'talc'],
}

export function OptimizerPage() {
  usePageTitle('Recipe Optimizer')

  // Materials
  const [selectedMats, setSelectedMats] = useState<string[]>([])
  const [matSearch, setMatSearch] = useState('')

  // Targets
  const [targets, setTargets] = useState<OxideTarget[]>([
    { oxide: 'SiO2', target: 3.5, weight: 2 },
    { oxide: 'Al2O3', target: 0.35, weight: 2 },
  ])

  // Result
  const [result, setResult] = useState<OptimizerResult | null>(null)
  const [gaResult, setGAResult] = useState<GAResult | null>(null)
  const [rsmAnalysis, setRSMAnalysis] = useState<RSMAnalysis | null>(null)
  const [running, setRunning] = useState(false)
  const [method, setMethod] = useState<'gradient' | 'genetic'>('gradient')

  // Material search
  const filteredMaterials = useMemo(() => {
    if (!matSearch.trim()) return ALL_MATERIALS.slice(0, 30)
    const q = matSearch.toLowerCase()
    return ALL_MATERIALS
      .filter(m =>
        m.primaryName.toLowerCase().includes(q) ||
        m.aliases.some(a => a.toLowerCase().includes(q))
      )
      .slice(0, 30)
  }, [matSearch])

  const addMaterial = useCallback((id: string) => {
    setSelectedMats(prev => prev.includes(id) ? prev : [...prev, id])
    setMatSearch('')
  }, [])

  const removeMaterial = useCallback((id: string) => {
    setSelectedMats(prev => prev.filter(x => x !== id))
  }, [])

  // Target management
  const addTarget = useCallback((oxide: OxideSymbol) => {
    setTargets(prev => {
      if (prev.some(t => t.oxide === oxide)) return prev
      return [...prev, { oxide, target: 0.3, weight: 1 }]
    })
  }, [])

  const removeTarget = useCallback((oxide: OxideSymbol) => {
    setTargets(prev => prev.filter(t => t.oxide !== oxide))
  }, [])

  const updateTarget = useCallback((oxide: OxideSymbol, field: string, value: number | undefined) => {
    setTargets(prev => prev.map(t =>
      t.oxide === oxide ? { ...t, [field]: value } : t
    ))
  }, [])

  const applyPreset = useCallback((name: string) => {
    const preset = PRESET_TARGETS[name]
    if (preset) setTargets(preset)
  }, [])

  const applyPalette = useCallback((name: string) => {
    const ids = COMMON_PALETTES[name]
    if (ids) setSelectedMats(ids)
  }, [])

  // Run optimizer
  const run = useCallback(() => {
    if (selectedMats.length < 2 || targets.length === 0) return
    setRunning(true)
    setRSMAnalysis(null)
    // Use setTimeout so React can render the "Solving..." state before heavy work blocks the thread
    setTimeout(() => {
      const dbWrapper = {
        resolve(name: string) {
          return materialDatabase.resolve(name, 'digitalfire_2024') ??
                 materialDatabase.getMaterial(name) ?? null
        },
        getAnalysis(id: string) {
          return materialDatabase.getAnalysis(id, 'digitalfire_2024')
        },
      }

      if (method === 'genetic') {
        const gaConfig: GAConfig = {
          materialIds: selectedMats,
          targets,
          datasetId: 'digitalfire_2024',
          populationSize: 80,
          generations: 200,
          tolerance: 0.02,
        }
        const ga = optimizeRecipeGA(gaConfig, dbWrapper as any)
        setGAResult(ga)
        setResult(ga.best)

        // Also run RSM analysis on the best result
        if (ga.best.weights.length > 0) {
          const fractionalWeights = ga.best.weights.map(w => w / 100)
          const rsm = analyzeResponseSurface(
            fractionalWeights, selectedMats, targets, 'digitalfire_2024', dbWrapper as any
          )
          setRSMAnalysis(rsm)
        }
      } else {
        const input: OptimizerInput = {
          materialIds: selectedMats,
          targets,
          datasetId: 'digitalfire_2024',
          maxIterations: 3000,
          tolerance: 0.02,
        }
        const res = optimizeRecipe(input, dbWrapper as any)
        setResult(res)
        setGAResult(null)

        // RSM analysis
        if (res.weights.length > 0) {
          const fractionalWeights = res.weights.map(w => w / 100)
          const rsm = analyzeResponseSurface(
            fractionalWeights, selectedMats, targets, 'digitalfire_2024', dbWrapper as any
          )
          setRSMAnalysis(rsm)
        }
      }
      setRunning(false)
    }, 16)
  }, [selectedMats, targets, method])

  const canRun = selectedMats.length >= 2 && targets.length > 0 && !running

  return (
    <>
      <style>{calcStyles}</style>
      <style>{optimizerStyles}</style>
      <div className="calc-page">
        {/* Sidebar: Inputs */}
        <div className="calc-sidebar">
          <div className="calc-section">
            <h2>Recipe Optimizer</h2>
            <p className="subtitle">Select materials and set target chemistry. The solver finds a recipe.</p>
          </div>

          {/* Material Palette Presets */}
          <div className="calc-section">
            <h3>Material Palettes</h3>
            <div className="preset-row">
              {Object.keys(COMMON_PALETTES).map(name => (
                <button key={name} className="preset-btn" onClick={() => applyPalette(name)}>{name}</button>
              ))}
            </div>
          </div>

          {/* Material Selection */}
          <div className="calc-section">
            <h3>Materials ({selectedMats.length})</h3>
            <input
              className="material-input"
              type="text"
              placeholder="Search materials..."
              value={matSearch}
              onChange={e => setMatSearch(e.target.value)}
              aria-label="Search materials to add"
            />
            {matSearch.trim() && (
              <div className="mat-dropdown" role="listbox" aria-label="Available materials">
                {filteredMaterials.map(m => (
                  <button
                    key={m.id}
                    className="mat-option"
                    onClick={() => addMaterial(m.id)}
                    role="option"
                    aria-selected={selectedMats.includes(m.id)}
                  >
                    {m.primaryName}
                    <span className="mat-cat">{m.category}</span>
                  </button>
                ))}
                {filteredMaterials.length === 0 && (
                  <div className="mat-empty">No materials found</div>
                )}
              </div>
            )}
            <div className="selected-mats" role="list" aria-label="Selected materials">
              {selectedMats.map(id => {
                const m = materialDatabase.getMaterial(id)
                return (
                  <div key={id} className="selected-mat" role="listitem">
                    <span>{m?.primaryName ?? id}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeMaterial(id)}
                      aria-label={`Remove ${m?.primaryName ?? id}`}
                    >×</button>
                  </div>
                )
              })}
              {selectedMats.length === 0 && (
                <p className="hint">Pick 2+ materials or choose a palette above</p>
              )}
            </div>
          </div>

          {/* Target Presets */}
          <div className="calc-section">
            <h3>Target Presets</h3>
            <div className="preset-row">
              {Object.keys(PRESET_TARGETS).map(name => (
                <button key={name} className="preset-btn" onClick={() => applyPreset(name)}>{name}</button>
              ))}
            </div>
          </div>

          {/* Oxide Targets */}
          <div className="calc-section">
            <h3>Oxide Targets</h3>
            <div className="targets-list" role="list" aria-label="Oxide targets">
              {targets.map(t => (
                <div key={t.oxide} className="target-row" role="listitem">
                  <span className="target-oxide">{t.oxide}</span>
                  <label className="target-field">
                    <span>Target</span>
                    <input
                      type="number"
                      step="0.05"
                      value={t.target ?? ''}
                      onChange={e => updateTarget(t.oxide, 'target', e.target.value ? +e.target.value : undefined)}
                      aria-label={`${t.oxide} target value`}
                    />
                  </label>
                  <label className="target-field">
                    <span>Min</span>
                    <input
                      type="number"
                      step="0.05"
                      value={t.min ?? ''}
                      onChange={e => updateTarget(t.oxide, 'min', e.target.value ? +e.target.value : undefined)}
                      aria-label={`${t.oxide} minimum`}
                    />
                  </label>
                  <label className="target-field">
                    <span>Max</span>
                    <input
                      type="number"
                      step="0.05"
                      value={t.max ?? ''}
                      onChange={e => updateTarget(t.oxide, 'max', e.target.value ? +e.target.value : undefined)}
                      aria-label={`${t.oxide} maximum`}
                    />
                  </label>
                  <button
                    className="remove-btn"
                    onClick={() => removeTarget(t.oxide)}
                    aria-label={`Remove ${t.oxide} target`}
                  >×</button>
                </div>
              ))}
            </div>
            <div className="add-oxide-row">
              {COMMON_OXIDES.filter(o => !targets.some(t => t.oxide === o)).map(o => (
                <button key={o} className="add-oxide-btn" onClick={() => addTarget(o)}>{o}</button>
              ))}
            </div>
          </div>

          {/* Method Toggle */}
          <div className="calc-section">
            <h3>Method</h3>
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                className={`preset-btn ${method === 'gradient' ? 'preset-active' : ''}`}
                onClick={() => setMethod('gradient')}
                style={method === 'gradient' ? { borderColor: 'var(--accent)', color: 'var(--text-bright)', background: 'var(--accent-bg)' } : {}}
              >
                Gradient
              </button>
              <button
                className={`preset-btn ${method === 'genetic' ? 'preset-active' : ''}`}
                onClick={() => setMethod('genetic')}
                style={method === 'genetic' ? { borderColor: 'var(--accent)', color: 'var(--text-bright)', background: 'var(--accent-bg)' } : {}}
              >
                Genetic (GA)
              </button>
            </div>
            <p className="hint" style={{ marginTop: 4 }}>
              {method === 'gradient'
                ? 'Fast convergence for well-defined targets'
                : 'Explores diverse solutions; finds multiple alternatives'}
            </p>
          </div>

          {/* Run Button */}
          <button
            className="calc-button"
            onClick={run}
            disabled={!canRun}
            aria-busy={running}
          >
            {running ? 'Optimizing...' : method === 'genetic' ? 'Evolve Recipe' : 'Find Recipe'}
          </button>
        </div>

        {/* Main: Results */}
        <div className="calc-main">
          {!result && !running && (
            <div className="empty-state">
              <div className="icon" aria-hidden="true">🧪</div>
              <p>Select materials, set targets, then click "Find Recipe"</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                The optimizer adjusts proportions to match your target UMF chemistry
              </p>
            </div>
          )}

          {running && (
            <div className="empty-state">
              <div className="icon" aria-hidden="true">⏳</div>
              <p>Solving...</p>
            </div>
          )}

          {result && !running && (
            <div className="optimizer-results">
              {/* Summary */}
              <div className={`opt-summary ${result.converged ? 'converged' : 'partial'}`} role="status">
                <span className="opt-status">{result.converged ? '✓ Converged' : '⚠ Partial'}</span>
                <span className="opt-detail">{result.summary}</span>
              </div>

              {/* Recipe */}
              <div className="results-panel">
                <div className="results-header">
                  <h3>Optimized Recipe</h3>
                </div>
                <div className="results-scroll">
                  <table className="results-table" aria-label="Optimized recipe proportions">
                    <thead>
                      <tr>
                        <th scope="col">Material</th>
                        <th scope="col" style={{ textAlign: 'right' }}>Amount</th>
                        <th scope="col" style={{ textAlign: 'right' }}>Batch (100g)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.materialNames
                        .map((name, i) => ({ name, weight: result.weights[i] }))
                        .filter(r => r.weight > 0.1)
                        .sort((a, b) => b.weight - a.weight)
                        .map(({ name, weight }) => (
                          <tr key={name}>
                            <td>{name}</td>
                            <td style={{ textAlign: 'right' }}>{weight.toFixed(1)}%</td>
                            <td style={{ textAlign: 'right' }}>{weight.toFixed(1)}g</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* UMF Result */}
              <div className="results-panel">
                <div className="results-header">
                  <h3>Resulting UMF</h3>
                </div>
                <div className="results-scroll">
                  <table className="results-table" aria-label="Resulting Unity Molecular Formula">
                    <thead>
                      <tr>
                        <th scope="col">Group</th>
                        <th scope="col">Oxide</th>
                        <th scope="col" style={{ textAlign: 'right' }}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderUMFGroup('Fluxes (R₂O)', ['Li2O', 'Na2O', 'K2O'], result.umf)}
                      {renderUMFGroup('Fluxes (RO)', ['MgO', 'CaO', 'SrO', 'BaO', 'ZnO'], result.umf)}
                      {renderUMFGroup('Stabilizers', ['Al2O3', 'B2O3', 'Fe2O3'], result.umf)}
                      {renderUMFGroup('Glass Formers', ['SiO2', 'TiO2', 'ZrO2'], result.umf)}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Target Satisfaction */}
              <div className="results-panel">
                <div className="results-header">
                  <h3>Target Results</h3>
                </div>
                <div className="results-scroll">
                  <table className="results-table" aria-label="How well each target was met">
                    <thead>
                      <tr>
                        <th scope="col">Oxide</th>
                        <th scope="col" style={{ textAlign: 'right' }}>Target</th>
                        <th scope="col" style={{ textAlign: 'right' }}>Actual</th>
                        <th scope="col" style={{ textAlign: 'right' }}>Delta</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.targetResults.map(tr => (
                        <tr key={tr.oxide}>
                          <td><OxideLink oxide={tr.oxide} /></td>
                          <td style={{ textAlign: 'right' }}>
                            {tr.target !== null
                              ? tr.target.toFixed(2)
                              : `${tr.min?.toFixed(2) ?? '—'}–${tr.max?.toFixed(2) ?? '—'}`}
                          </td>
                          <td style={{ textAlign: 'right' }}>{tr.actual.toFixed(3)}</td>
                          <td style={{ textAlign: 'right', color: tr.satisfied ? 'var(--text-muted)' : 'var(--warning)' }}>
                            {tr.delta > 0 ? '+' : ''}{tr.delta.toFixed(3)}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className={`status-badge ${tr.satisfied ? 'met' : 'unmet'}`}>
                              {tr.satisfied ? '✓' : '✗'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RSM Sensitivity Analysis */}
              {rsmAnalysis && (
                <div className="results-panel">
                  <div className="results-header">
                    <h3>Sensitivity Analysis (RSM)</h3>
                  </div>
                  <div className="results-scroll">
                    <div style={{ padding: '8px 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                      {rsmAnalysis.interpretation}
                    </div>
                    <div style={{
                      display: 'inline-block', padding: '4px 10px', borderRadius: 4, fontSize: 12, fontWeight: 600, marginBottom: 8,
                      background: rsmAnalysis.stabilityLabel === 'very stable' ? 'rgba(76,175,80,.15)' :
                                  rsmAnalysis.stabilityLabel === 'stable' ? 'rgba(76,175,80,.1)' :
                                  rsmAnalysis.stabilityLabel === 'moderate' ? 'rgba(230,126,34,.12)' :
                                  'rgba(244,67,54,.12)',
                      color: rsmAnalysis.stabilityLabel === 'very stable' || rsmAnalysis.stabilityLabel === 'stable' ? '#4caf50' :
                             rsmAnalysis.stabilityLabel === 'moderate' ? '#e67e22' : '#e74c3c',
                    }}>
                      Stability: {rsmAnalysis.stabilityLabel} ({(rsmAnalysis.stability * 100).toFixed(0)}%)
                    </div>
                    <table className="results-table" aria-label="Material sensitivity analysis">
                      <thead>
                        <tr>
                          <th scope="col">Material</th>
                          <th scope="col" style={{ textAlign: 'right' }}>Sensitivity</th>
                          <th scope="col" style={{ textAlign: 'center' }}>Direction</th>
                          <th scope="col">Dominant Oxide</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rsmAnalysis.sensitivities.filter(s => s.sensitivity > 0.01).map(s => (
                          <tr key={s.material}>
                            <td>{s.material}</td>
                            <td style={{ textAlign: 'right' }}>{s.sensitivity.toFixed(3)}</td>
                            <td style={{ textAlign: 'center' }}>
                              {s.direction === 'increase' ? '↑ more' : s.direction === 'decrease' ? '↓ less' : '— stable'}
                            </td>
                            <td style={{ color: 'var(--text-muted)' }}>{s.dominantOxide}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* GA Alternatives */}
              {gaResult && gaResult.alternatives.length > 0 && (
                <div className="results-panel">
                  <div className="results-header">
                    <h3>Alternative Recipes ({gaResult.alternatives.length})</h3>
                  </div>
                  <div className="results-scroll">
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 8px' }}>
                      Diverse solutions found by the genetic algorithm
                    </p>
                    {gaResult.alternatives.map((alt, ai) => (
                      <div key={ai} style={{
                        padding: '8px 10px', marginBottom: 6,
                        background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)',
                        borderRadius: 6,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600 }}>Alternative {ai + 1}</span>
                          <span className={`status-badge ${alt.converged ? 'met' : 'unmet'}`} style={{ fontSize: 10 }}>
                            {alt.converged ? '✓' : `residual ${alt.residual.toFixed(4)}`}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontSize: 11 }}>
                          {alt.materialNames
                            .map((n, i) => ({ name: n, w: alt.weights[i] }))
                            .filter(r => r.w > 0.5)
                            .sort((a, b) => b.w - a.w)
                            .map(r => (
                              <span key={r.name} style={{ color: 'var(--text-label)' }}>
                                {r.name} {r.w.toFixed(1)}%
                              </span>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function renderUMFGroup(label: string, oxides: OxideSymbol[], umf: Partial<Record<OxideSymbol, number>>) {
  const rows = oxides.filter(o => (umf[o] ?? 0) > 0.001)
  if (rows.length === 0) return null
  return (
    <>
      {rows.map((o, i) => (
        <tr key={o}>
          {i === 0 && <td rowSpan={rows.length} style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</td>}
          <td><OxideLink oxide={o} /></td>
          <td style={{ textAlign: 'right' }}>{(umf[o] ?? 0).toFixed(3)}</td>
        </tr>
      ))}
    </>
  )
}

const optimizerStyles = `
  /* Material selection */
  .mat-dropdown {
    background: var(--bg-elevated);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 4px;
  }

  .mat-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 6px 10px;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 13px;
    cursor: pointer;
    text-align: left;
  }

  .mat-option:hover {
    background: var(--bg-hover);
  }

  .mat-cat {
    font-size: 11px;
    color: var(--text-muted);
  }

  .mat-empty {
    padding: 8px;
    font-size: 12px;
    color: var(--text-muted);
    text-align: center;
  }

  .selected-mats {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
  }

  .selected-mat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    font-size: 13px;
  }

  .hint {
    font-size: 12px;
    color: var(--text-muted);
    margin: 4px 0;
  }

  /* Presets */
  .preset-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .preset-btn {
    padding: 4px 10px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-label);
    font-size: 11px;
    cursor: pointer;
    white-space: nowrap;
  }

  .preset-btn:hover {
    border-color: var(--accent);
    color: var(--text-bright);
  }

  /* Targets */
  .targets-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .target-row {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    padding: 6px 8px;
    background: var(--bg-tertiary);
    border-radius: 6px;
    flex-wrap: wrap;
  }

  .target-oxide {
    font-weight: 600;
    font-size: 13px;
    min-width: 48px;
    color: var(--text-bright);
    align-self: center;
  }

  .target-field {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 10px;
    color: var(--text-muted);
  }

  .target-field input {
    width: 60px;
    padding: 4px 6px;
    background: var(--bg-input);
    border: 1px solid var(--border-input);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 12px;
    font-family: 'SF Mono', 'Fira Code', monospace;
  }

  .target-field input:focus {
    border-color: var(--accent);
    outline: none;
  }

  .add-oxide-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 6px;
  }

  .add-oxide-btn {
    padding: 3px 8px;
    background: transparent;
    border: 1px dashed var(--border-secondary);
    border-radius: 4px;
    color: var(--text-dim);
    font-size: 11px;
    cursor: pointer;
  }

  .add-oxide-btn:hover {
    border-color: var(--accent);
    color: var(--text-label);
  }

  /* Results */
  .optimizer-results {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .opt-summary {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .opt-summary.converged {
    background: rgba(76, 175, 80, 0.12);
    border: 1px solid rgba(76, 175, 80, 0.3);
  }

  .opt-summary.partial {
    background: rgba(230, 126, 34, 0.12);
    border: 1px solid rgba(230, 126, 34, 0.3);
  }

  .opt-status {
    font-weight: 600;
    white-space: nowrap;
  }

  .converged .opt-status { color: #4caf50; }
  .partial .opt-status { color: #e67e22; }

  .opt-detail {
    color: var(--text-secondary);
    font-size: 13px;
  }

  .status-badge {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
  }

  .status-badge.met {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
  }

  .status-badge.unmet {
    background: rgba(230, 126, 34, 0.2);
    color: #e67e22;
  }
`
