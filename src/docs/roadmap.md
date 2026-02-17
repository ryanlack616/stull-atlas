# Stull Atlas — Release Roadmap

> *Every other tool treats chemistry as a spreadsheet. We're building a landscape you can walk through.*

Current version: **3.5.0** (master)

---

## v3.4 — The Compass ✅ SHIPPED
*"Find glazes similar in the way I care about."*

**What shipped:**
- [x] Aesthetic Compass — 5-axis weighted similarity (SiO₂, Al₂O₃, Z, Cone, Surface)
- [x] 5 presets: Balanced, Chemistry Twin, Same Surface, Same Cone, Flux Sibling
- [x] Surface Prediction Heatmap — NW kernel classification paints floor with matte/gloss/satin regions
- [x] Proximity system: sphere, nearby list, hover cross-highlight, distance lines, filter pills
- [x] Exploration breadcrumbs, sort modes, per-axis similarity bars, mini UMF preview
- [x] 269 tests passing

**Why it matters:** Potters can now search by intention, not formula. The chart answers
"will this be matte?" before they glaze a pot.

---

## v3.5 — The Gallery ✅ SHIPPED
*"See what these glazes actually look like."*

**What shipped:**
- [x] Nearby list gains 24×24 image thumbnails beside each neighbor (list view)
- [x] Gallery mode toggle: switches nearby list from compact rows → image grid (3-wide)
- [x] Image grid items: photo + name + cone badge + surface dot + distance
- [x] Lazy loading with native `loading="lazy"` on all images
- [x] Fallback placeholder for glazes without photos (surface type badge)
- [x] Tiny thumbnail in the mini UMF preview card (hover)
- [x] "Has photo" 📷 quick-filter pill in the nearby list
- [x] Photo count badge on gallery cards and list items (for multi-image glazes)
- [x] Click any thumbnail → navigate + add to breadcrumb trail
- [x] Detail panel image carousel (prev/next buttons, dot indicators)
- [x] Keyboard navigation: ← → to cycle carousel images
- [x] Click-to-zoom lightbox with +/−/1:1 controls and Esc to close
- [x] 269 tests passing

**Why it matters:** The explorer becomes visual — potters browse by how glazes look,
not just their oxide numbers. The lightbox rewards curiosity.

**Data note:** Only ~13 glazes currently have images from the initial Glazy scrape.
Re-scraping Glazy for image URLs would unlock the Gallery's full potential.

**Technical notes:**
- Images already on `GlazeRecipe.images?: string[]` (Glazy data)
- `_imageUrl` (thumbnail) already computed during loading
- Existing "Has photo" filter in filterStore
- All rendering is `<img loading="lazy">` with object-fit cover

---

## NCECA Launch Plan (March 2026)

**Conference dates:** March 25–27, Resource Hall

**Domain structure:**
- `stullatlas.app/rje/dev` — Dev build, shareable now with a handful of people
- `stullatlas.app` — Public launch site (goes live ~March 18, one week before NCECA)

**Timeline:**
| Date | Milestone |
|------|-----------|
| Now → Mar 1 | Dev builds at `/rje/dev` for preview. Share URL with trusted testers. |
| Mar 1–14 | Lock features, fix bugs, polish UX for NCECA demo. |
| ~Mar 14 | Complete: QR code, og-image, analytics, Stripe integration, permission emails. |
| ~Mar 18 | **Go live:** promote dev build to `stullatlas.app` root. Remove or redirect `/rje/dev`. |
| Mar 25–27 | NCECA Resource Hall — live demos, handout cards with QR → stullatlas.app. |

**Deploy commands:**
```
npm run deploy:dev           # → stullatlas.app/rje/dev  (dev preview)
npm run deploy               # → stullatlas.app/         (production, go-live)
```

---

## v3.6 — The Walk
*"How do I get from my glaze to that one?"*

The bridge between *seeing* a glaze you want and *making* it at your bench.

### v3.6.0 — UMF Delta Display
- [ ] "Walk Toward" button on each nearby glaze
- [ ] Shows per-oxide delta: `ΔUMF = target - source` as colored +/- bars
- [ ] Delta view highlights which oxides need to increase/decrease
- [ ] Side-by-side UMF comparison (source | delta | target) with fingerprint visuals

