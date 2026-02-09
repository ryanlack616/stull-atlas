/**
 * Pricing Page
 * 
 * Shows tiers: Free, Solo, Pro, Edu.
 * Uses Stripe payment links (no custom checkout) — links configured via env vars.
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks'
import { useAuthStore } from '@/stores'
import { tierDisplayName, featuresForTier, type Feature } from '@/domain/tier'
import { AuthModal } from '@/components/Auth'

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
  surface_fit_3d: 'Surface Fitting',
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
  const currentTier = profile?.tier ?? 'free'

  const freeFeatures = featuresForTier('free')
  const soloFeatures = featuresForTier('solo')
  const proFeatures = featuresForTier('pro')

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
    // Stripe payment links — will be env vars or hardcoded after Stripe setup
    const links: Record<string, string> = {
      solo: import.meta.env.VITE_STRIPE_LINK_SOLO ?? '#',
      pro: import.meta.env.VITE_STRIPE_LINK_PRO ?? '#',
    }
    const link = links[tier]
    if (link && link !== '#') {
      // Append email for pre-fill
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
        </section>

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
            price="$8"
            period="month"
            description="For the studio potter who wants deeper glaze analysis"
            features={soloFeatures}
            cta="Upgrade to Solo"
            onAction={() => handlePaidAction('solo')}
            current={currentTier === 'solo'}
          />
          <TierCard
            name="Pro"
            price="$18"
            period="month"
            description="Full toolset — optimizer, AI suggestions, advanced analysis"
            features={proFeatures}
            highlight
            cta="Upgrade to Pro"
            onAction={() => handlePaidAction('pro')}
            current={currentTier === 'pro'}
          />
          <TierCard
            name="Education"
            price="Contact us"
            description="Classroom licenses for ceramic arts programs — request a quote"
            features={proFeatures}
            cta="Request Info"
            onAction={() => {
              window.location.href = 'mailto:contact@stullatlas.app?subject=Edu%20License%20Inquiry'
            }}
            current={currentTier === 'edu_individual' || currentTier === 'edu_classroom'}
          />
        </div>

        <section className="pricing-faq">
          <h2>Frequently Asked</h2>
          
          <details>
            <summary>Can I use Stull Atlas without signing up?</summary>
            <p>Yes. The 2D explorer, UMF calculator, guide, and materials browser all work without an account. Creating a free account lets us save your preferences.</p>
          </details>

          <details>
            <summary>What's included in a trial code?</summary>
            <p>Trial codes from events like NCECA grant full Pro access for 30 days. No credit card required.</p>
          </details>

          <details>
            <summary>Can I cancel anytime?</summary>
            <p>Yes. Cancel through your Stripe subscription portal. You keep access until the end of your billing period.</p>
          </details>

          <details>
            <summary>Do you offer educational discounts?</summary>
            <p>Yes. We offer classroom licenses for ceramic arts programs at a substantial discount. <a href="mailto:contact@stullatlas.app?subject=Edu%20License%20Inquiry">Get in touch</a> for pricing.</p>
          </details>

          <details>
            <summary>Is my data safe?</summary>
            <p>Your recipes and settings are stored in a secure database. We never share your data. Export your data at any time.</p>
          </details>
        </section>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultTab="signup" />

      {upgradeNotice && (
        <div className="upgrade-overlay" onClick={() => setUpgradeNotice(null)}>
          <div className="upgrade-notice" onClick={e => e.stopPropagation()}>
            <h3>Get started today</h3>
            <p>
              Visit us at the NCECA booth for a free 30-day trial code,
              or request instant access by email.
            </p>
            <Link to="/nceca" style={{ display: 'block', marginBottom: 12, color: 'var(--accent)', fontSize: 14 }}>
              → Get a trial code at NCECA 2026
            </Link>
            <a
              href={`mailto:contact@stullatlas.app?subject=${encodeURIComponent(`${upgradeNotice.tier.charAt(0).toUpperCase() + upgradeNotice.tier.slice(1)} Access Request`)}&body=${encodeURIComponent(`Hi, I'd like to upgrade to ${upgradeNotice.tier}.\n\nEmail: ${upgradeNotice.email}`)}`}
              className="upgrade-notice-cta"
            >
              Request Access
            </a>
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
