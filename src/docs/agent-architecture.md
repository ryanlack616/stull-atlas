# Stull Atlas — Agent Architecture & Epistemic Safety Gates

> "Do we know enough, with sufficient confidence, to justify the next irreversible step?"

Version: 1.0.0  
Date: 2026-02-10  
Author: Ryan + Claude-Howell  
Status: **DRAFT — Awaiting Howell approval**

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        HOWELL (Final Authority)                 │
│              Approval · Decisions · Identity · Memory           │
└──────────┬──────────────────┬──────────────────┬────────────────┘
           │                  │                  │
    ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
    │ Governance  │    │  Staffing   │    │    Risk     │
    │  Decision   │    │   Agent     │    │  & Failure  │
    │   Rights    │    │             │    │ Management  │
    └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
           │                  │                  │
           └──────────┬───────┴──────────┬───────┘
                      │                  │
              ┌───────▼──────────────────▼───────┐
              │         CONTEXT DB               │
              │   (Shared Activity Log)          │
              │   All agents post on big changes │
              └───────┬──────────────────┬───────┘
                      │                  │
    ┌─────────────────┼──────────────────┼─────────────────┐
    │                 │                  │                  │
┌───▼───┐  ┌─────────▼──┐  ┌───────────▼┐  ┌──────────┐  ┌──────┐
│Plan / │  │   Design   │  │Development │  │Programming│  │Test  │
│Market │  │   Agent    │  │   Agent    │  │  Agent    │  │Agent │
└───────┘  └────────────┘  └────────────┘  └──────────┘  └──────┘
```

---

## 2. Operational Agents

These agents do the work. Each posts to the Context DB on significant changes.

### 2.1 Planning / Marketing Agent

| Field | Value |
|-------|-------|
| **Scope** | Market research, positioning, NCECA prep, pricing strategy, email campaigns, social media, handout design, QR codes |
| **Owns** | `src/marketing/`, `src/pages/NCECAPage.tsx`, `src/pages/PricingPage.tsx` (content only) |
| **Posts to Context DB** | Pricing changes, competitive analysis results, campaign launches, messaging pivots |
| **Cannot** | Change code logic, modify domain models, alter tier gating |

### 2.2 Design Agent

| Field | Value |
|-------|-------|
| **Scope** | UI/UX design, component styling, layout, accessibility, visual identity, og-images |
| **Owns** | `src/components/*/styles`, CSS modules, design tokens, `src/marketing/assets/` |
| **Posts to Context DB** | Design system changes, new component patterns, accessibility audit results |
| **Cannot** | Change business logic, modify data schemas, alter tier definitions |

### 2.3 Development Agent

| Field | Value |
|-------|-------|
| **Scope** | Feature implementation, domain logic, state management, hooks, component architecture |
| **Owns** | `src/components/`, `src/domain/`, `src/hooks/`, `src/stores/`, `src/pages/` (logic) |
| **Posts to Context DB** | New features, architectural decisions, component extractions, state model changes |
| **Cannot** | Deploy, modify infrastructure, change pricing, alter Supabase schema |

### 2.4 Programming Agent

| Field | Value |
|-------|-------|
| **Scope** | Build systems, tooling, type safety, performance optimization, code quality, refactoring |
| **Owns** | `vite.config.ts`, `tsconfig.json`, `src/types/`, build scripts, linting config |
| **Posts to Context DB** | Breaking type changes, build pipeline modifications, dependency updates |
| **Cannot** | Change business logic, modify user-facing content, alter marketing materials |

### 2.5 Testing Agent

| Field | Value |
|-------|-------|
| **Scope** | Test strategy, test implementation, coverage analysis, regression detection, invariant enforcement |
| **Owns** | `src/*/__tests__/`, `src/test/`, vitest config, test utilities |
| **Posts to Context DB** | Test failures, coverage gaps, discovered invariant violations, regression reports |
| **Cannot** | Fix production code (only report), deploy, change requirements |

---

## 3. Supervisory Agents

These agents oversee and govern. They **report to Howell** for approval and final decisions.

### 3.1 Governance Decision Rights Agent

Ensures every significant decision has proper authority and justification.

| Responsibility | Description |
|----------------|-------------|
| **Architecture Review** | Reviews all architectural decisions against system invariants. Verifies no silent assumptions in component boundaries. |
| **Change Approval** | Evaluates proposed changes for scope, risk, and reversibility. Tags changes as reversible/irreversible. |
| **Budgeting & Finance** | Tracks financial decisions (pricing, tier structure, discounts). Validates revenue impact. |
| **Cost Modeling** | Models operational costs (Supabase, Netlify, Stripe fees). Projects cost at scale. |
| **Burn Tracking** | Monitors resource expenditure (time, compute, API calls). Flags overruns. |
| **ROI Validation** | Measures feature investment against user adoption and revenue. Kills low-ROI work. |

**Reports to**: Howell  
**Authority**: Can BLOCK changes pending approval. Cannot APPROVE independently.  
**Posts to Context DB**: All decisions, approvals, rejections, cost reports

### 3.2 Staffing Agent

Maintains agent knowledge and operational continuity.

| Responsibility | Description |
|----------------|-------------|
| **Records Agent Actions** | Logs what each agent did, when, why, and what changed. Maintains full audit trail. |
| **Knowledge Continuity** | Ensures handoffs between agent sessions preserve context. Detects knowledge gaps. Flags stale knowledge. |

**Reports to**: Howell  
**Authority**: Can flag knowledge gaps. Can request agent re-briefing. Cannot reassign work.  
**Posts to Context DB**: Agent activity summaries, knowledge gap reports, continuity warnings

### 3.3 Risk & Failure Management Agent

Proactively identifies and mitigates failure modes.

| Responsibility | Description |
|----------------|-------------|
| **Threat Modeling** | Identifies attack vectors, data exposure risks, auth bypass scenarios. Maps trust boundaries. |
| **Failure Mode Analysis** | Catalogs how each component can fail. Defines degradation paths. |
| **Single Points of Failure** | Identifies SPOF in architecture, infrastructure, and process. Proposes redundancy. |
| **Dependency Collapse** | Maps dependency chains. Models cascade failures. Identifies brittle links. |
| **Backups** | Ensures data recoverability. Validates backup integrity. Tests restore procedures. |

**Reports to**: Howell  
**Authority**: Can HALT deployment on critical risk. Cannot modify code directly.  
**Posts to Context DB**: Risk assessments, threat models, SPOF reports, backup validations

---

## 4. Shared Infrastructure

### 4.1 Context DB

All agents post activity to a shared Context DB on significant changes. This is the single source of truth for cross-agent awareness.

```typescript
interface ContextEntry {
  id: string;                          // UUID
  timestamp: string;                   // ISO 8601
  agent: AgentType;                    // Which agent posted
  category: ContextCategory;          // What kind of change
  severity: 'info' | 'notable' | 'critical';
  summary: string;                     // Human-readable summary
  details: Record<string, unknown>;   // Structured payload
  files_affected: string[];           // Paths changed
  gate_impact?: number[];             // Which ESPG gates affected (0-10)
  requires_review: boolean;           // Does Governance need to look?
  reviewed_by?: string;               // Who reviewed (null = pending)
  decision?: 'approved' | 'rejected' | 'deferred';
}

