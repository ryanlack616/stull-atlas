/**
 * Layout
 * 
 * Shared shell for all pages — header with nav, renders page content via Outlet.
 */

import React, { useEffect, useState, useCallback } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useGlazeStore, useThemeStore, useAuthStore, isDemoMode } from '@/stores'
import { UserMenu } from '@/components/Auth'
import { WelcomeOverlay, useWelcome } from '@/components/Welcome'
import { GuidedTour, useTour } from '@/components/GuidedTour'
import { useGlazeLoader } from '@/hooks'

export function Layout() {
  const stats = useGlazeStore(s => s.stats)
  const isLoading = useGlazeStore(s => s.isLoading)
  const theme = useThemeStore(s => s.theme)
  const toggle = useThemeStore(s => s.toggle)
  const initialize = useAuthStore((s) => s.initialize)
  const { showWelcome, dismiss: dismissWelcome } = useWelcome()
  const { showTour, startTour, closeTour } = useTour()
  const { loadError, retry } = useGlazeLoader()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])

  // Bootstrap auth listener on mount
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="atlas-header" role="banner">
        <div className="header-left">
          <NavLink to="/" className="logo-link">
            <h1>Stull Atlas</h1>
          </NavLink>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
          >
            <span /><span /><span />
          </button>
          <nav className={`main-nav${menuOpen ? ' show' : ''}`} id="main-nav" aria-label="Main navigation">
            <NavLink to="/" end>Explorer</NavLink>
            <NavLink to="/suggest">AI Suggest</NavLink>
            <NavLink to="/calc">Calculators</NavLink>
            <NavLink to="/materials">Materials</NavLink>
            <NavLink to="/import-export">Import/Export</NavLink>
            <NavLink to="/timeline">Timeline</NavLink>
            <NavLink to="/guide">Guide</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/updates">What's New</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
          </nav>
        </div>
        <div className="header-right">
          {isDemoMode && (
            <span style={{
              padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600,
              background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', whiteSpace: 'nowrap',
            }}>
              DEMO MODE
            </span>
          )}
          <button
            className="tour-trigger"
            onClick={startTour}
            title="Start guided tour"
            aria-label="Start guided tour"
          >
            ?
          </button>
          <UserMenu />
          <button
            className="theme-toggle"
            onClick={toggle}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
          <span className="stats" aria-live="polite">
            {loadError ? (
              <button className="retry-btn" onClick={retry} title="Tap to retry loading">
                ⚠ Load failed · Retry
              </button>
            ) : isLoading ? 'Loading...' : `${stats.total.toLocaleString()} glazes`}
          </span>
        </div>
      </header>

      <main id="main-content" className="page-content">
        <Outlet />
      </main>

      {showWelcome && <WelcomeOverlay onDismiss={dismissWelcome} />}
      {showTour && <GuidedTour onClose={closeTour} />}

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-body);
        }

        .atlas-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-primary);
          flex-shrink: 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .logo-link {
          text-decoration: none;
          color: inherit;
        }

        .header-left h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          font-family: var(--font-display);
          letter-spacing: -0.01em;
        }

        .main-nav {
          display: flex;
          gap: 4px;
        }

        .main-nav a {
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 14px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.15s;
        }

        .main-nav a:hover {
          color: var(--text-label);
          background: var(--bg-elevated);
        }

        .main-nav a.active {
          color: var(--text-bright);
          background: var(--accent-bg);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .theme-toggle {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid var(--border-secondary);
          background: var(--bg-input);
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          padding: 0;
          line-height: 1;
        }

        .theme-toggle:hover {
          border-color: var(--accent);
          background: var(--bg-elevated);
        }

        .stats {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .retry-btn {
          background: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
          border: 1px solid rgba(231, 76, 60, 0.3);
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .retry-btn:hover {
          background: rgba(231, 76, 60, 0.25);
          border-color: #e74c3c;
        }

        .tour-trigger {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--border-secondary);
          background: var(--bg-input);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 700;
          font-family: var(--font-display);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          padding: 0;
          line-height: 1;
        }

        .tour-trigger:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-bg);
        }

        .page-content {
          flex: 1;
          overflow: hidden;
          display: flex;
        }

        @media (max-width: 768px) {
          .page-content {
            overflow: auto;
          }
        }

        /* ── Hamburger button ─────────────────────── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          width: 32px;
          height: 32px;
          background: none;
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          cursor: pointer;
          padding: 6px;
          transition: all 0.15s;
        }

        .hamburger span {
          display: block;
          height: 2px;
          background: var(--text-secondary);
          border-radius: 1px;
          transition: all 0.25s;
        }

        .hamburger:hover {
          border-color: var(--accent);
        }

        .hamburger:hover span {
          background: var(--accent);
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -4px);
        }

        /* ── Mobile responsive ────────────────────── */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .atlas-header {
            flex-wrap: wrap;
            padding: 8px 12px;
          }

          .header-left {
            gap: 12px;
          }

          .header-left h1 {
            font-size: 16px;
          }

          .main-nav {
            display: none;
            flex-direction: column;
            width: 100%;
            gap: 2px;
            padding-top: 8px;
            order: 3;
          }

          .main-nav.show {
            display: flex;
          }

          .main-nav a {
            padding: 10px 14px;
            font-size: 15px;
          }

          .header-right {
            gap: 8px;
          }

          .header-right .stats {
            display: none;
          }

          .tour-trigger {
            display: none;
          }
        }

        .skip-link {
          position: absolute;
          top: -40px;
          left: 0;
          background: var(--accent);
          color: var(--text-bright);
          padding: 8px 16px;
          z-index: 100;
          font-size: 14px;
          text-decoration: none;
          border-radius: 0 0 6px 0;
          transition: top 0.15s;
        }

        .skip-link:focus {
          top: 0;
        }
      `}</style>
    </div>
  )
}

export default Layout
