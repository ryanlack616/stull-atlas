# Engine & Sync Contract (Implementation Notes)

## Goals
- One canonical document model for recipes/material catalog.
- Multiple synchronized views (skins) can be open at once.
- Deterministic computations; no silent defaults.

## Core data structures (suggested)
### RecipeDoc
- id, name
- cone, atmosphere
- items[]: { materialId, percent }
- notes/tags (optional)

### MaterialCatalog
- materials[]: id, name
- analyses[]: per-material oxide analysis, LOI, source, version

### ComputeResult
- status: OK|WARN|ERROR
- diagnostics[] (typed)
- umf_summary (for Basic)
- umf_full (for Advanced)
- stull_point: { sio2, al2o3 }
- derived metrics: ratio SiO2:Al2O3, total flux, etc.

## Domain event vocabulary
All UI shells must emit the same events (no UI-specific mutation):
- ADD_MATERIAL(recipeId, materialId)
- REMOVE_MATERIAL(recipeId, materialId)
- SET_MATERIAL_PERCENT(recipeId, materialId, percent)
- SET_CONE(recipeId, cone)
- SET_ATMOS(recipeId, atmosphere)
- NORMALIZE_TO_100(recipeId)

### Reducer
Single reducer applies events:
- nextState = reduce(state, event)
- must be pure and deterministic

## Multi-view sync
- Shared: RecipeDoc + MaterialCatalog + UserPrefs
- Local per-view: selection, cursor, scroll, dialog state
- Compute derived from shared inputs; views subscribe to ComputeResult changes.

### Commit policy
- DOS: commit on Enter
- Win95/Mac: commit on blur or Enter (optional Apply)
- Web: debounce live preview; still emits the same domain events

### Conflict policy (v1)
- last-write-wins
- other views show “updated by another window” toast/pulse

## Caching
- Key: hash(recipeDoc + prefs) + catalogVersion
- Invalidate on any relevant input change.

## Testability
- Golden tests: known recipes → expected UMF/stull_point for each atomic weight set/catalog version.
