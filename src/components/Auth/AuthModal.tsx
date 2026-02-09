/**
 * Auth Modal
 * 
 * Sign in / Sign up dialog.
 * During the free period, shows "free through April" messaging.
 * Rendered as a portal overlay.
 */

import React, { useState, useEffect, useRef } from 'react'
import { useAuthStore, isFreePeriodActive } from '@/stores'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  /** Start on signup tab instead of signin */
  defaultTab?: 'signin' | 'signup'
}

export function AuthModal({ isOpen, onClose, defaultTab = 'signin' }: AuthModalProps) {
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState<string | null>(null)

  const { signIn, signUp, loading, error, clearError } = useAuthStore()
  const emailRef = useRef<HTMLInputElement>(null)
  const freePeriod = isFreePeriodActive()

  // Reset form state and focus email on open
  useEffect(() => {
    if (isOpen) {
      clearError()
      setSuccess(null)
      setEmail('')
      setPassword('')
      setTab(defaultTab)
      setTimeout(() => emailRef.current?.focus(), 100)
    }
  }, [isOpen, defaultTab, clearError])

  // Reset when switching tabs
  useEffect(() => {
    clearError()
    setSuccess(null)
  }, [tab, clearError])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setSuccess(null)

    if (tab === 'signup') {
      const result = await signUp(email, password)
      if (!result.error) {
        setSuccess('Account created! Check your email to verify, then sign in.')
        setTimeout(onClose, 2500)
      }
    } else {
      const result = await signIn(email, password)
      if (!result.error) {
        onClose()
      }
    }
  }

  // Escape key closes modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Focus trap
  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = modalRef.current
    if (!el) return
    const focusable = el.querySelectorAll<HTMLElement>('button, input, [tabindex]:not([tabindex="-1"])')
    if (focusable.length) (focusable[0] as HTMLElement).focus()
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !focusable.length) return
      const first = focusable[0], last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    el.addEventListener('keydown', trap)
    return () => el.removeEventListener('keydown', trap)
  }, [tab])

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div ref={modalRef} className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close">&times;</button>

        <h2 id="auth-title" className="auth-title">Stull Atlas Studio</h2>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'signin' ? 'active' : ''}`}
            onClick={() => setTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${tab === 'signup' ? 'active' : ''}`}
            onClick={() => setTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Email
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
              placeholder="potter@studio.com"
              autoComplete="email"
            />
          </label>

          <label className="auth-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="auth-input"
              placeholder="At least 6 characters"
              autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
            />
          </label>

          {tab === 'signup' && freePeriod && (
            <p className="auth-free-banner">
              All features free through April — no credit card needed.
            </p>
          )}

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Working...' : tab === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          {tab === 'signin' ? (
            <>Don't have an account? <button className="auth-link" onClick={() => setTab('signup')}>Sign up free</button></>
          ) : (
            <>Already have an account? <button className="auth-link" onClick={() => setTab('signin')}>Sign in</button></>
          )}
        </p>

        <style>{`
          .auth-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(4px);
          }

          .auth-modal {
            background: var(--bg-secondary);
            border: 1px solid var(--border-primary);
            border-radius: 12px;
            padding: 32px;
            width: 380px;
            max-width: 90vw;
            position: relative;
          }

          .auth-close {
            position: absolute;
            top: 12px;
            right: 16px;
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
          }

          .auth-close:hover {
            color: var(--text-primary);
          }

          .auth-title {
            margin: 0 0 20px;
            font-size: 22px;
            font-weight: 600;
            text-align: center;
            color: var(--text-bright);
          }

          .auth-tabs {
            display: flex;
            gap: 0;
            margin-bottom: 20px;
            border-bottom: 1px solid var(--border-primary);
          }

          .auth-tab {
            flex: 1;
            padding: 10px;
            background: none;
            border: none;
            border-bottom: 2px solid transparent;
            color: var(--text-secondary);
            font-size: 14px;
            cursor: pointer;
            transition: all 0.15s;
          }

          .auth-tab:hover {
            color: var(--text-label);
          }

          .auth-tab.active {
            color: var(--accent);
            border-bottom-color: var(--accent);
          }

          .auth-form {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .auth-label {
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: 13px;
            color: var(--text-label);
          }

          .auth-input {
            padding: 10px 12px;
            border: 1px solid var(--border-input);
            border-radius: 6px;
            background: var(--bg-input);
            color: var(--text-primary);
            font-size: 14px;
            outline: none;
            transition: border-color 0.15s;
          }

          .auth-input:focus {
            border-color: var(--accent);
          }

          .auth-input::placeholder {
            color: var(--text-dim);
          }

          .auth-free-banner {
            margin: 0;
            padding: 8px 12px;
            background: rgba(46, 204, 113, 0.12);
            border: 1px solid rgba(46, 204, 113, 0.25);
            border-radius: 6px;
            color: #2ecc71;
            font-size: 13px;
            text-align: center;
          }

          .auth-error {
            margin: 0;
            padding: 8px 12px;
            background: rgba(231, 76, 60, 0.15);
            border: 1px solid rgba(231, 76, 60, 0.3);
            border-radius: 6px;
            color: var(--danger);
            font-size: 13px;
          }

          .auth-success {
            margin: 0;
            padding: 8px 12px;
            background: rgba(46, 204, 113, 0.15);
            border: 1px solid rgba(46, 204, 113, 0.3);
            border-radius: 6px;
            color: #2ecc71;
            font-size: 13px;
          }

          .auth-submit {
            padding: 12px;
            background: var(--accent-bg);
            border: 1px solid var(--accent);
            border-radius: 6px;
            color: var(--text-bright);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.15s;
            margin-top: 4px;
          }

          .auth-submit:hover:not(:disabled) {
            background: var(--accent-hover);
          }

          .auth-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .auth-footer {
            margin: 16px 0 0;
            text-align: center;
            font-size: 13px;
            color: var(--text-secondary);
          }

          .auth-link {
            background: none;
            border: none;
            color: var(--text-link);
            font-size: 13px;
            cursor: pointer;
            padding: 0;
          }

          .auth-link:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </div>
  )
}
