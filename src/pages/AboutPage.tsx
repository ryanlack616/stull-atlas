/**
 * About / Help Page
 * 
 * Explains what Stull Atlas is, how to use it, and credits.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'

export function AboutPage() {
  usePageTitle('About')
  return (
    <div className="about-page">
      <div className="about-content">
        
        <section className="about-hero">
          <h1>Stull Atlas</h1>
          <p className="subtitle">A Computational Ceramic Glaze Explorer — 114 years after Stull</p>
        </section>

        <section className="about-section">
          <h2>What is this?</h2>
          <p>
            Stull Atlas is a tool for ceramic artists and glaze chemists. It lets you explore thousands 
            of glaze recipes mapped onto a <strong>Stull chart</strong> — the standard coordinate system 
            for understanding glaze chemistry through Unity Molecular Formula (UMF).
          </p>
          <p>
            In 1912, Ray T. Stull published a paper mapping the relationship between silica (SiO₂) and 
            alumina (Al₂O₃) in ceramic glazes. His chart revealed that glaze surface quality — matte, 
            satin, or glossy — could be predicted by the ratio of these two oxides. Over a century later, 
            this framework remains the foundation of glaze chemistry.
          </p>

          <figure className="original-chart">
            <img 
              src="/stull/stull-original-1912.jpg" 
              alt="Original Stull Chart from 1912 — Chart 1 from Transactions of the American Ceramic Society, Vol. XIV, showing the relationship between molecules of SiO₂ (x-axis) and Al₂O₃ (y-axis) with labeled regions for Unfused, Mattes, Semi-Matte, Bright Gloss, and Devitrified zones"
              loading="lazy"
            />
            <figcaption>
              The original Stull chart — Chart 1 from <em>Transactions of the American Ceramic Society</em>, Vol. XIV (1912). 
              Stull mapped test glazes by their SiO₂:Al₂O₃ molar ratio and identified the regions that predict surface quality.
            </figcaption>
          </figure>

          <p>
            This tool takes Stull's insight and applies it to a modern dataset of real-world glazes, 
            giving you an interactive map of the glaze chemistry landscape.
          </p>
        </section>

        <section className="about-section">
          <h2>The Dataset</h2>
          <p>
            The primary dataset comes from <a href="https://glazy.org" target="_blank" rel="noopener noreferrer">Glazy</a>, 
            an open-source glaze recipe database maintained by Derek Philip Au. It contains thousands of 
            community-contributed recipes with calculated UMF values, cone temperatures, surface types, 
            and firing atmospheres.
          </p>
          <p>
            Each point on the chart represents a real glaze recipe that someone has mixed, fired, and documented.
          </p>
        </section>

        <section className="about-section">
          <h2>How to Use</h2>
          
          <div className="feature-list">
            <div className="feature">
              <h3>🗺 <Link to="/">Explorer</Link></h3>
              <p>
                The main Stull chart. Each dot is a glaze recipe plotted by its SiO₂ (x-axis) and Al₂O₃ 
                (y-axis) values. The chart shows Stull's empirical regions:
              </p>
              <ul>
                <li><strong>Bright Gloss</strong> — Low alumina relative to silica. Smooth, reflective surfaces.</li>
                <li><strong>Matte</strong> — Higher alumina. Soft, non-reflective surfaces.</li>
                <li><strong>Semi-Matte</strong> — The transition zone between matte and gloss.</li>
                <li><strong>Crazed</strong> — Too little silica. The glaze contracts more than the clay body, creating cracks.</li>
                <li><strong>Underfired</strong> — Not enough flux to fully melt at temperature.</li>
                <li><strong>Unfused</strong> — Extreme alumina. Won't melt into a glaze.</li>
              </ul>
              <p>
                <strong>Click any point</strong> to see the full recipe, UMF breakdown, firing info, and 
                similar glazes ranked by oxide-distance.
              </p>
              <p>
                <strong>Compare mode</strong> — select up to 3 glazes for side-by-side UMF comparison.
                See differences in flux balance, Si:Al ratio, and recipe ingredients at a glance.
              </p>
              <p>
                <strong>Color by</strong> cone temperature, surface type, source, flux ratio (R₂O:RO), 
                boron content, or data confidence.
              </p>
              <p>
                <strong>3D mode</strong> adds a Z-axis — choose any oxide, cone, flux ratio, or Si:Al 
                ratio to see the data in three dimensions.
              </p>
              <p>
                <strong>Analysis tab</strong> in the sidebar provides clustering (DBSCAN), density heatmap, 
                and void detection — find gaps in the explored chemistry space.
              </p>
            </div>

            <div className="feature">
              <h3>🧮 <Link to="/calc">Calculators</Link></h3>
              <p>Tools for computing and exploring glaze recipes:</p>
              <ul>
                <li><strong>UMF Calculator</strong> — Enter a recipe by weight, get the Unity Molecular Formula.</li>
                <li><strong>Line Blend</strong> — Interpolate between two recipes across N steps.</li>
                <li><strong>Triaxial Blend</strong> — Three-corner blend with configurable divisions.</li>
                <li><strong>Biaxial Blend</strong> — Two-axis grid blend (4 corners).</li>
                <li><strong>Quadaxial Blend</strong> — Four-material blend.</li>
                <li><strong>Radial Blend</strong> — Circular blend pattern around a center point.</li>
                <li><strong>Space-Filling</strong> — Algorithmic blend exploration using space-filling curves.</li>
              </ul>
              <p>
                All blend calculators export CSV for your studio notebook and can overlay results 
                on the Stull chart.
              </p>
            </div>

            <div className="feature">
              <h3>🧱 <Link to="/materials">Materials</Link></h3>
              <p>
                Browse the raw materials database (sourced from Digitalfire). Search by name or category, 
                see the oxide analysis for each material. This is the data that drives the UMF calculations — 
                knowing what's in your materials is how you know what's in your glaze.
              </p>
            </div>

            <div className="feature">
              <h3>📦 <Link to="/import-export">Import / Export</Link></h3>
              <p>
                Import your own glaze recipes (JSON or CSV) and export saved recipes. Bring your 
                studio notebook into the atlas, or take data out for further analysis.
              </p>
            </div>

            <div className="feature">
              <h3>📖 <Link to="/guide">Guide</Link></h3>
              <p>
                In-depth documentation covering every feature, from reading the Stull chart to 
                setting up blend tests. Includes workflow examples, a glossary of ceramic 
                chemistry terms, and tips for getting the most out of each tool.
              </p>
            </div>
          </div>

          <h3 style={{ marginTop: 24 }}>Interface Features</h3>
          <ul>
            <li>
              <strong>Light / dark mode</strong> — Toggle with the ☀/🌙 button in the header. 
              Your preference is saved between sessions.
            </li>
            <li>
              <strong>Print support</strong> — Press Ctrl+P (Cmd+P on Mac) on any page for a 
              clean, paper-friendly layout with light colors and hidden UI controls.
            </li>
            <li>
              <strong>Keyboard accessible</strong> — Full keyboard navigation with visible focus 
              indicators, screen-reader labels, and skip-to-content link.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Understanding UMF</h2>
          <p>
            <strong>Unity Molecular Formula</strong> expresses a glaze recipe not as weights of raw 
            materials, but as molar ratios of the oxides those materials contribute. The "unity" 
            part means the flux oxides (R₂O + RO) are normalized to sum to 1.0.
          </p>
          <p>This gives you three groups of oxides:</p>
          <table className="umf-table">
            <thead>
              <tr><th>Group</th><th>Role</th><th>Common Oxides</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Fluxes</strong></td>
                <td>Melt the glass. Sum = 1.0</td>
                <td>Na₂O, K₂O, CaO, MgO, ZnO, BaO, Li₂O</td>
              </tr>
              <tr>
                <td><strong>Stabilizers</strong></td>
                <td>Control viscosity and surface</td>
                <td>Al₂O₃, B₂O₃</td>
              </tr>
              <tr>
                <td><strong>Glass Formers</strong></td>
                <td>Build the glass network</td>
                <td>SiO₂</td>
              </tr>
            </tbody>
          </table>
          <p>
            The Stull chart plots SiO₂ against Al₂O₃ because those two ratios most strongly 
            determine surface quality. But the flux choices (which fluxes, in what ratios) control 
            melting temperature, thermal expansion, color response, and durability.
          </p>
        </section>

        <section className="about-section">
          <h2>Stull Regions</h2>
          <p>
            The colored regions on the chart are empirical boundaries — not hard lines, but zones 
            where glazes tend to behave a certain way. Real glazes don't always obey the chart: 
            boron and lithium can push a glaze to melt where alumina alone would predict matte. 
            Firing temperature matters. Kiln atmosphere matters. The clay body matters.
          </p>
          <p>
            Use the regions as a map, not a law. The chart tells you where to look, not what you'll find 
            when you open the kiln.
          </p>
        </section>

        <section className="about-section">
          <h2>Temperature Contours</h2>
          <p>
            The faint contour lines on the chart show approximate temperature zones (1240°C–1280°C) 
            based on empirical data collected by Derek Philip Au. These indicate where glazes at a 
            given UMF position tend to mature. They're guides, not guarantees — your kiln, your 
            firing schedule, and your materials will shift these boundaries.
          </p>
        </section>

        <section className="about-section">
          <h2>Credits & Sources</h2>
          <ul className="credits-list">
            <li>
              <strong>Ray T. Stull</strong> (1912) — Original SiO₂/Al₂O₃ diagram and zone classifications
            </li>
            <li>
              <strong><a href="https://glazy.org" target="_blank" rel="noopener noreferrer">Glazy</a></strong> (Derek Philip Au) — 
              Open glaze recipe database and processed UMF data
            </li>
            <li>
              <strong><a href="https://github.com/derekphilipau/ceramic-chemistry-visualization" target="_blank" rel="noopener noreferrer">ceramic-chemistry-visualization</a></strong> — 
              Temperature contour data and Stull region geometry (GPL-3.0)
            </li>
            <li>
              <strong><a href="https://digitalfire.com" target="_blank" rel="noopener noreferrer">Digitalfire</a></strong> — 
              Materials analysis database
            </li>
          </ul>
        </section>

        <section className="about-section about-footer">
          <p>
            Built by Ryan Lack at <a href="https://myclaycorner.com" target="_blank" rel="noopener noreferrer">My Clay Corner Studio</a> — 
            Howell, Michigan.
          </p>
          <p className="version">v0.2.0</p>
        </section>

      </div>

      <style>{`
        .about-page {
          flex: 1;
          overflow-y: auto;
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 40px 20px;
        }

        .about-content {
          max-width: 720px;
          margin: 0 auto;
        }

        .about-hero {
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-primary);
        }

        .about-hero h1 {
          font-size: 32px;
          margin: 0 0 8px;
          font-weight: 700;
        }

        .about-hero .subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
          font-style: italic;
        }

        .about-section {
          margin-bottom: 36px;
        }

        .original-chart {
          margin: 20px 0 24px;
          padding: 0;
          text-align: center;
        }

        .original-chart img {
          max-width: 100%;
          width: 520px;
          border-radius: 8px;
          border: 1px solid var(--border-primary);
          background: #f5f5f0;
        }

        .original-chart figcaption {
          margin-top: 10px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-muted);
          font-style: italic;
        }

        .about-section h2 {
          font-size: 20px;
          margin: 0 0 12px;
          color: var(--text-primary);
          font-weight: 600;
        }

        .about-section p {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-body);
          margin: 0 0 12px;
        }

        .about-section a {
          color: var(--text-link);
          text-decoration: none;
        }

        .about-section a:hover {
          text-decoration: underline;
        }

        .about-section ul {
          padding-left: 20px;
          margin: 0 0 12px;
        }

        .about-section li {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-body);
          margin-bottom: 4px;
        }

        .about-section strong {
          color: var(--text-primary);
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feature {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 20px;
        }

        .feature h3 {
          margin: 0 0 10px;
          font-size: 16px;
        }

        .feature h3 a {
          color: var(--text-link);
          text-decoration: none;
        }

        .feature h3 a:hover {
          text-decoration: underline;
        }

        .feature p, .feature li {
          font-size: 14px;
          line-height: 1.6;
        }

        .umf-table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
          font-size: 14px;
        }

        .umf-table th, .umf-table td {
          padding: 8px 12px;
          text-align: left;
          border-bottom: 1px solid var(--border-subtle);
        }

        .umf-table th {
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .umf-table td {
          color: var(--text-body);
        }

        .credits-list {
          list-style: none;
          padding: 0;
        }

        .credits-list li {
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .about-footer {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid var(--border-primary);
        }

        .about-footer .version {
          font-size: 12px;
          color: var(--text-dim);
        }
      `}</style>
    </div>
  )
}

export default AboutPage
