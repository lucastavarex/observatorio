"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { useState } from "react"
import { MapLegend } from "./map-legend"

interface CollapsibleLegendProps {
  selectedLayers: string[]
  selectedCity: string
  cityLayersConfig: Record<string, Array<{
    id: string
    name: string
    description?: string
    layerType?: 'fill' | 'line' | 'circle' | 'symbol'
    hasCustomStyle?: boolean
  }>>
}

export function CollapsibleLegend({ selectedLayers, selectedCity, cityLayersConfig }: CollapsibleLegendProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (selectedLayers.length === 0) {
    return null
  }

  return (
    <div className="top-20 right-4 absolute z-10">
      {isCollapsed ? (
        // Collapsed state - just the button
        <Button
          onClick={toggleCollapse}
          variant="outline"
          size="sm"
          className="bg-white shadow-xl hover:bg-gray-50 border-gray-200"
        >
          <Info className="w-4 h-4 mr-2" />
          Legenda
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      ) : (
         // Expanded state - full legend box
         <div className="h-auto max-h-[calc(100vh-220px)] overflow-y-auto w-60 bg-white rounded-lg shadow-xl p-4">
           <div className="flex items-center justify-between mb-4">
             <h3 
               className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors"
               onClick={toggleCollapse}
             >
               Legenda
             </h3>
             <Button
               onClick={toggleCollapse}
               variant="ghost"
               size="sm"
               className="h-8 w-8 p-0 hover:bg-gray-100"
             >
               <ChevronUp className="w-4 h-4" />
             </Button>
           </div>
          <MapLegend 
            selectedLayers={selectedLayers}
            selectedCity={selectedCity}
            cityLayersConfig={cityLayersConfig}
          />
        </div>
      )}
    </div>
  )
}
