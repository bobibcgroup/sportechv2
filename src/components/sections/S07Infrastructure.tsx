'use client'

import { useRef } from 'react'
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
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section ref={ref} id="s07-infrastructure" className="relative min-h-screen bg-section-alt flex items-center py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: features */}
          <div>
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
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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

          {/* Right: SVG node diagram */}
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            <svg
              viewBox="-5 -5 110 110"
              className="w-full h-full"
              aria-label="Sportech infrastructure diagram"
              role="img"
            >
              {/* Edges */}
              {EDGES.map(([a, b], i) => (
                <motion.line
                  key={`edge-${a}-${b}`}
                  x1={NODES[a].x}
                  y1={NODES[a].y}
                  x2={NODES[b].x}
                  y2={NODES[b].y}
                  stroke="#facc1533"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                />
              ))}

              {/* Nodes */}
              {NODES.map((node, i) => (
                <motion.g
                  key={node.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 260 }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
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
