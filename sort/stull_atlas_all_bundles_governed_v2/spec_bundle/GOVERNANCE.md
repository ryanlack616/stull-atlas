# Stull Atlas — Specification Governance

This document defines how authority, correctness, and compatibility are determined
across the Stull Atlas ecosystem.

It exists to ensure:
- Long-term stability
- Implementation consistency
- Clear separation of intent vs enforcement
- Safe evolution of the system

---

## 1. Authority Levels

All project materials fall into one of three categories:

### 🔴 Normative
Normative content defines **what must be true** for an implementation to be considered valid.

Violations of normative rules:
- Break compatibility
- Invalidate results
- Constitute incorrect behavior

Normative language uses RFC 2119 keywords:
- **MUST**
- **MUST NOT**
- **SHOULD**
- **SHOULD NOT**
- **MAY**

### 🔵 Descriptive
Descriptive content explains:
- Design intent
- Rationale
- Architecture
- Tradeoffs

Descriptive content:
- Is non-binding
- May change without breaking compatibility
- Exists to help humans understand the system

### 🟢 Illustrative
Illustrative content provides:
- Examples
- Templates
- Sample data
- Demonstrations

Illustrative content:
- Is not authoritative
- May be incomplete
- Exists to clarify usage only

---

## 2. Authority Precedence

When conflicts exist, the following order applies:

1. **Normative specifications**
2. **Schema definitions**
3. **Golden test expected outputs**
4. **Descriptive documentation**
5. **Illustrative examples**

Nothing overrides normative specifications.

---

## 3. File Classification (Current Bundles)

### Normative (authoritative)
- SPEC.md
- ENGINE_CONTRACT.md
- PROJECT_BUNDLE_SCHEMA_v0.md
- COMPATIBILITY_CONTRACT.md
- COMPATIBILITY_PROFILES.md (when it states MUST/SHOULD behavior)
- GOLDEN_TESTS.expected.*.json
- molar_masses.*.json

### Descriptive (non-binding)
- README.md
- DEV_*.md
- MARKETING_*.md
- Roadmaps / positioning / explanatory notes

### Illustrative (non-binding)
- *.example.json
- golden_tests.template.json
- Mock layouts, diagrams, prompts, and samples

---

## 4. Golden Test Policy

Golden tests are split into two layers:

| Component | Authority |
|----------|-----------|
| Expected output JSON | **Normative** |
| Test harness / inputs | **Illustrative** |

An implementation is correct **only if its output matches expected results** for the selected profile and tolerance.

---

## 5. Required Document Header

All major documents MUST include a status header:

```markdown
## Document Status

Status: Normative | Descriptive | Mixed

Normative Sections:
- (list sections)

Descriptive Sections:
- (list sections)

Illustrative Sections:
- (list sections)

Normative keywords (MUST, SHOULD, MAY) are interpreted per RFC 2119.
Illustrative content is non-binding unless explicitly stated.
```
---

## 6. Change Control

- Normative changes require:
  - Version bump (schema/profile/spec as appropriate)
  - Explicit changelog entry
  - Updated tests or tolerance notes
- Descriptive changes do not require versioning
- Illustrative changes never affect compatibility

---

## 7. Design Principle

> Examples explain.  
> Specs define.  
> Tests enforce.
