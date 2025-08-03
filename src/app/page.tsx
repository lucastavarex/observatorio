"use client"

import { Header } from "@/components/header"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"
import type { Swiper as SwiperType } from "swiper"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"


interface SlideData {
  id: number
  videoSrc?: string
  imageSrc?: string
  title: string
  subtitle: string
}

const slides: SlideData[] = [
  {
    id: 1,
    videoSrc: "https://res.cloudinary.com/doueg88fj/video/upload/v1754231467/cover1_aaerv0.mp4",
    imageSrc: "/images/city-aerial.jpg",
    title: "Mobilidade inteligente para um Brasil mais conectado e sustentável",
    subtitle: "Conectando pessoas e lugares de forma responsável"
  },
  {
    id: 2,
    videoSrc: "https://res.cloudinary.com/doueg88fj/video/upload/v1754231467/cover1_aaerv0.mp4",
    imageSrc: "/images/transportation.jpg",
    title: "Mobilidade inteligente para um Brasil mais conectado e sustentável",
    subtitle: "Conectando pessoas e lugares de forma responsável"
  },
  {
    id: 3,
    videoSrc: "https://res.cloudinary.com/doueg88fj/video/upload/v1754231467/cover1_aaerv0.mp4",
    imageSrc: "/images/sustainable-city.jpg",
    title: "Mobilidade inteligente para um Brasil mais conectado e sustentável",
    subtitle: "Conectando pessoas e lugares de forma responsável"
  }
]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<{ swiper: SwiperType }>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
  }

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext()
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute top-0 left-0 w-full z-50">
        <Header isBgDark={true} />
      </div>
      {/* Hero Swiper Section */}
      <section className="relative h-screen overflow-hidden">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={handleSlideChange}
          className="h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative">
              {/* Video/Image Background */}
              <div className="absolute inset-0">
                {slide.videoSrc ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to image if video fails to load
                      const target = e.target as HTMLVideoElement
                      target.style.display = 'none'
                      const fallback = target.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'block'
                    }}
                  >
                    <source src={slide.videoSrc} type="video/mp4" />
                  </video>
                ) : null}
                
                {/* Fallback Image Background */}
                <div 
                  className={`w-full h-full bg-cover bg-center ${
                    slide.videoSrc ? 'hidden' : 'block'
                  }`}
                  style={{
                    backgroundImage: slide.imageSrc 
                      ? `url(${slide.imageSrc})` 
                      : 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)'
                  }}
                />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-end h-full pb-20 px-4 2xl:px-16">
                <div className="max-w-4xl">
                  <div>
                    <h1 className="text-1xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
          <button
            onClick={handlePrevSlide}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={handleNextSlide}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.swiper.slideTo(index)
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? "bg-white scale-125" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
