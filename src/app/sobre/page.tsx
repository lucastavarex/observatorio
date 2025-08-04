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
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />
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

      {/* About Section */}
      <section className="py-16 px-4 2xl:px-16">
        <div className="mx-auto">
          {/* Origem Section */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-16 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-medium text-gray-900">Origem</h2>
            </div>
            <div className="lg:col-span-4">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Um evento realizado no Insper, em São Paulo, marcou o lançamento do Observatório Nacional de Mobilidade Sustentável, em setembro de 2023.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Trata-se de uma iniciativa do Centro de Estudos das Cidades - Laboratório Arq. Futuro do Insper - então chamado Laboratório Arq. Futuro de Cidades do Insper -, no âmbito do seu núcleo de Mobilidade Urbana, em parceria com o Grupo CCR, cujo objetivo é coletar dados de fontes públicas e privadas, gerenciando essas informações e produzindo pesquisas, artigos e reportes consistentes, que sejam úteis para os tomadores decisão do ecossistema de mobilidade no território nacional.
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Separator */}
          <div className="h-[1px] w-full bg-gray-200 mb-12"></div>

          {/* Missão Section */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-16 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-medium text-gray-900">Missão</h2>
            </div>
            <div className="lg:col-span-4">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  A missão primordial do Observatório é prover o setor e os tomadores de decisão de um banco de dados robusto acerca dos sistemas de mobilidade urbana nas maiores cidades do país.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Além disso, o Observatório Nacional de Mobilidade Urbana tem o compromisso de entregar para a sociedade como um todo estudos baseados em dados e evidências, propiciando uma melhora no processo de gestão da área no Brasil.
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Separator */}
          <div className="h-[1px] w-full bg-gray-200 mb-12"></div>

          {/* Objetivos Section */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-medium text-gray-900">Objetivos</h2>
            </div>
            <div className="lg:col-span-4">
              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-6 text-gray-700 leading-relaxed">
                  <li>Consolidar dados do transporte público, segurança viária, emissões e eficiência da logística urbana nas principais cidades brasileiras;</li>
                  <li>Tratar esses dados para a formação de índices de mobilidade urbana;</li>
                  <li>Publicar os dados, com análise acadêmica, incrementando a pesquisa da mobilidade urbana no território nacional; </li>
                  <li>Servir de referência para tomadores de decisão;</li>
                  <li>Monitorar políticas públicas na área de mobilidade urbana, publicando análises quantitativas e qualitativas que permitam uma reflexão baseada em evidências sobre os seus impactos; </li>
                  <li>Organizar eventos periódicos para debates e divulgação dos produtos elaborados a partir de estudos e pesquisas;</li>
                  <li>Promover cursos de educação executiva e disciplinas eletivas para as turmas de graduação frutos da gestão e análise dos dados coletados;</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

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
           <h2 className="lg:absolute text-xl font-medium text-gray-900 px-4 2xl:px-16 pb-6 lg:pb-0">Conselho gestor</h2>
          <div 
            className="px-4 2xl:px-16 pb-4 overflow-x-hidden ml-0! pl-4! md:ml-0! lg:ml-100!"
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