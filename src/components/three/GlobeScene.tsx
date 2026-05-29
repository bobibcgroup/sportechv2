import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { CityPoints } from './CityPoints'

const STARS_PROPS = { radius: 100, depth: 50, count: 3000, factor: 4, saturation: 0, fade: true } as const

export function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null)
  const reduced = useReducedMotion()

  useFrame(() => {
    if (reduced || !groupRef.current) return
    groupRef.current.rotation.y += 0.001
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />

      <Stars {...STARS_PROPS} />

      <group ref={groupRef}>
        {/* Earth sphere */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
            color="#0a1f3d"
            emissive="#0a3060"
            emissiveIntensity={0.3}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Atmosphere sphere */}
        <mesh>
          <sphereGeometry args={[1.02, 32, 32]} />
          <meshPhongMaterial
            color="#1a6aff"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </mesh>

        <CityPoints />
      </group>
    </>
  )
}
