"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
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
    title: "1-Mobilidade inteligente para um Brasil mais conectado e sustentável",
    subtitle: "Indicadores e evidências para transformar a mobilidade urbana brasileira"
  },
  {
    id: 2,
    videoSrc: "https://res.cloudinary.com/doueg88fj/video/upload/v1754231467/cover1_aaerv0.mp4",
    imageSrc: "/images/transportation.jpg",
    title: "2-Mobilidade inteligente para um Brasil mais conectado e sustentável",
    subtitle: "Indicadores e evidências para transformar a mobilidade urbana brasileira"
  },
  {
    id: 3,
    videoSrc: "https://res.cloudinary.com/doueg88fj/video/upload/v1754231467/cover1_aaerv0.mp4",
    imageSrc: "/images/sustainable-city.jpg",
    title: "3-Mobilidade inteligente para um Brasil mais conectado e sustentável",
    subtitle: "Indicadores e evidências para transformar a mobilidade urbana brasileira"
  }
]

export function HeroSwiper() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const swiperRef = useRef<{ swiper: SwiperType }>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    // Handle loop properly by using realIndex instead of activeIndex
    setActiveIndex(swiper.realIndex)
    setProgress(0) // Reset progress when slide changes
    
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    // Start progress animation
    const startTime = Date.now()
    const duration = 5000 // 5 seconds
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)
      
      if (newProgress >= 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
      }
    }, 16) // ~60fps
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

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  return (
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
        speed={1000}
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
                   <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white max-w-2xl leading-tight mb-4">
                     {slide.title}
                   </h1>
                   
                   <p className="text-md md:text-xl text-white/90 leading-relaxed mb-6">
                     {slide.subtitle}
                   </p>
                   
                                       {/* Progress Bar and Navigation Controls - Mobile/Tablet */}
                    <div className="lg:hidden">
                      {/* Progress Bar Indicators */}
                      <div className="flex items-center gap-2 mb-4">
                        {slides.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              if (swiperRef.current) {
                                swiperRef.current.swiper.slideTo(index)
                              }
                            }}
                            className="w-16 h-1 bg-white/20 hover:bg-white/30 transition-all duration-300 relative overflow-hidden"
                            aria-label={`Go to slide ${index + 1}`}
                          >
                            <div 
                              className={`h-full transition-all duration-75 ease-linear ${
                                index === activeIndex 
                                  ? 'bg-white/90' 
                                  : 'bg-white/20'
                              }`}
                              style={{
                                width: index === activeIndex ? `${progress}%` : '0%'
                              }}
                            />
                          </button>
                        ))}
                      </div>
                      
                      {/* Navigation Controls */}
                      <div className="flex items-center gap-4">
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
                    </div>
                 </div>
               </div>
             </div>
          </SwiperSlide>
        ))}
      </Swiper>

             {/* Progress Bar and Navigation Controls - Desktop */}
       <div className="absolute bottom-8 left-0 right-0 z-20 px-4 2xl:px-16 hidden lg:block">
         <div className="flex items-center justify-between">
           {/* Progress Bar Indicators */}
           <div className="flex items-center gap-2">
             {slides.map((_, index) => (
               <button
                 key={index}
                 onClick={() => {
                   if (swiperRef.current) {
                     swiperRef.current.swiper.slideTo(index)
                   }
                 }}
                 className="w-16 h-1 bg-white/20 hover:bg-white/30 transition-all duration-300 relative overflow-hidden"
                 aria-label={`Go to slide ${index + 1}`}
               >
                 <div 
                   className={`h-full transition-all duration-75 ease-linear ${
                     index === activeIndex 
                       ? 'bg-white/90' 
                       : 'bg-white/20'
                   }`}
                   style={{
                     width: index === activeIndex ? `${progress}%` : '0%'
                   }}
                 />
               </button>
             ))}
           </div>
           
           {/* Navigation Controls */}
           <div className="flex items-center gap-4">
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
         </div>
       </div>


    </section>
  )
} 