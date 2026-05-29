'use client'

import dynamic from 'next/dynamic'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Dynamically import the entire canvas wrapper (ssr: false) to avoid Three.js SSR errors
const AmbientCanvas = dynamic(
  () =>
    import('@/components/three/AmbientParticles').then(({ AmbientParticles }) => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Canvas } = require('@react-three/fiber') as typeof import('@react-three/fiber')

      function AmbientCanvasInner() {
        return (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ alpha: true, antialias: false }}
          >
            <AmbientParticles />
          </Canvas>
        )
      }

      return { default: AmbientCanvasInner }
    }),
  { ssr: false }
)

const FEATURES = [
  'Live Streaming',
  'Fan Gaming',
  'Social Commerce',
  'NFT Marketplace',
  'Digital Collectibles',
  'Interactive Voting',
]

export function S08Future() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()
  const [shouldMountCanvas, setShouldMountCanvas] = useState(false)

  useEffect(() => {
    if (inView) setShouldMountCanvas(true)
  }, [inView])

  return (
    <section ref={ref} className="relative min-h-screen bg-base flex items-center py-32 overflow-hidden">
      {/* Ambient R3F particle canvas — desktop only */}
      {!isMobile && shouldMountCanvas && (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <AmbientCanvas />
        </div>
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#080b14_80%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <p className="text-yellow text-xs font-bold tracking-widest uppercase mb-4">
          The Future of Sports Is Interactive
        </p>
        <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 max-w-2xl">
          The Match Is Just<br />
          <span className="text-yellow">The Beginning.</span>
        </h2>
        <p className="text-slate-400 text-lg mb-12 max-w-lg">
          The future of sports isn&apos;t passive. It&apos;s participation.
        </p>

        <div className="flex flex-wrap gap-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f}
              className="border border-purple-glow/40 bg-purple-glow/5 rounded-full px-5 py-2.5 text-sm text-slate-300"
              initial={reduced ? false : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            >
              {f}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
