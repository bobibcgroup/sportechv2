'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
}

interface SpaceBackgroundProps {
  inView?: boolean
  particleCount?: number
}

export function SpaceBackground({ inView = false, particleCount = 200 }: SpaceBackgroundProps) {
  const count = Math.min(particleCount, 2000)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const runningRef = useRef(false)
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      sizeRef.current = { w, h }
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.5 + 0.1,
      }))
    }

    setSize()
    window.addEventListener('resize', setSize)
    return () => window.removeEventListener('resize', setSize)
  }, [count])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (!inView) {
      runningRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }

    runningRef.current = true

    const animate = () => {
      if (!runningRef.current) return
      const { w, h } = sizeRef.current
      ctx.clearRect(0, 0, w, h)

      for (const p of particlesRef.current) {
        p.x = (p.x + p.vx + w) % w
        p.y = (p.y + p.vy + h) % h
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(250,204,21,${p.alpha * 0.35})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      runningRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [inView])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
