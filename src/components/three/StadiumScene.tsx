'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FAN_COLORS = [
  new THREE.Color('#4ade80'),
  new THREE.Color('#facc15'),
  new THREE.Color('#f87171'),
]

export function StadiumScene({ fanCount = 2000 }: { fanCount?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const positions = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i < fanCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 2.5
      pts.push([Math.cos(angle) * radius * 1.4, 0, Math.sin(angle) * radius])
    }
    return pts
  }, [fanCount])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    positions.forEach(([x, , z], i) => {
      dummy.position.set(x, 0, z)
      dummy.position.y = Math.sin(clock.getElapsedTime() * 2 + i * 0.1) * 0.05
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
      const colorIdx = i % 3 === 0 ? 2 : i % 3 === 1 ? 1 : 0
      meshRef.current!.setColorAt(i, FAN_COLORS[colorIdx])
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  })

  return (
    <>
      {/* Outer pitch — CircleGeometry scaled on x to create an ellipse */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} scale={[1.4, 1, 1]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#0a1a0a" roughness={0.9} />
      </mesh>
      {/* Inner pitch / centre circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0]} scale={[1.4, 1, 1]}>
        <circleGeometry args={[1.8, 32]} />
        <meshStandardMaterial color="#1a4a1a" roughness={0.8} emissive="#0a2a0a" emissiveIntensity={0.5} />
      </mesh>
      <instancedMesh ref={meshRef} args={[undefined, undefined, fanCount]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial vertexColors />
      </instancedMesh>
    </>
  )
}
