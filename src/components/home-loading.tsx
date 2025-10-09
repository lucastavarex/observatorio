"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface HomeLoadingProps {
  onLoadingComplete: () => void
}

export function HomeLoading({ onLoadingComplete }: HomeLoadingProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Preload critical home page images while loading is shown
    const preloadImages = [
      "/videos/video1.mp4",
      "/videos/video2.mp4", 
      "/videos/video3.mp4",
      "/videos/video4.mp4"
    ]

    // Start preloading images
    preloadImages.forEach(src => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.src = src
    })

    // Ensure loading lasts at least 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      onLoadingComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <div className="relative">
        <Image
          src="/logo-preto.png"
          alt="Observatório Nacional de Mobilidade Sustentável"
          width={600}
          height={200}
          className="object-contain animate-pulse"
          priority
        />
      </div>
    </div>
  )
}
