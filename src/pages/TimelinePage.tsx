/**
 * Historical Timeline Page
 *
 * An interactive timeline of ceramic science — from Wedgwood (1782) to the digital era.
 * Scrollable, filterable, with expandable detail cards.
 * Data sourced from the Ceramics Knowledge Platform plan.
 */

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'

// ─── Data ──────────────────────────────────────────────────────────

interface TimelineEvent {
  year: number
  endYear?: number
  title: string
  description: string
  category: EventCategory
  people?: string[]
  links?: { label: string; url: string }[]
  significance: 1 | 2 | 3  // 1 = landmark, 2 = important, 3 = notable
}

type EventCategory = 'science' | 'technology' | 'publication' | 'institution' | 'digital' | 'community'

const CATEGORY_META: Record<EventCategory, { label: string; color: string; icon: string }> = {
  science:     { label: 'Science',     color: '#3498db', icon: '🔬' },
  technology:  { label: 'Technology',  color: '#e67e22', icon: '⚙️' },
  publication: { label: 'Publication', color: '#9b59b6', icon: '📖' },
  institution: { label: 'Institution', color: '#2ecc71', icon: '🏛️' },
  digital:     { label: 'Digital',     color: '#e74c3c', icon: '💻' },
  community:   { label: 'Community',   color: '#1abc9c', icon: '🤝' },
}