### v3.6.1 — Interpolation Path
- [ ] Slider: 0% → 100% "how far toward the target"
- [ ] Animated dot moves along the interpolation line in 3D
- [ ] At each slider position, show the interpolated UMF values
- [ ] Surface prediction overlay updates: "at 40% you enter matte territory"
- [ ] Dotted path line in 3D from source to target

### v3.6.2 — Recipe Suggestions
- [ ] Map oxide deltas → material adjustments using material database
- [ ] "Add 4% whiting, reduce silica by 2%" recipe change hints
- [ ] Constrained optimization: find minimum material changes to reach target UMF
- [ ] Show confidence level (how well the material set can express the target)

**Technical notes:**
- Requires oxide→material inverse mapping (constrained least-squares or LP)
- Material database already in `data/materials/`
- Surface prediction from v3.4 feeds into "what surface will this be at step X?"

### v3.6.3 — Wet Blending Calculator
*Henry Crissman feedback (Jan 2025): "potters blend at the bucket, not the spreadsheet"*

- [ ] Mix finished glazes by weight/volume ratio (e.g., 60% celadon + 40% tenmoku)
- [ ] Compute resulting UMF as weighted average of input glazes' UMFs
- [ ] Multi-glaze blend support: 2, 3, or n-way wet blends
- [ ] Show blended point on Stull chart with interpolation line/region
- [ ] Side-by-side: source glazes + blended result with UMF fingerprints
- [ ] Surface prediction for the blended result
- [ ] Blend series: sweep a ratio range (10/90, 20/80, ... 90/10) and show trajectory
- [ ] "What ratio gives me matte?" — search along the blend line for surface transitions

**Technical notes:**
- Different from dry blending (simplex.ts) which interpolates material recipes
- Wet blending operates on finished UMFs: `resultUMF[oxide] = Σ(weight_i × UMF_i[oxide])`
- Existing `interpolateRecipes()` in simplex.ts does ingredient-level interpolation — wet blending needs a UMF-level equivalent
- Consider weight vs. volume corrections (specific gravity differences between glazes)
- Both wet AND dry blending needed (Henry was explicit: "We need to do both.")

### v3.6.4 — Flux Ratio Controls
*Henry Crissman feedback: "the flux axes should adjust to each other — and you need per-element ratios"*

- [ ] Flux ratio as first-class plottable axis (not just a color-by option)
- [ ] Interactive flux ratio control: adjusting one flux axis updates the others proportionally
- [ ] Per-element flux breakdown: individual oxide ratios (Na₂O:K₂O, CaO:MgO, BaO:SrO)
  instead of only lumped R2O:RO
- [ ] Flux triangle visualization: R2O / RO / B2O3 as ternary axes
- [ ] Click any flux ratio axis → chart re-orients with that ratio as primary dimension
- [ ] Ratio presets: "Alkali balance" (Na₂O:K₂O), "Alkaline earth" (CaO:MgO), "Total flux" (R2O:RO)

**Technical notes:**
- R2O:RO already computed in `glazeStore.ts` line 197-210 (`Li2O+Na2O+K2O / RO`)
- Currently `fluxRatio` is a single number → need to decompose into individual ratios
- Per-element ratios are more powerful: two glazes with same R2O:RO can behave very differently
  if one is Na₂O-dominant vs K₂O-dominant
- Ternary plot could use Plotly's `scatterternary` trace type
- This is what Henry means by "5 dimensions" — multiple lenses into the same data, each
  revealing different structure

---

## v3.7 — The Constellations
*"Navigate by aesthetic family, not oxide numbers."*

Auto-discover and name the glaze families that already exist in the data.

### v3.7.0 — Cluster Detection & Naming
- [ ] Run DBSCAN clustering on full dataset (code exists in `analysis/clustering.ts`)
- [ ] Auto-name clusters from Glazy `glazeTypeId` labels: "Celadon Territory," "Tenmoku Belt"
- [ ] Unlabeled clusters described by chemistry: "High-Calcium Mattes," "Boron Glosses"
- [ ] Constellation stats: typical cones, surface types, oxide ranges, point count
- [ ] **Fuzzy grouping** — soft cluster boundaries with probabilistic membership
  (Henry Crissman: glazes at boundaries belong to multiple families simultaneously)
