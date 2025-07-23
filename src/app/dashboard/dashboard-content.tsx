"use client"

import { InputWithIcon } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from "react"
import { DataTable } from "./components/data-table"
import { FiltersSidebar } from "./components/filters-sidebar"
import { useDashboardData } from "./hooks/use-dashboard-data"

export default function DashboardContent() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("Terminais Rodoviários")
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  const { data } = useDashboardData(selectedFilter)

  return (
    <div className="bg-[#f3f3f3] min-h-screen w-full flex items-start justify-center p-4 md:p-4">
      <div className="w-full max-w-7xl">
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
        
        {/* Container for search and data table */}
        <div className="flex flex-col gap-4 lg:flex-1">
          {/* Green container - Search Input */}
          <div className="rounded-lg flex items-center ">
            <div className="flex items-center justify-between w-full">
              {/* <h1 className="text-lg font-semibold ">Dashboard</h1> */}
              <InputWithIcon
                icon={<Search className="h-5 w-5 lg:mr-4" />}
                iconPosition="right"
                placeholder="Filtrar por município ou UF..."
                value={globalFilter}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(event.target.value)}
                className="bg-white px-4 lg:px-9 h-14 border-none shadow-none w-full focus-visible:ring-0 focus-visible:outline-none focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Blue container - DataTable */}
          <div className="bg-white rounded-lg min-h-[200px]">
            <DataTable 
              data={data}
              selectedFilter={selectedFilter}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)
} 