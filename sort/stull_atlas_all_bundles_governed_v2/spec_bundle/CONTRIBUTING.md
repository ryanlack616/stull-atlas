# Contributing to Stull Atlas

Thank you for contributing to Stull Atlas.

This project is built as a **spec-first, correctness-driven system**.
Contributions are welcome, but must follow the governance and authority
rules defined in this repository.

---

## 1. Core Principles

Stull Atlas is governed by three principles:

1. **Correctness over convenience**
2. **Explicit authority boundaries**
3. **Deterministic behavior**

If a contribution compromises any of these, it will not be accepted.

---

## 2. Authority Levels

All content in this repository falls into one of three categories:

### 🔴 Normative
Defines correctness and compatibility.

- Uses MUST / SHOULD / MAY language
- Changes require version bumps
- Breaking changes must be explicit

Examples:
- SPEC.md
- ENGINE_CONTRACT.md
- PROJECT_BUNDLE_SCHEMA_v0.md
- COMPATIBILITY_CONTRACT.md
- GOLDEN_TESTS.expected.*.json

### 🔵 Descriptive
Explains intent, design, or rationale.

- Non-binding
- May change without versioning
- Cannot override normative rules

Examples:
- DEV_Brief.md
- DEV_Roadmap.md
- README.md

### 🟢 Illustrative
Provides examples or templates.

- Never authoritative
- May be incomplete
- Used for learning or reference only

Examples:
- *.example.json
- golden_tests.template.json
- Diagrams or mockups

---

## 3. Contribution Rules

### ✅ Allowed
- Improving clarity of documentation
- Adding new examples
- Adding tests
- Fixing errors in descriptive text
- Proposing new features via issues

### ⚠️ Requires Review
- Any change to normative documents
- Any change to schemas
- Any change affecting calculations
- Any change to golden test expected outputs

### ❌ Not Allowed
- Modifying examples to imply behavior not defined in specs
- Introducing undocumented behavior
- Changing normative rules without version bump and changelog entry
- Adding ambiguous or implied behavior

---

## 4. Normative Language Rules

The following words are reserved and have strict meaning:

| Term | Meaning |
|-----|--------|
| MUST | Required |
| MUST NOT | Forbidden |
| SHOULD | Strong recommendation |
| MAY | Optional |

If you use these words, your section is normative.

---

## 5. Golden Test Policy

Golden tests define **correct output**.

- Expected output files are **normative**
- Test harnesses are **illustrative**
- If expected output changes, it is a breaking change unless explicitly versioned

---

## 6. Versioning Rules

- Normative changes → **Version bump required**
- Descriptive changes → No version bump
- Illustrative changes → No version bump

---

## 7. Contribution Checklist

Before submitting:

- [ ] I identified whether my change is normative, descriptive, or illustrative
- [ ] I updated versioning if required
- [ ] I did not mix examples with rules
- [ ] I did not weaken existing guarantees
- [ ] I verified golden tests and/or validation where applicable

---

## 8. Design Philosophy

> Examples explain.  
> Specs define.  
> Tests enforce.

All contributions should respect this hierarchy.
