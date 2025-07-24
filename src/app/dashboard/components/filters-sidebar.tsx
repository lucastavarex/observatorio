import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import React from "react"
import { useFilterCategories } from "../hooks/use-filter-categories"
import { FilterSearch } from "./filter-search"

interface FiltersSidebarProps {
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

export function FiltersSidebar({ selectedFilter, onFilterChange }: FiltersSidebarProps) {
  const [searchFilter, setSearchFilter] = React.useState("")
  const { filteredCategories, hasResults } = useFilterCategories(searchFilter)

  return (
    <aside className="w-full">
      <div className="space-y-3">
        {/* Header */}
        <div className="space-y-2 pb-3 p-4">
          <h2 className="text-xl font-bold text-gray-900">Pesquisa Nacional de Mobilidade Urbana</h2>
          <p className="text-sm text-gray-600">Selecione uma das variáveis</p>
        </div>

        {/* Search */}
        <FilterSearch 
          searchFilter={searchFilter}
          onSearchChange={setSearchFilter}
        />
         <div className="h-[0.5px] w-full bg-gray-300"/>

        {/* Filters */}
        {!hasResults && searchFilter && (
          <div className="px-4 py-8 text-center">
            <p className="text-gray-500 text-sm">Nenhum resultado encontrado</p>
          </div>
        )}
        <Accordion type="multiple" defaultValue={["Infraestrutura"]} className="w-full -mt-3">
          {Object.entries(filteredCategories).map(([categoria, subcategorias]) => (
            <AccordionItem key={categoria} value={categoria} className="border-b">
              <AccordionTrigger className="text-left cursor-pointer px-4 font-semibold py-5 hover:no-underline ">
                {categoria}
              </AccordionTrigger>
              <div className="h-[0.5px] w-full bg-gray-300"/>
              <AccordionContent className="pb-0">
                <div className="space-y-0">
                  <Accordion type="multiple" defaultValue={Object.keys(subcategorias)} className="w-full">
                    {Object.entries(subcategorias).map(([subcategoria, data], index) => {
                      const IconComponent = data.icon
                      return (
                        <AccordionItem key={subcategoria} value={subcategoria} className="border-none">
                          <AccordionTrigger className="text-left flex items-center font-medium px-4 py-2 hover:no-underline  border-gray-200">
                            <div className="flex py-2 pl-4 items-center space-x-2">
                              <IconComponent className=" h-5 w-5" />
                              <span className="text-sm text-gray-800 cursor-pointer">{subcategoria}</span>
                            </div>
                          </AccordionTrigger>
                          <div className="h-[0.5px] w-full bg-gray-300"/>
                          <AccordionContent className="pb-0">
                            <div className="space-y-0">
                              {data.options.map((opcao, optionIndex) => (
                                <div key={opcao}>
                                <div className="px-8 pr-4 gap-4 flex items-center justify-between py-3 ">
                                  <label
                                    htmlFor={opcao}
                                    className="text-sm cursor-pointer text-gray-700 flex-1 leading-relaxed"
                                  >
                                    {opcao}
                                  </label>
                                  <Switch
                                    id={opcao}
                                    checked={selectedFilter === opcao}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        onFilterChange(opcao)
                                      }
                                    }}
                                  />
                                </div>
                                <div className="h-[0.5px] w-full bg-gray-300"/>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                          <div className="h-[0.5px] w-full bg-gray-300"/>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  )
} 