/**
 * Calculation Trace Viewer
 * 
 * "Show Your Work" — expandable panel showing every step
 * of a UMF calculation. Builds trust in results.
 */

import React, { useState } from 'react'
import { CalculationStep } from '@/types'

interface TraceViewerProps {
  trace: CalculationStep[]
  title?: string
}

const OP_COLORS: Record<string, string> = {
  begin: '#3498db',
  material_resolution: '#2ecc71',
  oxide_contribution: '#e67e22',
  flux_sum: '#9b59b6',
  normalize: '#1abc9c',
  derived_values: '#e74c3c',
  verify: '#95a5a6',
  simplex_start: '#3498db',
  simplex_complete: '#2ecc71',
  grid_start: '#3498db',
  grid_complete: '#2ecc71',
}

export function TraceViewer({ trace, title = 'Calculation Trace' }: TraceViewerProps) {
  const [expanded, setExpanded] = useState(false)
  const [filter, setFilter] = useState<string | null>(null)

  const filtered = filter
    ? trace.filter(s => s.operation === filter)
    : trace

  const operations = [...new Set(trace.map(s => s.operation))]

  if (trace.length === 0) return null

  return (
    <div style={{
      border: '1px solid var(--border-primary)',
      borderRadius: 8,
      overflow: 'hidden',
      background: 'var(--bg-secondary)',
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          fontSize: 13,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>
          {expanded ? '▾' : '▸'} {title}
          <span style={{ color: 'var(--text-dim)', marginLeft: 8 }}>{trace.length} steps</span>
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>Show Your Work</span>
      </button>

      {expanded && (
        <div style={{ padding: '0 16px 16px' }}>
          {/* Operation filter chips */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
            <button
              onClick={() => setFilter(null)}
              style={{
                ...chipStyle,
                background: filter === null ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                borderColor: filter === null ? 'var(--accent)' : 'var(--border-primary)',
                color: filter === null ? 'var(--text-bright)' : 'var(--text-secondary)',
              }}
            >
              All
            </button>
            {operations.map(op => (
              <button
                key={op}
                onClick={() => setFilter(filter === op ? null : op)}
                style={{
                  ...chipStyle,
                  background: filter === op ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                  borderColor: filter === op ? 'var(--accent)' : 'var(--border-primary)',
                  color: filter === op ? 'var(--text-bright)' : 'var(--text-secondary)',
                }}
              >
                {op.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          {/* Steps */}
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {filtered.map((step, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 10px',
                  marginBottom: 2,
                  background: '#161616',
                  borderRadius: 4,
                  borderLeft: `3px solid ${OP_COLORS[step.operation] || '#555'}`,
                  fontSize: 12,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ color: OP_COLORS[step.operation] || '#888', fontWeight: 600 }}>
                    {step.operation.replace(/_/g, ' ')}
                  </span>
                  {step.output !== undefined && (
                    <span style={{ fontFamily: "'SF Mono', monospace", color: '#aaa' }}>
                      → {typeof step.output === 'number' ? step.output.toFixed(4) : JSON.stringify(step.output)}
                    </span>
                  )}
                </div>
                {step.note && (
                  <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{step.note}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const chipStyle: React.CSSProperties = {
  padding: '3px 8px',
  border: '1px solid var(--border-primary)',
  borderRadius: 4,
  fontSize: 10,
  cursor: 'pointer',
  background: 'var(--bg-tertiary)',
  color: 'var(--text-secondary)',
  textTransform: 'capitalize',
}

export default TraceViewer
