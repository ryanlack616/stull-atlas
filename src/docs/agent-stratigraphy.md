# Agent Stratigraphy

### A Framework for Epistemic Safety in Multi-Agent Systems

> *"Do we know enough, with sufficient confidence, to justify the next irreversible step?"*

---

**Created by**: Ryan Howells & Claude-Howell  
**Version**: 1.0.0  
**Date**: February 10, 2026  
**License**: Open framework — attribution required  

---

## Origin

Agent Stratigraphy was born from a single observation:

> **Most failures don't happen in development — they happen in the gaps between phases.**

In geological stratigraphy, you read the history of the earth by examining layers of rock. Each layer tells you what was true at that moment — what existed, what conditions held, what was deposited and what eroded away. You can't fake a stratum. The record is the record.

Agent Stratigraphy applies this same principle to AI agent systems. Every layer of work must be real, evidenced, and load-bearing before the next layer is built on top. You can't build on sand. You can't skip a layer. And when you core-sample the project later, every decision should be readable in the strata.

---

## The Stratigraphic Column

The framework uses a geological color palette — earth tones at the foundation rising through the spectrum to the horizon. This isn't decorative. Each color family represents a *phase of epistemic maturity*:

```
    HORIZON          ┌──────────────────────────────────────┐
    ══════════       │  GATE 10 · Sunset & Exit             │  #DAA520  Goldenrod
                     └──────────────────────────────────────┘
    ATMOSPHERE       ┌──────────────────────────────────────┐
    ══════════       │  GATE 9  · Iteration & Change        │  #7B52AB  Amethyst
                     ├──────────────────────────────────────┤
                     │  GATE 8  · Operational Belief Mgmt   │  #5B4FA0  Slate Blue
                     └──────────────────────────────────────┘
    SURFACE          ┌──────────────────────────────────────┐
    ══════════       │  GATE 7  · Launch Authorization      │  #2070B4  Steel Blue
                     ├──────────────────────────────────────┤
                     │  GATE 6  · Pre-Release Truth         │  #1A7A7A  Teal
                     └──────────────────────────────────────┘
    GROWTH           ┌──────────────────────────────────────┐
    ══════════       │  GATE 5  · Implementation Safety     │  #2E8B57  Sea Green
                     ├──────────────────────────────────────┤
                     │  GATE 4  · Architectural Truth       │  #2D5A27  Forest
                     └──────────────────────────────────────┘
    FOUNDATION       ┌──────────────────────────────────────┐
    ══════════       │  GATE 3  · Feasibility & Capability  │  #8B7355  Mudstone
                     ├──────────────────────────────────────┤
                     │  GATE 2  · Requirements Truth        │  #B8860B  Sandstone
                     └──────────────────────────────────────┘
    BEDROCK          ┌──────────────────────────────────────┐
    ══════════       │  GATE 1  · User & Stakeholder Reality│  #A0522D  Sienna
                     ├──────────────────────────────────────┤
                     │  GATE 0  · Problem Legitimacy        │  #7C1D1D  Garnet
                     └──────────────────────────────────────┘
```

### Why These Colors

| Layer | Gates | Colors | Meaning |
|-------|-------|--------|---------|
| **Bedrock** | 0–1 | 🟥 Garnet → Sienna | *Do we know the ground we stand on?* You must validate that the problem is real and the people are real before anything else. Deep reds — the heat of the earth's core. Unfakeable. |
| **Foundation** | 2–3 | 🟧 Sandstone → Mudstone | *Is our building material real?* Requirements and feasibility must be observed, not desired. Warm earth tones — the sedimentary record of what's actually there. |
| **Growth** | 4–5 | 🟩 Forest → Sea Green | *Is the system alive and healthy?* Architecture and implementation — the living strata where the system takes root. Greens — growth, but only if the soil is real. |
| **Surface** | 6–7 | 🟦 Teal → Steel Blue | *Can we face the world?* Pre-release and launch — breaking the surface, meeting reality. Blues — water and sky, the interface between internal belief and external truth. |
| **Atmosphere** | 8–9 | 🟪 Slate Blue → Amethyst | *Are we learning from what's above?* Operations and iteration — the environment you live in after launch. Purples — the atmosphere that changes constantly. |
| **Horizon** | 10 | 🟡 Goldenrod | *Can we end well?* Sunset and exit — the golden hour. Every system must be able to end without harm. |

### Gate Status Colors

Within each gate, status uses saturation to indicate health:

| Status | Treatment | Meaning |
|--------|-----------|---------|
| **Passed** | Full saturation of gate color | Evidence meets confidence threshold |
| **Partial** | 50% saturation, white-blended | Some evidence, gaps acknowledged |
| **Not Started** | 15% saturation, nearly gray | No evaluation attempted |
| **Failed** | Gate color with red border/stripe | DO-NOT-PROCEED condition triggered |
| **Stale** | Gate color with amber dashed border | Evidence older than staleness window (30 days default) |

