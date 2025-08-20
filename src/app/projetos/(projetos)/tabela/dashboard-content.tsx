"use client"

import { YearCombobox } from "@/components/combo-box"
import { InputWithIcon } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from "react"
import { DataTable } from "../dashboard/components/data-table"
import { FiltersSidebar } from "../dashboard/components/filters-sidebar"
import { useDashboardData } from "../dashboard/hooks/use-dashboard-data"
import { getAvailableVariables, getPEMOBDataByYear, getVariableCityFillPercentage } from "../dashboard/lib/pemob-data"

export default function DashboardContent() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("Valor Arrecadado com Multas de Trânsito")
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  const [selectedYear, setSelectedYear] = React.useState<string>("2024")
  const { data, stats, isLoading } = useDashboardData(selectedFilter)

  // Get available years for the selected variable
  const availableYears = React.useMemo(() => {
    const years = []
    for (let year = 2019; year <= 2024; year++) {
      try {
        const variables = getAvailableVariables(year)
        if (variables.includes(selectedFilter)) {
          years.push(year.toString())
        }
      } catch (error) {
        // Skip years without data
      }
    }
    return years
  }, [selectedFilter])

  // Get completeness percentage for the selected variable and year
  const completenessPercentage = React.useMemo(() => {
    try {
      return getVariableCityFillPercentage(selectedFilter, parseInt(selectedYear))
    } catch (error) {
      return 0
    }
  }, [selectedFilter, selectedYear])

  // Get PEMOB question for the selected variable from the actual data
  const getPEMOBQuestion = (variableName: string, year: number) => {
    try {
      // Get data for the selected year
      const yearData = getPEMOBDataByYear(year)
      if (!yearData || yearData.length === 0) return "Pergunta não disponível para este ano"
      
      // Find the first city that has data for this variable
      const cityWithData = yearData.find(city => 
        city.data.some(item => item.label === variableName)
      )
      
      if (!cityWithData) return "Pergunta não disponível para esta variável"
      
      // Get the question from the data
      const variableData = cityWithData.data.find(item => item.label === variableName)
      return variableData?.label_pergunta || "Pergunta não disponível para esta variável"
    } catch (error) {
      return "Pergunta não disponível"
    }
  }

  return (
    <div className="bg-[#f3f3f3] min-h-screen w-full flex items-start justify-center p-4 md:p-4">
      <div className="w-full">
        {/* Dashboard layout using same structure as catalago-de-dados */}
        <div className="flex flex-col gap-4 lg:flex-row min-h-[600px]">
        {/* Red container - FiltersSidebar */}
        <div className="bg-white w-full min-w-0 lg:min-w-[300px] lg:w-[300px] lg:flex-shrink-0 rounded-lg min-h-[200px] lg:min-h-full overflow-hidden order-1">
          <div className="h-full overflow-y-auto">
            <FiltersSidebar 
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
        </div>
        
        {/* Container for search and data table - Now responsive */}
        <div className="flex flex-col gap-4 flex-1 order-3 lg:order-2 min-w-0">
          {/* Green container - Search Input */}
          <div className="rounded-lg flex items-center ">
            <div className="flex items-center justify-between w-full">
              {/* <h1 className="text-lg font-semibold ">Dashboard</h1> */}
              <InputWithIcon
                icon={<Search className="h-5 w-5 lg:mr-4 text-black" />}
                iconPosition="right"
                placeholder="Buscar por Município ou Unidade Federativa ..."
                value={globalFilter}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(event.target.value)}
                className="bg-white placeholder:text-black sm:text-md font-medium px-4 lg:px-9 h-14 border-none shadow-none w-full focus-visible:ring-0 focus-visible:outline-none focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Blue container - DataTable */}
          <div className="bg-white rounded-lg min-h-[200px] w-full">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Carregando dados...
              </div>
            ) : (
              <DataTable 
                data={data}
                selectedFilter={selectedFilter}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            )}
          </div>
        </div>

        {/* Third column - Information Panel */}
        <div className="flex flex-col gap-4 w-full min-w-0 lg:min-w-[280px] lg:w-[280px] lg:flex-shrink-0 order-2 lg:order-3 md:sticky md:top-32 md:self-start">
          {/* Year Selection - External to the card */}
          <div className="w-full">
            <YearCombobox
              value={selectedYear}
              onValueChange={setSelectedYear}
              placeholder="Selecionar ano..."
              className="w-full h-14"
            />
          </div>

          {/* Information Card - Separate from combobox */}
          <div className="bg-white w-full rounded-lg min-h-[200px] overflow-hidden">
            <div className="p-4 flex flex-col gap-4">
              {/* Variable Information */}
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Nome na tabela</label>
                  <p className="text-sm font-semibold text-gray-900 break-words">{selectedFilter}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Pergunta PEMOB</label>
                  <p className="text-sm font-semibold text-gray-900 break-words">{getPEMOBQuestion(selectedFilter, parseInt(selectedYear))}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Anos</label>
                  <p className="text-sm font-semibold text-gray-900">{availableYears.length > 0 ? availableYears.join(", ") : "-"}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Grau de completude</label>
                  <p className="text-sm font-semibold text-gray-900">{completenessPercentage}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
} 