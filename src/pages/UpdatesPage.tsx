/**
 * UpdatesPage
 *
 * Changelog documenting the meaningful improvements from
 * Stull Atlas v1 (rlv.lol/stull) → v2 (rlv.lol/stullv2).
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks'

export function UpdatesPage() {
  usePageTitle('v2 Updates')

  return (
    <div className="about-page" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className="about-content">

        <section className="about-hero">
          <h1>v2 Updates</h1>
          <p className="subtitle">
            Everything new in Stull Atlas v2 — from the ground up.
          </p>
        </section>

        <section className="about-section">
          <p>
            v2 is a complete rewrite. The original Stull Atlas was a single-page chart viewer.
            This version turns it into a full ceramic chemistry workbench — interactive 3D plots,
            blend calculators, recipe optimization, material databases, and more.
          </p>
        </section>

        {/* ── 3D Visualization ── */}
        <section className="about-section">
          <h2>3D Stull Plot</h2>
          <p>
            The explorer now has a full <Link to="/">3D mode</Link>. Choose any oxide, cone
            temperature, flux ratio, or Si:Al ratio as the Z-axis and view the dataset in
            three dimensions.
          </p>
          <ul>
            <li><strong>Surface fitting</strong> — Nadaraya-Watson kernel regression generates a
              smooth surface over the data, showing trends in the chemistry landscape.</li>
            <li><strong>Camera presets</strong> — One-click views: Top-down, Front, Side,
              Perspective, and Orbital auto-rotation for presentations.</li>
            <li><strong>Drop lines</strong> — Vertical lines from each point to the floor for
              easier spatial reading.</li>
            <li><strong>Cluster highlights</strong> — DBSCAN clustering colors groups of similar
              glazes so you can see natural groupings in 3D space.</li>
            <li><strong>Void detection</strong> — Highlights empty regions of chemistry space
              where no one has tested glazes yet — your exploration targets.</li>
            <li><strong>Adjustable surface opacity</strong> — Slider to dial the fitted surface
              from transparent to solid.</li>
            <li><strong>Toggle controls</strong> — Show/hide drop lines, surface, clusters, and
              voids independently.</li>
          </ul>
        </section>

        {/* ── Blend Calculators ── */}
        <section className="about-section">
          <h2>Blend Calculators</h2>
          <p>
            Seven blend tools, all accessible from <Link to="/calc">Calculators</Link>.
            Every blend overlays results on the Stull chart and exports to CSV.
          </p>
          <div className="updates-grid">
            <div className="update-card">
              <h3>Line Blend</h3>
              <p>Interpolate between two recipes across N steps.</p>
            </div>
            <div className="update-card">
              <h3>Triaxial Blend</h3>
              <p>Three-corner blend with configurable grid divisions.</p>
            </div>
            <div className="update-card">
              <h3>Biaxial Blend</h3>
              <p>Two-axis grid blend from 4 corner recipes.</p>
            </div>
            <div className="update-card">
              <h3>Quadaxial Blend</h3>
              <p>Four-material blend with tetrahedral interpolation.</p>
            </div>
            <div className="update-card">
              <h3>Radial Blend</h3>
              <p>Circular blend pattern radiating from a center recipe.</p>
            </div>
            <div className="update-card">
              <h3>Space-Filling</h3>
              <p>Algorithmic exploration using space-filling curves to cover blend space efficiently.</p>
            </div>
            <div className="update-card">
              <h3>UMF Calculator</h3>
              <p>Enter a recipe by weight percentage, get the Unity Molecular Formula instantly.</p>
            </div>
          </div>
        </section>

        {/* ── Recipe Optimizer ── */}
        <section className="about-section">
          <h2>Recipe Optimizer</h2>
          <p>
            The <Link to="/calc/optimizer">Optimizer</Link> finds recipes that hit target UMF
            values. It combines a genetic algorithm for broad search with gradient descent for
            fine-tuning, and includes response surface analysis to map how ingredient changes
            affect your targets.
          </p>
          <ul>
            <li>Cone-specific UMF validation against Stull surface predictions</li>
            <li>Multi-objective targeting (SiO₂, Al₂O₃, flux ratios simultaneously)</li>
            <li>Material constraint support (min/max percentages per ingredient)</li>
            <li>Visual convergence tracking — watch the optimizer zero in on solutions</li>
          </ul>
        </section>

        {/* ── Analysis Tools ── */}
        <section className="about-section">
          <h2>Analysis Tools</h2>
          <p>
            The explorer sidebar now includes an Analysis tab with three tools for understanding
            the shape of the dataset:
          </p>
          <ul>
            <li><strong>DBSCAN Clustering</strong> — Automatic detection of glaze groups based
              on oxide proximity. Shows cluster boundaries and membership.</li>
            <li><strong>Density Heatmap</strong> — Kernel density estimation shows where recipes
              concentrate — popular chemistry regions light up.</li>
            <li><strong>Void Detection</strong> — Grid-based detection of unexplored chemistry
              regions. Find the gaps nobody has filled yet.</li>
          </ul>
        </section>

        {/* ── Compare Mode ── */}
        <section className="about-section">
          <h2>Compare Mode</h2>
          <p>
            Select up to 3 glazes for side-by-side UMF comparison. See differences in flux
            balance, Si:Al ratio, recipe ingredients, cone temperature, and surface type at a
            glance. Each selected glaze gets a colored ring on the chart for visual tracking.
          </p>
        </section>

        {/* ── Data & Filtering ── */}
        <section className="about-section">
          <h2>10,000+ Glazes</h2>
          <p>
            The dataset is sourced from <a href="https://glazy.org" target="_blank"
            rel="noopener noreferrer">Glazy</a> — the open ceramic recipe database.
            Color-code points by cone temperature, surface type, source, flux ratio (R₂O:RO),
            boron content, or data confidence level.
          </p>
          <p>
            Dataset switching lets you load the full Glazy dataset or curated subsets for
            focused exploration.
          </p>
        </section>

        {/* ── Materials Database ── */}
        <section className="about-section">
          <h2>Materials Database</h2>
          <p>
            A searchable <Link to="/materials">materials database</Link> powered by Digitalfire
            data. Browse raw materials by category, see oxide analyses, and understand what
            each ingredient contributes to a glaze recipe.
          </p>
        </section>

        {/* ── Import / Export ── */}
        <section className="about-section">
          <h2>Import &amp; Export</h2>
          <p>
            <Link to="/import-export">Import</Link> your own recipes from Glazy CSV exports,
            Insight XML files, or JSON. Export saved recipes to CSV for your studio notebook.
            Recipe serialization includes versioning — your data stays portable.
          </p>
        </section>

        {/* ── Timeline ── */}
        <section className="about-section">
          <h2>Historical Timeline</h2>
          <p>
            A new <Link to="/timeline">Timeline</Link> page traces the history of glaze
            chemistry — from ancient Egyptian faience to Stull's 1912 diagram and modern
            computational ceramics.
          </p>
        </section>

        {/* ── WebGL Performance ── */}
        <section className="about-section">
          <h2>WebGL-Accelerated Plots</h2>
          <p>
            Both 2D and 3D charts use WebGL rendering via Plotly's <code>scattergl</code> and{' '}
            <code>scatter3d</code> trace types. Ten thousand points render smoothly with
            interactive zoom, pan, and hover — no canvas bottleneck.
          </p>
          <p>
            Plotly bundles are code-split — 2D and 3D packages load independently so you
            only download what you need.
          </p>
        </section>

        {/* ── UX Improvements ── */}
        <section className="about-section">
          <h2>UX &amp; Quality of Life</h2>
          <ul>
            <li><strong>Dark / Light mode</strong> — Theme toggle with persistent preference.</li>
            <li><strong>Lazy-loaded pages</strong> — Each page loads as a separate chunk with
              automatic retry on stale deploys.</li>
            <li><strong>Print support</strong> — Clean print layouts for every page, including
              blend results and labels.</li>
            <li><strong>Keyboard accessible</strong> — Full keyboard navigation, ARIA labels,
              focus indicators, skip-to-content link.</li>
            <li><strong>Similarity search</strong> — Click any glaze to find the closest matches
              ranked by oxide distance.</li>
            <li><strong>In-app guide</strong> — Comprehensive <Link to="/guide">documentation</Link> for
              every feature.</li>
          </ul>
        </section>

        {/* ── Under the Hood ── */}
        <section className="about-section">
          <h2>Under the Hood</h2>
          <ul>
            <li>Full rewrite in React + TypeScript with Vite bundling</li>
            <li>Zustand state management with versioned serialization</li>
            <li>137 unit tests covering UMF calculations, blending, parsing, validation,
              and optimization</li>
            <li>Genetic algorithm optimizer with response surface analysis</li>
            <li>Nadaraya-Watson kernel regression for surface fitting</li>
            <li>DBSCAN clustering and grid-based void detection algorithms</li>
            <li>Memoized plot-point generation with version-keyed caching</li>
            <li>Cloudflare Pages deployment via GitHub Actions</li>
          </ul>
        </section>

        <section className="about-section about-footer">
          <p>
            Built by Ryan Lack at{' '}
            <a href="https://myclaycorner.com" target="_blank" rel="noopener noreferrer">
              My Clay Corner Studio
            </a>{' '}
            — Howell, Michigan.
          </p>
          <p className="version">v2.0.0</p>
        </section>

      </div>

      <style>{`
        .updates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
          margin: 16px 0;
        }

        .update-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 16px;
        }

        .update-card h3 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 6px;
          color: var(--text-primary);
        }

        .update-card p {
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-body);
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default UpdatesPage