- [ ] Gradient boundaries instead of hard edges: 80% celadon / 20% tenmoku territory
- [ ] Overlap regions highlighted as "transition zones" — these are the interesting spots
- [ ] Membership confidence score per glaze per constellation

### v3.7.1 — Visual Overlays
- [ ] Translucent boundary polygons on the Stull chart (2D convex hull or contour)
- [ ] 3D: boundary volumes or floor-projected regions
- [ ] Color-coded by dominant surface type
- [ ] "Nearest constellation" badge on every glaze in the detail panel

### v3.7.2 — Constellation Navigation
- [ ] Click a constellation → filter to its members
- [ ] Constellation picker dropdown: browse all families
- [ ] "Explore this family" → enables proximity centered on the cluster centroid
- [ ] Representative images from each constellation in the picker (v3.5 thumbnails)
- [ ] Constellation comparison: side-by-side stats for two families

**Technical notes:**
- DBSCAN already implemented with adjustable ε and minPts
- ~35 glaze types in Glazy data with human names
- Need convex hull or alpha-shape for boundary rendering

---

## v3.8 — The Knowledge Graph
*"Glazes connected by meaning — not just distance."*

This is the knowledge visualization Ryan imagined. Glazes as nodes, relationships
as edges, the whole dataset as a navigable graph you can fly through.

### v3.8.0 — Relationship Engine
- [ ] Define edge types: "chemically similar," "same family," "same cone," "same surface," "same materials"
- [ ] Pre-compute relationship graph for entire dataset (sparse — top 5 neighbors per glaze)
- [ ] Store as adjacency list, lazy-load subgraphs on exploration
- [ ] Edge weight = inverse weighted distance (from Aesthetic Compass)

### v3.8.1 — Graph Visualization
- [ ] New view mode: "Graph" alongside 2D and 3D
- [ ] Force-directed layout (d3-force or custom WebGL)
- [ ] Nodes = glazes (circle with thumbnail photo inside)
- [ ] Edges = colored by relationship type
- [ ] Click node → center, expand neighbors, show detail
- [ ] Breadcrumb trail works across graph view
- [ ] Smooth animated transitions: drilldown, expand, collapse

### v3.8.2 — Visual Graph Browsing
- [ ] Node size reflects importance (number of similar glazes / user interest)
- [ ] Cluster halos from v3.7 constellations
- [ ] Zoom semantics: zoom out → constellations visible, zoom in → individual nodes
- [ ] Photo previews on hover (glassmorphism card)
- [ ] Keyboard: arrow keys to walk the graph, Enter to select
- [ ] "Fly to" search: type a name, camera zooms to that node

### v3.8.3 — Exploration History
- [ ] Persist exploration paths (Supabase for web, localStorage for Studio)
- [ ] Visualize as highlighted trail on the graph
- [ ] Time-lapse playback: watch your aesthetic journey unfold
- [ ] Share exploration paths as URLs
- [ ] "You've explored 4 constellations, visited 47 glazes, walked 12 paths"

**Technical notes:**
- Force layout at 8K+ nodes needs WebGL (canvas too slow)
- Consider pre-computing layout positions server-side
- Photo-in-node: circular clip-path on `<image>` elements or WebGL texture atlas
- This is the capstone feature — everything builds to this

---

## v3.9 — The Controls
*"Turn the keyboard into an instrument for navigating glaze space."*

Every spatial tool worth mastering has a dedicated input scheme. Stull Atlas
is no longer a chart viewer — it's a landscape you walk through. The controls
should feel like a physical control surface, not a list of menu clicks.

**Philosophy:** Mouse-only always works for beginners. Keyboard unlocks speed
for power users. Mouse+key combos unlock expert features. Studio (Tauri
desktop) gets the full set; web edition gets ~70% (browser reserves some keys).

