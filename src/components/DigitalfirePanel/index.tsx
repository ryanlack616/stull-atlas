/**
 * Digitalfire Knowledge Panel
 *
 * Shows contextual ceramic chemistry knowledge from Tony Hansen's
 * Digitalfire Reference Library. Every entry links back to the
 * original source page at digitalfire.com.
 *
 * Three modes:
 *   - Context: Smart suggestions based on the selected glaze
 *   - Search:  Search the curated excerpt database (fast, always available)
 *   - Library: Full-text search across 4,800+ complete articles (lazy-loaded)
 *
 * "This man's life work" — always credited, always linked.
 */

import React, { useState, useMemo, useCallback } from 'react'
import { searchKnowledge, getContextualRefs, DIGITALFIRE_ATTRIBUTION, type DigitalfireRef } from '@/domain/digitalfire'
import {
  loadLibrary, searchFullText, isLoaded, getLoadError, getPageCount,
  type DigitalfirePage,
} from '@/domain/digitalfire/fullTextStore'
import type { GlazeRecipe, OxideSymbol } from '@/types'

interface DigitalfirePanelProps {
  /** Currently selected glaze (drives contextual suggestions) */
  selectedGlaze?: GlazeRecipe | null
}

type Mode = 'context' | 'search' | 'library'

/** Category → icon + color */
const CATEGORY_STYLE: Record<string, { icon: string; color: string; label: string }> = {
  glossary:    { icon: '📖', color: '#3498db', label: 'Definition' },
  trouble:     { icon: '⚠️', color: '#e67e22', label: 'Troubleshooting' },
  oxide:       { icon: '⚗️', color: '#9b59b6', label: 'Oxide' },
  material:    { icon: '🪨', color: '#27ae60', label: 'Material' },
  article:     { icon: '📄', color: '#2c3e50', label: 'Article' },
  test:        { icon: '🔬', color: '#e74c3c', label: 'Test' },
  picture:     { icon: '📷', color: '#16a085', label: 'Picture' },
  recipe:      { icon: '🧪', color: '#d35400', label: 'Recipe' },
  hazard:      { icon: '☠️', color: '#c0392b', label: 'Hazard' },
  typecode:    { icon: '🏷️', color: '#7f8c8d', label: 'Type' },
  video:       { icon: '🎬', color: '#2980b9', label: 'Video' },
  temperature: { icon: '🌡️', color: '#e74c3c', label: 'Temperature' },
  project:     { icon: '🔧', color: '#34495e', label: 'Project' },
  property:    { icon: '📊', color: '#8e44ad', label: 'Property' },
  schedule:    { icon: '📅', color: '#1abc9c', label: 'Schedule' },
}

function getCategoryStyle(cat: string) {
  return CATEGORY_STYLE[cat] || CATEGORY_STYLE.article
}

function RefCard({ ref: entry }: { ref: DigitalfireRef }) {
  const style = getCategoryStyle(entry.category)

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="df-ref-card"
      title="Read more at Digitalfire"
    >
      <div className="df-ref-header">
        <span className="df-ref-icon">{style.icon}</span>
        <span className="df-ref-title">{entry.title}</span>
        <span className="df-ref-badge" style={{ background: style.color }}>
          {style.label}
        </span>
      </div>
      <p className="df-ref-excerpt">{entry.excerpt}</p>
      <span className="df-ref-link">Read at digitalfire.com &rarr;</span>
    </a>
  )
}

// ─── Full Article Card (expandable, shows complete text) ────────

function ArticleCard({ page }: { page: DigitalfirePage }) {
  const [expanded, setExpanded] = useState(false)
  const style = getCategoryStyle(page.category)

  const preview = page.body.length > 300
    ? page.body.slice(0, 300).replace(/\s+\S*$/, '') + '...'
    : page.body

  return (
    <div className={`df-article-card ${expanded ? 'expanded' : ''}`}>
      <div
        className="df-article-header"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setExpanded(!expanded)}
      >
        <span className="df-ref-icon">{style.icon}</span>
        <span className="df-ref-title">{page.title}</span>
        <span className="df-ref-badge" style={{ background: style.color }}>
          {style.label}
        </span>
        <span className="df-expand-icon">{expanded ? '\u25B2' : '\u25BC'}</span>
      </div>

      {expanded ? (
        <div className="df-article-body">
          <pre className="df-article-text">{page.body}</pre>
          <div className="df-article-footer">
            <a href={page.url} target="_blank" rel="noopener noreferrer">
              View original at digitalfire.com &rarr;
            </a>
          </div>
        </div>
      ) : (
        <div
          className="df-article-preview"
          onClick={() => setExpanded(true)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setExpanded(true)}
        >
          <p className="df-ref-excerpt">{preview}</p>
          <span className="df-expand-hint">Click to read full article</span>
        </div>
      )}
    </div>
  )
}

