/**
 * Guide Page — In-Depth How-To for Stull Atlas
 * 
 * Comprehensive guide for ceramic artists covering every feature,
 * workflow, and concept in the application.
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'

const SECTIONS = [
  { id: 'overview',      label: 'Overview' },
  { id: 'stull-chart',   label: 'Reading the Stull Chart' },
  { id: 'explorer',      label: 'Explorer Page' },
  { id: 'recipes',       label: 'Entering Recipes' },
  { id: 'similarity',    label: 'Similarity Search' },
  { id: 'comparison',    label: 'Comparison Mode' },
  { id: 'analysis',      label: 'Analysis Tools' },
  { id: 'calculators',   label: 'Blend Calculators' },
  { id: 'umf-calc',      label: 'UMF Calculator' },
  { id: 'materials',     label: 'Materials Database' },
  { id: 'import-export', label: 'Import / Export' },
  { id: 'tips',          label: 'Tips & Settings' },
  { id: 'workflows',     label: 'Workflow Examples' },
  { id: 'glossary',      label: 'Glossary' },
] as const

export function GuidePage() {
  usePageTitle('Guide')
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }

  return (
    <div className="guide-page">
      {/* Sidebar TOC */}
      <aside className="guide-toc">
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
      <main className="guide-content">

        {/* ── Overview ───────────────────────────────────────── */}
        <section id="overview" className="guide-section">
          <h1>How to Use Stull Atlas</h1>
          <p className="guide-lead">
            Stull Atlas is a computational glaze chemistry explorer. It maps thousands of real-world
            ceramic glaze recipes onto a Stull chart — a coordinate system that predicts glaze surface
            quality from the ratio of silica (SiO₂) to alumina (Al₂O₃) in Unity Molecular Formula.
          </p>
          <p>
            This guide walks through every feature in depth. Whether you're a potter trying to
            reformulate a cone 6 satin, a student learning UMF for the first time, or a seasoned
            glaze chemist exploring oxide space — the information here will help you get the most
            out of the tool.
          </p>
          <div className="guide-callout">
            <strong>Quick start:</strong> Open the <Link to="/">Explorer</Link>, hover over any dot
            to see its recipe, and click it to view full details. Everything else builds from there.
          </div>
        </section>

        {/* ── Reading the Stull Chart ────────────────────────── */}
        <section id="stull-chart" className="guide-section">
          <h2>Reading the Stull Chart</h2>
          
          <h3>What Are the Axes?</h3>
          <p>
            The X-axis is <strong>SiO₂</strong> (silica) in UMF — how much glass-former is present
            relative to the fluxes. The Y-axis is <strong>Al₂O₃</strong> (alumina) in UMF — how
            much stabilizer/refractant is present. Both values are normalized to 1.0 mole of total
            flux (R₂O + RO), which is the foundation of Unity Molecular Formula.
          </p>

          <h3>The "Stull Regions"</h3>
          <p>
            Ray T. Stull's original 1912 work identified three major zones on this chart:
          </p>
          <ul>
            <li>
              <strong>Matte zone</strong> (lower SiO₂:Al₂O₃ ratio) — Glazes here have relatively
              more alumina per unit of silica. The surface tends to be matte because the glaze
              doesn't fully melt to a smooth glass; alumina's refractory nature prevents complete
              flow. Think of buttery, velvet, or dry matte surfaces.
            </li>
            <li>
              <strong>Satin zone</strong> (middle ratio) — A balance between glass formation and
              refractory behavior. Glazes here produce a soft sheen — not mirror-glossy, not dry.
              Many potters find their favorite functional glazes in this region.
            </li>
            <li>
              <strong>Gloss zone</strong> (higher SiO₂:Al₂O₃ ratio) — Silica dominates, forming
              a well-developed glass. These glazes flow more, producing a shiny, reflective
              surface. The classic transparent glaze sits here.
            </li>
          </ul>
          <p>
            The boundaries between these zones are not sharp lines — they're gradients that vary
            with firing temperature, flux composition, and cooling schedule. The colored regions
            on the chart are conservative estimates drawn from empirical data.
          </p>

          <h3>Cone Temperature Lines</h3>
          <p>
            The diagonal lines on the chart represent approximate firing temperatures (cones).
            As you move to higher SiO₂ and Al₂O₃ values, you generally need more heat to melt
            the glaze. A cone 6 glaze with SiO₂ of 3.5 and Al₂O₃ of 0.4 needs around 2232°F
            (1222°C) to mature.
          </p>
          <p>
            These lines are guidelines, not hard rules. The actual melting point depends heavily
            on which fluxes are present (sodium melts lower than calcium, for example) and
            whether you have boron, lithium, or other powerful fluxes in the mix.
          </p>

          <h3>What Does Each Dot Represent?</h3>
          <p>
            Every dot on the chart is a real glaze recipe from the dataset. Its position is
            calculated from the recipe's Unity Molecular Formula — the ratio of oxides when
            flux oxides are normalized to 1.0. The color of the dot indicates the self-reported
            surface type from the original recipe entry.
          </p>
        </section>

        {/* ── Explorer Page ──────────────────────────────────── */}
        <section id="explorer" className="guide-section">
          <h2>Explorer Page</h2>
          
          <h3>The Main Plot</h3>
          <p>
            The Explorer is the heart of Stull Atlas. It shows a 2D scatter plot of all glazes
            in the current dataset, plotted by SiO₂ (X) and Al₂O₃ (Y). You can also switch to
            a 3D view that adds a third axis (configurable — typically a flux ratio or
            temperature).
          </p>

          <h3>Interacting with the Plot</h3>
          <ul>
            <li><strong>Hover</strong> over any dot to see a tooltip with the glaze name, cone, surface, and key UMF values.</li>
            <li><strong>Click</strong> a dot to select it. The detail sidebar opens on the right, showing full recipe information.</li>
            <li><strong>Box-select</strong> by clicking and dragging to zoom into a region. Double-click to reset the zoom.</li>
            <li><strong>Pan</strong> by holding Shift + drag, or use the Plotly toolbar at the top-right of the plot.</li>
          </ul>

          <h3>The Detail Sidebar</h3>
          <p>
            When you select a glaze, the right sidebar shows:
          </p>
          <ul>
            <li><strong>Name & metadata</strong> — Glaze name, cone, surface type, source reference</li>
            <li><strong>UMF values</strong> — Full Unity Molecular Formula breakdown: each oxide's molar contribution normalized to R₂O + RO = 1.0</li>
            <li><strong>Recipe</strong> — The original batch recipe with material percentages</li>
            <li><strong>Similarity search</strong> — Find glazes chemically similar to this one (see the Similarity section below)</li>
            <li><strong>Compare tab</strong> — Add up to 3 glazes for side-by-side UMF comparison (see Comparison Mode below)</li>
          </ul>

          <h3>Dataset Switching</h3>
          <p>
            Use the dataset switcher (top of the sidebar) to filter the displayed glazes. 
            You can view the full dataset or filter by cone range, surface type, or other
            criteria to focus on the glazes most relevant to your work.
          </p>

          <h3>2D vs 3D View</h3>
          <p>
            Toggle between 2D and 3D views. The 3D view can reveal structure that's hidden in
            the flat projection — for instance, how cone 06 glazes and cone 10 glazes occupy
            the same SiO₂/Al₂O₃ space but differ dramatically in flux composition. You can
            rotate, zoom, and pan the 3D view freely.
          </p>
        </section>

        {/* ── Entering Recipes ───────────────────────────────── */}
        <section id="recipes" className="guide-section">
          <h2>Entering Your Recipes</h2>

          <h3>The Recipe Input Panel</h3>
          <p>
            On many calculator pages and in the UMF Calculator, you'll see a recipe input panel.
            Here you can enter your own glaze recipes using materials from the built-in database:
          </p>
          <ol>
            <li>
              <strong>Select a material</strong> — Start typing a material name (e.g., "EPK",
              "Silica", "Custer Feldspar") and select from the autocomplete dropdown. The database
              includes hundreds of common ceramic materials with their oxide analyses.
            </li>
            <li>
              <strong>Enter amounts</strong> — Type the percentage of each material. The recipe
              is automatically normalized to 100% for UMF calculation, so you can enter in any
              scale you like.
            </li>
            <li>
              <strong>Add/remove materials</strong> — Click "Add Material" to add rows. Click
              the ✕ button on any row to remove it.
            </li>
            <li>
              <strong>See results</strong> — The UMF is calculated in real-time as you type.
              Your recipe appears as a highlighted point on the Stull chart so you can immediately
              see where it falls relative to the dataset.
            </li>
          </ol>

          <h3>Recipe Metadata</h3>
          <p>
            You can also set a name, cone temperature, and surface type for your recipe. This
            information is saved when you export or store the recipe, and it appears in the
            detail sidebar when you select your recipe on the chart.
          </p>

          <h3>Tips for Accuracy</h3>
          <div className="guide-callout">
            <strong>Material matching matters.</strong> Make sure the material in the database
            matches what you actually use. "EPK" and "Tile 6" are both kaolins but have
            different oxide analyses. If your material isn't in the database, check the
            Materials page where you can view and compare oxide analyses for all materials.
          </div>
        </section>

        {/* ── Similarity Search ──────────────────────────────── */}
        <section id="similarity" className="guide-section">
          <h2>Similarity Search</h2>

          <h3>What Is It?</h3>
          <p>
            Similarity search finds glazes in the dataset that are chemically similar to a
            selected recipe. "Similar" means close in oxide space — glazes with similar
            proportions of silica, alumina, and fluxes will behave similarly in the kiln.
          </p>

          <h3>How It Works</h3>
          <p>
            The algorithm computes a weighted Euclidean distance in UMF space between the
            selected glaze and every other glaze in the dataset. Oxides with higher weights
            have more influence on the distance calculation. By default, SiO₂ and Al₂O₃ are
            weighted most heavily (since they determine surface quality), but you can adjust
            the weights.
          </p>

          <h3>Adjusting Similarity Weights</h3>
          <p>
            In the similarity panel, you'll see weight sliders for each oxide group:
          </p>
          <ul>
            <li><strong>SiO₂ / Al₂O₃</strong> — Surface-determining oxides. High weight means "find glazes with similar matte/gloss character."</li>
            <li><strong>Fluxes (Na₂O, K₂O, CaO, MgO, etc.)</strong> — Affect melting behavior, thermal expansion, and crazing.</li>
            <li><strong>Colorants (Fe₂O₃, TiO₂, MnO, etc.)</strong> — Affect color. Lower these weights if you don't care about matching color.</li>
            <li><strong>B₂O₃</strong> — Boron is a powerful flux that behaves differently from other oxides.</li>
          </ul>

          <h3>Practical Use Cases</h3>
          <ul>
            <li>
              <strong>Reformulating for a different temperature:</strong> Select a cone 10 glaze
              you like, then look for similar glazes at cone 6. The chemistry might be achievable
              with different materials at the lower temperature.
            </li>
            <li>
              <strong>Finding substitutes:</strong> If a recipe uses a discontinued material,
              find chemically similar glazes that use available materials, then adapt.
            </li>
            <li>
              <strong>Exploring variations:</strong> Find glazes near yours but slightly
              different — each one is a potential test to learn what small chemistry changes do
              to the fired result.
            </li>
          </ul>
        </section>

        {/* ── Comparison Mode ────────────────────────────────── */}
        <section id="comparison" className="guide-section">
          <h2>Comparison Mode</h2>

          <h3>What Is It?</h3>
          <p>
            Comparison mode lets you place up to three glazes side by side for a direct UMF
            comparison. Instead of clicking back and forth between glazes, you can see their
            oxide values, ratios, and recipe ingredients in a single table with the highest
            value in each row highlighted.
          </p>

          <h3>Adding Glazes to Compare</h3>
          <ol>
            <li>
              <strong>Select a glaze</strong> — Click any dot on the Stull chart to open its
              detail panel.
            </li>
            <li>
              <strong>Click "Add to Compare"</strong> — The button appears at the bottom of the
              detail view. The sidebar automatically switches to the Compare tab.
            </li>
            <li>
              <strong>Repeat</strong> — Select more glazes and add them. You can compare up to
              3 glazes at once.
            </li>
          </ol>

          <h3>Reading the Compare Table</h3>
          <p>
            The comparison table is organized into sections:
          </p>
          <ul>
            <li><strong>Metadata</strong> — Cone, surface type, and source for each glaze.</li>
            <li><strong>Fluxes</strong> — R₂O and RO oxides (Na₂O, K₂O, CaO, MgO, etc.) with
              the highest value in each row highlighted.</li>
            <li><strong>Stabilizers</strong> — Al₂O₃ (and B₂O₃ if present).</li>
            <li><strong>Glass Formers</strong> — SiO₂ (and TiO₂).</li>
            <li><strong>Ratios</strong> — SiO₂:Al₂O₃ and R₂O:RO for quick surface/expansion comparison.</li>
            <li><strong>Recipe</strong> — The batch ingredients and percentages for each glaze.</li>
          </ul>

          <h3>Practical Use Cases</h3>
          <ul>
            <li>
              <strong>Cone conversion:</strong> Compare a cone 10 glaze with a cone 6 version
              to see exactly which oxides shifted and by how much.
            </li>
            <li>
              <strong>Surface debugging:</strong> Compare a matte glaze you like with one that
              crawled — the table quickly reveals what's different.
            </li>
            <li>
              <strong>Flux substitution:</strong> Compare two recipes that use different flux 
              sources (e.g., feldspar vs. frit) to see how the UMF changes.
            </li>
          </ul>

          <div className="guide-callout">
            <strong>Tip:</strong> Click a glaze name in the compare table to select it on the
            chart. Use the ✕ button to remove individual glazes, or "Clear All" to start over.
          </div>
        </section>

        {/* ── Analysis Tools ─────────────────────────────────── */}
        <section id="analysis" className="guide-section">
          <h2>Analysis Tools</h2>
          <p>
            The Analysis panel (accessible from the Explorer page) provides three computational
            tools for understanding the structure of the glaze dataset:
          </p>

          <h3>DBSCAN Clustering</h3>
          <p>
            DBSCAN (Density-Based Spatial Clustering of Applications with Noise) automatically
            discovers groups of glazes that cluster together in oxide space. Unlike simple
            binning, DBSCAN finds clusters of arbitrary shape and identifies outlier glazes
            that don't belong to any group.
          </p>
          <ul>
            <li>
              <strong>Epsilon (ε)</strong> — The maximum distance between two glazes for them
              to be considered neighbors. Smaller values create tighter, more numerous clusters.
              Larger values merge nearby groups. Start with the default and adjust.
            </li>
            <li>
              <strong>Min Points</strong> — The minimum number of glazes required to form a
              cluster. Increase this to ignore small groupings and focus on major clusters.
            </li>
          </ul>
          <p>
            Each discovered cluster is assigned a color on the plot. The analysis panel lists
            each cluster with its centroid (average position), size, and key characteristics.
            Click a cluster to zoom to it on the chart.
          </p>

          <h3>Density Analysis</h3>
          <p>
            Density analysis shows you where glazes are concentrated in the chart. Regions with
            many glazes packed closely are high-density; sparse areas are low-density.
          </p>
          <p>
            This is useful for identifying "well-trodden" areas of glaze chemistry versus
            unexplored territory. A high-density region around SiO₂ = 3.5, Al₂O₃ = 0.35
            at cone 6 tells you there are many known glazes with that chemistry — good for
            reliability. A low-density region might represent unexplored chemistry worth
            testing.
          </p>

          <h3>Void Detection</h3>
          <p>
            Void detection identifies regions of the chart where no glazes exist — "empty
            spaces" in the glaze chemistry landscape. These voids might represent:
          </p>
          <ul>
            <li>Chemistry combinations that don't produce useful glazes (too refractory, too runny, crawling, etc.)</li>
            <li>Territory that simply hasn't been explored yet — potential for new discovery</li>
            <li>Regions where the required oxide ratios are hard to achieve with common materials</li>
          </ul>
          <p>
            Each void is shown on the plot and listed with its approximate center coordinates
            and size. Use these as starting points for experimental investigations — but
            remember, many voids exist because the chemistry physically doesn't work well.
          </p>
        </section>

        {/* ── Blend Calculators ──────────────────────────────── */}
        <section id="calculators" className="guide-section">
          <h2>Blend Calculators</h2>
          <p>
            Stull Atlas includes a full suite of blend calculators for systematic glaze testing.
            All calculators are accessible from the <Link to="/calc">Calculators</Link> page.
          </p>

          <h3>Line Blend</h3>
          <p>
            A line blend mixes two recipes (A and B) in graduated steps. For example, a 5-step
            line blend produces: 100%A, 75/25, 50/50, 25/75, 100%B. Each step is calculated
            as a weighted average of the two recipes' batch weights.
          </p>
          <p>
            <strong>When to use:</strong> Testing how a single variable (one added material,
            or two endpoint glazes) changes across a range. Line blends are the simplest
            systematic test.
          </p>

          <h3>Triaxial Blend</h3>
          <p>
            A triaxial blend mixes three recipes (A, B, C) across a triangular grid. Each
            point on the grid represents a specific ratio of the three starting materials.
            The corners are 100% of each recipe; edges are two-component blends; interior
            points blend all three.
          </p>
          <p>
            <strong>When to use:</strong> Exploring how three variables interact. Classic
            example: three different fluxes (feldspar, whiting, talc) blended across a triangle
            to see how the melt and surface change.
          </p>

          <h3>Quadaxial Blend</h3>
          <p>
            Extends the triaxial concept to four recipes, producing a tetrahedral result grid.
            The blends are projected onto a 2D triangular display with the fourth component
            varying as a sub-layer.
          </p>
          <p>
            <strong>When to use:</strong> When you have four variables to test simultaneously.
            Quadaxials are complex — typically for advanced testing or academic research.
          </p>

          <h3>Biaxial Blend</h3>
          <p>
            A biaxial blend is a rectangular grid with two axes of variation. Unlike a triaxial
            (which blends three things), a biaxial holds a base recipe constant and varies two
            additions independently. For example: vary alumina on the X-axis and silica on the
            Y-axis, keeping fluxes constant.
          </p>
          <p>
            <strong>When to use:</strong> When you want to isolate two variables and see their
            independent and combined effects. Biaxials are extremely useful for mapping
            surface transitions.
          </p>

          <h3>Radial Blend</h3>
          <p>
            A radial blend takes a center recipe and radiates outward in multiple directions,
            each direction adding or subtracting a specific material. It's conceptually like
            multiple line blends sharing a center point.
          </p>
          <p>
            <strong>When to use:</strong> Exploring the neighborhood around a promising recipe.
            If you have a glaze you like, a radial blend systematically tests what happens when
            you push it in different chemical directions.
          </p>

          <h3>Space-Filling Design</h3>
          <p>
            Space-filling blends use algorithms (Latin Hypercube, Sobol sequences, etc.) to
            distribute test points efficiently across a multi-dimensional recipe space. Instead
            of a regular grid, points are placed to maximize coverage of the parameter space
            with fewer tests.
          </p>
          <p>
            <strong>When to use:</strong> When you have many variables and can't afford a full
            factorial grid. Space-filling designs are the most statistically efficient way to
            explore a large recipe space. They're common in industrial glaze development.
          </p>

          <h3>Using Calculator Results</h3>
          <p>
            Every calculator outputs a table of batch recipes — the actual material weights
            to weigh out for each test tile. You can:
          </p>
          <ul>
            <li>View the UMF for each blend point</li>
            <li>See where each blend appears on the Stull chart</li>
            <li>Export the results for printing or spreadsheet use</li>
            <li>Save individual results as custom recipes</li>
          </ul>
        </section>

        {/* ── UMF Calculator ─────────────────────────────────── */}
        <section id="umf-calc" className="guide-section">
          <h2>UMF Calculator</h2>
          <p>
            The <Link to="/calc/umf">UMF Calculator</Link> is a standalone tool for converting
            any batch recipe into Unity Molecular Formula. It's the core calculation engine
            used throughout Stull Atlas.
          </p>

          <h3>What Is UMF?</h3>
          <p>
            Unity Molecular Formula expresses a glaze recipe as molar ratios of oxides,
            normalized so that the total flux oxides (R₂O + RO) sum to 1.0. This normalization
            makes recipes comparable regardless of their batch size.
          </p>
          <p>
            The three groups of oxides in UMF:
          </p>
          <ul>
            <li>
              <strong>Fluxes (R₂O + RO)</strong> — These lower the melting point. R₂O includes
              Na₂O, K₂O, Li₂O. RO includes CaO, MgO, BaO, ZnO, SrO. Their sum is always 1.0
              in UMF.
            </li>
            <li>
              <strong>Stabilizers (R₂O₃)</strong> — Primarily Al₂O₃. Makes the glaze more viscous
              at temperature, preventing running. Also affects surface texture.
            </li>
            <li>
              <strong>Glass Formers (RO₂)</strong> — Primarily SiO₂. Forms the glass network.
              Also includes TiO₂ (which acts partly as a colorant).
            </li>
          </ul>

          <h3>Calculator Features</h3>
          <ul>
            <li><strong>Predicted surface</strong> — Based on the SiO₂:Al₂O₃ ratio, the calculator predicts whether the glaze will be matte, satin, or gloss</li>
            <li><strong>Ratio analysis</strong> — Shows SiO₂:Al₂O₃ ratio and R₂O:RO (alkali-to-alkaline earth) ratio</li>
            <li><strong>Warnings</strong> — Flags potential issues like high thermal expansion (crazing risk), low alumina (running risk), or unusual flux balances</li>
            <li><strong>Suggestions</strong> — Offers chemistry-aware tips for adjusting the recipe</li>
          </ul>

          <h3>Interpreting the Results Table</h3>
          <p>
            The results table shows each oxide's contribution organized by group. Each row shows:
          </p>
          <ul>
            <li><strong>Oxide name</strong> — e.g., SiO₂, Al₂O₃, CaO</li>
            <li><strong>Moles</strong> — The UMF molar amount</li>
            <li><strong>Percentage of group</strong> — What fraction of its group (flux, stabilizer, or glass former) this oxide represents</li>
          </ul>
        </section>

        {/* ── Materials Database ──────────────────────────────── */}
        <section id="materials" className="guide-section">
          <h2>Materials Database</h2>
          <p>
            The <Link to="/materials">Materials</Link> page contains a comprehensive database
            of ceramic raw materials with their oxide analyses (the percentage of each oxide
            contributed by the material).
          </p>

          <h3>Browsing Materials</h3>
          <p>
            Materials are organized by category:
          </p>
          <ul>
            <li><strong>Feldspars</strong> — Custer, G-200, Minspar, etc.</li>
            <li><strong>Clays</strong> — EPK, Tile 6, OM4, Grolleg, etc.</li>
            <li><strong>Silica</strong> — Flint, quartz</li>
            <li><strong>Calcium sources</strong> — Whiting, Wollastonite, Dolomite</li>
            <li><strong>Frits</strong> — Ferro frits, Fusion frits, etc.</li>
            <li><strong>Colorants</strong> — Iron oxide, cobalt carbonate, etc.</li>
            <li>And more: boron sources, lithium sources, magnesium sources, etc.</li>
          </ul>
          <p>
            Use the search bar to find materials by name. Click any material to see its full
            oxide analysis, formula weight, and loss on ignition (LOI).
          </p>

          <h3>Understanding Oxide Analyses</h3>
          <p>
            Each material's analysis shows what oxides it contributes to your glaze. For example,
            EPK kaolin typically provides: ~46% SiO₂, ~37% Al₂O₃, plus water (LOI ~14%).
            When the UMF calculator processes your recipe, it converts these weight percentages
            to molar amounts using each oxide's molecular weight.
          </p>

          <div className="guide-callout">
            <strong>Why analyses vary:</strong> Natural materials are mined from the earth and
            vary by deposit, batch, and supplier. The values in the database are typical/average
            analyses. For critical work, always use the analysis from your specific supplier's
            data sheet.
          </div>
        </section>

        {/* ── Import/Export ───────────────────────────────────── */}
        <section id="import-export" className="guide-section">
          <h2>Import / Export</h2>
          <p>
            The <Link to="/import-export">Import/Export</Link> page lets you save and load
            your recipes for backup, sharing, or transferring between devices.
          </p>

          <h3>Exporting</h3>
          <ul>
            <li><strong>JSON format</strong> — Machine-readable format that preserves all recipe data including UMF values, materials, amounts, and metadata. Use this for backup or transferring to another instance of Stull Atlas.</li>
            <li><strong>Text format</strong> — Human-readable plain text suitable for copying into emails, forum posts, or documents.</li>
          </ul>

          <h3>Importing</h3>
          <p>
            Paste a JSON export into the import textarea and click "Import." The recipes will
            be loaded into your recipe store and appear on the Stull chart. Duplicate detection
            prevents accidentally importing the same recipe twice.
          </p>

          <h3>Data Persistence</h3>
          <p>
            All your custom recipes are stored in your browser's localStorage. This means:
          </p>
          <ul>
            <li>They persist between sessions — close and reopen, and your recipes are still there</li>
            <li>They're local to your browser — not synced to a server</li>
            <li>Clearing browser data will erase them — export regularly as backup</li>
            <li>They don't transfer between devices — use JSON export/import to move recipes</li>
          </ul>
        </section>

        {/* ── Tips & Settings ────────────────────────────────── */}
        <section id="tips" className="guide-section">
          <h2>Tips & Settings</h2>

          <h3>Light / Dark Mode</h3>
          <p>
            Click the ☀/🌙 button in the top-right corner of the header to switch between
            light and dark themes. Your preference is saved in your browser and applied
            automatically on your next visit.
          </p>

          <h3>Printing</h3>
          <p>
            Every page in Stull Atlas is print-friendly. Press <strong>Ctrl+P</strong> (or
            <strong>Cmd+P</strong> on Mac) to open your browser's print dialog. The print
            layout automatically:
          </p>
          <ul>
            <li>Switches to light colors for clean paper output</li>
            <li>Hides navigation, controls, sliders, and other interactive UI</li>
            <li>Expands content to full page width</li>
            <li>Adds page breaks between major sections (comparison panels, blend results tables, guide sections)</li>
            <li>Displays link URLs after hyperlinks for reference</li>
          </ul>
          <p>
            This is especially useful for printing blend calculator results to take to the
            studio, or printing a comparison table for your glaze notebook.
          </p>

          <h3>Keyboard Navigation</h3>
          <p>
            Stull Atlas is fully navigable by keyboard. All interactive elements have visible
            focus indicators when using Tab navigation. A "Skip to content" link appears at
            the top of the page for screen reader users. Sidebar tabs, view toggles, and
            buttons include ARIA labels for assistive technology.
          </p>

          <h3>Data Storage</h3>
          <p>
            All your data (recipes, theme preference, selected dataset) is stored locally in
            your browser. Nothing is sent to a server. This means:
          </p>
          <ul>
            <li>Your data persists between sessions</li>
            <li>Clearing browser data will erase custom recipes — export regularly</li>
            <li>Data doesn't sync between devices — use Import/Export to transfer</li>
          </ul>
        </section>

        {/* ── Workflow Examples ───────────────────────────────── */}
        <section id="workflows" className="guide-section">
          <h2>Workflow Examples</h2>
          <p>
            Here are some real-world scenarios and how to approach them in Stull Atlas:
          </p>

          <h3>🎯 "I want a cone 6 satin glaze"</h3>
          <ol>
            <li>Open the <Link to="/">Explorer</Link> and look at the Stull chart. The satin zone is the middle band between matte and gloss regions.</li>
            <li>Use the dataset filter to show only cone 5-7 glazes.</li>
            <li>Click on glazes in the satin zone. Read their recipes in the sidebar.</li>
            <li>When you find a promising recipe, check its UMF values. A typical cone 6 satin has: SiO₂ around 3.0–4.0, Al₂O₃ around 0.3–0.5, with the SiO₂:Al₂O₃ ratio between 7:1 and 10:1.</li>
            <li>Use the similarity search to find related recipes. Adjust weights to prioritize surface-relevant oxides (SiO₂, Al₂O₃).</li>
            <li>Enter the recipe into the UMF Calculator to verify the chemistry with your specific materials.</li>
          </ol>

          <h3>🔄 "I have a cone 10 glaze — can I fire it at cone 6?"</h3>
          <ol>
            <li>Enter your cone 10 recipe in the UMF Calculator and note the UMF values.</li>
            <li>Look at where it plots on the Stull chart. Then observe what cone 6 glazes live in the same region.</li>
            <li>The challenge: at cone 6, you need more flux (lower the silica and alumina slightly) or use more powerful fluxes (add boron, lithium, or more sodium).</li>
            <li>Use the similarity search on your cone 10 recipe, then filter the results to cone 5-7. The matches show recipes that achieve similar chemistry at the lower temperature.</li>
            <li>Add your cone 10 recipe and 1-2 cone 6 candidates to <strong>Compare mode</strong> to see exactly which oxides differ and by how much.</li>
            <li>Set up a line blend between your original recipe and a candidate cone 6 recipe to find the sweet spot.</li>
          </ol>

          <h3>🧪 "I want to explore the matte-to-gloss transition"</h3>
          <ol>
            <li>Create two recipes: one firmly in the matte zone, one firmly in the gloss zone. Use the UMF calculator to verify their positions.</li>
            <li>Set up a <Link to="/calc/line-blend">Line Blend</Link> with 7-11 steps between the two recipes.</li>
            <li>View the results on the Stull chart — you'll see a line of dots crossing from matte through satin to gloss.</li>
            <li>For more detail, create a <Link to="/calc/biaxial">Biaxial Blend</Link> that varies silica on one axis and alumina on the other, holding fluxes constant. This maps the entire surface transition in a grid.</li>
          </ol>

          <h3>🔬 "What makes my glaze craze?"</h3>
          <ol>
            <li>Enter the crazing recipe in the UMF Calculator. Look at the R₂O:RO ratio — high sodium/potassium (R₂O) relative to calcium/magnesium (RO) causes high thermal expansion and crazing.</li>
            <li>The calculator may flag a "high thermal expansion" warning.</li>
            <li>Use the similarity search to find non-crazing glazes with similar appearance. Compare their flux compositions — they likely have more calcium and less sodium.</li>
            <li>Add the crazing recipe and a non-crazing match to <strong>Compare mode</strong> to see the flux differences side by side.</li>
            <li>Strategy: reduce feldspar (Na₂O, K₂O source), increase whiting or wollastonite (CaO source). Keep total flux at the same level by adjusting gram-for-gram.</li>
          </ol>

          <h3>📊 "I want to understand the dataset"</h3>
          <ol>
            <li>Run the <strong>DBSCAN clustering</strong> analysis. This reveals natural groupings in the data — often corresponding to glaze families (celadon, tenmoku, ash glazes, etc.).</li>
            <li>Run the <strong>Density analysis</strong> to see where most glazes concentrate. High-density areas represent well-explored chemistry.</li>
            <li>Run <strong>Void detection</strong> to find gaps. These represent either unexplored territory or chemistry that doesn't work.</li>
            <li>Combine these analyses by switching between them. Notice how clusters correspond to density peaks, and voids correspond to density valleys.</li>
          </ol>
        </section>

        {/* ── Glossary ───────────────────────────────────────── */}
        <section id="glossary" className="guide-section">
          <h2>Glossary</h2>
          <div className="glossary-grid">
            <div className="glossary-item">
              <dt>Al₂O₃ (Alumina)</dt>
              <dd>The primary stabilizer in ceramic glazes. Increases viscosity, prevents running, and affects surface texture. Higher alumina → more matte.</dd>
            </div>
            <div className="glossary-item">
              <dt>Batch Recipe</dt>
              <dd>A glaze recipe expressed as weight percentages of raw materials (e.g., 40% feldspar, 20% silica, etc.). This is what you actually weigh out.</dd>
            </div>
            <div className="glossary-item">
              <dt>Cone</dt>
              <dd>A measure of heat-work (time + temperature). Standardized by Orton. Common cones: 06 (~1000°C), 6 (~1222°C), 10 (~1288°C).</dd>
            </div>
            <div className="glossary-item">
              <dt>Crazing</dt>
              <dd>Fine cracks in a glazed surface caused by the glaze contracting more than the clay body during cooling. Usually caused by excess alkali (Na₂O, K₂O).</dd>
            </div>
            <div className="glossary-item">
              <dt>DBSCAN</dt>
              <dd>Density-Based Spatial Clustering of Applications with Noise. An algorithm that automatically discovers clusters in data without needing to specify the number of clusters in advance.</dd>
            </div>
            <div className="glossary-item">
              <dt>Flux</dt>
              <dd>An oxide that lowers the melting point of the glaze. R₂O fluxes: Na₂O, K₂O, Li₂O. RO fluxes: CaO, MgO, BaO, ZnO, SrO.</dd>
            </div>
            <div className="glossary-item">
              <dt>Glass Former</dt>
              <dd>An oxide (primarily SiO₂) that forms the glass network structure. More glass former = more developed glass, higher melting point.</dd>
            </div>
            <div className="glossary-item">
              <dt>LOI (Loss on Ignition)</dt>
              <dd>The percentage of a material that burns away during firing (water, carbonates, organics). Important for calculating the actual oxide contribution of a raw material.</dd>
            </div>
            <div className="glossary-item">
              <dt>Mole</dt>
              <dd>A unit of measurement for chemical amounts. One mole of any substance contains Avogadro's number of molecules. UMF uses molar ratios, not weight ratios.</dd>
            </div>
            <div className="glossary-item">
              <dt>Molecular Weight</dt>
              <dd>The weight of one mole of a substance. SiO₂ = 60.08 g/mol, Al₂O₃ = 101.96 g/mol, CaO = 56.08 g/mol. Used to convert between weight % and molar amounts.</dd>
            </div>
            <div className="glossary-item">
              <dt>R₂O</dt>
              <dd>Alkali flux oxides with a 2:1 metal-to-oxygen ratio: Na₂O, K₂O, Li₂O. These have high thermal expansion and contribute strongly to crazing.</dd>
            </div>
            <div className="glossary-item">
              <dt>RO</dt>
              <dd>Alkaline earth flux oxides with a 1:1 ratio: CaO, MgO, BaO, ZnO, SrO. These have lower thermal expansion and produce more durable glazes.</dd>
            </div>
            <div className="glossary-item">
              <dt>SiO₂ (Silica)</dt>
              <dd>The primary glass-forming oxide. More silica = harder, more chemically durable, glossier glaze surface. Too much = underfired, dry surface.</dd>
            </div>
            <div className="glossary-item">
              <dt>Stabilizer</dt>
              <dd>An oxide (primarily Al₂O₃) that increases the viscosity of the molten glaze, preventing it from running off vertical surfaces.</dd>
            </div>
            <div className="glossary-item">
              <dt>Stull Chart</dt>
              <dd>A 2D plot with SiO₂ on the X-axis and Al₂O₃ on the Y-axis (both in UMF). Developed by Ray T. Stull in 1912 to predict glaze surface quality from oxide ratios.</dd>
            </div>
            <div className="glossary-item">
              <dt>UMF (Unity Molecular Formula)</dt>
              <dd>A way of expressing a glaze recipe as molar ratios of oxides, normalized so total flux (R₂O + RO) = 1.0. Allows comparison between any two glazes regardless of batch size or materials used.</dd>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .guide-page {
          display: flex;
          min-height: 100%;
          gap: 0;
        }

        .guide-toc {
          position: sticky;
          top: 0;
          align-self: flex-start;
          width: 200px;
          min-width: 200px;
          padding: 24px 16px;
          border-right: 1px solid var(--border-primary);
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          gap: 2px;
          max-height: 100vh;
          overflow-y: auto;
        }

        .toc-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-secondary);
          margin: 0 0 12px;
          padding: 0 8px;
        }

        .toc-link {
          display: block;
          background: none;
          border: none;
          text-align: left;
          padding: 6px 8px;
          border-radius: 4px;
          font-size: 13px;
          color: var(--text-body);
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }

        .toc-link:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }

        .toc-link.active {
          background: var(--accent-bg);
          color: var(--accent);
          font-weight: 500;
        }

        .guide-content {
          flex: 1;
          max-width: 800px;
          padding: 32px 40px 80px;
          overflow-y: auto;
        }

        .guide-content h1 {
          font-size: 28px;
          margin: 0 0 16px;
          color: var(--text-bright);
        }

        .guide-content h2 {
          font-size: 22px;
          margin: 48px 0 16px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
          color: var(--text-bright);
        }

        .guide-content h2:first-of-type {
          border-top: none;
          margin-top: 0;
        }

        .guide-content h3 {
          font-size: 16px;
          margin: 28px 0 8px;
          color: var(--text-primary);
        }

        .guide-lead {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-body);
          margin: 0 0 16px;
        }

        .guide-content p {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-body);
          margin: 0 0 12px;
        }

        .guide-content ul, .guide-content ol {
          padding-left: 24px;
          margin: 0 0 16px;
        }

        .guide-content li {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-body);
          margin-bottom: 8px;
        }

        .guide-content strong {
          color: var(--text-primary);
        }

        .guide-content a {
          color: var(--text-link);
          text-decoration: none;
        }

        .guide-content a:hover {
          text-decoration: underline;
        }

        .guide-callout {
          padding: 16px 20px;
          background: var(--accent-bg);
          border-left: 3px solid var(--accent);
          border-radius: 0 6px 6px 0;
          margin: 16px 0 20px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-body);
        }

        .guide-callout strong {
          color: var(--text-primary);
        }

        .guide-section {
          scroll-margin-top: 16px;
        }

        .glossary-grid {
          display: grid;
          gap: 16px;
        }

        .glossary-item {
          padding: 12px 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
        }

        .glossary-item dt {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .glossary-item dd {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-body);
          margin: 0;
        }

        @media (max-width: 768px) {
          .guide-page {
            flex-direction: column;
          }
          .guide-toc {
            position: relative;
            width: 100%;
            min-width: unset;
            border-right: none;
            border-bottom: 1px solid var(--border-primary);
            max-height: none;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 12px;
          }
          .toc-title {
            width: 100%;
            margin-bottom: 8px;
          }
          .guide-content {
            padding: 24px 20px 60px;
          }
        }

        @media (max-width: 480px) {
          .guide-content {
            padding: 16px 12px 40px;
          }
          .guide-content h2 {
            font-size: 20px;
          }
          .guide-content h3 {
            font-size: 16px;
          }
          .guide-callout {
            padding: 10px 12px;
            font-size: 13px;
          }
          .glossary-grid {
            grid-template-columns: 1fr;
          }
          .toc-link {
            font-size: 11px;
            padding: 4px 8px;
          }
        }
      `}</style>
    </div>
  )
}
