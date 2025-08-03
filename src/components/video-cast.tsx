"use client"

import videocast1 from "@/app/assets/images/videocast1.png"
import videocast2 from "@/app/assets/images/videocast2.png"
import videocast3 from "@/app/assets/images/videocast3.png"
import videocast4 from "@/app/assets/images/videocast4.png"
import videocast5 from "@/app/assets/images/videocast5.png"
import Image from 'next/image'
import Link from 'next/link'

interface VideoCast {
  id: string
  title: string
  description: string
  image: typeof videocast1
  href: string
}

const videoCast: VideoCast[] = [
  {
    id: 'event1',
    title: 'Soluções baseadas na natureza e mobilidade urbana',
    description: 'Sexta da Mobilidade',
    image: videocast1,
    href: '/projetos/dashboard'
  },
  {
    id: 'event2',
    title: 'Apresentação do Observatório Nac. de Mobilidade Sustentável para a comunidade do Rio de Janeiro ',
    description: 'Sexta da Mobilidade',
    image: videocast2,
    href: '/projetos/geoportal'
  },
  {
    id: 'event3',
    title: 'Gestão metropolitana: desafios e oportunidades',
    description: 'Sexta da Mobilidade',
    image: videocast3,
    href: '/projetos/catalago-de-dados'
  },
  {
    id: 'event4',
    title: 'Lançamento do guia de eletromobilidade',
    description: 'Sexta da Mobilidade',
    image: videocast4,
    href: '/projetos/tabela'
  },
  {
    id: 'event5',
    title: 'Soluções baseadas na natureza e mobilidade urbana',
    description: 'Sexta da Mobilidade',
    image: videocast5,
    href: '/projetos/tabela'
  },
]

export function VideoCastSection() {
 

  return (
    <section className="py-16 mx-auto bg-[#f9f9f6]">
      <div className="mx-auto">
        <Link href="/eventos">
        <h5 className="text-[#2F2C2C] text-sm px-4 2xl:px-16">Ver mais</h5>
        </Link>
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl px-4 2xl:px-16 font-bold text-gray-900 mb-12">
          VídeoCast
        </h2>

        {/* Projects Horizontal Scroll */}
        <div 
          className="flex gap-4 overflow-x-auto px-4 2xl:px-16  scrollbar-hide pb-4 cursor-grab active:cursor-grabbing"
        >
          {videoCast.map((video) => (
            <div key={video.id} className="group relative ">
              <Link
                href={video.href}
                className="block"
              >
                {/* Project Card */}
                <div className="relative overflow-hidden rounded-lg h-[350px] w-[250px] md:h-[450px] md:w-[350px]">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Project Info - Outside the card */}
              <div className="mt-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {video.description}
                </p>
              </div>

             
            </div>
          ))}
        </div>
      </div>
    
    </section>
  )
}
