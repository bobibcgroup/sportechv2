'use client'

import dynamic from 'next/dynamic'

const HeroCanvas = dynamic(
  () => import('./HeroCanvas').then(m => ({ default: m.HeroCanvas })),
  { ssr: false }
)

export function HeroCanvasLoader() {
  return <HeroCanvas />
}
