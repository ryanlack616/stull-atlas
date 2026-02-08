# Developer Brief

## Goal
Build **Stull Atlas** as a deterministic glaze calculation + Stull map explorer with two shells (Basic/Advanced) and synchronized “instrument” views.

## Non-negotiables
- One canonical recipe document model (single source of truth)
- One compute engine (derived results)
- Multi-view sync: edits in any view update all others
- Versioned constants & profiles (compatibility)
- Explainable diagnostics and guided actions (no opaque “AI”)

## Core subsystems
1) **Model**
   - RecipeDoc, MaterialCatalog, UserPrefs
2) **Compute**
   - Convert recipe + analyses → oxide moles → formula → unity (UMF) → derived metrics → diagnostics
3) **Map**
   - Stull point plotting, dataset overlays, LOD rendering
4) **Guidance**
   - Deterministic suggestion engine driven by diagnostics + user goal
5) **Blends**
   - Line + triaxial generators → test plan exports
6) **Persistence**
   - Project bundles / local-first storage + optional cloud sync later
7) **UI**
   - Basic shell + Advanced shell + instruments (DOS/Win95/Mac/Web)

## Risk list
- Material analysis completeness (unknown materials)
- Performance for large datasets in map
- “Exact match” expectations across calculators (constants profiles)
- UX complexity creep in Advanced

## Compatibility profiles
- Ship versioned profiles (glazy_v1, digitalfire_legacy).
- Projects lock a profile; Basic hides selection.
