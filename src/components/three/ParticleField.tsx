'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ParticleField({ count = 3000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      const isYellow = Math.random() < 0.05
      col[i * 3]     = isYellow ? 0.98 : 0.7 + Math.random() * 0.3
      col[i * 3 + 1] = isYellow ? 0.8  : 0.8 + Math.random() * 0.2
      col[i * 3 + 2] = isYellow ? 0.08 : 1.0
    }
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.02
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.3
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}
