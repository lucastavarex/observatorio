import events1 from "@/app/assets/images/events1.png"
import events2 from "@/app/assets/images/events2.png"
import events3 from "@/app/assets/images/events3.png"
import events4 from "@/app/assets/images/events4.png"
import events5 from "@/app/assets/images/events5.png"
import events6 from "@/app/assets/images/events6.png"
import events8 from "@/app/assets/images/events8.png"
import events9 from "@/app/assets/images/events9.png"
import video7 from "@/app/assets/images/video7.png"
import { StaticImageData } from "next/image"

export interface EventData {
  id: string
  title: string
  description: string
  image: StaticImageData
  href?: string
  showInHome: boolean
  date: string
  location: string
}

export const eventsData: EventData[] = [
  {
    id: 'event1',
    title: 'Lançamento do Observatório Nacional de Mobilidade Sustentável',
    description: '2023 • Insper',
    image: events1,
    href: '/projetos/tabela',
    showInHome: true,
    date: '2023',
    location: 'Insper'
  },
  {
    id: 'event2',
    title: 'Climate Resiliency and Low-carbon Accessibility Seminar',
    description: '2023 • Insper',
    image: events2,
    showInHome: true,
    date: '2023',
    location: 'Insper'
  },
  {
    id: 'event3',
    title: 'Observatório Latino-Americano de Mobilidade',
    description: '2023 • Medellín',
    image: events3,
    showInHome: true,
    date: '2023',
    location: 'Medellín'
  },
  {
    id: 'event4',
    title: 'Apresentação do Observatório para a comunidade do Rio de Janeiro',
    description: '2023 • Museu do Amanhã',
    image: events4,
    showInHome: true,
    date: '2023',
    location: 'Museu do Amanhã'
  },
  {
    id: 'event5',
    title: 'Gestão metropolitana: desafios e oportunidades',
    description: '2024 • Insper',
    image: events5,
    showInHome: true,
    date: '2024',
    location: 'Insper'
  },
  {
    id: 'event6',
    title: 'Semana sem Carro',
    description: '2024 • Insper',
    image: events6,
    showInHome: true,
    date: '2024',
    location: 'Insper'
  },
  {
    id: 'event7',
    title: 'Lançamento do Guia de eletromobilidade',
    description: '2024 • Insper',
    image: video7,
    showInHome: false,
    date: '2024',
    location: 'Insper'
  },
  {
    id: 'event8',
    title: 'Lançamento da Coalizão COP30',
    description: '2024 • Brasília',
    image: events8,
    showInHome: false,
    date: '2024',
    location: 'Brasília'
  },
  {
    id: 'event9',
    title: 'Apresentação Coalizão pela Descarbonização – COP30',
    description: '2025 • Brasília',
    image: events9,
    showInHome: false,
    date: '2025',
    location: 'Brasília'
  },
]

// Função para filtrar eventos que devem aparecer na home
export function getEventsForHome(): EventData[] {
  return eventsData.filter(event => event.showInHome)
}

// Função para obter todos os eventos
export function getAllEvents(): EventData[] {
  return eventsData
}
