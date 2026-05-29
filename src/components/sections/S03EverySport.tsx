'use client'

import { useRef } from 'react'
import { type Variants, motion, useInView } from 'framer-motion'

const SPORTS = [
  { name: 'Football', emoji: '⚽' },
  { name: 'Basketball', emoji: '🏀' },
  { name: 'Esports', emoji: '🎮' },
  { name: 'Rugby', emoji: '🏉' },
  { name: 'Combat', emoji: '🥊' },
  { name: 'Racing', emoji: '🏎' },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export function S03EverySport() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section ref={ref} id="s03-every-sport" className="relative min-h-screen bg-section-alt flex items-center py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-yellow text-xs font-bold tracking-widest uppercase mb-4">
              Built for Every Sport
            </p>
            <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-8">
              One Platform.<br />
              <span className="text-yellow">Every Sport.</span><br />
              Every Fan.
            </h2>
            <p className="text-slate-400 text-lg max-w-md">
              From grassroots clubs to global leagues — Sportech powers fan engagement across every sport.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-3 gap-4"
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {SPORTS.map((sport) => (
              <motion.div
                key={sport.name}
                variants={item}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-yellow/40 hover:bg-yellow/5 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-3xl" role="img" aria-label={sport.name}>{sport.emoji}</span>
                <span className="text-xs font-semibold text-slate-400">{sport.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
