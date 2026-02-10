/**
 * Guided Demo Tour
 * 
 * A step-by-step walkthrough overlay for booth demos at NCECA
 * and self-guided tours for new visitors.
 * 
 * Each step highlights a region of the UI with a tooltip explanation.
 * Steps progress linearly with Next / Back / Skip controls.
 * 
 * Triggering:
 *   - "Start Tour" button in the explorer toolbar (demo mode)
 *   - Re-accessible from Help dropdown or About page
 */

import React, { useState, useCallback, useEffect } from 'react'

export interface TourStep {
  /** CSS selector for the element to highlight (null = centered card with no highlight) */
  target: string | null
  /** Short title */
  title: string
  /** Explanation body */
  body: string
  /** Tooltip position relative to target */
  position: 'top' | 'bottom' | 'left' | 'right'
  /** Optional action to run when this step activates (e.g. click a button) */
  onEnter?: () => void
}

const TOUR_STEPS: TourStep[] = [
  {
    target: null,
    title: 'Welcome to Stull Atlas',
    body: 'This quick tour will show you the key features. It takes about 60 seconds.',
    position: 'bottom',
  },
  {
    target: '.stull-plot-container',
    title: 'The Stull Chart',
    body: 'Each dot is a real glaze analysis. The X and Y axes show oxide moles (SiO₂ vs Al₂O₃ by default). Click any dot to see its full recipe and UMF analysis.',
    position: 'right',
  },
  {
    target: '.controls-panel',
    title: 'Plot Controls',
    body: 'Change the axes to plot different oxides, switch the color scheme, toggle 3D mode, and filter by cone range. The controls panel gives you full command of the visualization.',
    position: 'right',
  },
  {
    target: '.dataset-switcher',
    title: 'Dataset Switcher',
    body: 'Browse the full Glazy dataset (9,000+ glazes) or switch to focused subsets like cone 6 stoneware, cone 10 reduction, or low-fire earthenware.',
    position: 'bottom',
  },
  {
    target: '.view-toggle',
    title: '3D Visualization',
    body: 'Switch to 3D mode to add a third oxide axis. Rotate, zoom, and fly through the data. A fitted surface shows concentration trends.',
    position: 'right',
  },
  {
    target: '.sidebar-panel',
    title: 'Glaze Details',
    body: 'When you click a glaze, this panel shows its full UMF analysis, recipe breakdown, similarity search results, and options to compare or add to your collection.',
    position: 'left',
  },
  {
    target: '.main-nav',
    title: 'Calculators & Tools',
    body: 'Beyond the explorer: blend calculators (line, triaxial, biaxial), a recipe optimizer with gradient descent and genetic algorithms, AI suggestions, and a full materials database.',
    position: 'bottom',
  },
  {
    target: null,
    title: 'Ready to Explore!',
    body: 'Click any dot on the chart to start exploring. The free tier gives you full access to the explorer, UMF calculator, materials database, and guide.',
    position: 'bottom',
  },
]

interface GuidedTourProps {
  onClose: () => void
}