export function DigitalfirePanel({ selectedGlaze }: DigitalfirePanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [libraryQuery, setLibraryQuery] = useState('')
  const [mode, setMode] = useState<Mode>('context')
  const [libraryLoading, setLibraryLoading] = useState(false)
  const [libraryReady, setLibraryReady] = useState(isLoaded())

  // Contextual refs based on selected glaze
  const contextRefs = useMemo(() => {
    if (!selectedGlaze) return []

    // Extract oxide symbols from UMF
    const umf = selectedGlaze.umf
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
  }, [selectedGlaze])

  // Excerpt search results (fast, always available)
  const searchResults = useMemo(() => {
    if (mode !== 'search' || !searchQuery.trim()) return []
    return searchKnowledge(searchQuery, 10)
  }, [mode, searchQuery])

  // Full-text library search results
  const libraryResults = useMemo(() => {
    if (mode !== 'library' || !libraryReady || !libraryQuery.trim()) return []
    return searchFullText(libraryQuery, 30)
  }, [mode, libraryReady, libraryQuery])

  // Load library when switching to Library tab
  const handleLibraryTab = useCallback(() => {
    setMode('library')
    if (!isLoaded() && !libraryLoading) {
      setLibraryLoading(true)
      loadLibrary()
        .then(() => {
          setLibraryReady(true)
          setLibraryLoading(false)
        })
        .catch(() => {
          setLibraryLoading(false)
        })
    }
  }, [libraryLoading])

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
        <button
          className={`df-tab ${mode === 'library' ? 'active' : ''}`}
          onClick={handleLibraryTab}
        >
          Library {libraryReady && <span className="df-tab-count">{getPageCount().toLocaleString()}</span>}
        </button>
      </div>

      {/* Search input (excerpt search) */}
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

      {/* Library search input */}
      {mode === 'library' && (
        <div className="df-search">
          <input
            type="text"
            placeholder={libraryReady
              ? `Search ${getPageCount().toLocaleString()} articles...`
              : 'Loading library...'}
            value={libraryQuery}
            onChange={e => setLibraryQuery(e.target.value)}
            className="df-search-input"
            disabled={!libraryReady}
            autoFocus
          />
        </div>
      )}

      {/* Results */}
      <div className="df-results">
        {/* Context mode */}
        {mode === 'context' && displayRefs.length > 0 && (
          displayRefs.map((ref, i) => <RefCard key={ref.url + i} ref={ref} />)
        )}

        {mode === 'context' && !selectedGlaze && (
          <div className="df-empty">
            <p>Select a glaze to see relevant ceramic knowledge.</p>
            <p style={{ marginTop: 8 }}>
              Or switch to <button className="df-link-btn" onClick={() => setMode('search')}>Search</button> or{' '}
              <button className="df-link-btn" onClick={handleLibraryTab}>Library</button> to
              explore.
            </p>
          </div>
        )}

        {mode === 'context' && selectedGlaze && contextRefs.length === 0 && (
          <div className="df-empty">
            <p>No contextual references found for this glaze.</p>
            <p style={{ marginTop: 8 }}>
              Try <button className="df-link-btn" onClick={() => setMode('search')}>searching</button> for
              a specific topic.
            </p>
          </div>
        )}

        {/* Search mode */}
        {mode === 'search' && !searchQuery.trim() && (
          <div className="df-empty">
            <p>Search Tony Hansen's ceramic reference library.</p>
            <p style={{ fontSize: 11, marginTop: 4 }}>
              Try: "crawling", "EPK", "cone 6 matte", "alumina"
            </p>
          </div>
        )}

        {mode === 'search' && searchQuery.trim() && searchResults.length === 0 && (
          <div className="df-empty">
            <p>No results for "{searchQuery}".</p>
            <p style={{ fontSize: 11, marginTop: 4 }}>
              Try the <button className="df-link-btn" onClick={handleLibraryTab}>Library</button> tab
              for full-text search across all articles.
            </p>
          </div>
        )}

        {mode === 'search' && searchResults.length > 0 && (
          searchResults.map((ref, i) => <RefCard key={ref.url + i} ref={ref} />)
        )}

        {/* Library mode */}
        {mode === 'library' && libraryLoading && (
          <div className="df-empty">
            <div className="df-loading-spinner" />
            <p>Loading Digitalfire Reference Library...</p>
            <p style={{ fontSize: 11, marginTop: 4 }}>4,800+ articles by Tony Hansen</p>
          </div>
        )}

        {mode === 'library' && !libraryLoading && getLoadError() && (
          <div className="df-empty">
            <p style={{ color: 'var(--text-error, #e74c3c)' }}>
              Could not load the full library.
            </p>
            <p style={{ fontSize: 11, marginTop: 4 }}>
              The full Digitalfire library is available in the Studio Edition.
              <br />
              Excerpt search still works in the Search tab.
            </p>
          </div>
        )}

        {mode === 'library' && libraryReady && !libraryQuery.trim() && (
          <div className="df-empty">
            <p>Search the complete Digitalfire Reference Library.</p>
            <p style={{ fontSize: 11, marginTop: 4, color: 'var(--text-secondary)' }}>
              {getPageCount().toLocaleString()} articles, full text.
              <br />
              Try: "crawling", "thermal expansion", "nepheline syenite",
              <br />
              "cone 6 clear", "crazing solutions", "ball clay"
            </p>
          </div>
        )}

        {mode === 'library' && libraryReady && libraryQuery.trim() && libraryResults.length === 0 && (
          <div className="df-empty">
            <p>No results for "{libraryQuery}".</p>
            <p style={{ fontSize: 11, marginTop: 4 }}>Try broader or different terms.</p>
          </div>
        )}

        {mode === 'library' && libraryResults.length > 0 && (
          <>
            <div className="df-result-count">
              {libraryResults.length} result{libraryResults.length !== 1 ? 's' : ''}
            </div>
            {libraryResults.map(page => (
              <ArticleCard key={page.url} page={page} />
            ))}
          </>
        )}
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .df-tab.active {
    background: var(--accent-bg);
    border-color: var(--accent);
    color: var(--text-bright);
  }

  .df-tab-count {
    font-size: 9px;
    opacity: 0.7;
    font-weight: 400;
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

  .df-search-input:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  .df-results {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 8px;
  }

  .df-result-count {
    font-size: 10px;
    color: var(--text-dim);
    padding: 0 2px 2px;
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

  .df-ref-header, .df-article-header {
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

  /* Article cards (expandable full-text) */
  .df-article-card {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.15s;
  }

  .df-article-card:hover,
  .df-article-card.expanded {
    border-color: var(--accent);
  }

  .df-article-header {
    padding: 10px 12px;
    cursor: pointer;
    user-select: none;
    margin-bottom: 0;
  }

  .df-article-header:hover {
    background: var(--bg-secondary);
  }

  .df-expand-icon {
    font-size: 9px;
    color: var(--text-dim);
    flex-shrink: 0;
    margin-left: 4px;
  }

  .df-article-preview {
    padding: 0 12px 10px;
    cursor: pointer;
  }

  .df-article-preview .df-ref-excerpt {
    -webkit-line-clamp: 2;
  }

  .df-expand-hint {
    font-size: 10px;
    color: var(--text-link);
    opacity: 0.7;
  }

  .df-article-body {
    padding: 0 12px 12px;
    border-top: 1px solid var(--border-subtle, var(--border-primary));
  }

  .df-article-text {
    font-family: var(--font-body, Georgia, serif);
    font-size: 12px;
    line-height: 1.7;
    color: var(--text-primary);
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 12px 0;
    padding: 0;
    background: none;
    border: none;
    max-height: 500px;
    overflow-y: auto;
  }

  .df-article-footer {
    padding-top: 8px;
    border-top: 1px solid var(--border-subtle, var(--border-primary));
  }

  .df-article-footer a {
    font-size: 10px;
    color: var(--text-link);
    text-decoration: none;
  }

  .df-article-footer a:hover {
    text-decoration: underline;
  }

  /* Empty & loading states */
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

  .df-loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--border-primary);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: df-spin 0.8s linear infinite;
    margin: 0 auto 12px;
  }

  @keyframes df-spin {
    to { transform: rotate(360deg); }
  }

  .df-attribution {
    padding: 8px 0 0;
    border-top: 1px solid var(--border-subtle, var(--border-primary));
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