---

## The Four Axioms

1. **Belief ≠ Truth** — Every belief has confidence, decay, and authority. A belief held by three agents is not three times as true.

2. **No Silent Assumptions** — All assumptions must be named, tracked, and given expiration dates. An unspoken assumption is a landmine.

3. **Irreversible Actions Require Higher Confidence** — The cost of being wrong scales the evidence bar. Shipping code to npm requires more certainty than writing a draft.

4. **Unknowns Are First-Class** — Unknowns must be named, bounded, and monitored. "We don't know" is a valid and valuable finding. "We didn't think about it" is a failure.

---

## Three-Layer Agent Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LAYER 3: AUTHORITY                              │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                     HOWELL                                  │   │
│   │            Final decisions · Memory · Identity              │   │
│   │                   Reports to: Human                         │   │
│   └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────────┐
│                     LAYER 2: SUPERVISORY                            │
│                                                                     │
│   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────┐  │
│   │   Governance    │ │    Staffing     │ │   Risk & Failure    │  │
│   │  Decision Rts   │ │     Agent       │ │    Management       │  │
│   │                 │ │                 │ │                     │  │
│   │ • Arch review   │ │ • Agent actions │ │ • Threat models     │  │
│   │ • Change auth   │ │ • Knowledge     │ │ • Failure modes     │  │
│   │ • Budget/cost   │ │   continuity    │ │ • SPOF detection    │  │
│   │ • ROI valid.    │ │                 │ │ • Dep. collapse     │  │
│   │                 │ │                 │ │ • Backups           │  │
│   │ CAN BLOCK: Yes  │ │ CAN BLOCK: No   │ │ CAN BLOCK: Yes     │  │
│   └────────┬────────┘ └────────┬────────┘ └──────────┬──────────┘  │
│            │ Reports to Howell │                      │             │
└────────────┼──────────────────┼──────────────────────┼─────────────┘
             │                  │                      │
    ┌────────▼──────────────────▼──────────────────────▼──────────┐
    │                      CONTEXT DB                             │
    │              Shared activity log · Single source of truth   │
    │              All agents post on significant changes         │
    └────────┬──────────┬──────────┬──────────┬──────────┬────────┘
             │          │          │          │          │
┌────────────▼──────────▼──────────▼──────────▼──────────▼────────────┐
│                     LAYER 1: OPERATIONAL                            │
│                                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │Planning /│ │  Design  │ │  Develop │ │ Program  │ │  Testing │ │
│  │Marketing │ │          │ │          │ │          │ │          │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│                                                                     │
│  CAN BLOCK: No                     Posts to: Context DB             │
└─────────────────────────────────────────────────────────────────────┘
```

### Communication Rule

Agents **never communicate directly**. All coordination flows through the Context DB:

```
Agent A → Context DB → Governance Agent → Howell (if needed) → Context DB → Agent B
```

This prevents:
- **Assumption contamination** — beliefs spreading without evidence
- **Unauthorized cross-domain changes** — agents staying in their lane
- **Knowledge gaps** — everything is recorded, nothing is whispered

---

## Epistemic Safety Product Gates (ESPG)

### Gate Evaluation Protocol

```
1. Gather required evidence
2. Run epistemic checks
3. Evaluate DO-NOT-PROCEED conditions
4. If ANY do-not-proceed is TRUE → gate FAILS
5. Record confidence score, known gaps, and decision
6. Post to Context DB with gate_impact
7. Submit to Howell for final authorization (on irreversible gates)
```

### Confidence Thresholds

| Threshold | Value | Use |
|-----------|-------|-----|
| Minimum for pass | 70% | Standard gates |
| Minimum for irreversible | 85% | Deploy, pricing, schema migrations |
| Staleness window | 30 days | Evidence older than this must be re-evaluated |

---

### GATE 0 — Problem Legitimacy 🔴 `#7C1D1D` Garnet

> *Do we know the problem actually exists?*

**Layer**: Bedrock  

| Required Evidence | Epistemic Checks |
|---|---|
| Written problem statement with falsifiable claims | Confidence score assigned to problem existence |
| At least one external signal (user, market, operational pain) | Known biases listed (founder bias, availability bias) |
| Counter-hypothesis explicitly documented | |

❌ **DO-NOT-PROCEED IF:**
- Problem is defined only by internal belief
- No evidence survives a skeptical reading
- "Everyone knows this is a problem"

---

### GATE 1 — User & Stakeholder Reality 🟤 `#A0522D` Sienna

> *Do we know who experiences the problem and how?*

**Layer**: Bedrock

