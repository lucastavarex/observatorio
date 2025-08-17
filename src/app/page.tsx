"use client"

import { BrandSlider } from "@/components/brand-slider"
import { EventsSection } from "@/components/events-section"
import { Header } from "@/components/header"
import { HeroSwiper } from "@/components/hero-swiper"
import { ImpactNumbersSection } from "@/components/impact-numbers-section"
import { NoticiasSection } from "@/components/noticias-section"
import { ProjectsSection } from "@/components/projects-section"

export default function Home() {

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute top-0 left-0 w-full z-50">
        <Header isBgDark={true} />
      </div>

      {/* Hero Swiper */}
      <HeroSwiper />

      {/* Brand Slider Section */}
      <BrandSlider />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Events Section */}
      <EventsSection />

      {/* impact numbers */}
      <ImpactNumbersSection />

      {/* video cast */}
      {/* <VideoCastSection /> */}

      {/* news */}
      <NoticiasSection />
    </div>
  )
}
