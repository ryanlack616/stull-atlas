/**
 * Firing Schedule Suggestions
 *
 * Provides recommended firing schedules based on glaze type, cone, and atmosphere.
 * Data drawn from common studio practices in ceramic literature.
 */

export interface FiringSegment {
  /** Target temperature in °F */
  tempF: number
  /** Target temperature in °C */
  tempC: number
  /** Rate in °F/hour (0 = soak/hold) */
  rateF: number
  /** Hold time in minutes at target temp */
  holdMinutes: number
  /** Description of what happens during this segment */
  note: string
}

export interface FiringSchedule {
  id: string
  name: string
  /** What this schedule is good for */
  description: string
  atmosphere: 'oxidation' | 'reduction' | 'either'
  cone: number
  segments: FiringSegment[]
  /** Important tips */
  tips: string[]
}

// ── Temperature conversions ────────────────────────────────────

function coneToTempF(cone: number): number {
  // Approximate Orton cone temperatures (°F) for fast fire
  const coneTemps: Record<string, number> = {
    '-6': 1566, '-5': 1607, '-4': 1650, '-3': 1683,
    '-2': 1706, '-1': 1728, '0': 1750, '1': 1787,
    '2': 1814, '3': 1841, '4': 1868, '5': 1888,
    '6': 2232, '7': 2264, '8': 2300, '9': 2336,
    '10': 2381, '11': 2399, '12': 2419, '13': 2455,
  }
  return coneTemps[String(cone)] ?? (cone <= 1 ? 1800 : cone <= 7 ? 2250 : 2350)
}

function fToC(f: number): number {
  return Math.round((f - 32) * 5 / 9)
}

// ── Schedule generators ────────────────────────────────────────

function bisqueSchedule(cone: number): FiringSchedule {
  return {
    id: 'bisque',
    name: `Bisque Fire (Cone 06)`,
    description: 'Standard bisque firing to prepare ware for glazing.',
    atmosphere: 'oxidation',
    cone: -6,
    segments: [
      { tempF: 200, tempC: 93, rateF: 100, holdMinutes: 0, note: 'Slow start — drive off remaining moisture' },
      { tempF: 400, tempC: 204, rateF: 150, holdMinutes: 0, note: 'Quartz inversion zone — go slowly' },
      { tempF: 1000, tempC: 538, rateF: 200, holdMinutes: 0, note: 'Burnout phase — organics and carbon leave the clay' },
      { tempF: 1100, tempC: 593, rateF: 100, holdMinutes: 15, note: 'Quartz inversion (1063°F) — hold to equalize' },
      { tempF: 1828, tempC: 998, rateF: 250, holdMinutes: 10, note: 'Final temperature — cone 06' },
    ],
    tips: [
      'Ensure all ware is completely dry before firing.',
      'Candle (hold at 200°F) overnight if pieces are thick or recently made.',
      'Leave the kiln lid cracked until 1000°F to let moisture escape.',
    ],
  }
}

function oxidationGlazeSchedule(cone: number): FiringSchedule {
  const topTemp = coneToTempF(cone)
  const segments: FiringSegment[] = [
    { tempF: 250, tempC: fToC(250), rateF: 150, holdMinutes: 0, note: 'Warm up — drive off glaze moisture' },
    { tempF: 1000, tempC: fToC(1000), rateF: 300, holdMinutes: 0, note: 'Medium ramp through early sintering' },
    { tempF: topTemp - 200, tempC: fToC(topTemp - 200), rateF: 250, holdMinutes: 0, note: 'Approach to maturity' },
    { tempF: topTemp, tempC: fToC(topTemp), rateF: 150, holdMinutes: 10, note: `Final temperature — cone ${cone}. Soak for even heat.` },
  ]

  // Add slow cool for satin/matte glazes at cone 6+
  if (cone >= 5) {
    segments.push({
      tempF: topTemp - 200,
      tempC: fToC(topTemp - 200),
      rateF: -150,
      holdMinutes: 0,
      note: 'Controlled cool through crystal formation range',
    })
  }

  return {
    id: `oxidation-c${cone}`,
    name: `Oxidation Glaze Fire (Cone ${cone})`,
    description: `Standard oxidation glaze fire to cone ${cone}.`,
    atmosphere: 'oxidation',
    cone,
    segments,
    tips: [
      'Use witness cones to verify temperature.',
      'Soak time at top temperature helps even out hot/cold spots.',
      cone >= 5 ? 'For more matte/satin surfaces, slow-cool through 2000-1800°F.' : '',
      'Do not open the kiln until below 200°F to avoid thermal shock.',
    ].filter(Boolean),
  }
}

