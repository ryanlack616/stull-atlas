/**
 * Glaze Type Badge — Colored chip from the Derek Philipau taxonomy
 *
 * Shows a small colored dot + type name. Clicking could filter by type.
 * Pure CSS, zero dependencies beyond the taxonomy data.
 */

import React from 'react'
import { glazeTypeName, glazeTypeColor, glazeTypeRoot } from '@/domain/glaze/glazeTypes'

interface GlazeTypeBadgeProps {
  glazeTypeId: number | null | undefined
  /** Show parent category as prefix */
  showParent?: boolean
  size?: 'sm' | 'md'
}

export function GlazeTypeBadge({ glazeTypeId, showParent = false, size = 'md' }: GlazeTypeBadgeProps) {
  if (glazeTypeId == null) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: size === 'sm' ? '1px 6px' : '2px 8px',
          borderRadius: 10,
          background: 'var(--bg-tertiary, #2a2a3a)',
          fontSize: size === 'sm' ? 10 : 11,
          color: 'var(--text-muted, #666)',
        }}
      >
        <span style={{
          width: size === 'sm' ? 6 : 8,
          height: size === 'sm' ? 6 : 8,
          borderRadius: '50%',
          background: '#555',
          flexShrink: 0,
        }} />
        Unclassified
      </span>
    )
  }

  const name = glazeTypeName(glazeTypeId)
  const color = glazeTypeColor(glazeTypeId)
  const root = glazeTypeRoot(glazeTypeId)
  const parentName = root && root.id !== glazeTypeId ? root.name : null

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: size === 'sm' ? '1px 6px' : '2px 8px',
        borderRadius: 10,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        fontSize: size === 'sm' ? 10 : 11,
        color: 'var(--text-label, #ccc)',
        lineHeight: 1.4,
      }}
    >
      <span
        style={{
          width: size === 'sm' ? 6 : 8,
          height: size === 'sm' ? 6 : 8,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
        }}
      />
      {showParent && parentName && (
        <span style={{ color: 'var(--text-muted, #666)' }}>{parentName} ›</span>
      )}
      {name}
    </span>
  )
}

export default GlazeTypeBadge
