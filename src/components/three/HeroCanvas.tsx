'use client'

import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ParticleField } from './ParticleField'
import { StadiumScene } from './StadiumScene'
import { useIsMobile } from '@/hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

function SceneController() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 2, 8)
    camera.lookAt(0, 0, 0)

    const trigger = ScrollTrigger.create({
      trigger: '#s02-lost-economy',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1.5,
      onUpdate: (self) => {
        camera.position.y = 2 + self.progress * 10
        camera.lookAt(0, 0, 0)
      },
    })

    return () => { trigger.kill() }
  }, [camera])

  return null
}

interface HeroCanvasProps {
  inView?: boolean
}

export function HeroCanvas({ inView = true }: HeroCanvasProps) {
  const isMobile = useIsMobile()
  if (isMobile) return null

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 60 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      frameloop={inView ? 'always' : 'demand'}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} color="#facc15" intensity={2} />
      <Stars radius={80} depth={30} count={4000} factor={3} saturation={0} fade />
      <ParticleField count={2500} />
      <StadiumScene fanCount={1500} />
      <SceneController />
    </Canvas>
  )
}
