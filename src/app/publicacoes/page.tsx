import publicacao1 from "@/app/assets/images/publicacao1.png";
import publicacao2 from "@/app/assets/images/publicacao2.png";
import publicacao3 from "@/app/assets/images/publicacao3.png";
import { Header } from "@/components/header";
import Image from "next/image";

export default function Publicacoes() {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 py-20 pb-30">
        {/* Título e linha com quadrado */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl  lg: font-medium leading-none">
              Conhecimento
            </h2>
            <p className="text-4xl text-gray-400 leading-none font-medium">que gera impacto</p>
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300"/>
          <div className="hidden md:block w-4 h-4 bg-[#779854]" />
        </div>

        {/* Grid centralizado */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-6">
          {/* Card 1 */}
          <div className="flex flex-col items-start text-left max-w-[320px] group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={publicacao1}
                alt="Guia de Eletromobilidade"
                width={320}
                height={480}
                className="rounded-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-regular text-sm">Guia de Eletromobilidade para Cidades Brasileiras</h3>
            <p className="text-xs text-gray-600 mt-2">
              Este Guia foi elaborado pelo Núcleo de Mobilidade Urbana do Centro de Estudos das
              Cidades – Laboratório Arq.Futuro do Insper, com apoio e cooperação técnica do Itaú Unibanco.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-start text-left max-w-[320px] group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={publicacao2}
                alt="Guia de Mobilidade Humana"
                width={320}
                height={480}
                className="rounded-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-regular text-sm">Guia de Mobilidade Humana</h3>
            <p className="text-xs text-gray-600 mt-2">
              O Guia de Mobilidade Humana tem o propósito de fornecer orientação prática a partir
              de referências relevantes baseadas em dados e evidências, experiências de gestão no setor da
              mobilidade e na literatura disponível.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-start text-left max-w-[320px] group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={publicacao3}
                alt="Mobilidade Humana"
                width={320}
                height={320}
                className="rounded-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-regular text-sm">Mobilidade Humana</h3>
            <p className="text-xs text-gray-600 mt-2">
              Documento para apoiar a elaboração de programas de governo com foco em mobilidade urbana
              sustentável para as eleições municipais de 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
