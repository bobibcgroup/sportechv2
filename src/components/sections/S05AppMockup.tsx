'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const COLOR_SWATCHES = [
  { name: 'Midnight', primary: '#facc15', bg: '#080b14' },
  { name: 'Ocean', primary: '#38bdf8', bg: '#0a1929' },
  { name: 'Forest', primary: '#4ade80', bg: '#052e16' },
  { name: 'Ember', primary: '#fb923c', bg: '#1c0a04' },
]

interface IPhoneFrameProps {
  children: React.ReactNode
  bg: string
}

function IPhoneFrame({ children, bg }: IPhoneFrameProps) {
  return (
    <div
      className="relative select-none"
      style={{
        width: 230,
        height: 496,
        borderRadius: 50,
        background: 'linear-gradient(160deg, #484848 0%, #1c1c1c 100%)',
        padding: 3,
        boxShadow: '0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      {/* Left buttons */}
      <div style={{ position: 'absolute', left: -5, top: 104, width: 5, height: 28, borderRadius: '3px 0 0 3px', background: '#2a2a2a' }} />
      <div style={{ position: 'absolute', left: -5, top: 148, width: 5, height: 40, borderRadius: '3px 0 0 3px', background: '#2a2a2a' }} />
      <div style={{ position: 'absolute', left: -5, top: 200, width: 5, height: 40, borderRadius: '3px 0 0 3px', background: '#2a2a2a' }} />
      {/* Right button */}
      <div style={{ position: 'absolute', right: -5, top: 136, width: 5, height: 52, borderRadius: '0 3px 3px 0', background: '#2a2a2a' }} />

      {/* Screen */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 47,
          overflow: 'hidden',
          background: bg,
          transition: 'background 0.35s ease',
          position: 'relative',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 94,
            height: 30,
            background: '#000',
            borderRadius: 15,
            zIndex: 10,
          }}
        />

        {/* Content area */}
        <div style={{ position: 'absolute', inset: 0, paddingTop: 56 }}>
          {children}
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 100,
            height: 4,
            background: 'rgba(255,255,255,0.25)',
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  )
}

export function S05AppMockup() {
  const ref = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const reduced = useReducedMotion()
  const [activeColor, setActiveColor] = useState(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !frameRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -12
    frameRef.current.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`
  }, [reduced])

  const handleMouseLeave = useCallback(() => {
    if (!frameRef.current) return
    frameRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }, [])

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

            <div className="flex gap-3 flex-wrap mb-6">
              {COLOR_SWATCHES.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setActiveColor(i)}
                  aria-label={`Select ${s.name} theme`}
                  aria-pressed={i === activeColor}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                    i === activeColor ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
                  style={{ background: s.primary }}
                />
              ))}
            </div>

            <p className="text-slate-500 text-sm">{swatch.name} Theme</p>
          </div>

          {/* Right: iPhone mockup — tilt via direct DOM mutation to avoid re-renders */}
          <motion.div
            className="flex justify-center"
            initial={reduced ? false : { opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={frameRef}
                style={{ transition: reduced ? 'none' : 'transform 0.12s ease-out', willChange: 'auto' }}
              >
                <IPhoneFrame bg={swatch.bg}>
                  {/* App header */}
                  <div
                    className="flex items-center px-4 py-3 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.08)', background: swatch.primary + '18' }}
                  >
                    <div className="w-6 h-6 rounded-full" style={{ background: swatch.primary }} />
                    <span className="ml-2.5 text-white text-xs font-bold">My Club</span>
                    <div className="ml-auto flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: swatch.primary, opacity: 0.6 }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: swatch.primary, opacity: 0.4 }} />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-2 px-3 py-3">
                    {['Fans', 'Points', 'Rank'].map((label, i) => (
                      <div key={label} className="flex-1 rounded-lg py-2 text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="text-[10px] font-bold" style={{ color: swatch.primary }}>{['84K', '2,140', '#3'][i]}</div>
                        <div className="text-[8px] text-slate-500 mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Content cards */}
                  <div className="px-3 space-y-2">
                    {[0, 1, 2].map((n) => (
                      <div key={n} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 rounded-full" style={{ background: swatch.primary + '33' }} />
                          <div className="h-1.5 rounded-full w-20" style={{ background: 'rgba(255,255,255,0.12)' }} />
                        </div>
                        <div className="h-1.5 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.08)' }} />
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <div className="absolute bottom-16 left-3 right-3">
                    <div
                      className="rounded-xl py-3 text-center text-xs font-bold"
                      style={{ background: swatch.primary, color: '#080b14' }}
                    >
                      Engage Now
                    </div>
                  </div>
                </IPhoneFrame>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
