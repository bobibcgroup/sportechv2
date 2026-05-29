export const FAN_TIERS = [10_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 2_000_000] as const
export type FanTier = typeof FAN_TIERS[number]

// Per-active-user annual revenue rates
// Sum = $723/active user. Verified: 25,000 active × $723 = $18,075,000 at 100K fans
export const STREAM_RATES: Record<string, number> = {
  subscriptions:     2.00,
  sportsPredict:     106.50,
  tickets:           193.00,
  digitalGiftCards:  89.00,
  liveStreamGifting: 98.00,
  interactiveVoting: 21.50,
  merchandise:       199.50,
  nftCollectibles:   13.50,
}

export interface SimulatorResult {
  totalFans: number
  activeFans: number
  streams: Record<string, number>
  total: number
  perUserRate: number
}

export function computeRevenue(totalFans: number): SimulatorResult {
  const activeFans = Math.round(totalFans * 0.25)
  const streams: Record<string, number> = {}

  for (const [key, rate] of Object.entries(STREAM_RATES)) {
    streams[key] = Math.round(activeFans * rate)
  }

  const total = Object.values(streams).reduce((sum, v) => sum + v, 0)
  const perUserRate = total / activeFans

  return { totalFans, activeFans, streams, total, perUserRate }
}
