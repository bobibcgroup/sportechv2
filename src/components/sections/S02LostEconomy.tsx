'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CounterNumber } from '@/components/ui/CounterNumber'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const REVENUE_STREAMS = [
  { label: 'Ticketing & Merch', value: 412_000_000 },
  { label: 'Broadcast Rights', value: 298_000_000 },
  { label: 'Digital Engagement', value: 187_000_000 },
  { label: 'Sponsorship', value: 163_000_000 },
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
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">
                Total Fan Economy (Annual)
              </p>
              <div className="text-5xl lg:text-6xl font-black text-yellow">
                {inView ? (
                  <CounterNumber value={1_050_000_000} prefix="$" suffix="+" duration={2.5} />
                ) : (
                  <span>$0</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: revenue stream bars */}
          <div className="flex flex-col gap-3">
            {REVENUE_STREAMS.map((stream, i) => (
              <motion.div
                key={stream.label}
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-6 py-4"
                initial={reduced ? false : { opacity: 0, x: 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-slate-400 text-sm">{stream.label}</span>
                <span className="text-white font-bold text-sm">
                  {inView && <CounterNumber value={stream.value} prefix="$" duration={1.8} />}
                </span>
              </motion.div>
            ))}
            <div className="h-px bg-gradient-to-r from-transparent via-yellow/40 to-transparent mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