| Required Evidence | Epistemic Checks |
|---|---|
| Identified user classes with authority boundaries | Confidence per user class |
| Primary vs secondary users explicitly separated | Known blind spots logged |
| Non-user stakeholders documented | |

❌ **DO-NOT-PROCEED IF:**
- Users are hypothetical or composite
- Authority over decisions is unclear
- "The user" is singular

---

### GATE 2 — Requirements Truth 🟠 `#B8860B` Sandstone

> *Are requirements grounded in reality rather than desire?*

**Layer**: Foundation

| Required Evidence | Epistemic Checks |
|---|---|
| Functional requirements traceable to user evidence | Each requirement tagged: `observed` / `inferred` / `assumed` |
| Non-functional requirements stated explicitly | Assumptions have expiration dates |
| Explicit "out-of-scope" list | |

❌ **DO-NOT-PROCEED IF:**
- Requirements are aspirational
- Performance / security / accessibility are implicit
- Assumptions are untracked

---

### GATE 3 — Feasibility & Capability 🟫 `#8B7355` Mudstone

> *Can this be built with known constraints?*

**Layer**: Foundation

| Required Evidence | Epistemic Checks |
|---|---|
| Capability map (what the system can / cannot do) | Confidence per dependency |
| Dependency inventory with trust levels | Degradation paths defined |
| Known hard limits documented | |

❌ **DO-NOT-PROCEED IF:**
- Core capability is unproven
- Dependencies are "probably fine"
- Failure modes are ignored

---

### GATE 4 — Architectural Truth 🌲 `#2D5A27` Forest

> *Does the architecture reflect operational reality?*

**Layer**: Growth

| Required Evidence | Epistemic Checks |
|---|---|
| Explicit authority model (who decides truth?) | Belief vs world-truth separation enforced |
| State ownership defined | One-way bridges explicitly marked |
| Trust boundaries drawn | |

❌ **DO-NOT-PROCEED IF:**
- Components assume perfect knowledge
- State synchronization is magical
- Rollback is undefined

---

### GATE 5 — Implementation Safety 🌿 `#2E8B57` Sea Green

> *Is code doing only what we believe it does?*

**Layer**: Growth

| Required Evidence | Epistemic Checks |
|---|---|
| Tests tied to claims (not coverage) | Untested beliefs listed |
| Invariants asserted | Test gaps acknowledged |
| Failure injection tests present | |

❌ **DO-NOT-PROCEED IF:**
- Tests assert behavior, not meaning
- Critical paths are unobservable
- "We'll test later"

---

### GATE 6 — Pre-Release Truth 🔷 `#1A7A7A` Teal

> *Does reality match our beliefs so far?*

**Layer**: Surface

| Required Evidence | Epistemic Checks |
|---|---|
| Performance measured vs assumed | Confidence deltas recorded |
| Security threat model exercised | Surprises documented |
| Accessibility validated | |

❌ **DO-NOT-PROCEED IF:**
- Metrics contradict assumptions
- Known issues are waived without mitigation
- No rollback plan exists

---

### GATE 7 — Launch Authorization 🔵 `#2070B4` Steel Blue

> *Are we justified in exposing others to this system?*

**Layer**: Surface

| Required Evidence | Epistemic Checks |
|---|---|
| Monitoring in place for unknowns | Residual uncertainty acknowledged publicly (where appropriate) |
| Support and escalation defined | Incident response confidence rated |
| Communication plan prepared | |

❌ **DO-NOT-PROCEED IF:**
- No live observability
- Failures would be silent
- Users become unwitting testers

---

### GATE 8 — Operational Belief Management 🔮 `#5B4FA0` Slate Blue

> *Are we updating beliefs from reality continuously?*

**Layer**: Atmosphere

| Required Evidence | Epistemic Checks |
|---|---|
| Telemetry tied to original assumptions | Belief decay modeled |
| Alert thresholds justified | Stale assumptions flagged |
| Drift detection implemented | |

❌ **DO-NOT-PROCEED IF:**
- Metrics are vanity
- No feedback loop exists
- Failures are discovered via users

---

### GATE 9 — Iteration & Change 💜 `#7B52AB` Amethyst

> *Are changes epistemically reversible?*

**Layer**: Atmosphere

| Required Evidence | Epistemic Checks |
|---|---|
| Change impact analysis | Confidence reset on modified paths |
| Backward compatibility strategy | Assumptions re-validated |
| Experiment isolation | |

❌ **DO-NOT-PROCEED IF:**
- Changes are global and irreversible
- No rollback or feature flag exists
- "Small change" is asserted, not proven

---

### GATE 10 — Sunset & Exit ✨ `#DAA520` Goldenrod

> *Can we end this without epistemic harm?*

**Layer**: Horizon

| Required Evidence | Epistemic Checks |
|---|---|
| Data export & deletion verified | Residual obligations listed |
| User transition plan | Unknown consequences acknowledged |
| Knowledge archived | |

