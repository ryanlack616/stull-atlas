# Stull Atlas — Program Ideal, Modes, Navigation, and Build Notes
> **Source of truth:** This document is the canonical reference for program structure, modes, navigation, and build contracts.

## Product ideal
Stull Atlas is a **ceramic glaze calculation + Stull map explorer** that feels like a **precision instrument** while staying
**pleasant and approachable**. It avoids “magic,” favors **deterministic computation**, and earns trust through **transparent validation**.

Key principle: **the same truth in two presentations**.
- Same recipes, same compute pipeline, same saved state.
- Different UI shells: **Basic** for comfort + speed, **Advanced** for depth + beautiful data.

---

## Two modes (two shells)

### Basic mode (default)
Purpose: functional, easy, friendly; optimized for older users.
- **Bigger text & buttons**
- **Fewer decisions**
- **No oxide-family jargon**
- **No dataset complexity**

**Pages (2):**
1) **Quick Calc**
2) **Explore** (Stull Map + Search + Inspect in one place)

### Advanced mode
Purpose: professional, data-forward, dense-but-readable.
- Multi-panel layouts
- Full tables, controls, limits, analysis tooling
- Dedicated compare/blends/validation
- Optional legacy “instrument” skins as view-cards

**Pages (6) — ordered:**
1) **Library**
2) **Calculator**
3) **Stull Map**
4) **Compare**
5) **Blends & Search**
6) **Limits & Checks**

---

## Navigation: solidified behavior

### Global nav (both modes)
- Brand/home takes you to the mode’s “home” screen:
  - Basic home → **Explore**
  - Advanced home → **Library**
- Always show a small **“Open in Advanced”** affordance in Basic.
- Always allow **deep links** to recipes and views across modes.

### State rules
Maintain:
- `current_recipe_id`
- `selected_point_id` (Explore/Map)
- `pinned_point_ids[]` (light compare)

Quick Calc → Explore transition:
- centers map on current recipe point
- opens Inspect card by default

---

## Basic mode wireframe (final)

### Basic UI sizing
- Base text: **18–20px**
- Headings: **24–32px**
- Buttons: **44–56px tall**
- Tap targets: **≥ 44px**

### Basic page 1: Quick Calc
**Goal:** enter recipe → minimal compute → jump to map.

Sections:
1) **Recipe Card**
   - Recipe name (large input)
   - Cone (single dropdown)
   - Atmosphere (Ox/Red segmented toggle)
2) **Materials Card** (primary)
   - Big rows: Material name + % input + remove
   - **Add Material** (large button) opens search drawer
3) **Total / Normalize strip**
   - shows total %
   - one-tap **Auto-normalize to 100%**
4) **Results Card (Basic summary)**
   - Status pill: Computed / Needs attention / Can’t compute
   - Show only: **SiO₂, Al₂O₃, Total Flux, (B₂O₃ if present)** + **SiO₂:Al₂O₃ ratio**
   - Optional “Details” expands a short extra-oxide list (no family labels)
5) **Sticky CTA bar**
   - Primary: **View on Stull Map**
   - Secondary: Save (optional)

If compute fails:
- Calm banner: “One or more materials don’t have oxide analysis.”
- Actions: Primary **Open in Advanced**; Secondary “Remove unknown material”.

### Basic page 2: Explore
**Goal:** map-first understanding and discovery.

Desktop:
- Left: **Search + Filters** (big search, cone, atmosphere, Mine/Community/Both)
- Center: **Stull Map** (SiO₂ UMF x, Al₂O₃ UMF y), one toggle **Show Guides**
- Right: **Inspect card** (summary, UMF snippet, Open Recipe, Open in Advanced, Pin)

Light Compare (Basic):
- Pin up to 3 points; visual overlay only; “Pinned (N)” chip + Clear; no delta tables.

Mobile:
- Map full screen + bottom sheet tabs (Search / Inspect); large primary actions.

---

## Advanced mode IA (final)

### 1) Library (home)
- Your recipes + community
- Tags, folders/collections
- Import/export
- Default settings entry point (datasets, preferences)
- “Instrument cards” (legacy skins) optional

### 2) Calculator
- Full materials + LOI controls
- **Switchable calculation views:**
  - **Formula (raw)** and **Unity Formula (Seger/flux unity)**
  - **Mole%**
  - **Percentage Analysis (by weight)**
- Full UMF tables (including family groupings)
- Scaling, conversions, batch tools
- Full diagnostics panel
- Educational microcopy: when to work at recipe vs oxide/formula level

### 3) Stull Map
- Dedicated map view (power overlays)
- Multi-layer datasets
- Advanced inspection + chart tooling

