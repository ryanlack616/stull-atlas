/**
 * strata audit — DO-NOT-PROCEED condition checker
 * Evaluates all gates for triggered blocking conditions
 */

import { loadESPG } from '../loader.js';
import { renderAuditReport } from '../render.js';
import type { AuditViolation } from '../types.js';

export interface AuditOptions {
  config?: string;
  json?: boolean;
  ci?: boolean;
}

/**
 * Evaluate DO-NOT-PROCEED conditions based on gate status and gaps
 */
function evaluateViolations(doc: ReturnType<typeof loadESPG>): AuditViolation[] {
  const violations: AuditViolation[] = [];
  const threshold = doc.evaluation_protocol?.confidence_thresholds?.minimum_for_pass ?? 0.70;

  for (const gate of doc.gates) {
    // Failed gates: all DO-NOT-PROCEED conditions are blocking
    if (gate.status === 'failed') {
      for (const cond of gate.do_not_proceed_if) {
        violations.push({
          gate_id: gate.id,
          gate_name: gate.name,
          layer: gate.layer,
          condition: cond,
          severity: 'blocking',
        });
      }
      continue;
    }

    // Partial gates below threshold: warning-level
    if (gate.status === 'partial' && gate.confidence < threshold) {
      for (const cond of gate.do_not_proceed_if) {
        violations.push({
          gate_id: gate.id,
          gate_name: gate.name,
          layer: gate.layer,
          condition: `[BELOW THRESHOLD @ ${Math.round(gate.confidence * 100)}%] ${cond}`,
          severity: 'warning',
        });
      }
    }

    // Gates with gaps: each gap is a warning
    if (gate.gaps && gate.gaps.length > 0) {
      for (const gap of gate.gaps) {
        violations.push({
          gate_id: gate.id,
          gate_name: gate.name,
          layer: gate.layer,
          condition: `[GAP] ${gap}`,
          severity: 'warning',
        });
      }
    }
  }

  return violations;
}

export function audit(opts: AuditOptions = {}): number {
  const doc = loadESPG(opts.config);
  const violations = evaluateViolations(doc);

  if (opts.json) {
    console.log(JSON.stringify({ violations, total: violations.length }, null, 2));
  } else {
    console.log(renderAuditReport(violations, doc));
  }

  // CI mode: exit 1 if any blocking violations
  if (opts.ci) {
    const blocking = violations.filter(v => v.severity === 'blocking');
    if (blocking.length > 0) return 1;
  }

  return violations.filter(v => v.severity === 'blocking').length > 0 ? 1 : 0;
}
