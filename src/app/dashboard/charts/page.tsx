"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { TooltipProvider } from "@/components/ui/tooltip"
import React from "react"
import { useDashboardData } from "../hooks/use-dashboard-data"
import { CitiesFilter } from "./components/cities-filter"
import { DistributionChart } from "./components/distribution-chart"
import { EvolucaoChart } from "./components/evolucao-chart"
import { RadarChart } from "./components/radar-chart"
import { VariablesFilter } from "./components/variables-filter"

type ChartType = "radar" | "distribuicao" | "evolucao"

export default function ChartsPage() {
  // Chart type selection
  const [selectedChartType, setSelectedChartType] = React.useState<ChartType>("distribuicao")
  
  // Year selection
  const availableYears = [2020, 2021, 2022, 2023, 2024]
  const [selectedYearIndex, setSelectedYearIndex] = React.useState<number[]>([3]) // Default to 2023 (index 3)
  const selectedYear = availableYears[selectedYearIndex[0]]
  
  // Start with some default selections to match the images
  const [selectedCities, setSelectedCities] = React.useState<string[]>(["Anápolis", "Belo Horizonte"])
  const [selectedVariables, setSelectedVariables] = React.useState<string[]>([
    "Agentes de Trânsito em Exercício",
    "Arrecadação anual com Multas de Trânsito",
    "Capacidade Média da Frota (composição) de VLT", 
    "Capacidade Média da Frota de Ônibus Convencional"
  ])
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  
  // For now, use the first selected variable for the dashboard data hook
  const primaryVariable = selectedVariables[0] || "Agentes de Trânsito em Exercício"
  const { data, stats, isLoading } = useDashboardData(primaryVariable)

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
          <RadarChart 
            selectedCities={selectedCities}
            selectedVariables={selectedVariables}
          />
        )
      case "evolucao":
        return (
          <EvolucaoChart 
            selectedCities={selectedCities}
            selectedVariables={selectedVariables}
          />
        )
      case "distribuicao":
      default:
        return (
          <DistributionChart 
            selectedCities={selectedCities}
            selectedVariables={selectedVariables}
          />
        )
    }
  }

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
          <div className="flex flex-col  lg:flex-1">
            
            {/* Chart Type Selection Header */}
            <div className="bg-white rounded-t-lg p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
                <h2 className="text-xl font-bold text-gray-900">Selecione o ano e o gráfico</h2>
                
                <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
                  {/* Chart Type Buttons */}
                  <div className="flex gap-2 pb-8">
                    <Button
                      variant={selectedChartType === "radar" ? "default" : "secondary"}
                      onClick={() => setSelectedChartType("radar")}
                      className={`px-6 ${selectedChartType === "radar" ? "bg-primary hover:bg-primary/90 cursor-pointer" : "hover:bg-primary hover:text-primary-foreground cursor-pointer"}`}
                    >
                      Radar
                    </Button>
                    <Button
                      variant={selectedChartType === "distribuicao" ? "default" : "secondary"}
                      onClick={() => setSelectedChartType("distribuicao")}
                      className={`px-6 ${selectedChartType === "distribuicao" ? "bg-primary hover:bg-primary/90 cursor-pointer" : "hover:bg-primary hover:text-primary-foreground cursor-pointer"}`}
                    >
                      Distribuição
                    </Button>
                    <Button
                      variant={selectedChartType === "evolucao" ? "default" : "secondary"}
                      onClick={() => setSelectedChartType("evolucao")}
                      className={`px-6 ${selectedChartType === "evolucao" ? "bg-primary hover:bg-primary/90 cursor-pointer" : "hover:bg-primary hover:text-primary-foreground cursor-pointer"}`}
                    >
                      Evolução
                    </Button>
                  </div>

                  {/* Year Slider */}
                  <div className="w-full relative">
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
            <div className="bg-white rounded-t-none rounded-b-lg h-[800px] 2xl:min-h-[600px] 2xl:h-auto">
              <div className="bg-white rounded-xl w-full h-full p-6">
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