const EVENTS: TimelineEvent[] = [
  {
    year: 1765,
    endYear: 1813,
    title: 'Lunar Society of Birmingham',
    description: 'Josiah Wedgwood, James Watt, Matthew Boulton, and Erasmus Darwin formed this "club of industrialists," meeting by the full moon. Their collaboration fueled the Industrial Revolution and established ceramics as a subject of serious scientific inquiry.',
    category: 'institution',
    people: ['Josiah Wedgwood', 'James Watt', 'Matthew Boulton'],
    significance: 1,
  },
  {
    year: 1782,
    title: 'Wedgwood\u2019s Pyrometer',
    description: 'Josiah Wedgwood invented the first pyrometric device for measuring kiln temperatures, presenting it to the Royal Society. This was the first systematic attempt to quantify firing, replacing guesswork with measurement.',
    category: 'science',
    people: ['Josiah Wedgwood'],
    significance: 1,
  },
  {
    year: 1839,
    endYear: 1893,
    title: 'Hermann Seger — Unity Molecular Formula',
    description: 'German chemist Hermann Seger developed the Unity Molecular Formula (UMF) system that remains the foundation of glaze chemistry. He created Seger cones for measuring heatwork and systematized how we describe glaze composition.',
    category: 'science',
    people: ['Hermann Seger'],
    significance: 1,
  },
  {
    year: 1863,
    endYear: 1932,
    title: 'Edward Orton Jr. — Pyrometric Cones',
    description: 'Standardized cone manufacturing in the United States, honoring Seger\u2019s legacy while making cone technology widely accessible. Orton cones remain the standard for measuring heatwork in kilns today.',
    category: 'technology',
    people: ['Edward Orton Jr.'],
    significance: 2,
  },
  {
    year: 1902,
    title: 'Seger\u2019s Collected Writings Published (English)',
    description: 'The American Ceramic Society published the English translation of "The Collected Writings of Hermann August Seger," making his foundational work on glaze chemistry accessible to the English-speaking world.',
    category: 'publication',
    significance: 2,
  },
  {
    year: 1912,
    title: 'R.T. Stull — The Stull Chart',
    description: 'R.T. Stull published "Influences of Variable Silica and Alumina on Porcelain Glazes" in Transactions of the American Ceramic Society (Vol. 14, pp. 62–70). This paper mapped the SiO₂:Al₂O₃ relationship defining matte, satin, and gloss zones — the chart this application is named after.',
    category: 'science',
    people: ['R.T. Stull'],
    links: [
      { label: 'Google Books', url: 'https://books.google.com/books?id=9qwYAQAAIAAJ' },
    ],
    significance: 1,
  },
  {
    year: 1914,
    title: 'Stull — Deformation Temperatures',
    description: 'R.T. Stull continued his research with "Deformation Temperatures of Some Porcelain Glazes," expanding the empirical foundation of the SiO₂–Al₂O₃ chart.',
    category: 'science',
    people: ['R.T. Stull'],
    links: [
      { label: 'Archive.org', url: 'https://archive.org/details/deformationtempe21stul' },
    ],
    significance: 3,
  },
  {
    year: 1957,
    title: 'Daniel Rhodes — Clay and Glazes for the Potter',
    description: 'Daniel Rhodes (1911–1989), Alfred University professor, published this landmark textbook that became the standard reference for studio potters. It bridged the gap between ceramic science and studio practice.',
    category: 'publication',
    people: ['Daniel Rhodes'],
    significance: 1,
  },
  {
    year: 1970,
    title: 'Cullen Parmalee — Ceramic Glazes',
    description: 'Parmalee\u2019s "Ceramic Glazes" provided a comprehensive treatment of glaze chemistry including detailed discussion of the Stull chart and its practical applications.',
    category: 'publication',
    people: ['Cullen Parmalee'],
    significance: 2,
  },
  {
    year: 1986,
    title: 'Daniel de Montmollin — Practice of Stoneware Glazes',
    description: 'Brother Daniel de Montmollin published 60 SiO₂–Al₂O₃ charts showing how different flux combinations affect melting behavior at cone 13. A monumental experimental work that remains unmatched in scope.',
    category: 'publication',
    people: ['Daniel de Montmollin'],
    significance: 2,
  },
  {
    year: 1990,
    title: 'Ian Currie — Stoneware Glazes: A Systematic Approach',
    description: 'Ian Currie (d. 2011) introduced the Grid Method for systematic glaze testing. His approach allowed potters to efficiently explore the SiO₂–Al₂O₃ landscape with real test tiles, bridging theory and practice.',
    category: 'publication',
    people: ['Ian Currie'],
    significance: 1,
  },
  {
    year: 1995,
    title: 'Tony Hansen — Digitalfire & Insight',
    description: 'Tony Hansen launched Digitalfire.com and the Insight glaze calculation software, creating the most comprehensive online ceramics encyclopedia with 7,730+ pages. West & Gerrow thermal expansion coefficients became the industry standard through Insight.',
    category: 'digital',
    people: ['Tony Hansen'],
    links: [
      { label: 'Digitalfire', url: 'https://digitalfire.com' },
    ],
    significance: 1,
  },
  {
    year: 2000,
    title: 'Linda Arbuckle — GlazeChem Database',
    description: 'Linda Arbuckle developed the GlazeChem database and educational materials for calculation tutorials, making glaze chemistry more accessible to studio potters.',
    category: 'community',
    people: ['Linda Arbuckle'],
    significance: 3,
  },
  {
    year: 2005,
    title: 'John Sankey — Glaze Database & Expansion Research',
    description: 'John Sankey contributed important thermal expansion research and glaze database work that advanced the community\u2019s shared knowledge of glaze-body fit.',
    category: 'science',
    people: ['John Sankey'],
    significance: 3,
  },
  {
    year: 2016,
    title: 'Derek Philipau — Glazy.org',
    description: 'Derek Philipau launched Glazy, the first open-source ceramics database. With D3.js Stull chart visualization and community-contributed recipes, Glazy became the modern successor to closed-source tools. The glazy-data repository on GitHub opened access to thousands of recipes.',
    category: 'digital',
    people: ['Derek Philipau'],
    links: [
      { label: 'Glazy', url: 'https://glazy.org' },
      { label: 'GitHub', url: 'https://github.com/derekphilipau/glazy-data' },
    ],
    significance: 1,
  },
  {
    year: 2018,
    title: 'Matt Katz — Ceramic Materials Workshop',
    description: 'Matt Katz established the Ceramic Materials Workshop, adapting Stull chart research for modern cone 6 firing. His research on Si:Al ratios and hands-on courses bridged traditional scholarship with contemporary studio practice.',
    category: 'community',
    people: ['Matt Katz'],
    links: [
      { label: 'CMW', url: 'https://ceramicmaterialsworkshop.com' },
    ],
    significance: 2,
  },
  {
    year: 2019,
    title: 'Pieter Mostert — Understanding the Stull Chart',
    description: 'Pieter Mostert published a clear, rigorous explanation of the Stull chart on the Glazy Wiki, including the "forest metaphor" for navigating UMF space. This became one of the most accessible introductions to the topic.',
    category: 'publication',
    people: ['Pieter Mostert'],
    links: [
      { label: 'Glazy Wiki', url: 'https://wiki.glazy.org/t/understanding-the-stull-chart/857.html' },
    ],
    significance: 2,
  },
  {
    year: 2020,
    title: 'Linda Bloomfield — Colour in Glazes (2nd ed.)',
    description: 'Linda Bloomfield\u2019s updated "Colour in Glazes" included sections on the Stull chart, expanding its reach to a broader audience of ceramic artists interested in understanding glaze chemistry.',
    category: 'publication',
    people: ['Linda Bloomfield'],
    significance: 3,
  },
  {
    year: 2026,
    title: 'Stull Atlas — Interactive Explorer',
    description: 'This application: an interactive Stull chart explorer plotting 3,000+ real-world glaze recipes by UMF, with blend calculators, materials database, recipe optimizer, and similarity tools. Built to preserve and extend the tradition from Wedgwood to Glazy.',
    category: 'digital',
    significance: 2,
    links: [
      { label: 'Stull Atlas', url: 'https://rlv.lol/stullv2/' },
    ],
  },
]

