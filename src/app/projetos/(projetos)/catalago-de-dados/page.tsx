import CatalogoDeDadosCidadesComDadosAbertos from "@/components/catalogo-de-dados-cidades-com-dados-abertos"
import CatalogoDeDadosCidadesParceiras from "@/components/catalogo-de-dados-cidades-parceiras"

export default function CatalogoDeDadosPage() {
  return (
    <div className="flex flex-col gap-4 pt-4 bg-[#f9f9f6] pb-30">
      <CatalogoDeDadosCidadesParceiras />
      <CatalogoDeDadosCidadesComDadosAbertos />
      <div className="mt-8 p-6 mx-4 2xl:mx-16 bg-white shadow-sm rounded-lg border-l-4 border-primary">
              <p className="text-gray-700">
               As cidades sinalizadas com <span className="font-bold text-lg">*</span> fazem parte do acordo firmado com o Consórcio da Região Metropolitana do Recife para o compartilhamento de dados de mobilidade urbana.
               
              </p>
            </div>
    </div>
  )
}
