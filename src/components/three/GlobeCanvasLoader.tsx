'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const GlobeCanvas = dynamic(
  () => import('./GlobeCanvas').then(m => ({ default: m.GlobeCanvas })),
  { ssr: false }
)

interface GlobeCanvasLoaderProps {
  inView?: boolean
}

export function GlobeCanvasLoader({ inView }: GlobeCanvasLoaderProps) {
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    if (inView) setShouldMount(true)
  }, [inView])

  if (!shouldMount) return null
  return <GlobeCanvas inView={inView} />
}
