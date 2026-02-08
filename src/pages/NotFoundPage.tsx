/**
 * 404 Not Found Page
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'

export function NotFoundPage() {
  usePageTitle('Not Found')
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', flex: 1, color: 'var(--text-primary)', padding: 40,
    }}>
      <div style={{ fontSize: 64, opacity: 0.2, marginBottom: 16 }}>🧪</div>
      <h2 style={{ margin: '0 0 8px', fontSize: 24 }}>Page not found</h2>
      <p style={{ color: 'var(--text-secondary)', margin: '0 0 24px', fontSize: 14 }}>
        This glaze recipe doesn't exist yet.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/" style={{
          padding: '10px 24px', background: 'var(--accent-bg)', border: '1px solid var(--accent)',
          borderRadius: 6, color: 'var(--text-bright)', fontSize: 14, textDecoration: 'none',
        }}>
          Explorer
        </Link>
        <Link to="/calc" style={{
          padding: '10px 24px', background: 'var(--bg-input)', border: '1px solid var(--border-secondary)',
          borderRadius: 6, color: '#aaa', fontSize: 14, textDecoration: 'none',
        }}>
          Calculators
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
