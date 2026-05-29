'use client'

import { useState } from 'react'
import { CounterNumber } from '@/components/ui/CounterNumber'
import { computeRevenue, FAN_TIERS, type FanTier } from '@/lib/simulatorFormula'

const TIER_LABELS: Record<number, string> = {
  10_000: '10K',
  50_000: '50K',
  100_000: '100K',
  250_000: '250K',
  500_000: '500K',
  1_000_000: '1M',
  2_000_000: '2M+',
}

const STREAM_DISPLAY: Record<string, string> = {
  subscriptions: 'Subscriptions',
  sportsPredict: 'Sports Predictions',
  tickets: 'Tickets',
  digitalGiftCards: 'Digital Gift Cards',
  liveStreamGifting: 'Live Stream Gifting',
  interactiveVoting: 'Interactive Voting',
  merchandise: 'Merchandise',
  nftCollectibles: 'NFT & Collectibles',
}

const STREAM_COLORS: Record<string, string> = {
  subscriptions: '#60a5fa',
  sportsPredict: '#4ade80',
  tickets: '#facc15',
  digitalGiftCards: '#fb923c',
  liveStreamGifting: '#c084fc',
  interactiveVoting: '#38bdf8',
  merchandise: '#a78bfa',
  nftCollectibles: '#f87171',
}

const MAX_IDX = FAN_TIERS.length - 1

export function S06Simulator() {
  const [tierIdx, setTierIdx] = useState<number>(2) // default 100K
  const selectedTier = FAN_TIERS[tierIdx] as FanTier
  const result = computeRevenue(selectedTier)
  const streamEntries = Object.keys(STREAM_DISPLAY)
  const fillPct = (tierIdx / MAX_IDX) * 100

  return (
    <section id="s06-simulator" className="relative min-h-screen bg-base flex items-center py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full">
        <p className="text-yellow text-xs font-bold tracking-widest uppercase mb-4">
          Revenue Simulator
        </p>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-2">
          See your club&apos;s potential.
        </h2>
        <p className="text-slate-400 mb-10">
          Drag the slider to set your fanbase size. Only 25% is counted as active users.
        </p>

        {/* Slider */}
        <div className="mb-10">
          <div className="flex justify-between text-xs text-slate-500 mb-3 px-1">
            <span>10K fans</span>
            <span>2M+ fans</span>
          </div>

          <div className="relative py-2">
            <input
              type="range"
              min={0}
              max={MAX_IDX}
              step={1}
              value={tierIdx}
              onChange={(e) => setTierIdx(parseInt(e.target.value, 10))}
              aria-label="Select fanbase size"
              className="
                w-full h-2 rounded-full appearance-none cursor-pointer outline-none
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-yellow
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-[#080b14]
                [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(250,204,21,0.6)]
                [&::-webkit-slider-thumb]:cursor-grab
                [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb:active]:cursor-grabbing
                [&::-webkit-slider-thumb:active]:scale-110
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-yellow
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-[#080b14]
                [&::-moz-range-thumb]:cursor-grab
              "
              style={{
                background: `linear-gradient(to right, #facc15 ${fillPct}%, rgba(255,255,255,0.08) ${fillPct}%)`,
              }}
            />
          </div>

          <div className="flex justify-between mt-3 px-0.5">
            {FAN_TIERS.map((tier, i) => (
              <button
                key={tier}
                type="button"
                onClick={() => setTierIdx(i)}
                className={`text-[10px] font-medium transition-colors duration-150 cursor-pointer ${
                  i === tierIdx ? 'text-yellow' : 'text-slate-600 hover:text-slate-400'
                }`}
                aria-label={`Select ${TIER_LABELS[tier]} fans`}
              >
                {TIER_LABELS[tier]}
              </button>
            ))}
          </div>

          <div className="text-center mt-4">
            <span className="text-3xl font-black text-white">{TIER_LABELS[selectedTier]}</span>
            <span className="text-slate-400 ml-2 text-sm">fans selected</span>
          </div>
        </div>

        {/* Revenue display */}
        <div className="bg-section-alt border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              Estimated Example Annual Revenue Share
            </p>
            <span className="text-xs bg-white/10 text-slate-400 px-3 py-1 rounded-full">
              {result.activeFans.toLocaleString()} active users · 25% of {TIER_LABELS[selectedTier]}
            </span>
          </div>

          <div className="text-5xl lg:text-6xl font-black text-yellow my-4">
            <CounterNumber value={result.total} prefix="$" duration={0.8} />
          </div>
          <p className="text-slate-500 text-sm">per year</p>

          {/* 8-stream grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            {streamEntries.map((key) => (
              <div
                key={key}
                className="flex items-center justify-between py-3 border-l-2 pl-4"
                style={{ borderColor: STREAM_COLORS[key] }}
              >
                <span className="text-slate-400 text-sm">{STREAM_DISPLAY[key]}</span>
                <span className="font-bold text-sm" style={{ color: STREAM_COLORS[key] }}>
                  <CounterNumber value={result.streams[key] ?? 0} prefix="$" duration={0.6} />
                </span>
              </div>
            ))}
          </div>

          <p className="text-slate-500 text-xs mt-6">
            Each active user spends an average of{' '}
            <strong className="text-slate-300">
              ${Math.round(result.perUserRate).toLocaleString()}
            </strong>{' '}
            per year across all 8 streams.
          </p>
        </div>

        <p className="text-slate-600 text-xs text-center">
          Calculations assume 25% active user conversion. Revenue share is structured per
          partnership agreement. Actual results vary by engagement, market, and content strategy.
        </p>
      </div>
    </section>
  )
}
