/**
 * Cone Range Bar — Horizontal thermometer showing firing range
 *
 * Displays the full cone scale (06 → 12) with the glaze's firing range
 * highlighted. Gives instant visual context for temperature.
 *
 * Pure SVG, zero dependencies.
 */

import React from 'react'

interface ConeRangeBarProps {
  coneRange: [number | string, number | string]
  width?: number
  height?: number
}

// Full cone scale with colors (cold → hot)
const CONES = [
  { cone: -6, label: '06', color: '#6366f1' },
  { cone: -5, label: '05', color: '#818cf8' },
  { cone: -4, label: '04', color: '#3b82f6' },
  { cone: -3, label: '03', color: '#06b6d4' },
  { cone: -2, label: '02', color: '#14b8a6' },
  { cone: -1, label: '01', color: '#10b981' },
  { cone: 0,  label: '0',  color: '#22c55e' },
  { cone: 1,  label: '1',  color: '#84cc16' },
  { cone: 2,  label: '2',  color: '#a3e635' },
  { cone: 3,  label: '3',  color: '#eab308' },
  { cone: 4,  label: '4',  color: '#facc15' },
  { cone: 5,  label: '5',  color: '#f59e0b' },
  { cone: 6,  label: '6',  color: '#f97316' },
  { cone: 7,  label: '7',  color: '#ef4444' },
  { cone: 8,  label: '8',  color: '#dc2626' },
  { cone: 9,  label: '9',  color: '#e11d48' },
  { cone: 10, label: '10', color: '#be185d' },
  { cone: 11, label: '11', color: '#a855f7' },
  { cone: 12, label: '12', color: '#7c3aed' },
]

function parseCone(raw: number | string): number {
  if (typeof raw === 'number') return raw
  const s = String(raw).trim().toLowerCase()
  // Handle "06" → -6 style
  if (/^0\d$/.test(s)) return -parseInt(s[1])
  return parseInt(s) || 0
}

export function ConeRangeBar({
  coneRange,
  width = 220,
  height = 20,
}: ConeRangeBarProps) {
  const lo = parseCone(coneRange[0])
  const hi = parseCone(coneRange[1])
  const minCone = Math.min(lo, hi)
  const maxCone = Math.max(lo, hi)

  const count = CONES.length
  const cellW = width / count
  const barH = 10
  const labelY = barH + 12

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block' }}
      aria-label={`Firing range: cone ${coneRange[0]} to ${coneRange[1]}`}
    >
      {CONES.map((c, i) => {
        const inRange = c.cone >= minCone && c.cone <= maxCone
        return (
          <g key={c.cone}>
            <rect
              x={i * cellW}
              y={0}
              width={cellW}
              height={barH}
              fill={inRange ? c.color : 'var(--bg-tertiary, #2a2a3a)'}
              opacity={inRange ? 0.9 : 0.3}
              rx={i === 0 ? 3 : i === count - 1 ? 3 : 0}
            >
              <title>Cone {c.label}</title>
            </rect>
            {/* Show labels for range endpoints and a few landmarks */}
            {(c.cone === minCone || c.cone === maxCone || c.cone === 6 || (c.cone === 0 && !inRange)) && (
              <text
                x={i * cellW + cellW / 2}
                y={labelY}
                textAnchor="middle"
                fill={inRange ? 'var(--text-label, #ccc)' : 'var(--text-muted, #555)'}
                fontSize={8}
                fontFamily="system-ui, sans-serif"
                fontWeight={inRange ? 600 : 400}
              >
                {c.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export default ConeRangeBar
