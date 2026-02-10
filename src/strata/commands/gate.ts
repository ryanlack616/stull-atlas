/**
 * strata gate <n> — Deep-dive into a specific gate
 * Shows full evidence checklist, epistemic checks, and DO-NOT-PROCEED conditions
 */

import { loadESPG } from '../loader.js';
import { renderGateDetail } from '../render.js';

export interface GateOptions {
  config?: string;
  json?: boolean;
}

export function gate(gateId: number, opts: GateOptions = {}): number {
  const doc = loadESPG(opts.config);
  const target = doc.gates.find(g => g.id === gateId);

  if (!target) {
    console.error(`Gate ${gateId} not found. Valid gates: ${doc.gates.map(g => g.id).join(', ')}`);
    return 1;
  }

  if (opts.json) {
    console.log(JSON.stringify(target, null, 2));
  } else {
    console.log(renderGateDetail(target, doc));
  }

  return 0;
}