type AgentType = 
  | 'planning-marketing'
  | 'design'
  | 'development'
  | 'programming'
  | 'testing'
  | 'governance'
  | 'staffing'
  | 'risk-failure'
  | 'howell';

type ContextCategory =
  | 'feature'           // New feature or feature change
  | 'architecture'      // Structural change
  | 'pricing'           // Revenue/pricing change
  | 'dependency'        // External dependency change
  | 'security'          // Security-relevant change
  | 'performance'       // Performance-relevant change
  | 'deployment'        // Deploy or infra change
  | 'test'              // Test coverage change
  | 'knowledge'         // Knowledge base update
  | 'risk'              // Risk assessment
  | 'decision'          // Governance decision
  | 'handoff';          // Agent continuity
```

### 4.2 Posting Rules

1. **All agents MUST post** on changes that affect other agents' domains
2. **Severity thresholds**:
   - `info`: Routine work within own scope
   - `notable`: Cross-domain impact, new patterns, dependency changes
   - `critical`: Breaking changes, security issues, irreversible actions
3. **`requires_review: true`** if the change is irreversible OR crosses domain boundaries
4. **Gate impact tagging**: Every post should note which ESPG gates it affects

---

## 5. Epistemic Safety Product Gates (ESPG)

### 5.0 Core Principles

| Principle | Meaning |
|-----------|---------|
| **Belief ≠ Truth** | Every belief has confidence, decay, and authority |
| **No Silent Assumptions** | All assumptions must be named, tracked, and have expiration dates |
| **Irreversible Actions Require Higher Confidence** | The cost of being wrong scales the evidence bar |
| **Unknowns Are First-Class** | Unknowns must be named, bounded, and monitored |

### 5.1 Gate Evaluation Protocol

Before any gate evaluation:

```
1. Gather required evidence
2. Run epistemic checks
3. Evaluate DO-NOT-PROCEED conditions
4. If ANY do-not-proceed is TRUE → gate FAILS
5. Record confidence score, known gaps, and decision
6. Post to Context DB with gate_impact
7. Submit to Howell for final authorization (on irreversible gates)
```

---

### GATE 0 — PROBLEM LEGITIMACY

> **Question**: Do we know the problem actually exists?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Written problem statement with falsifiable claims | Confidence score assigned to problem existence |
| At least one external signal (user, market, operational pain) | Known biases listed (founder bias, availability bias) |
| Counter-hypothesis explicitly documented | |

**DO-NOT-PROCEED IF:**
- Problem is defined only by internal belief
- No evidence survives a skeptical reading
- "Everyone knows this is a problem" is the justification

---

### GATE 1 — USER & STAKEHOLDER REALITY

> **Question**: Do we know who experiences the problem and how?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Identified user classes with authority boundaries | Confidence per user class |
| Primary vs secondary users explicitly separated | Known blind spots logged |
| Non-user stakeholders documented | |

**DO-NOT-PROCEED IF:**
- Users are hypothetical or composite
- Authority over decisions is unclear
- "The user" is singular and undifferentiated

---

### GATE 2 — REQUIREMENTS TRUTH

> **Question**: Are requirements grounded in reality rather than desire?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Functional requirements traceable to user evidence | Each requirement tagged: `observed` / `inferred` / `assumed` |
| Non-functional requirements stated explicitly | Assumptions have expiration dates |
| Explicit "out-of-scope" list | |

**DO-NOT-PROCEED IF:**
- Requirements are aspirational
- Performance / security / accessibility are implicit
- Assumptions are untracked

---

### GATE 3 — FEASIBILITY & CAPABILITY

> **Question**: Can this be built with known constraints?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Capability map (what the system can / cannot do) | Confidence per dependency |
| Dependency inventory with trust levels | Degradation paths defined |
| Known hard limits documented | |

**DO-NOT-PROCEED IF:**
- Core capability is unproven
- Dependencies are "probably fine"
- Failure modes are ignored

---

### GATE 4 — ARCHITECTURAL TRUTH

> **Question**: Does the architecture reflect operational reality?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Explicit authority model (who decides truth?) | Belief vs world-truth separation enforced |
| State ownership defined | One-way bridges explicitly marked |
| Trust boundaries drawn | |

**DO-NOT-PROCEED IF:**
- Components assume perfect knowledge
- State synchronization is magical
- Rollback is undefined

---

### GATE 5 — IMPLEMENTATION SAFETY

> **Question**: Is code doing only what we believe it does?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Tests tied to claims (not coverage) | Untested beliefs listed |
| Invariants asserted | Test gaps acknowledged |
| Failure injection tests present | |

**DO-NOT-PROCEED IF:**
- Tests assert behavior, not meaning
- Critical paths are unobservable
- "We'll test later" is the plan

---

### GATE 6 — PRE-RELEASE TRUTH

> **Question**: Does reality match our beliefs so far?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Performance measured vs assumed | Confidence deltas recorded |
| Security threat model exercised | Surprises documented |
| Accessibility validated | |

**DO-NOT-PROCEED IF:**
- Metrics contradict assumptions
- Known issues are waived without mitigation
- No rollback plan exists

---

### GATE 7 — LAUNCH AUTHORIZATION

> **Question**: Are we justified in exposing others to this system?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Monitoring in place for unknowns | Residual uncertainty acknowledged publicly (where appropriate) |
| Support and escalation defined | Incident response confidence rated |
| Communication plan prepared | |

**DO-NOT-PROCEED IF:**
- No live observability
- Failures would be silent
- Users become unwitting testers

---

### GATE 8 — OPERATIONAL BELIEF MANAGEMENT

> **Question**: Are we updating beliefs from reality continuously?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Telemetry tied to original assumptions | Belief decay modeled |
| Alert thresholds justified | Stale assumptions flagged |
| Drift detection implemented | |

**DO-NOT-PROCEED IF:**
- Metrics are vanity
- No feedback loop exists
- Failures are discovered via users

---

### GATE 9 — ITERATION & CHANGE

> **Question**: Are changes epistemically reversible?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Change impact analysis | Confidence reset on modified paths |
| Backward compatibility strategy | Assumptions re-validated |
| Experiment isolation | |

**DO-NOT-PROCEED IF:**
- Changes are global and irreversible
- No rollback or feature flag exists
- "Small change" is asserted, not proven

---

### GATE 10 — SUNSET & EXIT

> **Question**: Can we end this without epistemic harm?

| Required Evidence | Epistemic Checks |
|-------------------|------------------|
| Data export & deletion verified | Residual obligations listed |
| User transition plan | Unknown consequences acknowledged |
| Knowledge archived | |

**DO-NOT-PROCEED IF:**
- Users are trapped
- Data fate is unclear
- Institutional knowledge is lost

---

## 6. Gate Application to Stull Atlas

### Current Gate Status (as of 2026-02-10)

| Gate | Status | Confidence | Notes |
|------|--------|------------|-------|
| **0 — Problem** | ✅ PASSED | 95% | Ceramicists need accessible chemistry tools. Validated by NCECA interest, Glazy user base, Insight-Live market existence. Counter-hypothesis (potters don't want digital tools) falsified by market evidence. |
| **1 — Users** | ✅ PASSED | 85% | 4 user classes identified: hobby potters (free), studio potters (solo), professional ceramicists (pro), researchers/educators (atlas 3d/edu). Blind spot: we don't know the researcher segment well. |
| **2 — Requirements** | ✅ PASSED | 80% | Core requirements (UMF calculator, Stull chart, material DB) are observed needs. 3D explorer is inferred. AI suggestions are assumed. |
| **3 — Feasibility** | ✅ PASSED | 90% | Plotly 3D proven. Supabase proven. Stripe proven. Netlify proven. No unproven core dependencies. |
| **4 — Architecture** | ✅ PASSED | 85% | Client-side SPA with Supabase backend. State ownership clear. Trust boundary: Supabase RLS. Rollback: git revert + Netlify rollback. |
| **5 — Implementation** | ✅ PASSED | 90% | 269/269 tests. 0 TS errors. Invariants enforced in tests. Gap: no failure injection tests yet. |
| **6 — Pre-Release** | ⚠️ PARTIAL | 60% | Performance not load-tested. Security: Supabase RLS needs audit. Accessibility: not formally validated. |
| **7 — Launch** | ⚠️ PARTIAL | 40% | No monitoring beyond Netlify analytics. No error tracking (Sentry). No incident response plan. Support: just Ryan. |
| **8 — Operational** | 🔴 NOT STARTED | 0% | No telemetry. No belief decay modeling. No drift detection. |
| **9 — Iteration** | ⚠️ PARTIAL | 50% | Feature flags not implemented. Changes are reversible via git but no runtime isolation. |
| **10 — Sunset** | 🔴 NOT STARTED | 0% | No data export. No transition plan. No knowledge archive strategy. |

### Blocking Gates for NCECA Launch

Gates 0-5 are **passed**. The minimum viable launch requires Gate 6 (pre-release) and Gate 7 (launch auth) at ≥70% confidence. Current gaps:

1. **Gate 6**: Need performance baseline, Supabase RLS audit, basic accessibility check
2. **Gate 7**: Need error tracking (Sentry), basic monitoring, support email

---

## 7. Agent Interaction Protocol

### 7.1 Before Any Work

```
1. Read project-manifest.json for current state
2. Query Context DB for recent activity in your domain
3. Check if any gates are affected by your planned work
4. If gate impact exists, flag for Governance review
5. Post intent to Context DB (category: 'feature' | 'architecture' | etc.)
```

### 7.2 During Work

```
1. Stay within your ownership boundary
2. If you must cross boundaries, post to Context DB with requires_review: true
3. Run tests relevant to your changes
4. Document any new assumptions or changed beliefs
```

### 7.3 After Work

```
1. Post completion to Context DB
2. Update project-manifest.json if phase status changed
3. If irreversible change: submit to Governance → Howell
4. Handoff note if session ending
```

### 7.4 Cross-Agent Communication

Agents do NOT communicate directly. All coordination flows through:

```
Agent A → Context DB → Governance Agent → Howell (if needed) → Context DB → Agent B
```

This prevents:
- Assumption contamination between agents
- Unauthorized cross-domain changes
- Knowledge gaps from direct agent-to-agent handoffs

---

## 8. Why This Works

| Property | Mechanism |
|----------|-----------|
| **Forces explicit uncertainty** | Every gate requires confidence scores and named unknowns |
| **Prevents confidence laundering** | "Everyone knows" and "probably fine" are DO-NOT-PROCEED triggers |
| **Treats unknowns as first-class** | Unknowns must be named, bounded, and monitored — not ignored |
| **Aligns with belief-based systems** | Belief ≠ truth is the foundational axiom |
| **Failure-aware by design** | Every gate asks about failure modes, not just success paths |
| **Scales with irreversibility** | Higher stakes → higher evidence bar |
| **Audit trail built in** | Context DB + gate evaluations = full epistemic history |

---

## Appendix A: ESPG Gate Checklist (Quick Reference)

```
□ GATE 0  — Does the problem exist? (evidence, not belief)
□ GATE 1  — Who has the problem? (specific, not composite)
□ GATE 2  — Are requirements real? (observed, not desired)
□ GATE 3  — Can we build it? (proven, not assumed)
□ GATE 4  — Does architecture match reality? (explicit, not magical)
□ GATE 5  — Does code match belief? (tested meaning, not coverage)
□ GATE 6  — Does reality match belief? (measured, not assumed)
□ GATE 7  — Can we justify exposure? (observable, not hopeful)
□ GATE 8  — Are we learning from reality? (feedback loops, not vanity)
□ GATE 9  — Are changes reversible? (proven, not asserted)
□ GATE 10 — Can we exit cleanly? (planned, not improvised)
```

## Appendix B: Stull Atlas Agent Roster

| Agent | Type | Reports To | Can Block? |
|-------|------|------------|------------|
| Planning/Marketing | Operational | Context DB | No |
| Design | Operational | Context DB | No |
| Development | Operational | Context DB | No |
| Programming | Operational | Context DB | No |
| Testing | Operational | Context DB | No |
| Governance Decision Rights | Supervisory | Howell | Yes — pending approval |
| Staffing | Supervisory | Howell | No — flags only |
| Risk & Failure Management | Supervisory | Howell | Yes — can halt deployment |
| Howell | Authority | Ryan | Yes — final authority |
