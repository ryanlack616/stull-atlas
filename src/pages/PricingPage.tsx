/**
 * Pricing Page
 * 
 * Shows tiers: Free, Solo, Pro, Edu.
 * Uses Stripe payment links (no custom checkout) — links configured via env vars.
 */

import React, { useState } from 'react'
import { usePageTitle } from '@/hooks'
import { useAuthStore, isFreePeriodActive } from '@/stores'
import { tierDisplayName, featuresForTier, type Feature } from '@/domain/tier'
import { AuthModal } from '@/components/Auth'

type BillingPeriod = 'monthly' | 'annual'
type UpgradeNotice = { tier: string; email: string } | null

const FEATURE_LABELS: Record<Feature, string> = {
  explorer_2d: '2D Stull Chart Explorer',
  explorer_detail: 'Glaze Detail Panel',
  explorer_3d: '3D Stull Chart Explorer',
  umf_calculator: 'UMF Calculator',
  similarity_search: 'Similarity Search',
  compare_glazes: 'Compare Panel',
  optimizer: 'Glaze Optimizer',
  genetic_optimizer: 'Genetic Algorithm Optimizer',
  suggestion_engine: 'AI Suggestion Engine',
  line_blend: 'Line Blend Calculator',
  triaxial_blend: 'Triaxial Blend',
  quadaxial_blend: 'Quadaxial Blend',
  biaxial_blend: 'Biaxial Blend',
  radial_blend: 'Radial Blend',
  space_filling: 'Space-Filling Designs',
  recipe_save: 'Save Recipes',
  import_export: 'Import / Export',
  analysis_clustering: 'DBSCAN Clustering',
  analysis_density: 'Density Analysis',
  analysis_voids: 'Void Detection',
  surface_fit_3d: '3D Surface Fitting',
  proximity_3d: 'Proximity Exploration',
  export_3d: '3D Export (OBJ / STL / CSV)',
  lighting_3d: 'Lighting & Material Controls',
  camera_presets_3d: 'Camera Presets & Auto-Rotate',
  materials_browse: 'Materials Browser',
  guide: 'Interactive Guide',
  validation_warnings: 'Limit Warnings',
} as const

interface TierCardProps {
  name: string
  price: string
  period?: string
  description: string
  features: Feature[]
  highlight?: boolean
  cta: string
  onAction: () => void
  current?: boolean
}

function TierCard({ name, price, period, description, features, highlight, cta, onAction, current }: TierCardProps) {
  return (
    <div className={`tier-card ${highlight ? 'tier-highlight' : ''} ${current ? 'tier-current' : ''}`}>
      {current && <span className="tier-current-badge">Current Plan</span>}
      <h3 className="tier-name">{name}</h3>
      <div className="tier-price">
        <span className="tier-amount">{price}</span>
        {period && <span className="tier-period">/{period}</span>}
      </div>
      <p className="tier-desc">{description}</p>
      <button className="tier-cta" onClick={onAction} disabled={current}>
        {current ? 'Active' : cta}
      </button>
      <ul className="tier-features">
        {features.map(f => (
          <li key={f}>{FEATURE_LABELS[f] ?? f}</li>
        ))}
      </ul>
    </div>
  )
}

