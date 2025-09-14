import aula1 from "@/app/assets/images/aula1.png";
import aula2 from "@/app/assets/images/aula2.png";
import aula3 from "@/app/assets/images/aula3.png";
import aula4 from "@/app/assets/images/aula4.png";
import { Header } from "@/components/header";
import Image, { StaticImageData } from "next/image";

interface VideoData {
  id: number;
  image: StaticImageData;
  title: string;
  date: string;
  format?: string;
  href?: string;
}

const videosData: VideoData[] = [
  {
    id: 1,
    image: aula1,
    title: "Transporte público: Professor Rodrigo Tortoriello",
    date: "2025",
    format: "Aula",
    href:"https://www.youtube.com/watch?v=THjcpBcWXVc&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=17&t=37s&ab_channel=Insper"
  },
  {
    id: 2,
    image: aula2,
    title: "Explorando a Mobilidade Ativa: Professora Helena Coelho",
    date: "2025",
    format: "Aula",
    href:"https://www.youtube.com/watch?v=xJjdg5mv4LA&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=18&t=48s&ab_channel=Insper"
  },
  {
    id: 3,
    image: aula3,
    title: "Evento realizado pelo Banco de Desenvolvimento da Am.Latina e Caribe/CAF e pelo Banco Interamericano de Desenvolvimento/BID",
    date: "2025",
    format: "Aula",
    href:"https://www.youtube.com/watch?v=r-KXgkDMwMs&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=19&t=248s&ab_channel=Insper"
  },
  {
    id: 4,
    image: aula4,
    title: "Apresentação do Observatório Nac. de Mobilidade Sustentável para a comunidade do Rio de Janeiro",
    date: "2025",
    format: "Aula",
    href:"https://www.youtube.com/watch?v=rCcztslulJY&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=20&t=2953s&ab_channel=Insper"
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
             Vídeos aulas
            </h2>
            <p className="text-4xl text-gray-400 leading-none font-medium">Assíncronas</p>
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
          <div className="hidden md:block w-4 h-4 bg-[#C2181A]" />
        </div>

        {/* Grid responsivo com tamanhos fixos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videosData.map((video) => (
            <a 
              key={video.id} 
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start text-left group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-md w-full aspect-[7/4]">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  className="object-cover object-center rounded-md transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="mt-4 text-sm font-medium line-clamp-2">{video.title}</h3>
              <p className="text-xs text-gray-600 mt-2">{video.date} • {video.format}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
