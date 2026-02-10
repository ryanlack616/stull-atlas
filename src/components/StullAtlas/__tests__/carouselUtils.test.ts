/**
 * Carousel boundary tests
 *
 * Validates the pure logic extracted from ImageCarousel:
 * - wrapIndex: forward/backward wrapping at array boundaries
 * - safeIndex: clamping when images array shrinks
 * - stepZoom: zoom increment/decrement with min/max clamping
 * - isFormElement: keyboard suppression for form inputs
 */

import { describe, it, expect } from 'vitest'
import { wrapIndex, safeIndex, stepZoom, isFormElement } from '../carouselUtils'

// ── wrapIndex ──────────────────────────────────────────────

describe('wrapIndex', () => {
  it('steps forward normally', () => {
    expect(wrapIndex(0, 1, 5)).toBe(1)
    expect(wrapIndex(2, 1, 5)).toBe(3)
  })

  it('wraps forward from last to first', () => {
    expect(wrapIndex(4, 1, 5)).toBe(0)
    expect(wrapIndex(2, 1, 3)).toBe(0)
    expect(wrapIndex(0, 1, 1)).toBe(0) // single image
  })

  it('steps backward normally', () => {
    expect(wrapIndex(3, -1, 5)).toBe(2)
    expect(wrapIndex(1, -1, 5)).toBe(0)
  })

  it('wraps backward from first to last', () => {
    expect(wrapIndex(0, -1, 5)).toBe(4)
    expect(wrapIndex(0, -1, 3)).toBe(2)
    expect(wrapIndex(0, -1, 1)).toBe(0) // single image
  })

  it('handles multi-step deltas', () => {
    expect(wrapIndex(0, 3, 5)).toBe(3)
    expect(wrapIndex(0, 5, 5)).toBe(0) // full cycle
    expect(wrapIndex(0, 7, 5)).toBe(2) // wraps past end
    expect(wrapIndex(4, -3, 5)).toBe(1)
    expect(wrapIndex(1, -5, 5)).toBe(1) // full cycle backward
  })

  it('returns 0 for empty or zero-length arrays', () => {
    expect(wrapIndex(0, 1, 0)).toBe(0)
    expect(wrapIndex(5, -1, 0)).toBe(0)
    expect(wrapIndex(0, 0, 0)).toBe(0)
  })

  it('handles delta of 0', () => {
    expect(wrapIndex(2, 0, 5)).toBe(2)
    expect(wrapIndex(0, 0, 1)).toBe(0)
  })
})

// ── safeIndex ──────────────────────────────────────────────

describe('safeIndex', () => {
  it('returns index unchanged when within bounds', () => {
    expect(safeIndex(0, 5)).toBe(0)
    expect(safeIndex(2, 5)).toBe(2)
    expect(safeIndex(4, 5)).toBe(4)
  })

  it('clamps to last valid index when index exceeds length', () => {
    expect(safeIndex(5, 5)).toBe(4)
    expect(safeIndex(10, 3)).toBe(2)
    expect(safeIndex(100, 1)).toBe(0)
  })

  it('handles images array shrinking (reselection scenario)', () => {
    // User was on image 4 (of 5), new glaze only has 2 images
    expect(safeIndex(4, 2)).toBe(1)
    // User was on image 2 (of 3), new glaze has 1 image
    expect(safeIndex(2, 1)).toBe(0)
  })

  it('returns 0 for empty array', () => {
    expect(safeIndex(0, 0)).toBe(0)
    expect(safeIndex(5, 0)).toBe(0)
  })
})

// ── stepZoom ───────────────────────────────────────────────

describe('stepZoom', () => {
  it('increments zoom by step', () => {
    expect(stepZoom(1, 0.5)).toBe(1.5)
    expect(stepZoom(2, 0.5)).toBe(2.5)
  })

  it('decrements zoom by step', () => {
    expect(stepZoom(1.5, -0.5)).toBe(1)
    expect(stepZoom(2, -0.5)).toBe(1.5)
  })

  it('clamps at maximum (4x)', () => {
    expect(stepZoom(4, 0.5)).toBe(4)
    expect(stepZoom(3.5, 0.5)).toBe(4) // exactly reaches max
    expect(stepZoom(3.8, 0.5)).toBe(4) // would exceed, clamped
  })

  it('clamps at minimum (0.5x)', () => {
    expect(stepZoom(0.5, -0.5)).toBe(0.5)
    expect(stepZoom(1, -0.5)).toBe(0.5) // exactly reaches min
    expect(stepZoom(0.7, -0.5)).toBe(0.5) // would go below, clamped
  })

  it('respects custom min/max', () => {
    expect(stepZoom(1, 0.5, 0.25, 8)).toBe(1.5)
    expect(stepZoom(8, 0.5, 0.25, 8)).toBe(8) // at custom max
    expect(stepZoom(0.25, -0.5, 0.25, 8)).toBe(0.25) // at custom min
  })

  it('handles zero step', () => {
    expect(stepZoom(2, 0)).toBe(2)
    expect(stepZoom(0.5, 0)).toBe(0.5)
  })

  it('multiple increments from 1x reach 4x and stop', () => {
    let z = 1
    const steps: number[] = []
    for (let i = 0; i < 10; i++) {
      z = stepZoom(z, 0.5)
      steps.push(z)
    }
    // 1 -> 1.5 -> 2 -> 2.5 -> 3 -> 3.5 -> 4 -> 4 -> 4 -> 4
    expect(steps).toEqual([1.5, 2, 2.5, 3, 3.5, 4, 4, 4, 4, 4])
  })

  it('multiple decrements from 4x reach 0.5x and stop', () => {
    let z = 4
    const steps: number[] = []
    for (let i = 0; i < 10; i++) {
      z = stepZoom(z, -0.5)
      steps.push(z)
    }
    // 4 -> 3.5 -> 3 -> 2.5 -> 2 -> 1.5 -> 1 -> 0.5 -> 0.5 -> 0.5
    expect(steps).toEqual([3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0.5, 0.5, 0.5])
  })
})

// ── isFormElement ──────────────────────────────────────────

describe('isFormElement', () => {
  it('returns true for INPUT', () => {
    expect(isFormElement({ tagName: 'INPUT', isContentEditable: false } as any)).toBe(true)
  })

  it('returns true for TEXTAREA', () => {
    expect(isFormElement({ tagName: 'TEXTAREA', isContentEditable: false } as any)).toBe(true)
  })

  it('returns true for SELECT', () => {
    expect(isFormElement({ tagName: 'SELECT', isContentEditable: false } as any)).toBe(true)
  })

  it('returns true for contentEditable elements', () => {
    expect(isFormElement({ tagName: 'DIV', isContentEditable: true } as any)).toBe(true)
    expect(isFormElement({ tagName: 'SPAN', isContentEditable: true } as any)).toBe(true)
  })

  it('returns false for non-form elements', () => {
    expect(isFormElement({ tagName: 'DIV', isContentEditable: false } as any)).toBe(false)
    expect(isFormElement({ tagName: 'BUTTON', isContentEditable: false } as any)).toBe(false)
    expect(isFormElement({ tagName: 'IMG', isContentEditable: false } as any)).toBe(false)
  })

  it('returns false for null/undefined', () => {
    expect(isFormElement(null)).toBe(false)
    expect(isFormElement(undefined as any)).toBe(false)
  })
})
