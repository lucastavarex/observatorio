"use client"

import React from "react"
import { DataTable } from "../components/data-table"
import { FiltersSidebar } from "../components/filters-sidebar"
import { useDashboardData } from "../hooks/use-dashboard-data"

export default function ChartsPage() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("Terminais Rodoviários")
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  const { data, stats, isLoading } = useDashboardData(selectedFilter)

  return (
    <div className="bg-[#f3f3f3] min-h-screen w-full flex items-start justify-center p-4 md:p-4">
      <div className="container w-full">
        {/* Dashboard layout using same structure as catalago-de-dados */}
        <div className="flex flex-col gap-4 lg:flex-row min-h-[600px]">
        {/* Red container - FiltersSidebar */}
        <div className="bg-white w-full min-w-0 lg:min-w-[350px] lg:w-[350px] lg:flex-shrink-0 rounded-lg min-h-[200px] lg:min-h-full overflow-hidden">
          <div className="h-full overflow-y-auto">
            <FiltersSidebar 
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
        </div>
        <div className="bg-white w-full min-w-0 lg:min-w-[350px] lg:w-[350px] lg:flex-shrink-0 rounded-lg min-h-[200px] lg:min-h-full overflow-hidden">
          <div className="h-full overflow-y-auto">
            <FiltersSidebar 
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
        </div>
        
        {/* Container for search and data table */}
        <div className="flex flex-col gap-4 lg:flex-1">
          
          {/* Blue container - DataTable */}
          <div className="bg-white rounded-lg min-h-[200px]">
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
      </div>
    </div>
  </div>
)
} 