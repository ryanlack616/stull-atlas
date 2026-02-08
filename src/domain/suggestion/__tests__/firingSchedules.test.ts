/**
 * Tests for Firing Schedules
 */

import { describe, it, expect } from 'vitest'
import { suggestFiringSchedule } from '../firingSchedules'

describe('suggestFiringSchedule', () => {
  it('returns a glaze fire and bisque fire', () => {
    const rec = suggestFiringSchedule(6, 'oxidation')
    expect(rec.glazeFire).toBeDefined()
    expect(rec.bisqueFire).toBeDefined()
    expect(rec.glazeFire.segments.length).toBeGreaterThanOrEqual(3)
    expect(rec.bisqueFire!.segments.length).toBeGreaterThanOrEqual(3)
  })

  it('oxidation schedule has correct cone', () => {
    const rec = suggestFiringSchedule(6, 'oxidation')
    expect(rec.glazeFire.cone).toBe(6)
    expect(rec.glazeFire.atmosphere).toBe('oxidation')
    expect(rec.glazeFire.name).toContain('Oxidation')
  })

  it('reduction schedule mentions reduction in segments', () => {
    const rec = suggestFiringSchedule(10, 'reduction')
    expect(rec.glazeFire.atmosphere).toBe('reduction')
    const hasReductionNote = rec.glazeFire.segments.some(s => s.note.toLowerCase().includes('reduction'))
    expect(hasReductionNote).toBe(true)
  })

  it('crystalline schedule has crash cool and growth holds', () => {
    const rec = suggestFiringSchedule(10, 'oxidation', 'crystalline')
    expect(rec.glazeFire.id).toContain('crystalline')
    const hasCrashCool = rec.glazeFire.segments.some(s => s.rateF === -999)
    expect(hasCrashCool).toBe(true)
    const hasGrowthHold = rec.glazeFire.segments.some(s => s.holdMinutes >= 60)
    expect(hasGrowthHold).toBe(true)
  })

  it('high fire (cone 10) has higher final temp than mid fire (cone 6)', () => {
    const highFire = suggestFiringSchedule(10, 'oxidation')
    const midFire = suggestFiringSchedule(6, 'oxidation')
    const highMax = Math.max(...highFire.glazeFire.segments.map(s => s.tempF))
    const midMax = Math.max(...midFire.glazeFire.segments.map(s => s.tempF))
    expect(highMax).toBeGreaterThan(midMax)
  })

  it('bisque fire targets cone 06', () => {
    const rec = suggestFiringSchedule(10, 'oxidation')
    expect(rec.bisqueFire!.cone).toBe(-6)
  })

  it('returns tips', () => {
    const rec = suggestFiringSchedule(6, 'oxidation')
    expect(rec.glazeFire.tips.length).toBeGreaterThan(0)
  })

  it('shino adds carbon trap note', () => {
    const rec = suggestFiringSchedule(10, 'reduction', 'shino')
    const hasShiNote = rec.notes.some(n => n.toLowerCase().includes('shino'))
    expect(hasShiNote).toBe(true)
  })

  it('ash adds unpredictable note', () => {
    const rec = suggestFiringSchedule(10, 'oxidation', 'ash')
    const hasAshNote = rec.notes.some(n => n.toLowerCase().includes('ash'))
    expect(hasAshNote).toBe(true)
  })

  it('all temps have both F and C', () => {
    const rec = suggestFiringSchedule(6, 'oxidation')
    for (const seg of rec.glazeFire.segments) {
      expect(seg.tempF).toBeGreaterThan(0)
      expect(seg.tempC).toBeGreaterThan(0)
      // C should be less than F
      expect(seg.tempC).toBeLessThan(seg.tempF)
    }
  })

  it('cone 6 oxidation adds slow cool segment', () => {
    const rec = suggestFiringSchedule(6, 'oxidation')
    const hasCoolDown = rec.glazeFire.segments.some(s => s.rateF < 0)
    expect(hasCoolDown).toBe(true)
  })
})
