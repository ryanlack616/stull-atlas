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

## v3.5.1 — The Instruments
*"67 ways to look at a glaze — then 120."*

The Z-axis of the 3D Stull chart is a microscope with interchangeable lenses.
Each computed axis reveals a different truth about a glaze's chemistry, physics,
or practical fitness. This plan expands from 40 options (23 oxides + 17 computed)
to ~120 options across 14 categories, in 7 implementation phases.

**Architecture:** All axes compute through the single `computeZFromUMF()` helper
in `StullPlot3D.tsx`. Each phase adds new `ZAxisOption` union members, switch cases,
constant tables, labels, and UI `<optgroup>` entries.

### Phase A — High-Impact Structural Metrics (6 axes)
*Additive models, published lookup tables, straightforward arithmetic.*

- [ ] `asi` — **Alumina Saturation Index**: Al₂O₃ / (Na₂O + K₂O + Li₂O + CaO)
  - ASI < 1 = peralkaline (glossy, fluid); ASI > 1 = peraluminous (matte, crystallization)
  - Maps directly to the gloss/matte boundary on the Stull chart
- [ ] `refractive_index` — **Refractive Index** (Appen): Σ xᵢ·nᵢ over mol% fractions
  - Factors: SiO₂=1.458, Al₂O₃=1.52, Na₂O=1.59, CaO=1.73, BaO=1.93, TiO₂=2.08, PbO=1.96
  - Observable optical property — brilliance, luster
- [ ] `density` — **Glass Density** (Appen molar volume): Σ(xᵢ·Mᵢ) / Σ(xᵢ·Vᵢ)
  - Molar volumes: SiO₂=25.7, Al₂O₃=34.1, Na₂O=19.5, CaO=13.0, MgO=12.8, BaO=22.9, ZnO=11.5, PbO=23.0 cm³/mol
  - Measurable physical check, affects application thickness, glaze-body fit
- [ ] `crawl_risk` — **Crawl Risk**: surface_tension × fluxTotal / (SiO₂ + Al₂O₃)
  - High surface tension + low viscosity = bead-up; ZnO-heavy glazes flag high
- [ ] `craze_risk` — **Crazing Risk** (vs body): COE_glaze − COE_body(cone)
  - Body COE by cone range: earthenware ~70, stoneware ~55, porcelain ~45 (×10⁻⁷/°C)
  - Positive = crazing, negative = compression (shivering if extreme)
- [ ] `fluidity` — **Melt Fluidity Index**: flux-effectiveness-weighted sum / (SiO₂ + Al₂O₃)
  - Weights: Li₂O×3.0, B₂O₃×2.5, Na₂O×2.0, K₂O×1.5, ZnO×1.2, CaO×1.0, BaO×0.8, MgO×0.6
  - More nuanced than viscosity_index — accounts for differential flux power

### Phase B — Classification & Prediction (6 axes)
*Semi-empirical composites, still arithmetic on UMF.*

- [ ] `matteness` — **Matteness Predictor**: ASI + 0.5(MgO + ZnO + BaO) − 0.3(alkali)
  - Combines alumina saturation with mattifying oxides; high = likely matte
- [ ] `boron_ratio` — **Boron Glass-Former Ratio**: B₂O₃ / (B₂O₃ + SiO₂)
  - Explains why two Stull-identical glazes look different: boron substitution for silica
- [ ] `comp_entropy` — **Compositional Entropy**: Shannon H over ALL oxides (not just fluxes)
  - Whole-formula complexity; simple 3-oxide vs complex 10-oxide glazes separate clearly
- [ ] `excess_alkali` — **Excess Alkali** (Free Modifier): (Na₂O + K₂O + Li₂O) − Al₂O₃
  - Positive = free alkali (glossy, fluid, less durable); negative = peraluminous; predicts stability
- [ ] `knao_equivalent` — **KNaO Equivalent**: Li₂O×1.87 + Na₂O + K₂O×0.66
  - Unified alkali "dose" normalized to Na₂O-equivalent based on ionic radius / field strength
- [ ] `leach_risk` — **Leaching Risk** (Food Safety): (PbO + BaO + CuO) / (SiO₂ / R₂O)
  - Toxic oxide concentration ÷ glass stability; flags food-safety hazards

### Phase C — Glass Physics (5 axes)
*Published additive models with full coefficient tables.*

- [ ] `youngs_modulus` — **Young's Modulus** (Makishima-Mackenzie 1973): E = 2·Vₜ·Gₜ
  - Vₜ = packing density from ionic radii; Gₜ = dissociation energy density from bond energies
  - Published Vᵢ and Gᵢ for all common oxides; stiffness / scratch resistance
- [ ] `hardness` — **Vickers Hardness** (Yamane-Mackenzie): Hᵥ = (1−2ν)E / 6(1+ν)
  - Derived from Young's modulus and Poisson's ratio; practical abrasion resistance
- [ ] `poisson_ratio` — **Poisson's Ratio**: ν ≈ 0.5 − 1/(7.2·Vₜ)
  - Lateral vs axial strain; low = brittle, high = ductile
- [ ] `tg_estimate` — **Est. Glass Transition** (Priven): Σ xᵢ·Tg,ᵢ  (°C)
  - Factors: SiO₂≈1480K, Al₂O₃≈1170K, Na₂O≈550K, CaO≈1040K, MgO≈760K, B₂O₃≈530K, BaO≈900K, ZnO≈730K
  - Where the glaze freezes on cooling; annealing, thermal shock relevance
