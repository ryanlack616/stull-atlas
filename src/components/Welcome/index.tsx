/**
 * Welcome Overlay
 * 
 * First-visit onboarding experience. Shows a brief, visually appealing
 * introduction to Stull Atlas with key feature highlights.
 * 
 * - Shows once per browser (localStorage flag)
 * - Skipped in demo mode (booth operator already knows the app)
 * - Accessible via Help menu / "What is this?" link to re-show
 */

import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { isDemoMode } from '@/stores'

const STORAGE_KEY = 'stull-atlas-welcomed'

const FEATURES = [
  {
    icon: '🔬',
    title: '14,000+ Real Glazes',
    desc: 'Explore the largest open dataset of glaze analyses, plotted on interactive Stull charts by oxide composition.',
  },
  {
    icon: '🧪',
    title: 'Blend Calculators',
    desc: 'Line, triaxial, biaxial, radial, and space-filling blend tools — plan your test tiles before mixing.',
  },
  {
    icon: '⚡',
    title: 'Recipe Optimizer',
    desc: 'Set UMF targets and let gradient descent or genetic algorithms find material recipes that hit them.',
  },
  {
    icon: '💬',
    title: 'AI Suggestions',
    desc: 'Describe the glaze you want in plain English — "matte celadon, cone 6" — and get optimized recipes.',
  },
]

export function useWelcome() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Don't show in demo mode (booth operator doesn't need it)
    if (isDemoMode) return

    const welcomed = localStorage.getItem(STORAGE_KEY)
    if (!welcomed) {
      // Small delay so the page renders first
      const t = setTimeout(() => setShowWelcome(true), 400)
      return () => clearTimeout(t)
    }
  }, [])

  const dismiss = useCallback(() => {
    setShowWelcome(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }, [])

  const reshow = useCallback(() => {
    setShowWelcome(true)
  }, [])

  return { showWelcome, dismiss, reshow }
}

interface WelcomeOverlayProps {
  onDismiss: () => void
}

export function WelcomeOverlay({ onDismiss }: WelcomeOverlayProps) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0 = intro, 1 = features

  const handleExplore = () => {
    onDismiss()
  }

  const handlePricing = () => {
    onDismiss()
    navigate('/pricing')
  }

  return (
    <div className="welcome-overlay" onClick={onDismiss}>
      <div className="welcome-card" onClick={(e) => e.stopPropagation()}>
        {step === 0 ? (
          <>
            <div className="welcome-hero">
              <div className="welcome-logo">⚗</div>
              <h1>Stull Atlas</h1>
              <p className="welcome-tagline">
                The ceramicist's workbench for glaze chemistry
              </p>
            </div>

            <p className="welcome-body">
              Stull Atlas puts 14,000+ real glaze analyses at your fingertips — plotted
              on interactive oxide charts with tools for blending, optimizing, and
              discovering new recipes.
            </p>

            <p className="welcome-body welcome-body-secondary">
              Built by a potter, for potters. Free to explore.
            </p>

            <div className="welcome-actions">
              <button className="welcome-btn welcome-btn-primary" onClick={() => setStep(1)}>
                See What's Inside →
              </button>
              <button className="welcome-btn welcome-btn-ghost" onClick={handleExplore}>
                Jump Straight In
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="welcome-features-title">What you can do</h2>

            <div className="welcome-features">
              {FEATURES.map((f, i) => (
                <div key={i} className="welcome-feature">
                  <span className="welcome-feature-icon">{f.icon}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="welcome-actions">
              <button className="welcome-btn welcome-btn-primary" onClick={handleExplore}>
                Start Exploring
              </button>
              <button className="welcome-btn welcome-btn-ghost" onClick={handlePricing}>
                View Plans & Pricing
              </button>
            </div>

            <p className="welcome-footnote">
              The explorer, UMF calculator, materials database, and guide are always free.
            </p>
          </>
        )}
      </div>

      <style>{`
        .welcome-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(6px);
          animation: welcomeFadeIn 0.3s ease;
        }

        @keyframes welcomeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes welcomeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .welcome-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 16px;
          padding: 40px;
          max-width: 520px;
          width: calc(100% - 32px);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          animation: welcomeSlideUp 0.35s ease;
        }

        .welcome-hero {
          text-align: center;
          margin-bottom: 24px;
        }

        .welcome-logo {
          font-size: 56px;
          margin-bottom: 8px;
          filter: grayscale(0.3);
        }

        .welcome-hero h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: var(--text-bright);
          letter-spacing: -0.5px;
        }

        .welcome-tagline {
          margin: 6px 0 0;
          font-size: 15px;
          color: var(--accent);
          font-weight: 500;
        }

        .welcome-body {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-body);
          margin: 0 0 12px;
        }

        .welcome-body-secondary {
          font-style: italic;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .welcome-actions {
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }

        .welcome-btn {
          flex: 1;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          border: none;
        }

        .welcome-btn-primary {
          background: var(--accent);
          color: #fff;
        }

        .welcome-btn-primary:hover {
          filter: brightness(1.15);
        }

        .welcome-btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-secondary);
        }

        .welcome-btn-ghost:hover {
          color: var(--text-label);
          border-color: var(--accent);
          background: var(--accent-bg);
        }

        .welcome-features-title {
          margin: 0 0 20px;
          font-size: 20px;
          font-weight: 600;
          color: var(--text-bright);
        }

        .welcome-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 8px;
        }

        .welcome-feature {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .welcome-feature-icon {
          font-size: 28px;
          flex-shrink: 0;
          width: 36px;
          text-align: center;
          margin-top: 2px;
        }

        .welcome-feature strong {
          display: block;
          font-size: 14px;
          color: var(--text-bright);
          margin-bottom: 2px;
        }

        .welcome-feature p {
          margin: 0;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .welcome-footnote {
          text-align: center;
          font-size: 12px;
          color: var(--text-muted);
          margin: 16px 0 0;
        }

        @media (max-width: 480px) {
          .welcome-card {
            padding: 28px 20px;
          }

          .welcome-hero h1 {
            font-size: 26px;
          }

          .welcome-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default WelcomeOverlay
