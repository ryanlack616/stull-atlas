/**
 * Cone Parsing Utility
 * 
 * Single source of truth for converting cone strings to numbers.
 * Used across glazeStore, validation, and simplex.
 */

/**
 * Parse a cone string or number to a numeric value.
 * Handles negative cones: "06" → -6, "04" → -4
 * Returns null for invalid/empty input.
 */
export function parseCone(cone: string | number): number | null {
  if (typeof cone === 'number') return cone
  if (!cone || cone === '?') return null
  
  const trimmed = String(cone).trim()
  if (!trimmed) return null
  
  // Handle "06", "04", "03", "02", "01" → negative
  if (/^0\d+$/.test(trimmed)) {
    return -parseInt(trimmed, 10)
  }
  
  const parsed = parseInt(trimmed, 10)
  return isNaN(parsed) ? null : parsed
}

/**
 * Non-null version for contexts that need a number (e.g. sorting)
 * Returns 0 for unparseable cones.
 */
export function parseConeOrZero(cone: string | number): number {
  return parseCone(cone) ?? 0
}

/**
 * Full cone range for selectors
 */
export const ALL_CONES = [
  '06', '05', '04', '03', '02', '01', '0',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'
]
