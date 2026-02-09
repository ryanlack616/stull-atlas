/**
 * Explorer Page
 * 
 * The main interactive Stull chart explorer.
 * Wraps the StullAtlas component as a routed page.
 */

import React from 'react'
import { StullAtlas } from '@/components/StullAtlas'
import { useGlazeLoader } from '@/hooks'
import { usePageTitle } from '@/hooks'

export function ExplorerPage() {
  usePageTitle('Explorer')
  const { isLoading, loadError, retry } = useGlazeLoader()

  if (loadError) {
    return (
      <div style={{
        display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-primary)', color: 'var(--text-primary)', flexDirection: 'column', gap: 16,
        padding: 40,
      }}>
        <div style={{ fontSize: 48, opacity: 0.3 }}>⚗</div>
        <h2 style={{ margin: 0, fontSize: 18 }}>Failed to load glaze dataset</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 400, textAlign: 'center', margin: 0 }}>
          {loadError}
        </p>
        <button
          onClick={retry}
          style={{
            padding: '8px 20px', background: 'var(--accent-bg)', border: '1px solid var(--accent)',
            borderRadius: 6, color: 'var(--text-bright)', fontSize: 14, cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div style={{
        display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-primary)', color: 'var(--text-secondary)', flexDirection: 'column', gap: 16,
      }}>
        <div className="loading-spinner" />
        <p style={{ fontSize: 14 }}>Loading glaze dataset…</p>
        <style>{`
          .loading-spinner {
            width: 40px; height: 40px;
            border: 3px solid var(--border-primary);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg) } }
        `}</style>
      </div>
    )
  }

  return <StullAtlas />
}

export default ExplorerPage
