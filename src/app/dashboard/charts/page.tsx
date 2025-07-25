"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import React from "react"
import { useDashboardData } from "../hooks/use-dashboard-data"
import { CitiesFilter } from "./components/cities-filter"
import { VariablesFilter } from "./components/variables-filter"

export default function ChartsPage() {
  // Start with some default selections to match the images
  const [selectedCities, setSelectedCities] = React.useState<string[]>(["Anápolis"])
  const [selectedVariables, setSelectedVariables] = React.useState<string[]>([
    "Agentes de Trânsito em Exercício",
    "Arrecadação Anual Tributos pela Utilização da Infraestrutura em Perímetro Urbano", 
    "Arrecadação anual com Multas de Trânsito"
  ])
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  
  // For now, use the first selected variable for the dashboard data hook
  const primaryVariable = selectedVariables[0] || "Agentes de Trânsito em Exercício"
  const { data, stats, isLoading } = useDashboardData(primaryVariable)

  return (
    <TooltipProvider>
      <div className="bg-[#f3f3f3] min-h-screen w-full flex items-start justify-center p-4 md:p-4">
        <div className="container w-full">
          {/* Dashboard layout using same structure as catalago-de-dados */}
          <div className="flex flex-col gap-4 lg:flex-row min-h-[600px]">
          {/* Cities Filter Container */}
          <div className="bg-white w-full min-w-0 lg:min-w-[350px] lg:w-[350px] lg:flex-shrink-0 rounded-lg min-h-[200px] lg:min-h-full overflow-hidden">
            <div className="h-full overflow-y-auto">
              <CitiesFilter 
                selectedCities={selectedCities}
                onCitiesChange={setSelectedCities}
              />
            </div>
          </div>
          
          {/* Variables Filter Container */}
          <div className="bg-white w-full min-w-0 lg:min-w-[350px] lg:w-[350px] lg:flex-shrink-0 rounded-lg min-h-[200px] lg:min-h-full overflow-hidden">
            <div className="h-full overflow-y-auto">
              <VariablesFilter 
                selectedVariables={selectedVariables}
                onVariablesChange={setSelectedVariables}
              />
            </div>
          </div>
          
          {/* Container for chart display */}
          <div className="flex flex-col gap-4 lg:flex-1">
            
            {/* Chart Container */}
            <div className="bg-white rounded-lg min-h-[200px]">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Carregando dados...
                </div>
              ) : (
               <div className="bg-white rounded-xl w-full h-full p-6">
                 {/* Chart will be implemented here */}
                 <div className="text-center text-gray-500">
                   <h3 className="text-lg font-semibold mb-2">Gráfico em desenvolvimento</h3>
                   <p className="text-sm">Cidades selecionadas: {selectedCities.length}/5</p>
                   <p className="text-sm">Variáveis selecionadas: {selectedVariables.length}/5</p>
                   {selectedCities.length > 0 && (
                     <p className="text-xs mt-2">Cidades: {selectedCities.join(", ")}</p>
                   )}
                   {selectedVariables.length > 0 && (
                     <p className="text-xs mt-2">Variáveis: {selectedVariables.join(", ")}</p>
                   )}
                 </div>
               </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </TooltipProvider>
  )
} 