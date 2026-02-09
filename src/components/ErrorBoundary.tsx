/**
 * Error Boundary
 * 
 * Catches React rendering errors and shows a recovery UI
 * instead of a white screen.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Stull Atlas Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100vh', background: 'var(--bg-primary, #121212)',
          color: 'var(--text-primary, #e0e0e0)', fontFamily: '-apple-system, sans-serif',
          padding: 40,
        }}>
          <h1 style={{ fontSize: 48, margin: '0 0 16px', opacity: 0.3 }}>âš—</h1>
          <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-secondary, #888)', fontSize: 14, maxWidth: 500, textAlign: 'center', margin: '0 0 24px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.href = import.meta.env.BASE_URL || '/'
            }}
            style={{
              padding: '10px 24px', background: 'var(--accent-bg, #282560)', border: '1px solid var(--accent, #6366F1)',
              borderRadius: 6, color: 'var(--text-bright, #fff)', fontSize: 14, cursor: 'pointer',
            }}
          >
            Back to Explorer
          </button>
          <details style={{ marginTop: 24, maxWidth: 600, fontSize: 12, color: 'var(--text-muted, #666)' }}>
            <summary style={{ cursor: 'pointer' }}>Error details</summary>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}
