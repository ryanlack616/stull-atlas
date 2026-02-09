/**
 * Digitalfire Knowledge Panel
 *
 * Shows contextual ceramic chemistry knowledge from Tony Hansen's
 * Digitalfire Reference Library. Every entry links back to the
 * original source page at digitalfire.com.
 *
 * "This man's life work" — always credited, always linked.
 */

import React, { useState, useMemo } from 'react'
import { searchKnowledge, getContextualRefs, DIGITALFIRE_ATTRIBUTION, type DigitalfireRef } from '@/domain/digitalfire'
import type { GlazeRecipe, OxideSymbol } from '@/types'

interface DigitalfirePanelProps {
  /** Currently selected glaze (drives contextual suggestions) */
  selectedGlaze?: GlazeRecipe | null
  /** Current dataset for UMF lookup */
  currentDataset?: string
}

/** Category → icon + color */
const CATEGORY_STYLE: Record<string, { icon: string; color: string; label: string }> = {
  glossary: { icon: '📖', color: '#3498db', label: 'Definition' },
  trouble: { icon: '⚠️', color: '#e67e22', label: 'Troubleshooting' },
  oxide: { icon: '⚗️', color: '#9b59b6', label: 'Oxide' },
  material: { icon: '🪨', color: '#27ae60', label: 'Material' },
  article: { icon: '📄', color: '#2c3e50', label: 'Article' },
  test: { icon: '🔬', color: '#e74c3c', label: 'Test' },
}

function RefCard({ ref: entry }: { ref: DigitalfireRef }) {
  const style = CATEGORY_STYLE[entry.category] || CATEGORY_STYLE.article

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="df-ref-card"
      title={`Read more at Digitalfire →`}
    >
      <div className="df-ref-header">
        <span className="df-ref-icon">{style.icon}</span>
        <span className="df-ref-title">{entry.title}</span>
        <span className="df-ref-badge" style={{ background: style.color }}>
          {style.label}
        </span>
      </div>
      <p className="df-ref-excerpt">{entry.excerpt}</p>
      <span className="df-ref-link">Read at digitalfire.com →</span>
    </a>
  )
}

export function DigitalfirePanel({ selectedGlaze, currentDataset }: DigitalfirePanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [mode, setMode] = useState<'context' | 'search'>('context')

  // Contextual refs based on selected glaze
  const contextRefs = useMemo(() => {
    if (!selectedGlaze) return []

    // Extract oxide symbols from UMF
    const umf = currentDataset ? selectedGlaze.umf.get(currentDataset) : undefined
    const oxideSymbols: OxideSymbol[] = []
    if (umf) {
      for (const [key, val] of Object.entries(umf)) {
        if (key.startsWith('_')) continue
        if (val && typeof val === 'object' && 'value' in val && (val as any).value > 0.01) {
          oxideSymbols.push(key as OxideSymbol)
        }
      }
    }

    // Extract material names from ingredients
    const materialNames = selectedGlaze.ingredients.map(i => i.material)

    return getContextualRefs({
      materialNames,
      oxideSymbols,
      surfaceType: selectedGlaze.surfaceType,
      atmosphere: selectedGlaze.atmosphere,
      glazeFamily: selectedGlaze.glazeTypeId != null ? String(selectedGlaze.glazeTypeId) : undefined,
    })
  }, [selectedGlaze, currentDataset])

  // Search results
  const searchResults = useMemo(() => {
    if (mode !== 'search' || !searchQuery.trim()) return []
    return searchKnowledge(searchQuery, 10)
  }, [mode, searchQuery])

  const displayRefs = mode === 'search' ? searchResults : contextRefs

  return (
    <div className="df-panel">
      {/* Mode tabs */}
      <div className="df-tabs">
        <button
          className={`df-tab ${mode === 'context' ? 'active' : ''}`}
          onClick={() => setMode('context')}
        >
          Context
        </button>
        <button
          className={`df-tab ${mode === 'search' ? 'active' : ''}`}
          onClick={() => setMode('search')}
        >
          Search
        </button>
      </div>

      {/* Search input */}
      {mode === 'search' && (
        <div className="df-search">
          <input
            type="text"
            placeholder="Search ceramic knowledge..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="df-search-input"
            autoFocus
          />
        </div>
      )}

      {/* Results */}
      <div className="df-results">
        {displayRefs.length > 0 ? (
          displayRefs.map((ref, i) => <RefCard key={ref.url + i} ref={ref} />)
        ) : mode === 'context' && !selectedGlaze ? (
          <div className="df-empty">
            <p>Select a glaze to see relevant ceramic knowledge.</p>
            <p style={{ marginTop: 8 }}>
              Or switch to <button className="df-link-btn" onClick={() => setMode('search')}>Search</button> to
              explore the library.
            </p>
          </div>
        ) : mode === 'context' && contextRefs.length === 0 ? (
          <div className="df-empty">
            <p>No contextual references found for this glaze.</p>
            <p style={{ marginTop: 8 }}>
              Try <button className="df-link-btn" onClick={() => setMode('search')}>searching</button> for
              a specific topic.
            </p>
          </div>
        ) : mode === 'search' && !searchQuery.trim() ? (
          <div className="df-empty">
            <p>Search Tony Hansen's ceramic reference library.</p>
            <p style={{ fontSize: 11, marginTop: 4 }}>
              Try: "crawling", "EPK", "cone 6 matte", "alumina"
            </p>
          </div>
        ) : mode === 'search' && searchResults.length === 0 ? (
          <div className="df-empty">
            <p>No results for "{searchQuery}".</p>
            <p style={{ fontSize: 11, marginTop: 4 }}>Try broader terms or different keywords.</p>
          </div>
        ) : null}
      </div>

      {/* Attribution — always visible */}
      <div className="df-attribution">
        <a href={DIGITALFIRE_ATTRIBUTION.url} target="_blank" rel="noopener noreferrer">
          {DIGITALFIRE_ATTRIBUTION.text}
        </a>
      </div>

      <style>{digitalfirePanelStyles}</style>
    </div>
  )
}