### v3.9.0 — Spatial Navigation Keys
- [ ] `W` / `A` / `S` / `D` — Orbit camera (3D) or pan (2D)
- [ ] `Q` / `E` — Roll / tilt horizon
- [ ] `Scroll` — Zoom in/out
- [ ] `Middle-drag` — Free orbit
- [ ] `Shift+Scroll` — Precision zoom (slower)
- [ ] `Space` — Reset view to home position
- [ ] `F` — Focus: zoom to selected glaze + show neighbors
- [ ] Modifier awareness: keys do different things by context (detail open, lightbox, etc.)

### v3.9.1 — Exploration Shortcuts
- [ ] `Click` — Select glaze
- [ ] `Double-click` — Select + fly camera to it
- [ ] `Right-click` — Context menu (Walk Toward, Compare, Add to recipe…)
- [ ] `Hover + T` — Teleport: fly camera to hovered glaze
- [ ] `N` — Toggle nearby list
- [ ] `G` — Toggle gallery mode
- [ ] `B` — Drop breadcrumb / bookmark current glaze
- [ ] `← →` — Carousel prev/next (when detail panel open)
- [ ] `L` — Open lightbox
- [ ] `Esc` — Close lightbox / deselect / back one level

### v3.9.2 — Analysis & Overlay Toggles
- [ ] `1`–`5` — Switch Aesthetic Compass preset
- [ ] `H` — Toggle surface prediction heatmap
- [ ] `P` — Toggle proximity sphere
- [ ] `C` — Toggle constellations overlay (v3.7)
- [ ] `Ctrl+Click` — Multi-select (compare mode)
- [ ] `Shift+Click` — "Walk Toward" — start interpolation path (v3.6)

### v3.9.3 — Mouse+Key Power Combos
- [ ] `Alt+Click` — Anchor: set reference point, all distances relative to it
- [ ] `Alt+Drag` — Lasso select region
- [ ] `Ctrl+Scroll` — Adjust proximity radius live
- [ ] `Shift+Hover` — Peek: show mini detail card without selecting
- [ ] `Ctrl+Drag` — Draw interpolation path manually between two points

### v3.9.4 — Help & Discoverability
- [ ] `?` key → fullscreen shortcut overlay (like Gmail/GitHub)
- [ ] Shortcut hints on tooltips ("Press T to teleport here")
- [ ] Progressive disclosure: track which shortcuts the user has discovered
- [ ] Printable keyboard reference card (PDF export for potters to pin by their monitor)
- [ ] Studio vs. Web indicator: grayed-out keys that only work in desktop edition

**Technical notes:**
- Use `useEffect` + `keydown`/`keyup` listeners with context-aware dispatch
- Prevent default only for keys we claim — don't break browser shortcuts
- Tauri can capture `Ctrl+W`, `Ctrl+N`, etc. that browsers reserve
- Key bindings stored in user preferences (Zustand) — customizable later
- Modal state machine: `idle` → `detail-open` → `lightbox` → determines key behavior
- Mouse combos need `mousedown` + modifier key tracking (not just `click`)

---

## v3.10 — The Studio
*"Your bench, your materials, your journey."*

### v3.10.0 — Material Substitution
- [ ] Pick a material in your recipe → see available substitutes
- [ ] Show UMF shift as arrow on Stull chart
- [ ] Color-code arrows by predicted surface change
- [ ] "Still in matte territory? ✓" confirmation

### v3.10.1 — Recipe Bridge (Bidirectional)
- [ ] Live sync: edit recipe ↔ watch point drift on chart
- [ ] Click any point on chart → snap to nearest achievable recipe
- [ ] "Cost of distance" — how much recipe change is needed to reach each neighbor

### v3.10.2 — Region Annotations
- [ ] Users can tag regions with notes
- [ ] Notes as floating markers on the chart
- [ ] Shared annotations for community collaboration (future)

---

## v3.11 — The Laboratory
*"Predict what happens before you fire."*

Physics-based and empirical calculation engines that turn UMF numbers
into actionable predictions. Every tool answers a question a potter asks
before loading the kiln.

### v3.11.0 — Glaze-Body Fit Calculator
*Item a potter asks most: "will this craze on my clay?"*

