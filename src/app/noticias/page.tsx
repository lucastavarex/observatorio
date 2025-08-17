"use client"

import video1 from "@/app/assets/images/video1.png"
import video3 from "@/app/assets/images/video3.png"
import video4 from "@/app/assets/images/video4.png"
import video5 from "@/app/assets/images/video5.png"
import video6 from "@/app/assets/images/video6.png"
import video7 from "@/app/assets/images/video7.png"
import video8 from "@/app/assets/images/video8.png"
import { Header } from "@/components/header"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

interface NewsItem {
  id: number
  title: string
  source: string
  date: string
  image: typeof video1,
  link: string
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Grupo CCR e Laboratório Arq. Futuro de Cidades lançam Observatório Nacional de Mobilidade Sustentável",
    source: "Estadão",
    date: "2023",
    image: video1,
    link: "https://mobilidade.estadao.com.br/mobilidade-para-que/grupo-ccr-e-laboratorio-arq-futuro-de-cidades-lancam-observatorio-nacional-de-mobilidade-sustentavel"
  },
  // {
  //   id: 2,
  //   title: "Insper e CCR lançam Observatório Nacional de Mobilidade Sustentável",
  //   source: "Insper",
  //   date: "12.03.2025",
  //   image: video2
  //   link: "https://www.insper.edu.br/noticias/insper-e-ccr-lancam-observatorio-nacional-de-mobilidade-sustentavel/"
  // },
  {
    id: 3,
    title: "Observatório Nacional de Mobilidade Sustentável firma acordo de cooperação com o Rio de Janeiro",
    source: "Technibus",
    date: "2025",
    image: video3,
    link: "https://technibus.com.br/2025/02/19/observatorio-nacional-de-mobilidade-sustentavel-firma-acordo-de-cooperacao-com-o-rio-de-janeiro/"
  },
  {
    id: 4,
    title: "Sexta da mobilidade: Soluções baseadas na natureza e mobilidade urbana: a urgência da mudança de paradigma das cidades",
    source: "Insper",
    date: "2024",
    image: video4,
    link: "https://www.insper.edu.br/pt/eventos/2024/08/sexta-da-mobilidade-solucoes-baseadas-na-natureza-e-mobilidade-urbana-a-urgencia-da-mudanca-de-paradigma-das-cidades"
  },
  {
    id: 5,
    title: "Sexta da mobilidade: Dados e Mobilidade Urbana",
    source: "Insper",
    date: "2024",
    image: video5,
    link: "https://www.insper.edu.br/pt/eventos/2024/10/sexta-da-mobilidade-dados-e-mobilidade-urbana"
  },
  {
    id: 6,
    title: "Sexta da Mobilidade: Soluções Brasileiras para o Futuro da Mobilidade, o Caso do Aeromóvel",
    source: "Insper",
    date: "2024",
    image: video6,
    link: "https://www.insper.edu.br/pt/eventos/2024/11/sexta-da-mobilidade-solucoes-brasileiras-para-o-futuro-da-mobilidade-o-caso-do-aeromovel?utm_content=316378986&utm_medium=social&utm_source=facebook&hss_channel=fbp-120253158027896"
  },
  {
    id: 7,
    title: "Evento de Lançamento do Guia de Eletromobilidade para Cidades Brasileiras",
    source: "Insper",
    date: "2024",
    image: video7,
    link: "https://www.insper.edu.br/pt/eventos/2024/09/mobilidade-sustentavel-na-agenda-da-cop-30-impactos-no-meio-ambiente-e-mudanca-climatica"
  },
  {
    id: 8,
    title: "Agenda da descarbonização pode ser melhor",
    source: "ABOL",
    date: "2025",
    image: video8,
    link: "https://abolbrasil.org.br/noticias/noticias-do-setor/agenda-da-descarbonizacao-pode-ser-melhor"
  },
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
              Clipping
            </h2>
           
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
                                onClick={() => window.open(item.link, '_blank')}
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