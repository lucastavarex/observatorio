"use client"

import { Button } from "@/components/ui/button"
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

type SortOrder = "asc" | "desc" | null

export default function CatalogoDeDados() {
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [sortedData, setSortedData] = useState(citiesData)

  const handleDownload = (cidade: string, dataType: string) => {
    console.log(`Downloading ${dataType} data for ${cidade}`)
    // Implement download logic here
  }

  const handleSort = () => {
    let newSortOrder: SortOrder
    const newSortedData = [...citiesData]

    if (sortOrder === null || sortOrder === "desc") {
      // Sort ascending
      newSortOrder = "asc"
      newSortedData.sort((a, b) => a.cidade.localeCompare(b.cidade))
    } else {
      // Sort descending
      newSortOrder = "desc"
      newSortedData.sort((a, b) => b.cidade.localeCompare(a.cidade))
    }

    setSortOrder(newSortOrder)
    setSortedData(newSortedData)
  }

  const getSortIcon = () => {
    if (sortOrder === "asc") {
      return <ChevronUp className="w-4 h-4" />
    } else if (sortOrder === "desc") {
      return <ChevronDown className="w-4 h-4" />
    } else {
      return <ChevronDown className="w-4 h-4 opacity-50" />
    }
  }

  return (
    <div className="w-full mx-auto px-4 2xl:px-16 pt-6 pb-30 bg-[#f9f9f6]">
      <div className="bg-white rounded-lg border">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 border-b">
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={handleSort}
            >
              Cidades
              {getSortIcon()}
            </div>
            <div className="font-medium text-gray-900">GTFS</div>
            <div className="font-medium text-gray-900">GPS embarcados</div>
            <div className="font-medium text-gray-900">Bilhetagem</div>
            <div className="font-medium text-gray-900">Arquivos vetoriais</div>
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
                    Download
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
                    Download
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
                    Download
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
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <div className="p-4 border-b">
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={handleSort}
            >
              Cidades
              {getSortIcon()}
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
                      size="sm"
                      variant={city.gtfs ? "default" : "secondary"}
                      disabled={!city.gtfs}
                      onClick={() => handleDownload(city.cidade, "GTFS")}
                      className={`w-full ${
                        city.gtfs
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Download
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">GPS embarcados</div>
                    <Button
                      size="sm"
                      variant={city.gpsEmbarcados ? "default" : "secondary"}
                      disabled={!city.gpsEmbarcados}
                      onClick={() => handleDownload(city.cidade, "GPS embarcados")}
                      className={`w-full ${
                        city.gpsEmbarcados
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Download
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Bilhetagem</div>
                    <Button
                      size="sm"
                      variant={city.bilhetagem ? "default" : "secondary"}
                      disabled={!city.bilhetagem}
                      onClick={() => handleDownload(city.cidade, "Bilhetagem")}
                      className={`w-full ${
                        city.bilhetagem
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Download
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Arquivos vetoriais</div>
                    <Button
                      size="sm"
                      variant={city.arquivosVetoriais ? "default" : "secondary"}
                      disabled={!city.arquivosVetoriais}
                      onClick={() => handleDownload(city.cidade, "Arquivos vetoriais")}
                      className={`w-full ${
                        city.arquivosVetoriais
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
