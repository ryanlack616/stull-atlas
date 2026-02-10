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

---

## v3.7 — The Constellations
*"Navigate by aesthetic family, not oxide numbers."*

Auto-discover and name the glaze families that already exist in the data.

### v3.7.0 — Cluster Detection & Naming
- [ ] Run DBSCAN clustering on full dataset (code exists in `analysis/clustering.ts`)
- [ ] Auto-name clusters from Glazy `glazeTypeId` labels: "Celadon Territory," "Tenmoku Belt"
- [ ] Unlabeled clusters described by chemistry: "High-Calcium Mattes," "Boron Glosses"
- [ ] Constellation stats: typical cones, surface types, oxide ranges, point count

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

## v3.9 — The Studio
*"Your bench, your materials, your journey."*

### v3.9.0 — Material Substitution
- [ ] Pick a material in your recipe → see available substitutes
- [ ] Show UMF shift as arrow on Stull chart
- [ ] Color-code arrows by predicted surface change
- [ ] "Still in matte territory? ✓" confirmation

### v3.9.1 — Recipe Bridge (Bidirectional)
- [ ] Live sync: edit recipe ↔ watch point drift on chart
- [ ] Click any point on chart → snap to nearest achievable recipe
- [ ] "Cost of distance" — how much recipe change is needed to reach each neighbor

### v3.9.2 — Region Annotations
- [ ] Users can tag regions with notes
- [ ] Notes as floating markers on the chart
- [ ] Shared annotations for community collaboration (future)

---

## v4.0 — The Community
*"A living document of collective ceramic knowledge."*

### v4.0.0 — User Profiles & Saved Explorations
- [ ] Auth integration (Supabase already wired)
- [ ] Save and name exploration paths
- [ ] Personal glaze library with notes
- [ ] Upload your own test tile photos

### v4.0.1 — Social Exploration
- [ ] Share exploration paths as URLs
- [ ] "X potters explored this region this week"
- [ ] Community annotations on the Stull chart
- [ ] Federated glaze database — your private glazes on the public chart

---

## Version Summary

| Version | Codename | Core Idea | Status |
|---------|----------|-----------|--------|
| **3.4** | The Compass | Weighted search + surface prediction | ✅ Shipped |
| **3.5** | The Gallery | Photos in exploration, visual browsing | ✅ Shipped |
| **3.6** | The Walk | Recipe interpolation, "how do I get there?" | 📋 Planned |
| **3.7** | The Constellations | Auto-named glaze families | 📋 Planned |
| **3.8** | The Knowledge Graph | Visual graph navigation with photos | 🌟 Vision |
| **3.9** | The Studio | Material substitution, bidirectional recipe | 📋 Planned |
| **4.0** | The Community | Shared knowledge, social features | 🔮 Future |

## Architecture Principle

Each version builds on the last:
```
v3.4 Compass    → defines "similar" (distance function)
v3.5 Gallery    → shows what "similar" looks like (photos)
v3.6 Walk       → shows how to get there (recipe delta)
v3.7 Families   → groups of "similar" become named places
v3.8 Graph      → the places become a navigable world
v3.9 Studio     → the world connects back to the bench
v4.0 Community  → the world becomes shared
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
| Material substitution | - | manual | - | **v3.9** |
| Shared exploration | - | - | - | **v4.0** |

**No one is building this.** Not Glazy (social-first, no spatial understanding),
not Digitalfire (reference-first, no interactivity), not Insight (desktop-only calculator).

We're building the first tool where you can SEE what a glaze looks like, UNDERSTAND
where it lives in chemistry space, and WALK toward what you want to make.

*That's not a feature. That's a new way to learn ceramics.*
