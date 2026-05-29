'use client'

import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useIsMobile } from '@/hooks/useIsMobile'
import { GlobeScene } from './GlobeScene'

interface GlobeCanvasProps {
  inView?: boolean
}

function FrameloopInvalidate({ inView }: { inView: boolean }) {
  const { invalidate } = useThree()
  useEffect(() => {
    if (!inView) invalidate()
  }, [inView, invalidate])
  return null
}

export function GlobeCanvas({ inView = false }: GlobeCanvasProps) {
  const isMobile = useIsMobile()
  if (isMobile) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      style={{ width: '100%', height: '100%', background: '#080b14' }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      frameloop={inView ? 'always' : 'demand'}
    >
      <FrameloopInvalidate inView={inView ?? false} />
      <GlobeScene />
    </Canvas>
  )
}
