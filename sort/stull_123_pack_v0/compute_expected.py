#!/usr/bin/env python3
"""Stull Atlas reference compute engine (v0.1)

Implements COMPUTE_SPEC.md (v0.1) for:
- recipe validation
- analysis resolution
- LOI correction (optional, profile flag)
- oxide moles -> UMF by unity flux set
- derived metrics + stull point
- diagnostics emission
- golden expected JSON generation per profile

This script is intentionally strict and deterministic.

Usage:
  python compute_expected.py \
    --golden-template golden_tests.template.filled.v0.json \
    --catalog material_catalog.json \
    --profile molar_masses.glazy_v1.json \
    --unity-set Na2O,K2O,CaO,MgO,ZnO,Li2O,SrO,BaO,PbO,FeO,Fe2O3,CuO,CoO,NiO,MnO,MnO2 \
    --out golden_tests.expected.glazy_v1.json

Notes:
- unity-set should match your COMPATIBILITY_PROFILE rules. This is a CLI arg so you can lock it.
- material_catalog.json must include analyses for every material used by each recipe (except test m_unknown).
"""

import argparse, json, math
from typing import Dict, Any, List, Tuple

def stable_sorted_items(d: Dict[str, float]):
    return [(k, d[k]) for k in sorted(d.keys())]

def diag(code, severity, message, actions=None, meta=None):
    o = {"code": code, "severity": severity, "message": message}
    if actions: o["actions"] = actions
    if meta: o["meta"] = meta
    return o

