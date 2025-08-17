import pesquisas_intro from "@/app/assets/images/pesquisas_intro.jpg"
import { Header } from "@/components/header"
import Image from "next/image"

export default function Pesquisas()  {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />
      <div className="flex justify-end px-4 2xl:px-16 md:py-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium max-w-2xl text-right pb-5 pt-30">
          Pesquisas
        </h1>
      </div>
      {/* Imagem introdução */}
      <div className="w-full h-[80vh] max-h-[700px] bg-gray-200 mb-10 relative">
        <Image
          src={pesquisas_intro}
          alt="Introdução"
          fill
          className="object-cover"
        />
      </div>
      <div className="px-4 2xl:px-16 py-20 pb-30">
        <div className="flex text-black/50 items-start justify-start mb-30 max-w-[700px]">
          Lideradas por uma Coordenadoria específica dedicada ao Observatório, as pesquisas serão executadas por pesquisadores qualificados apoiados por estudantes de graduação e mestrado do Insper. <br/><br/>

O framework estará baseado na experiência do Centro de Ciências de Dados e do Centro de Estudos das Cidades - Laboratório Arq. Futuro do Insper, além de memorando de entendimento para a celebração de parcerias com outras organizações privadas e públicas. ​ 
        </div>
        <div className="flex flex-wrap gap-6 justify-start mb-12">
          <div className="flex flex-col items-start text-left w-[320px] group">
            <h2 className="text-4xl font-medium leading-none">Eixos Temáticos​ prioritários</h2>
          </div>
        </div>

        {/* Eixos Temáticos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Segurança Viária */}
          <div className="space-y-4">
            <h3 className="text-base text-black/50">Segurança Viária</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Dados e diagnóstico</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Políticas públicas</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Gestão de Riscos</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Visão Zero</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Plano Viário</span>
              </li>
            </ul>
          </div>

          {/* Logística Urbana */}
          <div className="space-y-4">
            <h3 className="text-base text-black/50">Logística Urbana</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Ciclos</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Processos</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Eficiência</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Inovação</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Descarbonização</span>
              </li>
            </ul>
          </div>

          {/* Transporte Público */}
          <div className="space-y-4">
            <h3 className="text-base text-black/50">Transporte Público</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Fortalecimento dos sistemas de transporte público</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Desafios do financiamento dos sistemas de transportes públicos (fontes, subsídios, recursos extra tarifários)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Integração física e tarifária, multimodalidade e micromobilidade</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Governança metropolitana/planejamento integrado</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Descarbonização</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black/30 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-black/50">Questões de Gênero</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}