- [ ] Input: glaze UMF (from recipe or explorer) + clay body COE (or body recipe)
- [ ] Appen-factor COE for glaze, tabulated or calculated COE for body
- [ ] Numeric mismatch score: COE_glaze − COE_body → crazing risk (positive) or shivering risk (negative)
- [ ] Visual gauge: green/yellow/red zones with threshold annotations
- [ ] Common body presets: cone 6 porcelain, cone 10 stoneware, cone 06 earthenware, etc.
- [ ] "Safe zone" overlay on the Stull chart: shaded region where COE is compatible with selected body
- [ ] Reverse mode: given a body, show which glazes in the database are compatible

### v3.11.1 — Thermal Property Curves
*Full COE, Tg, and liquidus — not single numbers, but curves.*

- [ ] **Thermal Expansion Curve** — COE vs temperature (25–600°C) using Winkelmann-Schott or Priven model
  - Each oxide contributes differently at different temperature ranges
  - Interactive: hover the curve to see COE at any temperature
  - Overlay: plot multiple glazes' expansion curves for comparison
- [ ] **Liquidus Temperature** — Phase diagram lookup (SiO₂-Al₂O₃-flux ternary)
  - Gan-Shafer or Bottinga-Weill empirical model for multicomponent silicates
  - More accurate than the linear melt estimate in `meltEstimate.ts`
  - Show the liquidus surface as a contour overlay on the Stull chart
- [ ] **Glass Transition Temperature (Tg)** — Priven's model
  - When the glaze actually freezes → impacts annealing, thermal shock resistance
  - Input: UMF → output: estimated Tg in °C
  - Compare Tg across a blend series ("these 21 triaxial points have Tg from 580–650°C")

### v3.11.2 — Viscosity & Flow Model
*Not just "will it run" — the full flow curve.*

- [ ] Temperature-dependent viscosity using Giordano-Russell (2008) or Fluegel (2007) models
- [ ] Plot: log₁₀(viscosity) vs temperature for a given UMF
- [ ] Key thresholds annotated: softening point, flow point, working range, seal point
- [ ] Crawling risk: viscosity too high at maturation → glaze beads up instead of smoothing
- [ ] Running risk: viscosity too low at maturation → glaze flows off vertical surfaces
- [ ] Overlay multiple glazes for comparison ("the celadon is 10× stiffer than the tenmoku at 1260°C")
- [ ] Blend explorer integration: show viscosity gradient across a triaxial blend

### v3.11.3 — Surface Energy & Crawl Prediction
*Why does this glaze crawl on this clay?*

- [ ] Dietzel field-strength model → surface tension estimate (dyn/cm)
- [ ] Wetting angle approximation from surface tension vs substrate energy
- [ ] Crawl risk score: 0 (no risk) → 10 (certain crawl)
- [ ] Factors displayed: high Al₂O₃ + low flux → stiff melt → crawl-prone
- [ ] MgO contribution highlighted (MgO raises surface tension more than CaO)
- [ ] Recommendations: "Reduce Al₂O₃ by 0.05 or add 0.1 more CaO to reduce crawl risk"

### v3.11.4 — Defect Prediction Suite
*Three firing defects predicted from chemistry.*

- [ ] **Crystallization Probability**
  - Zinc-silicate crystallization: f(ZnO, SiO₂, cooling rate)
  - Calcium-borate devitrification: f(CaO, B₂O₃, Al₂O₃)
  - Titanium crystallization (rutile/anatase): f(TiO₂, flux ratio)
  - Score: 0–1 probability, with "intentional crystal" vs "defect crystal" framing
  - Cooling rate input: fast cool (suppress) vs slow cool (encourage)
- [ ] **Volatilization Risk**
  - Per-oxide volatilization threshold temperatures
  - Na₂O, K₂O above cone 8; B₂O₃ above cone 6; PbO above cone 02; ZnO above cone 9
  - Flag: "Your 0.45 B₂O₃ at cone 10 will lose ~30% of its boron to the kiln atmosphere"
  - Impact on final UMF: show pre-fire vs estimated post-fire chemistry
- [ ] **Carbon Trap Score**
  - Likelihood based on early melt temperature vs body organics burnout
  - High-boron low-fire glazes that seal early → trap carbon → gray spots
  - Score + mitigation: "Longer bisque or slower ramp through 800–1000°C"

### v3.11.5 — Color & Atmosphere Prediction
*"Will this be green or brown?"*

