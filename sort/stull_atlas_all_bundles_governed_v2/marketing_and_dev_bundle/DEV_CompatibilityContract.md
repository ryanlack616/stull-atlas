# Compatibility Contract (Atomic Weights / Oxide Molar Masses / Unity / LOI)

Generated: 2026-01-22

## Purpose
Stull Atlas must be able to reproduce outputs users expect from common calculators by selecting a Compatibility Profile.

A profile is an immutable bundle of:
1) Oxide molar masses (formula weights)
2) Unity rules (what counts in the unity sum; traditional/extended groups)
3) LOI handling (if/when/how LOI correction is applied)
4) Rounding policy (compute vs display)

Profiles are versioned dependencies. Any change requires a new profile version.

## Non-negotiable rules
- Profiles are immutable once released.
- Projects lock a profile at creation (recommended default).
- Compute uses float64 internally; rounding is display-only unless a profile explicitly requires legacy rounding.
- All shells use the same compute result; different views format the same numbers.

## Default shipped profiles (v1 recommendation)
- glazy_v1 — default for broad community parity
- digitalfire_legacy — compatibility with Digitalfire / Insight-style constants and expectations

## “Exact match” definition
A profile match is considered exact if:
- UMF values match to ≤ 1e-6 internally (or the profile-defined tolerance)
- Displayed values match using the profile’s display rounding (e.g., 3 decimals)

If a program rounds mid-compute (legacy), that is a separate profile with explicit rounding stages.

## Unity mode for Stull plotting
For Stull map coordinates, Stull Atlas must explicitly state:
- Unity set used (Traditional vs Extended)
- Default: Traditional unity flux set (profile-defined)

If you allow user-selectable unity sets, that is a project-level setting and must be saved in project metadata.
