import { describe, expect, it } from 'vitest'
import { parseCone, parseConeOrZero } from '@/calculator/parseCone'

describe('parseCone', () => {
  it('parses standard cones', () => {
    expect(parseCone('6')).toBe(6)
    expect(parseCone(10)).toBe(10)
    expect(parseCone('10')).toBe(10)
  })

  it('parses leading zero cones as negative', () => {
    expect(parseCone('06')).toBe(-6)
    expect(parseCone('04')).toBe(-4)
  })

  it('returns null for invalid cones', () => {
    expect(parseCone('')).toBeNull()
    expect(parseCone('?')).toBeNull()
    expect(parseCone('abc')).toBeNull()
  })

  it('parseConeOrZero returns 0 for invalid', () => {
    expect(parseConeOrZero('abc')).toBe(0)
  })
})
