'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

interface CobeGlobeProps {
  inView?: boolean
}

export function CobeGlobe({ inView = false }: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const pointerXRef = useRef<number | null>(null)
  const cancelledRef = useRef(false)

  useEffect(() => {
    if (!canvasRef.current || !inView) return

    cancelledRef.current = false
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2)

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: 600,
      height: 600,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.08, 0.09, 0.15],
      markerColor: [0.98, 0.8, 0.08],
      glowColor: [0.3, 0.3, 0.8],
      markers: [
        { location: [51.5074, -0.1278], size: 0.08 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [-23.5505, -46.633], size: 0.08 },
        { location: [35.6762, 139.65], size: 0.06 },
        { location: [28.6139, 77.209], size: 0.07 },
      ],
    })

    let rafId: number

    const tick = () => {
      if (cancelledRef.current) return
      if (pointerXRef.current === null) {
        phiRef.current += 0.003
      }
      globe.update({ phi: phiRef.current })
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelledRef.current = true
      cancelAnimationFrame(rafId)
      globe.destroy()
    }
  }, [inView])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Interactive 3D globe showing Sportech's global presence across London, New York, São Paulo, Tokyo, and Delhi"
      style={{ width: '100%', height: '100%', cursor: 'grab', contain: 'layout paint size' }}
      onPointerDown={(e) => {
        pointerXRef.current = e.clientX
        e.currentTarget.setPointerCapture(e.pointerId)
        if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
      }}
      onPointerMove={(e) => {
        if (pointerXRef.current === null) return
        const delta = (e.clientX - pointerXRef.current) / 200
        phiRef.current += delta
        pointerXRef.current = e.clientX
      }}
      onPointerUp={() => {
        pointerXRef.current = null
        if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
      }}
      onPointerOut={() => {
        pointerXRef.current = null
      }}
      onPointerCancel={() => {
        pointerXRef.current = null
        if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
      }}
    />
  )
}
