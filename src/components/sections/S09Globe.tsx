'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { GlowButton } from '@/components/ui/GlowButton'
import { GlobeCanvasLoader } from '@/components/three/GlobeCanvasLoader'

export function S09Globe() {
  const ref = useRef<HTMLElement>(null)
  // once: true — for text entry animations (triggers once, stays visible)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  // once: false — for canvas frameloop and deferred mount (accurately tracks visibility)
  const canvasInView = useInView(ref, { once: false, margin: '0px' })
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()

  const fadeUp = useCallback((delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.6, delay },
  }), [reduced, inView])

  return (
    <section ref={ref} id="s09-globe" className="relative min-h-screen bg-base flex items-center py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text content */}
          <div className="flex flex-col gap-6">
            <motion.p
              className="text-yellow text-xs font-bold tracking-widest uppercase"
              {...fadeUp(0.1)}
            >
              Global Impact
            </motion.p>

            <motion.h2
              className="text-5xl lg:text-6xl font-black text-white leading-tight"
              {...fadeUp(0.2)}
            >
              Your Club. The Whole World.{' '}
              <span className="text-yellow">Join the Movement.</span>
            </motion.h2>

            <motion.p
              className="text-slate-400 text-lg max-w-lg"
              {...fadeUp(0.3)}
            >
              Sportech connects clubs to fans across every timezone. Your platform. Your community. Everywhere.
            </motion.p>

            <motion.div {...fadeUp(0.4)}>
              <GlowButton href="#s01-hero">Start Your Journey</GlowButton>
            </motion.div>
          </div>

          {/* Right: globe canvas */}
          <div className="flex justify-center lg:justify-end">
            <div className="aspect-square w-full max-w-md mx-auto relative">
              <GlobeCanvasLoader inView={canvasInView} />

              {isMobile && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    role="img"
                    aria-label="A globe representing Sportech's worldwide reach"
                    className="w-32 h-32 rounded-full bg-yellow/20 border-2 border-yellow/40 flex items-center justify-center text-yellow text-sm font-bold"
                  >
                    GLOBAL
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
