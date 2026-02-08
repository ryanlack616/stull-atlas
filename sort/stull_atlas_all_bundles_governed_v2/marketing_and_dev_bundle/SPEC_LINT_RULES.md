# Spec Lint Rules (Draft)

These rules are intended to be machine-checkable. They reinforce the governance model:
**Normative docs define behavior**, **examples do not**.

---

## SL-001 — Document Status header required (Normative/Mixed docs)
**Applies to:** SPEC.md, ENGINE_CONTRACT.md, PROJECT_BUNDLE_SCHEMA_v0.md, COMPATIBILITY_CONTRACT.md

**Rule:** Each file MUST contain a `## Document Status` section near the top.

**Failure:** Missing header.

---

## SL-002 — RFC 2119 keywords reserved for normative statements
**Rule:** `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, `MAY` MUST NOT appear in illustrative documents.

**Illustrative docs include:**
- `*.example.json`
- `golden_tests.template.json`
- Any doc section labeled “Example”

**Failure:** RFC keyword found in illustrative file.

---

## SL-003 — Examples must be explicitly labeled
**Rule:** Any sample JSON, payload, or folder layout in markdown MUST be introduced with “Example:” or “Illustrative:” unless it is a schema requirement.

**Failure:** Unlabeled sample content that appears normative.

---

## SL-004 — Golden expected outputs are authoritative
**Rule:** Files named `golden_tests.expected.*.json` are treated as the normative oracle for the referenced profile.

**Failure:** Expected outputs are missing, invalid JSON, or inconsistent across profiles (e.g., missing required keys).

---

## SL-005 — Version bumps for normative changes
**Rule:** Any change to normative docs MUST be accompanied by an entry in CHANGELOG.md (and a schema/profile version bump when applicable).

**Failure:** Normative change without changelog entry.
