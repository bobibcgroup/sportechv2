'use client'

import { Canvas } from '@react-three/fiber'
import { useIsMobile } from '@/hooks/useIsMobile'
import { GlobeScene } from './GlobeScene'

interface GlobeCanvasProps {
  inView?: boolean
}

export function GlobeCanvas({ inView = true }: GlobeCanvasProps) {
  const isMobile = useIsMobile()
  if (isMobile) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      style={{ width: '100%', height: '100%', background: '#080b14' }}
      gl={{ antialias: !isMobile }}
      dpr={[1, 2]}
      frameloop={inView ? 'always' : 'demand'}
    >
      <GlobeScene />
    </Canvas>
  )
}
