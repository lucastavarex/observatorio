import publicacao1 from "@/app/assets/images/publicacao1.png";
import publicacao2 from "@/app/assets/images/publicacao2.png";
import publicacao3 from "@/app/assets/images/publicacao3.png";
import { Header } from "@/components/header";
import Image from "next/image";

export default function Publicacoes() {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 md:py-8">
        {/* Título e linha com quadrado */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-semibold text-black leading-none">
              Conhecimento
            </h2>
            <p className="text-4xl text-gray-400 leading-none">que gera impacto</p>
          </div>
          <div className="flex-grow mx-4 border-t border-gray-300 relative">
            <div className="absolute -top-[6px] right-0 w-3 h-3 bg-green-800" />
          </div>
        </div>

        {/* Grid centralizado */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Card 1 */}
          <div className="flex flex-col items-start text-left max-w-[300px]">
            <Image
              src={publicacao1}
              alt="Guia de Eletromobilidade"
              width={300}
              height={400}
              className="rounded-md"
            />
            <h3 className="mt-4 font-regular text-sm">Guia de Eletromobilidade para Cidades Brasileiras</h3>
            <p className="text-xs text-gray-600 mt-2">
              Este Guia foi elaborado pelo Núcleo de Mobilidade Urbana do Centro de Estudos das
              Cidades – Laboratório Arq.Futuro do Insper, com apoio e cooperação técnica do Itaú Unibanco.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-start text-left max-w-[300px]">
            <Image
              src={publicacao2}
              alt="Guia de Mobilidade Humana"
              width={300}
              height={400}
              className="rounded-md"
            />
            <h3 className="mt-4 font-regular text-sm">Guia de Mobilidade Humana</h3>
            <p className="text-xs text-gray-600 mt-2">
              O Guia de Mobilidade Humana tem o propósito de fornecer orientação prática a partir
              de referências relevantes baseadas em dados e evidências, experiências de gestão no setor da
              mobilidade e na literatura disponível.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-start text-left max-w-[300px]">
            <Image
              src={publicacao3}
              alt="Mobilidade Humana"
              width={300}
              height={400}
              className="rounded-md"
            />
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