- [ ] **Atmosphere Prediction**
  - Iron (Fe₂O₃): oxidation → amber/brown; reduction → celadon green/blue
  - Copper (CuO): oxidation → green/turquoise; reduction → red/ox-blood
  - Manganese: oxidation → purple/brown; reduction → brown/metallic
  - Cobalt: relatively atmosphere-stable → blue in both
  - Output: expected color description + hex swatch for ox and reduction
- [ ] **Color Prediction Model**
  - Inputs: colorant oxide concentrations + base chemistry (CaO, MgO, ZnO affect color)
  - Base chemistry influence: CaO mutes iron color, MgO yields olive tones, ZnO brightens
  - Cone influence: underfired colorants look different than fully developed ones
  - Confidence level: "high" for simple systems (1 colorant), "rough estimate" for complex
  - Visual: predicted color swatch beside each blend point in triaxial results

### v3.11.6 — Oxide Contribution Breakdown
*"Why is my COE so high?" — a waterfall chart that shows you.*

- [ ] For any calculated property (COE, viscosity, NBO/T, optical basicity, durability, etc.):
  - Waterfall chart: starting value → each oxide's contribution → final value
  - Bar color = oxide color from the standard palette
  - Hover: "Na₂O contributes +13.3 to your thermal expansion (33.3 × 0.40 = 13.3)"
- [ ] Material-level breakdown: which raw material is responsible?
  - "Nepheline syenite accounts for 62% of your combined alkali"
- [ ] Sensitivity bars: "Removing 5% feldspar drops COE by 4.2 units"
- [ ] Integrates with Response Surface analysis (already in `responseSurface.ts`)

### v3.11.7 — Limit Formula Generator
*Interactive visual tool for "what range should I aim for?"*

- [ ] Select target cone + desired surface type → generate UMF envelope
- [ ] Visual: limit rectangles on the Stull chart (already rendered in StullPlot.tsx)
  - But now interactive: adjust cone, surface, and watch limits reshape
- [ ] Per-oxide range sliders: narrow the envelope to your preferences
- [ ] "X% of glazes in the database fall within your limits" — validation score
- [ ] Export limits as JSON or print as reference card
- [ ] Reverse validation: paste a UMF → instantly see which cone/surface limits it satisfies
- [ ] Data source: existing `CONE_LIMITS` in validation.ts + computed from database statistics

### v3.11.8 — Batch Calculator
*Recipe → actual weights for a batch size.*

- [ ] Input: recipe (% by weight) + target batch size (grams, kg, or lb)
- [ ] Output: per-material weight in selected units
- [ ] Water addition calculator: target specific gravity → water volume
- [ ] Deflocculated vs raw: calculate Darvan/sodium silicate additions
- [ ] Sieve waste factor: add 5–10% for sieve losses
- [ ] Multi-batch: "I need 3 batches of 5000g" → total material shopping list
- [ ] Material inventory tracking: "You need 2.4 kg of EPK — do you have enough?"
- [ ] Print-friendly batch sheet with recipe name, date, notes field

### v3.11.9 — LOI Calculator
*Loss on Ignition from material composition.*

- [ ] Per-material LOI from database (theoretical from formula or measured)
- [ ] Recipe total LOI: weighted sum of material LOIs
- [ ] Dry weight → fired weight estimate for batch planning
- [ ] LOI breakdown: which materials contribute most gas/shrinkage?
- [ ] Bubble risk: high LOI materials + early melt → pinholing/crawling path
- [ ] Temperature profile: when does each material release its volatiles?

### v3.11.10 — Recipe Comparison
*Side-by-side delta between any two glazes.*

- [ ] Select two glazes (from explorer, recipe database, or manual entry)
- [ ] Table: oxide-by-oxide ΔUMF with colored bars (+ green / − red)
- [ ] Radar chart: overlay two UMF fingerprints for visual comparison
- [ ] Derived deltas: ΔCOE, Δflux ratio, Δviscosity index, ΔSi:Al ratio
- [ ] "How far apart?" — Euclidean distance in UMF space + Aesthetic Compass distance
- [ ] Material-level diff: if both are recipes, show ingredient-by-ingredient differences
- [ ] "What would it take?" — link to v3.6 Walk for interpolation path between them

