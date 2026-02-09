/**
 * Flux Donut — Tiny donut chart showing flux unity breakdown
 *
 * The flux unity (R₂O + RO = 1.0) is THE fundamental concept in UMF.
 * This shows at a glance: "mostly calcium with some potassium and zinc."
 *
 * Pure SVG, zero dependencies.
 */

import React, { useMemo } from 'react'
import type { UMF, OxideSymbol } from '@/types'

interface FluxDonutProps {
  umf: UMF
  size?: number
  /** Inner radius as fraction of outer (0 = pie, 0.6 = donut) */
  innerRadius?: number
  /** Show center label */
  showCenter?: boolean
}

const FLUX_OXIDES: { oxide: OxideSymbol; color: string; label: string }[] = [
  { oxide: 'K2O',  color: '#f59e0b', label: 'K₂O' },
  { oxide: 'Na2O', color: '#ef4444', label: 'Na₂O' },
  { oxide: 'Li2O', color: '#f97316', label: 'Li₂O' },
  { oxide: 'CaO',  color: '#a3e635', label: 'CaO' },
  { oxide: 'MgO',  color: '#22c55e', label: 'MgO' },
  { oxide: 'ZnO',  color: '#14b8a6', label: 'ZnO' },
  { oxide: 'BaO',  color: '#6366f1', label: 'BaO' },
  { oxide: 'SrO',  color: '#8b5cf6', label: 'SrO' },
  { oxide: 'PbO',  color: '#78716c', label: 'PbO' },
]

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

export function FluxDonut({
  umf,
  size = 64,
  innerRadius = 0.55,
  showCenter = true,
}: FluxDonutProps) {
  const cx = size / 2
  const cy = size / 2
  const outerR = size / 2 - 2
  const innerR = outerR * innerRadius

  const slices = useMemo(() => {
    const items: { oxide: OxideSymbol; value: number; color: string; label: string }[] = []
    for (const f of FLUX_OXIDES) {
      const v = (umf[f.oxide] as any)?.value ?? (typeof umf[f.oxide] === 'number' ? umf[f.oxide] : 0)
      if (v > 0.001) {
        items.push({ oxide: f.oxide, value: v, color: f.color, label: f.label })
      }
    }
    const total = items.reduce((s, i) => s + i.value, 0)
    if (total === 0) return []

    let angle = 0
    return items.map(item => {
      const sweep = (item.value / total) * 360
      const slice = { ...item, startAngle: angle, endAngle: angle + sweep, pct: (item.value / total) * 100 }
      angle += sweep
      return slice
    })
  }, [umf])

  if (slices.length === 0) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block' }}
      aria-label="Flux unity donut chart"
    >
      {slices.map((slice, i) => {
        // For a single slice (full circle), draw a circle
        if (slices.length === 1) {
          return (
            <g key={slice.oxide}>
              <circle cx={cx} cy={cy} r={outerR} fill={slice.color} opacity={0.85}>
                <title>{slice.label}: {slice.value.toFixed(3)} ({slice.pct.toFixed(0)}%)</title>
              </circle>
              <circle cx={cx} cy={cy} r={innerR} fill="var(--bg-secondary, #1a1a2e)" />
            </g>
          )
        }

        // Arc segment
        const startOuter = polarToCartesian(cx, cy, outerR, slice.startAngle)
        const endOuter = polarToCartesian(cx, cy, outerR, slice.endAngle)
        const startInner = polarToCartesian(cx, cy, innerR, slice.endAngle)
        const endInner = polarToCartesian(cx, cy, innerR, slice.startAngle)
        const largeArc = slice.endAngle - slice.startAngle > 180 ? 1 : 0

        // SVG path: outer arc → line to inner → inner arc (reverse) → close
        const d = [
          `M ${polarToCartesian(cx, cy, outerR, slice.startAngle).x} ${polarToCartesian(cx, cy, outerR, slice.startAngle).y}`,
          `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
          `L ${startInner.x} ${startInner.y}`,
          `A ${innerR} ${innerR} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
          'Z',
        ].join(' ')

        return (
          <path
            key={slice.oxide}
            d={d}
            fill={slice.color}
            opacity={0.85}
            stroke="var(--bg-secondary, #1a1a2e)"
            strokeWidth={1}
          >
            <title>{slice.label}: {slice.value.toFixed(3)} ({slice.pct.toFixed(0)}%)</title>
          </path>
        )
      })}

      {/* Center text */}
      {showCenter && (
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--text-muted, #888)"
          fontSize={size > 48 ? 9 : 7}
          fontFamily="system-ui, sans-serif"
          fontWeight={600}
        >
          Flux
        </text>
      )}
    </svg>
  )
}

export default FluxDonut
