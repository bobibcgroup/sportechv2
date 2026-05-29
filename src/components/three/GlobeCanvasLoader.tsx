'use client'

import dynamic from 'next/dynamic'

const GlobeCanvas = dynamic(
  () => import('./GlobeCanvas').then(m => ({ default: m.GlobeCanvas })),
  { ssr: false }
)

interface GlobeCanvasLoaderProps {
  inView?: boolean
}

export function GlobeCanvasLoader({ inView }: GlobeCanvasLoaderProps) {
  return <GlobeCanvas inView={inView} />
}
