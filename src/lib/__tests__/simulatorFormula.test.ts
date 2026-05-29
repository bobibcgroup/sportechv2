import { describe, it, expect } from 'vitest'
import { computeRevenue, STREAM_RATES, FAN_TIERS } from '../simulatorFormula'

describe('computeRevenue', () => {
  it('returns $18,075,000 for 100K fans (spec golden value)', () => {
    const result = computeRevenue(100_000)
    expect(result.total).toBe(18_075_000)
  })

  it('active fans = 25% of total', () => {
    const result = computeRevenue(100_000)
    expect(result.activeFans).toBe(25_000)
  })

  it('scales linearly — 200K fans = 2× revenue of 100K', () => {
    const r100 = computeRevenue(100_000)
    const r200 = computeRevenue(200_000)
    expect(r200.total).toBe(r100.total * 2)
  })

  it('subscriptions stream is correct for 100K fans', () => {
    const result = computeRevenue(100_000)
    expect(result.streams.subscriptions).toBe(50_000)
  })

  it('merchandise stream is correct for 100K fans', () => {
    const result = computeRevenue(100_000)
    expect(result.streams.merchandise).toBe(4_987_500)
  })

  it('FAN_TIERS contains 100_000', () => {
    expect(FAN_TIERS).toContain(100_000)
  })

  it('perUserRate is approximately 723 for any fanbase size', () => {
    const result = computeRevenue(100_000)
    expect(result.perUserRate).toBeCloseTo(723, 0)
  })
})
