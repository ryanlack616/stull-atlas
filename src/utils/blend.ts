/**
 * Shared Blend Utilities
 *
 * Common helpers used across all blend pages:
 * Si:Al ratio, oxide value formatting, shared styles.
 */

import React from 'react'
import { UMF, OxideSymbol } from '@/types'

/**
 * Calculate Si:Al ratio from UMF, returning a display string
 */
export function formatSiAlRatio(umf: UMF): string {
  const si = umf.SiO2
  const al = umf.Al2O3
  const siVal = si ? ('value' in si ? si.value : 0) : 0
  const alVal = al ? ('value' in al ? al.value : 0) : 0
  return alVal > 0 ? (siVal / alVal).toFixed(1) : '—'
}

/**
 * Format an oxide value from UMF for display (3 decimals)
 */
export function formatOxideDisplay(umf: UMF, oxide: OxideSymbol): string {
  const val = umf[oxide]
  if (!val) return '—'
  if ('value' in val) return val.value.toFixed(3)
  return '—'
}

/**
 * Shared action button style for blend page toolbars
 */
export const actionBtnStyle: React.CSSProperties = {
  padding: '4px 10px',
  background: 'var(--bg-input)',
  border: '1px solid var(--border-secondary)',
  borderRadius: 4,
  color: '#aaa',
  fontSize: 11,
  cursor: 'pointer',
}
