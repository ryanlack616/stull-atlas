/**
 * UpdatesPage
 *
 * Changelog documenting the meaningful improvements from
 * Stull Atlas v1 (rlv.lol/stull) → v2 (stullatlas.app).
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks'

export function UpdatesPage() {
  usePageTitle('What\'s New')

  return (
    <div className="about-page" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className="about-content">

        <section className="about-hero">
          <h1>What's New</h1>
          <p className="subtitle">
            Stull Atlas changelog â€” latest features and improvements.
          </p>
        </section>

        {/* v0.3.1 */}
        <section className="about-section" style={{ borderLeft: '3px solid var(--accent, #6366F1)', paddingLeft: 16 }}>
          <h2>{'\uD83D\uDD2C'} v0.3.1 {'\u2014'} Materials, Timeline &amp; Brand Polish</h2>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: '0 0 12px' }}>February 2025</p>
          <ul>
            <li><strong>Materials database expanded 20 {'\u2192'} 56</strong> {'\u2014'} Added feldspar variants,
              frits (3110, 3124, 3134, 3195, 3249), colorants (iron, cobalt, copper, manganese,
              chrome, rutile, tin, zircopax, titanium), bone ash, gerstley borate, Cornwall stone,
              nepheline syenite, lithium carbonate, strontium carbonate, and more. Every mineral
              oxide analysis verified.</li>
            <li><strong>Historical Timeline</strong> {'\u2014'} New <Link to="/timeline">Timeline</Link> page
              with 160+ events from 18,000 BCE to 2026, covering six eras of ceramic science.
              Filterable by category, inflection-point highlights, and thematic threads tracing
              recurring patterns across 20,000 years.</li>
            <li><strong>Brand unification</strong> {'\u2014'} Indigo color system (#4F46E5 / #6366F1) applied
              consistently across all pages, SVG wordmark assets created, favicon updated.</li>
            <li><strong>Polished upgrade UX</strong> {'\u2014'} Stripe integration placeholders now show
              a clean modal instead of a browser alert.</li>
            <li><strong>Analytics</strong> {'\u2014'} Plausible privacy-respecting analytics added.</li>
          </ul>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '32px 0' }} />
{/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            v3 â€” AI Recipe Suggestions
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="about-section" style={{ borderLeft: '3px solid var(--accent, #6366F1)', paddingLeft: 16 }}>
          <h2>ðŸ§ª v0.3.0 â€” AI Recipe Suggestions</h2>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: '0 0 12px' }}>June 2025</p>
          <p>
            Describe the glaze you want in plain English and the{' '}
            <Link to="/suggest">AI Suggest</Link> page generates optimized recipes
            automatically.
          </p>
          <ul>
            <li><strong>Natural language input</strong> â€” "matte celadon cone 10 reduction",
              "glossy clear cone 6", "copper red cone 10" â€” just type what you're after.</li>
            <li><strong>20+ glaze archetypes</strong> â€” Built-in knowledge base covering
              celadon, tenmoku, shino, ash, crystalline, majolica, copper red, rutile blue,
              chun/jun, cobalt blue, crawl texture, and more.</li>
            <li><strong>Smart query parsing</strong> â€” Extracts cone temperature, atmosphere,
              surface type, colors, and glaze-style terms from your description.</li>
            <li><strong>Dual optimization</strong> â€” Choose gradient descent for speed or genetic
              algorithm for broader exploration.</li>
            <li><strong>Complete recipe cards</strong> â€” Each suggestion includes ingredient
              percentages, colorant additions with expected effects, UMF analysis vs. targets,
              and detailed explanations.</li>
            <li><strong>Safety warnings</strong> â€” Automatic alerts for atmosphere mismatches,
              food-safety concerns, and optimizer convergence notes.</li>
          </ul>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Everything runs locally in your browser â€” no API keys or server required.
          </p>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '32px 0' }} />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            v2 â€” Full Rewrite
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="about-section">
          <h2>v0.2.0 â€” Full Rewrite</h2>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: '0 0 12px' }}>May 2025</p>
          <p>
            v2 is a complete rewrite. The original Stull Atlas was a single-page chart viewer.
            This version turns it into a full ceramic chemistry workbench â€” interactive 3D plots,
            blend calculators, recipe optimization, material databases, and more.
          </p>
        </section>

        {/* â”€â”€ 3D Visualization â”€â”€ */}
        <section className="about-section">
          <h2>3D Stull Plot</h2>
          <p>
            The explorer now has a full <Link to="/">3D mode</Link>. Choose any oxide, cone
            temperature, flux ratio, or Si:Al ratio as the Z-axis and view the dataset in
            three dimensions.
          </p>
          <ul>
            <li><strong>Surface fitting</strong> â€” Nadaraya-Watson kernel regression generates a
              smooth surface over the data, showing trends in the chemistry landscape.</li>
            <li><strong>Camera presets</strong> â€” One-click views: Top-down, Front, Side,
              Perspective, and Orbital auto-rotation for presentations.</li>
            <li><strong>Drop lines</strong> â€” Vertical lines from each point to the floor for
              easier spatial reading.</li>
            <li><strong>Cluster highlights</strong> â€” DBSCAN clustering colors groups of similar
              glazes so you can see natural groupings in 3D space.</li>
            <li><strong>Void detection</strong> â€” Highlights empty regions of chemistry space
              where no one has tested glazes yet â€” your exploration targets.</li>
            <li><strong>Adjustable surface opacity</strong> â€” Slider to dial the fitted surface
              from transparent to solid.</li>
            <li><strong>Toggle controls</strong> â€” Show/hide drop lines, surface, clusters, and
              voids independently.</li>
          </ul>
        </section>

        {/* â”€â”€ Blend Calculators â”€â”€ */}
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

        {/* â”€â”€ Recipe Optimizer â”€â”€ */}
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
            <li>Multi-objective targeting (SiOâ‚‚, Alâ‚‚Oâ‚ƒ, flux ratios simultaneously)</li>
            <li>Material constraint support (min/max percentages per ingredient)</li>
            <li>Visual convergence tracking â€” watch the optimizer zero in on solutions</li>
          </ul>
        </section>

        {/* â”€â”€ Analysis Tools â”€â”€ */}
        <section className="about-section">
          <h2>Analysis Tools</h2>
          <p>
            The explorer sidebar now includes an Analysis tab with three tools for understanding
            the shape of the dataset:
          </p>
          <ul>
            <li><strong>DBSCAN Clustering</strong> â€” Automatic detection of glaze groups based
              on oxide proximity. Shows cluster boundaries and membership.</li>
            <li><strong>Density Heatmap</strong> â€” Kernel density estimation shows where recipes
              concentrate â€” popular chemistry regions light up.</li>
            <li><strong>Void Detection</strong> â€” Grid-based detection of unexplored chemistry
              regions. Find the gaps nobody has filled yet.</li>
          </ul>
        </section>

        {/* â”€â”€ Compare Mode â”€â”€ */}
        <section className="about-section">
          <h2>Compare Mode</h2>
          <p>
            Select up to 3 glazes for side-by-side UMF comparison. See differences in flux
            balance, Si:Al ratio, recipe ingredients, cone temperature, and surface type at a
            glance. Each selected glaze gets a colored ring on the chart for visual tracking.
          </p>
        </section>

        {/* â”€â”€ Data & Filtering â”€â”€ */}
        <section className="about-section">
          <h2>3,000+ Glazes</h2>
          <p>
            The dataset is sourced from <a href="https://glazy.org" target="_blank"
            rel="noopener noreferrer">Glazy</a> â€” the open ceramic recipe database.
            Color-code points by cone temperature, surface type, source, flux ratio (Râ‚‚O:RO),
            boron content, or data confidence level.
          </p>
          <p>
            Dataset switching lets you load the full Glazy dataset or curated subsets for
            focused exploration.
          </p>
        </section>

        {/* â”€â”€ Materials Database â”€â”€ */}
        <section className="about-section">
          <h2>Materials Database</h2>
          <p>
            A searchable <Link to="/materials">materials database</Link> powered by Digitalfire
            data. Browse raw materials by category, see oxide analyses, and understand what
            each ingredient contributes to a glaze recipe.
          </p>
        </section>

        {/* â”€â”€ Import / Export â”€â”€ */}
        <section className="about-section">
          <h2>Import &amp; Export</h2>
          <p>
            <Link to="/import-export">Import</Link> your own recipes from Glazy CSV exports,
            Insight XML files, or JSON. Export saved recipes to CSV for your studio notebook.
            Recipe serialization includes versioning â€” your data stays portable.
          </p>
        </section>

        {/* â”€â”€ Timeline â”€â”€ */}
        <section className="about-section">
          <h2>Historical Timeline</h2>
          <p>
            A new <Link to="/timeline">Timeline</Link> page traces the history of glaze
            chemistry â€” from ancient Egyptian faience to Stull's 1912 diagram and modern
            computational ceramics.
          </p>
        </section>

        {/* â”€â”€ WebGL Performance â”€â”€ */}
        <section className="about-section">
          <h2>WebGL-Accelerated Plots</h2>
          <p>
            Both 2D and 3D charts use WebGL rendering via Plotly's <code>scattergl</code> and{' '}
            <code>scatter3d</code> trace types. Ten thousand points render smoothly with
            interactive zoom, pan, and hover â€” no canvas bottleneck.
          </p>
          <p>
            Plotly bundles are code-split â€” 2D and 3D packages load independently so you
            only download what you need.
          </p>
        </section>

        {/* â”€â”€ UX Improvements â”€â”€ */}
        <section className="about-section">
          <h2>UX &amp; Quality of Life</h2>
          <ul>
            <li><strong>Dark / Light mode</strong> â€” Theme toggle with persistent preference.</li>
            <li><strong>Lazy-loaded pages</strong> â€” Each page loads as a separate chunk with
              automatic retry on stale deploys.</li>
            <li><strong>Print support</strong> â€” Clean print layouts for every page, including
              blend results and labels.</li>
            <li><strong>Keyboard accessible</strong> â€” Full keyboard navigation, ARIA labels,
              focus indicators, skip-to-content link.</li>
            <li><strong>Similarity search</strong> â€” Click any glaze to find the closest matches
              ranked by oxide distance.</li>
            <li><strong>In-app guide</strong> â€” Comprehensive <Link to="/guide">documentation</Link> for
              every feature.</li>
          </ul>
        </section>

        {/* â”€â”€ Under the Hood â”€â”€ */}
        <section className="about-section">
          <h2>Under the Hood</h2>
          <ul>
            <li>Full rewrite in React + TypeScript with Vite bundling</li>
            <li>Zustand state management with versioned serialization</li>
            <li>175 unit tests covering UMF calculations, blending, parsing, validation,
              optimization, and AI suggestion engine</li>
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
            â€” Howell, Michigan.
          </p>
          <p className="version">v0.3.1</p>
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
