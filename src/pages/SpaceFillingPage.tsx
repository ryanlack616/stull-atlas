/**
 * Space-Filling Sampler Page
 * 
 * Generate LHS, Sobol, or Halton samples across UMF space.
 * For computational exploration — "what does the landscape look like?"
 */

import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SpaceFillingSample,
  SpaceFillingSampleConfig,
  SimplexPoint,
  OxideSymbol,
  UMF,
  UMFBounds,
  GlazeRecipe,
} from '@/types'
import {
  spaceFillingSample,
  DEFAULT_UMF_BOUNDS,
  STULL_BOUNDS,
} from '@/calculator/blends/spacefilling'
import { getOxideValue } from '@/calculator/umf'
import { useRecipeStore } from '@/stores'
import { exportBlendCSV } from '@/utils/export'
import { usePageTitle } from '@/hooks/usePageTitle'
import { calcStyles } from './calc-styles'

type SamplingMethod = 'lhs' | 'sobol' | 'halton'

const METHOD_INFO: Record<SamplingMethod, { label: string; description: string }> = {
  lhs:    { label: 'Latin Hypercube',  description: 'Stratified random sampling — good coverage, no clustering' },
  sobol:  { label: 'Sobol Sequence',   description: 'Quasi-random low-discrepancy — fills space very evenly' },
  halton: { label: 'Halton Sequence',  description: 'Quasi-random with prime bases — fast, deterministic' },
}

const PRESET_BOUNDS: Record<string, { label: string; bounds: UMFBounds }> = {
  stull: {
    label: 'Stull Chart (SiO₂ × Al₂O₃)',
    bounds: STULL_BOUNDS,
  },
  midfire: {
    label: 'Mid-Fire Glaze (8D)',
    bounds: DEFAULT_UMF_BOUNDS,
  },
  custom: {
    label: 'Custom',
    bounds: {},
  },
}

const AVAILABLE_OXIDES: OxideSymbol[] = [
  'SiO2', 'Al2O3', 'B2O3', 'Na2O', 'K2O', 'Li2O',
  'CaO', 'MgO', 'ZnO', 'SrO', 'BaO',
]

const OXIDE_DISPLAY: Record<string, string> = {
  SiO2: 'SiO₂', Al2O3: 'Al₂O₃', B2O3: 'B₂O₃',
  Na2O: 'Na₂O', K2O: 'K₂O', Li2O: 'Li₂O',
  CaO: 'CaO', MgO: 'MgO', ZnO: 'ZnO',
  SrO: 'SrO', BaO: 'BaO',
}

function createSyntheticRecipe(id: string, name: string): GlazeRecipe {
  return {
    id,
    name,
    source: 'calculated',
    ingredients: [],
    umf: new Map(),
    coneRange: [0, 0],
    atmosphere: 'unknown',
    surfaceType: 'unknown',
    umfConfidence: 'inferred',
    verified: false,
  }
}

function getVal(umf: UMF, oxide: OxideSymbol): string {
  const val = umf[oxide]
  if (!val) return '—'
  return val.value.toFixed(3)
}

