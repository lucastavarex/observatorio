import aula1 from "@/app/assets/images/aula1.png";
import aula2 from "@/app/assets/images/aula2.png";
import aula3 from "@/app/assets/images/aula3.png";
import aula4 from "@/app/assets/images/aula4.png";
import insperCidades1 from "@/app/assets/images/insper_cidades_1.png";
import insperCidades2 from "@/app/assets/images/insper_cidades_2.png";
import insperCidades3 from "@/app/assets/images/insper_cidades_3.png";
import insperCidades4 from "@/app/assets/images/insper_cidades_4.png";
import insperCidades5 from "@/app/assets/images/insper_cidades_5.png";
import insperCidades6 from "@/app/assets/images/insper_cidades_6.png";
import insperCidades7 from "@/app/assets/images/insper_cidades_7.png";
import insperCidades8 from "@/app/assets/images/insper_cidades_8.png";
import insperCidades9 from "@/app/assets/images/insper_cidades_9.png";
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
    title: "Transporte Público - Rodrigo Tortoriello",
    date: "2025",
    format: "Aula",
    href: "https://www.youtube.com/watch?v=THjcpBcWXVc&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=17&t=37s&ab_channel=Insper"
  },
  {
    id: 2,
    image: aula2,
    title: "Mobilidade Ativa - Helena Carvalho Coelho",
    date: "2025",
    format: "Aula",
    href: "https://www.youtube.com/watch?v=xJjdg5mv4LA&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=18&t=48s&ab_channel=Insper"
  },
  {
    id: 3,
    image: aula3,
    title: "Economia do transporte - Flávio Chévis",
    date: "2025",
    format: "Aula",
    href: "https://www.youtube.com/watch?v=r-KXgkDMwMs&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=19&t=248s&ab_channel=Insper"
  },
  {
    id: 4,
    image: aula4,
    title: "Logística urbana - Fernando Picasso",
    date: "2025",
    format: "Aula",
    href: "https://www.youtube.com/watch?v=rCcztslulJY&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=20&t=2953s&ab_channel=Insper"
  }
];

const serieVideosData: VideoData[] = [
  {
    id: 1,
    image: insperCidades1,
    title: "Teaser",
    date: "2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=4EUVQCj2NZ8"
  },
  {
    id: 2,
    image: insperCidades2,
    title: "Urbanismo Social",
    date: "2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=TG8uj64SAKo&t=40s"
  },
  {
    id: 3,
    image: insperCidades3,
    title: "COP 30",
    date: "2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://youtu.be/9qGoebNb2pg?si=CXELtFSLvU_JdsxQ"
  },
  {
    id: 4,
    image: insperCidades4,
    title: "Dados",
    date: "2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://youtu.be/4g8QVsR3bvY?si=S965nt8FFcu1xLbO"
  },
  {
    id: 5,
    image: insperCidades5,
    title: "Financiamento do Transporte Público",
    date: "2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://youtu.be/KjxxS5nkrpg?si=X8fLif8FC9DwQzVU"
  },
  {
    id: 6,
    image: insperCidades6,
    title: "Mobilidade Ativa",
    date: "2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://youtu.be/TegcEnZHIMc?si=tg4VHx7xM-NGtsaU"
  },
  {
    id: 7,
    image: insperCidades7,
    title: "Saúde",
    date: "2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://youtu.be/0IC1-STZE9k?si=EgQ74Mq8LTU4XQfg"
  },
  {
    id: 8,
    image: insperCidades8,
    title: "Metropolização",
    date: "2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://youtu.be/F45qQPCDtJk?si=glrQRdcrV9ezS6Sz"
  },
  {
    id: 9,
    image: insperCidades9,
    title: "Mulheres e Territórios",
    date: "2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://youtu.be/eXuZqX-LdTc?si=w1sgMeXpSGitCnY9"
  }
];

export default function Videos() {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 py-20 pb-30">
        {/* Seção SÉRIE: INSPER CIDADES NA MOBILIDADE */}
        <div>
          {/* Título e linha com quadrado */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-medium leading-none">
                Série: Insper Cidades
              </h2>
              <p className="text-4xl text-gray-400 leading-none font-medium">na Mobilidade</p>
            </div>
            <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
            <div className="hidden md:block w-4 h-4 bg-[#C2181A]" />
          </div>

          {/* Grid responsivo com tamanhos fixos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serieVideosData.map((video) => (
              <a
                key={video.id}
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-start text-left group cursor-pointer"
              >
                <div className="relative overflow-hidden w-full aspect-[7/4]">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mt-4 text-sm font-medium line-clamp-2">{video.title}</h3>
                <p className="text-xs text-gray-600 mt-2">{video.date} • {video.format}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Título e linha com quadrado */}
        <div className="mt-32">
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
                <div className="relative overflow-hidden w-full aspect-[7/4]">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
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
    </div>
  );
}