function reductionGlazeSchedule(cone: number): FiringSchedule {
  const topTemp = coneToTempF(cone)
  const bodyReductionTemp = cone >= 8 ? 1650 : 1550

  return {
    id: `reduction-c${cone}`,
    name: `Reduction Glaze Fire (Cone ${cone})`,
    description: `Gas reduction fire to cone ${cone}. Body reduction begins around cone 010 (${bodyReductionTemp}°F).`,
    atmosphere: 'reduction',
    cone,
    segments: [
      { tempF: 250, tempC: fToC(250), rateF: 150, holdMinutes: 0, note: 'Warm up — oxidation atmosphere' },
      { tempF: 1000, tempC: fToC(1000), rateF: 300, holdMinutes: 0, note: 'Medium ramp — still in oxidation' },
      { tempF: bodyReductionTemp, tempC: fToC(bodyReductionTemp), rateF: 200, holdMinutes: 15, note: 'Begin body reduction — close damper, increase gas' },
      { tempF: topTemp - 200, tempC: fToC(topTemp - 200), rateF: 200, holdMinutes: 0, note: 'Continue medium reduction' },
      { tempF: topTemp, tempC: fToC(topTemp), rateF: 120, holdMinutes: 15, note: `Final temperature — cone ${cone}. Heavy reduction for last 15 min.` },
    ],
    tips: [
      'Body reduction (around cone 010) converts iron in the clay body.',
      'Adjust damper to see light flame at the peep holes for reduction.',
      'Heavy reduction at the end locks in color development.',
      'For copper reds, maintain strong reduction from cone 010 to finish.',
      'Too early or too heavy reduction can cause bloating.',
    ],
  }
}

function crystallineSchedule(cone: number): FiringSchedule {
  const topTemp = coneToTempF(cone)

  return {
    id: `crystalline-c${cone}`,
    name: `Crystalline Glaze Fire (Cone ${cone})`,
    description: `Specialized firing for zinc-silicate crystal growth. Requires precise temperature control.`,
    atmosphere: 'oxidation',
    cone,
    segments: [
      { tempF: 250, tempC: fToC(250), rateF: 200, holdMinutes: 0, note: 'Warm up' },
      { tempF: 1000, tempC: fToC(1000), rateF: 400, holdMinutes: 0, note: 'Fast ramp through early phases' },
      { tempF: topTemp, tempC: fToC(topTemp), rateF: 300, holdMinutes: 5, note: `Peak temperature — cone ${cone}. Brief soak to mature glaze.` },
      { tempF: 2050, tempC: fToC(2050), rateF: -999, holdMinutes: 0, note: 'Crash cool to crystal seeding range (fast as possible)' },
      { tempF: 2050, tempC: fToC(2050), rateF: 0, holdMinutes: 120, note: 'Crystal growth hold #1 — 2 hours at 2050°F' },
      { tempF: 1950, tempC: fToC(1950), rateF: -25, holdMinutes: 60, note: 'Crystal growth hold #2 — slow descent, 1 hour' },
      { tempF: 1100, tempC: fToC(1100), rateF: -100, holdMinutes: 15, note: 'Anneal — hold to relieve glass stress' },
    ],
    tips: [
      'Use a drip catch (pedestal + catch plate) — crystalline glazes run heavily.',
      'Crystal growth happens during the controlled cool between 2050-1950°F.',
      'Longer holds produce larger crystals.',
      'Precise temperature control is critical — use a programmable controller.',
      'Zinc carbonate or zinc oxide at 25-35% is typical.',
    ],
  }
}

// ── Public API ─────────────────────────────────────────────────

export interface FiringRecommendation {
  /** Recommended glaze firing */
  glazeFire: FiringSchedule
  /** Optional bisque recommendation */
  bisqueFire?: FiringSchedule
  /** Overall firing notes */
  notes: string[]
}

/**
 * Get firing schedule recommendations based on glaze archetype and cone.
 */
export function suggestFiringSchedule(
  cone: number,
  atmosphere: 'oxidation' | 'reduction' | 'either',
  glazeFamily?: string,
): FiringRecommendation {
  const notes: string[] = []

  // Determine the right schedule
  let glazeFire: FiringSchedule

  if (glazeFamily === 'crystalline') {
    glazeFire = crystallineSchedule(cone)
    notes.push('Crystalline glazes require a programmable kiln controller for the controlled cooling phases.')
  } else if (atmosphere === 'reduction') {
    glazeFire = reductionGlazeSchedule(cone)
    notes.push('Reduction firing requires a fuel-burning kiln (gas, wood, etc.).')
  } else {
    glazeFire = oxidationGlazeSchedule(cone)
    if (cone >= 5) {
      notes.push('For satin/matte surfaces, extend the cooling phase between 2000-1800°F.')
    }
  }

  // Always recommend a bisque
  const bisqueFire = bisqueSchedule(cone)

  if (glazeFamily === 'shino') {
    notes.push('Some shino glazes benefit from a carbon trap — early reduction around cone 012.')
  }
  if (glazeFamily === 'ash') {
    notes.push('Ash glazes can be unpredictable. Test tiles with varying thicknesses.')
  }
  if (glazeFamily === 'copper') {
    notes.push('Copper red development requires consistent reduction from body reduction through top temperature.')
  }

  return { glazeFire, bisqueFire, notes }
}
