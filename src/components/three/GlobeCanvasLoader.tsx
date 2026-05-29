'use client'

import dynamic from 'next/dynamic'

const GlobeCanvas = dynamic(
  () => import('./GlobeCanvas').then(m => ({ default: m.GlobeCanvas })),
  { ssr: false }
)

export function GlobeCanvasLoader() {
  return <GlobeCanvas />
}
