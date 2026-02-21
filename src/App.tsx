/**
 * Stull Atlas Application
 * 
 * Route configuration for all pages.
 * Calculator, materials, and content pages are lazy-loaded for smaller initial bundle.
 * Includes retry logic for stale chunk loads after deploys.
 */

import React, { Suspense, lazy, Component, ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
// TierGate removed — all pages unrestricted for NCECA demo

/**
 * Lazy import with automatic retry on chunk load failure.
 * After a deploy, users with cached index.html may request old chunk filenames
 * that no longer exist. This retries once with a cache-busting reload.
 */
function lazyRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(() =>
    factory().catch((err: Error) => {
      // Only auto-reload once to avoid infinite loops
      const reloaded = sessionStorage.getItem('stull-chunk-retry')
      if (!reloaded) {
        sessionStorage.setItem('stull-chunk-retry', '1')
        window.location.reload()
      }
      throw err
    })
  )
}

// Lazy-loaded pages â€” split into separate chunks
const CalculatorsPage = lazyRetry(() => import('./pages/CalculatorsPage').then(m => ({ default: m.CalculatorsPage })))
const UMFCalculatorPage = lazyRetry(() => import('./pages/UMFCalculatorPage').then(m => ({ default: m.UMFCalculatorPage })))
const LineBlendPage = lazyRetry(() => import('./pages/LineBlendPage').then(m => ({ default: m.LineBlendPage })))
const TriaxialBlendPage = lazyRetry(() => import('./pages/TriaxialBlendPage').then(m => ({ default: m.TriaxialBlendPage })))
const QuadaxialBlendPage = lazyRetry(() => import('./pages/QuadaxialBlendPage').then(m => ({ default: m.QuadaxialBlendPage })))
const BiaxialBlendPage = lazyRetry(() => import('./pages/BiaxialBlendPage').then(m => ({ default: m.BiaxialBlendPage })))
const RadialBlendPage = lazyRetry(() => import('./pages/RadialBlendPage').then(m => ({ default: m.RadialBlendPage })))
const FluxTriaxialPage = lazyRetry(() => import('./pages/FluxTriaxialPage').then(m => ({ default: m.FluxTriaxialPage })))
const SpaceFillingPage = lazyRetry(() => import('./pages/SpaceFillingPage').then(m => ({ default: m.SpaceFillingPage })))
const MaterialsPage = lazyRetry(() => import('./pages/MaterialsPage').then(m => ({ default: m.MaterialsPage })))
const ImportExportPage = lazyRetry(() => import('./pages/ImportExportPage').then(m => ({ default: m.ImportExportPage })))
const AboutPage = lazyRetry(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const GuidePage = lazyRetry(() => import('./pages/GuidePage').then(m => ({ default: m.GuidePage })))
const OptimizerPage = lazyRetry(() => import('./pages/OptimizerPage').then(m => ({ default: m.OptimizerPage })))
const UpdatesPage = lazyRetry(() => import('./pages/UpdatesPage').then(m => ({ default: m.UpdatesPage })))
const SuggestionPage = lazyRetry(() => import('./pages/SuggestionPage').then(m => ({ default: m.SuggestionPage })))
const PricingPage = lazyRetry(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })))
const NCECAPage = lazyRetry(() => import('./pages/NCECAPage').then(m => ({ default: m.NCECAPage })))
const VariabilityPage = lazyRetry(() => import('./pages/VariabilityPage').then(m => ({ default: m.VariabilityPage })))
const ExplorerPage = lazyRetry(() => import('./pages/ExplorerPage').then(m => ({ default: m.ExplorerPage })))
const HenryPage = lazyRetry(() => import('./pages/HenryPage').then(m => ({ default: m.HenryPage })))
const NotFoundPage = lazyRetry(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

// Clear the retry flag on successful load so future failures can retry again
if (sessionStorage.getItem('stull-chunk-retry')) {
  sessionStorage.removeItem('stull-chunk-retry')
}

/**
 * Error boundary specifically for chunk load failures.
 * Shows a "page failed to load â€” click to reload" message instead of blank white.
 */
class ChunkErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          flex: 1, gap: 12, color: 'var(--text-secondary)', fontSize: 14, padding: 40,
        }}>
          <p>This page failed to load â€” the app may have been updated.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 20px', background: 'var(--accent-bg, #282560)',
              border: '1px solid var(--accent, #6366F1)', borderRadius: 6,
              color: 'var(--text-bright, #fff)', fontSize: 13, cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function PageLoader() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      flex: 1, color: 'var(--text-secondary)', fontSize: 14, gap: 16,
    }}>
      <div style={{
        width: 32, height: 32,
        border: '3px solid var(--border-primary, #333)',
        borderTopColor: 'var(--accent, #6366F1)',
        borderRadius: '50%',
        animation: 'page-spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes page-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

/** Suspense + ChunkErrorBoundary wrapper for lazy pages */
function LazyPage({ children }: { children: ReactNode }) {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </ChunkErrorBoundary>
  )
}

function App() {
  return (
    <ErrorBoundary>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LazyPage><ExplorerPage /></LazyPage>} />
        <Route path="calc" element={<LazyPage><CalculatorsPage /></LazyPage>} />
        <Route path="calc/umf" element={<LazyPage><UMFCalculatorPage /></LazyPage>} />
        <Route path="calc/line-blend" element={<LazyPage><LineBlendPage /></LazyPage>} />
        <Route path="calc/triaxial" element={<LazyPage><TriaxialBlendPage /></LazyPage>} />
        <Route path="calc/quadaxial" element={<LazyPage><QuadaxialBlendPage /></LazyPage>} />
        <Route path="calc/biaxial" element={<LazyPage><BiaxialBlendPage /></LazyPage>} />
        <Route path="calc/radial" element={<LazyPage><RadialBlendPage /></LazyPage>} />
        <Route path="calc/flux-triaxial" element={<LazyPage><FluxTriaxialPage /></LazyPage>} />
        <Route path="calc/space-filling" element={<LazyPage><SpaceFillingPage /></LazyPage>} />
        <Route path="calc/optimizer" element={<LazyPage><OptimizerPage /></LazyPage>} />
        <Route path="materials" element={<LazyPage><MaterialsPage /></LazyPage>} />
        <Route path="import-export" element={<LazyPage><ImportExportPage /></LazyPage>} />
        <Route path="about" element={<LazyPage><AboutPage /></LazyPage>} />
        <Route path="guide" element={<LazyPage><GuidePage /></LazyPage>} />
        <Route path="suggest" element={<LazyPage><SuggestionPage /></LazyPage>} />
        <Route path="updates" element={<LazyPage><UpdatesPage /></LazyPage>} />
        <Route path="nceca" element={<LazyPage><NCECAPage /></LazyPage>} />
        <Route path="help/variability" element={<LazyPage><VariabilityPage /></LazyPage>} />
        <Route path="henry" element={<LazyPage><HenryPage /></LazyPage>} />
        <Route path="*" element={<LazyPage><NotFoundPage /></LazyPage>} />
      </Route>
    </Routes>
    </ErrorBoundary>
  )
}

export default App
