# COMPUTE_SPEC (v0.1) — Stull Atlas Deterministic Compute Pipeline

Generated: 2026-01-27  
Scope: normative specification for the core glaze computation pipeline used by **all** UI shells.

This document makes explicit what is otherwise implied by:
- Engine & Sync Contract (single reducer + derived compute)  
- Compatibility Contract + Profiles (constants + unity rules + LOI + rounding)  
- Golden Tests (output fixtures)

---

## 0. Definitions

### 0.1 Inputs
- **RecipeDoc**: `{ id, name, cone, atmosphere, items[] }`
  - `items[]`: `{ materialId: string, percent: number }` where `percent` is batch percentage by **weight**.
- **MaterialCatalog**
  - `materials[]`: `{ id, name }`
  - `analyses[]`: per-material oxide analysis (see 0.2)
- **CompatibilityProfile**
  - immutable bundle defining:
    1) oxide molar masses
    2) unity rules (flux set / groupings)
    3) LOI handling convention
    4) rounding policy (compute vs display)
- **UserPrefs** (optional for compute): must not introduce silent defaults that change numeric results without being persisted.

### 0.2 Material Analysis representation (required)
A material analysis is **oxide weight-percent** composition plus optional LOI.
Normative minimal form:

```json
{
  "materialId": "m_xxx",
  "oxides_wt_pct": { "SiO2": 65.3, "Al2O3": 18.2, "Na2O": 3.1, "...": 0.0 },
  "LOI_pct": 0.0,
  "source": "…",
  "version": "…"
}
```

Rules:
- `oxides_wt_pct` values are interpreted as weight percent of the analyzed material.
- Oxides not present may be omitted or set to 0.0.
- If the analysis is missing (no entry), the material is **non-computable** unless the material is explicitly modeled as “zero contribution” (not recommended).

### 0.3 Oxide set
All oxides appearing in any analysis are allowed. The profile must provide molar masses for any oxide used in compute; otherwise emit `OXIDE_UNKNOWN` (ERROR).

### 0.4 Numeric precision & determinism
- Internal compute uses float64 (IEEE 754).
- Rounding is **display-only** unless a legacy profile explicitly specifies mid-compute rounding stages.
- Deterministic ordering: when iterating maps/dicts, sort oxide keys lexicographically to avoid nondeterministic sums.

---

## 1. ComputeResult contract

Normative output:

```json
{
  "status": "OK|WARN|ERROR",
  "diagnostics": [
    { "code": "…", "severity": "INFO|WARN|ERROR", "message": "…", "actions": ["…"] }
  ],
  "umf_summary": { "SiO2": 3.25, "Al2O3": 0.32, "TotalFlux": 1.0, "B2O3": 0.12, "SiO2_Al2O3": 10.16 },
  "umf_full": { "unity_set": ["Na2O","K2O", "..."], "oxides_umf": { "Na2O": 0.12, "K2O": 0.08, "CaO": 0.55, "...": 0.00 } },
  "stull_point": { "sio2": 3.25, "al2o3": 0.32, "unity_mode": "profile_default" }
}
```

Notes:
- `umf_summary` is a presentation subset but must be derivable from `umf_full` with no additional math.
- `stull_point` must be computed from flux-unity UMF values per profile unity rules.

---

## 2. Pipeline overview (normative)

Given `(RecipeDoc, MaterialCatalog, CompatibilityProfile)`:

1) **Validate recipe structure**
2) **Normalize recipe percent totals (diagnostic-only)**
3) **Resolve materials + analyses**
4) **Compute per-material oxide moles contribution**
5) **Sum oxide moles across recipe**
6) **Apply unity normalization (UMF)**
7) **Compute derived metrics + stull point**
8) **Emit diagnostics**
9) **Apply display rounding (view layer only)**

---

## 3. Step-by-step specification

### 3.1 Validate RecipeDoc
- If `items[]` empty → `RECIPE_EMPTY` (WARN); status may still be WARN with empty outputs.
- Any `percent < 0` → `RECIPE_NEGATIVE_PERCENT` (ERROR).
- Duplicate `materialId` entries are allowed but should be consolidated in reducer; if present at compute-time, consolidate by summing percents (stable order).

