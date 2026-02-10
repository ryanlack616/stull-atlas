/**
 * strata scan — Core-sample the project
 * Reads espg-gates.json, renders the full stratigraphic column
 */

import { loadESPG } from '../loader.js';
import { buildScanResult, renderColumn } from '../render.js';

export interface ScanOptions {
  config?: string;
  json?: boolean;
  ci?: boolean;
}

export function scan(opts: ScanOptions = {}): number {
  const doc = loadESPG(opts.config);
  const result = buildScanResult(doc);

  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(renderColumn(doc, result));
  }

  // CI mode: exit 1 if any gate below threshold
  if (opts.ci) {
    const threshold = doc.evaluation_protocol?.confidence_thresholds?.minimum_for_pass ?? 0.70;
    const failing = doc.gates.filter(
      g => g.confidence < threshold && g.status !== 'not-started'
    );
    if (failing.length > 0) {
      return 1;
    }
  }

  return 0;
}
