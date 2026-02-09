/**
 * MiniStull — Tiny Stull chart thumbnail showing a glaze's position
 *
 * Renders the Stull region outlines at small scale with a dot for
 * the selected glaze. Provides spatial context in the sidebar
 * without scrolling back to the chart.
 *
 * Pure SVG, zero dependencies.
 */

import React from 'react'

interface MiniStullProps {
  /** SiO2 value (x-axis) */
  x: number
  /** Al2O3 value (y-axis) */
  y: number
  /** Optional second point for comparison */
  comparePoint?: { x: number; y: number }
  size?: number
}

// Stull chart canonical range
const X_MIN = 0.5
const X_MAX = 7.2
const Y_MIN = 0
const Y_MAX = 1.0

// Simplified Stull region paths (matte | semi-matte | gloss boundaries)
// These are simplified from the full StullPlot paths for thumbnail scale
const REGIONS = [
  // Matte/Semi-matte boundary (approximate)
  { d: 'M 1.5,0.85 L 3.5,0.45 L 3.5,0.95 L 1.5,0.95 Z', fill: 'rgba(139,92,246,0.08)', label: 'M' },
  // Semi-matte region
  { d: 'M 1.5,0.85 L 3.5,0.45 L 5.5,0.4 L 5.5,0.95 L 3.5,0.95 Z', fill: 'rgba(59,130,246,0.06)', label: 'SM' },
  // Gloss region
  { d: 'M 3.5,0.45 L 5.5,0.4 L 7,0.15 L 7,0 L 3.5,0 Z', fill: 'rgba(34,197,94,0.06)', label: 'G' },
]

export function MiniStull({
  x,
  y,
  comparePoint,
  size = 80,
}: MiniStullProps) {
  // Map data coordinates to SVG coordinates
  const xScale = (v: number) => ((v - X_MIN) / (X_MAX - X_MIN)) * size
  const yScale = (v: number) => ((Y_MAX - v) / (Y_MAX - Y_MIN)) * size // flip Y

  const px = xScale(x)
  const py = yScale(y)

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        display: 'block',
        border: '1px solid var(--border-primary, #333)',
        borderRadius: 4,
        background: 'var(--bg-tertiary, #1e1e2e)',
      }}
      aria-label={`Stull position: SiO₂=${x.toFixed(2)}, Al₂O₃=${y.toFixed(2)}`}
    >
      {/* Region fills - simplified for readability at small scale */}
      {/* Matte zone: upper-left */}
      <rect
        x={0}
        y={0}
        width={xScale(3.2)}
        height={yScale(0.4)}
        fill="rgba(139,92,246,0.1)"
        rx={2}
      />
      {/* Gloss zone: lower-right */}
      <rect
        x={xScale(3.2)}
        y={yScale(0.4)}
        width={size - xScale(3.2)}
        height={size - yScale(0.4)}
        fill="rgba(34,197,94,0.08)"
        rx={2}
      />

      {/* Boundary line */}
      <line
        x1={xScale(1.5)}
        y1={yScale(0.85)}
        x2={xScale(6)}
        y2={yScale(0.15)}
        stroke="var(--border-primary, #444)"
        strokeWidth={0.8}
        strokeDasharray="3,2"
      />

      {/* Axis labels */}
      <text x={size / 2} y={size - 2} textAnchor="middle" fill="var(--text-muted, #555)" fontSize={7} fontFamily="system-ui">SiO₂</text>
      <text x={3} y={size / 2} textAnchor="start" dominantBaseline="central" fill="var(--text-muted, #555)" fontSize={7} fontFamily="system-ui" transform={`rotate(-90, 6, ${size / 2})`}>Al₂O₃</text>

      {/* Region labels */}
      <text x={xScale(2)} y={yScale(0.7)} textAnchor="middle" fill="var(--text-muted, #444)" fontSize={7}>M</text>
      <text x={xScale(4.5)} y={yScale(0.2)} textAnchor="middle" fill="var(--text-muted, #444)" fontSize={7}>G</text>

      {/* Compare point */}
      {comparePoint && (
        <circle
          cx={xScale(comparePoint.x)}
          cy={yScale(comparePoint.y)}
          r={3}
          fill="none"
          stroke="#ef4444"
          strokeWidth={1.5}
        />
      )}

      {/* Main glaze point */}
      <circle
        cx={px}
        cy={py}
        r={4}
        fill="#3b82f6"
        stroke="white"
        strokeWidth={1.5}
      >
        <title>SiO₂: {x.toFixed(2)}, Al₂O₃: {y.toFixed(2)}</title>
      </circle>
    </svg>
  )
}

export default MiniStull
