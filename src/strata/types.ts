/**
 * Agent Stratigraphy — ESPG Type Definitions
 * Ryan Howells & Claude-Howell, 2026
 */

export type GateStatus = 'passed' | 'partial' | 'not-started' | 'failed' | 'stale';

export interface GateColor {
  name: string;
  hex: string;
}

export interface ESPGGate {
  id: number;
  name: string;
  layer: string;
  color: GateColor;
  question: string;
  required_evidence: string[];
  epistemic_checks: string[];
  do_not_proceed_if: string[];
  status: GateStatus;
  confidence: number;
  evidence_notes: string;
  gaps?: string[];
}

export interface StratigraphicLayer {
  name: string;
  gates: number[];
  meaning: string;
  colors: Record<string, GateColor>;
}

export interface StatusModifier {
  saturation?: number;
  border?: string;
  style?: string;
  description: string;
}

export interface EvaluationProtocol {
  steps: string[];
  confidence_thresholds: {
    minimum_for_pass: number;
    minimum_for_irreversible: number;
    staleness_window_days: number;
  };
}

export interface ESPGDocument {
  $schema?: string;
  meta: {
    framework: string;
    component: string;
    version: string;
    updated: string;
    creators: string[];
    axiom: string;
    tagline: string;
  };
  stratigraphic_palette: {
    layers: StratigraphicLayer[];
    status_modifiers: Record<string, StatusModifier>;
  };
  principles: string[];
  gates: ESPGGate[];
  evaluation_protocol: EvaluationProtocol;
}

export interface ScanResult {
  project: string;
  date: string;
  gates: ESPGGate[];
  summary: {
    total: number;
    passed: number;
    partial: number;
    not_started: number;
    failed: number;
    stale: number;
    lowest_gate: ESPGGate;
    below_threshold: ESPGGate[];
    mean_confidence: number;
  };
}

export interface AuditViolation {
  gate_id: number;
  gate_name: string;
  layer: string;
  condition: string;
  severity: 'blocking' | 'warning';
}
