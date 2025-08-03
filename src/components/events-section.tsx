"use client"

import events1 from "@/app/assets/images/events1.png"
import events2 from "@/app/assets/images/events2.png"
import events3 from "@/app/assets/images/events3.png"
import events4 from "@/app/assets/images/events4.png"
import events5 from "@/app/assets/images/events5.png"
import Image from 'next/image'
import Link from 'next/link'

interface Events {
  id: string
  title: string
  description: string
  image: typeof events1
  href: string
}

const events: Events[] = [
  {
    id: 'event1',
    title: 'Lançamento do Observatório Nacional de Mobilidade Sustentável ',
    description: '2023 • Insper',
    image: events1,
    href: '/projetos/dashboard'
  },
  {
    id: 'event2',
    title: 'Climate Resiliency and Low-carbon Accessibility Seminar',
    description: '2023 • Insper',
    image: events2,
    href: '/projetos/geoportal'
  },
  {
    id: 'event3',
    title: 'Evento realizado pelo Banco de Desenvolvimento da Am.Latina e Caribe/CAF e pelo Banco Interamericano de Desenvolvimento/BID ',
    description: '2023 • Medellin',
    image: events3,
    href: '/projetos/catalago-de-dados'
  },
  {
    id: 'event4',
    title: 'Apresentação do Observatório Nac. de Mobilidade Sustentável para a comunidade do Rio de Janeiro ',
    description: '2023 • Museu do Amanhã',
    image: events4,
    href: '/projetos/tabela'
  },
  {
    id: 'event5',
    title: 'Gestão metropolitana: desafios e oportunidades',
    description: '2023 • Insper',
    image: events5,
    href: '/projetos/tabela'
  },
]

export function EventsSection() {
 

  return (
    <section className="py-16 mx-auto bg-[#f9f9f6]">
      <div className="mx-auto">
        <Link href="/eventos">
        <h5 className="text-[#2F2C2C] text-sm px-4 2xl:px-16">Ver mais</h5>
        </Link>
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl px-4 2xl:px-16 font-bold text-gray-900 mb-12">
          Eventos
        </h2>

        {/* Projects Horizontal Scroll */}
        <div 
          className="flex gap-4 overflow-x-auto px-4 2xl:px-16  scrollbar-hide pb-4 cursor-grab active:cursor-grabbing"
        >
          {events.map((event) => (
            <div key={event.id} className="group relative ">
              <Link
                href={event.href}
                className="block"
              >
                {/* Project Card */}
                <div className="relative overflow-hidden rounded-lg h-[350px] w-[250px] md:h-[450px] md:w-[350px]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Project Info - Outside the card */}
              <div className="mt-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>

             
            </div>
          ))}
        </div>
      </div>
    
    </section>
  )
}
