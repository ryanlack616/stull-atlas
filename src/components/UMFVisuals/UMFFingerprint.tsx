/**
 * UMF Fingerprint — Compact stacked horizontal bar
 *
 * Shows oxide proportions at a glance, grouped by role:
 *   R₂O fluxes (warm)  |  RO fluxes (earth tones)  |  R₂O₃ stabilizers (cool)  |  RO₂ glass formers (blue)
 *
 * Inspired by Derek Philipau's UMF sparkline concept.
 * Pure SVG, zero dependencies.
 */

import React, { useMemo } from 'react'
import type { UMF, OxideSymbol } from '@/types'

interface UMFFingerprintProps {
  umf: UMF
  width?: number
  height?: number
  /** Show oxide labels inside segments */
  showLabels?: boolean
  /** Compact mode — thinner bar, no labels */
  compact?: boolean
}

// Group definitions with colors
const GROUPS: {
  label: string
  oxides: OxideSymbol[]
  colors: Record<string, string>
}[] = [
  {
    label: 'R₂O',
    oxides: ['Li2O', 'Na2O', 'K2O'],
    colors: {
      Li2O: '#f97316',  // orange
      Na2O: '#ef4444',  // red
      K2O:  '#f59e0b',  // amber
    },
  },
  {
    label: 'RO',
    oxides: ['CaO', 'MgO', 'ZnO', 'BaO', 'SrO', 'PbO'],
    colors: {
      CaO:  '#a3e635',  // lime
      MgO:  '#22c55e',  // green
      ZnO:  '#14b8a6',  // teal
      BaO:  '#6366f1',  // indigo
      SrO:  '#8b5cf6',  // violet
      PbO:  '#78716c',  // stone
    },
  },
  {
    label: 'R₂O₃',
    oxides: ['Al2O3', 'B2O3', 'Fe2O3'],
    colors: {
      Al2O3: '#06b6d4',  // cyan
      B2O3:  '#3b82f6',  // blue
      Fe2O3: '#a855f7',  // purple
    },
  },
  {
    label: 'RO₂',
    oxides: ['SiO2', 'TiO2', 'ZrO2', 'SnO2'],
    colors: {
      SiO2: '#60a5fa',   // light blue
      TiO2: '#818cf8',   // light indigo
      ZrO2: '#c084fc',   // light purple
      SnO2: '#a78bfa',   // light violet
    },
  },
]

// Subscript helper
const toSub = (s: string) => s.replace(/(\d+)/g, (_, d) => {
  const subs = '₀₁₂₃₄₅₆₇₈₉'
  return [...d].map((c: string) => subs[parseInt(c)] || c).join('')
})

export function UMFFingerprint({
  umf,
  width = 220,
  height = 24,
  showLabels = false,
  compact = false,
}: UMFFingerprintProps) {
  const barH = compact ? 8 : height
  const labelH = showLabels ? 14 : 0
  const totalH = barH + labelH

  const segments = useMemo(() => {
    // Collect all oxide values
    const items: { oxide: OxideSymbol; value: number; color: string; group: string }[] = []
    for (const g of GROUPS) {
      for (const ox of g.oxides) {
        const v = (umf[ox] as any)?.value ?? (typeof umf[ox] === 'number' ? umf[ox] : 0)
        if (v > 0.001) {
          items.push({ oxide: ox, value: v, color: g.colors[ox], group: g.label })
        }
      }
    }

    const total = items.reduce((s, i) => s + i.value, 0)
    if (total === 0) return []

    let x = 0
    return items.map(item => {
      const w = (item.value / total) * width
      const seg = { ...item, x, w }
      x += w
      return seg
    })
  }, [umf, width])

  if (segments.length === 0) return null

  return (
    <svg
      width={width}
      height={totalH}
      viewBox={`0 0 ${width} ${totalH}`}
      style={{ display: 'block' }}
      aria-label="UMF oxide fingerprint"
    >
      {segments.map((seg, i) => (
        <g key={seg.oxide}>
          <rect
            x={seg.x}
            y={0}
            width={Math.max(seg.w, 0.5)}
            height={barH}
            fill={seg.color}
            rx={i === 0 ? 3 : i === segments.length - 1 ? 3 : 0}
          >
            <title>{toSub(seg.oxide)}: {seg.value.toFixed(3)}</title>
          </rect>
          {showLabels && seg.w > 18 && (
            <text
              x={seg.x + seg.w / 2}
              y={barH + 11}
              textAnchor="middle"
              fill="var(--text-muted, #888)"
              fontSize={9}
              fontFamily="system-ui, sans-serif"
            >
              {toSub(seg.oxide)}
            </text>
          )}
        </g>
      ))}
      {/* Group divider ticks */}
      {(() => {
        let groupEnd = 0
        const ticks: number[] = []
        for (const g of GROUPS) {
          const groupSegs = segments.filter(s => s.group === g.label)
          if (groupSegs.length > 0) {
            groupEnd = Math.max(...groupSegs.map(s => s.x + s.w))
            ticks.push(groupEnd)
          }
        }
        // Don't show last tick (end of bar)
        ticks.pop()
        return ticks.map((tx, i) => (
          <line
            key={i}
            x1={tx}
            y1={0}
            x2={tx}
            y2={barH}
            stroke="var(--bg-primary, #1a1a2e)"
            strokeWidth={1.5}
          />
        ))
      })()}
    </svg>
  )
}

export default UMFFingerprint
