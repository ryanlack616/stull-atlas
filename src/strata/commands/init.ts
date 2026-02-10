/**
 * strata init — Initialize a new espg-gates.json
 * Creates a starter ESPG document with all 11 gates at not-started
 */

import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { ansi } from '../palette.js';
import type { ESPGDocument } from '../types.js';

export interface InitOptions {
  output?: string;
  force?: boolean;
}

function createTemplate(projectName: string): ESPGDocument {
  return {
    "$schema": "https://stullatlas.com/schemas/espg.v1.json",
    meta: {
      framework: "Agent Stratigraphy",
      component: projectName,
      version: "1.0.0",
      updated: new Date().toISOString().split('T')[0],
      creators: [],
      axiom: "Belief ≠ truth; every belief has confidence, decay, and authority",
      tagline: "The strata don't lie.",
    },
    stratigraphic_palette: {
      layers: [
        { name: "Bedrock",    gates: [0, 1],  meaning: "Do we know the ground we stand on?",    colors: { gate_0: { name: "Garnet",     hex: "#7C1D1D" }, gate_1: { name: "Sienna",     hex: "#A0522D" } } },
        { name: "Foundation", gates: [2, 3],  meaning: "Is our building material real?",         colors: { gate_2: { name: "Sandstone",  hex: "#B8860B" }, gate_3: { name: "Mudstone",   hex: "#8B7355" } } },
        { name: "Growth",     gates: [4, 5],  meaning: "Is the system alive and healthy?",       colors: { gate_4: { name: "Forest",     hex: "#2D5A27" }, gate_5: { name: "Sea Green",  hex: "#2E8B57" } } },
        { name: "Surface",    gates: [6, 7],  meaning: "Can we face the world?",                 colors: { gate_6: { name: "Teal",       hex: "#1A7A7A" }, gate_7: { name: "Steel Blue", hex: "#2070B4" } } },
        { name: "Atmosphere", gates: [8, 9],  meaning: "Are we learning from what's above?",     colors: { gate_8: { name: "Slate Blue", hex: "#5B4FA0" }, gate_9: { name: "Amethyst",   hex: "#7B52AB" } } },
        { name: "Horizon",    gates: [10],    meaning: "Can we end well?",                       colors: { gate_10: { name: "Goldenrod", hex: "#DAA520" } } },
      ],
      status_modifiers: {
        passed:      { saturation: 1.0,  description: "Full saturation of gate color" },
        partial:     { saturation: 0.5,  description: "50% saturation, white-blended" },
        "not-started": { saturation: 0.15, description: "Near gray" },
        failed:      { border: "#DC2626", description: "Gate color with red border" },
        stale:       { border: "#D97706", style: "dashed", description: "Amber dashed border" },
      },
    },
    principles: [
      "Belief ≠ truth; every belief has confidence, decay, and authority",
      "No silent assumptions",
      "Irreversible actions require higher epistemic confidence",
      "Unknowns must be named, bounded, and monitored",
    ],
    gates: [
      { id: 0,  name: "Problem Legitimacy",           layer: "Bedrock",    color: { name: "Garnet",     hex: "#7C1D1D" }, question: "Do we know the problem actually exists?",                 required_evidence: ["Written problem statement with falsifiable claims", "At least one external signal", "Counter-hypothesis documented"], epistemic_checks: ["Confidence score assigned", "Known biases listed"], do_not_proceed_if: ["Problem is defined only by internal belief", "No evidence survives a skeptical reading"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 1,  name: "User & Stakeholder Reality",   layer: "Bedrock",    color: { name: "Sienna",     hex: "#A0522D" }, question: "Do we know who experiences the problem and how?",          required_evidence: ["Identified user classes", "Primary vs secondary users separated", "Non-user stakeholders documented"], epistemic_checks: ["Confidence per user class", "Known blind spots logged"], do_not_proceed_if: ["Users are hypothetical", "Authority over decisions is unclear"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 2,  name: "Requirements Truth",            layer: "Foundation", color: { name: "Sandstone",  hex: "#B8860B" }, question: "Are requirements grounded in reality rather than desire?",  required_evidence: ["Functional requirements traceable to user evidence", "Non-functional requirements stated explicitly", "Explicit out-of-scope list"], epistemic_checks: ["Each requirement tagged: observed / inferred / assumed", "Assumptions have expiration dates"], do_not_proceed_if: ["Requirements are aspirational", "Assumptions are untracked"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 3,  name: "Feasibility & Capability",     layer: "Foundation", color: { name: "Mudstone",   hex: "#8B7355" }, question: "Can this be built with known constraints?",               required_evidence: ["Capability map", "Dependency inventory with trust levels", "Known hard limits documented"], epistemic_checks: ["Confidence per dependency", "Degradation paths defined"], do_not_proceed_if: ["Core capability is unproven", "Dependencies are 'probably fine'"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 4,  name: "Architectural Truth",           layer: "Growth",     color: { name: "Forest",     hex: "#2D5A27" }, question: "Does the architecture reflect operational reality?",       required_evidence: ["Explicit authority model", "State ownership defined", "Trust boundaries drawn"], epistemic_checks: ["Belief vs world-truth separation enforced", "One-way bridges marked"], do_not_proceed_if: ["Components assume perfect knowledge", "Rollback is undefined"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 5,  name: "Implementation Safety",         layer: "Growth",     color: { name: "Sea Green",  hex: "#2E8B57" }, question: "Is code doing only what we believe it does?",              required_evidence: ["Tests tied to claims", "Invariants asserted", "Failure injection tests present"], epistemic_checks: ["Untested beliefs listed", "Test gaps acknowledged"], do_not_proceed_if: ["Tests assert behavior not meaning", "Critical paths are unobservable"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 6,  name: "Pre-Release Truth",             layer: "Surface",    color: { name: "Teal",       hex: "#1A7A7A" }, question: "Does reality match our beliefs so far?",                  required_evidence: ["Performance measured vs assumed", "Security threat model exercised", "Accessibility validated"], epistemic_checks: ["Confidence deltas recorded", "Surprises documented"], do_not_proceed_if: ["Metrics contradict assumptions", "No rollback plan exists"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 7,  name: "Launch Authorization",          layer: "Surface",    color: { name: "Steel Blue", hex: "#2070B4" }, question: "Are we justified in exposing others to this system?",      required_evidence: ["Monitoring in place for unknowns", "Support and escalation defined", "Communication plan prepared"], epistemic_checks: ["Residual uncertainty acknowledged", "Incident response confidence rated"], do_not_proceed_if: ["No live observability", "Failures would be silent"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 8,  name: "Operational Belief Management", layer: "Atmosphere", color: { name: "Slate Blue", hex: "#5B4FA0" }, question: "Are we updating beliefs from reality continuously?",       required_evidence: ["Telemetry tied to original assumptions", "Alert thresholds justified", "Drift detection implemented"], epistemic_checks: ["Belief decay modeled", "Stale assumptions flagged"], do_not_proceed_if: ["Metrics are vanity", "No feedback loop exists"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 9,  name: "Iteration & Change",            layer: "Atmosphere", color: { name: "Amethyst",   hex: "#7B52AB" }, question: "Are changes epistemically reversible?",                    required_evidence: ["Change impact analysis", "Backward compatibility strategy", "Experiment isolation"], epistemic_checks: ["Confidence reset on modified paths", "Assumptions re-validated"], do_not_proceed_if: ["Changes are global and irreversible", "No rollback or feature flag exists"], status: "not-started", confidence: 0, evidence_notes: "" },
      { id: 10, name: "Sunset & Exit",                 layer: "Horizon",    color: { name: "Goldenrod",  hex: "#DAA520" }, question: "Can we end this without epistemic harm?",                 required_evidence: ["Data export & deletion verified", "User transition plan", "Knowledge archived"], epistemic_checks: ["Residual obligations listed", "Unknown consequences acknowledged"], do_not_proceed_if: ["Users are trapped", "Data fate is unclear"], status: "not-started", confidence: 0, evidence_notes: "" },
    ],
    evaluation_protocol: {
      steps: [
        "Gather required evidence",
        "Run epistemic checks",
        "Evaluate DO-NOT-PROCEED conditions",
        "If ANY do-not-proceed is TRUE → gate FAILS",
        "Record confidence score, known gaps, and decision",
      ],
      confidence_thresholds: {
        minimum_for_pass: 0.70,
        minimum_for_irreversible: 0.85,
        staleness_window_days: 30,
      },
    },
  };
}

export function init(opts: InitOptions = {}): number {
  const outputPath = opts.output ?? join(process.cwd(), 'docs', 'espg-gates.json');

  if (existsSync(outputPath) && !opts.force) {
    console.log(`\n  ${ansi.yellow('⚠')} ${outputPath} already exists.`);
    console.log(`  Use ${ansi.bold('--force')} to overwrite.\n`);
    return 1;
  }

  // Use directory name as project name
  const projectName = process.cwd().split(/[/\\]/).pop() || 'my-project';
  const template = createTemplate(projectName);

  // Ensure directory exists
  const dir = outputPath.substring(0, outputPath.lastIndexOf('/') === -1 
    ? outputPath.lastIndexOf('\\') 
    : outputPath.lastIndexOf('/'));
  
  const { mkdirSync } = require('fs');
  try { mkdirSync(dir, { recursive: true }); } catch {}

  writeFileSync(outputPath, JSON.stringify(template, null, 2) + '\n', 'utf-8');

  console.log('');
  console.log(`  ${ansi.green('✓')} Created ${ansi.bold(outputPath)}`);
  console.log('');
  console.log(`  ${ansi.dim('Next steps:')}`);
  console.log(`    1. Edit the file to set your project name and creators`);
  console.log(`    2. Evaluate Gate 0 (Problem Legitimacy) — do you know the problem exists?`);
  console.log(`    3. Run ${ansi.bold('strata scan')} to see your stratigraphic column`);
  console.log('');
  console.log(`  ${ansi.dim(ansi.italic('"Belief ≠ truth. The strata don\'t lie."'))}`);
  console.log('');

  return 0;
}
