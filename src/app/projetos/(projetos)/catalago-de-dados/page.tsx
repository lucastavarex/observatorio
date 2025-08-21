import CatalogoDeDadosCidadesComDadosAbertos from "@/components/catalogo-de-dados-cidades-com-dados-abertos"
import CatalogoDeDadosCidadesParceiras from "@/components/catalogo-de-dados-cidades-parceiras"

export default function CatalogoDeDadosPage() {
  return (
    <div className="flex flex-col gap-4 pt-4 bg-[#f9f9f6] pb-30">
      <CatalogoDeDadosCidadesParceiras />
      <CatalogoDeDadosCidadesComDadosAbertos />
    </div>
  )
}
