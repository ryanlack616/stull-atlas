/**
 * Agent Stratigraphy — Terminal Renderer
 * Renders stratigraphic columns, gates, and audit results in the terminal
 * Ryan Howells & Claude-Howell, 2026
 */

import type { ESPGDocument, ESPGGate, ScanResult, AuditViolation } from './types.js';
import { PALETTE, LAYERS_DISPLAY_ORDER, LAYER_GATES, ansi, renderBar, gateColor, statusSymbol } from './palette.js';

const SEPARATOR = '─'.repeat(60);
const THIN_SEP  = '╌'.repeat(60);

/**
 * Build a ScanResult from an ESPGDocument
 */
export function buildScanResult(doc: ESPGDocument): ScanResult {
  const gates = doc.gates;
  const passed = gates.filter(g => g.status === 'passed').length;
  const partial = gates.filter(g => g.status === 'partial').length;
  const notStarted = gates.filter(g => g.status === 'not-started').length;
  const failed = gates.filter(g => g.status === 'failed').length;
  const stale = gates.filter(g => g.status === 'stale').length;

  const threshold = doc.evaluation_protocol?.confidence_thresholds?.minimum_for_pass ?? 0.70;
  const belowThreshold = gates.filter(g => g.confidence < threshold && g.status !== 'not-started');
  const lowestGate = gates.reduce((min, g) => g.confidence < min.confidence ? g : min, gates[0]);
  const meanConfidence = gates.reduce((sum, g) => sum + g.confidence, 0) / gates.length;

  return {
    project: doc.meta.component || doc.meta.framework,
    date: new Date().toISOString().split('T')[0],
    gates,
    summary: {
      total: gates.length,
      passed,
      partial,
      not_started: notStarted,
      failed,
      stale,
      lowest_gate: lowestGate,
      below_threshold: belowThreshold,
      mean_confidence: Math.round(meanConfidence * 100) / 100,
    },
  };
}

/**
 * Render the full stratigraphic column (scan command output)
 */
export function renderColumn(doc: ESPGDocument, result: ScanResult): string {
  const lines: string[] = [];

  // Header
  lines.push('');
  lines.push(ansi.bold('  ╔══════════════════════════════════════════════╗'));
  lines.push(ansi.bold('  ║     STRATIGRAPHIC CORE SAMPLE               ║'));
  lines.push(ansi.bold('  ╚══════════════════════════════════════════════╝'));
  lines.push('');
  lines.push(`  ${ansi.dim('Framework:')} ${doc.meta.framework} v${doc.meta.version}`);
  lines.push(`  ${ansi.dim('Project:')}   ${doc.meta.component}`);
  lines.push(`  ${ansi.dim('Updated:')}   ${doc.meta.updated}`);
  lines.push(`  ${ansi.dim('Axiom:')}     ${ansi.italic(doc.meta.axiom)}`);
  lines.push('');
  lines.push(`  ${SEPARATOR}`);
  lines.push('');

  // Render layers from top (Horizon) down to bottom (Bedrock)
  for (const layerName of LAYERS_DISPLAY_ORDER) {
    const gateIds = LAYER_GATES[layerName] ?? [];
    const layerDef = doc.stratigraphic_palette?.layers.find(l => l.name === layerName);
    const meaning = layerDef?.meaning ?? '';

    // Layer header
    lines.push(`  ${ansi.bold(layerName.toUpperCase().padEnd(14))} ${ansi.dim(meaning)}`);
    lines.push(`  ${THIN_SEP}`);

    // Gates within layer (highest gate first)
    for (const gid of gateIds) {
      const gate = doc.gates.find(g => g.id === gid);
      if (!gate) continue;

      const bar = renderBar(gate.confidence, 10, gid);
      const pct = `${Math.round(gate.confidence * 100)}%`.padStart(4);
      const status = statusSymbol(gate.status);
      const name = gateColor(gid, `G${gid}`.padEnd(4)) + ' ' + gate.name;

      lines.push(`  ${name.padEnd(45)} ${bar} ${pct}  ${status}`);

      // Show gaps if any
      if (gate.gaps && gate.gaps.length > 0) {
        for (const gap of gate.gaps) {
          lines.push(`      ${ansi.dim('└─')} ${ansi.yellow(gap)}`);
        }
      }
    }

    lines.push('');
  }

  // Summary
  lines.push(`  ${SEPARATOR}`);
  lines.push(ansi.bold('  SUMMARY'));
  lines.push('');
  lines.push(`  ${ansi.green('✓ Passed:')}      ${result.summary.passed}/${result.summary.total}`);
  lines.push(`  ${ansi.yellow('⚠ Partial:')}     ${result.summary.partial}/${result.summary.total}`);
  lines.push(`  ${ansi.gray('· Not Started:')} ${result.summary.not_started}/${result.summary.total}`);
  if (result.summary.failed > 0) {
    lines.push(`  ${ansi.red('✗ Failed:')}      ${result.summary.failed}/${result.summary.total}`);
  }
  lines.push(`  ${ansi.dim('Mean Confidence:')} ${Math.round(result.summary.mean_confidence * 100)}%`);
  lines.push(`  ${ansi.dim('Lowest Gate:')}     G${result.summary.lowest_gate.id} ${result.summary.lowest_gate.name} (${Math.round(result.summary.lowest_gate.confidence * 100)}%)`);

  if (result.summary.below_threshold.length > 0) {
    lines.push('');
    lines.push(`  ${ansi.red('⚑ Below Threshold:')}`);
    for (const g of result.summary.below_threshold) {
      lines.push(`    G${g.id} ${g.name}: ${Math.round(g.confidence * 100)}%`);
    }
  }

  lines.push('');
  lines.push(`  ${ansi.dim(ansi.italic('"' + doc.meta.tagline + '"'))}`);
  lines.push('');

  return lines.join('\n');
}

