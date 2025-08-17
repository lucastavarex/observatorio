"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { TooltipProvider } from "@/components/ui/tooltip"
import React from "react"
import { useDashboardData } from "../hooks/use-dashboard-data"
import { CitiesFilter } from "./components/cities-filter"
import { DistributionChart } from "./components/distribution-chart"
import { EvolucaoChart } from "./components/evolucao-chart"
import { ChartRadarMultiple } from "./components/radar-chart"
import { VariablesFilter } from "./components/variables-filter"

type ChartType = "radar" | "distribuicao" | "evolucao"

export default function ChartsPage() {
  // Chart type selection
  const [selectedChartType, setSelectedChartType] = React.useState<ChartType>("radar")
  
  // Year selection
  const availableYears = [2019, 2020, 2021, 2022, 2023, 2024]
  const [selectedYearIndex, setSelectedYearIndex] = React.useState<number[]>([4]) // Default to 2023 (index 3)
  const selectedYear = availableYears[selectedYearIndex[0]]
  
  // Start with some default selections to match the images
  const [selectedCities, setSelectedCities] = React.useState<string[]>(["Anápolis", "Aparecida de Goiânia", "Aracaju","Barueri","Belo Horizonte"])
  const [selectedVariables, setSelectedVariables] = React.useState<string[]>([
    "Valor da Tarifa",
    "Estudantes de Rede Pública - Percentual de Desconto",
    "Frota de Táxis",
    "Agentes de Trânsito em Exercício",
   
    "Percentual de Vagas de Estacionamento para Deficientes"
  ])
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  
  // For now, use the first selected variable for the dashboard data hook
  const primaryVariable = selectedVariables[0] || "Agentes de Trânsito em Exercício"
  const { data, stats, isLoading } = useDashboardData(primaryVariable, selectedYear)

  // Render the appropriate chart based on selection
  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="p-8 text-center text-gray-500">
          Carregando dados...
        </div>
      )
    }

    switch (selectedChartType) {
      case "radar":
        return (
          <ChartRadarMultiple
            selectedCities={selectedCities}
            selectedVariables={selectedVariables}
            year={selectedYear}
          />
        )
      case "evolucao":
        return (
          <EvolucaoChart 
            selectedCities={selectedCities}
            selectedVariables={selectedVariables}
            year={selectedYear}
          />
        )
      case "distribuicao":
      default:
        return (
          <DistributionChart 
            selectedCities={selectedCities}
            selectedVariables={selectedVariables}
            year={selectedYear}
          />
        )
    }
  }

  return (
    <TooltipProvider>
      <div className="bg-[#f3f3f3] min-h-screen w-full flex items-start justify-center p-4 md:p-4">
        <div className="w-full">
                     {/* Dashboard layout using same structure as catalago-de-dados */}
           <div className="flex flex-col gap-4 lg:flex-row min-h-[600px] overflow-visible">
          {/* Cities Filter Container */}
          <div className="bg-white w-full min-w-0 lg:min-w-[350px] lg:w-[350px] lg:flex-shrink-0 rounded-lg min-h-[200px] lg:min-h-full overflow-hidden">
            <div className="h-full overflow-y-auto">
              <CitiesFilter 
                selectedCities={selectedCities}
                onCitiesChange={setSelectedCities}
                year={selectedYear}
              />
            </div>
          </div>
          
          {/* Variables Filter Container */}
          <div className="bg-white w-full min-w-0 lg:min-w-[350px] lg:w-[350px] lg:flex-shrink-0 rounded-lg min-h-[200px] lg:min-h-full overflow-hidden">
            <div className="h-full overflow-y-auto">
              <VariablesFilter 
                selectedVariables={selectedVariables}
                onVariablesChange={setSelectedVariables}
                year={selectedYear}
              />
            </div>
          </div>
          
                     {/* Container for chart display */}
           <div className={`flex flex-col w-full lg:flex-1 ${(selectedChartType === "radar" || selectedChartType === "distribuicao") ? "sticky top-32 self-start z-10" : ""}`}>
            
            {/* Chart Type Selection Header */}
            <div className="bg-white rounded-t-lg p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
                <h2 className="text-xl font-bold text-gray-900">Selecione o ano e o gráfico</h2>
                
                <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
                  {/* Chart Type Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 pb-8 w-full">
                    <Button
                      variant={selectedChartType === "radar" ? "default" : "secondary"}
                      onClick={() => setSelectedChartType("radar")}
                      className={`px-6 w-full sm:w-auto ${selectedChartType === "radar" ? "bg-primary hover:bg-primary/90 cursor-pointer" : "hover:bg-primary hover:text-primary-foreground cursor-pointer"}`}
                    >
                      Radar
                    </Button>
                    <Button
                      variant={selectedChartType === "distribuicao" ? "default" : "secondary"}
                      onClick={() => setSelectedChartType("distribuicao")}
                      className={`px-6 w-full sm:w-auto ${selectedChartType === "distribuicao" ? "bg-primary hover:bg-primary/90 cursor-pointer" : "hover:bg-primary hover:text-primary-foreground cursor-pointer"}`}
                    >
                      Distribuição
                    </Button>
                    <Button
                      variant={selectedChartType === "evolucao" ? "default" : "secondary"}
                      onClick={() => setSelectedChartType("evolucao")}
                      className={`px-6 w-full sm:w-auto ${selectedChartType === "evolucao" ? "bg-primary hover:bg-primary/90 cursor-pointer" : "hover:bg-primary hover:text-primary-foreground cursor-pointer"}`}
                    >
                      Evolução
                    </Button>
                  </div>

                  {/* Year Slider */}
                  <div className={`w-full relative transition-opacity duration-300 ${
                    selectedChartType === "evolucao" ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}>
                    <Slider
                      value={selectedYearIndex}
                      onValueChange={setSelectedYearIndex}
                      max={availableYears.length - 1}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    {/* Year label positioned above the slider thumb */}
                    <div 
                      className="absolute -top-8 transform -translate-x-1/2 text-sm font-semibold text-gray-900"
                      style={{
                        left: `${(selectedYearIndex[0] / (availableYears.length - 1)) * 100}%`
                      }}
                    >
                      {selectedYear}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Container */}
            <div className="bg-white rounded-t-none rounded-b-lg h-[600px] 2xl:min-h-[380px] 2xl:h-auto custom-min-height">
              <div className="bg-white rounded-xl w-full h-full p-6 pt-0">
                {renderChart()}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </TooltipProvider>
  )
} 