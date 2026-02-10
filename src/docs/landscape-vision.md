# Stull Atlas — Landscape Vision

## The Insight

Every other glaze tool treats chemistry as a **spreadsheet**. We're building a **landscape**.

Potters don't think in numbers — they think in neighborhoods, territories, and journeys.  
The proximity system isn't a feature. It's the **core interaction pattern**.

---

## Phase 1 — Aesthetic Compass (Sprint: NOW)
*"Find me glazes that are similar in the way I care about."*

**What**: Weighted similarity sliders that reshape what "nearby" means.  
**Why**: Pure Euclidean distance treats SiO₂ and BaO as equally important. Potters have intent — "I want same surface but lower cone" or "same flux balance but more silica."

- 6-8 weight sliders: SiO₂, Al₂O₃, Z-axis, Cone, Surface Match, Flux Ratio  
- Sliders 0–1, default all 0.5 (balanced). Drag cone to 1.0 → nearby list reshuffles to prioritize cone-similar glazes  
- Distance formula becomes: `√(Σ wᵢ · δᵢ²)` — weighted normalized Euclidean  
- Surface match = 0/1 penalty (same surface type = 0, different = 0.3)  
- Cone match = `|cone₁ - cone₂| / 14` normalized  
- Presets: "Same surface, any chemistry" / "Same cone" / "Chemistry twin" / "Flux sibling"  
- Integrates with existing proximity sphere, nearby list, filter pills, sort, breadcrumbs  

**Impact**: This is the Google of glazes — search by *intention*, not formula.  
**Effort**: Medium. Extends existing `proximityRadius` filter in StullPlot3D.  

---

## Phase 2 — Surface Prediction Heatmap
*"Will this be matte?"*

**What**: Paint the Stull chart with predicted surface type based on ~10K labeled glazes.  
**Why**: Every potter's #1 question. We have the labeled data. No one else does this.

- Use existing Nadaraya-Watson kernel regression surface fitting (already in `analysis/surfaceFit.ts`)  
- Classification variant: for each grid point, predict P(matte), P(gloss), P(satin) from nearby labeled points  
- Render as color overlay on the floor plane (2D) or as a translucent mesh (3D)  
- Responds to cone filter and Z-axis — "at cone 6 with this boron level, you're in matte territory"  
- Toggle in analysis panel  
- Color scheme: Green=matte, Blue=gloss, Amber=satin, Purple=crystalline  

**Impact**: Huge. Answers the question before they glaze a pot.  
**Effort**: Medium. Math already exists, need classification variant + rendering.  

---

## Phase 3 — Walk Toward (Recipe Interpolation)
*"I see a glaze I love. How do I get there from my bench?"*

**What**: Click a nearby glaze → see the recipe adjustment needed to move toward it.  
**Why**: Bridges the gap between *seeing* and *doing*. No other tool does this.

- Select your glaze. Click a neighbor's "Walk Toward" button.  
- Compute UMF delta: `target.umf - source.umf` per oxide  
- Map oxide deltas back to material adjustments using the material database  
- Show: "Add 4% more whiting, reduce silica by 2%"  
- Show the interpolation path as a dotted line in 3D  
- Slider: 0%–100% "how far toward the target"  
- At each point, show predicted surface type from Phase 2  

**Impact**: Transformative. Chemistry ↔ recipe in one click.  
**Effort**: High. Needs oxide→material inverse mapping (constrained optimization).  

---

## Phase 4 — Glaze Constellations
*"Navigate by aesthetic family, not oxide numbers."*

**What**: Auto-cluster the dataset, name the families, overlay on chart.  
**Why**: Potters think in families — "Celadons," "Shinos," "Tenmokus." We can detect and label these.

- Use existing DBSCAN clustering (`analysis/clustering.ts`)  
- For clusters with enough Glazy `glazeTypeId` labels, auto-name: "Celadon Territory," "Tenmoku Belt"  
- For unlabeled clusters, describe by chemistry: "High-Calcium Mattes," "Boron Glosses"  
- Render as translucent boundary polygons on the Stull chart  
- Click a constellation → filter to its members  
- Show constellation stats: typical cones, surfaces, oxide ranges  
- "Nearest constellation" indicator on every glaze  

**Impact**: High. Makes the whole dataset navigable by meaning.  
**Effort**: Medium. Clustering exists, needs naming + UI.  

---

## Phase 5 — Material Substitution Visualizer
*"I can't get Custer feldspar. What if I swap to G-200?"*

**What**: Show UMF shift arrows from material substitutions.  
**Why**: The #1 practical problem every potter faces — material availability.

- Pick a material in your recipe → see available substitutes from the material DB  
- Show the UMF shift as an arrow on the Stull chart  
- Color-code arrows by predicted surface change (from Phase 2)  
- "EPK → Tile 6" shifts you +0.02 SiO₂, -0.01 Al₂O₃ → still in matte territory? ✓  
- Integrate with Digitalfire material database (already in `data/materials/`)  

**Impact**: Extremely practical. Solves a real bench problem.  
**Effort**: Medium-High. Needs material equivalence logic.  

---

## Phase 6 — Glaze Lineage / Evolution Graph
*"The potter's creative journal, written in chemistry."*

**What**: Save and visualize exploration paths over time.  
**Why**: Breadcrumb trail is session-only. This persists it.

- Save exploration paths to user data (Supabase for web, local for Studio)  
- Visualize as a graph: nodes = glazes you visited, edges = "walked to"  
- Over weeks, this becomes a map of aesthetic development  
- "You started at celadons, walked through satins, ended at tenmokus"  
- Share your exploration path with other potters  
- Time-lapse playback: watch a potter's aesthetic journey unfold  

**Impact**: Unique. No tool captures the *process* of learning ceramics.  
**Effort**: High. Needs persistence + graph visualization.  

---

## Phase 7 — Region Annotations (Crowdsourced Wisdom)
*"The chart becomes a living document of collective knowledge."*

**What**: Let potters tag regions with notes.  
**Why**: Data points are chemistry. Annotations are *experience*.

- Click a region → add a note: "Runs like crazy here at cone 6"  
- Notes aggregated as density/sentiment heatmaps  
- "Sweet spot for ash-like surfaces" / "Crawl risk zone"  
- Community Q&A: "Has anyone tried this region at cone 10?"  
- Requires community features (future)  

**Impact**: Long-term moat. Years of potter wisdom encoded on the chart.  
**Effort**: High. Needs auth, storage, moderation.  

---

## Implementation Order

```
NOW:     Phase 1 — Aesthetic Compass (extends existing proximity)
NEXT:    Phase 2 — Surface Prediction (extends existing surface fitting)  
THEN:    Phase 3 — Walk Toward (killer feature, needs Phase 1+2)
LATER:   Phase 4 — Constellations (extends existing clustering)
FUTURE:  Phase 5–7 (need more infrastructure)
```

## Competitive Position

| Feature | Glazy | Digitalfire | Stull Atlas |
|---------|-------|-------------|-------------|
| Recipe calculator | ✓ | ✓ | ✓ |
| UMF display | ✓ | ✓ | ✓ |
| Stull chart | - | static | **interactive 3D** |
| Similar glazes | basic list | - | **proximity sphere + compass** |
| Surface prediction | - | - | **Phase 2** |
| Recipe interpolation | - | - | **Phase 3** |
| Aesthetic families | tags only | - | **Phase 4** |
| Material substitution | - | manual | **Phase 5** |
| Exploration history | - | - | **Phase 6** |

**We're not competing on features. We're competing on *understanding*.**