### v3.11.11 — Substitution Finder
*"I can't get Custer Feldspar — what do I use instead?"*

- [ ] Select a material in a recipe → see chemically similar alternatives from database
- [ ] UMF delta for each substitute: "Minspar has 0.02 more Na₂O, 0.01 less K₂O"
- [ ] Auto-adjust: optimizer suggests compensating changes to other ingredients
- [ ] One-click swap: replace material and recalculate entire UMF
- [ ] Show Stull chart shift: arrow from old position to new position
- [ ] Availability filter: mark which materials you have in your studio
- [ ] Cross-references v3.10.0 Material Substitution for chart visualization

---

## v4.1 — The Community
*"A living document of collective ceramic knowledge."*

### v4.1.0 — User Profiles & Personal Database
*Henry Crissman feedback: "everyone should have their own page and database of stuff"*

- [ ] Auth integration (Supabase already wired)
- [ ] **Personal potter profile page** — each user gets their own space
- [ ] Personal recipe database — save all your glazes, recipes, notes in one place
- [ ] Save and name exploration paths
- [ ] Upload your own test tile photos
- [ ] Personal glaze library with tagging and search
- [ ] Import/export recipes (CSV, JSON, Glazy format)
- [ ] Private by default, share selectively

### v4.1.1 — Free Tier & Onboarding
*Strategy: free for everyone initially to build traction (Henry: "make it useful first")*

- [ ] No paywall at launch — full access for early adopters
- [ ] Usage analytics to understand what features potters actually use
- [ ] Feedback mechanism built in ("What's missing? What's confusing?")
- [ ] Generous free tier retained permanently (core exploration always free)
- [ ] Premium features (TBD): bulk export, advanced blend calculator, priority data sync

### v4.1.2 — Social Exploration
- [ ] Share exploration paths as URLs
- [ ] "X potters explored this region this week"
- [ ] Community annotations on the Stull chart
- [ ] Federated glaze database — your private glazes on the public chart

---

## Maintenance & Agent Actions

*Standing tasks the agent should evaluate and act on when triggers are met.
These are not versioned features — they're hygiene items that keep the codebase
healthy as features ship. The agent may execute any of these autonomously
when the trigger condition is true.*

### Component Extraction
| Action | Trigger | Details |
|--------|---------|---------|
| ~~Extract `<NearbyList>` component~~ | ~~`index.tsx` > 1600 lines~~ | **DONE** — `NearbyList.tsx` (317 lines), `index.tsx` down to 1177 lines. |
| ~~Extract `<ImageCarousel>` component~~ | ~~When `<NearbyList>` is extracted~~ | **DONE** — `ImageCarousel.tsx` (177 lines) + `carouselUtils.ts` (pure helpers). |

### Image Resilience
| Action | Trigger | Details |
|--------|---------|---------|
| ~~Add `onError` fallback to all `<img>` tags~~ | ~~Any new `<img>` added without it~~ | **DONE** — All `<img>` tags have `onError` fallbacks showing placeholder. |
| Validate image URLs at load time | Before next Gallery enhancement | Scan `glazes` Map on load, flag entries where `images[0]` returns 404. Cache results in sessionStorage. Log count to console. |

### Performance
| Action | Trigger | Details |
|--------|---------|---------|
| ~~Memoize `glazes.get()` lookups in nearby list~~ | ~~Nearby list renders > 50 items~~ | **DONE** — Single-pass `nearbyGlazes` Map via `useMemo`, eliminates 5+ redundant lookups per render. |
| Bundle size check | Before any new dependency added | Run `npx vite-bundle-visualizer` and compare against last snapshot. Plotly already dominates — new deps should add < 50 KB gzipped. |
| ~~Dead CSS audit~~ | ~~After extracting NearbyList~~ | **DONE** — Removed `.proximity-axis-label` orphan class. |

