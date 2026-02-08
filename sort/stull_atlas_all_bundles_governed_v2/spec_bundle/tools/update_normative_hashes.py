#!/usr/bin/env python3
"""
Regenerate NORMATIVE_HASHES.json for this bundle/repo.

Use this whenever you modify any normative artifact (specs, schemas, constants, golden outputs).
"""
from __future__ import annotations

import argparse
import datetime
import hashlib
import json
from pathlib import Path

NORMATIVE_TARGETS = [
    "SPEC.md",
    "ENGINE_CONTRACT.md",
    "PROJECT_BUNDLE_SCHEMA_v0.md",
    "COMPATIBILITY_CONTRACT.md",
    "COMPATIBILITY_PROFILES.md",
    "GOLDEN_TESTS.md",
    "molar_masses.glazy_v1.json",
    "molar_masses.digitalfire.json",
    "golden_tests.expected.glazy_v1.json",
    "golden_tests.expected.digitalfire_legacy.json",
]

def sha256_file(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def generate(root: Path) -> dict:
    files = {}
    missing = []
    for name in NORMATIVE_TARGETS:
        p = root / name
        if p.exists():
            files[name] = {"sha256": sha256_file(p)}
        else:
            missing.append(name)

    return {
        "generated": datetime.date.today().isoformat(),
        "normative_targets": NORMATIVE_TARGETS,
        "files": files,
        "missing": missing,
        "notes": "Update this file whenever normative artifacts change. If you update hashes, add a CHANGELOG entry: 'Normative hashes updated: <date>'."
    }

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("root", nargs="?", default=".", help="Root folder of extracted bundle/repo")
    args = ap.parse_args()
    root = Path(args.root).resolve()

    out = root / "NORMATIVE_HASHES.json"
    out.write_text(json.dumps(generate(root), indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {out}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
