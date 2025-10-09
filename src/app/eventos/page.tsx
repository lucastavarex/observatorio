import { Header } from "@/components/header";
import { getAllEvents } from "@/lib/data/events";
import Image from "next/image";

export default function Eventos() {
  const eventsData = getAllEvents().filter((event) => !event.isTransmitted)
  const eventsDataTransmitted = getAllEvents().filter((event) => event.isTransmitted)

  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 py-20 pb-30">
        {/* Título e linha com quadrado */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-medium leading-none">
              Onde divulgamos
            </h2>
            <p className="text-4xl text-gray-400 leading-none font-medium">nosso trabalho</p>
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
          <div className="hidden md:block w-4 h-4 bg-[#C2181A]" />
        </div>

        {/* Cards com espaçamento fixo e quebra automática */}
        <div className="flex flex-wrap gap-6 justify-center xl:justify-start">
          {eventsData.map((event) => (
            <div key={event.id} className="flex flex-col items-start text-left w-[320px] group">
              {event.href ? (
                <a
                  href={event.href}
                  target={event.href.startsWith('http') ? '_blank' : '_self'}
                  rel={event.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block w-full"
                >
                  <div className="relative overflow-hidden h-[380px] w-[320px] cursor-pointer">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      sizes="320px"
                    />
                  </div>
                </a>
              ) : (
                <div className="relative overflow-hidden h-[380px] w-[320px]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="320px"
                  />
                </div>
              )}
              <h3 className="mt-4 text-sm font-medium">{event.title}</h3>
              <p className="text-xs text-gray-600 mt-2">{event.date} • {event.location}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 2xl:px-16 py-20 pb-30">
        {/* Título e linha com quadrado */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-medium leading-none">
              Eventos 
            </h2>
            <p className="text-4xl text-gray-400 leading-none font-medium">Transmitidos</p>
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
          <div className="hidden md:block w-4 h-4 bg-[#C2181A]" />
        </div>

        {/* Grid responsivo com tamanhos fixos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsDataTransmitted.map((event) => (
            <div key={event.id} className="flex flex-col items-start text-left group">
              {event.href ? (
                <a
                  href={event.href}
                  target={event.href.startsWith('http') ? '_blank' : '_self'}
                  rel={event.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block w-full"
                >
                  <div className="relative overflow-hidden w-full aspect-[7/4] cursor-pointer">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </a>
              ) : (
                <div className="relative overflow-hidden w-full aspect-[7/4]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <h3 className="mt-4 text-sm font-medium line-clamp-2">{event.title}</h3>
              <p className="text-xs text-gray-600 mt-2">{event.date} • {event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
