import { describe, expect, it } from 'vitest'
import { spaceFillingSample, STULL_BOUNDS } from '@/calculator/blends/spacefilling'

describe('spaceFillingSample', () => {
  it('returns requested number of samples', () => {
    const result = spaceFillingSample({
      type: 'lhs',
      bounds: STULL_BOUNDS,
      count: 12,
      seed: 123
    })

    expect(result.errors.length).toBe(0)
    expect(result.value).not.toBeNull()
    expect(result.value?.length).toBe(12)
  })

  it('rejects empty bounds', () => {
    const result = spaceFillingSample({ type: 'sobol', bounds: {}, count: 5 })
    expect(result.value).toBeNull()
    expect(result.errors.length).toBeGreaterThan(0)
  })
})
