"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

// Data array with cities and their data availability
const citiesData = [
  {
    cidade: "Rio de Janeiro",
    gtfs: true,
    gpsEmbarcados: true,
    bilhetagem: false,
    arquivosVetoriais: true,
  },
  {
    cidade: "Niterói",
    gtfs: true,
    gpsEmbarcados: true,
    bilhetagem: false,
    arquivosVetoriais: true,
  },
  {
    cidade: "São Paulo",
    gtfs: false,
    gpsEmbarcados: true,
    bilhetagem: true,
    arquivosVetoriais: false,
  },
  {
    cidade: "Salvador",
    gtfs: false,
    gpsEmbarcados: false,
    bilhetagem: true,
    arquivosVetoriais: true,
  },
  {
    cidade: "Santo André",
    gtfs: true,
    gpsEmbarcados: true,
    bilhetagem: false,
    arquivosVetoriais: false,
  },
  {
    cidade: "Campinas",
    gtfs: false,
    gpsEmbarcados: true,
    bilhetagem: false,
    arquivosVetoriais: false,
  },
  {
    cidade: "Recife",
    gtfs: false,
    gpsEmbarcados: false,
    bilhetagem: true,
    arquivosVetoriais: false,
  },
]

// Fake data for modal content - multiple sources per data type
const modalData = {
  GTFS: {
    title: "GTFS",
    subtitle: "Dados GTFS do transporte público da cidade do Rio: rotas, horários e paradas.",
    sources: [
      {
        name: "Dataverse",
        description:
          "Repositório de dados com bases, metadados e informações organizadas para facilitar sua consulta, citação e reuso.",
        actionText: "Acesse",
        actionType: "download",
        actionUrl: "#",
      },
      {
        name: "Prefeitura",
        description:
          "Fonte original dos dados, geralmente hospedada em portais institucionais das prefeituras ou órgãos públicos responsáveis.",
        actionText: "Acesse",
        actionType: "download",
        actionUrl: "#",
      },
      {
        name: "GeoPortal",
        description:
          "Acesso a mapas interativos e camadas geográficas relacionadas ao tema. Ideal para explorar os dados espacializados no território.",
        actionText: "Acesse",
        actionType: "link",
        actionUrl: "https://geoportal.exemplo.com",
      },
    ],
  },
  "GPS embarcados": {
    title: "GPS embarcados",
    subtitle: "Dados de localização em tempo real dos veículos do transporte público da cidade.",
    sources: [
      {
        name: "API Municipal",
        description:
          "Interface de programação que fornece dados de GPS em tempo real dos veículos, atualizada a cada 30 segundos.",
        actionText: "Acesse",
        actionType: "link",
        actionUrl: "https://api.exemplo.com/gps",
      },
      {
        name: "Dataverse",
        description: "Dados históricos de GPS organizados e documentados para análises e pesquisas acadêmicas.",
        actionText: "Acesse",
        actionType: "download",
        actionUrl: "#",
      },
      {
        name: "Portal de Dados Abertos",
        description: "Conjunto de dados de mobilidade urbana disponibilizados pela administração pública municipal.",
        actionText: "Acesse",
        actionType: "download",
        actionUrl: "#",
      },
    ],
  },
  Bilhetagem: {
    title: "Bilhetagem",
    subtitle: "Dados de validações e uso do sistema de transporte público da cidade.",
    sources: [
      {
        name: "Operadora do Sistema",
        description: "Relatórios oficiais da empresa responsável pelo sistema de bilhetagem eletrônica da cidade.",
        actionText: "Acesse",
        actionType: "download",
        actionUrl: "#",
      },
      {
        name: "Secretaria de Transportes",
        description:
          "Dados consolidados e tratados pela secretaria municipal responsável pela gestão do transporte público.",
        actionText: "Acesse",
        actionType: "link",
        actionUrl: "https://transportes.exemplo.com",
      },
      {
        name: "Dataverse",
        description: "Base de dados acadêmica com informações de bilhetagem organizadas para pesquisa e análise.",
        actionText: "Acesse",
        actionType: "download",
        actionUrl: "#",
      },
    ],
  },
  "Arquivos vetoriais": {
    title: "Arquivos vetoriais",
    subtitle: "Mapas e geometrias das rotas e infraestrutura de transporte da cidade.",
    sources: [
      {
        name: "GeoPortal Municipal",
        description:
          "Plataforma oficial de dados geoespaciais da prefeitura com camadas vetoriais do sistema de transporte.",
        actionText: "Acesse",
        actionType: "link",
        actionUrl: "https://geo.exemplo.com",
      },
      {
        name: "IBGE",
        description:
          "Dados geográficos oficiais do Instituto Brasileiro de Geografia e Estatística relacionados ao transporte urbano.",
        actionText: "Acesse",
        actionType: "download",
        actionUrl: "#",
      },
      {
        name: "OpenStreetMap",
        description: "Dados colaborativos de mapeamento aberto com informações detalhadas sobre rotas e paradas.",
        actionText: "Acesse",
        actionType: "link",
        actionUrl: "https://openstreetmap.org",
      },
    ],
  },
}

