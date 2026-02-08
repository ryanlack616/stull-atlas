#!/usr/bin/env python3
"""
Spec linter for Stull Atlas bundles.

Goals:
- Enforce Document Status headers *when the target files exist*
- Prevent RFC-2119 keywords in illustrative files
- Provide a quick health report for bundle/repo hygiene

No external dependencies.
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import List

RFC_REGEX = re.compile(r"\b(MUST|SHOULD|MAY)\b")

# These are checked *if present* (different bundles may not include all).
STATUS_HEADER_TARGETS = {
    "SPEC.md",
    "ENGINE_CONTRACT.md",
    "PROJECT_BUNDLE_SCHEMA_v0.md",
    "COMPATIBILITY_CONTRACT.md",
}

ILLUSTRATIVE_PATTERNS = [
    re.compile(r".*\.example\.json$"),
    re.compile(r"golden_tests\.template\.json$"),
]

def is_illustrative_file(p: Path) -> bool:
    return any(rx.match(p.name) for rx in ILLUSTRATIVE_PATTERNS)

def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")

def check_status_header(root: Path) -> List[str]:
    errors = []
    for name in STATUS_HEADER_TARGETS:
        p = root / name
        if not p.exists():
            continue  # bundle may not ship this file
        txt = read_text(p)
        if "## Document Status" not in txt[:2000]:
            errors.append(f"SL-001 missing '## Document Status' in {name}")
    return errors

def check_rfc_keywords_in_illustrative(root: Path) -> List[str]:
    errors = []
    for p in root.rglob("*"):
        if not p.is_file():
            continue
        if is_illustrative_file(p):
            txt = read_text(p)
            if RFC_REGEX.search(txt):
                errors.append(f"SL-002 RFC keyword found in illustrative file: {p.relative_to(root)}")
    return errors


def check_normative_hashes(root: Path) -> List[str]:
    """
    SL-006 — Normative hashes must match unless CHANGELOG acknowledges update.

    If NORMATIVE_HASHES.json exists, compare sha256 for any listed file present.
    If mismatches exist, fail unless CHANGELOG.md contains:
      "Normative hashes updated: <generated-date>"
    """
    errors: List[str] = []
    hashes_path = root / "NORMATIVE_HASHES.json"
    if not hashes_path.exists():
        return errors

    try:
        data = json.loads(hashes_path.read_text(encoding="utf-8"))
    except Exception as e:
        return [f"SL-006 invalid NORMATIVE_HASHES.json: {e}"]

    files = data.get("files", {})
    generated = data.get("generated", "")
    mismatches: List[str] = []

    import hashlib
    def sha256_file(p: Path) -> str:
        h = hashlib.sha256()
        with p.open("rb") as f:
            for chunk in iter(lambda: f.read(1024 * 1024), b""):
                h.update(chunk)
        return h.hexdigest()

    for rel, meta in files.items():
        p = root / rel
        if not p.exists():
            continue
        expected = meta.get("sha256", "")
        actual = sha256_file(p)
        if expected and actual != expected:
            mismatches.append(rel)

    if not mismatches:
        return errors

    changelog = root / "CHANGELOG.md"
    ack_needed = f"Normative hashes updated: {generated}"
    if changelog.exists():
        cl = changelog.read_text(encoding="utf-8", errors="replace")
        if ack_needed in cl:
            return errors  # acknowledged
    errors.append("SL-006 normative hash mismatch (update NORMATIVE_HASHES.json and add CHANGELOG entry: "
                  + ack_needed + "). Files: " + ", ".join(mismatches))
    return errors


def check_json_parses(root: Path) -> List[str]:
    errors = []
    for p in root.rglob("*.json"):
        try:
            json.loads(p.read_text(encoding="utf-8"))
        except Exception as e:
            errors.append(f"SL-JSON invalid JSON: {p.relative_to(root)} :: {e}")
    return errors

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("root", nargs="?", default=".", help="Root folder of extracted bundle/repo")
    ap.add_argument("--json", action="store_true", help="Emit machine-readable JSON report")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    issues: List[str] = []
    issues.extend(check_status_header(root))
    issues.extend(check_rfc_keywords_in_illustrative(root))
    issues.extend(check_json_parses(root))
    issues.extend(check_normative_hashes(root))

    ok = len(issues) == 0

    if args.json:
        print(json.dumps({"ok": ok, "issues": issues}, indent=2))
    else:
        if ok:
            print("OK: spec lint passed.")
        else:
            print("FAIL: spec lint found issues:")
            for i in issues:
                print(" -", i)

    return 0 if ok else 2

if __name__ == "__main__":
    raise SystemExit(main())
