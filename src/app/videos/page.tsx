import video1 from "@/app/assets/images/video1.png";
import video2 from "@/app/assets/images/video2.png";
import video3 from "@/app/assets/images/video3.png";
import video4 from "@/app/assets/images/video4.png";
import video5 from "@/app/assets/images/video5.png";
import { Header } from "@/components/header";
import Image, { StaticImageData } from "next/image";

interface VideoData {
  id: number;
  image: StaticImageData;
  title: string;
  date: string;
  location: string;
}

const videosData: VideoData[] = [
  {
    id: 1,
    image: video1,
    title: "Lançamento do Observatório Nacional de Mobilidade Sustentável",
    date: "2023",
    location: "Insper"
  },
  {
    id: 2,
    image: video2,
    title: "Climate Resiliency and Low-carbon Accessibility Seminar",
    date: "2023",
    location: "Insper"
  },
  {
    id: 3,
    image: video3,
    title: "Evento realizado pelo Banco de Desenvolvimento da Am.Latina e Caribe/CAF e pelo Banco Interamericano de Desenvolvimento/BID",
    date: "2023",
    location: "Medellín"
  },
  {
    id: 4,
    image: video4,
    title: "Apresentação do Observatório Nac. de Mobilidade Sustentável para a comunidade do Rio de Janeiro",
    date: "2023",
    location: "Museu do Amanhã"
  },
  {
    id: 5,
    image: video5,
    title: "Lançamento do guia de eletromobilidade",
    date: "2024",
    location: "Insper"
  }
];

export default function Videos() {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 py-20 pb-30">
        {/* Título e linha com quadrado */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-medium leading-none">
             Desafios e oportunidades
            </h2>
            <p className="text-4xl text-gray-400 leading-none font-medium">da mobilidade urbana</p>
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
          <div className="hidden md:block w-4 h-4 bg-[#C2181A]" />
        </div>

        {/* Cards com espaçamento fixo e quebra automática */}
        <div className="flex flex-wrap gap-6 justify-center xl:justify-start">
          {videosData.map((video) => (
            <div key={video.id} className="flex flex-col items-start text-left w-[320px] group">
              <div className="relative overflow-hidden rounded-md">
                <Image
                  src={video.image}
                  alt={video.title}
                  width={320}
                  height={213}
                  className="rounded-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-sm font-medium">{video.title}</h3>
              <p className="text-xs text-gray-600 mt-2">{video.date} • {video.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