type SortOrder = "asc" | "desc" | null
type SortField = "cidade" | "gtfs" | "gpsEmbarcados" | "bilhetagem" | "arquivosVetoriais"

interface ModalState {
  isOpen: boolean
  cidade: string
  dataType: string
}

export default function CatalogoDeDadosCidadesParceiras() {
  const [sortField, setSortField] = useState<SortField>("cidade")
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [sortedData, setSortedData] = useState(citiesData)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    cidade: "",
    dataType: "",
  })

  const handleDownload = (cidade: string, dataType: string) => {
    setModalState({
      isOpen: true,
      cidade,
      dataType,
    })
  }

  const handleSort = (field: SortField) => {
    let newSortOrder: SortOrder
    const newSortedData = [...citiesData]

    if (sortField === field) {
      // Same field, toggle order
      if (sortOrder === null || sortOrder === "desc") {
        newSortOrder = "asc"
      } else {
        newSortOrder = "desc"
      }
    } else {
      // New field, start with ascending
      newSortOrder = "asc"
    }

    // Sort the data
    newSortedData.sort((a, b) => {
      if (field === "cidade") {
        const aValue = a[field] as string
        const bValue = b[field] as string
        return newSortOrder === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      } else {
        // For boolean fields, true values come first in ascending order
        const aValue = (a[field] as boolean) ? 1 : 0
        const bValue = (b[field] as boolean) ? 1 : 0
        return newSortOrder === "asc" ? bValue - aValue : aValue - bValue
      }
    })

    setSortField(field)
    setSortOrder(newSortOrder)
    setSortedData(newSortedData)
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronDown className="w-4 h-4 opacity-50" />
    }
    
    if (sortOrder === "asc") {
      return <ChevronUp className="w-4 h-4" />
    } else if (sortOrder === "desc") {
      return <ChevronDown className="w-4 h-4" />
    } else {
      return <ChevronDown className="w-4 h-4 opacity-50" />
    }
  }

  const currentModalData = modalData[modalState.dataType as keyof typeof modalData]

  return (
    <div className="w-full mx-auto px-4 2xl:px-16">
      <div className="bg-white rounded-lg border">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="p-4">
            <div className="font-semibold text-xl text-gray-900">Cidades com dados abertos</div>
          </div>
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 border-b">
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("cidade")}
            >
              Cidades
              {getSortIcon("cidade")}
            </div>
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("gtfs")}
            >
              GTFS
              {getSortIcon("gtfs")}
            </div>
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("gpsEmbarcados")}
            >
              GPS embarcados
              {getSortIcon("gpsEmbarcados")}
            </div>
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("bilhetagem")}
            >
              Bilhetagem
              {getSortIcon("bilhetagem")}
            </div>
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("arquivosVetoriais")}
            >
              Arquivos vetoriais
              {getSortIcon("arquivosVetoriais")}
            </div>
          </div>
          {/* Table Body */}
          <div className="divide-y">
            {sortedData.map((city, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 p-4 items-center">
                <div className="font-medium text-gray-900">{city.cidade}</div>
                <div>
                  <Button
                    size="lg"
                    variant={city.gtfs ? "default" : "secondary"}
                    disabled={!city.gtfs}
                    onClick={() => handleDownload(city.cidade, "GTFS")}
                    className={` ${
                      city.gtfs
                        ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Acesse
                  </Button>
                </div>
                <div>
                  <Button
                    size="lg"
                    variant={city.gpsEmbarcados ? "default" : "secondary"}
                    disabled={!city.gpsEmbarcados}
                    onClick={() => handleDownload(city.cidade, "GPS embarcados")}
                    className={`${
                      city.gpsEmbarcados
                        ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Acesse
                  </Button>
                </div>
                <div>
                  <Button
                    size="lg"
                    variant={city.bilhetagem ? "default" : "secondary"}
                    disabled={!city.bilhetagem}
                    onClick={() => handleDownload(city.cidade, "Bilhetagem")}
                    className={`${
                      city.bilhetagem
                        ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Acesse
                  </Button>
                </div>
                <div>
                  <Button
                    size="lg"
                    variant={city.arquivosVetoriais ? "default" : "secondary"}
                    disabled={!city.arquivosVetoriais}
                    onClick={() => handleDownload(city.cidade, "Arquivos vetoriais")}
                    className={`${
                      city.arquivosVetoriais
                        ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Acesse
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden">
           <div className="p-4">
            <div className="font-semibold text-xl text-gray-900">Cidades com dados abertos</div>
          </div>
          {/* Mobile Header */}
          <div className="p-4 border-b">
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("cidade")}
            >
              Cidades
              {getSortIcon("cidade")}
            </div>
          </div>
          {/* Mobile Cards */}
          <div className="divide-y">
            {sortedData.map((city, index) => (
              <div key={index} className="p-4 space-y-3">
                <div className="font-medium text-gray-900 text-lg">{city.cidade}</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">GTFS</div>
                    <Button
                      size="lg"
                      variant={city.gtfs ? "default" : "secondary"}
                      disabled={!city.gtfs}
                      onClick={() => handleDownload(city.cidade, "GTFS")}
                      className={`w-full ${
                        city.gtfs
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Acesse
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">GPS embarcados</div>
                    <Button
                      size="lg"
                      variant={city.gpsEmbarcados ? "default" : "secondary"}
                      disabled={!city.gpsEmbarcados}
                      onClick={() => handleDownload(city.cidade, "GPS embarcados")}
                      className={`w-full ${
                        city.gpsEmbarcados
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Acesse
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Bilhetagem</div>
                    <Button
                      size="lg"
                      variant={city.bilhetagem ? "default" : "secondary"}
                      disabled={!city.bilhetagem}
                      onClick={() => handleDownload(city.cidade, "Bilhetagem")}
                      className={`w-full ${
                        city.bilhetagem
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Acesse
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Arquivos vetoriais</div>
                    <Button
                      size="lg"
                      variant={city.arquivosVetoriais ? "default" : "secondary"}
                      disabled={!city.arquivosVetoriais}
                      onClick={() => handleDownload(city.cidade, "Arquivos vetoriais")}
                      className={`w-full ${
                        city.arquivosVetoriais
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Acesse
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalState.isOpen} onOpenChange={(open) => setModalState((prev) => ({ ...prev, isOpen: open }))}>
        <DialogContent className="md:max-w-2xl! overflow-y-auto md:p-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">{currentModalData?.title}</DialogTitle>
            <DialogDescription className="text-gray-600 text-base leading-relaxed">
              {currentModalData?.subtitle}
            </DialogDescription>
         <div className="my-3 h-[1px]! flex-grow  bg-gray-100" />
          </DialogHeader>

                     <div className="space-y-0 -mt-6">
             {currentModalData?.sources.map((source, index) => (
               <div key={index}>
                 <div className="flex items-center justify-between md:gap-24 gap-4 py-4">
                   <div className="flex-1">
                     <h3 className="font-semibold text-gray-900 mb-2">{source.name}</h3>
                     <p className="text-gray-600 text-sm leading-relaxed">{source.description}</p>
                   </div>
                   <Button
                     onClick={() => {
                       if (source.actionType === "download") {
                         console.log(`Downloading from ${source.name} for ${modalState.cidade}`)
                         // Simulate download
                       } else {
                         window.open(source.actionUrl, "_blank")
                       }
                     }}
                     className=" px-6 py-2 min-w-[100px] shrink-0"
                   >
                     {source.actionText}
                   </Button>
                 </div>
                 {index < currentModalData.sources.length - 1 && (
                   <div className="h-[1.2px] flex-grow bg-gray-100" />
                 )}
               </div>
             ))}
           </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
