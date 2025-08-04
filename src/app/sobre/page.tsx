"use client"
import { Header } from "@/components/header";

import pessoa1 from "@/app/assets/images/pessoa1.png";
import pessoa2 from "@/app/assets/images/pessoa2.png";
import pessoa3 from "@/app/assets/images/pessoa3.png";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

interface Events {
  id: string
  title: string
  description: string
  image: typeof pessoa1
  email: string
}

const events: Events[] = [
  {
    id: 'pessoa1',
    title: 'Sérgio Avelleda ',
    description: 'Coordenador',
    image: pessoa1,
    email: 'sergio.avelleda@insper.edu.br'
  },
  {
    id: 'pessoa2',
    title: 'Helena Coelho ',
    description: 'Coordenadora-adjunta',
    image: pessoa2,
    email: 'helena.coelho@insper.edu.br'
  },
  {
    id: 'pessoa3',
    title: 'Maína Campos',
    description: 'Consultora',
    image: pessoa3,
    email: 'maina.campos@insper.edu.br'
  },
  {
    id: 'pessoa4',
    title: 'Sérgio Avelleda ',
    description: 'Coordenador',
    image: pessoa1,
    email: 'sergio.avelleda@insper.edu.br'
  },
  {
    id: 'pessoa5',
    title: 'Helena Coelho ',
    description: 'Coordenadora-adjunta',
    image: pessoa2,
    email: 'helena.coelho@insper.edu.br'
  },
]

export default function Sobre() {
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
    <div>
      <Header />
      <div className="flex justify-end px-4 2xl:px-16 md:py-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium max-w-2xl text-right">
          Conheça as pessoas que <br /> lideram esses projetos
        </h1>
      </div>
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

      <section className="py-16 mx-auto">
        <div className="h-[1.5px] w-[90%] bg-gray-200 mx-auto mb-10"></div>
        <div className="mx-auto">
          {/* Events Horizontal Scroll */}
          <div 
            className="px-4 2xl:px-16 pb-4 overflow-x-hidden pl-4! md:pl-60! lg:pl-100!"
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
              {events.map((event) => (
                <SwiperSlide key={event.id} className="!w-[250px] md:!w-[350px] group relative ">
                  {/* Event Card */}
                  <div className="relative overflow-hidden rounded-lg h-[350px] w-[250px] md:h-[450px] md:w-[350px]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                                     {/* Event Info - Outside the card */}
                   <div className="mt-4 text-left">
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                       {event.title}
                     </h3>
                     <p className="text-sm text-gray-600 leading-relaxed">
                       {event.description}
                     </p>
                     <p className="text-sm text-gray-500 mt-6">
                       {event.email}
                     </p>
                   </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}