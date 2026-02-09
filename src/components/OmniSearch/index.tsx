/**
 * OmniSearch
 *
 * App-wide command palette (Ctrl+K / Cmd+K) that searches across:
 * - App pages (quick navigation)
 * - Loaded glazes (by name — navigate to explorer + select)
 * - Digitalfire Reference Library (oxides, materials, glossary, articles, troubles)
 *
 * Every Digitalfire result links to digitalfire.com and credits Tony Hansen.
 */

import React, { useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOmniSearch, type OmniResult, type ResultCategory } from '@/hooks/useOmniSearch'
import { useSelectionStore, useGlazeStore } from '@/stores'
import { DIGITALFIRE_ATTRIBUTION } from '@/data/digitalfire'

// ─── Category labels & icons ────────────────────────────────────

const CATEGORY_LABEL: Record<ResultCategory, string> = {
  page: 'Pages',
  glaze: 'Glazes',
  knowledge: 'Digitalfire Reference',
}

const CATEGORY_ICON: Record<ResultCategory, string> = {
  page: '→',
  glaze: '◆',
  knowledge: '📖',
}

const BADGE_COLORS: Record<string, string> = {
  oxide: '#e67e22',
  material: '#27ae60',
  glossary: '#3498db',
  trouble: '#e74c3c',
  article: '#9b59b6',
  test: '#1abc9c',
}

// ─── Component ──────────────────────────────────────────────────

