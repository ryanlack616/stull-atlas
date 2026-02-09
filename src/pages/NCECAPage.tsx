/**
 * NCECA Landing Page
 * 
 * Conference-specific landing with trial code redemption.
 * URL: /#/nceca — printed on cards handed out at the booth.
 */

import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks'
import { useAuthStore } from '@/stores'
import { isDemoMode } from '@/stores'
import { AuthModal } from '@/components/Auth'

export function NCECAPage() {
  usePageTitle('NCECA 2026 — Stull Atlas')
  const { user, profile } = useAuthStore()
  const [searchParams] = useSearchParams()
  const [showAuth, setShowAuth] = useState(false)

  // Support ?code=NCECA-XXXX-XXXX in URL (QR code on cards)
  const urlCode = searchParams.get('code') ?? ''
  const [redeemCode, setRedeemCode] = useState(urlCode)
  const [redeeming, setRedeeming] = useState(false)
  const [redeemResult, setRedeemResult] = useState<{ success: boolean; message: string } | null>(null)

  const storeRedeemCode = useAuthStore((s) => s.redeemCode)

  const handleRedeem = async () => {
    if (!redeemCode.trim()) return
    if (!user) {
      setShowAuth(true)
      return
    }
    setRedeeming(true)
    setRedeemResult(null)
    const result = await storeRedeemCode(redeemCode)
    setRedeeming(false)
    if (result.error) {
      setRedeemResult({ success: false, message: result.error })
    } else {
      setRedeemResult({ success: true, message: 'Trial activated! You now have 30 days of full Pro access.' })
    }
  }

  return (
    <div className="nceca-page">
      <div className="nceca-content">

        <section className="nceca-hero">
          <span className="nceca-badge">NCECA 2026 — Detroit</span>
          <h1>Welcome to Stull Atlas</h1>
          <p className="nceca-subtitle">
            A computational glaze explorer — 114 years after Stull's original chart.
            <br />
            Explore 3,200+ glazes, run blend calculations, and use AI to find your next recipe.
          </p>
        </section>

        <section className="nceca-trial">
          {isDemoMode ? (
            <>
              <h2>Demo Mode Active</h2>
              <p>All Pro features are unlocked. Explore freely!</p>
              <Link to="/" className="trial-submit" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                Open Explorer
              </Link>
            </>
          ) : (
          <>
          <h2>Activate Your Trial</h2>
          <p>Enter the code from your card for <strong>30 days of free Pro access</strong> — no credit card required.</p>
          
          <div className="trial-form">
            <input
              type="text"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
              className="trial-input"
              placeholder="NCECA-XXXX-XXXX"
              spellCheck={false}
              autoComplete="off"
            />
            <button 
              className="trial-submit" 
              onClick={handleRedeem} 
              disabled={redeeming || !redeemCode.trim()}
            >
              {redeeming ? 'Activating...' : user ? 'Activate' : 'Sign In & Activate'}
            </button>
          </div>

          {redeemResult && (
            <p className={`trial-result ${redeemResult.success ? 'success' : 'error'}`}>
              {redeemResult.message}
            </p>
          )}

          {!user && (
            <p className="trial-note">
              You'll need to create a free account to redeem your code.
            </p>
          )}
          </>
          )}
        </section>

        <section className="nceca-features">
          <h2>What You Can Do</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <h3>Explore</h3>
              <p>Map 3,200+ glazes on an interactive Stull chart. Filter by cone, surface, color, and more.</p>
              <Link to="/">Open Explorer</Link>
            </div>
            <div className="feature-item">
              <h3>Calculate</h3>
              <p>UMF calculator, line blends, triaxial, biaxial, radial, and space-filling designs.</p>
              <Link to="/calc">Open Calculators</Link>
            </div>
            <div className="feature-item">
              <h3>Optimize</h3>
              <p>Set target UMF values and constraints — let the optimizer find your recipe.</p>
              <Link to="/calc/optimizer">Open Optimizer</Link>
            </div>
            <div className="feature-item">
              <h3>Suggest</h3>
              <p>Describe what you want in plain English. The AI engine recommends recipes.</p>
              <Link to="/suggest">Open Suggestions</Link>
            </div>
          </div>
        </section>

        <section className="nceca-cta">
          <p>
            No code? No problem.{' '}
            <Link to="/">Explore for free</Link> or check out our{' '}
            <Link to="/pricing">plans</Link>.
          </p>
        </section>
      </div>

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        defaultTab="signup"
        initialCode={redeemCode}
      />

      <style>{`
        .nceca-page {
          flex: 1;
          overflow-y: auto;
          display: flex;
          justify-content: center;
        }

        .nceca-content {
          max-width: 800px;
          width: 100%;
          padding: 48px 24px 60px;
        }

        .nceca-hero {
          text-align: center;
          margin-bottom: 48px;
        }

        .nceca-badge {
          display: inline-block;
          padding: 4px 16px;
          border-radius: 20px;
          background: color-mix(in srgb, var(--accent) 20%, transparent);
          color: var(--accent);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }

        .nceca-hero h1 {
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 16px;
          color: var(--text-bright);
        }

        .nceca-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .nceca-trial {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          margin-bottom: 48px;
        }

        .nceca-trial h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 8px;
          color: var(--text-bright);
        }

        .nceca-trial p {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 20px;
        }

        .trial-form {
          display: flex;
          gap: 12px;
          max-width: 420px;
          margin: 0 auto;
        }

        .trial-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid var(--border-input);
          border-radius: 6px;
          background: var(--bg-input);
          color: var(--text-primary);
          font-size: 16px;
          font-family: 'Courier New', Courier, monospace;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-align: center;
          outline: none;
        }

        .trial-input:focus {
          border-color: var(--accent);
        }

        .trial-submit {
          padding: 12px 24px;
          border-radius: 6px;
          border: 1px solid var(--accent);
          background: var(--accent);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }

        .trial-submit:hover:not(:disabled) {
          opacity: 0.9;
        }

        .trial-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .trial-result {
          margin: 16px 0 0;
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 14px;
        }

        .trial-result.success {
          background: rgba(46, 204, 113, 0.15);
          border: 1px solid rgba(46, 204, 113, 0.3);
          color: #2ecc71;
        }

        .trial-result.error {
          background: rgba(231, 76, 60, 0.15);
          border: 1px solid rgba(231, 76, 60, 0.3);
          color: var(--danger);
        }

        .trial-note {
          margin: 12px 0 0;
          font-size: 13px;
          color: var(--text-dim);
        }

        .nceca-features {
          margin-bottom: 48px;
        }

        .nceca-features h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 20px;
          color: var(--text-bright);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 540px) {
          .feature-grid { grid-template-columns: 1fr; }
          .trial-form { flex-direction: column; }
        }

        .feature-item {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          padding: 20px;
        }

        .feature-item h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px;
          color: var(--text-bright);
        }

        .feature-item p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 12px;
          line-height: 1.5;
        }

        .feature-item a {
          font-size: 13px;
          color: var(--text-link);
          text-decoration: none;
        }

        .feature-item a:hover {
          text-decoration: underline;
        }

        .nceca-cta {
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .nceca-cta a {
          color: var(--text-link);
          text-decoration: none;
        }

        .nceca-cta a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
