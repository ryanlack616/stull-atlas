/**
 * DatasetStats — Compact summary of the loaded glaze dataset
 *
 * Shows total count + breakdowns by cone, surface, and glaze type.
 * Renders as a small expandable panel.
 */

import React, { useMemo, useState } from 'react'
import { useGlazeStore } from '@/stores'
import { glazeTypeName, glazeTypeColor } from '@/domain/glaze/glazeTypes'

export function DatasetStats() {
  const glazes = useGlazeStore(s => s.glazes)
  const [expanded, setExpanded] = useState(false)

  const stats = useMemo(() => {
    const all = Array.from(glazes.values())
    const bySurface = new Map<string, number>()
    const byType = new Map<number | null, number>()

    for (const g of all) {
      // Surface
      bySurface.set(g.surfaceType, (bySurface.get(g.surfaceType) ?? 0) + 1)

      // Glaze type
      const tid = g.glazeTypeId ?? null
      byType.set(tid, (byType.get(tid) ?? 0) + 1)
    }

    // Sort type by count descending, take top 8
    const topTypes = [...byType.entries()]
      .filter(([id]) => id !== null)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)

    const unclassified = byType.get(null) ?? 0

    return { total: all.length, bySurface, topTypes, unclassified }
  }, [glazes])

  if (stats.total === 0) return null

  return (
    <div style={{ fontSize: 11, color: 'var(--text-label)' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: 11,
          padding: '4px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          width: '100%',
        }}
      >
        <span style={{ fontSize: 9 }}>{expanded ? '▾' : '▸'}</span>
        {stats.total.toLocaleString()} glazes loaded
      </button>

      {expanded && (
        <div style={{ padding: '4px 0 8px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Surface breakdown */}
          <div>
            <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>By surface</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 8px' }}>
              {['gloss', 'matte', 'satin', 'crystalline', 'crawl', 'unknown'].map(s => {
                const count = stats.bySurface.get(s) ?? 0
                if (count === 0) return null
                return (
                  <span key={s}>
                    {s}: <strong>{count}</strong>
                  </span>
                )
              })}
            </div>
          </div>

          {/* Top glaze types */}
          <div>
            <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Top glaze types</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {stats.topTypes.map(([id, count]) => (
                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: glazeTypeColor(id),
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ flex: 1 }}>{glazeTypeName(id)}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{count}</span>
                </div>
              ))}
              {stats.unclassified > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#555',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ flex: 1, color: 'var(--text-muted)' }}>Unclassified</span>
                  <span style={{ color: 'var(--text-muted)' }}>{stats.unclassified}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatasetStats
