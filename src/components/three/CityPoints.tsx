'use client'

const POINT_COUNT = 800
const R = 1.01

const CITY_POSITIONS = (() => {
  const arr = new Float32Array(POINT_COUNT * 3)
  for (let i = 0; i < POINT_COUNT; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = 2 * Math.PI * Math.random()
    arr[i * 3]     = R * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = R * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = R * Math.cos(phi)
  }
  return arr
})()

export function CityPoints() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[CITY_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#facc15" size={0.008} sizeAttenuation />
    </points>
  )
}
