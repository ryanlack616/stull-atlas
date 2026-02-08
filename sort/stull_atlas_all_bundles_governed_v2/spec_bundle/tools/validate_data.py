#!/usr/bin/env python3
"""
Data validator for Stull Atlas constant sets and golden outputs.

Validates that shipped data is:
- parseable JSON
- sane (positive molar masses)
- internally consistent (oxide key coverage comparisons)

Supports molar mass files with metadata wrapper:
{
  "profile": "...",
  "oxide_molar_masses": { "SiO2": 60.08, ... },
  "generated": "..."
}

Exit codes:
- 0: OK (may include warnings)
- 2: FAIL (invalid JSON or non-positive/non-numeric masses)

No external dependencies.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Dict, Tuple, List, Any

def load_json(p: Path) -> Any:
    return json.loads(p.read_text(encoding="utf-8"))

def extract_masses(obj: Any) -> Dict[str, float]:
    if not isinstance(obj, dict):
        raise TypeError("root must be object")
    if "oxide_molar_masses" in obj:
        masses = obj["oxide_molar_masses"]
    else:
        masses = obj  # legacy flat map
    if not isinstance(masses, dict):
        raise TypeError("oxide_molar_masses must be object")
    return masses

def validate_molar_masses(p: Path) -> List[str]:
    issues: List[str] = []
    obj = load_json(p)
    masses = extract_masses(obj)
    for k, v in masses.items():
        if not isinstance(v, (int, float)):
            issues.append(f"{p.name}: {k} mass not number: {type(v).__name__}")
            continue
        if not (v > 0):
            issues.append(f"{p.name}: {k} mass not positive: {v}")
    return issues

def compare_keys(a: Dict, b: Dict) -> Tuple[List[str], List[str]]:
    ak = set(a.keys())
    bk = set(b.keys())
    return sorted(list(ak - bk)), sorted(list(bk - ak))

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("root", nargs="?", default=".", help="Root folder of extracted bundle/repo")
    ap.add_argument("--strict", action="store_true", help="Treat key coverage differences as failures")
    args = ap.parse_args()
    root = Path(args.root).resolve()

    failures: List[str] = []
    warnings: List[str] = []

    mm_glazy = root / "molar_masses.glazy_v1.json"
    mm_df    = root / "molar_masses.digitalfire.json"

    glazy_masses = None
    df_masses = None

    if mm_glazy.exists():
        try:
            failures.extend(validate_molar_masses(mm_glazy))
            glazy_masses = extract_masses(load_json(mm_glazy))
        except Exception as e:
            failures.append(f"{mm_glazy.name}: {e}")
    else:
        failures.append("missing molar_masses.glazy_v1.json")

    if mm_df.exists():
        try:
            failures.extend(validate_molar_masses(mm_df))
            df_masses = extract_masses(load_json(mm_df))
        except Exception as e:
            failures.append(f"{mm_df.name}: {e}")
    else:
        failures.append("missing molar_masses.digitalfire.json")

    if glazy_masses is not None and df_masses is not None:
        only_a, only_b = compare_keys(glazy_masses, df_masses)
        if only_a:
            msg = f"oxide keys only in glazy_v1: {', '.join(only_a)}"
            (failures if args.strict else warnings).append(msg)
        if only_b:
            msg = f"oxide keys only in digitalfire: {', '.join(only_b)}"
            (failures if args.strict else warnings).append(msg)

    # Ensure golden expected outputs parse
    for p in sorted(root.glob("golden_tests.expected.*.json")):
        try:
            load_json(p)
        except Exception as e:
            failures.append(f"{p.name}: invalid JSON: {e}")

    if failures:
        print("FAIL: data validation failures:")
        for i in failures:
            print(" -", i)
        if warnings:
            print("\nWarnings:")
            for w in warnings:
                print(" -", w)
        return 2

    print("OK: data validation passed.")
    if warnings:
        print("\nWarnings:")
        for w in warnings:
            print(" -", w)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
