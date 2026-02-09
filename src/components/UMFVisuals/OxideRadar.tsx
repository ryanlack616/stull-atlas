/**
 * Oxide Radar — Spider chart for glaze chemistry profiles
 *
 * Shows 6-8 key oxides on a radar/spider chart, normalized so each axis
 * is meaningful regardless of absolute scale differences.
 *
 * Supports overlaying two UMF profiles for comparison.
 * Pure SVG, zero dependencies.
 */

import React, { useMemo } from 'react'
import type { UMF, OxideSymbol } from '@/types'

interface OxideRadarProps {
  umf: UMF
  /** Optional second UMF for overlay comparison */
  compareUmf?: UMF
  size?: number
  /** Which oxides to plot */
  oxides?: OxideSymbol[]
}

// Default axes — the 8 most important oxides for potters
const DEFAULT_OXIDES: OxideSymbol[] = [
  'SiO2', 'Al2O3', 'B2O3', 'CaO', 'MgO', 'K2O', 'Na2O', 'ZnO'
]

// Normalization ranges — typical UMF values for ceramics glazes
// These give each axis a meaningful 0-100% scale
const NORM_RANGES: Partial<Record<OxideSymbol, [number, number]>> = {
  SiO2:  [0, 7],
  Al2O3: [0, 1],
  B2O3:  [0, 1],
  CaO:   [0, 0.8],
  MgO:   [0, 0.4],
  K2O:   [0, 0.5],
  Na2O:  [0, 0.5],
  Li2O:  [0, 0.3],
  ZnO:   [0, 0.4],
  BaO:   [0, 0.3],
  SrO:   [0, 0.2],
  Fe2O3: [0, 0.3],
  TiO2:  [0, 0.1],
}

// Subscript helper
const toSub = (s: string) => s.replace(/(\d+)/g, (_, d) => {
  const subs = '₀₁₂₃₄₅₆₇₈₉'
  return [...d].map((c: string) => subs[parseInt(c)] || c).join('')
})

function getVal(umf: UMF, oxide: OxideSymbol): number {
  const raw = umf[oxide]
  if (raw == null) return 0
  if (typeof raw === 'number') return raw
  return (raw as any).value ?? 0
}

export function OxideRadar({
  umf,
  compareUmf,
  size = 140,
  oxides = DEFAULT_OXIDES,
}: OxideRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const maxR = size / 2 - 24 // leave room for labels
  const rings = 4

  // Filter to oxides that have data in either UMF
  const activeOxides = useMemo(() => {
    return oxides.filter(ox => {
      const v1 = getVal(umf, ox)
      const v2 = compareUmf ? getVal(compareUmf, ox) : 0
      return v1 > 0.001 || v2 > 0.001
    })
  }, [umf, compareUmf, oxides])

  const n = activeOxides.length
  if (n < 3) return null
  const angleStep = 360 / n

  // Normalize value to 0-1 range
  const normalize = (oxide: OxideSymbol, value: number) => {
    const range = NORM_RANGES[oxide] || [0, 1]
    return Math.min(1, Math.max(0, (value - range[0]) / (range[1] - range[0])))
  }

  // Convert polar to cartesian (0° = top)
  const polar = (angle: number, r: number) => ({
    x: cx + r * Math.sin((angle * Math.PI) / 180),
    y: cy - r * Math.cos((angle * Math.PI) / 180),
  })

  // Build polygon points for a UMF
  const polygonPoints = (u: UMF) => {
    return activeOxides
      .map((ox, i) => {
        const val = normalize(ox, getVal(u, ox))
        const p = polar(i * angleStep, val * maxR)
        return `${p.x},${p.y}`
      })
      .join(' ')
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block' }}
      aria-label="Oxide radar chart"
    >
      {/* Grid rings */}
      {Array.from({ length: rings }, (_, i) => {
        const r = ((i + 1) / rings) * maxR
        const pts = activeOxides
          .map((_, j) => {
            const p = polar(j * angleStep, r)
            return `${p.x},${p.y}`
          })
          .join(' ')
        return (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="var(--border-primary, #333)"
            strokeWidth={0.5}
            opacity={0.5}
          />
        )
      })}

      {/* Axis lines */}
      {activeOxides.map((_, i) => {
        const p = polar(i * angleStep, maxR)
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="var(--border-primary, #333)"
            strokeWidth={0.5}
            opacity={0.4}
          />
        )
      })}

      {/* Compare polygon (if present) */}
      {compareUmf && (
        <polygon
          points={polygonPoints(compareUmf)}
          fill="rgba(239, 68, 68, 0.12)"
          stroke="#ef4444"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      )}

      {/* Primary polygon */}
      <polygon
        points={polygonPoints(umf)}
        fill="rgba(59, 130, 246, 0.15)"
        stroke="#3b82f6"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* Data points */}
      {activeOxides.map((ox, i) => {
        const val = normalize(ox, getVal(umf, ox))
        const p = polar(i * angleStep, val * maxR)
        return (
          <circle
            key={ox}
            cx={p.x}
            cy={p.y}
            r={2.5}
            fill="#3b82f6"
          >
            <title>{toSub(ox)}: {getVal(umf, ox).toFixed(3)}</title>
          </circle>
        )
      })}

      {/* Compare data points */}
      {compareUmf &&
        activeOxides.map((ox, i) => {
          const val = normalize(ox, getVal(compareUmf, ox))
          const p = polar(i * angleStep, val * maxR)
          return (
            <circle
              key={`c-${ox}`}
              cx={p.x}
              cy={p.y}
              r={2}
              fill="#ef4444"
            >
              <title>{toSub(ox)}: {getVal(compareUmf, ox).toFixed(3)}</title>
            </circle>
          )
        })}

      {/* Axis labels */}
      {activeOxides.map((ox, i) => {
        const p = polar(i * angleStep, maxR + 12)
        return (
          <text
            key={`l-${ox}`}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--text-label, #aaa)"
            fontSize={9}
            fontFamily="system-ui, sans-serif"
          >
            {toSub(ox)}
          </text>
        )
      })}
    </svg>
  )
}

export default OxideRadar
