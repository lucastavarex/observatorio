"use client"

import catalogo from "@/app/assets/images/catalogo.png"
import dashboard from "@/app/assets/images/dashboard.png"
import geoportal from "@/app/assets/images/geoportal.png"
import tabela from "@/app/assets/images/tabela.png"
import Image from 'next/image'
import Link from 'next/link'
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
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Compare cidades em diferentes variáveis de mobilidade com visualização gráfica em formato de radar e de distribuição',
    image: dashboard,
    href: '/projetos/dashboard'
  },
  {
    id: 'geoportal',
    title: 'Geoportal',
    description: 'Visualize dados espaciais de mobilidade urbana em um mapa interativo com diversas camadas temáticas',
    image: geoportal,
    href: '/projetos/geoportal'
  },
  {
    id: 'catalogo',
    title: 'Catálogo de Dados',
    description: 'Compare indicadores de mobilidade entre cidades brasileiras por meio de uma tabela interativa',
    image: catalogo,
    href: '/projetos/catalago-de-dados'
  },
  {
    id: 'tabela',
    title: 'Tabela',
    description: 'Compare indicadores de mobilidade entre cidades brasileiras',
    image: tabela,
    href: '/projetos/tabela'
  }
]

export function ProjectsSection() {
  return (
    <section className="py-8 mx-auto bg-[#f9f9f6]">
      <div className="mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl px-4 2xl:px-16 font-medium text-gray-900 mb-6">
          Projetos
        </h2>

        {/* Projects Horizontal Scroll */}
        <div className="px-4 2xl:px-16 pb-4 overflow-x-hidden">
          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            freeMode={true}
            grabCursor={true}
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
                  <div className="bg-[#ECECEC] rounded-lg p-6 h-[400px] md:h-[550px] flex items-center justify-center">
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
  )
}