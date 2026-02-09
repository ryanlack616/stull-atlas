/**
 * Historical Timeline Page
 *
 * An interactive timeline of ceramic science — from the first fired clay (~18,000 BCE)
 * to the digital age. ~160 events across six eras.
 * Scrollable, filterable, with expandable detail cards and thematic threads.
 */

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { usePageTitle } from '@/hooks'
import {
  EVENTS, ERAS, CATEGORY_META, THEMATIC_THREADS,
  formatYear, getDescription, filterByDensity,
  type EventCategory, type TimelineEvent, type ReadingLevel, type Density,
} from './timelineData'

// Event count
const TOTAL_EVENTS = EVENTS.length
const INFLECTION_COUNT = EVENTS.filter(e => e.inflectionPoint).length

// ─── Component ─────────────────────────────────────────────────────

export function TimelinePage() {
  usePageTitle('Historical Timeline')
  const [filter, setFilter] = useState<EventCategory | 'all'>('all')
  const [expandedKey, setExpandedKey] = useState<string | null>(null)
  const [showThemes, setShowThemes] = useState(false)
  const [showSources, setShowSources] = useState(false)
  const [onlyInflections, setOnlyInflections] = useState(false)
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('standard')
  const [density, setDensity] = useState<Density>('standard')
  const [showAncient, setShowAncient] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const ancientCutoff = 1750

  const filtered = useMemo(() => {
    let events = filter === 'all' ? EVENTS : EVENTS.filter(e => e.category === filter)
    if (onlyInflections) events = events.filter(e => e.inflectionPoint)
    else events = filterByDensity(events, density)
    return events.sort((a, b) => a.year - b.year)
  }, [filter, onlyInflections, density])

  const ancientEvents = useMemo(() => filtered.filter(e => e.year < ancientCutoff), [filtered])
  const modernEvents = useMemo(() => filtered.filter(e => e.year >= ancientCutoff), [filtered])
  const ancientEras = useMemo(() => ERAS.filter(e => e.end <= ancientCutoff), [])  
  const modernEras = useMemo(() => ERAS.filter(e => e.end > ancientCutoff), [])

  const eventKey = (event: TimelineEvent) => `${event.year}-${event.title}`

  const toggle = (key: string) => {
    setExpandedKey(prev => prev === key ? null : key)
  }

  // Scroll to top on load
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = 0
    }
  }, [])

  // Format era year ranges for display
  const formatEraRange = (start: number, end: number) => {
    const s = start < 0 ? `${Math.abs(start).toLocaleString()} BCE` : `${start}`
    const e = end < 0 ? `${Math.abs(end).toLocaleString()} BCE` : `${end}`
    return `${s} – ${e}`
  }

  return (
    <>
      <style>{timelineStyles}</style>
      <div className="timeline-page">
        {/* Header */}
        <div className="timeline-header">
          <h2>History of Ceramic Science</h2>
          <p className="subtitle">
            From the Industrial Revolution to the digital age — showing {modernEvents.length} of {TOTAL_EVENTS} events.
            {ancientEvents.length > 0 && !showAncient && ` ${ancientEvents.length} earlier events (pre-1750) hidden.`}
            {showAncient && ` Including ${ancientEvents.length} ancient & medieval events.`}
          </p>

          {/* Controls row */}
          <div className="timeline-controls">
            {/* Category filter */}
            <div className="category-filters" role="tablist" aria-label="Filter events by category">
              <button
                className={`cat-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
                role="tab"
                aria-selected={filter === 'all'}
              >
                All ({TOTAL_EVENTS})
              </button>
              {(Object.keys(CATEGORY_META) as EventCategory[]).map(cat => {
                const count = EVENTS.filter(e => e.category === cat).length
                return (
                  <button
                    key={cat}
                    className={`cat-btn ${filter === cat ? 'active' : ''}`}
                    onClick={() => setFilter(cat)}
                    role="tab"
                    aria-selected={filter === cat}
                    style={{ '--cat-color': CATEGORY_META[cat].color } as React.CSSProperties}
                  >
                    <span className="cat-icon" aria-hidden="true">{CATEGORY_META[cat].icon}</span>
                    {CATEGORY_META[cat].label} ({count})
                  </button>
                )
              })}
            </div>

            {/* Toggle buttons */}
            <div className="toggle-row">
              <button
                className={`toggle-btn ${onlyInflections ? 'active' : ''}`}
                onClick={() => setOnlyInflections(v => !v)}
                title={`Show only the ${INFLECTION_COUNT} paradigm-shifting moments`}
              >
                ⚡ Inflection Points ({INFLECTION_COUNT})
              </button>
              <button
                className={`toggle-btn ${showThemes ? 'active' : ''}`}
                onClick={() => setShowThemes(v => !v)}
              >
                🧵 Thematic Threads
              </button>
            </div>

            {/* Reading Level + Density */}
            <div className="toggle-row">
              {/* Reading Level */}
              <div className="level-group">
                <span className="level-label">Reading level:</span>
                {([['simple', '🌱 Simple'], ['standard', '📖 Standard'], ['detailed', '🔬 Detailed']] as const).map(([lvl, lbl]) => (
                  <button
                    key={lvl}
                    className={`level-btn ${readingLevel === lvl ? 'active' : ''}`}
                    onClick={() => setReadingLevel(lvl)}
                  >
                    {lbl}
                  </button>
                ))}
              </div>

              {/* Density */}
              <div className="level-group">
                <span className="level-label">Detail:</span>
                {([['condensed', 'Condensed'], ['standard', 'Standard'], ['full', 'Full']] as const).map(([d, lbl]) => (
                  <button
                    key={d}
                    className={`level-btn ${density === d ? 'active' : ''}`}
                    onClick={() => setDensity(d)}
                    disabled={onlyInflections}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Thematic Threads Panel */}
        {showThemes && (
          <div className="themes-panel">
            <div className="themes-grid">
              {THEMATIC_THREADS.map(thread => (
                <div key={thread.theme} className="theme-card">
                  <h4>{thread.theme}</h4>
                  <p className="theme-desc">{thread.description}</p>
                  <ul className="theme-moments">
                    {thread.keyMoments.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="timeline-scroll" ref={timelineRef}>
          <div className="timeline-track" role="list" aria-label="Historical events">

            {/* Pre-1750: collapsed by default */}
            {ancientEvents.length > 0 && (
              <div className="ancient-section">
                <button
                  className={`ancient-toggle ${showAncient ? 'open' : ''}`}
                  onClick={() => setShowAncient(v => !v)}
                  aria-expanded={showAncient}
                >
                  <span className="ancient-icon">🏺</span>
                  <span>
                    {showAncient ? 'Hide' : 'Show'} Pre-1750: Ancient & Medieval Origins
                  </span>
                  <span className="ancient-count">
                    {ancientEvents.length} event{ancientEvents.length !== 1 ? 's' : ''} &middot; 18,000 BCE – 1750
                  </span>
                  <span className="ancient-chevron">{showAncient ? '▴' : '▾'}</span>
                </button>

                {showAncient && (
                  <div className="ancient-events">
                    {ancientEras.map(era => (
                      <div
                        key={era.label}
                        className="era-label"
                        style={{ '--era-color': era.color } as React.CSSProperties}
                      >
                        <span>{era.label}</span>
                        <span className="era-years">{formatEraRange(era.start, era.end)}</span>
                      </div>
                    ))}
                    {ancientEvents.map((event, i) => {
                      const meta = CATEGORY_META[event.category]
                      const key = eventKey(event)
                      const isExpanded = expandedKey === key
                      const isLeft = i % 2 === 0
                      const yearDisplay = formatYear(event.year, event.approximate)
                      const endYearDisplay = event.endYear ? `–${formatYear(event.endYear, false)}` : ''
                      return (
                        <div
                          key={key}
                          className={[
                            'timeline-event',
                            isLeft ? 'left' : 'right',
                            `sig-${event.significance}`,
                            isExpanded ? 'expanded' : '',
                            event.inflectionPoint ? 'inflection' : '',
                          ].filter(Boolean).join(' ')}
                          role="listitem"
                        >
                          <div className="year-dot" style={{ background: meta.color }} aria-hidden="true">
                            {event.inflectionPoint && <span className="inflection-ring" />}
                          </div>
                          <div className="year-label">{yearDisplay}{endYearDisplay}</div>
                          <button
                            className="event-card"
                            onClick={() => toggle(key)}
                            aria-expanded={isExpanded}
                            style={{ '--card-accent': meta.color } as React.CSSProperties}
                          >
                            <div className="event-head">
                              <span className="event-icon" aria-hidden="true">{meta.icon}</span>
                              <h3 className="event-title">
                                {event.inflectionPoint && <span className="inflection-marker" title="Inflection point">⚡</span>}
                                {event.title}
                              </h3>
                            </div>
                            {isExpanded && (
                              <div className="event-detail">
                                {event.image && (
                                  <figure className="event-image">
                                    <img src={event.image.src} alt={event.image.alt} loading="lazy" />
                                    {event.image.credit && <figcaption>{event.image.credit}</figcaption>}
                                  </figure>
                                )}
                                <p>{getDescription(event, readingLevel)}</p>
                                {event.people && event.people.length > 0 && (
                                  <div className="event-people">
                                    {event.people.map(p => <span key={p} className="person-tag">{p}</span>)}
                                  </div>
                                )}
                                {event.links && event.links.length > 0 && (
                                  <div className="event-links">
                                    {event.links.map(l => (
                                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                                         onClick={e => e.stopPropagation()}>
                                        {l.label} ↗
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Modern eras (1750+) */}
            {modernEras.map(era => (
              <div
                key={era.label}
                className="era-label"
                style={{ '--era-color': era.color } as React.CSSProperties}
              >
                <span>{era.label}</span>
                <span className="era-years">{formatEraRange(era.start, era.end)}</span>
              </div>
            ))}

            {/* Modern events (1750+) */}
            {modernEvents.map((event, i) => {
              const meta = CATEGORY_META[event.category]
              const key = eventKey(event)
              const isExpanded = expandedKey === key
              const isLeft = i % 2 === 0

              const yearDisplay = formatYear(event.year, event.approximate)
              const endYearDisplay = event.endYear
                ? `–${formatYear(event.endYear, false)}`
                : ''

              return (
                <div
                  key={key}
                  className={[
                    'timeline-event',
                    isLeft ? 'left' : 'right',
                    `sig-${event.significance}`,
                    isExpanded ? 'expanded' : '',
                    event.inflectionPoint ? 'inflection' : '',
                  ].filter(Boolean).join(' ')}
                  role="listitem"
                >
                  {/* Year marker */}
                  <div className="year-dot" style={{ background: meta.color }} aria-hidden="true">
                    {event.inflectionPoint && <span className="inflection-ring" />}
                  </div>
                  <div className="year-label">{yearDisplay}{endYearDisplay}</div>

                  {/* Card */}
                  <button
                    className="event-card"
                    onClick={() => toggle(key)}
                    aria-expanded={isExpanded}
                    style={{ '--card-accent': meta.color } as React.CSSProperties}
                  >
                    <div className="event-head">
                      <span className="event-icon" aria-hidden="true">{meta.icon}</span>
                      <h3 className="event-title">
                        {event.inflectionPoint && <span className="inflection-marker" title="Inflection point">⚡</span>}
                        {event.title}
                      </h3>
                    </div>

                    {isExpanded && (
                      <div className="event-detail">
                        {event.image && (
                          <figure className="event-image">
                            <img src={event.image.src} alt={event.image.alt} loading="lazy" />
                            {event.image.credit && <figcaption>{event.image.credit}</figcaption>}
                          </figure>
                        )}
                        <p>{getDescription(event, readingLevel)}</p>
                        {event.people && event.people.length > 0 && (
                          <div className="event-people">
                            {event.people.map(p => (
                              <span key={p} className="person-tag">{p}</span>
                            ))}
                          </div>
                        )}
                        {event.links && event.links.length > 0 && (
                          <div className="event-links">
                            {event.links.map(l => (
                              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                                 onClick={e => e.stopPropagation()}>
                                {l.label} ↗
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Sources & Bibliography */}
          <div className="sources-section">
            <button
              className="sources-toggle"
              onClick={() => setShowSources(v => !v)}
              aria-expanded={showSources}
            >
              📚 Sources & Bibliography {showSources ? '▾' : '▸'}
            </button>
            {showSources && (
              <div className="sources-content">
                <p className="sources-note">
                  This timeline was compiled from primary sources, scholarly references, and community
                  knowledge. Key references include:
                </p>
                <ul className="sources-list">
                  <li>
                    <strong>Stull, R.T.</strong> (1912). "Influences of Variable Silica and Alumina on Porcelain
                    Glazes of Constant RO." <em>Transactions of the American Ceramic Society</em>, Vol. XIV, pp. 62–70.
                  </li>
                  <li>
                    <strong>Rhodes, Daniel</strong> (1957). <em>Clay and Glazes for the Potter</em>. Philadelphia: Chilton.
                  </li>
                  <li>
                    <strong>Currie, Ian</strong> (1990). <em>Stoneware Glazes: A Systematic Approach</em>. Bootstrap Press.
                  </li>
                  <li>
                    <strong>Hesselberth, John & Roy, Ron</strong> (2003). <em>Mastering Cone 6 Glazes</em>. Glaze Master Press.
                  </li>
                  <li>
                    <strong>Britt, John</strong> (2007). <em>The Complete Guide to High-Fire Glazes</em>. Lark Books.
                  </li>
                  <li>
                    <strong>Finkelnburg, Dave</strong> (2021). "Techno File: Surface Science." <em>Ceramics Monthly</em>, February 2021.
                  </li>
                  <li>
                    <strong>Katz, Matt</strong>. Ceramic Materials Workshop — <a href="https://ceramicmaterialsworkshop.com" target="_blank" rel="noopener noreferrer">ceramicmaterialsworkshop.com</a>
                  </li>
                  <li>
                    <strong>Philipau, Derek</strong>. Glazy — <a href="https://glazy.org" target="_blank" rel="noopener noreferrer">glazy.org</a> & <a href="https://wiki.glazy.org" target="_blank" rel="noopener noreferrer">Glazy Wiki</a>
                  </li>
                  <li>
                    <strong>Hansen, Tony</strong>. Digitalfire — <a href="https://digitalfire.com" target="_blank" rel="noopener noreferrer">digitalfire.com</a>
                  </li>
                </ul>
                <p className="sources-disclaimer">
                  Corrections and additions welcome — this timeline is a living document.
                  If you spot an error or know of a missing milestone, please reach out.
                </p>
              </div>
            )}
          </div>

          {/* Dedication */}
          <div className="dedication">
            <div className="dedication-line" />
            <p className="dedication-text">
              For Warren MacKenzie (1924–2018)<br />
              who made honest pots and gave them away,<br />
              and taught us that a good cup is enough.
            </p>
            <p className="dedication-wish">
              I wish I could have said thank you.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Styles ────────────────────────────────────────────────────────

const timelineStyles = `
  .timeline-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  .timeline-header {
    padding: 32px 40px 20px;
    border-bottom: 1px solid var(--border-primary);
    background: var(--bg-secondary);
    flex-shrink: 0;
  }

  .timeline-header h2 {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 600;
  }

  .timeline-header .subtitle {
    margin: 0 0 20px;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.5;
    max-width: 700px;
  }

  .timeline-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .toggle-row {
    display: flex;
    gap: 8px;
  }

  .toggle-btn {
    padding: 4px 12px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 16px;
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .toggle-btn:hover {
    border-color: var(--accent);
    color: var(--text-bright);
  }

  .toggle-btn.active {
    background: var(--accent-bg, rgba(99, 102, 241, 0.15));
    border-color: var(--accent);
    color: var(--text-bright);
  }

  /* Reading level & density controls */
  .level-group {
    display: flex;
    align-items: center;
    gap: 4px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 16px;
    padding: 2px 4px;
  }

  .level-label {
    font-size: 11px;
    color: var(--text-muted);
    padding: 0 6px;
    white-space: nowrap;
  }

  .level-btn {
    padding: 3px 10px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 12px;
    color: var(--text-secondary);
    font-size: 11px;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
    white-space: nowrap;
  }

  .level-btn:hover:not(:disabled) {
    color: var(--text-bright);
    background: var(--bg-hover);
  }

  .level-btn.active {
    background: var(--accent-bg, rgba(99, 102, 241, 0.15));
    border-color: var(--accent);
    color: var(--text-bright);
  }

  .level-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Themes panel */
  .themes-panel {
    border-bottom: 1px solid var(--border-primary);
    background: var(--bg-secondary);
    padding: 16px 40px;
    overflow-x: auto;
  }

  .themes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }

  .theme-card {
    padding: 12px 16px;
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
  }

  .theme-card h4 {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-bright);
  }

  .theme-desc {
    margin: 0 0 8px;
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.4;
  }

  .theme-moments {
    margin: 0;
    padding: 0 0 0 16px;
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .theme-moments li {
    margin-bottom: 2px;
  }

  .cat-btn {
    padding: 5px 12px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 20px;
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.15s;
  }

  .cat-btn:hover {
    border-color: var(--cat-color, var(--accent));
    color: var(--text-bright);
  }

  .cat-btn.active {
    background: var(--cat-color, var(--accent-bg));
    border-color: var(--cat-color, var(--accent));
    color: var(--text-bright);
  }

  .cat-icon {
    font-size: 14px;
  }

  /* Timeline scroll area */
  .timeline-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 32px 40px;
  }

  /* Ancient section toggle */
  .ancient-section {
    margin-bottom: 24px;
  }

  .ancient-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 14px 20px;
    background: var(--bg-tertiary);
    border: 1px dashed var(--border-secondary);
    border-radius: 10px;
    color: var(--text-secondary);
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }

  .ancient-toggle:hover {
    border-color: var(--accent);
    color: var(--text-bright);
    background: var(--bg-hover);
  }

  .ancient-toggle.open {
    border-style: solid;
    border-color: var(--accent);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 0;
  }

  .ancient-icon {
    font-size: 18px;
  }

  .ancient-count {
    margin-left: auto;
    font-size: 12px;
    color: var(--text-muted);
    white-space: nowrap;
  }

  .ancient-chevron {
    font-size: 12px;
    color: var(--text-muted);
  }

  .ancient-events {
    border: 1px solid var(--accent);
    border-top: none;
    border-radius: 0 0 10px 10px;
    padding: 16px 0 8px;
    margin-bottom: 24px;
    background: var(--bg-secondary);
  }

  .timeline-track {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding-left: 40px;
  }

  /* Vertical line */
  .timeline-track::before {
    content: '';
    position: absolute;
    left: 16px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-primary);
  }

  /* Era labels */
  .era-label {
    padding: 8px 0 8px 40px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-dim);
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 300px;
  }

  .era-years {
    font-weight: 400;
    font-size: 10px;
    color: var(--text-muted);
  }

  /* Event */
  .timeline-event {
    position: relative;
    padding: 0 0 24px 40px;
  }

  .year-dot {
    position: absolute;
    left: 10px;
    top: 8px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid var(--bg-primary);
    z-index: 1;
  }

  .sig-1 .year-dot { width: 18px; height: 18px; left: 8px; }
  .sig-3 .year-dot { width: 10px; height: 10px; left: 12px; top: 10px; }

  /* Inflection point ring */
  .inflection .year-dot {
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.4);
  }

  .inflection-ring {
    display: none;
  }

  .inflection-marker {
    margin-right: 4px;
    font-size: 12px;
  }

  .year-label {
    position: absolute;
    left: -60px;
    top: 6px;
    font-size: 12px;
    font-family: 'SF Mono', 'Fira Code', monospace;
    color: var(--text-muted);
    width: 60px;
    text-align: right;
    padding-right: 12px;
  }

  .sig-1 .year-label {
    font-weight: 700;
    color: var(--text-secondary);
  }

  /* Event Card */
  .event-card {
    display: block;
    width: 100%;
    padding: 12px 16px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-left: 3px solid var(--card-accent, var(--accent));
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    color: var(--text-primary);
    transition: all 0.15s;
    font-family: inherit;
    font-size: inherit;
  }

  .event-card:hover {
    border-color: var(--card-accent, var(--accent));
    background: var(--bg-hover);
  }

  .sig-1 .event-card {
    border-left-width: 4px;
  }

  .event-head {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .event-icon {
    font-size: 18px;
    flex-shrink: 0;
  }

  .event-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  .sig-1 .event-title {
    font-size: 15px;
  }

  .sig-3 .event-title {
    font-size: 13px;
    font-weight: 500;
  }

  /* Expanded detail */
  .event-detail {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--border-subtle);
  }

  .event-detail p {
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-body);
  }

  .event-people {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }

  .person-tag {
    padding: 2px 8px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 12px;
    font-size: 11px;
    color: var(--text-label);
  }

  .event-image {
    margin: 0 0 12px 0;
    padding: 0;
    border-radius: 6px;
    overflow: hidden;
  }

  .event-image img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 6px;
    max-height: 320px;
    object-fit: cover;
  }

  .event-image figcaption {
    margin-top: 6px;
    font-size: 11px;
    color: var(--text-muted);
    font-style: italic;
    line-height: 1.4;
  }

  .event-links {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }

  .event-links a {
    font-size: 12px;
    color: var(--text-link);
    text-decoration: none;
  }

  .event-links a:hover {
    text-decoration: underline;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .timeline-header {
      padding: 20px 16px 16px;
    }

    .timeline-header h2 {
      font-size: 20px;
    }

    .themes-panel {
      padding: 12px 16px;
    }

    .themes-grid {
      grid-template-columns: 1fr;
    }

    .toggle-row {
      flex-wrap: wrap;
    }

    .timeline-scroll {
      padding: 20px 16px;
    }

    .timeline-track {
      padding-left: 32px;
    }

    .year-label {
      position: static;
      width: auto;
      text-align: left;
      padding: 0 0 2px 0;
      font-size: 11px;
    }

    .timeline-event {
      padding-left: 32px;
    }

    .year-dot {
      left: 4px;
    }

    .timeline-track::before {
      left: 10px;
    }

    .event-card {
      padding: 10px 12px;
    }

    .category-filters {
      overflow-x: auto;
      flex-wrap: nowrap;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .category-filters::-webkit-scrollbar { display: none; }

    .cat-btn {
      white-space: nowrap;
      flex-shrink: 0;
    }
  }

  @media (max-width: 480px) {
    .event-title {
      font-size: 13px !important;
    }

    .event-detail p {
      font-size: 12px;
    }
  }

  /* Print */
  @media print {
    .timeline-page {
      overflow: visible;
      height: auto;
    }

    .timeline-scroll {
      overflow: visible;
    }

    .category-filters {
      display: none;
    }

    .event-card {
      page-break-inside: avoid;
    }

    .event-detail {
      display: block !important;
    }
  }

  /* Sources section */
  .sources-section {
    max-width: 800px;
    margin: 40px auto 20px;
    padding: 0 0 0 40px;
  }

  .sources-toggle {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    padding: 10px 16px;
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    width: 100%;
    text-align: left;
    transition: all 0.15s;
  }

  .sources-toggle:hover {
    border-color: var(--accent);
    color: var(--text-bright);
  }

  .sources-content {
    margin-top: 8px;
    padding: 16px 20px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
  }

  .sources-note {
    margin: 0 0 12px;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .sources-list {
    margin: 0 0 12px;
    padding: 0 0 0 20px;
    font-size: 12px;
    color: var(--text-body);
    line-height: 1.7;
  }

  .sources-list li {
    margin-bottom: 6px;
  }

  .sources-list em {
    font-style: italic;
  }

  .sources-list a {
    color: var(--text-link);
    text-decoration: none;
  }

  .sources-list a:hover {
    text-decoration: underline;
  }

  .sources-disclaimer {
    margin: 0;
    font-size: 11px;
    color: var(--text-muted);
    font-style: italic;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .sources-section {
      padding-left: 0;
    }
  }

  /* Dedication */
  .dedication {
    max-width: 480px;
    margin: 48px auto 32px;
    text-align: center;
  }

  .dedication-line {
    width: 40px;
    height: 1px;
    background: var(--text-muted);
    margin: 0 auto 24px;
    opacity: 0.4;
  }

  .dedication-text {
    margin: 0 0 16px;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.8;
    letter-spacing: 0.01em;
  }

  .dedication-wish {
    margin: 0;
    font-size: 12px;
    color: var(--text-muted);
    font-style: italic;
  }
`
