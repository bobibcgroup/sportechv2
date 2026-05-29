'use client'

import { useId, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  'White-label Platform',
  'Club Management Dashboard',
  'Multi-sport Support',
  'Club App Integration',
  'Real-time Analytics',
  'Enterprise SLA',
]

const NODES = [
  { label: 'Auth', x: 50, y: 10 },
  { label: 'API', x: 20, y: 40 },
  { label: 'SPORTECH', x: 50, y: 50, isCenter: true },
  { label: 'Analytics', x: 80, y: 40 },
  { label: 'Payments', x: 20, y: 75 },
  { label: 'Club App', x: 80, y: 75 },
]

const EDGES: [number, number][] = [
  [0, 2], [1, 2], [3, 2], [4, 2], [5, 2],
]

export function S07Infrastructure() {
  const uid = useId()
  const ref = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  // once: true — text stagger plays once and stays visible
  const textInView = useInView(textRef, { once: true, margin: '-15% 0px' })
  // once: false — accurately tracks visibility so pulse beams pause on scroll-out
  const inView = useInView(ref, { once: false, margin: '-10% 0px' })

  return (
    <section ref={ref} id="s07-infrastructure" className="relative min-h-screen bg-section-alt flex items-center py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: features */}
          <div ref={textRef}>
            <p className="text-yellow text-xs font-bold tracking-widest uppercase mb-4">
              Powered by Enterprise Infrastructure
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-10">
              Built to Scale.<br />
              <span className="text-yellow">Easy to Launch.</span>
            </h2>
            <ul className="space-y-4">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f}
                  className="flex items-center gap-3 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <svg
                    className="w-5 h-5 text-yellow flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: pulse beam diagram */}
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            <svg
              viewBox="-5 -5 110 110"
              className="w-full h-full"
              aria-label="Sportech infrastructure diagram"
              role="img"
            >
              <defs>
                {EDGES.map(([a, b], i) => (
                  <linearGradient
                    key={`grad-${a}-${b}`}
                    id={`${uid}beam${i}`}
                    x1={`${NODES[a].x}%`}
                    y1={`${NODES[a].y}%`}
                    x2={`${NODES[b].x}%`}
                    y2={`${NODES[b].y}%`}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#facc15" stopOpacity="0" />
                    <stop offset="50%" stopColor="#facc15" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                  </linearGradient>
                ))}
              </defs>

              {/* Static base edges */}
              {EDGES.map(([a, b]) => (
                <motion.line
                  key={`base-${a}-${b}`}
                  x1={NODES[a].x}
                  y1={NODES[a].y}
                  x2={NODES[b].x}
                  y2={NODES[b].y}
                  stroke="#facc15"
                  strokeOpacity="0.08"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                />
              ))}

              {/* Animated pulse beams — only mounted when section is in view */}
              {inView && EDGES.map(([a, b], i) => {
                const dx = NODES[b].x - NODES[a].x
                const dy = NODES[b].y - NODES[a].y
                const len = Math.sqrt(dx * dx + dy * dy)
                const dashLen = len * 0.25
                return (
                  <motion.line
                    key={`pulse-${a}-${b}`}
                    x1={NODES[a].x}
                    y1={NODES[a].y}
                    x2={NODES[b].x}
                    y2={NODES[b].y}
                    stroke={`url(#${uid}beam${i})`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={`${dashLen} ${len}`}
                    animate={{ strokeDashoffset: [len + dashLen, -(len + dashLen)] }}
                    transition={{
                      duration: 1.8 + i * 0.25,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.35,
                    }}
                  />
                )
              })}

              {/* Nodes */}
              {NODES.map((node, i) => (
                <motion.g
                  key={node.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 260 }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  {node.isCenter && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={11}
                      fill="none"
                      stroke="#facc15"
                      strokeOpacity="0.25"
                      strokeWidth="1.5"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.isCenter ? 8 : 4}
                    fill={node.isCenter ? '#facc15' : '#1e293b'}
                    stroke={node.isCenter ? '#facc15' : '#334155'}
                    strokeWidth="0.5"
                  />
                  <text
                    x={node.x}
                    y={node.y + 0.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={node.isCenter ? '2.5' : '2'}
                    fill={node.isCenter ? '#080b14' : '#94a3b8'}
                    fontWeight={node.isCenter ? 'bold' : 'normal'}
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
