import { HeroCanvasLoader } from '@/components/three/HeroCanvasLoader'

export default function Page() {
  return (
    <main style={{ minHeight: '200vh', background: '#080b14' }}>
      <HeroCanvasLoader />
      <div style={{ position: 'relative', zIndex: 1, height: '100vh', display: 'flex', alignItems: 'center', padding: '5vw', color: 'white', fontSize: '3rem', fontWeight: 900 }}>
        Section 01 — Hero
      </div>
      <div id="s02-lost-economy" style={{ position: 'relative', zIndex: 1, height: '100vh', display: 'flex', alignItems: 'center', padding: '5vw', color: '#facc15', fontSize: '3rem', fontWeight: 900 }}>
        Section 02 — Lost Economy (camera aerial)
      </div>
    </main>
  )
}