export function GuidedTour({ onClose }: GuidedTourProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [highlight, setHighlight] = useState<DOMRect | null>(null)
  const step = TOUR_STEPS[stepIndex]
  const isFirst = stepIndex === 0
  const isLast = stepIndex === TOUR_STEPS.length - 1

  // Find and highlight the target element
  useEffect(() => {
    if (!step.target) {
      setHighlight(null)
      return
    }

    const el = document.querySelector(step.target)
    if (el) {
      const rect = el.getBoundingClientRect()
      setHighlight(rect)
    } else {
      setHighlight(null)
    }

    step.onEnter?.()

    // Recalculate on resize
    const handleResize = () => {
      if (!step.target) return
      const el = document.querySelector(step.target)
      if (el) setHighlight(el.getBoundingClientRect())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [stepIndex, step])

  const next = useCallback(() => {
    if (isLast) {
      onClose()
    } else {
      setStepIndex(i => i + 1)
    }
  }, [isLast, onClose])

  const prev = useCallback(() => {
    setStepIndex(i => Math.max(0, i - 1))
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' || e.key === 'Enter') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev, onClose])

  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!highlight) {
      // Centered card
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }

    const pad = 16
    const pos = step.position

    switch (pos) {
      case 'right':
        return {
          position: 'fixed',
          top: Math.max(pad, highlight.top),
          left: highlight.right + pad,
          maxWidth: `calc(100vw - ${highlight.right + pad * 2}px)`,
        }
      case 'left':
        return {
          position: 'fixed',
          top: Math.max(pad, highlight.top),
          right: `calc(100vw - ${highlight.left - pad}px)`,
          maxWidth: highlight.left - pad * 2,
        }
      case 'bottom':
        return {
          position: 'fixed',
          top: highlight.bottom + pad,
          left: Math.max(pad, highlight.left),
          maxWidth: 400,
        }
      case 'top':
        return {
          position: 'fixed',
          bottom: `calc(100vh - ${highlight.top - pad}px)`,
          left: Math.max(pad, highlight.left),
          maxWidth: 400,
        }
    }
  }

  return (
    <div className="tour-overlay">
      {/* Darkened backdrop with cutout for highlighted element */}
      <svg className="tour-backdrop" width="100%" height="100%">
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {highlight && (
              <rect
                x={highlight.left - 6}
                y={highlight.top - 6}
                width={highlight.width + 12}
                height={highlight.height + 12}
                rx="8"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%" height="100%"
          fill="rgba(0,0,0,0.65)"
          mask="url(#tour-mask)"
        />
        {highlight && (
          <rect
            x={highlight.left - 6}
            y={highlight.top - 6}
            width={highlight.width + 12}
            height={highlight.height + 12}
            rx="8"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            className="tour-highlight-ring"
          />
        )}
      </svg>

      {/* Tooltip card */}
      <div className="tour-tooltip" style={getTooltipStyle()}>
        <div className="tour-step-indicator">
          {stepIndex + 1} / {TOUR_STEPS.length}
        </div>
        <h3 className="tour-title">{step.title}</h3>
        <p className="tour-body">{step.body}</p>
        <div className="tour-nav">
          {!isFirst && (
            <button className="tour-btn tour-btn-ghost" onClick={prev}>
              ← Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          <button className="tour-btn tour-btn-ghost" onClick={onClose}>
            Skip
          </button>
          <button className="tour-btn tour-btn-primary" onClick={next}>
            {isLast ? 'Done' : 'Next →'}
          </button>
        </div>
      </div>

      <style>{`
        .tour-overlay {
          position: fixed;
          inset: 0;
          z-index: 10001;
          pointer-events: none;
        }

        .tour-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: all;
        }

        .tour-highlight-ring {
          animation: tourPulse 2s ease-in-out infinite;
        }

        @keyframes tourPulse {
          0%, 100% { stroke-opacity: 1; }
          50% { stroke-opacity: 0.4; }
        }

        .tour-tooltip {
          pointer-events: all;
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 20px 24px;
          max-width: 380px;
          min-width: 280px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
          animation: tourFadeIn 0.25s ease;
          z-index: 10002;
        }

        @keyframes tourFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tour-step-indicator {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .tour-title {
          margin: 0 0 8px;
          font-size: 17px;
          font-weight: 600;
          color: var(--text-bright);
        }

        .tour-body {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-body);
        }

        .tour-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
        }

        .tour-btn {
          padding: 7px 16px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          border: none;
          white-space: nowrap;
        }

        .tour-btn-primary {
          background: var(--accent);
          color: #fff;
        }

        .tour-btn-primary:hover {
          filter: brightness(1.15);
        }

        .tour-btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-secondary);
        }

        .tour-btn-ghost:hover {
          color: var(--text-label);
          border-color: var(--accent);
        }

        @media (max-width: 600px) {
          .tour-tooltip {
            position: fixed !important;
            bottom: 16px !important;
            left: 16px !important;
            right: 16px !important;
            top: auto !important;
            transform: none !important;
            max-width: none;
          }
        }
      `}</style>
    </div>
  )
}

/** Hook to manage tour state */
export function useTour() {
  const [showTour, setShowTour] = useState(false)

  const startTour = useCallback(() => setShowTour(true), [])
  const closeTour = useCallback(() => setShowTour(false), [])

  return { showTour, startTour, closeTour }
}

export default GuidedTour