### 3.2 Percent total check
Let `T = sum(percent_i)`.
- If `abs(T - 100) <= 1e-6` → OK.
- Else emit `RECIPE_TOTAL_NOT_100` (WARN) and include `T` in diagnostic metadata.
- **Important:** Do not silently normalize at compute time. Normalization is a reducer event (`NORMALIZE_TO_100`) only.

### 3.3 Resolve materials + analyses
For each recipe item:
- If `materialId` not in `catalog.materials` → emit `MATERIAL_UNKNOWN` (ERROR).
- Else find analysis:
  - If analysis missing → emit `MATERIAL_NO_ANALYSIS` (ERROR).
- If any ERROR at this stage, UMF is not computable:
  - set `status = ERROR`
  - set `umf_*` and `stull_point` to null/empty
  - return (but keep full diagnostics list)

### 3.4 LOI handling (profile-defined)
A profile must state whether analyses are already LOI-corrected and, if not, whether and how to apply correction.

Normative method (when `apply_loi_correction_step = true` and analysis is not LOI-corrected):

Let `LOI = LOI_pct / 100`.

For each oxide weight percent `w` in `oxides_wt_pct`:
- corrected oxide wt%: `w' = w / (1 - LOI)`

If `LOI_pct >= 100` → `LOI_INVALID` (ERROR).

### 3.5 Convert recipe weight % into oxide moles
Let recipe item batch fraction `b = percent_i / 100`.

For each oxide `o` in the material's (possibly LOI-corrected) analysis:
- oxide weight fraction in the material: `f_o = (wt_pct_o / 100)`
- oxide weight contribution per 1 unit total batch weight: `w_o = b * f_o`
- oxide molar mass `M_o` from profile
- oxide moles contribution: `n_o = w_o / M_o`

Accumulate into global oxide moles:
`N_o = sum_i n_{o,i}`

### 3.6 Unity normalization (UMF)
The profile defines a **unity_set** of flux oxides (Traditional vs Extended etc.).
Let `U = sum_{o in unity_set} N_o`.

Rules:
- If `U <= 0` → `UNITY_SUM_ZERO` (ERROR), UMF not computable.
- For each oxide `o` in global oxides:
  - `UMF_o = N_o / U`

This defines `umf_full.oxides_umf`.

### 3.7 Derived metrics
Compute (from UMF):
- `SiO2_Al2O3 = UMF_SiO2 / UMF_Al2O3` if `UMF_Al2O3 > 0` else `RATIO_DIV_ZERO` (WARN) and omit ratio.
- `TotalFlux = sum_{o in unity_set} UMF_o` (should equal 1.0 within tolerance).

### 3.8 Stull point
Stull map point is defined as:
- `sio2 = UMF_SiO2`
- `al2o3 = UMF_Al2O3`
and must include which unity rules produced it:
- `unity_mode = profile.unity_rules` (identifier or shorthand string)

### 3.9 Diagnostics emission rules (minimum set)
Normative codes (must exist):
- WARN:
  - `RECIPE_TOTAL_NOT_100`
  - `RECIPE_EMPTY`
  - `RATIO_DIV_ZERO`
- ERROR:
  - `RECIPE_NEGATIVE_PERCENT`
  - `MATERIAL_UNKNOWN`
  - `MATERIAL_NO_ANALYSIS`
  - `OXIDE_UNKNOWN`
  - `LOI_INVALID`
  - `UNITY_SUM_ZERO`
  - `UMF_NOT_COMPUTABLE` (aggregate when any compute-blocking error exists)

Severity & status:
- `status = ERROR` if any ERROR diagnostic exists.
- else `status = WARN` if any WARN exists.
- else `status = OK`.

Primary action selection (UI):
- Basic mode should show top diagnostic by priority:
  1) MATERIAL/ANALYSIS errors
  2) unity/LOI errors
  3) total-not-100 warning
  4) ratio warning

---

## 4. Golden tests requirements
Golden tests must validate, per profile:
- UMF key oxides + flux unity sum
- Stull point (SiO2, Al2O3)
- Ratio (when defined)
- Diagnostics codes (at least top code list)

The “exact match” tolerance is profile-defined; recommended internal tolerance ≤ 1e-6.

---

## 5. Versioning
- This spec is versioned independently from the app.
- Any change that alters numeric outputs requires either:
  - a new CompatibilityProfile, or
  - a new COMPUTE_SPEC version with explicit migration notes.