export function SpaceFillingPage() {
  usePageTitle('Space-Filling Sampler')
  const [method, setMethod] = useState<SamplingMethod>('lhs')
  const [count, setCount] = useState(50)
  const [seed, setSeed] = useState(42)
  const [preset, setPreset] = useState<string>('midfire')
  const [bounds, setBounds] = useState<UMFBounds>({ ...DEFAULT_UMF_BOUNDS })
  const [results, setResults] = useState<SpaceFillingSample[] | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const { setBlendResults } = useRecipeStore()
  const navigate = useNavigate()

  const dimensions = useMemo(() => Object.keys(bounds) as OxideSymbol[], [bounds])

  const selectPreset = useCallback((key: string) => {
    setPreset(key)
    if (key !== 'custom') {
      setBounds({ ...PRESET_BOUNDS[key].bounds })
    }
    setResults(null)
  }, [])

  const updateBound = useCallback((oxide: string, field: 'min' | 'max', value: number) => {
    setBounds(prev => ({
      ...prev,
      [oxide]: { ...prev[oxide], [field]: value },
    }))
    setPreset('custom')
    setResults(null)
  }, [])

  const addDimension = useCallback((oxide: OxideSymbol) => {
    setBounds(prev => ({
      ...prev,
      [oxide]: { min: 0, max: 0.5 },
    }))
    setPreset('custom')
    setResults(null)
  }, [])

  const removeDimension = useCallback((oxide: string) => {
    setBounds(prev => {
      const next = { ...prev }
      delete next[oxide]
      return next
    })
    setPreset('custom')
    setResults(null)
  }, [])

  const calculate = useCallback(() => {
    setErrors([])

    const config: SpaceFillingSampleConfig = {
      type: method,
      bounds,
      count,
      seed: method === 'lhs' ? seed : undefined,
    }

    const result = spaceFillingSample(config)

    if (result.value) {
      setResults(result.value)
      setErrors([...result.warnings])
    } else {
      setErrors([...result.errors])
    }
  }, [method, bounds, count, seed])

  const canCalculate = dimensions.length >= 2

  // Determine which oxide columns to show in results
  const displayOxides = useMemo<OxideSymbol[]>(() => {
    if (!results || results.length === 0) return dimensions
    // Show all dimensions plus any other oxides present
    const oxides = new Set<OxideSymbol>(dimensions)
    for (const pt of results.slice(0, 5)) {
      for (const key of Object.keys(pt.umf)) {
        if (key === '_meta') continue
        const oxide = key as OxideSymbol
        const v = getOxideValue(pt.umf, oxide)
        if (v > 0) oxides.add(oxide)
      }
    }
    return Array.from(oxides)
  }, [results, dimensions])

  const unusedOxides = useMemo(() => {
    return AVAILABLE_OXIDES.filter(o => !dimensions.includes(o))
  }, [dimensions])

  return (
    <div className="calc-page">
      <div className="calc-sidebar" onKeyDown={e => { if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) calculate() }}>
        <div className="calc-section">
          <h2>Space-Filling Sampler</h2>
          <p className="subtitle">
            Systematically explore UMF space with quasi-random sequences
          </p>
        </div>

        {/* Sampling Method */}
        <div className="calc-section">
          <h3>Method</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(Object.entries(METHOD_INFO) as [SamplingMethod, typeof METHOD_INFO[SamplingMethod]][]).map(
              ([key, info]) => (
                <label
                  key={key}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    padding: '8px 10px', background: method === key ? '#2a3a4a' : 'var(--bg-tertiary)',
                    border: `1px solid ${method === key ? 'var(--accent)' : 'var(--border-primary)'}`,
                    borderRadius: 6, cursor: 'pointer', fontSize: 13,
                  }}
                >
                  <input
                    type="radio"
                    name="method"
                    checked={method === key}
                    onChange={() => { setMethod(key); setResults(null) }}
                    style={{ marginTop: 2 }}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>{info.label}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginTop: 2 }}>{info.description}</div>
                  </div>
                </label>
              )
            )}
          </div>
        </div>

        {/* Sample Count */}
        <div className="calc-section">
          <h3>Sample Count</h3>
          <div className="calc-controls">
            <div className="control-row">
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={count}
                onChange={e => { setCount(Number(e.target.value)); setResults(null) }}
              />
              <span className="range-value">{count}</span>
            </div>
          </div>
        </div>

        {/* Seed (LHS only) */}
        {method === 'lhs' && (
          <div className="calc-section">
            <h3>Random Seed</h3>
            <input
              type="number"
              value={seed}
              onChange={e => { setSeed(Number(e.target.value)); setResults(null) }}
              style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: 4,
                padding: '6px 10px', color: 'var(--text-primary)', width: 100, fontSize: 13,
              }}
            />
            <span style={{ color: 'var(--text-muted)', fontSize: 11, marginLeft: 8 }}>
              Same seed → same samples
            </span>
          </div>
        )}

        {/* Bounds Preset */}
        <div className="calc-section">
          <h3>Bounds</h3>
          <select
            value={preset}
            onChange={e => selectPreset(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: 4,
              padding: '6px 10px', color: 'var(--text-primary)', width: '100%', fontSize: 13,
              marginBottom: 10,
            }}
          >
            {Object.entries(PRESET_BOUNDS).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Per-oxide min/max */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {dimensions.map(oxide => (
              <div
                key={oxide}
                style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr 1fr 24px',
                  gap: 6, alignItems: 'center', fontSize: 12,
                }}
              >
                <span style={{ fontWeight: 600 }}>{OXIDE_DISPLAY[oxide] || oxide}</span>
                <input
                  type="number"
                  step="0.05"
                  value={bounds[oxide].min}
                  onChange={e => updateBound(oxide, 'min', Number(e.target.value))}
                  placeholder="min"
                  style={boundInput}
                />
                <input
                  type="number"
                  step="0.05"
                  value={bounds[oxide].max}
                  onChange={e => updateBound(oxide, 'max', Number(e.target.value))}
                  placeholder="max"
                  style={boundInput}
                />
                <button
                  onClick={() => removeDimension(oxide)}
                  style={{
                    background: 'transparent', border: 'none', color: 'var(--text-muted)',
                    cursor: 'pointer', fontSize: 14, padding: 0,
                  }}
                  title={`Remove ${oxide}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add dimension */}
          {unusedOxides.length > 0 && (
            <select
              value=""
              onChange={e => { if (e.target.value) addDimension(e.target.value as OxideSymbol) }}
              style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: 4,
                padding: '4px 8px', color: 'var(--text-secondary)', fontSize: 12, marginTop: 8,
              }}
            >
              <option value="">+ Add oxide dimension…</option>
              {unusedOxides.map(o => (
                <option key={o} value={o}>{OXIDE_DISPLAY[o] || o}</option>
              ))}
            </select>
          )}
        </div>

        {/* Dimension count info */}
        <div className="point-count">
          <strong>{dimensions.length}</strong> dimensions × <strong>{count}</strong> samples
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
          Generate {count} Samples
        </button>
        {!canCalculate && (
          <p style={{ color: 'var(--text-secondary)', fontSize: 11, textAlign: 'center', margin: 0 }}>
            Need at least 2 oxide dimensions
          </p>
        )}
      </div>

      <div className="calc-main">
        {results ? (
          <div className="results-panel">
            <div className="results-header">
              <h3>
                {results.length} {METHOD_INFO[method].label} Samples —{' '}
                {dimensions.length}D
              </h3>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => {
                    const asPoints: SimplexPoint[] = results!.map((s, i) => ({
                      index: i,
                      coordinates: dimensions.map(d => s.coordinates[d] || 0),
                      umf: s.umf,
                      recipe: s.recipe || createSyntheticRecipe(`sample_${i + 1}`, `Sample ${i + 1}`),
                      label: `S${i + 1}`,
                    }))
                    setBlendResults(asPoints)
                    navigate('/')
                  }}
                  style={actionBtn}
                >
                  View on Explorer
                </button>
                <button
                  onClick={() => exportBlendCSV(
                    results!.map((s, i) => ({
                      label: `${method.toUpperCase()}-${i + 1}`,
                      umf: s.umf,
                      meta: s.coordinates,
                    })),
                    `${method}-${count}-samples.csv`
                  )}
                  style={actionBtn}
                >
                  CSV
                </button>
              </div>
            </div>
            <div className="results-scroll">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>#</th>
                    {displayOxides.map(o => (
                      <th key={o}>{OXIDE_DISPLAY[o] || o}</th>
                    ))}
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
                        {displayOxides.map(o => (
                          <td key={o}>{getVal(pt.umf, o)}</td>
                        ))}
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
            <div className="icon">⊞</div>
            <p>Configure bounds and sampling method, then generate</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              {METHOD_INFO[method].description}
            </p>
          </div>
        )}
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

export default SpaceFillingPage

const boundInput: React.CSSProperties = {
  background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 4,
  padding: '4px 6px', color: 'var(--text-primary)', fontSize: 12, width: '100%',
}

const actionBtn: React.CSSProperties = {
  padding: '4px 10px', background: 'var(--bg-input)', border: '1px solid var(--border-secondary)',
  borderRadius: 4, color: '#aaa', fontSize: 11, cursor: 'pointer',
}
