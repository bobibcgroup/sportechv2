'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STAT_CARDS = [
  { label: 'Annual Revenue', value: '$2.4M', change: '+34%' },
  { label: 'Active Fans', value: '84K', change: '+12%' },
  { label: 'Avg. Spend/Fan', value: '$723', change: '+8%' },
]

export function S01Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  useGSAP(() => {
    if (reduced || !headlineRef.current) return
    const lines = headlineRef.current.querySelectorAll('.reveal-line')
    gsap.fromTo(
      lines,
      { y: '105%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
    )
  }, { scope: containerRef })

  return (
    <section
      id="s01-hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-base"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-yellow text-xs font-bold tracking-widest uppercase mb-6">
              The Money Screen
            </p>
            <h1
              ref={headlineRef}
              className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight"
            >
              <span className="split-line"><span className="reveal-line inline-block text-white">Your Club&apos;s</span></span>
              <span className="split-line"><span className="reveal-line inline-block text-white">Revenue.</span></span>
              <span className="split-line"><span className="reveal-line inline-block text-yellow">Finally</span></span>
              <span className="split-line"><span className="reveal-line inline-block text-yellow">Unlocked.</span></span>
            </h1>
            <motion.p
              className="mt-6 text-slate-400 text-lg max-w-md leading-relaxed"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            >
              Your fans are already spending money on their passion. They&apos;re just not spending it with you.
            </motion.p>
          </div>

          {/* Right: floating stat cards */}
          <div className="flex flex-col gap-4">
            {STAT_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center justify-between"
                initial={reduced ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-slate-400 text-sm">{card.label}</span>
                <div className="text-right">
                  <div className="text-white font-bold text-xl">{card.value}</div>
                  <div className="text-green-neon text-xs">{card.change}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-500 text-xs">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
