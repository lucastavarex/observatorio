"use client"

import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye, Info } from "lucide-react"
import { useState } from "react"
import { cityLayersConfig } from "../lib/city-layers"

interface CityLayersComparisonProps {
  selectedCity: string
  selectedLayer1: string | null
  selectedLayer2: string | null
  onLayer1Change: (layerId: string | null) => void
  onLayer2Change: (layerId: string | null) => void
  layerLoadingStates?: Record<string, 'loading' | 'loaded' | 'error'>
  layerOpacities?: Record<string, number>
  onOpacityChange?: (layerId: string, opacity: number) => void
}

export function CityLayersComparison({ 
  selectedCity, 
  selectedLayer1, 
  selectedLayer2, 
  onLayer1Change, 
  onLayer2Change, 
  layerLoadingStates = {}, 
  layerOpacities = {}, 
  onOpacityChange 
}: CityLayersComparisonProps) {
  const cityLayers = cityLayersConfig[selectedCity] || []
  const [localOpacities, setLocalOpacities] = useState<Record<string, number>>({})

  const handleLayerToggle = (layerId: string, checked: boolean, isLayer1: boolean) => {
    if (checked) {
      if (isLayer1) {
        // Se está selecionando na camada 1, remove da camada 2 se estiver lá
        if (selectedLayer2 === layerId) {
          onLayer2Change(null)
        }
        // Se já havia uma camada 1 selecionada, remove ela primeiro
        if (selectedLayer1 && selectedLayer1 !== layerId) {
          onLayer1Change(null)
          // Clean up local opacity when layer is disabled
          setLocalOpacities(prev => {
            const newState = { ...prev }
            delete newState[selectedLayer1]
            return newState
          })
        }
        onLayer1Change(layerId)
        // Set default opacity when layer is enabled
        const defaultOpacity = 80
        if (!(layerId in layerOpacities) && !(layerId in localOpacities)) {
          setLocalOpacities(prev => ({ ...prev, [layerId]: defaultOpacity }))
          onOpacityChange?.(layerId, defaultOpacity)
        }
      } else {
        // Se está selecionando na camada 2, remove da camada 1 se estiver lá
        if (selectedLayer1 === layerId) {
          onLayer1Change(null)
        }
        // Se já havia uma camada 2 selecionada, remove ela primeiro
        if (selectedLayer2 && selectedLayer2 !== layerId) {
          onLayer2Change(null)
          // Clean up local opacity when layer is disabled
          setLocalOpacities(prev => {
            const newState = { ...prev }
            delete newState[selectedLayer2]
            return newState
          })
        }
        onLayer2Change(layerId)
        // Set default opacity when layer is enabled
        const defaultOpacity = 80
        if (!(layerId in layerOpacities) && !(layerId in localOpacities)) {
          setLocalOpacities(prev => ({ ...prev, [layerId]: defaultOpacity }))
          onOpacityChange?.(layerId, defaultOpacity)
        }
      }
    } else {
      if (isLayer1) {
        onLayer1Change(null)
        // Clean up local opacity when layer is disabled
        setLocalOpacities(prev => {
          const newState = { ...prev }
          delete newState[layerId]
          return newState
        })
      } else {
        onLayer2Change(null)
        // Clean up local opacity when layer is disabled
        setLocalOpacities(prev => {
          const newState = { ...prev }
          delete newState[layerId]
          return newState
        })
      }
    }
  }

  const handleOpacityChange = (layerId: string, value: number[]) => {
    const opacity = value[0]
    setLocalOpacities(prev => ({ ...prev, [layerId]: opacity }))
    onOpacityChange?.(layerId, opacity)
  }

  // Get current opacity value (prioritize prop over local state)
  const getCurrentOpacity = (layerId: string) => {
    return layerOpacities[layerId] ?? localOpacities[layerId] ?? 80
  }

  if (cityLayers.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 text-md">Nenhuma camada disponível para esta cidade</p>
      </div>
    )
  }

  const renderLayerSection = (title: string, selectedLayer: string | null, onLayerChange: (layerId: string | null) => void, isLayer1: boolean) => (
    <div className="space-y-0">
      <div className="px-4 py-3 bg-gray-100 border-b">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      {cityLayers.map((layer, index) => {
        const isSelected = selectedLayer === layer.id
        
        return (
          <div key={`${isLayer1 ? 'layer1' : 'layer2'}-${layer.id}`}>
            <div className={`px-4 gap-4 flex items-center justify-between py-3 transition-colors ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'}`}>
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <label
                  htmlFor={`layer-${isLayer1 ? '1' : '2'}-${layer.id}`}
                  className="text-sm flex flex-row items-center gap-2 cursor-pointer text-black leading-relaxed"
                >
                  <div className="flex items-center gap-2">
                    <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-medium'}`}>{layer.name}</span>
                  </div>
                  {layer.description && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                          <Info className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p>{layer.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </label>
                {/* Opacity slider */}
                {isSelected && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600 font-medium">Opacidade</span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">
                        {getCurrentOpacity(layer.id)}%
                      </span>
                    </div>
                    <Slider
                      className="w-full"
                      value={[getCurrentOpacity(layer.id)]}
                      onValueChange={(value) => handleOpacityChange(layer.id, value)}
                      max={100}
                      step={1}
                      aria-label={`Ajustar opacidade da camada ${layer.name}`}
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Transparente</span>
                      <span>Opaco</span>
                    </div>
                  </div>
                )}
                
              </div>
              <Switch
                className="cursor-pointer flex-shrink-0 ml-2"
                id={`layer-${isLayer1 ? '1' : '2'}-${layer.id}`}
                checked={isSelected}
                onCheckedChange={(checked) => handleLayerToggle(layer.id, checked, isLayer1)}
                disabled={layerLoadingStates[layer.id] === 'loading'}
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

  return (
    <div className="space-y-0">
      {renderLayerSection("Camada 1", selectedLayer1, onLayer1Change, true)}
      <div className="h-4"></div>
      {renderLayerSection("Camada 2", selectedLayer2, onLayer2Change, false)}
    </div>
  )
}
