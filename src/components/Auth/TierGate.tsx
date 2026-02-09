/**
 * Tier Gate
 * 
 * Wraps page content with a tier access check.
 * If the user's tier is insufficient, shows a tasteful upgrade prompt
 * instead of the page content. Free users still see what the feature IS,
 * they just can't use it.
 * 
 * Usage:
 *   <TierGate feature="optimizer">
 *     <OptimizerPage />
 *   </TierGate>
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore, getTrialStatus } from '@/stores'
import { canAccess, requiredTier, tierDisplayName, type Feature } from '@/domain/tier'
import { AuthModal } from '@/components/Auth'
import type { Tier } from '@/infra/supabase'

interface TierGateProps {
  /** The feature being gated */
  feature: Feature
  /** Page content to render when access is granted */
  children: React.ReactNode
  /** Optional custom title for the upgrade prompt */
  title?: string
  /** Optional description of what the feature does */
  description?: string
}

/** Feature descriptions for the upgrade prompt */
const FEATURE_DESCRIPTIONS: Partial<Record<Feature, { title: string; desc: string }>> = {
  explorer_3d: {
    title: '3D Stull Chart',
    desc: 'Explore glaze chemistry in three dimensions — SiO₂, Al₂O₃, and flux mapped in an interactive 3D space.',
  },
  similarity_search: {
    title: 'Similarity Search',
    desc: 'Find glazes with similar chemistry to any selected recipe. Great for discovering alternatives.',
  },
  compare_glazes: {
    title: 'Compare Glazes',
    desc: 'Side-by-side comparison of glaze recipes — see how their UMF, limits, and chemistry differ.',
  },
  recipe_save: {
    title: 'Save Recipes',
    desc: 'Build and save your personal recipe collection for quick reference.',
  },
  import_export: {
    title: 'Import / Export',
    desc: 'Import glazes from JSON, CSV, or Insight XML files. Export your collection for backup or sharing.',
  },
  line_blend: {
    title: 'Line Blend Calculator',
    desc: 'The classic 10-step blend between two recipes — mapped on the Stull chart.',
  },
  validation_warnings: {
    title: 'Limit Warnings',
    desc: 'Get warnings when a recipe approaches known problem thresholds — crazing, leaching, running.',
  },
  optimizer: {
    title: 'Glaze Optimizer',
    desc: 'Set target UMF values and constraints — the solver finds a recipe that hits your targets.',
  },
  genetic_optimizer: {
    title: 'Genetic Algorithm',
    desc: 'Evolutionary optimization for complex, multi-constraint glaze formulation.',
  },
  suggestion_engine: {
    title: 'AI Suggestion Engine',
    desc: 'Describe what you want in plain English — "celadon at cone 10" — and get optimized recipe suggestions.',
  },
  triaxial_blend: {
    title: 'Triaxial Blend',
    desc: 'Three-corner blend mapped as a triangle on the Stull chart. The essential glaze testing grid.',
  },
  quadaxial_blend: {
    title: 'Quadaxial Blend',
    desc: 'Four-material blend exploration for complex glaze systems.',
  },
  biaxial_blend: {
    title: 'Biaxial Blend',
    desc: 'Two-axis grid blend — vary two pairs of materials independently.',
  },
  radial_blend: {
    title: 'Radial Blend',
    desc: 'Radial blend pattern centered on a base recipe with material variations.',
  },
  space_filling: {
    title: 'Space-Filling Designs',
    desc: 'Statistically optimized test points that efficiently cover your glaze space.',
  },
  analysis_clustering: {
    title: 'DBSCAN Clustering',
    desc: 'Find natural groups in your glaze collection using density-based clustering.',
  },
  analysis_density: {
    title: 'Density Analysis',
    desc: 'See where glazes cluster and where gaps exist in the Stull chart.',
  },
  analysis_voids: {
    title: 'Void Detection',
    desc: 'Identify unexplored regions of the Stull chart — potential areas for new glaze discovery.',
  },
  surface_fit_3d: {
    title: 'Surface Fitting',
    desc: 'Fit a continuous surface through glaze data points for trend visualization.',
  },
}

export function TierGate({ feature, children, title, description }: TierGateProps) {
  const { user, profile } = useAuthStore()
  const [showAuth, setShowAuth] = useState(false)

  const trialStatus = getTrialStatus(profile)
  const effectiveTier: Tier = trialStatus === 'active' ? 'pro' : (profile?.tier ?? 'free')

  // Access granted — render children
  if (canAccess(effectiveTier, feature)) {
    return <>{children}</>
  }

  const required = requiredTier(feature)
  const info = FEATURE_DESCRIPTIONS[feature]
  const displayTitle = title ?? info?.title ?? feature
  const displayDesc = description ?? info?.desc ?? ''

  return (
    <div className="tier-gate">
      <div className="tier-gate-card">
        <div className="tier-gate-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h2 className="tier-gate-title">{displayTitle}</h2>
        {displayDesc && <p className="tier-gate-desc">{displayDesc}</p>}

        <div className="tier-gate-badge">
          Requires <strong>{tierDisplayName(required)}</strong> or higher
        </div>

        {!user ? (
          <div className="tier-gate-actions">
            <button className="tier-gate-primary" onClick={() => setShowAuth(true)}>
              Sign In to Get Started
            </button>
            <p className="tier-gate-hint">
              Have a trial code? <button className="tier-gate-link" onClick={() => setShowAuth(true)}>Sign up</button> and enter it.
            </p>
          </div>
        ) : (
          <div className="tier-gate-actions">
            <Link to="/pricing" className="tier-gate-primary">
              View Plans
            </Link>
            <p className="tier-gate-hint">
              You're on the <strong>{tierDisplayName(effectiveTier)}</strong> plan.
            </p>
          </div>
        )}

        <Link to="/" className="tier-gate-back">← Back to Explorer</Link>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultTab="signup" />

      <style>{`
        .tier-gate {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .tier-gate-card {
          max-width: 480px;
          width: 100%;
          text-align: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 48px 32px;
        }

        .tier-gate-icon {
          color: var(--text-dim);
          margin-bottom: 20px;
        }

        .tier-gate-title {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 10px;
          color: var(--text-bright);
        }

        .tier-gate-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .tier-gate-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          background: rgba(155, 89, 182, 0.15);
          color: #a76bcf;
          font-size: 13px;
          margin-bottom: 24px;
        }

        .tier-gate-actions {
          margin-bottom: 20px;
        }

        .tier-gate-primary {
          display: inline-block;
          padding: 12px 32px;
          border-radius: 6px;
          border: 1px solid var(--accent);
          background: var(--accent);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s;
        }

        .tier-gate-primary:hover {
          opacity: 0.9;
        }

        .tier-gate-hint {
          margin: 12px 0 0;
          font-size: 13px;
          color: var(--text-dim);
        }

        .tier-gate-hint strong {
          color: var(--text-secondary);
        }

        .tier-gate-link {
          background: none;
          border: none;
          color: var(--text-link);
          font-size: 13px;
          cursor: pointer;
          padding: 0;
        }

        .tier-gate-link:hover {
          text-decoration: underline;
        }

        .tier-gate-back {
          display: inline-block;
          margin-top: 4px;
          font-size: 13px;
          color: var(--text-secondary);
          text-decoration: none;
        }

        .tier-gate-back:hover {
          color: var(--text-link);
        }
      `}</style>
    </div>
  )
}
