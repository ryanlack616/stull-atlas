/**
 * Henry's Page — Comprehensive Feature Reference
 * 
 * A deep-dive document for Henry Crissman (Ceramics School, Hamtramck)
 * to evaluate Stull Atlas in full. Everything the program does, how it works,
 * and what questions we need answered.
 * 
 * URL: /#/henry
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks'

/* ── Table of Contents ──────────────────────────────────────── */

const SECTIONS = [
  { id: 'letter',          label: 'For Henry' },
  { id: 'what-it-is',      label: 'What It Is' },
  { id: 'stull-chart',     label: 'The Stull Chart' },
  { id: 'explorer',        label: 'Explorer' },
  { id: 'umf-calc',        label: 'UMF Calculator' },
  { id: 'blend-calcs',     label: 'Blend Calculators' },
  { id: 'optimizer',       label: 'Optimizer' },
  { id: 'suggestion',      label: 'Suggestion Engine' },
  { id: 'materials',       label: 'Materials Database' },
  { id: 'substitution',    label: 'Material Substitution' },
  { id: 'analysis',        label: 'Analysis Tools' },
  { id: 'similarity',      label: 'Similarity Search' },
  { id: 'comparison',      label: 'Comparison Mode' },
  { id: 'digitalfire',     label: 'Digitalfire Integration' },
  { id: 'validation',      label: 'Cone Validation' },
  { id: 'import-export',   label: 'Import / Export' },
  { id: 'epistemic',       label: 'Epistemic Tracking' },
  { id: 'wiggle',          label: 'The Wiggle Test' },
  { id: 'oxides',          label: 'Oxide Coverage' },
  { id: 'archetypes',      label: 'Glaze Archetypes' },
  { id: 'firing',          label: 'Firing Schedules' },
  { id: 'three-d',         label: '3D Explorer' },
  { id: 'timeline',        label: 'Historical Timeline' },
  { id: 'pricing',         label: 'Pricing & Access' },
  { id: 'philosophy',      label: 'Philosophy' },
  { id: 'roadmap',         label: 'Roadmap' },
  { id: 'dataset',         label: 'The Dataset' },
  { id: 'credits',         label: 'Credits & Sources' },
  { id: 'questions',       label: 'Questions for You' },
] as const

