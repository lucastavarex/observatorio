"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { cityLayersConfig } from "../lib/city-layers"

interface CityLayersProps {
  selectedCity: string
  selectedLayers: string[]
  onLayersChange: (layers: string[]) => void
}

export function CityLayers({ selectedCity, selectedLayers, onLayersChange }: CityLayersProps) {
  const cityLayers = cityLayersConfig[selectedCity] || []

  const handleLayerToggle = (layerId: string, checked: boolean) => {
    if (checked) {
      onLayersChange([...selectedLayers, layerId])
    } else {
      onLayersChange(selectedLayers.filter(id => id !== layerId))
    }
  }

  if (cityLayers.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 text-md">Nenhuma camada disponível para esta cidade</p>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {cityLayers.map((layer, index) => {
        const isSelected = selectedLayers.includes(layer.id)
        
        return (
          <div key={layer.id}>
            <div className={`px-4 gap-4 flex items-center justify-between py-3 transition-colors ${isSelected ? 'bg-gray-50 border-l-4 border-l-gray-500' : 'hover:bg-gray-50'}`}>
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={`layer-${layer.id}`}
                  className="text-sm cursor-pointer text-black leading-relaxed block"
                >
                  <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-medium'}`}>{layer.name}</span>
                  {layer.description && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="mt-1 rounded-full text-xs inline-flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Info
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p>{layer.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </label>
              </div>
              <Switch
                className="cursor-pointer flex-shrink-0 ml-2"
                id={`layer-${layer.id}`}
                checked={isSelected}
                onCheckedChange={(checked) => handleLayerToggle(layer.id, checked)}
              />
            </div>
            {index !== cityLayers.length - 1 && (
              <div className="h-[0.5px] w-full bg-gray-300"/>
            )}
          </div>
        )
      })}
    </div>
  )
}
