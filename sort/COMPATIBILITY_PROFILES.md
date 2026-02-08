# Compatibility Profiles — Glazy vs Digitalfire

This document packages the **calculation-compatibility surface area** needed to match (or intentionally differ from)
Glazy and Digitalfire/Insight-style calculators.

> **Design rule:** Treat constants and rules as **versioned dependencies**. A “profile” is a named, immutable bundle of:
> - oxide molar masses (formula weights)
> - unity/UMF grouping rules
> - LOI / formula-weight handling conventions
> - rounding/formatting policy (display vs compute)

---

## What causes output mismatches in practice

1) **Oxide molar masses** (formula weights) differ (often only in the last digits, sometimes more).
2) **Unity rules** differ (which oxides count as “flux” or are included in the unity sum).
3) **LOI / analysis normalization** differs (whether analyses are LOI-corrected, how they are corrected, and when).
4) **Rounding** differs (internal compute precision vs displayed numbers).

---

## Profile: Digitalfire (Insight / Insight-live style)

### Oxide molar masses
See `molar_masses.digitalfire.json` for the complete list used for compatibility.

### Unity and calculation views
Digitalfire/Insight-live exposes:
- Calculation views: Formula, Analysis, Mole%
- Unity modes: Auto Unity, RO Unity, R2O3 Unity, Non Unity
- “Unity oxides” can be configured (for RO unity) in preferences.

**Stull Map contract (recommended):**
- Always plot using **flux-unity** SiO₂ and Al₂O₃ (UMF).
- The exact “unity mode” used for map plotting must be explicit (default: Auto/RO unity).

### LOI / formula weight convention
Desktop INSIGHT documents LOI-adjusted formula weights, e.g.:
- `adj_formula_weight = formula_weight / ((100 - LOI)/100)`

**Compatibility note:**
- LOI correction applies to *material analyses* and/or *recipe batch calculations* depending on dataset.
- Stull Atlas should store LOI as part of material analysis and implement correction as a deterministic step in compute.

---

## Profile: Glazy v1

### Oxide molar masses
See `molar_masses.glazy_v1.json` for the complete list used for compatibility.

### UMF grouping rules
Glazy provides “Traditional UMF” and “Extended UMF” groupings.
**Compatibility note:**
- For exact matches, treat these groupings as part of the profile, not UI preference.
- If Stull Atlas allows user-chosen groupings, that is a *different* profile.

---

## Implementation contract (Stull Atlas)

### Profile object
```json
{
  "profile_id": "glazy_v1",
  "display_name": "Glazy v1",
  "constants_version": "2026-01-22",
  "oxide_molar_masses": "...",
  "unity_rules": {
    "mode": "fixed",
    "unity_set": ["Na2O","K2O","Li2O","CaO","MgO","ZnO","BaO","SrO","PbO","..."],
    "notes": "Traditional/Extended handled as profile variants"
  },
  "loi_handling": {
    "material_analysis_is_loi_corrected": false,
    "apply_loi_correction_step": true,
    "method": "adj_fw = fw / ((100 - LOI)/100)"
  },
  "rounding": {
    "internal_precision": "float64",
    "display_decimals": 3,
    "display_rounding": "bankers_or_half_away_from_zero (choose & freeze)"
  }
}
```

### Recommended shipped profiles (Advanced)
- `glazy_v1` (default candidate if you want community compatibility)
- `digitalfire_legacy` (compat with Insight/Insight-live style weights)
- optional: `crc84`, `pubchem` (informational/verification)

### UX rule
- Basic mode: hides profile choice (uses Advanced default).
- Advanced: profile selector + “lock to project” option.

---

## What to add later (if needed)
- A “legacy rounding” mode for specific calculators (display-level parity).
- A profile migration guide if default constants ever change.
- A compatibility test harness (“golden recipes”) per profile.
