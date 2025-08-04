"use client"

import video1 from "@/app/assets/images/video1.png"
import video2 from "@/app/assets/images/video2.png"
import video3 from "@/app/assets/images/video3.png"
import video4 from "@/app/assets/images/video4.png"
import video5 from "@/app/assets/images/video5.png"
import { Header } from "@/components/header"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

interface NewsItem {
  id: number
  title: string
  source: string
  date: string
  image: typeof video1
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Grupo CCR e Laboratório Arq. Futuro de Cidades lançam Observatório Nacional de Mobilidade Sustentável",
    source: "Estadão",
    date: "12.03.2025",
    image: video1
  },
  {
    id: 2,
    title: "Insper e CCR lançam Observatório Nacional de Mobilidade Sustentável",
    source: "Insper",
    date: "12.03.2025",
    image: video2
  },
  {
    id: 3,
    title: "Observatório Nacional de Mobilidade Sustentável firma acordo de cooperação com o Rio de Janeiro",
    source: "Technibus",
    date: "12.03.2025",
    image: video3
  },
  {
    id: 4,
    title: "Sexta da mobilidade: Soluções baseadas na natureza e mobilidade urbana: a urgência da mudança de paradigma das cidades",
    source: "Insper",
    date: "12.03.2025",
    image: video4
  },
  {
    id: 5,
    title: "Sexta da mobilidade: Dados e Mobilidade Urbana",
    source: "Insper",
    date: "12.03.2025",
    image: video5
  }
]

export default function Noticias() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    })
  }

  const handleMouseEnter = (image: string, index: number) => {
    setHoveredImage(image)
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredImage(null)
    setHoveredIndex(null)
  }

  return (
    <>
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 py-20 pb-10">
        {/* Título e linha com quadrado */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-medium leading-none">
              Nossas histórias
            </h2>
            <p className="text-4xl text-gray-400 leading-none font-medium">sobre mobilidade</p>
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
          <div className="hidden md:block w-4 h-4 bg-[#779854]" />
        </div>
      </div>
    </div>
     <div ref={containerRef} onMouseMove={handleMouseMove} className="bg-[#f9f9f6] pb-30">
          {/* Hover Image - Desktop Only */}
                   {hoveredImage && (
            <div 
              className="fixed pointer-events-none z-50 hidden md:block transition-all duration-300 ease-out"
              style={{
                left: mousePosition.x,
                top: mousePosition.y - 40,
                transform: `translate(-50%, -100%) rotate(${hoveredIndex !== null && hoveredIndex % 2 === 0 ? '-2deg' : '2deg'})`
              }}
            >
              <Image
                width={256}
                height={160}
                src={hoveredImage} 
                alt="News preview"
                className="w-86 h-60 object-cover rounded-xl shadow-lg"
              />
            </div>
          )}

        {/* News List */}
        <div className="space-y-0">
          <div className="border-t border-gray-200 mx-4 lg:mx-16" />
          {newsData.map((item, index) => (
            <div key={item.id}>
                                                           <div 
                                className="flex items-start py-8 group hover:bg-black md:hover:bg-black transition-all duration-300 cursor-pointer"
                                onMouseEnter={() => handleMouseEnter(item.image.src, index)}
                                onMouseLeave={handleMouseLeave}
                              >
                                 {/* Plus Icon */}
                 <div className="flex-shrink-0 mr-4 mt-1 px-4 lg:px-16">
                   <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                 </div>

                                 {/* News Title */}
                 <div className="flex-1 min-w-0">
                   <h3 className="text-sm md:text-base text-gray-900 group-hover:text-white leading-relaxed pr-4 transition-colors duration-300">
                     {item.title}
                   </h3>
                 </div>

                                 {/* Source and Date */}
                 <div className="flex-shrink-0 flex flex-col md:flex-row md:gap-36 text-right mx-4 lg:mx-16">
                   <p className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300">{item.source}</p>
                   <p className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300">{item.date}</p>
                 </div>
              </div>

              {/* Divider - only show if not the last item */}
              {/* {index < newsData.length - 1 && ( */}
                <div className="border-b border-gray-200 mx-4 lg:mx-16" />
              {/* )} */}
            </div>
          ))}
        </div>
        </div>
        </>
  )
}