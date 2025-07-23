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
  const { filteredCategories } = useFilterCategories(searchFilter)

  return (
    <aside className="w-full p-4">
      <div className="space-y-3">
        {/* Header */}
        <div className="space-y-2 pb-3">
          <h2 className="text-xl font-bold text-gray-900">Pesquisa Nacional de Mobilidade Urbana</h2>
          <p className="text-sm text-gray-600">Selecione uma das variáveis</p>
        </div>

        {/* Search */}
        <FilterSearch 
          searchFilter={searchFilter}
          onSearchChange={setSearchFilter}
        />

        {/* Filters */}
        <Accordion type="multiple" defaultValue={["Infraestrutura"]} className="w-full -mt-3">
          {Object.entries(filteredCategories).map(([categoria, subcategorias]) => (
            <AccordionItem key={categoria} value={categoria} className="border-b">
              <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline ">
                {categoria}
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="space-y-0">
                  <Accordion type="multiple" defaultValue={Object.keys(subcategorias)} className="w-full">
                    {Object.entries(subcategorias).map(([subcategoria, data], index) => {
                      const IconComponent = data.icon
                      return (
                        <AccordionItem key={subcategoria} value={subcategoria} className="border-none">
                          <AccordionTrigger className="text-left pl-4 font-medium py-2 hover:no-underline  border-gray-200">
                            <div className="flex items-center space-x-2">
                              <IconComponent className="h-5 w-5" />
                              <span className="text-sm text-gray-800">{subcategoria}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-0 pl-4">
                            <div className="space-y-0">
                              {data.options.map((opcao, optionIndex) => (
                                <div key={opcao} className={`flex items-center justify-between py-3 ${optionIndex !== data.options.length - 1 ? 'border-b border-gray-300' : ''}`}>
                                  <label
                                    htmlFor={opcao}
                                    className="text-sm text-gray-700 cursor-pointer flex-1 leading-relaxed"
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
                              ))}
                            </div>
                          </AccordionContent>
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