export function HenryPage() {
  usePageTitle('For Henry — Stull Atlas')
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }

  // Track scroll position to highlight current section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="henry-page">
      {/* Sidebar TOC */}
      <aside className="henry-toc">
        <h3 className="toc-title">Contents</h3>
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`toc-link ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => scrollTo(s.id)}
          >
            {s.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="henry-content">

        {/* ━━━━━━━━━━━━ LETTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="letter" className="henry-section henry-hero">
          <h1>Henry —</h1>
          <p className="henry-lead">
            You told me to make it useful. That's the rule now.
            It's in the README, non-negotiable, first line above everything else:
          </p>
          <blockquote className="henry-principle">
            If it's not useful to a working potter, it doesn't ship.
          </blockquote>
          <p>
            This page is everything Stull Atlas does right now — v3.5.0, 269 tests passing, 
            ~9,000 glazes. Read it at your pace. Click through the links to try things live. 
            When you're done, there are questions at the bottom. Your answers become the roadmap.
          </p>
          <p style={{ marginTop: 24, color: 'var(--text-tertiary)' }}>
            — Ryan
          </p>
        </section>

        {/* ━━━━━━━━━━━━ WHAT IT IS ━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="what-it-is" className="henry-section">
          <h2>What It Is</h2>
          <p>
            Stull Atlas is a computational glaze chemistry explorer. It takes ~9,000 real glaze 
            recipes from <a href="https://glazy.org" target="_blank" rel="noopener noreferrer">Glazy</a> and 
            maps them onto a <strong>Stull chart</strong> — the coordinate system that predicts glaze 
            surface quality from the ratio of silica to alumina in Unity Molecular Formula.
          </p>
          <p>
            Every dot on the chart is a real recipe that someone mixed, fired, and documented. 
            The clusters, voids, and gradients in the data encode over a century of accumulated 
            potter knowledge about what works and what doesn't.
          </p>
          <p>
            It's built by one person (me) in Howell, Michigan. React + TypeScript. 
            The math is deterministic — same inputs always give same outputs. 
            Nothing is hidden, rounded silently, or guessed at.
          </p>
          <div className="henry-callout">
            <strong>Try it:</strong> Open the <Link to="/">Explorer</Link> right now. 
            Hover any dot. Click it. That's the core experience — everything else builds from there.
          </div>
        </section>

        {/* ━━━━━━━━━━━━ THE STULL CHART ━━━━━━━━━━━━━━━━━━━ */}
        <section id="stull-chart" className="henry-section">
          <h2>The Stull Chart</h2>
          <p>
            In 1912, Ray T. Stull published a paper in the <em>Transactions of the American 
            Ceramic Society</em> mapping the relationship between SiO₂ and Al₂O₃ in ceramic glazes. 
            He identified empirical zones that predict surface quality:
          </p>
          <div className="henry-table-wrap">
            <table>
              <thead><tr><th>Zone</th><th>What It Means</th></tr></thead>
              <tbody>
                <tr><td><strong>Bright Gloss</strong></td><td>Low alumina relative to silica. Smooth, reflective, well-developed glass.</td></tr>
                <tr><td><strong>Semi-Matte</strong></td><td>Transition zone. Soft sheen, not mirror-glossy.</td></tr>
                <tr><td><strong>Matte</strong></td><td>Higher alumina. Buttery, velvet, non-reflective surfaces.</td></tr>
                <tr><td><strong>Crazed</strong></td><td>Too little silica. Thermal expansion mismatch — the glaze cracks.</td></tr>
                <tr><td><strong>Underfired</strong></td><td>Not enough flux to fully melt at temperature.</td></tr>
                <tr><td><strong>Unfused</strong></td><td>Extreme alumina. Won't melt into a glaze at all.</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Stull did this with ~50 glazes at one cone. We now have 9,000+ at every cone 
            from 06 to 12, every atmosphere, every surface type. The chart still works — 
            and at scale, it reveals structure Stull couldn't see.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ EXPLORER ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="explorer" className="henry-section">
          <h2>Explorer</h2>
          <p>The main interface. A WebGL scatter plot of every glaze in the dataset.</p>
          
          <h3>What You Can Do</h3>
          <ul>
            <li><strong>Hover</strong> any dot — tooltip shows name, cone, surface, SiO₂, Al₂O₃</li>
            <li><strong>Click</strong> a dot — full detail panel opens: complete recipe with material percentages, full UMF oxide breakdown, firing info, source link</li>
            <li><strong>Box-select</strong> to zoom into a region; double-click to reset</li>
            <li><strong>Color by</strong> — switch the dot coloring: cone temperature, surface type (gloss/satin/matte), source, flux ratio (R₂O:RO), boron content, or data confidence</li>
            <li><strong>Filter</strong> by cone, atmosphere, surface type, oxide ranges</li>
            <li><strong>Search</strong> — Ctrl+K opens OmniSearch. Type a name, oxide, cone, material, atmosphere. It finds matches across everything.</li>
          </ul>

          <h3>What the Density Tells You</h3>
          <p>
            Where dots cluster = chemistry that potters keep coming back to. Where there are 
            voids = combinations that don't work, or that nobody's tried. The chart isn't just 
            a plot — it's a map of collective experience.
          </p>

          <div className="henry-callout">
            <strong>Try it:</strong> <Link to="/">Open Explorer</Link> → color by "Surface Type" → 
            see how matte/satin/gloss separate into Stull's predicted zones. That's 1912 confirmed 
            by 9,000 recipes.
          </div>
        </section>

        {/* ━━━━━━━━━━━━ UMF CALCULATOR ━━━━━━━━━━━━━━━━━━━━ */}
        <section id="umf-calc" className="henry-section">
          <h2>UMF Calculator</h2>
          <p>
            Enter a recipe — materials and percentages — and it calculates the Unity Molecular Formula. 
            27 oxides. IUPAC 2023 molar weights. Every step shown.
          </p>

          <h3>How It Works</h3>
          <ol>
            <li><strong>Resolve materials</strong> — fuzzy name matching against the database (56+ materials). If your name is close, it finds it. If it can't, it tells you.</li>
            <li><strong>Calculate moles</strong> — grams × (weight% / 100) ÷ molecular weight, per oxide</li>
            <li><strong>Sum flux moles</strong> — all R₂O (alkalis) + all RO (alkaline earths)</li>
            <li><strong>Normalize to unity</strong> — divide everything by the flux sum. That's UMF.</li>
            <li><strong>Derive ratios</strong> — SiO₂:Al₂O₃, R₂O:RO, surface prediction</li>
          </ol>

          <h3>What You See</h3>
          <ul>
            <li>Full UMF oxide table with values</li>
            <li>Predicted surface quality (matte / satin / gloss) from SiO₂:Al₂O₃ ratio</li>
            <li>SiO₂:Al₂O₃ and R₂O:RO ratios</li>
            <li>Limit warnings — flags high thermal expansion, low alumina, unusual flux balance</li>
            <li>Your recipe plotted on the Stull chart as a highlighted point</li>
            <li>Cone validation — is this recipe in range for your target temperature?</li>
          </ul>

          <h3>What-If Panel</h3>
          <p>
            Sliders for every oxide. Drag one — watch the predicted surface change in real time, 
            see the Stull chart position shift, get live cone-limit warnings. 
            "What happens if I push the alumina up 0.05?" — now you know before you mix.
          </p>

          <h3>Preset Recipes</h3>
          <p>10 classic glazes loaded and ready to explore:</p>
          <div className="henry-table-wrap">
            <table>
              <thead><tr><th>Recipe</th><th>Cone</th><th>Type</th></tr></thead>
              <tbody>
                <tr><td>Leach 4321</td><td>10</td><td>The classic 40/30/20/10</td></tr>
                <tr><td>Tenmoku</td><td>10</td><td>Iron saturate, hare's fur</td></tr>
                <tr><td>Carbon Trap Shino</td><td>10</td><td>High soda, crawling carbon</td></tr>
                <tr><td>Celadon</td><td>10</td><td>Jade-green iron in reduction</td></tr>
                <tr><td>Wood Ash Glaze</td><td>10</td><td>50% ash base</td></tr>
                <tr><td>Crystalline Base</td><td>10</td><td>Near-zero alumina, zinc</td></tr>
                <tr><td>Cone 6 Clear Base</td><td>6</td><td>Workhorse clear</td></tr>
                <tr><td>Cone 6 Matte Base</td><td>6</td><td>Dolomite/talc matte</td></tr>
                <tr><td>Floating Blue</td><td>6</td><td>Rutile blue, cone 6 icon</td></tr>
                <tr><td>Majolica</td><td>04</td><td>Tin-opacified low-fire</td></tr>
              </tbody>
            </table>
          </div>

          <div className="henry-callout">
            <strong>Try it:</strong> <Link to="/calc/umf">Open UMF Calculator</Link> → 
            pick "Leach 4321" from presets → see where it lands → drag the What-If sliders.
          </div>
        </section>

        {/* ━━━━━━━━━━━━ BLEND CALCULATORS ━━━━━━━━━━━━━━━━━ */}
        <section id="blend-calcs" className="henry-section">
          <h2>Blend Calculators</h2>
          <p>Seven types. All overlay results on the Stull chart. All export to CSV.</p>

          <h3>Line Blend</h3>
          <p>
            Two recipes, N steps between them. 100% Recipe A → 100% Recipe B. Classic line blend 
            test — see the path through chemistry space before you mix a single test tile.
          </p>

          <h3>Triaxial Blend</h3>
          <p>
            Three corner recipes on a triangular grid. The formula is C(n+2, 2) test points. 
            Every point has full UMF calculated. The classic triaxial test tile layout — 
            but you see the chemistry <em>before</em> you fire.
          </p>

          <h3>Quadaxial Blend</h3>
          <p>
            Four recipes in tetrahedral interpolation. C(n+3, 3) points. 
            For when three corners aren't enough.
          </p>

          <h3>Biaxial Blend</h3>
          <p>
            Rectangular grid. Base recipe + two independent addition axes. 
            Maps how surface transitions as you independently vary two things.
          </p>

          <h3>Radial Blend</h3>
          <p>
            Center recipe with spokes outward. Each direction adds or subtracts a material. 
            See the effect of pushing one ingredient in every direction from your starting point.
          </p>

          <h3>Space-Filling Design</h3>
          <p>
            Algorithmic exploration using Latin Hypercube, Sobol, or Halton sequences. 
            Maximize coverage of oxide space with minimal test tiles. For systematic, 
            low-discrepancy exploration of a material space.
          </p>

          <div className="henry-callout">
            <strong>Try it:</strong> <Link to="/calc/line-blend">Open Line Blend</Link> → 
            enter two recipes you know → see the interpolation path on the Stull chart.
          </div>
        </section>

        {/* ━━━━━━━━━━━━ OPTIMIZER ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="optimizer" className="henry-section">
          <h2>Recipe Optimizer</h2>
          <p>
            Give it a target UMF and your available materials. It finds recipes to get there.
          </p>

          <h3>Gradient Descent</h3>
          <p>
            Iterative optimization. Set target values for any oxide. Constrain materials 
            (min/max percentages, lock specific ingredients). It converges on the closest 
            achievable recipe. Up to 2000 iterations, shows convergence progress.
          </p>

          <h3>Genetic Algorithm</h3>
          <p>
            Population-based evolutionary search. 80 candidate recipes compete and evolve 
            over 200 generations. Returns the top 5 most diverse solutions — not just one 
            answer, but a range of approaches that all hit your targets. Useful when the 
            search space is complex or you want options.
          </p>

          <h3>Response Surface Analysis</h3>
          <p>After optimization, you get:</p>
          <ul>
            <li><strong>Sensitivity analysis</strong> — which materials have the biggest effect on each oxide</li>
            <li><strong>Stability score</strong> — fragile / moderate / stable / very stable. Is this recipe on a knife's edge or a plateau?</li>
            <li><strong>Steepest descent direction</strong> — if it didn't fully converge, which way to push</li>
          </ul>

          <div className="henry-callout">
            <strong>Try it:</strong> <Link to="/calc/optimizer">Open Optimizer</Link> → 
            set a target SiO₂ and Al₂O₃ → pick your materials → watch it converge.
          </div>
        </section>

        {/* ━━━━━━━━━━━━ SUGGESTION ENGINE ━━━━━━━━━━━━━━━━━ */}
        <section id="suggestion" className="henry-section">
          <h2>AI Suggestion Engine</h2>
          <p>
            Type what you want in plain English. It generates optimized recipes. 
            No neural networks — this is constraint optimization with NLP parsing.
          </p>

          <h3>What You Can Say</h3>
          <p>Things like:</p>
          <ul className="henry-examples">
            <li>"cone 6 celadon in oxidation"</li>
            <li>"matte white for cone 10 reduction"</li>
            <li>"something like floating blue"</li>
            <li>"tenmoku with hare's fur"</li>
            <li>"cone 04 majolica base"</li>
            <li>"crystalline glaze with big crystals"</li>
          </ul>

          <h3>How It Works</h3>
          <ol>
            <li><strong>Parse</strong> — extracts cone, atmosphere, surface, color, glaze type from your text</li>
            <li><strong>Match archetypes</strong> — 20+ built-in glaze archetypes with known UMF targets (see <a href="#archetypes">full list below</a>)</li>
            <li><strong>Select materials</strong> — picks appropriate materials for the firing range</li>
            <li><strong>Optimize</strong> — runs the optimizer to hit the archetype's UMF targets</li>
            <li><strong>Rank &amp; present</strong> — top suggestions with recipes, UMF analysis, colorant additions, firing schedule, safety warnings</li>
          </ol>

          <h3>What You Get Back</h3>
          <ul>
            <li>Full recipe with percentages</li>
            <li>Colorant additions with expected effects and ranges</li>
            <li>UMF analysis vs. targets — how close did it get?</li>
            <li>Relevance score (0–1)</li>
            <li>Firing schedule recommendation</li>
            <li>Material substitution options</li>
            <li>Safety warnings (atmosphere, food-safety, convergence)</li>
            <li>Digitalfire reference links</li>
          </ul>

          <div className="henry-callout">
            <strong>Try it:</strong> <Link to="/suggest">Open Suggestion Engine</Link> → 
            type something you'd actually want to make → see what comes out.
          </div>
        </section>

        {/* ━━━━━━━━━━━━ MATERIALS ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="materials" className="henry-section">
          <h2>Materials Database</h2>
          <p>
            56+ ceramic materials with full oxide analysis. Each material has: oxide composition 
            (weight %), formula weight, LOI, aliases, discontinued status.
          </p>
          <p>Categories:</p>
          <ul>
            <li><strong>Feldspars</strong> — Custer, G-200, Minspar, Nepheline Syenite, Cornwall Stone</li>
            <li><strong>Clays</strong> — EPK, Grolleg, Tile 6, Helmer, Calcined Kaolin, OM-4, Old Hickory, XX Sagger</li>
            <li><strong>Silica</strong> — Flint, Fine Silica</li>
            <li><strong>Calcium sources</strong> — Whiting, Wollastonite, Dolomite</li>
            <li><strong>Magnesium sources</strong> — Talc, Dolomite, Mag Carb</li>
            <li><strong>Frits</strong> — 3110, 3124, 3134, 3195, 3249</li>
            <li><strong>Colorants</strong> — Red Iron Oxide, Cobalt Carb/Oxide, Copper Carb, Manganese Dioxide, Chrome Oxide, Rutile, Tin Oxide, Zircopax, Titanium Dioxide</li>
            <li><strong>Other</strong> — Bone Ash, Gerstley Borate, Lithium Carbonate, Spodumene, Petalite, Strontium Carbonate, Barium Carbonate, Zinc Oxide</li>
          </ul>
          <p>
            Source: Digitalfire analysis data. All materials link back to Tony Hansen's reference library.
          </p>

          <div className="henry-callout">
            <strong>Try it:</strong> <Link to="/materials">Open Materials Browser</Link> → 
            search for any material you use → see its full oxide breakdown.
          </div>
        </section>

        {/* ━━━━━━━━━━━━ SUBSTITUTION ━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="substitution" className="henry-section">
          <h2>Material Substitution</h2>
          <p>
            14 substitution groups with adjustment ratios. When your supplier changes, 
            a material gets discontinued, or you just run out:
          </p>
          <div className="henry-table-wrap">
            <table>
              <thead><tr><th>Group</th><th>Materials</th><th>Notes</th></tr></thead>
              <tbody>
                <tr><td>Potash Feldspars</td><td>Custer, G-200, Minspar, etc.</td><td>Generally 1:1</td></tr>
                <tr><td>Soda Feldspars</td><td>Nepheline Syenite, F-4</td><td>Watch Na₂O shift</td></tr>
                <tr><td>Kaolins</td><td>EPK, Grolleg, Tile 6, Helmer, Calcined</td><td>Plasticity varies</td></tr>
                <tr><td>Ball Clays</td><td>OM-4, Old Hickory, XX Sagger</td><td>Similar chemistry, different working</td></tr>
                <tr><td>Calcium Sources</td><td>Whiting → Wollastonite (×1.4), Dolomite</td><td>Ratio adjustments shown</td></tr>
                <tr><td>Magnesium Sources</td><td>Talc, Dolomite (×0.8), Mag Carb (×0.45)</td><td>Big ratio differences</td></tr>
                <tr><td>Boron Frits</td><td>3134, 3124, 3195</td><td>Alumina content varies</td></tr>
                <tr><td>Alumina Sources</td><td>Hydrate → Calcined (×0.65)</td><td>LOI difference</td></tr>
                <tr><td>Lithium Sources</td><td>Spodumene, Petalite (×1.3), Li₂CO₃ (×0.25)</td><td>Dramatic ratio shifts</td></tr>
                <tr><td>Ash</td><td>Hardwood, Softwood (×1.1), Synthetic</td><td>Variable by nature</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Each substitution includes a quality rating (1–3) and chemistry notes about 
            what will change.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ ANALYSIS TOOLS ━━━━━━━━━━━━━━━━━━━━ */}
        <section id="analysis" className="henry-section">
          <h2>Analysis Tools</h2>

          <h3>DBSCAN Clustering</h3>
          <p>
            Automatic discovery of glaze groups in oxide space. The algorithm finds 
            clusters — groups of glazes with similar chemistry — without you telling it 
            how many groups to look for. Each cluster gets a centroid, size, and 
            characteristic description. Click to zoom into any cluster.
          </p>

          <h3>Density Heatmap (KDE)</h3>
          <p>
            Kernel density estimation overlaid on the chart. Shows where recipes concentrate 
            — the "well-trodden" chemistry — versus unexplored territory. Dense regions are 
            reliably useful glazes. Sparse regions are either failures, unstable, or nobody's 
            tried them yet.
          </p>

          <h3>Void Detection</h3>
          <p>
            Grid-based detection of empty regions in the chart. These are the gaps — 
            chemistry that no one in the dataset has explored. Some voids are physically 
            impossible (too refractory, thermally unstable). Others are just unexplored. 
            The tool can't tell you which — but it shows you where they are.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ SIMILARITY ━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="similarity" className="henry-section">
          <h2>Similarity Search</h2>
          <p>
            Click any glaze, find others with similar chemistry. This isn't just "close on 
            the chart" — it's weighted Euclidean distance across all oxide dimensions:
          </p>
          <ul>
            <li><strong>SiO₂ / Al₂O₃</strong> — weighted heavily (surface-determining)</li>
            <li><strong>Fluxes</strong> — melting behavior, thermal expansion</li>
            <li><strong>Colorants</strong> — color matching</li>
            <li><strong>B₂O₃</strong> — boron behavior (separate because it acts as both glass-former and flux)</li>
          </ul>
          <p>
            Adjust the weights to prioritize what matters to you — surface match vs. color 
            match vs. melting behavior.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ COMPARISON ━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="comparison" className="henry-section">
          <h2>Comparison Mode</h2>
          <p>
            Select up to 3 glazes for side-by-side comparison. See differences in:
          </p>
          <ul>
            <li>Full UMF — every oxide lined up</li>
            <li>Fluxes, stabilizers, glass formers separated</li>
            <li>SiO₂:Al₂O₃ ratio</li>
            <li>R₂O:RO ratio (alkali vs. alkaline earth balance)</li>
            <li>Batch recipe ingredients</li>
          </ul>
          <p>
            Highest value per oxide is highlighted. Colored rings on the chart show 
            where each selected glaze sits. Useful for asking "what's actually different 
            between these two?" at the oxide level.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ DIGITALFIRE ━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="digitalfire" className="henry-section">
          <h2>Digitalfire Integration</h2>
          <p>
            Tony Hansen's Digitalfire Reference Library (~4,200 pages) is searchable from 
            inside the app. Look up any oxide by formula symbol, any material by name, 
            or search across the full library — glossary, troubleshooting, articles.
          </p>
          <p>
            The app also auto-suggests relevant Digitalfire references based on what you're 
            looking at — if a glaze has crawling issues, it surfaces Tony's troubleshooting 
            page for crawling. All results link back to digitalfire.com as the authoritative source.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ VALIDATION ━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="validation" className="henry-section">
          <h2>Cone Validation</h2>
          <p>
            Checks your recipe's UMF against established limit formulas for cones 06, 04, 6, 9, 10, and 11. 
            Validates: SiO₂, Al₂O₃, B₂O₃, KNaO (combined alkalis), CaO, MgO, ZnO, BaO.
          </p>
          <p>
            If your cone 6 recipe has Al₂O₃ at 0.55 and the accepted range is 0.25–0.45, 
            it tells you. If your SiO₂ is low enough to predict crazing, it tells you. 
            Supports interpolation between defined cones for intermediate values.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ IMPORT/EXPORT ━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="import-export" className="henry-section">
          <h2>Import / Export</h2>
          <div className="henry-table-wrap">
            <table>
              <thead><tr><th>Format</th><th>Direction</th><th>What</th></tr></thead>
              <tbody>
                <tr><td>JSON</td><td>Import &amp; Export</td><td>Full recipe data preservation</td></tr>
                <tr><td>Text</td><td>Export</td><td>Human-readable for email/forums</td></tr>
                <tr><td>Glazy CSV</td><td>Import</td><td>Direct upload with auto-detection</td></tr>
                <tr><td>Glazy URL</td><td>Import</td><td>Paste a Glazy search URL to filter</td></tr>
                <tr><td>Insight XML</td><td>Import</td><td>Auto-detects Digitalfire Insight format</td></tr>
                <tr><td>PNG / SVG</td><td>Export</td><td>Chart image export (2× retina)</td></tr>
                <tr><td>Print / PDF</td><td>Export</td><td>Clean print layouts via Ctrl+P</td></tr>
                <tr><td>CSV</td><td>Export</td><td>Blend sheets with UMF tables</td></tr>
                <tr><td>OBJ / STL</td><td>Export</td><td>3D surface data (Atlas 3D tier)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ EPISTEMIC ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="epistemic" className="henry-section">
          <h2>Epistemic State Tracking</h2>
          <p>
            Every value in the system carries a confidence tag. Nothing pretends to be more 
            certain than it is.
          </p>
          <div className="henry-table-wrap">
            <table>
              <thead><tr><th>State</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td><code>unknown</code></td><td>No data available</td></tr>
                <tr><td><code>assumed</code></td><td>Default or fallback was used — treat with caution</td></tr>
                <tr><td><code>inferred</code></td><td>Calculated from other data</td></tr>
                <tr><td><code>declared</code></td><td>User or source provided this explicitly</td></tr>
                <tr><td><code>verified</code></td><td>Cross-referenced or lab tested</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Why this matters: when you look at a glaze's UMF and the SiO₂ is 3.8, you should 
            know whether that's calculated from a lab-tested material analysis or from a generic 
            textbook average. The difference can be significant.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ WIGGLE TEST ━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="wiggle" className="henry-section">
          <h2>The Wiggle Test</h2>
          <p>
            Different sources disagree on material compositions. Digitalfire says Custer 
            Feldspar has one analysis. Another source says something slightly different. 
            Both are measuring real material — but feldspar is a rock, and rocks vary.
          </p>
          <p>
            The wiggle test lets you switch between these different material analysis datasets 
            and watch what happens to the chart. Recipes that <strong>hold their position</strong> 
            across datasets have chemistry you can trust. Recipes that <strong>jump around</strong> 
            are sensitive to material variation — their position on the chart is noise, not signal.
          </p>
          <p>
            This is one of the most important features for anyone trying to use UMF data 
            to make real decisions. The data has uncertainty. This tool makes that uncertainty visible.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ OXIDES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="oxides" className="henry-section">
          <h2>Oxide Coverage</h2>
          <p>27 oxides tracked. Classified by function:</p>

          <h3>Fluxes — R₂O (Alkalis)</h3>
          <p>Li₂O, Na₂O, K₂O</p>

          <h3>Fluxes — RO (Alkaline Earths)</h3>
          <p>MgO, CaO, SrO, BaO, ZnO, PbO</p>

          <h3>Stabilizers — R₂O₃</h3>
          <p>Al₂O₃, B₂O₃, Fe₂O₃</p>

          <h3>Glass Formers — RO₂</h3>
          <p>SiO₂, TiO₂, ZrO₂, SnO₂</p>

          <h3>Colorants &amp; Miscellaneous</h3>
          <p>MnO, MnO₂, NiO, CuO, Cu₂O, CoO, Cr₂O₃, P₂O₅, F</p>

          <p>
            Molecular weights: IUPAC 2023 Standard Atomic Weights with 2024 revisions 
            for Gd, Lu, Zr. Dynamic system — weights can be swapped at runtime for 
            historical comparison.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ ARCHETYPES ━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="archetypes" className="henry-section">
          <h2>Glaze Archetypes (Suggestion Engine Knowledge Base)</h2>
          <p>
            The suggestion engine knows 20+ glaze archetypes. Each one has UMF targets, 
            cone range, atmosphere, expected surface, key materials, colorant additions 
            with ranges, and notes. This is the "brain" behind plain-English suggestions:
          </p>
          <div className="henry-table-wrap">
            <table>
              <thead><tr><th>#</th><th>Archetype</th><th>Cone</th><th>Key Chemistry</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Celadon (Cone 10 Reduction)</td><td>10</td><td>Jade-green from 1–3% iron in reduction</td></tr>
                <tr><td>2</td><td>Celadon (Cone 6 Oxidation)</td><td>6</td><td>Approximation with chrome/copper</td></tr>
                <tr><td>3</td><td>Tenmoku (Classic)</td><td>10</td><td>8–12% iron, hare's fur / oil spot</td></tr>
                <tr><td>4</td><td>Iron Saturate (Cone 6)</td><td>6</td><td>Amber/honey/red-brown</td></tr>
                <tr><td>5</td><td>Shino (Traditional)</td><td>10</td><td>High soda, carbon trap, crawling white</td></tr>
                <tr><td>6</td><td>Natural Ash Glaze</td><td>10</td><td>40–50% ash, phosphorus, earthy</td></tr>
                <tr><td>7</td><td>Crystalline (Zinc)</td><td>10</td><td>Near-zero alumina, controlled cooling</td></tr>
                <tr><td>8</td><td>Majolica (Tin Glaze)</td><td>04</td><td>Tin-opacified, decorative base</td></tr>
                <tr><td>9</td><td>Clear Gloss (Cone 6)</td><td>6</td><td>Workhorse clear</td></tr>
                <tr><td>10</td><td>Clear Gloss (Cone 10)</td><td>10</td><td>High-fire clear</td></tr>
                <tr><td>11</td><td>Clear Gloss (Low Fire)</td><td>04</td><td>Boron-frit based</td></tr>
                <tr><td>12</td><td>Magnesia Matte (Cone 6)</td><td>6</td><td>Buttery dolomite/talc matte</td></tr>
                <tr><td>13</td><td>Calcium Matte (Cone 6)</td><td>6</td><td>Dry devitrification matte</td></tr>
                <tr><td>14</td><td>Matte (Cone 10)</td><td>10</td><td>High-alumina stoneware matte</td></tr>
                <tr><td>15</td><td>Copper Red (Sang de Boeuf)</td><td>10</td><td>Colloidal copper in heavy reduction</td></tr>
                <tr><td>16</td><td>Copper Green (Cone 6)</td><td>6</td><td>Bright green in oxidation</td></tr>
                <tr><td>17</td><td>Rutile Blue</td><td>6</td><td>TiO₂ phase separation + cobalt</td></tr>
                <tr><td>18</td><td>Chun/Jun Blue</td><td>10</td><td>Phosphorus opalescence, bone ash</td></tr>
                <tr><td>19</td><td>Cobalt Blue</td><td>any</td><td>Works at any temperature</td></tr>
                <tr><td>20</td><td>White Satin (Cone 6)</td><td>6</td><td>Functional pottery favorite</td></tr>
                <tr><td>21</td><td>Crawl / Lichen Texture</td><td>varies</td><td>Intentional high-MgO crawling</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Each of these is a full knowledge record — not just a name but target UMF ranges 
            with weights, material palettes, colorant additions with min/max percentages, 
            atmosphere requirements, and notes about what makes each type work or fail.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ FIRING ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="firing" className="henry-section">
          <h2>Firing Schedule Suggestions</h2>
          <p>
            The suggestion engine generates appropriate firing schedules per archetype:
          </p>
          <ul>
            <li><strong>Bisque Fire</strong> — Standard cone 06 with 5 segments</li>
            <li><strong>Oxidation Glaze Fire</strong> — with optional slow cool for satin/matte at cone 6+</li>
            <li><strong>Reduction Glaze Fire</strong> — body reduction timing, damper adjustment notes</li>
            <li><strong>Crystalline Glaze Fire</strong> — crash cool to 2050°F, 2-hour hold, slow descent for crystal growth</li>
          </ul>
          <p>
            Each schedule: temperature ramps in °F and °C, hold times, segment descriptions, 
            practical tips. These are starting points, not prescriptions — every kiln is different.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ 3D EXPLORER ━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="three-d" className="henry-section">
          <h2>3D Explorer</h2>
          <p>
            Adds a configurable Z-axis to the Stull chart. Choose any oxide, cone, 
            flux ratio, or Si:Al ratio as the third dimension.
          </p>
          <ul>
            <li><strong>Surface fitting</strong> — Nadaraya-Watson kernel regression generates a smooth trend surface through the data</li>
            <li><strong>Camera presets</strong> — Top-down, Front, Side, Perspective, Orbital auto-rotation</li>
            <li><strong>Drop lines</strong> — Vertical stems from each point to the floor plane</li>
            <li><strong>DBSCAN clustering</strong> — colored in 3D space</li>
            <li><strong>Void detection</strong> — empty regions visible in three dimensions</li>
            <li><strong>Adjustable surface opacity</strong></li>
            <li><strong>Export</strong> — OBJ, STL, CSV of the 3D data</li>
          </ul>
          <p>
            This is visually powerful but I want your honest take: is seeing CaO as a 
            Z-axis on a Stull chart <em>useful</em> in the studio, or is it a curiosity? 
            That's the kind of question that matters.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ TIMELINE ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="timeline" className="henry-section">
          <h2>Historical Timeline</h2>
          <p>
            160+ events from 18,000 BCE to 2026 covering the full history of ceramic science. 
            Six eras, filterable by category, with inflection-point highlights and thematic threads.
          </p>
          <p>
            From the earliest kiln sites in the Levant through Chinese porcelain, Seger cones, 
            Stull's 1912 paper, to Derek Au launching Glazy in 2016. It's context — where this 
            all came from and where it sits in the lineage.
          </p>
          <div className="henry-callout">
            <strong>Try it:</strong> <Link to="/timeline">Open Timeline</Link>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ PRICING ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="pricing" className="henry-section">
          <h2>Pricing &amp; Access</h2>
          <div className="henry-table-wrap">
            <table>
              <thead><tr><th>Tier</th><th>Monthly</th><th>Annual</th><th>What You Get</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Free</strong></td><td>$0</td><td>$0</td>
                  <td>2D explorer, UMF calculator, guide, materials browser</td>
                </tr>
                <tr>
                  <td><strong>Solo</strong></td><td>$10</td><td>$89/yr</td>
                  <td>+ similarity, compare, save recipes, import/export, line blend, limit warnings</td>
                </tr>
                <tr>
                  <td><strong>Pro</strong></td><td>$25</td><td>$219/yr</td>
                  <td>+ optimizer, genetic optimizer, AI suggestions, all blend calculators, analysis tools</td>
                </tr>
                <tr>
                  <td><strong>Atlas 3D</strong></td><td>$40</td><td>$349/yr</td>
                  <td>+ 3D explorer, surface fitting, 3D export (OBJ/STL/CSV), camera presets</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Education Pricing</h3>
          <ul>
            <li><strong>Student</strong> — Free Solo-level access with .edu email</li>
            <li><strong>Classroom</strong> — $300/year for Pro access, up to 30 students</li>
            <li><strong>Department</strong> — $750/year for Atlas 3D, unlimited seats</li>
          </ul>

          <h3>Right Now</h3>
          <p>
            <strong>All features are free through April 30, 2026.</strong> No credit card needed. 
            Just sign up and everything is unlocked. After April, it drops to whatever tier 
            you choose.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ PHILOSOPHY ━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="philosophy" className="henry-section">
          <h2>Philosophy: Smart, Not Intelligent</h2>
          <div className="henry-table-wrap">
            <table>
              <thead><tr><th>Principle</th><th>What It Means</th></tr></thead>
              <tbody>
                <tr><td><strong>Deterministic</strong></td><td>Same inputs → same outputs, always. No randomness in the math.</td></tr>
                <tr><td><strong>Transparent</strong></td><td>Show the work. Every calculation step is traceable.</td></tr>
                <tr><td><strong>Traceable</strong></td><td>Every value knows its origin — what source, what confidence.</td></tr>
                <tr><td><strong>Bounded</strong></td><td>Refuses to calculate with bad data. Won't guess.</td></tr>
                <tr><td><strong>Explicit</strong></td><td>No silent defaults or assumptions. If something was assumed, it says so.</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            This means: no guessing missing values, no silent fallbacks, no averaged 
            "close enough" results, no hidden corrections. If the data is bad, it tells you 
            the data is bad. If it used a default, it flags it.
          </p>
          <p>
            The suggestion engine is the one place where this gets nuanced — it uses 
            optimization algorithms that search a space. But even there, the underlying 
            UMF calculations are deterministic, and the archetype knowledge is explicit 
            and inspectable. No black boxes.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ ROADMAP ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="roadmap" className="henry-section">
          <h2>Roadmap</h2>
          <p>What's planned (subject to change based on feedback from people like you):</p>

          <h3>v3.6 — "The Walk"</h3>
          <p>
            Recipe interpolation. Click two glazes and see every step between them — 
            not just a line blend, but a guided walk through the chemistry showing what 
            changes at each step and why. "How do I get from <em>here</em> to <em>there</em>?"
          </p>

          <h3>v3.7 — "Constellations"</h3>
          <p>
            Named glaze families. Group related recipes by chemistry — all the shinos, 
            all the tenmokus, all the celadons — and see them as named clusters on the chart. 
            Community-contributed labels on the landscape.
          </p>

          <h3>v3.8 — "Knowledge Graph"</h3>
          <p>
            The capstone. Every recipe, material, oxide, firing schedule, Digitalfire reference, 
            Glazy entry — connected as a navigable graph. Click a material, see every glaze that 
            uses it. Click an oxide, see how it connects to surfaces. The spatial version of 
            everything Tony Hansen and Derek Au have built.
          </p>

          <h3>v4.0 — "The Community"</h3>
          <p>
            Shared exploration. User-contributed annotations. Collaborative recipe development. 
            The dataset becomes alive and growing, not static.
          </p>

          <h3>Stull Atlas Studio (Desktop)</h3>
          <p>
            Tauri-powered desktop app. Works fully offline. All tiers unlocked. 
            For potters who don't want to depend on an internet connection in the studio.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ DATASET ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="dataset" className="henry-section">
          <h2>The Dataset</h2>
          <p>
            ~9,000 glaze recipes sourced from <a href="https://glazy.org" target="_blank" rel="noopener noreferrer">Glazy</a> 
            (CC BY-NC-SA 4.0 license). Each recipe includes:
          </p>
          <ul>
            <li>Name, description, source attribution</li>
            <li>Batch recipe (materials + percentages)</li>
            <li>Calculated UMF (all 27 oxides)</li>
            <li>Cone temperature</li>
            <li>Atmosphere (oxidation, reduction, neutral)</li>
            <li>Surface type (gloss, satin, matte)</li>
            <li>Transparency, color, special effects</li>
          </ul>
          <p>
            The dataset is static — it's a snapshot. Glazy has more recipes added every day, 
            and the app doesn't live-sync. Re-scraping and refreshing the dataset is a periodic 
            manual process. Only ~13 glazes currently have photos — most Glazy images aren't 
            included yet.
          </p>
        </section>

        {/* ━━━━━━━━━━━━ CREDITS ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="credits" className="henry-section">
          <h2>Credits &amp; Sources</h2>
          <ul className="henry-credits">
            <li><strong>Ray T. Stull</strong> (1912) — Original SiO₂/Al₂O₃ diagram and zone classifications</li>
            <li><strong>Derek Philip Au / Glazy</strong> — 9,000+ open-source recipes (CC BY-NC-SA 4.0), Stull region geometry, temperature contours, Q-line coordinates</li>
            <li><strong>Tony Hansen / Digitalfire</strong> — 30+ years of reference material, materials database, oxide data, troubleshooting (~4,200 pages)</li>
            <li><strong>Ceramic literature</strong> — Hamer &amp; Hamer, John Britt, Matt Katz, Linda Arbuckle, John Sankey, Louis Katz</li>
            <li><strong>SciGlass</strong> — 420,000+ glass compositions (MIT license)</li>
            <li><strong>IUPAC</strong> — 2023/2024 Standard Atomic Weights for molar weight calculations</li>
          </ul>
        </section>

        {/* ━━━━━━━━━━━━ QUESTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="questions" className="henry-section henry-questions">
          <h2>Questions for You</h2>
          <p>
            These are real questions. Your answers — even partial ones, even "I don't know 
            but here's what I'd want" — are what shapes what gets built next.
          </p>

          <ol className="henry-question-list">
            <li>
              <strong>What's the first thing you'd want to do with this?</strong>
              <p>Not the most impressive feature — the first thing that would actually help in your studio or teaching.</p>
            </li>
            <li>
              <strong>What's missing?</strong>
              <p>What would a tool like this need to do before you'd reach for it instead of (or alongside) Glazy?</p>
            </li>
            <li>
              <strong>Is the UMF calculator trustworthy?</strong>
              <p>Try a recipe you know well. Does the output match what you'd expect? If not, where does it diverge?</p>
            </li>
            <li>
              <strong>Do the Stull chart regions match your experience?</strong>
              <p>When you plot a glaze you've fired, does its position on the chart agree with what actually came out of the kiln?</p>
            </li>
            <li>
              <strong>Is the suggestion engine useful or dangerous?</strong>
              <p>Try asking it for something you know — a cone 10 celadon, a shino. Does the recipe make sense to someone who'd actually mix it? Where does it go wrong?</p>
            </li>
            <li>
              <strong>3D: useful or spectacle?</strong>
              <p>Be honest. Does adding a Z-axis to the Stull chart tell you something you couldn't see in 2D? Or is it just visually interesting?</p>
            </li>
            <li>
              <strong>What would you show a student?</strong>
              <p>If you were teaching a glaze chemistry class and had this tool, what would the first assignment look like?</p>
            </li>
            <li>
              <strong>Material substitution: right approach?</strong>
              <p>The system has 14 substitution groups with ratios. Is this how you'd think about it? What's missing?</p>
            </li>
            <li>
              <strong>What archetypes am I missing?</strong>
              <p>There are 21 glaze archetypes in the suggestion engine. What would you add? What would you change?</p>
            </li>
            <li>
              <strong>Wood fire question:</strong>
              <p>You know wood ash chemistry better than most. Is there anything this tool could do that would be useful for someone loading a kiln like Ken's? Or is wood fire inherently outside what calculated UMF can help with?</p>
            </li>
          </ol>

          <div className="henry-callout" style={{ marginTop: 32 }}>
            No rush. Get back to me when you get to it. Text, email, in person at Rovin — 
            whatever works. Every answer makes this better.
          </div>
        </section>

      </main>
    </div>
  )
}
