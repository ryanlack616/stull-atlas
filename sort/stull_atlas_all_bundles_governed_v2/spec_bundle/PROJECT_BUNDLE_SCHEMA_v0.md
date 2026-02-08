# Project Bundle Schema v0 (Portable, Local-first)

## Document Status

Status: Normative

Normative Sections:
- Bundle structure requirements
- Manifest requirements
- Schema versioning rules
- Validation rules

Descriptive Sections:
- Goal
- Rationale

Illustrative Sections:
- Recommended bundle form (paths) if labeled “Recommended”
- Examples

Generated: 2026-01-22

## Goal
A future-proof, platform-agnostic project bundle that separates:
- Model (recipes, catalog, profiles)
- View (layout, UI state)
- Assets (images, test photos)

## Recommended bundle form
A folder (or zip) with stable paths:

project.stull/
  manifest.json
  model/
    recipes/
      r_*.json
    variants/
      v_*.json
    catalog/
      materials.json
      analyses.json
    profiles/
      profile_<id>.json
  view/
    layout.json
    ui_state.json
  assets/
    blobs/
      <sha256>.<ext>
    index.json
  exports/

## Manifest
- project id, name
- created_at, updated_at
- schema_version
- default_profile_id
- catalog_version(s)
- app_version (optional)

## Migrations
- Maintain schema_version + migration scripts.
- Never mutate old bundles silently; migrate on open → write new version.

## Variants
Store as patches against a base recipe:
- base recipe id
- patch ops (add/remove/set)
- human name

## Assets
Store content-addressed blobs:
- compute sha256, store once
- index maps logical names → blob hashes

## Security
- No remote URLs inside a project by default.
- Explicit import/export boundaries.
