import curso1 from "@/app/assets/images/curso1.png";
import curso2 from "@/app/assets/images/curso2.png";
import curso3 from "@/app/assets/images/curso3.png";
import curso4 from "@/app/assets/images/curso4.png";
import { Course } from "@/lib/types/course";

export const courses: Course[] = [
  {
    id: "cidades-inteligentes",
    title: "Gestão da Mobilidade Urbana: Uma via para Cidades Inteligentes e Sustentáveis",
    description: "Como avançar com soluções inovadoras alinhadas a diferentes contextos urbanos?",
    image: curso1.src,
    href: "https://ee.insper.edu.br/cursos/cidades/gestao-da-mobilidade-urbana-uma-via-para-cidades-inteligentes-e-sustentaveis/"
  },
  {
    id: "financiamento-transporte",
    title: "Gestão da Mobilidade Urbana: Financiamento do Transporte Público",
    description: "Como usar a economia do transporte para recuperar a qualidade e a demanda no transporte público",
    image: curso2.src,
    href: "https://ee.insper.edu.br/cursos/cidades/gestao-da-mobilidade-urbana-financiamento-do-transporte-publico/"
  },
  {
    id: "descarbonizacao-transporte",
    title: "A descarbonização do transporte no Brasil: caminhos futuros para um plano nacional",
    description: "Curso executivo customizado para o BID.",
    image: curso3.src,
    href: undefined
  },
  {
    id: "imersao-brasil-colombia",
    title: "Imersão Brasil-Colômbia",
    description: "O que aprender da experiência de urbanismo social da Colômbia: uma jornada partir da mobilidade urbana.",
    image: curso4.src,
    href: undefined
  }
];
