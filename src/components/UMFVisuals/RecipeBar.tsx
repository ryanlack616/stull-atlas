/**
 * RecipeBar — Horizontal bar chart for recipe ingredient proportions
 *
 * Shows each ingredient as a proportional horizontal bar with weight %,
 * giving potters an instant visual sense of recipe balance.
 *
 * Pure SVG, zero dependencies.
 */

import React, { useMemo } from 'react'
import type { Ingredient } from '@/types'

interface RecipeBarProps {
  ingredients: Ingredient[]
  width?: number
  /** Bar height per ingredient */
  barHeight?: number
  /** Gap between bars */
  gap?: number
}

// Warm-to-cool cycle for visual distinction
const BAR_COLORS = [
  '#3b82f6', // blue
  '#f59e0b', // amber
  '#22c55e', // green
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#f97316', // orange
  '#14b8a6', // teal
  '#e11d48', // rose
  '#a3e635', // lime
  '#6366f1', // indigo
  '#eab308', // yellow
]

export function RecipeBar({
  ingredients,
  width = 220,
  barHeight = 18,
  gap = 3,
}: RecipeBarProps) {
  const sorted = useMemo(() => {
    const filtered = ingredients.filter(i => i.amount > 0)
    return [...filtered].sort((a, b) => b.amount - a.amount)
  }, [ingredients])

  if (sorted.length === 0) return null

  const total = sorted.reduce((s, i) => s + i.amount, 0)
  const labelWidth = 90
  const barAreaWidth = width - labelWidth - 35 // room for % label
  const svgH = sorted.length * (barHeight + gap) - gap

  return (
    <svg
      width={width}
      height={svgH}
      viewBox={`0 0 ${width} ${svgH}`}
      style={{ display: 'block' }}
      aria-label="Recipe ingredient proportions"
    >
      {sorted.map((ing, i) => {
        const y = i * (barHeight + gap)
        const pct = (ing.amount / total) * 100
        const barW = Math.max((pct / 100) * barAreaWidth, 2)
        const color = BAR_COLORS[i % BAR_COLORS.length]

        return (
          <g key={`${ing.material}-${i}`}>
            {/* Material name */}
            <text
              x={labelWidth - 4}
              y={y + barHeight / 2 + 1}
              textAnchor="end"
              dominantBaseline="central"
              fill="var(--text-label, #aaa)"
              fontSize={10}
              fontFamily="system-ui, sans-serif"
            >
              {ing.material.length > 14
                ? ing.material.slice(0, 13) + '…'
                : ing.material}
            </text>

            {/* Bar background */}
            <rect
              x={labelWidth}
              y={y}
              width={barAreaWidth}
              height={barHeight}
              fill="var(--bg-tertiary, #2a2a3a)"
              rx={3}
            />

            {/* Bar fill */}
            <rect
              x={labelWidth}
              y={y}
              width={barW}
              height={barHeight}
              fill={color}
              opacity={0.8}
              rx={3}
            >
              <title>{ing.material}: {ing.amount.toFixed(1)} ({pct.toFixed(1)}%)</title>
            </rect>

            {/* Percentage label */}
            <text
              x={labelWidth + barAreaWidth + 4}
              y={y + barHeight / 2 + 1}
              dominantBaseline="central"
              fill="var(--text-muted, #888)"
              fontSize={9}
              fontFamily="'SF Mono', monospace"
            >
              {pct.toFixed(0)}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default RecipeBar