### Accessibility & UX
| Action | Trigger | Details |
|--------|---------|---------|
| ~~Mobile breakpoints for gallery~~ | ~~Before any public demo on mobile~~ | **DONE** — Gallery grid 2-wide at 768px, 1-wide at 480px. Carousel buttons always visible on mobile. Lightbox full-viewport. |
| ~~Keyboard nav for gallery grid~~ | ~~Before v3.6 ships~~ | **DONE** — Arrow keys navigate gallery cards (grid-aware) and list items. Enter selects, Home/End jump. Focus ring visible via `:focus-visible`. `role="listbox"`/`role="option"` ARIA. |
| ~~Carousel boundary tests~~ | ~~Next test-writing session~~ | **DONE** — 25 unit tests in `carouselUtils.test.ts`: wrapIndex, safeIndex, stepZoom, isFormElement. |

### Data Quality
| Action | Trigger | Details |
|--------|---------|---------|
| Re-scrape Glazy for image URLs | When Gallery is demoed / marketed | Only ~13 glazes currently have images. A targeted scrape of Glazy photo pages would unlock the Gallery's full potential. Coordinate with `data/glazes/` loaders. |
| Audit `GlazeRecipe` type coverage | Before v3.7 Constellations | Ensure all fields used by clustering, similarity, and gallery are typed and non-optional where expected. |

---

## Version Summary

| Version | Codename | Core Idea | Status |
|---------|----------|-----------|--------|
| **3.4** | The Compass | Weighted search + surface prediction | ✅ Shipped |
| **3.5** | The Gallery | Photos in exploration, visual browsing | ✅ Shipped |
| **3.6** | The Walk | Recipe interpolation, wet blending, flux ratios | 📋 Planned |
| **3.7** | The Constellations | Auto-named glaze families, fuzzy grouping | 📋 Planned |
| **3.8** | The Knowledge Graph | Visual graph navigation with photos | 🌟 Vision |
| **3.9** | The Controls | Keyboard/mouse navigation instrument | 📋 Planned |
| **3.10** | The Studio | Material substitution, bidirectional recipe | 📋 Planned |
| **3.11** | The Laboratory | Physics-based prediction engines, batch tools | 📋 Planned |
| **4.1** | The Community | Personal profiles, shared knowledge, free tier | 🔮 Future |

## Architecture Principle

Each version builds on the last:
```
v3.4 Compass    → defines "similar" (distance function)
v3.5 Gallery    → shows what "similar" looks like (photos)
v3.6 Walk       → shows how to get there (recipe delta, wet blending, flux lenses)
v3.7 Families   → groups of "similar" become named places (fuzzy boundaries)
v3.8 Graph      → the places become a navigable world
v3.9 Controls   → the world responds to your hands
v3.10 Studio    → the world connects back to the bench
v3.11 Laboratory → predict what happens before you fire
v4.1 Community  → every potter gets their own page + shared knowledge
```

Each layer is independently valuable. Ship each one, prove it works, then build the next.

## Competitive Moat

| Feature | Glazy | Digitalfire | Insight | Stull Atlas |
|---------|-------|-------------|---------|-------------|
| Recipe calculator | ✓ | ✓ | ✓ | ✓ |
| UMF display | ✓ | ✓ | ✓ | ✓ |
| Stull chart | - | static | - | **interactive 3D** |
| Weighted similarity | - | - | - | **v3.4 ✅** |
| Surface prediction | - | - | - | **v3.4 ✅** |
| Photo exploration | list | - | - | **v3.5** |
| Recipe interpolation | - | - | - | **v3.6** |
| Glaze families | tags | - | - | **v3.7** |
| Knowledge graph | - | - | - | **v3.8** |
| Material substitution | - | manual | - | **v3.10** |
| Crazing/fit prediction | - | basic | basic | **v3.11** |
| Viscosity modeling | - | - | - | **v3.11** |
| Color prediction | - | - | - | **v3.11** |
| Batch calculator | ✓ | ✓ | ✓ | **v3.11** (richer) |
| Defect prediction | - | - | - | **v3.11** |
| Shared exploration | - | - | - | **v4.1** |

**No one is building this.** Not Glazy (social-first, no spatial understanding),
not Digitalfire (reference-first, no interactivity), not Insight (desktop-only calculator).

We're building the first tool where you can SEE what a glaze looks like, UNDERSTAND
where it lives in chemistry space, and WALK toward what you want to make.

*That's not a feature. That's a new way to learn ceramics.*
