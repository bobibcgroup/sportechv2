'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const HeroCanvas = dynamic(
  () => import('./HeroCanvas').then(m => ({ default: m.HeroCanvas })),
  { ssr: false }
)

export function HeroCanvasLoader() {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const ids = ['s01-hero', 's02-lost-economy']
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const visibleSet = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) visibleSet.add(entry.target)
          else visibleSet.delete(entry.target)
        })
        setInView(visibleSet.size > 0)
      },
      { threshold: 0 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return <HeroCanvas inView={inView} />
}
