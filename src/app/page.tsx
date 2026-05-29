import { HeroCanvasLoader } from '@/components/three/HeroCanvasLoader'
import { S01Hero } from '@/components/sections/S01Hero'
import { S02LostEconomy } from '@/components/sections/S02LostEconomy'
import { S03EverySport } from '@/components/sections/S03EverySport'
import { S04RevenueWheel } from '@/components/sections/S04RevenueWheel'

export default function Page() {
  return (
    <main className="bg-base">
      <HeroCanvasLoader />
      <S01Hero />
      <S02LostEconomy />
      <S03EverySport />
      <S04RevenueWheel />
    </main>
  )
}