// ─── Styles ─────────────────────────────────────────────────────

const digitalfirePanelStyles = `
  .df-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 200px;
  }

  .df-tabs {
    display: flex;
    gap: 2px;
    margin-bottom: 12px;
  }

  .df-tab {
    flex: 1;
    padding: 6px 8px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-secondary);
    font-size: 11px;
    cursor: pointer;
    text-transform: capitalize;
    transition: all 0.15s;
  }

  .df-tab.active {
    background: var(--accent-bg);
    border-color: var(--accent);
    color: var(--text-bright);
  }

  .df-search {
    margin-bottom: 12px;
  }

  .df-search-input {
    width: 100%;
    padding: 8px 10px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    color: var(--text-primary);
    font-size: 12px;
    outline: none;
    box-sizing: border-box;
  }

  .df-search-input:focus {
    border-color: var(--accent);
  }

  .df-search-input::placeholder {
    color: var(--text-dim);
  }

  .df-results {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 8px;
  }

  .df-ref-card {
    display: block;
    padding: 10px 12px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s, background 0.15s;
    cursor: pointer;
  }

  .df-ref-card:hover {
    border-color: var(--accent);
    background: var(--bg-secondary);
  }

  .df-ref-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
  }

  .df-ref-icon {
    font-size: 12px;
    flex-shrink: 0;
  }

  .df-ref-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-bright);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .df-ref-badge {
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 3px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-weight: 600;
    flex-shrink: 0;
  }

  .df-ref-excerpt {
    font-size: 11px;
    line-height: 1.5;
    color: var(--text-secondary);
    margin: 0 0 6px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .df-ref-link {
    font-size: 10px;
    color: var(--text-link);
    opacity: 0.7;
  }

  .df-ref-card:hover .df-ref-link {
    opacity: 1;
  }

  .df-empty {
    padding: 20px 12px;
    text-align: center;
    color: var(--text-muted);
    font-size: 12px;
    line-height: 1.6;
  }

  .df-link-btn {
    background: none;
    border: none;
    color: var(--text-link);
    cursor: pointer;
    font-size: inherit;
    text-decoration: underline;
    padding: 0;
  }

  .df-attribution {
    padding: 8px 0 0;
    border-top: 1px solid var(--border-subtle);
    text-align: center;
    flex-shrink: 0;
  }

  .df-attribution a {
    font-size: 10px;
    color: var(--text-dim);
    text-decoration: none;
    letter-spacing: 0.2px;
  }

  .df-attribution a:hover {
    color: var(--text-link);
    text-decoration: underline;
  }
`

export default DigitalfirePanel
