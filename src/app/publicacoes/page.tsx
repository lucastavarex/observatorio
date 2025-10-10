"use client"

import publi_princ_conc from "@/app/assets/images/publi_princ_conc.png";
import publicacao1 from "@/app/assets/images/publicacao1.png";
import publicacao2 from "@/app/assets/images/publicacao2.png";
import publicacao3 from "@/app/assets/images/publicacao3.png";
import publicacao4 from "@/app/assets/images/publicacao4.png";
import publicacao5 from "@/app/assets/images/publicacao5.png";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define publication types
interface Publication {
  id: string;
  title: string;
  description?: string;
  image: typeof publicacao1 | typeof publicacao2 | typeof publicacao3;
  alt: string;
  tipo: "livros" | "policy_paper" | "notas";
  link?: string;
}

const publications: Publication[] = [
  {
    id: "1",
    title: "Guia de Eletromobilidade para Cidades Brasileiras",
    description: "Este Guia foi elaborado pelo Núcleo de Mobilidade Urbana do Centro de Estudos das Cidades – Laboratório Arq.Futuro do Insper, com apoio e cooperação técnica do Itaú Unibanco.",
    image: publicacao1,
    alt: "Guia de Eletromobilidade",
    tipo: "livros",
    link: "https://repositorio-api.insper.edu.br/server/api/core/bitstreams/72e76cf4-e9b7-4a57-a9c5-2441c178db7c/content"
  },
  {
    id: "2",
    title: "Guia de Mobilidade Humana",
    description: "O Guia de Mobilidade Humana tem o propósito de fornecer orientação prática a partir de referências relevantes baseadas em dados e evidências, experiências de gestão no setor da mobilidade e na literatura disponível.",
    image: publicacao2,
    alt: "Guia de Mobilidade Humana",
    tipo: "livros",
    link: "https://repositorio.insper.edu.br/entities/publication/f0dcb9c3-8d56-4cf5-8149-a0c93cadd739"
  },
  {
    id: "3",
    title: "Mobilidade Humana",
    description: "Documento para apoiar a elaboração de programas de governo com foco em mobilidade urbana sustentável para as eleições municipais de 2024.",
    image: publicacao3,
    alt: "Mobilidade Humana",
    tipo: "livros",
    link: "https://repositorio-api.insper.edu.br/server/api/core/bitstreams/74ba137c-45f8-4f98-b20e-9462e8dbb76a/content"
  },
  {
    id: "4",
    title: "Coalizão dos Transportes",
    description: "Como tornar o setor de transporte um contribuidor ativo para a redução das emissões brasileiras.",
    image: publicacao4,
    alt: "Coalizão dos Transportes",
    tipo: "livros",
    link: "https://cdn.cnt.org.br/diretorioVirtual/23c3a08d-9fd6-4d8d-ba5c-3e935eed10fa.pdf"
  },
  {
    id: "5",
    title: "Avaliação do impacto da Faixa Azul nos sinistros de trânsito em São Paulo",
    description: "Avaliação do impacto da Faixa Azul nos sinistros de trânsito em São Paulo",
    image: publicacao5,
    alt: "Avaliação do impacto da Faixa Azul nos sinistros de trânsito em São Paulo",
    tipo: "policy_paper",
    link: "https://repositorio.insper.edu.br/entities/publication/36ec3e70-30bd-4c24-92bb-515e18f233be"
  },
  {
    id: "6",
    title: "Coalizão dos transportes: como tornar o setor de transportes um contribuidor ativo para a redução das emissões brasileiras (Estudo Completo)",
    image: publicacao4,
    alt: "Avaliação do impacto da Faixa Azul nos sinistros de trânsito em São Paulo",
    tipo: "livros",
    link: "https://insper-my.sharepoint.com/:b:/g/personal/laboratorioarqfuturo_insper_edu_br/EUOiGLEG4FVBraJ11KmGal0BHEm-HERqa9eUrzPYdG_wHQ?e=d1rYFj"
  },
  {
    id: "7",
    title: "Coalizão dos transportes: como tornar o setor de transportes um contribuidor ativo para a redução das emissões brasileiras (Relatório Síntese)",
    image: publi_princ_conc,
    alt: "Avaliação do impacto da Faixa Azul nos sinistros de trânsito em São Paulo",
    tipo: "livros",
    link: "https://insper-my.sharepoint.com/:b:/g/personal/laboratorioarqfuturo_insper_edu_br/EbQUkLDHw9BKsRjutjw0kfABvgvfNXh3QfvGciMOU2ULbQ?e=rB6tWf"
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
            onClick={() => handleFilterClick("policy_paper")}
            className={`${activeFilter === "policy_paper" ?  'bg-[#EAEAEA] text-black hover:bg-[#EAEAEA]' : 'text-black/40 hover:text-black hover:bg-[#EAEAEA]'}`}
          >
            Policy Papers
          </Button>
          {/* <Button 
            variant="secondary"
            onClick={() => handleFilterClick("notas")}
            className={`${activeFilter === "notas" ? 'bg-[#EAEAEA] text-black hover:bg-[#EAEAEA]' : 'text-black/40 hover:text-black hover:bg-[#EAEAEA]'}`}
          >
            Notas técnicas
          </Button> */}
        </div>

        {/* Publications Grid */}
        <div className="flex flex-wrap justify-center md:justify-start gap-10 md:gap-6">
          {filteredPublications.map((publication) => (
            <div key={publication.id} className="flex flex-col items-start text-left max-w-[320px] group">
              <div className="relative overflow-hidden ">
                <Link target="_blank" href={publication.link || ""}>
                <Image
                  src={publication.image}
                  alt={publication.alt}
                  width={320}
                  height={480}
                  className=" transition-transform duration-300 group-hover:scale-105"
                />
                </Link>
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
