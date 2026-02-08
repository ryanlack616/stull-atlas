# Changelog (Spec Bundle)

- 2026-01-22: Consolidated spec bundle generated from current working decisions:
  - Basic mode = Quick Calc + Explore only (older-friendly).
  - Advanced mode = 6 pages: Library, Calculator, Stull Map, Compare, Blends & Search, Limits & Checks.
  - Advanced Help has two primary branches: Guided Adjustments + Explore by Example.
  - Multi-view sync contract: one canonical doc + event vocabulary; multiple skins open in sync.
  - DOS overlay spec: CP437, 80×25, bitmap font, F-key menu mapping.
  - Added Triaxial blends and calculator view modes (Formula/Unity/Mole%/Analysis).
- 2026-01-22: Added compatibility packaging for Glazy vs Digitalfire:
  - `COMPATIBILITY_PROFILES.md`
  - `molar_masses.glazy_v1.json`
  - `molar_masses.digitalfire.json`
- 2026-01-22: v3 consolidation updates:
  - Added `COMPATIBILITY_CONTRACT.md`
  - Added `stull_guides.v1.json`
  - Added golden test templates (`GOLDEN_TESTS.md`, `golden_tests.*.json`)
  - Added project bundle schema v0 (`PROJECT_BUNDLE_SCHEMA_v0.md`, `project_manifest.example.json`)
  - Added iPad/mobile layout rules (`IPAD_LAYOUT_RULES.md`)