- [ ] `thermal_shock` — **Thermal Shock Resistance**: R = σ(1−ν)/(E·α)
  - Assumed fracture strength + computed E, ν, α; ovenware metric

### Phase D — Advanced Glass Science (5 axes)
*Topological constraint theory, Q-speciation, thermodynamics.*

- [ ] `mean_coordination` — **Mean Coordination ⟨r⟩**: weighted average of cation coordination numbers
  - Si=4, Al=4(if charge-balanced), B=3or4, Na=6, Ca=6, etc.
  - Fundamental structural parameter; 4 = tetrahedral network, 6 = depolymerized
- [ ] `constraints_per_atom` — **Constraints/Atom** (Phillips-Thorpe-Mauro): nₛ = r/2 + (2r−3) per cation
  - nₛ = 3 → isostatic "perfect glass" (Corning's Gorilla Glass design principle)
  - < 3 = floppy (soft, flows easily), > 3 = stressed-rigid (brittle, crystallization-prone)
- [ ] `q4_fraction` — **Q⁴ Fraction** (full polymerization): from NBO/T + disproportionation K≈0.01
  - How much glass is fully cross-linked silica; correlates with durability, stiffness
- [ ] `q2_fraction` — **Q² Fraction** (chain structures): from NBO/T + disproportionation K
  - Chain-like = metasilicates = tendency to devitrify as wollastonite/enstatite
- [ ] `liquidus_estimate` — **Est. Liquidus Temperature** (Kalmanovitch-Frank polynomial, °C)
  - Temperature where last crystal dissolves; originally for coal ash (= crude glaze)
  - Above this = homogeneous melt; below = crystals nucleate

### Phase E — Exploratory Physical (5 axes)
*Semi-quantitative, interesting visualizations.*

- [ ] `devit_index` — **Devitrification Index**: ASI × (CaO + 1.5MgO + 2ZnO) / (flux_entropy + 0.1)
  - Predicts crystal mattes, aventurine, willemite; high = slow-cool crystallization likely
- [ ] `hydration_energy` — **Free Energy of Hydration**: Σ xᵢ·ΔGᵢ (kJ/mol)
  - More rigorous durability than SiO₂/alkali; accounts for each oxide's water reactivity
- [ ] `modifier_fraction` — **Network Modifier Fraction**: modifier moles / total moles
  - Above ~0.16–0.20 = Greaves percolation threshold → connected modifier channels → leaching jump
- [ ] `fragility_index` — **Angell Fragility** (est.): from VFT parameters
  - Strong m≈20 (gradual viscosity change) vs fragile m≈60+ (sudden freeze); predicts crystal formation on slow cooling
- [ ] `fe_redox_estimate` — **Fe³⁺/Fe²⁺ Estimate**: f(optical basicity, T)
  - Duffy (1993): log(Fe³⁺/Fe²⁺) = a·Λ + b + c/T; predicts iron color (amber→blue-green)
  - Requires cone→temperature conversion

### Phase F — Temperature-Dependent & Atmosphere-Aware (8 axes)
*Unlocked by converting cone → Kelvin via Orton lookup table.*

- [ ] `firing_temp_c` — **Firing Temperature** (°C): Orton cone chart standard conversion
  - Foundation for all temperature-dependent calculations below
- [ ] `grd_viscosity` — **GRD Viscosity at Firing T** (Giordano-Russell-Dingwell 2008): log₁₀(η) = A + B/(T−C)
  - A, B(x), C(x) are multicomponent polynomial functions of mol%; actual Pa·s
  - Published for SiO₂, TiO₂, Al₂O₃, FeO(T), MnO, MgO, CaO, Na₂O, K₂O, P₂O₅, H₂O, F
- [ ] `liquidus_overshoot` — **Liquidus Overshoot**: T_firing − T_liquidus (°C)
  - Positive = fully melted; negative = crystals survive; single most predictive melt indicator
- [ ] `working_range` — **Working Range**: T(10⁴ Pa·s) − T(10⁷·⁶ Pa·s) (°C)
  - Wide = forgiving kiln schedule; narrow = must hit temperature exactly
- [ ] `heatwork_excess` — **Heatwork Excess**: cone_fired − cone_implied_by_chemistry
  - Over-fired for chemistry = running, boiling; under-fired = incomplete melt
- [ ] `volatilization_index` — **Volatilization Index**: Σ(volatile_oxide × T_firing / T_critical)
  - Per-oxide thresholds: Na₂O/K₂O >1200°C, B₂O₃ >1100°C, PbO >800°C, ZnO >1250°C, F >900°C
  - High = significant mass loss; the out-of-kiln glaze ≠ the batched glaze
- [ ] `fe_color_ox` — **Predicted Iron Color (Oxidation)**: f(Fe₂O₃, base chemistry, T)
  - Fe³⁺-dominant in oxidation → amber/brown/honey spectrum; encoded as hue angle
- [ ] `fe_color_red` — **Predicted Iron Color (Reduction)**: f(Fe₂O₃, basicity, T, atmosphere)
  - Fe²⁺-dominant in reduction → celadon green/blue; encoded as hue angle

### Phase G — Multi-Modal Data Axes (27 axes)
*Exploiting data fields beyond UMF chemistry — recipe, surface labels,
taxonomy, geography, time, statistics, economics.*

**Recipe / Ingredient-Derived:**
- [ ] `ingredient_count` — Number of materials in the recipe
- [ ] `frit_percentage` — Pre-melted glass fraction (frit materials / total)
- [ ] `free_silica_fraction` — Silica added as quartz vs from feldspar
- [ ] `clay_content` — Clay materials as % of recipe (EPK, ball clay, kaolin)
- [ ] `loi_estimate` — Loss on Ignition estimated from carbonates, clays, organics
- [ ] `material_diversity` — Shannon entropy of recipe ingredient weights

**Surface / Label-Derived:**
- [ ] `surface_mismatch` — Chemistry-predicted surface vs labeled surface (0 = match, 1 = contradiction)
- [ ] `surface_probability` — P(matte) from logistic boundary trained on labeled dataset
- [ ] `opacity_predictor` — f(Al₂O₃, ZrO₂, SnO₂, TiO₂, P₂O₅); compare vs labeled transparency

**Statistical / Dataset-Derived:**
- [ ] `anomaly_score` — Mahalanobis distance from centroid of same-cone glazes
- [ ] `feature_density` — k-nearest-neighbor density; dense = explored, sparse = novel
- [ ] `percentile_rank` — Position of current Z-value among all glazes at same cone
- [ ] `nearest_surface_boundary` — Distance to nearest glaze with different surface type

**Limit Formula-Derived:**
- [ ] `limit_distance` — Distance from recommended UMF envelope (negative = inside, positive = outside)
- [ ] `safety_score` — Composite of all limit checks: 1.0 = within all limits, 0.0 = violating everything

**Taxonomy-Derived:**
- [ ] `type_centroid_distance` — Distance from mean UMF of same glazeTypeId
- [ ] `nearest_type_boundary` — Distance to nearest different glaze type
- [ ] `type_confidence` — Classification confidence from simple majority-vote of k-nearest

**Temporal-Derived:**
- [ ] `recipe_age_years` — Years since createdAt
- [ ] `innovation_score` — Distance from all previously-dated recipes at time of creation

**Geographic-Derived:**
- [ ] `regional_distance` — Distance from compositional centroid of same-country glazes

**Color / Appearance-Derived:**
- [ ] `colorant_per_flux` — total_colorant / fluxTotal; effective colorant concentration in the melt

**Interaction Effects:**
- [ ] `mixed_alkali_effect` — 4 × x_Na × x_K (parabolic); max at 50:50 Na:K = property anomaly
- [ ] `boron_n4_fraction` — N4 = R/(R + S); fraction of B in tetrahedral coordination
  - Below ~16 mol% alkali boron is trigonal; above it becomes tetrahedral → different behavior

**Functional Fitness Composites:**
- [ ] `food_safety_score` — Composite: durability > threshold, PbO=0, BaO<limit, colorants<limit
- [ ] `microwave_score` — Low Fe₂O₃ + low transition metals (absorb microwave radiation → hot spots)

### Phase H — Sensitivity & Robustness (3 axes)
*The math of "fussy" vs "forgiving."*

- [ ] `robustness_score` — Maximum property swing from ±0.01 change in any single oxide
  - Numerical Jacobian of (COE, viscosity_index, NBO/T) w.r.t. all oxides; low = forgiving
- [ ] `critical_oxide` — Which single oxide causes largest property swing if mis-measured ±5%
  - Encoded numerically as index into oxide list; or as magnitude of max sensitivity
- [ ] `error_width` — Given ±2% weighing error propagated through all ingredients → ±range on COE
  - Monte Carlo (100 samples) or analytic first-order propagation; wide = unpredictable

### Dependencies & Constant Tables Needed

| Phase | New constants | Source |
|-------|--------------|--------|
| A | Appen refractive index factors (12 oxides), Appen molar volumes (12 oxides), body COE by cone, flux effectiveness weights | Appen (1961), Volf (1984) |
| B | None (uses computed values from existing models) | — |
| C | Makishima-Mackenzie Vᵢ/Gᵢ for 12 oxides, Priven Tg factors for 10 oxides | M&M (1973), Priven (2004) |
| D | Q-speciation disproportionation K values, coordination number assignments, Kalmanovitch polynomial (6 terms) | Maekawa (1991), Kalmanovitch & Frank (1988) |
| E | ΔG_hyd published values (12 oxides), Duffy Fe redox coefficients | Appen, Duffy (1993) |
| F | Orton cone→°C lookup (30 entries), GRD VFT A/B/C polynomial coefficients (~30 terms), volatilization threshold temperatures | Orton, Giordano et al. (2008) |
| G | Body COE table, material LOI values, glaze limit formulas by cone | Hamer & Hamer, Digitalfire |
| H | None (numerical differentiation of existing models) | — |

### UI Organization: Optgroup Categories (14 groups)

| Group | Options |
|-------|---------|
| Fluxes – R₂O | Li₂O, Na₂O, K₂O |
| Fluxes – RO | CaO, MgO, SrO, BaO, ZnO, PbO |
| Stabilizers | B₂O₃, Fe₂O₃ |
| Glass Formers | TiO₂, ZrO₂, SnO₂ |
| Colorants | MnO, MnO₂, NiO, CuO, Cu₂O, CoO, Cr₂O₃, P₂O₅ |
| Ratios & Sums | Cone, flux ratio, SiO₂:Al₂O₃, total flux, COE |
| Glass Structure | NBO/T, optical basicity, ASI, excess alkali, boron ratio, boron N₄, mean ⟨r⟩, constraints/atom, Q⁴, Q², comp. entropy |
| Flux Analysis | Flux entropy, CaO:MgO, combined alkali, Na₂O:K₂O, KNaO eq., mixed alkali |
| Physical Properties | Viscosity index, surface tension, durability, fluidity, density, refractive index |
| Mechanical | Young's modulus, Vickers hardness, Poisson's ratio, thermal shock |
| Thermal | Tg estimate, liquidus, liquidus overshoot, firing temp, working range, heatwork excess |
| Risk Assessment | Crawl risk, craze risk, leach risk, food safety, microwave, volatilization |
| Prediction | Matteness, surface probability, opacity, devitrification, fragility, Fe color (ox/red) |
| Advanced | Anomaly, density (kNN), percentile, limit distance, safety score, type distance, robustness, error width, colorant/flux, innovation |

**Total: 23 direct oxides + 44 existing computed + ~57 new = ~124 Z-axis options**

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

## v3.12 — The Kiln
*"Every firing tells a story — capture it."*

Tools for the firing side of the studio: schedules, heat work, and the
test tile system that connects experiments to the Stull chart.

### v3.12.0 — Firing Schedule Builder
*Program your kiln in chemistry terms, not just degrees.*

- [ ] Ramp/hold/cool segment editor with visual timeline
- [ ] Cone-equivalence math: "your slow bisque is actually cone 05.5" (Orton heat-work integration)
- [ ] Predefined templates: cone 06 bisque, cone 6 oxidation, cone 10 reduction, raku, wood
- [ ] Atmosphere timeline: oxidation → reduction → cooling annotations per segment
- [ ] Link schedule to glaze predictions: "at this schedule your viscosity curve says it will run"
- [ ] Firing cost estimator: electricity or gas per firing from schedule + kiln specs (kW, BTU)
- [ ] Export as printable kiln log sheet

### v3.12.1 — Heat Work Calculator
*Not all cone 6 firings are the same.*

- [ ] Orton time-temperature integration: actual heat work from a recorded firing profile
- [ ] Input: manual entry or thermocouple CSV import
- [ ] Output: precise cone equivalent (e.g., "cone 5.7")
- [ ] Compare intended vs actual heat work across multiple firings
- [ ] Overlay heat work on glaze predictions: "your glaze was designed for cone 6 but this firing only reached cone 5.4 of heat work"

### v3.12.2 — Test Tile Lab Notebook
*The systematic experiment tracker potters don't have.*

- [ ] Digital test tile record: recipe + clay body + firing schedule + photo + notes
- [ ] Link each tile to its position on the Stull chart
- [ ] Systematic grid planner: "vary silica in 5 steps × alumina in 5 steps = 25 tiles"
- [ ] Timeline view: see how a recipe evolved over 12 firings
- [ ] Tag tiles: successful, failed, interesting, needs repeat
- [ ] Side-by-side comparison: pick any two tiles, see chemistry + photo + notes diff
- [ ] Search and filter by oxide range, surface result, cone, date

### v3.12.3 — QR Code Tile Tracker
*Scan a tile, see its data.*

- [ ] Generate QR code stickers for each test tile
- [ ] Print sheet of QR codes with tile ID and mini recipe summary
- [ ] Scan QR → opens test tile record on phone
- [ ] Batch print: generate labels for an entire blend series at once
- [ ] Kiln map: drag tiles onto a kiln cross-section to record placement

---

## v3.13 — The Bench
*"Where chemistry meets the mixing bucket."*

Practical tools for the studio: application physics, clay bodies,
and print-ready recipe documentation.

### v3.13.0 — Glaze Application Physics
*Control your surface before it hits the kiln.*

- [ ] Specific gravity calculator: target SG → water addition from dry batch weight
- [ ] Dip time → layer thickness estimator (Landau-Levich model for ceramic slurries)
- [ ] Multi-layer / overlay simulation: glaze A over glaze B → estimated combined UMF at interface
- [ ] "Will this run if I go thicker?" — viscosity × thickness risk scoring
- [ ] Spraying parameters: recommended SG, nozzle pressure, coat count
- [ ] Brushing coverage: estimated coats for target thickness at given SG

### v3.13.1 — Clay Body Calculator
*The other half of the equation.*

- [ ] Body recipe → UMF (same math as glaze, different oxide focus)
- [ ] Absorption estimate from body fluxes + firing temperature
- [ ] Shrinkage prediction: wet → dry → bisque → fired
- [ ] Thermal shock resistance score from body mineralogy
- [ ] Engobe / slip calculator: the midpoint between clay and glaze
- [ ] Body COE ties into v3.11.0 Glaze-Body Fit: auto-check compatibility
- [ ] Plasticity estimation from particle size + clay mineral ratios

### v3.13.2 — Glaze Card & Recipe Sheet Generator
*Beautiful documentation for every glaze.*

- [ ] Printable recipe card: photo, UMF bar chart, recipe %, cone, surface, notes
- [ ] Batch sheet: weights for a specific batch size, pre-formatted for the bench
- [ ] Exhibition labels: title, materials, firing, artist — gallery-ready PDF
- [ ] Blend series summary sheet: all 21 triaxial points on one page with thumbnails
- [ ] Material safety data: flag any materials requiring special handling
- [ ] Custom templates: potter can design their own card layout
- [ ] Export: PDF, PNG, print-optimized CSS

---

## v3.14 — The Map
*"Place your glaze on the map of all glazes ever made."*

Overlay real phase diagrams, historical reference glazes, and layering
predictions onto the Stull chart. The chart becomes a true ceramic atlas.

### v3.14.0 — Phase Diagram Overlays
*Textbook theory meets interactive exploration.*

- [ ] Real ternary phase diagrams overlaid on the Stull chart:
  SiO₂–Al₂O₃–CaO, SiO₂–Al₂O₃–Na₂O, SiO₂–Al₂O₃–K₂O, etc.
- [ ] Eutectic points marked and annotated: "lowest melting point in this system"
- [ ] Liquidus contour lines from published ceramic data (Levin, Robbins, McMurdie)
- [ ] "Your glaze sits HERE on the phase diagram" — connects textbook to practice
- [ ] Toggle overlay on/off per system; opacity slider
- [ ] Phase boundary intersections: "you're near an invariant point — small changes have big effects"

### v3.14.1 — Glaze Layering / Combination Predictor
*What happens when two glazes meet?*

- [ ] Select two glazes applied in layers → estimate combined chemistry at interface
- [ ] Partial mixing model: inner layer contributes X%, outer layer contributes Y% at contact zone
- [ ] Known interaction catalog: chrome-tin pink, copper-barium crystallization, iron-cobalt effects
- [ ] Risk flags: "These two glazes have incompatible COEs — expect crawling at overlap"
- [ ] Visual: show both source points + predicted interaction zone on Stull chart
- [ ] Community-contributed results: "I layered A over B and got this" (links to v4.1)

### v3.14.2 — Historical Glaze Library
*Named reference glazes from the canon, plotted in your space.*

- [ ] Published reference glazes: Cardew, Rhodes, Hamer & Hamer, Leach, Britt, Hesselberth & Roy
- [ ] Each plotted on the Stull chart with source citation
- [ ] "Your glaze is 0.04 SiO₂ from Leach's classic celadon"
- [ ] Named historical territories: Song dynasty celadon region, Oribe envelope, Shino zone, Jun territory
- [ ] Toggle historical overlays on/off
- [ ] Tap any reference glaze → full recipe, UMF, source book, historical context
- [ ] "Find glazes near [historical reference]" — proximity search anchored to the canon

---

## v3.15 — The Voice
*"Plain English for every point on the chart."*

The chart talks back. Every glaze gets a narrative explanation that
connects chemistry to what a potter will see and feel.

### v3.15.0 — "Explain This Glaze" Narrative Generator
*Chemistry translated to studio language.*

- [ ] AI-generated or template-driven plain-English description for any UMF on the chart
- [ ] Example output: "This is a high-calcium matte with moderate alumina. The surface will be
  smooth but not glossy, with a buttery feel. The 0.3 MgO pushes the surface toward a slight
  satin break on edges. Expect warm ivory tones from the iron in oxidation."
- [ ] Sections: surface prediction, color expectation, application notes, risk flags
- [ ] Sensory vocabulary: buttery, silky, dry, waxy, glassy, stony — mapped from chemistry
- [ ] Compare mode: "Glaze A will feel drier, with more visual depth due to lower flux"
- [ ] Confidence indicator: "high confidence" for well-characterized regions, "speculative" for sparse areas
- [ ] Feeds into v3.13.2 recipe cards: narrative description auto-included on printed cards

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

## v4.2 — The Classroom
*"Teach ceramics through exploration."*

### v4.2.0 — Workshop & Exercise Mode
*Structured learning in the Stull Atlas.*

- [ ] Teacher creates exercise templates: "Find 3 glazes in the tenmoku region, explain their similarity"
- [ ] Student workspace: restricted view with assignment instructions and submission area
- [ ] Quiz mode: "Which oxide needs to increase to make this glaze matte?" with interactive answers
- [ ] Workshop template builder for NCECA demos and studio classes
- [ ] Progress tracking: which students completed which exercises
- [ ] Shared class view: teacher sees all student explorations overlaid on one chart
- [ ] Exercise library: pre-built curriculum modules for common ceramics courses
- [ ] Certificate generation: "Completed Stull Atlas Glaze Chemistry Fundamentals"

---

## v4.3 — The Bridge
*"Bring your data from anywhere."*

### v4.3.0 — Universal Import
*Every potter's data, no matter where it lives.*

- [ ] **Format importers:** GlazeMaster, Matrix, HyperGlaze, Insight recipe formats
- [ ] **Spreadsheet wizard:** Excel/CSV column-mapping ("which column is SiO₂?")
- [ ] **Glazy sync:** Bidirectional API integration — pull your Glazy recipes, push results back
- [ ] **Camera / OCR capture:** Photograph a recipe from a book or notebook → extract and parse
- [ ] **Clipboard paste:** Paste a recipe from any source → auto-detect format and parse
- [ ] **Batch import:** Drag a folder of recipe files → import all at once
- [ ] **Conflict resolution:** Duplicate detection + merge wizard for overlapping recipes
- [ ] **Export complement:** Every import format also exports (round-trip fidelity)

---

## v3.16 — The What-If Machine
*"One slider, everything moves."*

The centerpiece interactive experience. A dual-mode cockpit where potters and
chemists explore the same chemistry through different lenses. One engine
computes everything; two presentation modes speak to two audiences. The tool
that teaches ceramics by letting you feel the physics.

**Existing foundation:** `WhatIfPanel` (445 lines) already has 11 oxide sliders,
surface prediction, limit validation, Stull position tracking. The upgrade
turns this panel into a full-screen instrument.

### v3.16.0 — Property Dashboard (the cockpit gauges)
*Every slider drag updates every property simultaneously.*

- [ ] **Extract `computeZFromUMF()`** from StullPlot3D.tsx into shared `calculator/properties.ts`
  — pure function, no chart dependency, reusable everywhere
- [ ] **`PropertyGauge` component** — horizontal bar gauge with:
  - Min/max/value with colored fill (green/yellow/red zones from ceramic literature)
  - Before/after overlay: faded bar = original, solid bar = adjusted
  - Delta annotation on right edge: `+2.3` or `−0.8`
  - Expand arrow → reveals formula, oxide contributions, sensitivity
- [ ] **Property grid** — 11+ gauges updating live on every slider drag:
  - Surface prediction (matte/satin/gloss) — already exists, upgrade to gauge
  - COE (Appen thermal expansion) — crazing risk
  - Melt temperature estimate — will it melt at your cone?
  - Viscosity index — stiff or runny?
  - NBO/T — network polymerization
  - Surface tension — crawl risk driver
  - Durability — chemical resistance
  - Flux ratio (R₂O:RO) — flux balance
  - Optical basicity — glass character
  - Flux entropy — flux diversity
  - Combined alkali — total alkali load
- [ ] Wire `estimateMeltTemp()`, `computeFluxRatio()` into live update loop
- [ ] Wire existing `OxideRadar` component — overlay original vs adjusted profiles
- [ ] Wire existing `FluxDonut` component — live flux partition visualization

### v3.16.1 — Studio / Science Mode Toggle
*One engine, two faces.*

- [ ] **Mode toggle:** `[🏺 Studio]  [🔬 Science]` switch in header
- [ ] **Studio Mode:**
  - Intent sliders: "Glossier ↔ Matter," "Safer ↔ Riskier," "Stiffer ↔ More Fluid,"
    "Warmer ↔ Cooler Color," "Smoother ↔ More Texture"
  - Each intent slider maps to coordinated multi-oxide adjustments
  - 5–6 key gauges only (surface, fit, melt, flow, color, risk)
  - Notebook narration instead of numbers
  - Material translation: "Add 4% whiting, drop 2% soda spar"
  - Numbers only on hover
- [ ] **Science Mode:**
  - Raw oxide sliders with 0.001 precision
  - ALL 15+ computed properties with numeric readouts
  - Sensitivity bars: which oxide is the biggest lever right now
  - Formulas visible: hover any gauge → see equation and constants
  - Export: JSON/CSV of all computed values at current state
- [ ] **Gradual reveal:** In Studio mode, each gauge has expand arrow → shows
  oxide contributions, formula, sensitivity (potter graduates to chemist naturally)

### v3.16.2 — Visual Overlays (spatial feedback)
*See WHERE you're moving on the chart.*

- [ ] **Animated ghost dot** on Stull chart: faded dot at original position,
  solid dot at adjusted position, smooth animated drift as you drag
- [ ] **Danger contours:** approach a boundary (matte→gloss, safe→crazed) →
  chart shading intensifies, contour lines appear
- [ ] **Breadcrumb trail:** every adjustment leaves a dot on the chart —
  your exploration path through chemistry space, visible as a connected trail
- [ ] **Gravity wells:** subtle shading for popular zones (celadon, tenmoku, shino)
  — labeled as your dot approaches; sparse zones labeled "uncharted"
- [ ] **Temperature slider:** cone 04 → cone 12 alongside oxide sliders;
  same chemistry, different fire → watch all properties cascade

### v3.16.3 — Smart Feedback (the adviser)
*The machine talks back — in the potter's language.*

- [ ] **Glaze Weather Forecast card:** surface, color, fit, risk, melt, feel —
  presented like a weather app, not a data table
  ```
  🌡️ Cone 6 Oxidation Forecast
  Surface: Satin  |  Color: Warm ivory
  Fit: ✅ Good on porcelain
  Risk: ⚠️ Slight crawl on textured surfaces
  "A reliable satin that performs well on smooth forms."
  ```
- [ ] **Change narration:** template-generated plain English that updates on
  every slider drag: "Increasing CaO pushed you from satin toward matte.
  COE dropped 12% — less crazing risk on cone 6 stoneware."
- [ ] **Cliff warnings:** "You're 0.02 SiO₂ from the matte/gloss boundary.
  Small batch variations could land on either side."
- [ ] **Trade-off highlights:** "COE improved but viscosity increased —
  your glaze resists crazing but may not heal application marks."
- [ ] **Failure stories:** when a property enters danger zone, show a micro-story
  with real timelines and consequences, not just "COE: HIGH"
- [ ] **"What changed the most?"** summary after multi-slider adjustments:
  "Your biggest shift was COE (−18%). Surface barely moved."

### v3.16.4 — Glaze Twin & Context
*Anchor the abstract in the familiar.*

- [ ] **Nearest known glaze** — continuous database search as you drag;
  show name + test tile photo: "You're 0.02 from Leach Celadon"
- [ ] **Named territory labels** — "Entering Tenmoku Territory" / "Leaving
  Celadon Region" as your dot crosses constellation boundaries (v3.7)
- [ ] **"Teach Me" popups** — for any gauge, 3-sentence contextual explanation:
  1. What it is: "NBO/T measures glass network breakup"
  2. Why it matters: "Higher = softer, more fluid glass"
  3. What you just did: "Your MgO increase raised NBO/T from 0.8 to 1.1"
- [ ] **Sensitivity highlighting on slider tracks** — dim gray if oxide barely
  matters here; glowing red if near a cliff edge. Sliders themselves teach
  you which oxides matter WHERE.

### v3.16.5 — The Living Recipe Card
*The physical artifact that lives in the studio.*

- [ ] Everything converges into one beautiful printable card:
  - Photo of nearest known glaze (or user's own test tile photo)
  - Recipe in percentages
  - UMF fingerprint (mini radar chart)
  - Forecast card: surface, color, fit, risks
  - Notebook narration: one paragraph
  - Stull position: tiny chart with the dot
  - "Mixed on: [date]. Tested on: [date]. Result: [their notes]."
- [ ] Export: PDF, PNG, print-optimized CSS
- [ ] Batch print: all snapshots as a card deck
- [ ] The card is designed to get glaze dripped on it — durable layout,
  high contrast, readable at arm's length in a studio

### v3.16.6 — Perturbation Cloud
*How fragile is this recipe?*

- [ ] "Show uncertainty" toggle: Monte Carlo 200 samples at ±2% per oxide
- [ ] Translucent cloud on Stull chart — tight cluster = robust, spread = fragile
- [ ] Color-coded: green points stay in same surface zone, red points cross boundary
- [ ] Cloud shape reveals phase boundary proximity: elongated toward a cliff = danger
- [ ] Numeric summary: "±2% error → ±4.2 COE units, surface stays matte (98% confidence)"

### v3.16.7 — Inverse Mode
*"I want THIS — show me WHERE to go."*

- [ ] Flip the interface: set property TARGETS instead of dragging oxides:
  "COE < 65, surface = matte, cone 6, no crazing on porcelain"
- [ ] Genetic optimizer highlights valid region on Stull chart as glowing overlay
- [ ] Slider auto-snap: "closest UMF to your current recipe that satisfies all constraints"
- [ ] Multiple valid regions possible: "there are two zones that satisfy your constraints"
- [ ] Constraint relaxation: "No solution exists. Relaxing COE to < 70 opens this region."

### v3.16.8 — Sonification
*Chemistry you can hear.*

- [ ] Subtle tone shift when crossing matte/gloss boundary (pitch change)
- [ ] Low hum intensifies approaching danger zones (COE, crawling)
- [ ] Chime when entering a named constellation territory
- [ ] Tone mapped to overall "health": harmonious = safe everywhere,
  dissonant = conflicting properties (good COE but high crawl risk)
- [ ] Audio off by default; toggle in settings; respect system accessibility

### v3.16.9 — Undo & Snapshots
*Structured exploration, not random wandering.*

- [ ] **Per-oxide revert:** tiny revert button on each slider → snap one oxide back;
  show what JUST that oxide was responsible for in the property changes
- [ ] **Snapshot stack:** save named snapshots: "matte version," "glossy version"
  — vertical card stack on sidebar, click to jump between states
- [ ] **Side-by-side comparison:** pick any two snapshots, see all property deltas
- [ ] **"What's different?"** — highlight only the properties that diverged between snapshots

### v3.16.10 — Exploration Journal
*Your personal chemistry notebook.*

- [ ] One-click save: entire state (oxides, properties, forecast, Stull position,
  narration) becomes a journal entry with timestamp + optional note
- [ ] Timeline view: scroll through weeks of explorations chronologically
- [ ] Search journal: "show me all entries where surface was matte and COE < 60"
- [ ] Journal entries link to test tiles (v3.12.2) and recipes
- [ ] **"What's my blindspot?"** — after 20+ sessions, the machine identifies
  exploration patterns: "You always adjust fluxes but never touch Al₂O₃"
  + unexplored regions matching your aesthetic

**Build order & NCECA readiness:**

| Phase | Sub-version | Effort | NCECA-ready? |
|-------|-------------|--------|--------------|
| 1 | v3.16.0 Property Dashboard | 4–6 hrs | ✅ Yes — the core demo |
| 2 | v3.16.1 Studio/Science Toggle | 3–4 hrs | ✅ Yes |
| 3 | v3.16.2 Visual Overlays | 3–4 hrs | ✅ Yes |
| 4 | v3.16.3 Smart Feedback | 3–4 hrs | ✅ Yes |
| 5 | v3.16.4 Glaze Twin & Context | 2–3 hrs | ✅ Yes |
| 6 | v3.16.5 Living Recipe Card | 4–6 hrs | ✅ Yes — NCECA handout |
| 7 | v3.16.6 Perturbation Cloud | 4–6 hrs | Stretch |
| 8 | v3.16.7 Inverse Mode | 6–8 hrs | Stretch |
| 9 | v3.16.8 Sonification | 3–4 hrs | Post-NCECA |
| 10 | v3.16.9 Undo & Snapshots | 3–4 hrs | Post-NCECA |
| 11 | v3.16.10 Exploration Journal | 4–6 hrs | Post-NCECA |

**Architecture:**
```
┌─────────────────────────────────────────┐
│         The What-If Machine             │
│     [🏺 Studio]  [🔬 Science]           │
├──────────────┬──────────────────────────┤
│ Intent       │ Property Dashboard       │
│ Sliders      │  ┌─ COE gauge ─────────┐ │
│ (Studio) OR  │  ├─ Melt temp ─────────┤ │
│ Oxide        │  ├─ Viscosity ─────────┤ │
│ Sliders      │  ├─ NBO/T ────────────┤ │
│ (Science)    │  ├─ Surface tension ───┤ │
│              │  └─ ... (expand any) ──┘ │
├──────────────┼──────────────────────────┤
│ OxideRadar   │ Forecast Card / Narration│
│ FluxDonut    │ or Full Property Table   │
├──────────────┴──────────────────────────┤
│ Snapshot Stack │ Cone Slider │ Warnings │
└─────────────────────────────────────────┘
         │ onPositionChange
         ▼
┌─────────────────────────────────────────┐
│        Stull Chart (3D)                 │
│  ○ original  ● adjusted  ← → animated  │
│  ··· breadcrumb trail                   │
│  ░░ perturbation cloud (v3.16.6)        │
│  ▓▓ valid region (v3.16.7)              │
│  🏷️ gravity wells + territory labels    │
└─────────────────────────────────────────┘
```

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
| **3.5.1** | The Instruments | 120 Z-axis options: glass physics, predictions, multi-modal | 📋 Planned |
| **3.6** | The Walk | Recipe interpolation, wet blending, flux ratios | 📋 Planned |
| **3.7** | The Constellations | Auto-named glaze families, fuzzy grouping | 📋 Planned |
| **3.8** | The Knowledge Graph | Visual graph navigation with photos | 🌟 Vision |
| **3.9** | The Controls | Keyboard/mouse navigation instrument | 📋 Planned |
| **3.10** | The Studio | Material substitution, bidirectional recipe | 📋 Planned |
| **3.11** | The Laboratory | Physics-based prediction engines, batch tools | 📋 Planned |
| **3.12** | The Kiln | Firing schedules, heat work, test tile notebook | 📋 Planned |
| **3.13** | The Bench | Application physics, clay body calc, recipe sheets | 📋 Planned |
| **3.14** | The Map | Phase diagrams, glaze layering, historical library | 📋 Planned |
| **3.15** | The Voice | Plain-English glaze narrative generator | 📋 Planned |
| **3.16** | The What-If Machine | Dual-mode cockpit: every slider moves everything | 🌟 Flagship |
| **4.1** | The Community | Personal profiles, shared knowledge, free tier | 🔮 Future |
| **4.2** | The Classroom | Workshop exercises, teaching tools | 🔮 Future |
| **4.3** | The Bridge | Universal import from every glaze tool | 🔮 Future |

## Architecture Principle

Each version builds on the last:
```
v3.4 Compass    → defines "similar" (distance function)
v3.5 Gallery    → shows what "similar" looks like (photos)
v3.5.1 Instruments → 120 lenses on every glaze (physics, predictions, risk)
v3.6 Walk       → shows how to get there (recipe delta, wet blending, flux lenses)
v3.7 Families   → groups of "similar" become named places (fuzzy boundaries)
v3.8 Graph      → the places become a navigable world
v3.9 Controls   → the world responds to your hands
v3.10 Studio    → the world connects back to the bench
v3.11 Laboratory → predict what happens before you fire
v3.12 Kiln       → capture every firing, track every tile
v3.13 Bench      → application physics, clay bodies, recipe sheets
v3.14 Map        → phase diagrams, layering, historical glazes
v3.15 Voice      → plain English for every point on the chart
v3.16 What-If    → one slider, everything moves — the instrument that teaches ceramics
v4.1 Community   → every potter gets their own page + shared knowledge
v4.2 Classroom   → teach ceramics through exploration
v4.3 Bridge      → bring your data from anywhere
```

Each layer is independently valuable. Ship each one, prove it works, then build the next.

## Competitive Moat

| Feature | Glazy | Digitalfire | Insight | Stull Atlas |
|---------|-------|-------------|---------|-------------|
| Recipe calculator | ✓ | ✓ | ✓ | ✓ |
| UMF display | ✓ | ✓ | ✓ | ✓ |
| Stull chart | - | static | - | **interactive 3D** |
| 120 computed Z-axes | - | - | - | **v3.5.1** |
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
| Firing schedule builder | - | ✓ | - | **v3.12** |
| Test tile notebook | - | - | - | **v3.12** |
| Clay body calculator | - | ✓ | ✓ | **v3.13** (richer) |
| Glaze layering prediction | - | - | - | **v3.14** |
| Historical glaze atlas | - | partial | - | **v3.14** |
| Phase diagram overlays | - | static | - | **v3.14** (interactive) |
| AI glaze narrative | - | - | - | **v3.15** |
| What-If Machine (dual mode) | - | - | - | **v3.16** |
| Intent sliders (outcome-based) | - | - | - | **v3.16** |
| Perturbation clouds | - | - | - | **v3.16** |
| Inverse design (constraint solver) | - | - | - | **v3.16** |
| Chemistry sonification | - | - | - | **v3.16** |
| Exploration journal | - | - | - | **v3.16** |
| Workshop / classroom mode | - | - | - | **v4.2** |
| Universal import | partial | - | partial | **v4.3** |
| Shared exploration | - | - | - | **v4.1** |

**No one is building this.** Not Glazy (social-first, no spatial understanding),
not Digitalfire (reference-first, no interactivity), not Insight (desktop-only calculator).

We're building the first tool where you can SEE what a glaze looks like, UNDERSTAND
where it lives in chemistry space, and WALK toward what you want to make.

*That's not a feature. That's a new way to learn ceramics.*
