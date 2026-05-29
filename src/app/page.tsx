import { HeroCanvasLoader } from '@/components/three/HeroCanvasLoader'
import { S01Hero } from '@/components/sections/S01Hero'
import { S02LostEconomy } from '@/components/sections/S02LostEconomy'

export default function Page() {
  return (
    <main className="bg-base">
      <HeroCanvasLoader />
      <S01Hero />
      <S02LostEconomy />
    </main>
  )
}