export function OmniSearch() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const setSelectedGlaze = useSelectionStore(s => s.setSelectedGlaze)
  const getGlazesArray = useGlazeStore(s => s.getGlazesArray)

  const {
    open,
    query,
    setQuery,
    close,
    grouped,
    flatResults,
    selectedIndex,
    setSelectedIndex,
    handleKeyDown: hookKeyDown,
  } = useOmniSearch()

  // Autofocus input when opened
  useEffect(() => {
    if (open) {
      // Small delay to let the DOM render
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  // Scroll selected result into view
  useEffect(() => {
    if (!listRef.current) return
    const selected = listRef.current.querySelector('[data-selected="true"]')
    selected?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  // Execute a result action
  const executeResult = useCallback((result: OmniResult) => {
    close()

    switch (result.category) {
      case 'page':
        navigate(result.action)
        break

      case 'glaze': {
        // Navigate to explorer and select this glaze
        const glazes = getGlazesArray()
        const glaze = glazes.find(g => g.id === result.action)
        if (glaze) {
          navigate('/')
          // Small delay to let the page mount
          setTimeout(() => {
            setSelectedGlaze(glaze)
          }, 100)
        }
        break
      }

      case 'knowledge':
        // Open Digitalfire URL in new tab
        window.open(result.action, '_blank', 'noopener,noreferrer')
        break
    }
  }, [close, navigate, getGlazesArray, setSelectedGlaze])

  // Handle Enter on selected result
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    hookKeyDown(e)

    if (e.key === 'Enter' && flatResults[selectedIndex]) {
      e.preventDefault()
      executeResult(flatResults[selectedIndex])
    }
  }, [hookKeyDown, flatResults, selectedIndex, executeResult])

  if (!open) return null

  const hasResults = flatResults.length > 0
  const hasQuery = query.trim().length >= 2
  const showKnowledgeAttribution = grouped.knowledge.length > 0

  // Build ordered sections
  const sections: { category: ResultCategory; items: OmniResult[] }[] = []
  if (grouped.page.length) sections.push({ category: 'page', items: grouped.page })
  if (grouped.glaze.length) sections.push({ category: 'glaze', items: grouped.glaze })
  if (grouped.knowledge.length) sections.push({ category: 'knowledge', items: grouped.knowledge })

  // Compute global index offsets for keyboard navigation
  let globalIndex = 0

  return (
    <>
      <div className="omni-backdrop" onClick={close} />
      <div className="omni-container" role="dialog" aria-label="Search">
        <div className="omni-input-row">
          <span className="omni-search-icon">⌘K</span>
          <input
            ref={inputRef}
            type="text"
            className="omni-input"
            placeholder="Search glazes, materials, oxides, articles..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          <button className="omni-close" onClick={close} aria-label="Close search">
            Esc
          </button>
        </div>

        <div className="omni-results" ref={listRef}>
          {!hasQuery && (
            <div className="omni-hint">
              Type to search across glazes, Digitalfire materials, oxides, glossary, and more.
            </div>
          )}

          {hasQuery && !hasResults && (
            <div className="omni-empty">No results for "{query}"</div>
          )}

          {sections.map(section => {
            const sectionStart = globalIndex
            return (
              <div key={section.category} className="omni-section">
                <div className="omni-section-label">
                  <span>{CATEGORY_ICON[section.category]}</span>
                  {CATEGORY_LABEL[section.category]}
                </div>
                {section.items.map((item, i) => {
                  const idx = sectionStart + i
                  // Advance global index after rendering
                  if (i === section.items.length - 1) {
                    globalIndex = sectionStart + section.items.length
                  }
                  return (
                    <button
                      key={item.id}
                      className={`omni-result${idx === selectedIndex ? ' selected' : ''}`}
                      data-selected={idx === selectedIndex}
                      onClick={() => executeResult(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="omni-result-main">
                        <span className="omni-result-title">{item.title}</span>
                        {item.badge && (
                          <span
                            className="omni-badge"
                            style={{ background: BADGE_COLORS[item.badge] || 'var(--bg-input)' }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <div className="omni-result-subtitle">{item.subtitle}</div>
                      )}
                      <span className="omni-result-action">
                        {item.category === 'knowledge' ? '↗' : '↵'}
                      </span>
                    </button>
                  )
                })}
              </div>
            )
          })}

          {showKnowledgeAttribution && (
            <div className="omni-attribution">
              {DIGITALFIRE_ATTRIBUTION.text} ·{' '}
              <a href={DIGITALFIRE_ATTRIBUTION.url} target="_blank" rel="noopener noreferrer">
                digitalfire.com
              </a>
            </div>
          )}
        </div>

        <style>{`
          .omni-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9998;
            animation: omni-fade-in 0.12s ease;
          }

          .omni-container {
            position: fixed;
            top: min(20vh, 140px);
            left: 50%;
            transform: translateX(-50%);
            width: min(640px, calc(100vw - 32px));
            max-height: 70vh;
            background: var(--bg-secondary);
            border: 1px solid var(--border-secondary);
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            animation: omni-slide-in 0.15s ease;
            overflow: hidden;
          }

          .omni-input-row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 16px;
            border-bottom: 1px solid var(--border-primary);
          }

          .omni-search-icon {
            font-size: 11px;
            font-weight: 700;
            color: var(--text-muted);
            background: var(--bg-input);
            border: 1px solid var(--border-secondary);
            border-radius: 5px;
            padding: 3px 7px;
            white-space: nowrap;
            flex-shrink: 0;
          }

          .omni-input {
            flex: 1;
            background: none;
            border: none;
            outline: none;
            font-size: 16px;
            color: var(--text-primary);
            font-family: var(--font-body);
          }

          .omni-input::placeholder {
            color: var(--text-muted);
          }

          .omni-close {
            font-size: 11px;
            font-weight: 600;
            color: var(--text-muted);
            background: var(--bg-input);
            border: 1px solid var(--border-secondary);
            border-radius: 5px;
            padding: 3px 8px;
            cursor: pointer;
            flex-shrink: 0;
            transition: all 0.12s;
          }

          .omni-close:hover {
            color: var(--text-primary);
            border-color: var(--accent);
          }

          .omni-results {
            overflow-y: auto;
            flex: 1;
            padding: 6px 0;
          }

          .omni-hint,
          .omni-empty {
            padding: 24px 20px;
            text-align: center;
            color: var(--text-muted);
            font-size: 14px;
          }

          .omni-section {
            padding: 4px 0;
          }

          .omni-section-label {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 16px 4px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
          }

          .omni-result {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            padding: 8px 16px;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            font-family: var(--font-body);
            transition: background 0.08s;
            color: var(--text-primary);
          }

          .omni-result:hover,
          .omni-result.selected {
            background: var(--bg-elevated);
          }

          .omni-result.selected {
            border-left: 2px solid var(--accent);
            padding-left: 14px;
          }

          .omni-result-main {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            min-width: 0;
          }

          .omni-result-title {
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .omni-badge {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #fff;
            padding: 1px 6px;
            border-radius: 4px;
            flex-shrink: 0;
          }

          .omni-result-subtitle {
            font-size: 12px;
            color: var(--text-muted);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 220px;
            flex-shrink: 1;
          }

          .omni-result-action {
            font-size: 14px;
            color: var(--text-dim);
            flex-shrink: 0;
            margin-left: auto;
          }

          .omni-attribution {
            padding: 8px 16px;
            font-size: 11px;
            color: var(--text-dim);
            border-top: 1px solid var(--border-subtle);
            text-align: center;
          }

          .omni-attribution a {
            color: var(--text-link);
            text-decoration: none;
          }

          .omni-attribution a:hover {
            text-decoration: underline;
          }

          @keyframes omni-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes omni-slide-in {
            from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.98); }
            to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          }

          @media (max-width: 640px) {
            .omni-container {
              top: 12px;
              border-radius: 8px;
            }

            .omni-result-subtitle {
              display: none;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export default OmniSearch
