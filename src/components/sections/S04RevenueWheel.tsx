'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const STREAMS = [
  { label: 'Player Tokens', angle: 0 },
  { label: 'Live Gifting', angle: 45 },
  { label: 'Predictions', angle: 90 },
  { label: 'AR Experiences', angle: 135 },
  { label: 'Voting', angle: 180 },
  { label: 'Tickets & Merch', angle: 225 },
  { label: 'Subscriptions', angle: 270 },
  { label: 'NFT Collectibles', angle: 315 },
]

const FEATURES = [
  'Fan Engagement Hub',
  'Revenue Analytics',
  'White-label App',
  'Multi-sport Support',
  'Real-time Payouts',
  'API Access',
]

export function S04RevenueWheel() {
  const sectionRef = useRef<HTMLElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0px' })

  useGSAP(() => {
    if (!inView || !wheelRef.current) return
    gsap.fromTo(
      wheelRef.current,
      { rotation: -180, opacity: 0, scale: 0.7 },
      { rotation: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }
    )
  }, { dependencies: [inView], scope: sectionRef })

  return (
    <section ref={sectionRef} id="s04-revenue-wheel" className="relative min-h-screen bg-base flex items-center py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: headline + feature list */}
          <div>
            <p className="text-yellow text-xs font-bold tracking-widest uppercase mb-4">
              Revenue Streams
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-10">
              Eight Ways to Turn<br />
              <span className="text-yellow">Passion Into Revenue.</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f}
                  className="flex items-center gap-2 text-sm text-slate-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.07 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow flex-shrink-0" />
                  {f}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: wheel diagram */}
          <div className="flex items-center justify-center">
            <div ref={wheelRef} className="relative w-72 h-72" style={{ opacity: 0, willChange: 'transform, opacity' }}>
              <div className="absolute inset-0 rounded-full border-2 border-yellow/20" />
              <div className="absolute inset-4 rounded-full border border-white/10" />

              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-yellow flex items-center justify-center glow-yellow">
                  <span className="font-black text-[9px] tracking-widest leading-tight text-center">
                    SPORT<br />TECH
                  </span>
                </div>
              </div>

              {/* Stream labels at spoke positions */}
              {STREAMS.map((stream) => {
                const rad = (stream.angle * Math.PI) / 180
                const r = 38  // reduced from 42 to prevent overflow
                const x = 50 + Math.cos(rad) * r
                const y = 50 + Math.sin(rad) * r
                return (
                  <div
                    key={`${stream.label}-${stream.angle}`}
                    className="absolute text-[8px] text-slate-400 text-center leading-tight"
                    style={{
                      width: '60px',
                      left: `calc(${x}% - 30px)`,
                      top: `calc(${y}% - 16px)`,
                    }}
                  >
                    {stream.label}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
