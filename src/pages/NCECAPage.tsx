/**
 * NCECA Landing Page
 * 
 * Conference-specific landing — free through April promotion.
 * URL: /#/nceca — printed on cards and flyers handed out at the booth.
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks'
import { useAuthStore, isFreePeriodActive } from '@/stores'
import { AuthModal } from '@/components/Auth'

import screenshotExplorer from '@/marketing/assets/screenshots/02-explorer-main.png'
import screenshotDetail from '@/marketing/assets/screenshots/03-explorer-detail.png'
import screenshotCalculators from '@/marketing/assets/screenshots/05-calculators.png'

export function NCECAPage() {
  usePageTitle('NCECA 2026 — Stull Atlas')
  const { user } = useAuthStore()
  const [showAuth, setShowAuth] = useState(false)
  const freePeriod = isFreePeriodActive()

  return (
    <div className="nceca-page">
      <div className="nceca-content">

        <section className="nceca-hero">
          <span className="nceca-badge">NCECA 2026 — Detroit</span>
          <h1>Welcome to Stull Atlas</h1>
          <p className="nceca-subtitle">
            A computational glaze explorer — 114 years after Stull's original chart.
            <br />
            Explore 10,000+ glazes, run blend calculations, and use AI to find your next recipe.
          </p>
        </section>

        <section className="nceca-trial">
          {user ? (
            <>
              <h2>You're All Set</h2>
              <p>
                {freePeriod
                  ? 'All Pro features are unlocked through April. Dive in!'
                  : 'Your account is active. Explore the full suite.'}
              </p>
              <Link to="/" className="trial-submit" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                Open Explorer
              </Link>
            </>
          ) : (
            <>
              <h2>{freePeriod ? 'Free Through April' : 'Get Started'}</h2>
              <p>
                {freePeriod
                  ? <>Sign up with your email to unlock <strong>all Pro features</strong> — no credit card, no code needed.</>
                  : <>Create a free account to start exploring.</>}
              </p>
              <button className="trial-submit" onClick={() => setShowAuth(true)}>
                {freePeriod ? 'Sign Up Free' : 'Create Account'}
              </button>
              <p className="trial-note">
                Already have an account?{' '}
                <button className="nceca-link" onClick={() => setShowAuth(true)}>Sign in</button>
              </p>
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

        <section className="nceca-screenshots">
          <h2>See It in Action</h2>
          <div className="screenshot-gallery">
            <figure className="screenshot-item">
              <img src={screenshotExplorer} alt="Stull Atlas Explorer — interactive Stull chart with 3,200+ glazes" loading="lazy" />
              <figcaption>Interactive Stull chart with 3,200+ glazes — filter by cone, surface, color, and more</figcaption>
            </figure>
            <figure className="screenshot-item">
              <img src={screenshotDetail} alt="Stull Atlas glaze detail — UMF analysis, recipe breakdown, and similar glazes" loading="lazy" />
              <figcaption>Glaze detail panel — UMF analysis, recipe breakdown, and related glazes</figcaption>
            </figure>
            <figure className="screenshot-item">
              <img src={screenshotCalculators} alt="Stull Atlas calculators — UMF, line blends, triaxial, and optimizer" loading="lazy" />
              <figcaption>Calculators: UMF converter, blend tools, optimizer, and AI suggestions</figcaption>
            </figure>
          </div>
        </section>

        <section className="nceca-deal">
          <h2>NCECA Deal — $29 for 3 Months of Pro</h2>
          <p className="deal-subtitle">Full Pro access through your spring firing season. That's <strong>46% off</strong> the monthly rate.</p>
          <div className="deal-details">
            <div className="deal-features">
              <p>✓ All blend calculators · ✓ Recipe optimizer · ✓ AI suggestions · ✓ Full analysis suite</p>
            </div>
            <p className="deal-fine">Available at the booth or online through March 28, 2026.</p>
          </div>
        </section>

        <section className="nceca-cta">
          <p>
            Questions? Email <a href="mailto:hello@stullatlas.app">hello@stullatlas.app</a> or check out our{' '}
            <Link to="/pricing">plans</Link>.
          </p>
        </section>
      </div>

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        defaultTab="signup"
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

        .trial-note {
          margin: 12px 0 0;
          font-size: 13px;
          color: var(--text-dim);
        }

        .nceca-link {
          background: none;
          border: none;
          color: var(--text-link);
          font-size: 13px;
          cursor: pointer;
          padding: 0;
        }

        .nceca-link:hover {
          text-decoration: underline;
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

        .nceca-screenshots {
          margin-bottom: 48px;
        }

        .nceca-screenshots h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 20px;
          color: var(--text-bright);
        }

        .screenshot-gallery {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .screenshot-item {
          margin: 0;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-primary);
          background: var(--bg-secondary);
        }

        .screenshot-item img {
          width: 100%;
          display: block;
          border-bottom: 1px solid var(--border-primary);
        }

        .screenshot-item figcaption {
          padding: 12px 16px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .nceca-deal {
          background: var(--bg-secondary);
          border: 2px solid var(--accent);
          border-radius: 12px;
          padding: 28px 32px;
          text-align: center;
          margin-bottom: 48px;
        }

        .nceca-deal h2 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 8px;
          color: var(--text-bright);
        }

        .deal-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          margin: 0 0 16px;
        }

        .deal-features p {
          font-size: 13px;
          color: var(--text-primary);
          margin: 0 0 12px;
        }

        .deal-fine {
          font-size: 12px;
          color: var(--text-tertiary);
          margin: 0;
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
