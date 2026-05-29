import { HeroCanvasLoader } from '@/components/three/HeroCanvasLoader'
import { S01Hero } from '@/components/sections/S01Hero'
import { S02LostEconomy } from '@/components/sections/S02LostEconomy'
import { S03EverySport } from '@/components/sections/S03EverySport'
import { S04RevenueWheel } from '@/components/sections/S04RevenueWheel'
import { S05AppMockup } from '@/components/sections/S05AppMockup'
import { S06Simulator } from '@/components/sections/S06Simulator'
import { S07Infrastructure } from '@/components/sections/S07Infrastructure'
import { S08Future } from '@/components/sections/S08Future'
import { S09Globe } from '@/components/sections/S09Globe'

export default function Page() {
  return (
    <main className="bg-base overflow-x-hidden">
      <HeroCanvasLoader />
      <S01Hero />
      <S02LostEconomy />
      <S03EverySport />
      <S04RevenueWheel />
      <S05AppMockup />
      <S06Simulator />
      <S07Infrastructure />
      <S08Future />
      <S09Globe />
    </main>
  )
}