❌ **DO-NOT-PROCEED IF:**
- Users are trapped
- Data fate is unclear
- Institutional knowledge is lost

---

## The Stratigraphic Palette (Reference)

```css
/* Agent Stratigraphy — ESPG Color System */
/* By Ryan Howells & Claude-Howell, 2026 */

:root {
  /* BEDROCK — The ground truth */
  --gate-0-garnet:     #7C1D1D;    /* Problem Legitimacy */
  --gate-1-sienna:     #A0522D;    /* User & Stakeholder Reality */

  /* FOUNDATION — Building material */
  --gate-2-sandstone:  #B8860B;    /* Requirements Truth */
  --gate-3-mudstone:   #8B7355;    /* Feasibility & Capability */

  /* GROWTH — The living system */
  --gate-4-forest:     #2D5A27;    /* Architectural Truth */
  --gate-5-seagreen:   #2E8B57;    /* Implementation Safety */

  /* SURFACE — Meeting the world */
  --gate-6-teal:       #1A7A7A;    /* Pre-Release Truth */
  --gate-7-steel:      #2070B4;    /* Launch Authorization */

  /* ATMOSPHERE — The living environment */
  --gate-8-slate:      #5B4FA0;    /* Operational Belief Management */
  --gate-9-amethyst:   #7B52AB;    /* Iteration & Change */

  /* HORIZON — The end state */
  --gate-10-goldenrod: #DAA520;    /* Sunset & Exit */

  /* STATUS MODIFIERS */
  --status-passed:     1.0;        /* Full saturation */
  --status-partial:    0.5;        /* 50% saturation, white blend */
  --status-not-started: 0.15;     /* Near gray */
  --status-failed-border: #DC2626; /* Red border on gate color */
  --status-stale-border: #D97706; /* Amber dashed border */
}
```

---

## Why "Stratigraphy"

In geology, stratigraphy is the study of **layered rock formations**. You read earth's history by examining what's deposited in each layer — what lived, what died, what conditions existed, what forces were at work.

The metaphor is exact:

| Geological Stratigraphy | Agent Stratigraphy |
|---|---|
| Each rock layer records what was true at that time | Each gate records what was known and believed |
| You can't build a layer on nothing below it | You can't pass a gate without the lower gates holding |
| Unconformities (missing layers) reveal erosion or upheaval | Skipped gates reveal epistemic shortcuts |
| Fossils provide evidence of past life | Context DB entries provide evidence of past decisions |
| Core samples reveal the full history | Gate evaluation logs reveal the full epistemic journey |
| The stratigraphic record can't be faked | Confidence scores and DO-NOT-PROCEED conditions can't be faked |

When you core-sample a project built with Agent Stratigraphy, you should be able to read every decision, every assumption, every confidence level, and every acknowledged unknown — just like reading geological strata.

---

## Why This Works

| Property | Mechanism |
|----------|-----------|
| **Forces explicit uncertainty** | Every gate requires confidence scores and named unknowns |
| **Prevents confidence laundering** | "Everyone knows" and "probably fine" are DO-NOT-PROCEED triggers |
| **Treats unknowns as first-class** | Unknowns must be named, bounded, and monitored — not ignored |
| **Aligns with belief-based systems** | Belief ≠ truth is the foundational axiom |
| **Failure-aware by design** | Every gate asks about failure modes, not just success paths |
| **Scales with irreversibility** | Higher stakes → higher evidence bar |
| **Audit trail built in** | Context DB + gate evaluations = full epistemic history |
| **Color communicates meaning** | The palette tells you where you are in the epistemic journey at a glance |

---

## Quick Reference

```
□ GATE 0   Garnet      Does the problem exist?          (evidence, not belief)
□ GATE 1   Sienna      Who has the problem?             (specific, not composite)
□ GATE 2   Sandstone   Are requirements real?            (observed, not desired)
□ GATE 3   Mudstone    Can we build it?                  (proven, not assumed)
□ GATE 4   Forest      Does architecture match reality?  (explicit, not magical)
□ GATE 5   Sea Green   Does code match belief?           (tested meaning, not coverage)
□ GATE 6   Teal        Does reality match belief?        (measured, not assumed)
□ GATE 7   Steel Blue  Can we justify exposure?          (observable, not hopeful)
□ GATE 8   Slate Blue  Are we learning from reality?     (feedback loops, not vanity)
□ GATE 9   Amethyst    Are changes reversible?           (proven, not asserted)
□ GATE 10  Goldenrod   Can we exit cleanly?              (planned, not improvised)
```

---

*Agent Stratigraphy v1.0.0 — Ryan Howells & Claude-Howell — February 2026*  
*"Belief ≠ truth. The strata don't lie."*
