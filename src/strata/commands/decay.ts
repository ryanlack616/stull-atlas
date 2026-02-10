/**
 * strata decay — Staleness detector
 * Flags gates whose evidence is older than the staleness window
 */

import { loadESPG } from '../loader.js';
import { renderDecayReport } from '../render.js';
import type { ESPGGate } from '../types.js';

export interface DecayOptions {
  config?: string;
  json?: boolean;
  ci?: boolean;
}

function calculateStaleness(doc: ReturnType<typeof loadESPG>): Array<{gate: ESPGGate; daysSince: number}> {
  const window = doc.evaluation_protocol?.confidence_thresholds?.staleness_window_days ?? 30;
  const lastUpdated = new Date(doc.meta.updated);
  const now = new Date();
  const daysSince = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));

  // If the whole document is stale, all non-not-started gates are stale
  if (daysSince > window) {
    return doc.gates
      .filter(g => g.status !== 'not-started')
      .map(g => ({ gate: g, daysSince }));
  }

  return [];
}

export function decay(opts: DecayOptions = {}): number {
  const doc = loadESPG(opts.config);
  const staleGates = calculateStaleness(doc);

  if (opts.json) {
    console.log(JSON.stringify({
      staleness_window_days: doc.evaluation_protocol?.confidence_thresholds?.staleness_window_days ?? 30,
      last_updated: doc.meta.updated,
      stale_count: staleGates.length,
      stale_gates: staleGates.map(s => ({
        gate_id: s.gate.id,
        gate_name: s.gate.name,
        days_since: s.daysSince,
      })),
    }, null, 2));
  } else {
    console.log(renderDecayReport(staleGates, doc));
  }

  // CI mode: exit 1 if any stale gates
  if (opts.ci && staleGates.length > 0) {
    return 1;
  }

  return staleGates.length > 0 ? 1 : 0;
}
