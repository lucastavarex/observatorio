import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import React from "react"
import { FilterSearch } from "../../components/filter-search"
import { getAvailableVariables, getVariableCityFillPercentage } from "../../lib/pemob-data"

interface VariablesFilterProps {
  selectedVariables: string[]
  onVariablesChange: (variables: string[]) => void
  year?: number
}

export function VariablesFilter({ selectedVariables, onVariablesChange, year }: VariablesFilterProps) {
  const [searchFilter, setSearchFilter] = React.useState("")
  const [availableVariables, setAvailableVariables] = React.useState<string[]>([])

  // Load variables data
  React.useEffect(() => {
    const variables = getAvailableVariables(year)
    // Filter out any null, undefined, or non-string values
    const validVariables = variables.filter(variable => 
      variable && typeof variable === 'string' && variable.trim() !== ''
    )
    setAvailableVariables(validVariables)
  }, [year])

  // Filter variables based on search
  const filteredVariables = React.useMemo(() => {
    if (!searchFilter || typeof searchFilter !== 'string' || !searchFilter.trim()) {
      // Sort by fill percentage (highest to lowest) when no search filter
      return availableVariables
        .map(variable => ({
          name: variable,
          fillPercentage: getVariableCityFillPercentage(variable, year)
        }))
        .sort((a, b) => (b.fillPercentage || 0) - (a.fillPercentage || 0))
        .map(item => item.name)
    }
    
    const searchTerm = searchFilter.toLowerCase().trim()
    const filtered = availableVariables.filter(variable =>
      variable && typeof variable === 'string' && variable.toLowerCase().includes(searchTerm)
    )
    
    // Sort filtered results by fill percentage (highest to lowest)
    return filtered
      .map(variable => ({
        name: variable,
        fillPercentage: getVariableCityFillPercentage(variable, year)
      }))
      .sort((a, b) => (b.fillPercentage || 0) - (a.fillPercentage || 0))
      .map(item => item.name)
  }, [searchFilter, availableVariables, year])

  const handleVariableToggle = (variableName: string, checked: boolean) => {
    if (checked) {
      // Add variable if we haven't reached the limit (max 5)
      if (selectedVariables.length < 5) {
        onVariablesChange([...selectedVariables, variableName])
      }
    } else {
      // Prevent removing when at minimum (3 variables required)
      if (selectedVariables.length > 3) {
        onVariablesChange(selectedVariables.filter(variable => variable !== variableName))
      }
    }
  }

  return (
    <aside className="w-full">
      <div className="space-y-3">
        {/* Header */}
        <div className="pb-3 p-4">
          <h2 className="text-xl font-bold text-gray-900">Selecione as variáveis</h2>
          <p className="text-md text-gray-600">Escolha entre 3 e 5 variáveis</p>
        </div>

        {/* Search */}
        <FilterSearch 
          searchFilter={searchFilter}
          placeholder="Buscar por variável..."
          onSearchChange={setSearchFilter}
        />
        
        <div className="h-[0.5px] w-full bg-gray-300"/>

        {/* Variables List */}
        <div className="w-full -mt-2">
          {filteredVariables.length === 0 && searchFilter ? (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500 text-md">Nenhum resultado encontrado</p>
            </div>
          ) : (
            filteredVariables.map((variable, index) => {
              // Skip invalid variables
              if (!variable || typeof variable !== 'string') {
                return null
              }
              
              // Ensure variable is valid before calling getVariableCityFillPercentage
              const fillPercentage = getVariableCityFillPercentage(variable, year)
              const isSelected = selectedVariables.includes(variable)
              const isAtMinimum = isSelected && selectedVariables.length === 3
              
              return (
                <React.Fragment key={variable}>
                  <div className="px-4 gap-4 flex items-center justify-between py-5">
                    <label
                      htmlFor={`variable-${variable}`}
                      className="text-sm cursor-pointer text-black flex-1 leading-relaxed"
                    >
                      {variable}
                      <Badge variant="secondary" className="ml-2 rounded-full text-xs">
                        <Tooltip>
                          <TooltipTrigger>
                            {fillPercentage}%
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <div className="flex items-center gap-2">
                              <InfoIcon className="w-4 h-4" />
                              <p>Porcentagem de cidades que <br/> preencheram esta variável</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </Badge>
                    </label>
                    <Switch
                      className={`cursor-pointer ${isAtMinimum ? 'opacity-60' : ''}`}
                      id={`variable-${variable}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => handleVariableToggle(variable, checked)}
                      disabled={isAtMinimum}
                    />
                  </div>
                  {index !== filteredVariables.length - 1 && (
                    <div className="h-[0.5px] w-full bg-gray-300"/>
                  )}
                </React.Fragment>
              )
            })
          )}
        </div>
      </div>
    </aside>
  )
} 