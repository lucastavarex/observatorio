"use client"

import publicacao1 from "@/app/assets/images/publicacao1.png";
import publicacao2 from "@/app/assets/images/publicacao2.png";
import publicacao3 from "@/app/assets/images/publicacao3.png";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define publication types
interface Publication {
  id: string;
  title: string;
  description: string;
  image: typeof publicacao1 | typeof publicacao2 | typeof publicacao3;
  alt: string;
  tipo: "livros" | "artigos" | "notas";
}

const publications: Publication[] = [
  {
    id: "1",
    title: "Guia de Eletromobilidade para Cidades Brasileiras",
    description: "Este Guia foi elaborado pelo Núcleo de Mobilidade Urbana do Centro de Estudos das Cidades – Laboratório Arq.Futuro do Insper, com apoio e cooperação técnica do Itaú Unibanco.",
    image: publicacao1,
    alt: "Guia de Eletromobilidade",
    tipo: "livros"
  },
  {
    id: "2",
    title: "Guia de Mobilidade Humana",
    description: "O Guia de Mobilidade Humana tem o propósito de fornecer orientação prática a partir de referências relevantes baseadas em dados e evidências, experiências de gestão no setor da mobilidade e na literatura disponível.",
    image: publicacao2,
    alt: "Guia de Mobilidade Humana",
    tipo: "livros"
  },
  {
    id: "3",
    title: "Mobilidade Humana",
    description: "Documento para apoiar a elaboração de programas de governo com foco em mobilidade urbana sustentável para as eleições municipais de 2024.",
    image: publicacao3,
    alt: "Mobilidade Humana",
    tipo: "notas"
  },
  {
    id: "4",
    title: "Análise de Indicadores de Mobilidade Urbana",
    description: "Estudo comparativo dos indicadores de mobilidade urbana entre diferentes cidades brasileiras, com foco em sustentabilidade e eficiência.",
    image: publicacao3,
    alt: "Análise de Indicadores",
    tipo: "artigos"
  },
  {
    id: "5",
    title: "Políticas Públicas para Mobilidade Sustentável",
    description: "Revisão das políticas públicas implementadas em cidades brasileiras para promoção da mobilidade sustentável e redução de emissões.",
    image: publicacao3,
    alt: "Políticas Públicas",
    tipo: "artigos"
  }
];

export default function Publicacoes() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>("todos");

  // Get the tipo parameter from URL
  const tipoFromUrl = searchParams.get("tipo");

  useEffect(() => {
    if (tipoFromUrl) {
      setActiveFilter(tipoFromUrl);
    }
  }, [tipoFromUrl]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "todos") {
      router.push("/publicacoes");
    } else {
      router.push(`/publicacoes?tipo=${filter}`);
    }
  };

  // Filter publications based on active filter
  const filteredPublications = activeFilter === "todos" 
    ? publications 
    : publications.filter(pub => pub.tipo === activeFilter);

  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 py-20 pb-30">
        {/* Título e linha com quadrado */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl  lg: font-medium leading-none">
              Conhecimento
            </h2>
            <p className="text-4xl text-gray-400 leading-none font-medium">que gera impacto</p>
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300"/>
          <div className="hidden md:block w-4 h-4 bg-[#779854]" />
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-left md:justify-start gap-4 md:gap-4 pb-4">
          <Button 
            variant="secondary"
            onClick={() => handleFilterClick("todos")}
            className={`${activeFilter === "todos" ?  'bg-[#EAEAEA] text-black hover:bg-[#EAEAEA]' : 'text-black/40 hover:text-black hover:bg-[#EAEAEA]'}`}
          >
            Todos
          </Button>
          <Button 
            variant="secondary"
            onClick={() => handleFilterClick("livros")}
            className={`${activeFilter === "livros" ?  'bg-[#EAEAEA] text-black hover:bg-[#EAEAEA]' : 'text-black/40 hover:text-black hover:bg-[#EAEAEA]'}`}
          >
            Livros
          </Button>
          <Button 
            variant="secondary"
            onClick={() => handleFilterClick("artigos")}
            className={`${activeFilter === "artigos" ?  'bg-[#EAEAEA] text-black hover:bg-[#EAEAEA]' : 'text-black/40 hover:text-black hover:bg-[#EAEAEA]'}`}
          >
            Artigos científicos
          </Button>
          <Button 
            variant="secondary"
            onClick={() => handleFilterClick("notas")}
            className={`${activeFilter === "notas" ? 'bg-[#EAEAEA] text-black hover:bg-[#EAEAEA]' : 'text-black/40 hover:text-black hover:bg-[#EAEAEA]'}`}
          >
            Notas técnicas
          </Button>
        </div>

        {/* Publications Grid */}
        <div className="flex flex-wrap justify-center md:justify-start gap-10 md:gap-6">
          {filteredPublications.map((publication) => (
            <div key={publication.id} className="flex flex-col items-start text-left max-w-[320px] group">
              <div className="relative overflow-hidden rounded-md">
                <Image
                  src={publication.image}
                  alt={publication.alt}
                  width={320}
                  height={480}
                  className="rounded-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-regular text-sm">{publication.title}</h3>
              <p className="text-xs text-gray-600 mt-2">
                {publication.description}
              </p>
            </div>
          ))}
        </div>

        {/* Show message when no publications match the filter */}
        {filteredPublications.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhuma publicação encontrada para o filtro selecionado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
