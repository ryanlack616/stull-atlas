/**
 * Layout
 * 
 * Shared shell for all pages — header with nav, renders page content via Outlet.
 */

import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useGlazeStore, useThemeStore, useAuthStore, isDemoMode } from '@/stores'
import { STUDIO_SKINS } from '@/stores/themeStore'
import { UserMenu } from '@/components/Auth'
import { WelcomeOverlay, useWelcome } from '@/components/Welcome'
import { GuidedTour, useTour } from '@/components/GuidedTour'
import { useGlazeLoader } from '@/hooks'
import { useOmniSearch } from '@/hooks'
import { useOnlineStatus } from '@/hooks'
import { useKioskMode } from '@/hooks'
import { edition } from '@/edition'

const OmniSearch = lazy(() => import('@/components/OmniSearch'))

export function Layout() {
  const stats = useGlazeStore(s => s.stats)
  const isLoading = useGlazeStore(s => s.isLoading)
  const theme = useThemeStore(s => s.theme)
  const toggle = useThemeStore(s => s.toggle)
  const setTheme = useThemeStore(s => s.setTheme)
  const initialize = useAuthStore((s) => s.initialize)
  const { showWelcome, dismiss: dismissWelcome } = useWelcome()
  const { showTour, startTour, closeTour } = useTour()
  const { loadError, retry } = useGlazeLoader()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { open: omniOpen, toggle: toggleOmni } = useOmniSearch()
  const { isOnline, hasUpdate, applyUpdate } = useOnlineStatus()
  const kiosk = useKioskMode()

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])

  // Bootstrap auth listener on mount
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div className={`app-layout${kiosk.active ? ' kiosk-layout' : ''}`}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {!kiosk.active && (
      <header className="atlas-header" role="banner">
        <div className="header-left">
          <NavLink to="/" className="logo-link">
            <h1>{edition.name}</h1>
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
            {edition.showPricing && <NavLink to="/pricing">Pricing</NavLink>}
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
            className="search-trigger"
            onClick={toggleOmni}
            title="Search everything (Ctrl+K)"
            aria-label="Search everything"
          >
            <span className="search-trigger-icon">&#x1F50D;</span>
            <span className="search-trigger-label">Search</span>
            <kbd className="search-trigger-kbd">Ctrl K</kbd>
          </button>
          <button
            className="tour-trigger"
            onClick={startTour}
            title="Start guided tour"
            aria-label="Start guided tour"
          >
            ?
          </button>
          {edition.showAuth && <UserMenu />}
          <button
            className="theme-toggle"
            onClick={toggle}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
          {edition.extraSkins && (
            <div className="skin-picker">
              {STUDIO_SKINS.map(s => (
                <button
                  key={s.id}
                  className={`skin-dot${theme === s.id ? ' active' : ''}`}
                  onClick={() => setTheme(s.id)}
                  title={s.label}
                  aria-label={`${s.label} skin`}
                  style={{ background: s.preview }}
                />
              ))}
            </div>
          )}
          <span className="stats" aria-live="polite">
            {loadError ? (
              <button className="retry-btn" onClick={retry} title="Tap to retry loading">
                ⚠ Load failed · Retry
              </button>
            ) : isLoading ? 'Loading...' : `${stats.total.toLocaleString()} glazes`}
          </span>
        </div>
      </header>
      )}

      {/* Offline / update banners */}
      {!isOnline && (
        <div className="offline-banner" role="alert">
          <span className="offline-icon">⚡</span>
          You're offline — cached data is still available
        </div>
      )}
      {hasUpdate && (
        <div className="update-banner" role="alert">
          <span>A new version of Stull Atlas is available</span>
          <button className="update-btn" onClick={applyUpdate}>Refresh</button>
        </div>
      )}

      <main id="main-content" className="page-content">
        <Outlet />
      </main>

      {showWelcome && <WelcomeOverlay onDismiss={dismissWelcome} />}
      {showTour && <GuidedTour onClose={closeTour} />}
      {omniOpen && <Suspense fallback={null}><OmniSearch /></Suspense>}

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

        .skin-picker {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 2px 4px;
          border-radius: 6px;
          border: 1px solid var(--border-secondary);
          background: var(--bg-input);
        }

        .skin-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          padding: 0;
          transition: all 0.15s;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15);
        }

        .skin-dot:hover {
          transform: scale(1.2);
          border-color: var(--text-secondary);
        }

        .skin-dot.active {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent), inset 0 0 0 1px rgba(0,0,0,0.15);
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

        /* ── Search trigger button ─────────────────── */
        .search-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 6px;
          border: 1px solid var(--border-secondary);
          background: var(--bg-input);
          color: var(--text-secondary);
          font-size: 13px;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .search-trigger:hover {
          border-color: var(--accent);
          color: var(--text-primary);
          background: var(--accent-bg);
        }

        .search-trigger-icon {
          font-size: 13px;
          line-height: 1;
        }

        .search-trigger-label {
          font-size: 13px;
        }

        .search-trigger-kbd {
          font-size: 10px;
          font-weight: 600;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-primary);
          border-radius: 3px;
          padding: 1px 5px;
          margin-left: 4px;
          font-family: var(--font-body);
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

          .search-trigger-label,
          .search-trigger-kbd {
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

        /* ── Offline / update banners ── */
        .offline-banner,
        .update-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          flex-shrink: 0;
          animation: bannerSlideDown 0.25s ease-out;
        }

        @keyframes bannerSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }

        .offline-banner {
          background: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
          border-bottom: 1px solid rgba(231, 76, 60, 0.3);
        }

        .offline-icon {
          font-size: 16px;
        }

        .update-banner {
          background: rgba(52, 152, 219, 0.15);
          color: #3498db;
          border-bottom: 1px solid rgba(52, 152, 219, 0.3);
        }

        .update-btn {
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }

        .update-btn:hover {
          background: #2980b9;
        }

        /* ── Kiosk / booth mode ── */
        .kiosk-layout .atlas-header {
          display: none;
        }
        .kiosk-layout .page-content {
          height: 100vh;
        }
      `}</style>
    </div>
  )
}

export default Layout
