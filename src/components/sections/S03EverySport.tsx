'use client'

import { useRef } from 'react'
import { type Variants, motion, useInView } from 'framer-motion'

interface SportIcon {
  name: string
  icon: React.ReactNode
}

const SPORTS: SportIcon[] = [
  {
    name: 'Football',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6.5l2.5 3.5H9.5L12 6.5z" fill="currentColor" opacity="0.4" />
        <path d="M8 10.5L5.5 14M16 10.5l2.5 3.5M9.5 10h5" />
        <path d="M7.5 17.5l4.5-3 4.5 3" />
      </svg>
    ),
  },
  {
    name: 'Basketball',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 9.5c2.5 1 4.5 3 5 5.5" />
        <path d="M20.5 9.5c-2.5 1-4.5 3-5 5.5" />
        <path d="M12 3c0 4-2 7-2 9s2 5 2 9" />
      </svg>
    ),
  },
  {
    name: 'Esports',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M6 12h4M8 10v4" />
        <circle cx="15.5" cy="11" r="0.5" fill="currentColor" />
        <circle cx="17.5" cy="13" r="0.5" fill="currentColor" />
        <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
      </svg>
    ),
  },
  {
    name: 'Rugby',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <ellipse cx="12" cy="12" rx="8" ry="5.5" transform="rotate(40 12 12)" />
        <path d="M9 9l6 6M8 11l3-3M13 16l3-3" />
      </svg>
    ),
  },
  {
    name: 'Combat',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M7 9.5v5l3 4h4l3-4v-5l-1-2.5H8L7 9.5z" />
        <path d="M10 7V5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V7" />
        <path d="M9.5 12.5h5" />
      </svg>
    ),
  },
  {
    name: 'Racing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M4 14l2-4h12l2 4H4z" />
        <path d="M4 14l-1 3h18l-1-3" />
        <circle cx="8.5" cy="17" r="1.5" />
        <circle cx="15.5" cy="17" r="1.5" />
        <path d="M10 10l1-3 1 3M8 7h8" />
      </svg>
    ),
  },
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

          <motion.ul
            role="list"
            className="grid grid-cols-3 gap-4 list-none p-0 m-0"
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {SPORTS.map((sport) => (
              <motion.li
                key={sport.name}
                role="listitem"
                variants={item}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 overflow-hidden transition-all duration-300 hover:border-yellow/40 hover:bg-yellow/5 hover:shadow-[0_0_24px_rgba(250,204,21,0.08)]"
                whileHover={{ scale: 1.04, y: -2 }}
              >
                {/* White corner glow on hover */}
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 70%)',
                  }}
                />

                <div className="text-yellow" aria-hidden="true">
                  {sport.icon}
                </div>
                <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors duration-200">
                  {sport.name}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