export function PricingPage() {
  usePageTitle('Pricing')
  const { user, profile } = useAuthStore()
  const [showAuth, setShowAuth] = useState(false)
  const [upgradeNotice, setUpgradeNotice] = useState<UpgradeNotice>(null)
  const [billing, setBilling] = useState<BillingPeriod>('annual')
  const currentTier = profile?.tier ?? 'free'
  const freePeriod = isFreePeriodActive()

  const freeFeatures = featuresForTier('free')
  const soloFeatures = featuresForTier('solo')
  const proFeatures = featuresForTier('pro')
  const atlas3dFeatures = featuresForTier('atlas_3d')

  const handleFreeAction = () => {
    if (!user) {
      setShowAuth(true)
    }
  }

  const handlePaidAction = (tier: string) => {
    if (!user) {
      setShowAuth(true)
      return
    }
    // Stripe/Square payment links — will be env vars or hardcoded after setup
    const monthlyLinks: Record<string, string> = {
      solo: import.meta.env.VITE_STRIPE_LINK_SOLO ?? '#',
      pro: import.meta.env.VITE_STRIPE_LINK_PRO ?? '#',
      atlas_3d: import.meta.env.VITE_STRIPE_LINK_ATLAS3D ?? '#',
    }
    const annualLinks: Record<string, string> = {
      solo: import.meta.env.VITE_STRIPE_LINK_SOLO_ANNUAL ?? '#',
      pro: import.meta.env.VITE_STRIPE_LINK_PRO_ANNUAL ?? '#',
      atlas_3d: import.meta.env.VITE_STRIPE_LINK_ATLAS3D_ANNUAL ?? '#',
    }
    const links = billing === 'annual' ? annualLinks : monthlyLinks
    const link = links[tier]
    if (link && link !== '#') {
      const url = new URL(link)
      if (user.email) url.searchParams.set('prefilled_email', user.email)
      window.open(url.toString(), '_blank')
    } else {
      setUpgradeNotice({ tier, email: user.email ?? '' })
    }
  }

  return (
    <div className="pricing-page">
      <div className="pricing-content">
        <section className="pricing-hero">
          <h1>Choose Your Plan</h1>
          <p className="pricing-subtitle">
            Stull Atlas is free for basic exploration. Upgrade for advanced tools, saving, and analysis.
          </p>
          {freePeriod && (
            <div className="pricing-free-banner">
              All features free through April 30 — <button className="pricing-free-link" onClick={() => setShowAuth(true)}>sign up</button> to unlock everything.
            </div>
          )}
        </section>

        {/* Billing toggle */}
        <div className="billing-toggle">
          <button
            className={`billing-btn ${billing === 'monthly' ? 'billing-active' : ''}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            className={`billing-btn ${billing === 'annual' ? 'billing-active' : ''}`}
            onClick={() => setBilling('annual')}
          >
            Annual <span className="billing-save">Save 2 months</span>
          </button>
        </div>

        <div className="tier-grid">
          <TierCard
            name="Free"
            price="$0"
            description="Explore the Stull chart with 3,000+ community glazes"
            features={freeFeatures}
            cta={user ? 'Active' : 'Get Started'}
            onAction={handleFreeAction}
            current={currentTier === 'free' && !!user}
          />
          <TierCard
            name="Solo"
            price={billing === 'annual' ? '$89' : '$10'}
            period={billing === 'annual' ? 'year' : 'month'}
            description="For the studio potter who wants deeper glaze analysis"
            features={soloFeatures}
            cta={freePeriod ? 'Free Through April' : 'Upgrade to Solo'}
            onAction={() => freePeriod ? setShowAuth(true) : handlePaidAction('solo')}
            current={currentTier === 'solo'}
          />
          <TierCard
            name="Pro"
            price={billing === 'annual' ? '$219' : '$25'}
            period={billing === 'annual' ? 'year' : 'month'}
            description="Full toolset — optimizer, AI suggestions, advanced analysis"
            features={proFeatures}
            cta={freePeriod ? 'Free Through April' : 'Upgrade to Pro'}
            onAction={() => freePeriod ? setShowAuth(true) : handlePaidAction('pro')}
            current={currentTier === 'pro'}
          />
          <TierCard
            name="Atlas 3D"
            price={billing === 'annual' ? '$349' : '$40'}
            period={billing === 'annual' ? 'year' : 'month'}
            description="Everything in Pro plus full 3D exploration, proximity analysis, and model export"
            features={atlas3dFeatures}
            highlight
            cta={freePeriod ? 'Free Through April' : 'Upgrade to Atlas 3D'}
            onAction={() => freePeriod ? setShowAuth(true) : handlePaidAction('atlas_3d')}
            current={currentTier === 'atlas_3d'}
          />
        </div>

        {/* Education */}
        <div className="edu-callout">
          <span>Students, professors & departments —</span>{' '}
          <button className="edu-callout-link" onClick={() => document.getElementById('edu-section')?.scrollIntoView({ behavior: 'smooth' })}>see education pricing</button>
        </div>

        {/* Education tiers */}
        <section className="edu-section" id="edu-section">
          <h2>Education Pricing</h2>
          <p className="edu-subtitle">Special rates for students, professors, and ceramic arts departments.</p>

          <div className="edu-grid">
            <div className="edu-card">
              <h3>Student</h3>
              <div className="edu-price">Free</div>
              <p className="edu-desc">Solo-level access for students with a .edu email address. Auto-verified on signup.</p>
              <button className="edu-cta" onClick={() => setShowAuth(true)}>Sign Up with .edu</button>
            </div>
            <div className="edu-card edu-card-highlight">
              <h3>Classroom</h3>
              <div className="edu-price">$300<span className="edu-period">/year</span></div>
              <p className="edu-desc">Pro access for up to 30 students. Perfect for a single course section in glaze calculation or ceramic chemistry.</p>
              <a className="edu-cta" href="mailto:contact@stullatlas.app?subject=Classroom%20License%20Inquiry">Request Classroom License</a>
            </div>
            <div className="edu-card">
              <h3>Department</h3>
              <div className="edu-price">$750<span className="edu-period">/year</span></div>
              <p className="edu-desc">Full Atlas 3D access for unlimited seats across your entire ceramics program. All students and faculty.</p>
              <a className="edu-cta" href="mailto:contact@stullatlas.app?subject=Department%20License%20Inquiry">Request Department License</a>
            </div>
          </div>
          <p className="edu-footnote">Budget tight? If you're a professor who wants to use Stull Atlas in the classroom but can't swing the license fee, <a href="mailto:contact@stullatlas.app?subject=Edu%20Budget%20Request">just reach out</a>. We'll figure it out.</p>
        </section>

        <section className="pricing-faq">
          <h2>Frequently Asked</h2>
          
          <details>
            <summary>Can I use Stull Atlas without signing up?</summary>
            <p>Yes. The 2D explorer, UMF calculator, guide, and materials browser all work without an account. Creating a free account lets us save your preferences.</p>
          </details>

          <details>
            <summary>What does "free through April" mean?</summary>
            <p>Through April 30, 2026, all features are unlocked for anyone who signs up with a verified email. No credit card required. After the free period, you can continue on the Free plan or upgrade to Solo or Pro.</p>
          </details>

          <details>
            <summary>Can I cancel anytime?</summary>
            <p>Yes. Cancel from your account settings. You keep access until the end of your billing period.</p>
          </details>

          <details>
            <summary>How do educational licenses work?</summary>
            <p>Students get free Solo access with any .edu email. Professors can purchase a Classroom license ($200/yr, up to 30 seats) or a Department license ($500/yr, unlimited seats). <a href="mailto:contact@stullatlas.app?subject=Edu%20License%20Inquiry">Email us</a> to get started.</p>
          </details>

          <details>
            <summary>Is my data safe?</summary>
            <p>Your recipes and settings are stored in a secure database. We never share your data. Export your data at any time.</p>
          </details>

          <details>
            <summary>Do you offer a conference discount?</summary>
            <p>Yes! At NCECA 2026 in Detroit (March 25–28): <strong>3 months of Pro for $29</strong> or <strong>3 months of Atlas 3D for $49</strong> — sign up at the booth or online through March 28.</p>
          </details>
        </section>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultTab="signup" />

      {upgradeNotice && (
        <div className="upgrade-overlay" onClick={() => setUpgradeNotice(null)}>
          <div className="upgrade-notice" onClick={e => e.stopPropagation()}>
            <h3>{freePeriod ? 'Free Through April' : 'Get Started Today'}</h3>
            <p>
              {freePeriod
                ? 'Sign up with a verified email to unlock all Pro features through April 30, 2026. No credit card needed.'
                : 'Online payments coming soon — request access by email and we\'ll get you set up.'}
            </p>
            {freePeriod ? (
              <button className="upgrade-notice-cta" style={{ border: 'none', cursor: 'pointer' }} onClick={() => { setUpgradeNotice(null); setShowAuth(true) }}>Sign Up Free</button>
            ) : (
              <a
                href={`mailto:contact@stullatlas.app?subject=${encodeURIComponent(`${upgradeNotice.tier.charAt(0).toUpperCase() + upgradeNotice.tier.slice(1)} Access Request`)}&body=${encodeURIComponent(`Hi, I'd like to upgrade to ${upgradeNotice.tier}.\n\nEmail: ${upgradeNotice.email}`)}`}
                className="upgrade-notice-cta"
              >
                Request Access
              </a>
            )}
            <button className="upgrade-notice-close" onClick={() => setUpgradeNotice(null)}>Maybe later</button>
          </div>
        </div>
      )}

      <style>{`
        .pricing-page {
          flex: 1;
          overflow-y: auto;
          display: flex;
          justify-content: center;
        }

        .pricing-content {
          max-width: 1100px;
          width: 100%;
          padding: 40px 24px 60px;
        }

        .pricing-hero {
          text-align: center;
          margin-bottom: 40px;
        }

        .pricing-hero h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 12px;
          color: var(--text-bright);
        }

        .pricing-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
        }

        .pricing-free-banner {
          margin-top: 16px;
          padding: 10px 20px;
          border-radius: 8px;
          background: rgba(46, 204, 113, 0.12);
          border: 1px solid rgba(46, 204, 113, 0.3);
          color: #2ecc71;
          font-size: 14px;
          font-weight: 500;
        }

        .pricing-free-link {
          background: none;
          border: none;
          color: #2ecc71;
          text-decoration: underline;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          padding: 0;
        }

        .billing-toggle {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 32px;
          background: var(--bg-tertiary, var(--bg-secondary));
          border-radius: 8px;
          padding: 4px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .billing-btn {
          padding: 8px 20px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }

        .billing-active {
          background: var(--bg-secondary);
          color: var(--text-bright);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        .billing-save {
          font-size: 11px;
          color: #2ecc71;
          font-weight: 600;
          margin-left: 6px;
        }

        .tier-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 60px;
        }

        @media (max-width: 900px) {
          .tier-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 540px) {
          .tier-grid { grid-template-columns: 1fr; }
        }

        .tier-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .tier-highlight {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent);
        }

        .tier-current {
          border-color: #2ecc71;
        }

        .tier-current-badge {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #2ecc71;
          color: #000;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 12px;
          border-radius: 10px;
        }

        .tier-name {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px;
          color: var(--text-bright);
        }

        .tier-price {
          margin-bottom: 12px;
        }

        .tier-amount {
          font-size: 30px;
          font-weight: 700;
          color: var(--text-bright);
        }

        .tier-period {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .tier-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 20px;
          flex: 0;
        }

        .tier-cta {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid var(--accent);
          background: var(--accent-bg);
          color: var(--text-bright);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          margin-bottom: 20px;
        }

        .tier-cta:hover:not(:disabled) {
          background: var(--accent-hover);
        }

        .tier-cta:disabled {
          opacity: 0.5;
          cursor: default;
        }

        .tier-highlight .tier-cta {
          background: var(--accent);
          color: #fff;
        }

        .tier-features {
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 13px;
          color: var(--text-label);
          flex: 1;
        }

        .tier-features li {
          padding: 5px 0;
          border-top: 1px solid var(--border-primary);
        }

        .tier-features li::before {
          content: '✓ ';
          color: #2ecc71;
          font-weight: 600;
        }

        .pricing-faq {
          max-width: 700px;
          margin: 0 auto;
        }

        .pricing-faq h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 20px;
          color: var(--text-bright);
        }

        .pricing-faq details {
          border-bottom: 1px solid var(--border-primary);
        }

        .pricing-faq summary {
          padding: 14px 0;
          cursor: pointer;
          font-size: 14px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .pricing-faq summary:hover {
          color: var(--text-bright);
        }

        .pricing-faq details p {
          margin: 0 0 14px;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .pricing-faq details a {
          color: var(--text-link);
        }

        .edu-section {
          max-width: 900px;
          margin: 0 auto 60px;
        }

        .edu-section h2 {
          font-size: 22px;
          font-weight: 600;
          color: var(--text-bright);
          margin: 0 0 8px;
          text-align: center;
        }

        .edu-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 24px;
          text-align: center;
        }

        .edu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 700px) {
          .edu-grid { grid-template-columns: 1fr; }
        }

        .edu-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 10px;
          padding: 24px 20px;
          text-align: center;
        }

        .edu-card-highlight {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent);
        }

        .edu-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-bright);
          margin: 0 0 8px;
        }

        .edu-price {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-bright);
          margin-bottom: 8px;
        }

        .edu-period {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .edu-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0 0 16px;
        }

        .edu-cta {
          display: inline-block;
          padding: 8px 24px;
          border-radius: 6px;
          border: 1px solid var(--accent);
          background: var(--accent-bg);
          color: var(--text-bright);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s;
        }

        .edu-cta:hover {
          background: var(--accent-hover);
        }

        .edu-card-highlight .edu-cta {
          background: var(--accent);
          color: #fff;
        }

        .edu-footnote {
          margin-top: 20px;
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
          opacity: 0.85;
        }

        .edu-footnote a {
          color: var(--accent);
        }

        .edu-callout {
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 60px;
        }

        .edu-callout-link {
          background: none;
          border: none;
          color: var(--text-link);
          font-size: 14px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }

        .upgrade-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .upgrade-notice {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 32px;
          max-width: 420px;
          width: 90%;
          text-align: center;
        }

        .upgrade-notice h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          color: var(--text-bright);
          margin: 0 0 12px;
        }

        .upgrade-notice p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 24px;
        }

        .upgrade-notice-cta {
          display: block;
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          background: var(--accent);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          text-align: center;
          margin-bottom: 10px;
        }

        .upgrade-notice-cta:hover {
          opacity: 0.9;
        }

        .upgrade-notice-close {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 13px;
          cursor: pointer;
          padding: 6px;
        }

        .upgrade-notice-close:hover {
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  )
}
