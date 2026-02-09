/**
 * Variability Help Page
 * 
 * Explains why glaze results vary — builds trust by being transparent
 * about the epistemic limits of computational glaze chemistry.
 * URL: /#/help/variability
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks'

export function VariabilityPage() {
  usePageTitle('Understanding Variability')
  return (
    <div className="variability-page">
      <div className="variability-content">

        <section className="variability-hero">
          <h1>Understanding Glaze Variability</h1>
          <p className="variability-subtitle">
            Why your results may differ from the numbers — and why that's not a bug.
          </p>
        </section>

        <section className="variability-section">
          <h2>The Promise and Limits of UMF</h2>
          <p>
            Unity Molecular Formula gives us a common language for comparing glazes — SiO₂ to Al₂O₃ 
            ratios, flux proportions, and more. Stull Atlas uses UMF to map thousands of recipes onto
            a shared coordinate system. This is powerful.
          </p>
          <p>
            But UMF describes <em>what's in the bucket</em>, not <em>what happens in the kiln</em>.
            Two recipes with identical UMF can behave differently because of factors that chemistry
            alone doesn't capture:
          </p>
        </section>

        <section className="variability-section">
          <h2>Sources of Variability</h2>

          <div className="factor-list">
            <div className="factor">
              <h3>Raw Material Variation</h3>
              <p>
                Feldspars, clays, and frits vary by supplier, batch, and even bag. The chemical analyses
                in our materials database represent typical compositions — your EPK may not be identical
                to the EPK in the analysis.
              </p>
            </div>

            <div className="factor">
              <h3>Firing Temperature & Schedule</h3>
              <p>
                A cone number is a heat-work measurement, not a temperature. Your kiln's ramp rate,
                peak hold time, cooling rate, and atmosphere all affect the final result dramatically.
                A glaze that's glossy in one kiln may be matte in another at the "same" cone.
              </p>
            </div>

            <div className="factor">
              <h3>Application Method</h3>
              <p>
                Thickness matters enormously. Dipping, spraying, and brushing produce different thicknesses.
                Too thick and a glaze may crawl or run; too thin and it may be underfired. Most recipes
                assume a specific gravity around 1.45-1.50 for dipping.
              </p>
            </div>

            <div className="factor">
              <h3>Clay Body Interaction</h3>
              <p>
                The clay body contributes flux and silica to the glaze melt. A glaze that's stable on 
                porcelain may crawl on stoneware. Iron-bearing clays affect color development significantly.
              </p>
            </div>

            <div className="factor">
              <h3>Kiln Atmosphere</h3>
              <p>
                Oxidation vs. reduction changes everything — especially iron, copper, and cerium responses.
                Most recipes in the database are marked with their atmosphere, but results in your kiln 
                will depend on your specific reduction schedule.
              </p>
            </div>

            <div className="factor">
              <h3>Particle Size & Mixing</h3>
              <p>
                How finely you grind your materials, how long you mix, and whether you sieve all affect 
                the melt behavior. Ball milling for 20 minutes vs. 2 hours can change a glaze's surface 
                quality at the same chemistry.
              </p>
            </div>
          </div>
        </section>

        <section className="variability-section">
          <h2>What Does This Mean for You?</h2>
          <p>
            Stull Atlas is a <strong>navigation tool</strong>, not a guarantee. Think of it like a 
            weather forecast: the data is real, the models are sound, but your local conditions matter.
          </p>
          <ul className="takeaway-list">
            <li>
              <strong>Use UMF as a starting point.</strong> If a recipe looks interesting on the chart, 
              mix a small test batch first.
            </li>
            <li>
              <strong>Compare, don't copy.</strong> Position on the Stull chart tells you about general 
              behavior — matte, glossy, over-fluxed. The specific result depends on your kiln and materials.
            </li>
            <li>
              <strong>Trust trends over absolutes.</strong> "More SiO₂ → more glossy" is reliable.
              "3.5 SiO₂ → exactly satin" is not.
            </li>
            <li>
              <strong>Keep notes.</strong> Your kiln, your materials, your process — over time, you'll 
              build a mental offset that makes the chart predictions increasingly useful.
            </li>
          </ul>
        </section>

        <section className="variability-section">
          <h2>How We Handle Uncertainty</h2>
          <p>
            Stull Atlas takes several steps to be transparent about uncertainty:
          </p>
          <ul className="takeaway-list">
            <li>
              <strong>Limit warnings</strong> flag recipes near known problem thresholds (crazing, 
              leaching, running). These aren't pass/fail — they're flags for "test this carefully."
            </li>
            <li>
              <strong>Data source labels</strong> show where each recipe comes from. Community submissions
              have more variability than lab-tested recipes.
            </li>
            <li>
              <strong>Confidence regions</strong> in the optimizer and suggestion engine show ranges, 
              not point predictions. The wider the range, the less certain we are.
            </li>
          </ul>
        </section>

        <section className="variability-section">
          <h2>Reading the Stull Chart</h2>
          <p>
            The Stull diagram maps glazes by their SiO₂ (silica) and Al₂O₃ (alumina) content
            in Unity Molecular Formula. R.T. Stull published the original version in 1912
            by systematically testing hundreds of glaze compositions at cone 11.
          </p>
          <div className="factor-list">
            <div className="factor">
              <h3>X-Axis: SiO₂ (Silica)</h3>
              <p>
                The glass former. Higher silica = higher viscosity melt, better chemical durability,
                higher thermal expansion (if too high → crazing). Typical range: 1.5–5.5 mol depending on cone.
              </p>
            </div>
            <div className="factor">
              <h3>Y-Axis: Al₂O₃ (Alumina)</h3>
              <p>
                The stabilizer. Alumina stiffens the melt, prevents running, and promotes matte surfaces
                at lower ratios. Too little → glaze runs off the pot. Too much → dry, rough surface.
              </p>
            </div>
            <div className="factor">
              <h3>The Si:Al Ratio</h3>
              <p>
                The ratio of SiO₂ to Al₂O₃ is the single most useful predictor of surface quality.
                Below ~5:1 → matte. Between 5–8:1 → satin. Above 8:1 → gloss. Above 12:1 → typically
                underfired or excessively glassy. This ratio holds across a wide range of temperatures.
              </p>
            </div>
            <div className="factor">
              <h3>Stull Regions</h3>
              <p>
                The chart displays empirical boundaries: unfused, matte, semi-matte, bright gloss,
                underfired, and crazed zones. These come from Stull's original research and subsequent
                verification by ceramic researchers. They represent tendencies, not absolutes.
              </p>
            </div>
          </div>
        </section>

        <section className="variability-section">
          <h2>Understanding UMF (Unity Molecular Formula)</h2>
          <p>
            UMF normalizes all flux oxides (R₂O + RO) to sum to 1.0, then expresses every other
            oxide relative to that. This lets you compare glazes regardless of batch size,
            and makes the relationship between chemistry and behavior visible.
          </p>
          <div className="factor-list">
            <div className="factor">
              <h3>Fluxes: R₂O (Alkalis) + RO (Alkaline Earths)</h3>
              <p>
                <strong>R₂O:</strong> Na₂O, K₂O, Li₂O — powerful low-temp fluxes, expand the glass.
                Too much → crazing, solubility.<br/>
                <strong>RO:</strong> CaO, MgO, ZnO, BaO, SrO — higher-temp fluxes, generally more stable.
                CaO is the workhorse flux in most high-fire glazes.<br/>
                The R₂O:RO ratio affects everything from color response to thermal expansion.
              </p>
            </div>
            <div className="factor">
              <h3>Stabilizers: R₂O₃</h3>
              <p>
                Al₂O₃ (from kaolin/clay) and B₂O₃ (from frits/colemanite). Alumina stiffens;
                boron lowers melting temperature and adds gloss. B₂O₃ is crucial for cone 6 and below.
              </p>
            </div>
            <div className="factor">
              <h3>Glass Formers: RO₂</h3>
              <p>
                SiO₂ (from silica, feldspar, clay). The backbone of the glass network.
                TiO₂, ZrO₂ are secondary — ZrO₂ opacifies, TiO₂ promotes crystallization.
              </p>
            </div>
          </div>
        </section>

        <section className="variability-section">
          <h2>Glossary</h2>
          <div className="factor-list">
            <div className="factor">
              <h3>Cone</h3>
              <p>
                A measure of heat-work, not temperature. Pyrometric cones bend at specific 
                combinations of time and temperature. Cone 6 ≈ 1222°C (2232°F) at standard ramp rate.
                Faster firing = higher temperature needed for same cone.
              </p>
            </div>
            <div className="factor">
              <h3>Crazing</h3>
              <p>
                A network of fine cracks in the glaze surface caused by the glaze contracting more than 
                the clay body during cooling. Usually from too much alkali flux (Na₂O + K₂O) relative to 
                silica. The glaze is under tension.
              </p>
            </div>
            <div className="factor">
              <h3>Crawling</h3>
              <p>
                The glaze beads up and pulls away from the clay surface during firing, leaving bare spots. 
                Causes: high surface tension, dusty bisque, too-thick application, high-alumina recipes 
                without enough flux.
              </p>
            </div>
            <div className="factor">
              <h3>Running</h3>
              <p>
                The glaze flows down the pot during firing. Causes: too much flux, too little alumina, 
                over-firing. Sometimes desirable (ash glazes, crystalline glazes) but usually a problem.
              </p>
            </div>
            <div className="factor">
              <h3>LOI (Loss on Ignition)</h3>
              <p>
                The weight percentage a material loses during firing — water, carbonates, organics.
                Whiting (CaCO₃) has ~44% LOI. Materials with high LOI can cause pinholes if the 
                glaze seals before gases escape.
              </p>
            </div>
            <div className="factor">
              <h3>Specific Gravity</h3>
              <p>
                The density of a glaze slurry measured with a hydrometer. Typical dipping gravity: 
                1.45–1.50. Too thick → crawling, running. Too thin → underfired appearance.
              </p>
            </div>
          </div>
        </section>

        <section className="variability-cta">
          <p>
            Questions? Reach us at{' '}
            <a href="mailto:contact@stullatlas.app">contact@stullatlas.app</a>.
          </p>
          <p>
            <Link to="/">Back to Explorer</Link>
            {' · '}
            <Link to="/guide">Read the Guide</Link>
            {' · '}
            <Link to="/about">About Stull Atlas</Link>
          </p>
        </section>
      </div>

      <style>{`
        .variability-page {
          flex: 1;
          overflow-y: auto;
          display: flex;
          justify-content: center;
        }

        .variability-content {
          max-width: 740px;
          width: 100%;
          padding: 48px 24px 60px;
        }

        .variability-hero {
          text-align: center;
          margin-bottom: 40px;
        }

        .variability-hero h1 {
          font-size: 30px;
          font-weight: 700;
          margin: 0 0 12px;
          color: var(--text-bright);
        }

        .variability-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
        }

        .variability-section {
          margin-bottom: 36px;
        }

        .variability-section h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 12px;
          color: var(--text-bright);
        }

        .variability-section p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 12px;
        }

        .factor-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }

        .factor {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          padding: 20px;
        }

        .factor h3 {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 8px;
          color: var(--text-label);
        }

        .factor p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .takeaway-list {
          padding-left: 20px;
          margin: 12px 0 0;
        }

        .takeaway-list li {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .takeaway-list strong {
          color: var(--text-label);
        }

        .variability-cta {
          text-align: center;
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid var(--border-primary);
        }

        .variability-cta p {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 8px;
        }

        .variability-cta a {
          color: var(--text-link);
          text-decoration: none;
        }

        .variability-cta a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
