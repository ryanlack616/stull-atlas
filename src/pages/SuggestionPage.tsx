/**
 * AI Recipe Suggestion Page
 *
 * "I want a celadon at cone 10" → optimized recipes with explanations.
 *
 * v3 flagship feature: natural language → glaze archetype matching →
 * automated optimizer → ranked recipe suggestions.
 */

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { suggestRecipes, type SuggestionResult, type RecipeSuggestion } from '@/domain/suggestion'
import { GLAZE_ARCHETYPES, type GlazeArchetype } from '@/domain/suggestion'
import { usePageTitle } from '@/hooks/usePageTitle'
import { calcStyles } from './calc-styles'

// ─── Example queries for inspiration ───────────────────────────

const EXAMPLE_QUERIES = [
  'celadon at cone 10',
  'food safe clear gloss cone 6',
  'copper red reduction',
  'floating blue satin cone 6',
  'matte white stoneware',
  'crystalline zinc glaze',
  'tenmoku hare\'s fur',
  'majolica low fire',
  'shino carbon trap',
  'cobalt blue cone 6',
  'magnesia matte',
  'ash glaze cone 10',
]

// ─── Component ─────────────────────────────────────────────────

export function SuggestionPage() {
  usePageTitle('Recipe Suggestions')

  const [query, setQuery] = useState('')
  const [result, setResult] = useState<SuggestionResult | null>(null)
  const [running, setRunning] = useState(false)
  const [method, setMethod] = useState<'gradient' | 'genetic'>('gradient')
  const [maxSuggestions, setMaxSuggestions] = useState(3)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query.trim() || running) return
    setRunning(true)
    setExpandedIdx(null)
    // Let React render the "thinking" state before blocking
    setTimeout(() => {
      const res = suggestRecipes({
        query: query.trim(),
        method,
        maxSuggestions,
      })
      setResult(res)
      setRunning(false)
      // Auto-expand first result
      if (res.suggestions.length > 0) setExpandedIdx(0)
    }, 50)
  }, [query, method, maxSuggestions, running])

  const handleExample = useCallback((ex: string) => {
    setQuery(ex)
    setResult(null)
    // Auto-submit after setting
    setTimeout(() => {
      setRunning(true)
      setTimeout(() => {
        const res = suggestRecipes({ query: ex, method, maxSuggestions })
        setResult(res)
        setRunning(false)
        if (res.suggestions.length > 0) setExpandedIdx(0)
      }, 50)
    }, 100)
  }, [method, maxSuggestions])

  return (
    <>
      <style>{calcStyles}</style>
      <style>{suggestionStyles}</style>
      <div className="calc-page">
        <div className="calc-sidebar">
          {/* Query Input */}
          <div className="calc-section">
            <h3>Describe Your Glaze</h3>
            <form onSubmit={handleSubmit} className="suggestion-form">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder='e.g. "celadon at cone 10"'
                className="suggestion-input"
                disabled={running}
              />
              <button
                type="submit"
                className="suggestion-submit"
                disabled={!query.trim() || running}
              >
                {running ? 'Thinking...' : 'Suggest Recipes'}
              </button>
            </form>
          </div>

          {/* Options */}
          <div className="calc-section">
            <h3>Options</h3>
            <div className="option-row">
              <label>Method</label>
              <select
                value={method}
                onChange={e => setMethod(e.target.value as 'gradient' | 'genetic')}
              >
                <option value="gradient">Gradient (fast)</option>
                <option value="genetic">Genetic (diverse)</option>
              </select>
            </div>
            <div className="option-row">
              <label>Max Results</label>
              <select
                value={maxSuggestions}
                onChange={e => setMaxSuggestions(Number(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>

          {/* Examples */}
          <div className="calc-section">
            <h3>Try These</h3>
            <div className="example-grid">
              {EXAMPLE_QUERIES.map(ex => (
                <button
                  key={ex}
                  className="example-chip"
                  onClick={() => handleExample(ex)}
                  disabled={running}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Parsed Query Debug */}
          {result && (
            <div className="calc-section">
              <h3>Understood</h3>
              <div className="parsed-query">
                {result.query.glazeTerms.length > 0 && (
                  <div className="parsed-row">
                    <span className="parsed-label">Type:</span>
                    <span>{result.query.glazeTerms.join(', ')}</span>
                  </div>
                )}
                {result.query.cone !== null && (
                  <div className="parsed-row">
                    <span className="parsed-label">Cone:</span>
                    <span>{result.query.cone < 0 ? `0${Math.abs(result.query.cone)}` : result.query.cone}</span>
                  </div>
                )}
                {result.query.atmosphere && (
                  <div className="parsed-row">
                    <span className="parsed-label">Atmosphere:</span>
                    <span>{result.query.atmosphere}</span>
                  </div>
                )}
                {result.query.surface && (
                  <div className="parsed-row">
                    <span className="parsed-label">Surface:</span>
                    <span>{result.query.surface}</span>
                  </div>
                )}
                {result.query.colors.length > 0 && (
                  <div className="parsed-row">
                    <span className="parsed-label">Color:</span>
                    <span>{result.query.colors.join(', ')}</span>
                  </div>
                )}
                <div className="parsed-row">
                  <span className="parsed-label">Confidence:</span>
                  <span className={`confidence-badge ${result.query.confidence > 0.6 ? 'high' : result.query.confidence > 0.3 ? 'medium' : 'low'}`}>
                    {Math.round(result.query.confidence * 100)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="calc-main">
          {/* Initial empty state */}
          {!result && !running && (
            <div className="suggestion-empty">
              <div className="empty-icon">&#x1F3A8;</div>
              <h2>AI Recipe Suggestions</h2>
              <p>
                Describe the glaze you want in plain language. The engine will match your
                description to known glaze archetypes, select appropriate materials,
                and optimize a recipe for you.
              </p>
              <p className="empty-hint">
                Try: <em>"celadon at cone 10"</em> or <em>"food safe clear gloss cone 6"</em>
              </p>
            </div>
          )}

          {/* Loading state */}
          {running && (
            <div className="suggestion-loading">
              <div className="loading-spinner" />
              <p>Matching archetypes and optimizing recipes...</p>
            </div>
          )}

          {/* Results */}
          {result && !running && (
            <div className="suggestion-results">
              <div className="results-header">
                <h2>{result.message}</h2>
                <span className="results-timing">
                  {result.durationMs.toFixed(0)}ms
                </span>
              </div>

              {result.status === 'no-match' && (
                <div className="no-match-help">
                  <pre>{result.message}</pre>
                </div>
              )}

              {result.suggestions.map((suggestion, idx) => (
                <SuggestionCard
                  key={suggestion.archetype.id}
                  suggestion={suggestion}
                  index={idx}
                  expanded={expandedIdx === idx}
                  onToggle={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ─── Suggestion Card ───────────────────────────────────────────

function SuggestionCard({
  suggestion,
  index,
  expanded,
  onToggle,
}: {
  suggestion: RecipeSuggestion
  index: number
  expanded: boolean
  onToggle: () => void
}) {
  const { archetype, recipe, colorants, relevance, explanation, warnings } = suggestion

  const recipeRows = useMemo(() => {
    return recipe.materialNames.map((name, i) => ({
      name,
      weight: recipe.weights[i],
    })).filter(r => r.weight > 0.5) // hide trace amounts
      .sort((a, b) => b.weight - a.weight)
  }, [recipe])

  const totalWeight = useMemo(
    () => recipeRows.reduce((s, r) => s + r.weight, 0),
    [recipeRows],
  )

  return (
    <div className={`suggestion-card ${expanded ? 'expanded' : ''}`}>
      <div className="card-header" onClick={onToggle}>
        <div className="card-rank">#{index + 1}</div>
        <div className="card-title">
          <h3>{archetype.name}</h3>
          <div className="card-badges">
            <span className="badge surface">{archetype.surface}</span>
            <span className="badge cone">
              Cone {archetype.coneRange[0]}–{archetype.coneRange[1]}
            </span>
            <span className="badge atmosphere">{archetype.atmosphere}</span>
            {recipe.converged && <span className="badge converged">Converged</span>}
            <span className={`badge relevance ${relevance > 0.7 ? 'high' : relevance > 0.4 ? 'medium' : 'low'}`}>
              {Math.round(relevance * 100)}% match
            </span>
          </div>
        </div>
        <div className="card-expand">{expanded ? '▼' : '▶'}</div>
      </div>

      {expanded && (
        <div className="card-body">
          {/* Recipe */}
          <div className="card-section">
            <h4>Suggested Recipe</h4>
            <table className="recipe-table">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {recipeRows.map(row => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.weight.toFixed(1)}</td>
                  </tr>
                ))}
                <tr className="recipe-total">
                  <td>Total</td>
                  <td>{totalWeight.toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Colorants */}
          {colorants.length > 0 && (
            <div className="card-section">
              <h4>Add (on top of 100%)</h4>
              <table className="recipe-table colorant-table">
                <thead>
                  <tr>
                    <th>Colorant</th>
                    <th>Amount</th>
                    <th>Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {colorants.map(c => (
                    <tr key={c.materialId}>
                      <td>{c.materialName}</td>
                      <td>{c.minPercent}–{c.maxPercent}%</td>
                      <td className="colorant-effect">{c.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* UMF Results */}
          <div className="card-section">
            <h4>Resulting UMF</h4>
            <div className="umf-grid">
              {recipe.targetResults.map(tr => (
                <div
                  key={tr.oxide}
                  className={`umf-cell ${tr.satisfied ? 'satisfied' : 'off-target'}`}
                >
                  <span className="umf-oxide">{tr.oxide}</span>
                  <span className="umf-value">{tr.actual.toFixed(3)}</span>
                  <span className="umf-target">
                    {tr.target !== null
                      ? `target: ${tr.target.toFixed(2)}`
                      : `${tr.min?.toFixed(2) ?? '?'}–${tr.max?.toFixed(2) ?? '?'}`
                    }
                  </span>
                  <span className={`umf-status ${tr.satisfied ? 'ok' : 'miss'}`}>
                    {tr.satisfied ? '✓' : `Δ${tr.delta > 0 ? '+' : ''}${tr.delta.toFixed(3)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="card-section">
            <h4>About This Glaze</h4>
            <div className="explanation">
              {explanation.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="card-section">
              <h4>Notes &amp; Warnings</h4>
              <ul className="warnings-list">
                {warnings.map((w, i) => (
                  <li key={i} className="warning-item">⚠ {w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Styles ────────────────────────────────────────────────────

const suggestionStyles = `
  .suggestion-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .suggestion-input {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid var(--border-primary);
    border-radius: 10px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 15px;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }

  .suggestion-input:focus {
    outline: none;
    border-color: var(--accent, #3498db);
  }

  .suggestion-input::placeholder {
    color: var(--text-tertiary);
    font-style: italic;
  }

  .suggestion-submit {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    background: var(--accent, #3498db);
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }

  .suggestion-submit:hover:not(:disabled) {
    background: var(--accent-hover, #2980b9);
    transform: translateY(-1px);
  }

  .suggestion-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .option-row label {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .option-row select {
    padding: 4px 8px;
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 13px;
  }

  .example-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .example-chip {
    padding: 4px 10px;
    border: 1px solid var(--border-primary);
    border-radius: 16px;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .example-chip:hover:not(:disabled) {
    background: var(--accent, #3498db);
    color: white;
    border-color: var(--accent, #3498db);
  }

  .parsed-query {
    background: var(--bg-tertiary);
    border-radius: 8px;
    padding: 10px;
  }

  .parsed-row {
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
    font-size: 13px;
  }

  .parsed-label {
    color: var(--text-secondary);
    font-weight: 500;
  }

  .confidence-badge {
    padding: 1px 8px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
  }

  .confidence-badge.high { background: #27ae6022; color: #27ae60; }
  .confidence-badge.medium { background: #f39c1222; color: #f39c12; }
  .confidence-badge.low { background: #e74c3c22; color: #e74c3c; }

  /* Empty state */
  .suggestion-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 30px;
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto;
  }

  .empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
  }

  .suggestion-empty h2 {
    margin: 0 0 12px 0;
    color: var(--text-primary);
  }

  .suggestion-empty p {
    margin: 0 0 8px 0;
    font-size: 14px;
    line-height: 1.6;
  }

  .empty-hint {
    color: var(--text-tertiary);
    font-size: 13px !important;
  }

  /* Loading */
  .suggestion-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px;
    color: var(--text-secondary);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-primary);
    border-top-color: var(--accent, #3498db);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Results */
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 16px;
  }

  .results-header h2 {
    margin: 0;
    font-size: 16px;
    color: var(--text-primary);
  }

  .results-timing {
    font-size: 12px;
    color: var(--text-tertiary);
  }

  .no-match-help {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 10px;
    padding: 20px;
  }

  .no-match-help pre {
    white-space: pre-wrap;
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0;
    font-family: inherit;
  }

  /* Suggestion Card */
  .suggestion-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
    margin-bottom: 12px;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .suggestion-card:hover {
    border-color: var(--accent, #3498db);
  }

  .suggestion-card.expanded {
    border-color: var(--accent, #3498db);
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    cursor: pointer;
    gap: 12px;
  }

  .card-rank {
    font-size: 20px;
    font-weight: 700;
    color: var(--accent, #3498db);
    min-width: 32px;
  }

  .card-title {
    flex: 1;
  }

  .card-title h3 {
    margin: 0 0 6px 0;
    font-size: 15px;
    color: var(--text-primary);
  }

  .card-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .badge {
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 500;
  }

  .badge.surface { background: #8e44ad22; color: #8e44ad; }
  .badge.cone { background: #e67e2222; color: #e67e22; }
  .badge.atmosphere { background: #2980b922; color: #2980b9; }
  .badge.converged { background: #27ae6022; color: #27ae60; }
  .badge.relevance.high { background: #27ae6022; color: #27ae60; }
  .badge.relevance.medium { background: #f39c1222; color: #f39c12; }
  .badge.relevance.low { background: #e74c3c22; color: #e74c3c; }

  .card-expand {
    color: var(--text-tertiary);
    font-size: 12px;
  }

  .card-body {
    padding: 0 16px 16px 16px;
    border-top: 1px solid var(--border-primary);
  }

  .card-section {
    margin-top: 16px;
  }

  .card-section h4 {
    margin: 0 0 10px 0;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 0.4px;
  }

  /* Recipe table */
  .recipe-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .recipe-table th {
    text-align: left;
    padding: 6px 8px;
    font-size: 12px;
    color: var(--text-tertiary);
    border-bottom: 1px solid var(--border-primary);
  }

  .recipe-table td {
    padding: 6px 8px;
    border-bottom: 1px solid var(--border-primary);
  }

  .recipe-table td:last-child,
  .recipe-table th:last-child {
    text-align: right;
  }

  .recipe-total {
    font-weight: 600;
  }

  .colorant-table td:last-child {
    text-align: left;
    font-size: 12px;
    color: var(--text-secondary);
  }

  .colorant-effect {
    font-style: italic;
  }

  /* UMF grid */
  .umf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }

  .umf-cell {
    background: var(--bg-tertiary);
    border-radius: 8px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .umf-cell.satisfied { border-left: 3px solid #27ae60; }
  .umf-cell.off-target { border-left: 3px solid #e74c3c; }

  .umf-oxide {
    font-weight: 600;
    font-size: 13px;
  }

  .umf-value {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .umf-target {
    font-size: 11px;
    color: var(--text-tertiary);
  }

  .umf-status {
    font-size: 12px;
    font-weight: 600;
  }

  .umf-status.ok { color: #27ae60; }
  .umf-status.miss { color: #e74c3c; }

  /* Explanation */
  .explanation p {
    margin: 0 0 8px 0;
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .explanation p:first-child {
    color: var(--text-primary);
    font-size: 14px;
  }

  /* Warnings */
  .warnings-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .warning-item {
    padding: 6px 10px;
    margin-bottom: 4px;
    background: #f39c1210;
    border-radius: 6px;
    font-size: 13px;
    color: #f39c12;
  }
`
