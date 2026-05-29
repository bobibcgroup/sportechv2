'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const COLOR_SWATCHES = [
  { name: 'Midnight', primary: '#facc15', bg: '#080b14' },
  { name: 'Ocean', primary: '#38bdf8', bg: '#0a1929' },
  { name: 'Forest', primary: '#4ade80', bg: '#052e16' },
  { name: 'Ember', primary: '#fb923c', bg: '#1c0a04' },
]

export function S05AppMockup() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const reduced = useReducedMotion()
  const [activeColor, setActiveColor] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 15
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -15
    setTilt({ x, y })
  }

  const swatch = COLOR_SWATCHES[activeColor]

  return (
    <section ref={ref} id="s05-app-mockup" className="relative min-h-screen bg-section-alt flex items-center py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: controls */}
          <div>
            <p className="text-yellow text-xs font-bold tracking-widest uppercase mb-4">
              Your Club. Your Experience.
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              See It in Your Colors.<br />
              <span className="text-yellow">Your Brand.</span><br />
              Your App.
            </h2>
            <p className="text-slate-400 mb-8">
              Choose your club&apos;s colors and see your platform come to life.
            </p>

            <div className="flex gap-3 flex-wrap">
              {COLOR_SWATCHES.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setActiveColor(i)}
                  aria-label={`Select ${s.name} theme`}
                  aria-pressed={i === activeColor}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                    i === activeColor ? 'border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ background: s.primary }}
                />
              ))}
            </div>
          </div>

          {/* Right: phone mockup */}
          <motion.div
            className="flex justify-center"
            initial={reduced ? false : { opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="cursor-pointer select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: reduced ? 'none' : 'transform 0.1s ease-out',
                willChange: reduced ? 'auto' : 'transform',
              }}
            >
              <motion.div
                className="w-56 h-[480px] max-w-full rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden"
                animate={{ backgroundColor: swatch.bg }}
                transition={{ duration: 0.35 }}
              >
                {/* App header */}
                <div
                  className="h-14 flex items-center px-4 border-b border-white/10"
                  style={{ background: swatch.primary + '22' }}
                >
                  <div className="w-6 h-6 rounded-full" style={{ background: swatch.primary }} />
                  <span className="ml-3 text-white text-xs font-bold">My Club</span>
                </div>

                {/* App content */}
                <div className="p-4 space-y-3">
                  {[0, 1, 2].map((n) => (
                    <div key={n} className="bg-white/5 rounded-xl p-3">
                      <div className="h-2 rounded bg-white/20 w-3/4 mb-2" />
                      <div
                        className="h-2 rounded w-1/2"
                        style={{ background: swatch.primary + '66' }}
                      />
                    </div>
                  ))}
                  <div
                    className="rounded-xl py-3 text-center text-xs font-bold cursor-pointer"
                    style={{ background: swatch.primary, color: '#080b14' }}
                  >
                    Engage Now
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
