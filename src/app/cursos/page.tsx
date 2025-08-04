"use client";

import curso1 from "@/app/assets/images/curso1.png";
import curso2 from "@/app/assets/images/curso2.png";
import { Header } from "@/components/header";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Eventos() {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 py-20 pb-30">
        {/* Título e linha com quadrado */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-medium leading-none">Nosso lugar</h2>
            <p className="text-4xl text-gray-400 leading-none font-medium">de ensinar</p>
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
          <div className="hidden md:block w-4 h-4 bg-[#F7A703]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Card 1 */}
          <div className="relative rounded-xl overflow-hidden group h-[400px]">
            <Image
              src={curso1}
              alt="Cidades Inteligentes"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-semibold leading-snug">
                Gestão da Mobilidade Urbana: Uma via para Cidades Inteligentes e Sustentáveis
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                Como avançar com soluções inovadoras alinhadas a diferentes contextos urbanos?
              </p>
              <div className="absolute bottom-4 right-4">
                <ArrowRight className="text-white" size={20} />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-xl overflow-hidden group h-[400px]">
            <Image
              src={curso2}
              alt="Financiamento do Transporte Público"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-semibold leading-snug">
                Gestão da Mobilidade Urbana: Financiamento do Transporte Público
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                Como usar a economia do transporte para recuperar a qualidade e a demanda no transporte público
              </p>
              <div className="absolute bottom-4 right-4">
                <ArrowRight className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
