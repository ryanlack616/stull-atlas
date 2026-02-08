#!/usr/bin/env python3
"""Export Stull points for Taichi viewer.

Converts a golden expected file into `stull_points.json`.

Input: golden_tests.expected.<profile>.json
Output: stull_points.json

Fields:
- position: expect.stull_point (SiO2, Al2O3)
- color (default): ratio_sio2_al2o3 if present else 0
- height (default): B2O3 UMF if present else 0
- metrics: includes TotalFlux (computed from UMF fluxes if possible), plus any UMF oxides present
- severity: 2 if any ERROR-like codes, 1 if any diagnostics exist, else 0

Note: this exporter is intentionally simple; the UI shell can choose richer mappings later.
"""

import argparse, json

ERROR_CODES = {
  "UMF_NOT_COMPUTABLE","MATERIAL_UNKNOWN","MATERIAL_NO_ANALYSIS","UNITY_SUM_ZERO","OXIDE_UNKNOWN",
  "RECIPE_NEGATIVE_PERCENT","LOI_INVALID"
}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--expected", required=True)
    ap.add_argument("--out", default="stull_points.json")
    ap.add_argument("--unity-set", default="Na2O,K2O,CaO,MgO,ZnO,Li2O,BaO,SrO,PbO,FeO",
                    help="Comma-separated flux oxides used to approximate TotalFlux from UMF")
    args = ap.parse_args()

    unity = [s.strip() for s in args.unity_set.split(",") if s.strip()]

    with open(args.expected, "r", encoding="utf-8") as f:
        data = json.load(f)

    points = []
    for item in data.get("expected", []):
        ex = item.get("expect", {})
        sp = ex.get("stull_point") or {}
        if sp.get("sio2") is None or sp.get("al2o3") is None:
            continue

        codes = ex.get("diagnostic_codes", []) or []
        sev = 0
        if any(c in ERROR_CODES for c in codes):
            sev = 2
        elif len(codes) > 0:
            sev = 1

        umf = ex.get("umf") or {}
        if not isinstance(umf, dict):
            umf = {}

        # Derived-ish metrics
        total_flux = 0.0
        for o in unity:
            total_flux += float(umf.get(o, 0.0))

        height = float(umf.get("B2O3", 0.0))
        color = ex.get("ratio_sio2_al2o3")
        color = float(color) if color is not None else 0.0

        points.append({
            "id": item.get("id"),
            "name": item.get("name"),
            "sio2": float(sp["sio2"]),
            "al2o3": float(sp["al2o3"]),
            "color": color,
            "height": height,
            "severity": sev,
            "metrics": {
                "ratio": color,
                "b2o3": height,
                "total_flux": total_flux,
                "umf": umf
            }
        })

    with open(args.out, "w", encoding="utf-8") as f:
        json.dump({"points": points}, f, indent=2)

if __name__ == "__main__":
    main()