// ─── Eras for visual grouping ──────────────────────────────────────

interface Era {
  label: string;
  start: number;
  end: number;
  color: string;
}

const ERAS: Era[] = [
  { label: 'Industrial Revolution',  start: 1760, end: 1830, color: 'rgba(230, 126, 34, 0.06)' },
  { label: 'Age of Systemization',   start: 1830, end: 1920, color: 'rgba(52, 152, 219, 0.06)' },
  { label: 'Modern Studio Ceramics', start: 1920, end: 1990, color: 'rgba(155, 89, 182, 0.06)' },
  { label: 'Digital Era',           start: 1990, end: 2030, color: 'rgba(231, 76, 60, 0.06)' },
]

// ─── Component ─────────────────────────────────────────────────────

export function TimelinePage() {
  usePageTitle('Historical Timeline')
  const [filter, setFilter] = useState<EventCategory | 'all'>('all')
  const [expanded, setExpanded] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const events = filter === 'all' ? EVENTS : EVENTS.filter(e => e.category === filter)
    return events.sort((a, b) => a.year - b.year)
  }, [filter])

  const toggle = (year: number) => {
    setExpanded(prev => prev === year ? null : year)
  }

  // Scroll to bottom (most recent) on load
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = 0
    }
  }, [])

  return (
    <>
      <style>{timelineStyles}</style>
      <div className="timeline-page">
        {/* Header */}
        <div className="timeline-header">
          <h2>History of Ceramic Science</h2>
          <p className="subtitle">From Wedgwood's pyrometer (1782) to the digital age — the people, publications, and breakthroughs that built our understanding of glaze chemistry.</p>

          {/* Category filter */}
          <div className="category-filters" role="tablist" aria-label="Filter events by category">
            <button
              className={`cat-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              role="tab"
              aria-selected={filter === 'all'}
            >
              All
            </button>
            {(Object.keys(CATEGORY_META) as EventCategory[]).map(cat => (
              <button
                key={cat}
                className={`cat-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
                role="tab"
                aria-selected={filter === cat}
                style={{ '--cat-color': CATEGORY_META[cat].color } as React.CSSProperties}
              >
                <span className="cat-icon" aria-hidden="true">{CATEGORY_META[cat].icon}</span>
                {CATEGORY_META[cat].label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-scroll" ref={timelineRef}>
          <div className="timeline-track" role="list" aria-label="Historical events">
            {/* Era backgrounds */}
            {ERAS.map(era => (
              <div
                key={era.label}
                className="era-label"
                style={{ '--era-color': era.color } as React.CSSProperties}
              >
                <span>{era.label}</span>
                <span className="era-years">{era.start}–{era.end}</span>
              </div>
            ))}

            {/* Events */}
            {filtered.map((event, i) => {
              const meta = CATEGORY_META[event.category]
              const isExpanded = expanded === event.year
              const isLeft = i % 2 === 0

              return (
                <div
                  key={`${event.year}-${event.title}`}
                  className={`timeline-event ${isLeft ? 'left' : 'right'} sig-${event.significance} ${isExpanded ? 'expanded' : ''}`}
                  role="listitem"
                >
                  {/* Year marker */}
                  <div className="year-dot" style={{ background: meta.color }} aria-hidden="true" />
                  <div className="year-label">{event.year}{event.endYear ? `–${event.endYear}` : ''}</div>

                  {/* Card */}
                  <button
                    className="event-card"
                    onClick={() => toggle(event.year)}
                    aria-expanded={isExpanded}
                    style={{ '--card-accent': meta.color } as React.CSSProperties}
                  >
                    <div className="event-head">
                      <span className="event-icon" aria-hidden="true">{meta.icon}</span>
                      <h3 className="event-title">{event.title}</h3>
                    </div>

                    {isExpanded && (
                      <div className="event-detail">
                        <p>{event.description}</p>
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

  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
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
`
