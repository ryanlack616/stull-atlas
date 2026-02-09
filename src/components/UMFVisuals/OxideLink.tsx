/**
 * OxideLink
 *
 * Renders an oxide symbol as a clickable link to its Digitalfire reference page
 * when one exists, falling back to plain text otherwise.
 *
 * Supports both plain text and HTML-subscripted output.
 */

import React from 'react'
import { lookupOxide } from '@/domain/digitalfire'

/** Subscript helper: SiO2 → SiO₂ (Unicode subscripts) */
const toSub = (s: string) =>
  s.replace(/(\d)/g, (_, d: string) => '₀₁₂₃₄₅₆₇₈₉'[+d])

interface OxideLinkProps {
  /** Oxide symbol, e.g. 'SiO2' */
  oxide: string
  /** If true, render with Unicode subscripts (default: true) */
  subscript?: boolean
  /** Optional className */
  className?: string
  /** Optional inline style */
  style?: React.CSSProperties
}

export function OxideLink({ oxide, subscript = true, className, style }: OxideLinkProps) {
  const ref = lookupOxide(oxide)
  const display = subscript ? toSub(oxide) : oxide

  if (!ref) {
    return <span className={className} style={style}>{display}</span>
  }

  return (
    <a
      href={ref.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Learn about ${display} on Digitalfire`}
      className={className}
      style={{
        color: 'var(--text-link)',
        textDecoration: 'none',
        ...style,
      }}
    >
      {display}
    </a>
  )
}

/**
 * Oxide cell for use in <td> — replaces dangerouslySetInnerHTML pattern.
 * Renders the oxide as a subscripted link when a Digitalfire reference exists.
 */
export function OxideTd({ oxide, style }: { oxide: string; style?: React.CSSProperties }) {
  return (
    <td style={style}>
      <OxideLink oxide={oxide} />
    </td>
  )
}
