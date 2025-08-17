"use client"

import catalogo from "@/app/assets/images/catalogo.png"
import dashboard from "@/app/assets/images/dashboard.png"
import geoportal from "@/app/assets/images/geoportal.png"
import tabela from "@/app/assets/images/tabela.png"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'

interface Project {
  id: string
  title: string
  description: string
  image: typeof dashboard
  href: string
}

const projects: Project[] = [
    {
    id: 'geoportal',
    title: 'Geoportal',
    description: 'Visualize dados espaciais de mobilidade urbana em um mapa interativo com diversas camadas temáticas',
    image: geoportal,
    href: '/'
  },
    {
    id: 'catalogo',
    title: 'Catálogo de Dados',
    description: 'Compare indicadores de mobilidade entre cidades brasileiras por meio de uma tabela interativa',
    image: catalogo,
    href: '/projetos/catalago-de-dados'
  },
  {
    id: 'dashboard',
    title: 'Dashboard PEMOB',
    description: 'Compare cidades em diferentes variáveis de mobilidade com visualização gráfica em formato de radar e de distribuição',
    image: dashboard,
    href: '/projetos/dashboard'
  },
  {
    id: 'tabela',
    title: 'Dados PEMOB',
    description: 'Compare indicadores de mobilidade entre cidades brasileiras',
    image: tabela,
    href: '/projetos/tabela'
  }
]

export function ProjectsSection() {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div
        className={`fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      >
        <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-xs font-medium">Arraste</span>
        </div>
      </div>

      <section className="py-8 mx-auto bg-[#f9f9f6]">
        <div className="mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl px-4 2xl:px-16 font-medium text-gray-900 mb-6">
            Mobilidade em dados
          </h2>

          {/* Projects Horizontal Scroll */}
          <div 
            className="px-4 2xl:px-16 pb-4 overflow-x-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Swiper
              slidesPerView="auto"
              spaceBetween={16}
              freeMode={true}
              grabCursor={false} // Disable default grab cursor
              modules={[FreeMode]}
              className="!overflow-visible"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id} className="!w-[300px] md:!w-[450px] group relative">
                  <Link
                    href={project.href}
                    className="block"
                  >
                    {/* Project Card */}
                    <div className="bg-[#ECECEC] rounded-lg p-6 h-[250px] md:h-[350px] flex items-center justify-center">
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-md bg-white shadow-sm w-full">
                        <div className="aspect-video relative">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Project Info - Outside the card */}
                  <div className="mt-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}