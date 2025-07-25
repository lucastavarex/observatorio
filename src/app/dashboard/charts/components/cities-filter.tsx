import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import React from "react"
import { FilterSearch } from "../../components/filter-search"
import { getPEMOBCities, searchPEMOBCities } from "../../lib/pemob-data"

interface CitiesFilterProps {
  selectedCities: string[]
  onCitiesChange: (cities: string[]) => void
}

export function CitiesFilter({ selectedCities, onCitiesChange }: CitiesFilterProps) {
  const [searchFilter, setSearchFilter] = React.useState("")
  const [availableCities, setAvailableCities] = React.useState<string[]>([])

  // Load cities data
  React.useEffect(() => {
    const cities = getPEMOBCities()
    setAvailableCities(cities)
  }, [])

  // Filter cities based on search
  const filteredCities = React.useMemo(() => {
    if (!searchFilter.trim()) return availableCities
    return searchPEMOBCities(searchFilter)
  }, [searchFilter, availableCities])

  const handleCityToggle = (cityName: string, checked: boolean) => {
    if (checked) {
      // Add city if we haven't reached the limit (max 5)
      if (selectedCities.length < 5) {
        onCitiesChange([...selectedCities, cityName])
      }
    } else {
      // Remove city
      onCitiesChange(selectedCities.filter(city => city !== cityName))
    }
  }

  return (
    <aside className="w-full">
      <div className="space-y-3">
        {/* Header */}
        <div className="space-y-2 pb-3 p-4">
          <h2 className="text-xl font-bold text-gray-900">Selecione as cidades</h2>
          <p className="text-md text-gray-600">Escolha entre 1 e 5 cidades</p>
        </div>

        {/* Search */}
        <FilterSearch
          searchFilter={searchFilter}
          placeholder="Buscar por cidade ..."
          onSearchChange={setSearchFilter}
        />
        
        <div className="h-[0.5px] w-full bg-gray-300"/>

        {/* Cities List */}
        <div className="w-full -mt-2">
          {filteredCities.length === 0 && searchFilter ? (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500 text-md">Nenhum resultado encontrado</p>
            </div>
          ) : (
            filteredCities.map((city, index) => (
              <React.Fragment key={city}>
                <div className="px-4 gap-4 flex items-center justify-between py-5">
                  <label
                    htmlFor={`city-${city}`}
                    className="text-sm cursor-pointer text-black flex-1 leading-relaxed"
                  >
                    {city}
                    <Badge variant="secondary" className="ml-2 rounded-full text-xs">
                    <Tooltip>
                      <TooltipTrigger>
                        50%
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div className="flex items-center gap-2">
                          <InfoIcon className="w-4 h-4" />
                          <p>Porcentagem de variáveis <br/> preenchidas por esta cidade</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                    </Badge>
                  </label>
                  <Switch
                    className="cursor-pointer"
                    id={`city-${city}`}
                    checked={selectedCities.includes(city)}
                    onCheckedChange={(checked) => handleCityToggle(city, checked)}
                  />
                </div>
                {index !== filteredCities.length - 1 && (
                  <div className="h-[0.5px] w-full bg-gray-300"/>
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </aside>
  )
} 