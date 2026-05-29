'use client'

import { useId, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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

const CX = 144
const CY = 144
const OUTER_R = 128
const INNER_R = 52
const SPOKE_END = 122
const SPOKE_START = 56

export function S04RevenueWheel() {
  const uid = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0px' })

  useGSAP(() => {
    if (reduced || !inView || !wheelRef.current) return
    const el = wheelRef.current
    gsap.fromTo(
      el,
      { rotation: -180, opacity: 0, scale: 0.7 },
      {
        rotation: 0, opacity: 1, scale: 1,
        duration: 1.4, ease: 'power3.out',
        onStart: () => { el.style.willChange = 'transform, opacity' },
        onComplete: () => { el.style.willChange = 'auto' },
      }
    )
  }, { dependencies: [inView, reduced], scope: sectionRef })

  const outerCircumference = 2 * Math.PI * OUTER_R
  const ringGradId = `${uid}ring`

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
            <div
              ref={wheelRef}
              className="relative w-72 h-72"
              style={{ opacity: 0 }}
            >
              <svg
                viewBox="0 0 288 288"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={ringGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#facc15" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="0.7" />
                  </linearGradient>
                </defs>

                {/* Outer ring track */}
                <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="#facc15" strokeOpacity="0.08" strokeWidth="1" />

                {/* Outer ring — animated reveal; delayed past GSAP tween (1.4s) */}
                <motion.circle
                  cx={CX} cy={CY} r={OUTER_R}
                  fill="none"
                  stroke={`url(#${ringGradId})`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={outerCircumference}
                  initial={{ strokeDashoffset: outerCircumference }}
                  animate={inView ? { strokeDashoffset: 0 } : {}}
                  transition={{ duration: 2, ease: 'linear', delay: 1.5 }}
                />

                {/* Inner ring */}
                <circle cx={CX} cy={CY} r={INNER_R + 8} fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />

                {/* Spokes — delayed past GSAP tween */}
                {STREAMS.map((stream, i) => {
                  const rad = (stream.angle * Math.PI) / 180
                  const x1 = CX + Math.cos(rad) * SPOKE_START
                  const y1 = CY + Math.sin(rad) * SPOKE_START
                  const x2 = CX + Math.cos(rad) * SPOKE_END
                  const y2 = CY + Math.sin(rad) * SPOKE_END
                  const spokeLen = SPOKE_END - SPOKE_START
                  return (
                    <motion.line
                      key={`spoke-${stream.angle}`}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#facc15"
                      strokeOpacity="0.18"
                      strokeWidth="1"
                      strokeDasharray={spokeLen}
                      initial={{ strokeDashoffset: spokeLen }}
                      animate={inView ? { strokeDashoffset: 0 } : {}}
                      transition={{ delay: 1.5 + i * 0.1, duration: 0.6 }}
                    />
                  )
                })}

                {/* Spoke endpoint dots — delayed past GSAP tween */}
                {STREAMS.map((stream, i) => {
                  const rad = (stream.angle * Math.PI) / 180
                  const x = CX + Math.cos(rad) * SPOKE_END
                  const y = CY + Math.sin(rad) * SPOKE_END
                  return (
                    <motion.circle
                      key={`dot-${stream.angle}`}
                      cx={x} cy={y} r={3}
                      fill="#facc15"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 0.7 } : {}}
                      transition={{ delay: 1.6 + i * 0.1, type: 'spring', stiffness: 220 }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                  )
                })}
              </svg>

              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-yellow flex items-center justify-center glow-yellow">
                  <span className="font-black text-[9px] tracking-widest leading-tight text-center text-base">
                    SPORT<br />TECH
                  </span>
                </div>
              </div>

              {/* Stream labels */}
              {STREAMS.map((stream) => {
                const rad = (stream.angle * Math.PI) / 180
                const r = 38
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