/**
 * Render a single gate deep-dive
 */
export function renderGateDetail(gate: ESPGGate, doc: ESPGDocument): string {
  const lines: string[] = [];
  const bar = renderBar(gate.confidence, 20, gate.id);

  lines.push('');
  lines.push(ansi.bold(`  ═══ Gate ${gate.id}: ${gate.name} ═══`));
  lines.push(`  ${ansi.dim('Layer:')}      ${gate.layer}`);
  lines.push(`  ${ansi.dim('Color:')}      ${gateColor(gate.id, gate.color.name)} (${gate.color.hex})`);
  lines.push(`  ${ansi.dim('Status:')}     ${statusSymbol(gate.status)}`);
  lines.push(`  ${ansi.dim('Confidence:')} ${bar} ${Math.round(gate.confidence * 100)}%`);
  lines.push('');

  lines.push(`  ${ansi.bold('Question:')} ${ansi.italic(gate.question)}`);
  lines.push('');

  // Required evidence
  lines.push(`  ${ansi.bold('Required Evidence:')}`);
  for (const ev of gate.required_evidence) {
    lines.push(`    ${ansi.dim('□')} ${ev}`);
  }
  lines.push('');

  // Epistemic checks
  lines.push(`  ${ansi.bold('Epistemic Checks:')}`);
  for (const check of gate.epistemic_checks) {
    lines.push(`    ${ansi.dim('○')} ${check}`);
  }
  lines.push('');

  // DO NOT PROCEED conditions
  lines.push(`  ${ansi.red(ansi.bold('DO NOT PROCEED IF:'))}`);
  for (const cond of gate.do_not_proceed_if) {
    lines.push(`    ${ansi.red('⊘')} ${cond}`);
  }
  lines.push('');

  // Evidence notes
  lines.push(`  ${ansi.bold('Evidence Notes:')}`);
  lines.push(`    ${gate.evidence_notes}`);

  // Gaps
  if (gate.gaps && gate.gaps.length > 0) {
    lines.push('');
    lines.push(`  ${ansi.yellow(ansi.bold('Known Gaps:'))}`);
    for (const gap of gate.gaps) {
      lines.push(`    ${ansi.yellow('△')} ${gap}`);
    }
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Render audit violation report
 */
export function renderAuditReport(violations: AuditViolation[], doc: ESPGDocument): string {
  const lines: string[] = [];

  lines.push('');
  lines.push(ansi.bold('  ╔══════════════════════════════════════════════╗'));
  lines.push(ansi.bold('  ║     EPISTEMIC AUDIT — DO NOT PROCEED CHECK  ║'));
  lines.push(ansi.bold('  ╚══════════════════════════════════════════════╝'));
  lines.push('');

  if (violations.length === 0) {
    lines.push(`  ${ansi.green('✓ No DO-NOT-PROCEED conditions are currently triggered.')}`);
    lines.push(`  ${ansi.dim('All gates clear for progression.')}`);
  } else {
    const blocking = violations.filter(v => v.severity === 'blocking');
    const warnings = violations.filter(v => v.severity === 'warning');

    if (blocking.length > 0) {
      lines.push(`  ${ansi.red(ansi.bold(`⊘ ${blocking.length} BLOCKING condition(s) detected:`))}`);
      lines.push('');
      for (const v of blocking) {
        lines.push(`  ${ansi.red('⊘')} ${gateColor(v.gate_id, `G${v.gate_id}`)} ${ansi.bold(v.gate_name)} [${v.layer}]`);
        lines.push(`    ${v.condition}`);
        lines.push('');
      }
    }

    if (warnings.length > 0) {
      lines.push(`  ${ansi.yellow(ansi.bold(`⚠ ${warnings.length} WARNING(s):`))}`);
      lines.push('');
      for (const v of warnings) {
        lines.push(`  ${ansi.yellow('⚠')} ${gateColor(v.gate_id, `G${v.gate_id}`)} ${v.gate_name} [${v.layer}]`);
        lines.push(`    ${v.condition}`);
        lines.push('');
      }
    }
  }

  lines.push(`  ${ansi.dim(ansi.italic('"' + doc.meta.tagline + '"'))}`);
  lines.push('');

  return lines.join('\n');
}

/**
 * Render decay report (stale gates)
 */
export function renderDecayReport(staleGates: Array<{gate: ESPGGate; daysSince: number}>, doc: ESPGDocument): string {
  const lines: string[] = [];
  const window = doc.evaluation_protocol?.confidence_thresholds?.staleness_window_days ?? 30;

  lines.push('');
  lines.push(ansi.bold('  ╔══════════════════════════════════════════════╗'));
  lines.push(ansi.bold('  ║     EPISTEMIC DECAY REPORT                  ║'));
  lines.push(ansi.bold('  ╚══════════════════════════════════════════════╝'));
  lines.push('');
  lines.push(`  ${ansi.dim('Staleness Window:')} ${window} days`);
  lines.push(`  ${ansi.dim('Last Updated:')} ${doc.meta.updated}`);
  lines.push('');

  if (staleGates.length === 0) {
    lines.push(`  ${ansi.green('✓ All evidence is within the staleness window.')}`);
  } else {
    lines.push(`  ${ansi.yellow(`⏳ ${staleGates.length} gate(s) have stale evidence:`)}`);
    lines.push('');
    for (const { gate, daysSince } of staleGates) {
      const bar = renderBar(gate.confidence, 10, gate.id);
      const overdue = daysSince - window;
      lines.push(`  ${gateColor(gate.id, `G${gate.id}`)} ${gate.name}`);
      lines.push(`    ${bar} ${Math.round(gate.confidence * 100)}%  ${ansi.yellow(`${daysSince}d old (+${overdue}d overdue)`)}`);
      lines.push('');
    }
    lines.push(`  ${ansi.dim('Stale beliefs erode confidence. Re-evaluate to refresh.')}`);
  }

  lines.push('');
  lines.push(`  ${ansi.dim(ansi.italic('"Belief ≠ truth. The strata don\'t lie."'))}`);
  lines.push('');

  return lines.join('\n');
}
