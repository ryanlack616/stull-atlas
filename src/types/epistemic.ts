/**
 * Epistemic States
 * Every value in the system carries a confidence state
 * Borrowed from Synapt philosophy - tracking what is known vs assumed
 */

export type EpistemicState =
  | 'unknown'   // No data available
  | 'assumed'   // Default/fallback used - treat with caution
  | 'inferred'  // Calculated from other data
  | 'declared'  // User or source provided explicitly
  | 'verified'  // Cross-referenced or lab tested

/**
 * A value with epistemic tracking
 */
export interface TrackedValue<T> {
  value: T
  state: EpistemicState
  source: string
  timestamp?: string
}

/**
 * Numeric value with precision tracking
 */
export interface OxideValue {
  value: number
  precision: number  // decimal places of confidence
  state: EpistemicState
  source: string
}

/**
 * Calculation step for "show your work" transparency
 */
export interface CalculationStep {
  operation: string
  inputs: Record<string, unknown>
  output: number | Record<string, number>
  note?: string
}

/**
 * Result wrapper that includes confidence and trace
 */
export interface CalculationResult<T> {
  value: T | null
  confidence: EpistemicState
  warnings: string[]
  errors: string[]
  trace: CalculationStep[]
}

/**
 * Validation issue from limit checks
 */
export interface ValidationIssue {
  oxide: string
  value: number
  limit: { min: number; max: number }
  severity: 'warning' | 'error'
  message: string
}

/**
 * Full validation result
 */
export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  suggestions: string[]
  issues: ValidationIssue[]
}
