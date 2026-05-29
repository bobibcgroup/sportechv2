'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CounterNumber } from '@/components/ui/CounterNumber'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const REVENUE_STREAMS = [
  { label: 'Ticketing & Merch', value: 412_000_000, bar: 0.92 },
  { label: 'Broadcast Rights', value: 298_000_000, bar: 0.72 },
  { label: 'Digital Engagement', value: 187_000_000, bar: 0.52 },
  { label: 'Sponsorship', value: 163_000_000, bar: 0.44 },
]

export function S02LostEconomy() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const reduced = useReducedMotion()

  return (
    <section
      id="s02-lost-economy"
      ref={ref}
      className="relative min-h-screen flex items-center bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: headline + counter */}
          <div>
            <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mb-4">
              The Lost Economy
            </p>
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-8">
              Billions in Fan<br />Engagement Happen<br />Every Day.
            </h2>
            <p className="text-slate-400 mb-10">
              Most clubs monetize only a fraction of it.
            </p>

            {/* Hero stat card */}
            <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-8">
              {/* Subtle glow behind the number */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
                aria-hidden="true"
                style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.07), transparent 70%)' }}
              />
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">
                Total Fan Economy (Annual)
              </p>
              <div className="text-5xl lg:text-6xl font-black text-yellow relative z-10">
                {inView ? (
                  <CounterNumber value={1_050_000_000} prefix="$" suffix="+" duration={2.5} />
                ) : (
                  <span className="opacity-0">$1,050,000,000+</span>
                )}
              </div>
              <p className="text-slate-500 text-xs mt-2 relative z-10">per year across global fan markets</p>

              {/* Glowing bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow/40 to-transparent" />
            </div>
          </div>

          {/* Right: activity stats cards */}
          <div className="flex flex-col gap-3">
            {REVENUE_STREAMS.map((stream, i) => (
              <motion.div
                key={stream.label}
                className="group bg-white/5 border border-white/10 rounded-xl px-6 py-4 hover:border-yellow/20 hover:bg-white/[0.07] transition-colors duration-200"
                initial={reduced ? false : { opacity: 0, x: 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-sm group-hover:text-white transition-colors duration-200">{stream.label}</span>
                  <span className="text-white font-bold text-sm">
                    {inView && <CounterNumber value={stream.value} prefix="$" duration={1.8} />}
                  </span>
                </div>
                {/* Activity bar */}
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-yellow to-yellow/60"
                    initial={{ width: '0%' }}
                    animate={inView ? { width: `${stream.bar * 100}%` } : {}}
                    transition={{ delay: 0.5 + i * 0.12, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
            <div className="h-px bg-gradient-to-r from-transparent via-yellow/40 to-transparent mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