### 4) Compare
- Multi-recipe overlay
- Delta tables (ΔUMF, Δratios, Δposition)
- Save comparison sets

### 5) Blends & Search
- Simplex, Grid, Space-filling, Optimization, Coordinate System
- **Matrix blends:**
  - Line blends (2-way)
  - **Triaxial blends** (3-way triangular system)
  - Quadraxial and Pentaxial
  - Connected quadraxial fields (stitch grids via shared line blends)
- Rank by target/limits
- Export test plans (tile IDs, weights/%, firing notes)

### 6) Limits & Checks
- Guide sets, cone/atmos presets
- Pass/Warn/Fail with reasoning
- Rule-based suggestions (deterministic)

---

## Advanced Help (two main start branches)
Help hub presents two primary paths:

1) **Guided Adjustments**
   - goal-driven wizard (“more glossy”, “increase durability”, “hit target zone”, etc.)
   - constraints (lock materials, limit change size, etc.)
   - produces ranked, explainable suggestions
   - always preview + save as variant (never silent overwrite)

2) **Explore by Example (Blend Walkthroughs)**
   - tutorial workspaces (“Read the Stull map”, “5×5 blend exploration”, etc.)
   - step list with one-button actions
   - ends with “what you learned” and next-tool links

Guardrails:
- no auto-apply; variants only
- no hidden assumptions; data-quality gates visible
- jargon behind “Show details”

---

## “Smart but not complicated” build notes

### One engine, two shells (plus instrument views)
Compute pipeline returns:
- `status`: OK / WARN / ERROR
- `diagnostics[]`: typed codes + severity + user_message + suggested actions
- `umf_summary` (Basic)
- `umf_full` (Advanced)
- `stull_point` {sio2, al2o3, confidence?}

Basic renders only the **top diagnostic** and minimal summary.
Advanced can render all diagnostics and full data.

### Multi-view sync (multiple skins open at once)
Goal: DOS / Win95 / Mac / Web views can be open simultaneously and remain in **perfect sync**.

Core rule: One canonical document + one compute engine.
- Shared truth: `RecipeDoc`, `MaterialCatalog`, `UserPrefs`
- Per-window only: focus, cursor, selection, scroll, open dialogs

Event-driven edits (single edit vocabulary):
- `ADD_MATERIAL`
- `REMOVE_MATERIAL`
- `SET_MATERIAL_PERCENT`
- `SET_CONE`
- `SET_ATMOS`
- `NORMALIZE_TO_100`

Single reducer:
- `nextState = reduce(state, event)`

Derived compute:
- `ComputeResult = compute(RecipeDoc, MaterialCatalog, UserPrefs)`
- Cached by `recipeHash + catalogVersion`

Commit policy (authentic per skin, still synced):
- DOS: commit on **Enter**
- Win95/Mac: commit on blur or Enter; optional Apply
- Web: live preview with short debounce; emits same events

Conflict strategy (v1): last-write-wins with a small “updated by another window” toast.
Optional later: field-level edit locking.

Quality-of-life: pulse/highlight the field that changed in other open views.

### Typed diagnostics (example codes)
- `RECIPE_TOTAL_NOT_100`
- `MATERIAL_UNKNOWN`
- `MATERIAL_NO_ANALYSIS`
- `UMF_NOT_COMPUTABLE`
- `OUTSIDE_GUIDES`

Each diagnostic includes:
- severity
- user_message (plain language)
- primary_action
- secondary_action (optional)

### Performance/caching
- Cache compute results by recipe hash + catalog version.
- Precompute Stull points for library/community items.
- Use LOD rendering for large point clouds (density zoomed out → points zoomed in).

---

## Skin system (summary)
Skins are **presentation presets**, not separate apps:
- Skin = Theme tokens + Density tokens + Layout preset + Input profile

Recommended access pattern:
- Basic mode: one friendly skin only
- Advanced mode: “Instrument cards” that open legacy views as windows/panels
- DOS is also available as an easter egg overlay/modal

---

## Loose ends: resolved decisions
- Settings live in Advanced (Library is entry point)
- Basic: no dataset selector; Basic uses Advanced defaults silently
- Basic: one toggle “Show Guides”
- Advanced: full guide/limit configuration

---

## Options (pick one per category)
### Mode switching UX
A) Soft link (Basic “Open in Advanced”; Advanced “Back to Basic”)
B) Small persistent toggle (Basic/Advanced)
C) Contextual switch only

Recommendation: A for v1, add B later.

### Basic home screen
A) Explore is home (map-first)
B) Quick Calc is home

Recommendation: A.

### Basic “Adjust” capability
A) No adjust in Basic (v1)
B) Small guarded adjust drawer

Recommendation: A for v1.