def load_profile(path: str) -> Dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def load_json(path: str) -> Dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def consolidate_items(items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    acc: Dict[str, float] = {}
    for it in items:
        mid = it["materialId"]
        acc[mid] = acc.get(mid, 0.0) + float(it["percent"])
    # stable order by materialId
    return [{"materialId": mid, "percent": acc[mid]} for mid in sorted(acc.keys())]

def compute_one(recipe: Dict[str, Any],
                catalog: Dict[str, Any],
                molar_masses: Dict[str, float],
                unity_set: List[str],
                apply_loi_correction: bool = False) -> Dict[str, Any]:
    diags: List[Dict[str, Any]] = []
    items = consolidate_items(recipe.get("items", []))

    if len(items) == 0:
        diags.append(diag("RECIPE_EMPTY", "WARN", "Recipe has no materials."))
        return {"status": "WARN", "diagnostics": diags, "umf_summary": {}, "umf_full": {}, "stull_point": None}

    # Validate percents
    for it in items:
        if float(it["percent"]) < 0:
            diags.append(diag("RECIPE_NEGATIVE_PERCENT", "ERROR", "Negative percent is invalid.", meta={"materialId": it["materialId"]}))
    # Total check
    T = sum(float(it["percent"]) for it in items)
    if abs(T - 100.0) > 1e-6:
        diags.append(diag("RECIPE_TOTAL_NOT_100", "WARN", "Recipe total is not 100%.", actions=["NORMALIZE_TO_100"], meta={"total": T}))

    # Catalog indices
    materials = {m["id"]: m for m in catalog.get("materials", [])}
    analyses = {a["materialId"]: a for a in catalog.get("analyses", [])}

    # Resolve analyses
    blocking_error = False
    for it in items:
        mid = it["materialId"]
        if mid not in materials:
            diags.append(diag("MATERIAL_UNKNOWN", "ERROR", "Material is not in catalog.", actions=["REMOVE_MATERIAL"], meta={"materialId": mid}))
            blocking_error = True
            continue
        if mid not in analyses:
            diags.append(diag("MATERIAL_NO_ANALYSIS", "ERROR", "Material has no oxide analysis.", actions=["OPEN_IN_ADVANCED","REMOVE_MATERIAL"], meta={"materialId": mid}))
            blocking_error = True

    if blocking_error:
        diags.append(diag("UMF_NOT_COMPUTABLE", "ERROR", "UMF cannot be computed due to missing materials/analyses."))
        return {"status": "ERROR", "diagnostics": diags, "umf_summary": None, "umf_full": None, "stull_point": None}

    # Accumulate oxide moles
    N: Dict[str, float] = {}
    for it in items:
        mid = it["materialId"]
        b = float(it["percent"]) / 100.0
        a = analyses[mid]
        ox = dict(a.get("oxides_wt_pct", {}))
        loi = float(a.get("LOI_pct", 0.0))
        if apply_loi_correction:
            if loi >= 100.0:
                diags.append(diag("LOI_INVALID", "ERROR", "LOI_pct >= 100 is invalid.", meta={"materialId": mid, "LOI_pct": loi}))
                diags.append(diag("UMF_NOT_COMPUTABLE", "ERROR", "UMF cannot be computed due to LOI error."))
                return {"status": "ERROR", "diagnostics": diags, "umf_summary": None, "umf_full": None, "stull_point": None}
            scale = 1.0 / (1.0 - loi/100.0) if loi > 0 else 1.0
            for k in list(ox.keys()):
                ox[k] = float(ox[k]) * scale

        for o, wt_pct in stable_sorted_items(ox):
            f = float(wt_pct) / 100.0
            w = b * f
            if o not in molar_masses:
                diags.append(diag("OXIDE_UNKNOWN", "ERROR", "Oxide molar mass missing from profile.", meta={"oxide": o, "materialId": mid}))
                diags.append(diag("UMF_NOT_COMPUTABLE", "ERROR", "UMF cannot be computed due to unknown oxide molar mass."))
                return {"status": "ERROR", "diagnostics": diags, "umf_summary": None, "umf_full": None, "stull_point": None}
            M = float(molar_masses[o])
            n = w / M
            N[o] = N.get(o, 0.0) + n

    U = sum(N.get(o, 0.0) for o in unity_set)
    if U <= 0:
        diags.append(diag("UNITY_SUM_ZERO", "ERROR", "Unity flux sum is zero or negative; cannot compute UMF."))
        diags.append(diag("UMF_NOT_COMPUTABLE", "ERROR", "UMF cannot be computed due to unity sum."))
        return {"status": "ERROR", "diagnostics": diags, "umf_summary": None, "umf_full": None, "stull_point": None}

    UMF = {o: (N[o]/U) for o in N.keys()}

    # Derived metrics
    sio2 = UMF.get("SiO2", 0.0)
    al2o3 = UMF.get("Al2O3", 0.0)
    ratio = None
    if al2o3 > 0:
        ratio = sio2 / al2o3
    else:
        diags.append(diag("RATIO_DIV_ZERO", "WARN", "Al2O3 is zero; ratio undefined."))

    total_flux = sum(UMF.get(o, 0.0) for o in unity_set)

    # Status from diags
    has_err = any(d["severity"] == "ERROR" for d in diags)
    has_warn = any(d["severity"] == "WARN" for d in diags)
    status = "ERROR" if has_err else ("WARN" if has_warn else "OK")

    umf_full = {
        "unity_set": unity_set,
        "oxides_umf": {k: UMF[k] for k in sorted(UMF.keys())}
    }
    umf_summary = {
        "SiO2": sio2,
        "Al2O3": al2o3,
        "TotalFlux": total_flux,
        "SiO2_Al2O3": ratio
    }
    if "B2O3" in UMF:
        umf_summary["B2O3"] = UMF["B2O3"]

    stull_point = {"sio2": sio2, "al2o3": al2o3}

    return {"status": status, "diagnostics": diags, "umf_summary": umf_summary, "umf_full": umf_full, "stull_point": stull_point}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--golden-template", required=True)
    ap.add_argument("--catalog", required=True)
    ap.add_argument("--profile", required=True)
    ap.add_argument("--unity-set", required=True, help="Comma-separated list of flux oxides for unity.")
    ap.add_argument("--apply-loi-correction", action="store_true")
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    gt = load_json(args.golden_template)
    catalog = load_json(args.catalog)
    prof = load_profile(args.profile)

    molar_masses = prof.get("oxide_molar_masses", {})
    unity_set = [s.strip() for s in args.unity_set.split(",") if s.strip()]

    out_expected = []
    for r in gt["recipes"]:
        res = compute_one(r["recipeDoc"], catalog, molar_masses, unity_set, apply_loi_correction=args.apply_loi_correction)
        out_expected.append({
            "id": r["id"],
            "name": r["name"],
            "expect": {
                "status": res["status"],
                "diagnostic_codes": [d["code"] for d in res["diagnostics"]],
                "umf": (res["umf_full"]["oxides_umf"] if res["umf_full"] else None),
                "stull_point": res["stull_point"],
                "ratio_sio2_al2o3": (res["umf_summary"].get("SiO2_Al2O3") if res["umf_summary"] else None)
            }
        })

    payload = {"generated": "2026-01-27", "profile": prof.get("profile",""), "expected": out_expected}
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

if __name__ == "__main__":
    main()
