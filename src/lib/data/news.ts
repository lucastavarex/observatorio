import video1 from "@/app/assets/images/video1.png"
import video2 from "@/app/assets/images/video2.png"
import video3 from "@/app/assets/images/video3.png"
import video4 from "@/app/assets/images/video4.png"
import video5 from "@/app/assets/images/video5.png"
import video6 from "@/app/assets/images/video6.png"
import video7 from "@/app/assets/images/video7.png"
import video8 from "@/app/assets/images/video8.png"
import { NewsItem } from "@/lib/types/news"

export const newsData: NewsItem[] = [
    {
    id: 3,
    title: "Observatório Nacional de Mobilidade Sustentável firma acordo de cooperação com o Rio de Janeiro",
    source: "Technibus",
    date: "2025",
    image: video3.src,
    link: "https://technibus.com.br/2025/02/19/observatorio-nacional-de-mobilidade-sustentavel-firma-acordo-de-cooperacao-com-o-rio-de-janeiro/",
    apareceNaHome: true
  },
   {
    id: 8,
    title: "Agenda da descarbonização pode ser melhor",
    source: "ABOL",
    date: "2025",
    image: video8.src,
    link: "https://abolbrasil.org.br/noticias/noticias-do-setor/agenda-da-descarbonizacao-pode-ser-melhor",
    apareceNaHome: false
  },
  {
    id: 4,
    title: "Sexta da mobilidade: Soluções baseadas na natureza e mobilidade urbana: a urgência da mudança de paradigma das cidades",
    source: "Insper",
    date: "2024",
    image: video4.src,
    link: "https://www.insper.edu.br/pt/eventos/2024/08/sexta-da-mobilidade-solucoes-baseadas-na-natureza-e-mobilidade-urbana-a-urgencia-da-mudanca-de-paradigma-das-cidades",
    apareceNaHome: true
  },
  {
    id: 5,
    title: "Sexta da mobilidade: Dados e Mobilidade Urbana",
    source: "Insper",
    date: "2024",
    image: video5.src,
    link: "https://www.insper.edu.br/pt/eventos/2024/10/sexta-da-mobilidade-dados-e-mobilidade-urbana",
    apareceNaHome: true
  },
  {
    id: 6,
    title: "Sexta da Mobilidade: Soluções Brasileiras para o Futuro da Mobilidade, o Caso do Aeromóvel",
    source: "Insper",
    date: "2024",
    image: video6.src,
    link: "https://www.insper.edu.br/pt/eventos/2024/11/sexta-da-mobilidade-solucoes-brasileiras-para-o-futuro-da-mobilidade-o-caso-do-aeromovel?utm_content=316378986&utm_medium=social&utm_source=facebook&hss_channel=fbp-120253158027896",
    apareceNaHome: true
  },
  {
    id: 7,
    title: "Evento de Lançamento do Guia de Eletromobilidade para Cidades Brasileiras",
    source: "Insper",
    date: "2024",
    image: video7.src,
    link: "https://www.insper.edu.br/pt/eventos/2024/09/mobilidade-sustentavel-na-agenda-da-cop-30-impactos-no-meio-ambiente-e-mudanca-climatica",
    apareceNaHome: true
  },
  {
    id: 1,
    title: "Grupo CCR e Laboratório Arq. Futuro de Cidades lançam Observatório Nacional de Mobilidade Sustentável",
    source: "Estadão",
    date: "2023",
    image: video1.src,
    link: "https://mobilidade.estadao.com.br/mobilidade-para-que/grupo-ccr-e-laboratorio-arq-futuro-de-cidades-lancam-observatorio-nacional-de-mobilidade-sustentavel",
    apareceNaHome: true
  },
  {
    id: 2,
    title: "Insper e CCR lançam Observatório Nacional de Mobilidade Sustentável",
    source: "Insper",
    date: "2023",
    image: video2.src,
    link: "https://www.insper.edu.br/noticias/insper-e-ccr-lancam-observatorio-nacional-de-mobilidade-sustentavel/",
    apareceNaHome: false
  },
]

// Função para obter notícias que aparecem na home
export function getHomeNews(): NewsItem[] {
  return newsData.filter(news => news.apareceNaHome)
}

// Função para obter todas as notícias
export function getAllNews(): NewsItem[] {
  return newsData
}
