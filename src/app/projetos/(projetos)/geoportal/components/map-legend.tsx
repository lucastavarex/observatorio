"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LegendItem {
  color: string
  label: string
  value?: string | number
}

interface LayerLegendProps {
  layerId: string
  layerName: string
  layerType: 'fill' | 'line' | 'circle' | 'symbol'
  hasCustomStyle: boolean
  description?: string
}

// Legend configurations for different layer types and specific layers
const getLegendConfig = (layerId: string, layerType: string, hasCustomStyle: boolean): LegendItem[] => {
  if (!hasCustomStyle) {
    // Default legend for layers without custom styles
    const defaultColors = {
      fill: '#007cbf',
      line: '#007cbf', 
      circle: '#007cbf',
      symbol: '#007cbf'
    }
    
    return [
      { 
        color: defaultColors[layerType as keyof typeof defaultColors] || '#007cbf', 
        label: 'Dados disponíveis', 
        value: 'Ativo' 
      }
    ]
  }

  // Custom legends for specific layers
  switch (layerId) {
    case 'density':
      return [
        { color: 'hsl(180, 67%, 94%)', label: 'Muito baixa', value: '0-0.02' },
        { color: 'hsl(182, 42%, 83%)', label: 'Baixa', value: '0.02-0.03' },
        { color: '#9ed0d2', label: 'Média-baixa', value: '0.03-0.04' },
        { color: '#78bcbf', label: 'Média', value: '0.04-0.05' },
        { color: '#4ea7ad', label: 'Média-alta', value: '0.05-0.1' },
        { color: '#00939c', label: 'Alta', value: '0.1+' }
      ]
    
    case 'geoses':
      return [
        { color: '#f72626', label: 'Muito baixo', value: '-1 a -0.6' },
        { color: '#f4590b', label: 'Baixo', value: '-0.6 a -0.5' },
        { color: '#f79c2b', label: 'Médio-baixo', value: '-0.5 a -0.4' },
        { color: '#fda468', label: 'Médio', value: '-0.4 a -0.3' },
        { color: '#fdd087', label: 'Médio-alto', value: '-0.3 a -0.2' },
        { color: '#feead2', label: 'Alto', value: '-0.2 a 0' },
        { color: '#b8fefb', label: 'Muito alto', value: '0 a 0.2' },
        { color: '#a5f9fe', label: 'Excelente', value: '0.2 a 0.5' },
        { color: '#3fe7fd', label: 'Excepcional', value: '0.5+' }
      ]
    
    // Add more specific legends for other layers as needed
    case 'census-iptu':
      return [
        { color: '#e3f2fd', label: 'Baixo valor', value: '0-50k' },
        { color: '#bbdefb', label: 'Médio-baixo', value: '50k-100k' },
        { color: '#90caf9', label: 'Médio', value: '100k-200k' },
        { color: '#64b5f6', label: 'Médio-alto', value: '200k-500k' },
        { color: '#42a5f5', label: 'Alto', value: '500k+' }
      ]
    
    case 'census':
      return [
        { color: '#f3e5f5', label: 'Baixa densidade', value: '0-1000' },
        { color: '#e1bee7', label: 'Média-baixa', value: '1000-5000' },
        { color: '#ce93d8', label: 'Média', value: '5000-10000' },
        { color: '#ba68c8', label: 'Média-alta', value: '10000-20000' },
        { color: '#ab47bc', label: 'Alta', value: '20000+' }
      ]
    
    case 'ubs-expenses':
      return [
        { color: '#e8f5e8', label: 'Baixo gasto', value: '0-1M' },
        { color: '#c8e6c9', label: 'Médio-baixo', value: '1M-2M' },
        { color: '#a5d6a7', label: 'Médio', value: '2M-5M' },
        { color: '#81c784', label: 'Médio-alto', value: '5M-10M' },
        { color: '#4caf50', label: 'Alto', value: '10M+' }
      ]
    
    case 'deaths':
      return [
        { color: '#ffebee', label: 'Baixa mortalidade', value: '0-100' },
        { color: '#ffcdd2', label: 'Média-baixa', value: '100-200' },
        { color: '#ef9a9a', label: 'Média', value: '200-500' },
        { color: '#e57373', label: 'Média-alta', value: '500-1000' },
        { color: '#f44336', label: 'Alta', value: '1000+' }
      ]
    
    case 'population-districts':
      return [
        { color: '#fff3e0', label: 'Baixa população', value: '0-50k' },
        { color: '#ffe0b2', label: 'Média-baixa', value: '50k-100k' },
        { color: '#ffcc80', label: 'Média', value: '100k-200k' },
        { color: '#ffb74d', label: 'Média-alta', value: '200k-500k' },
        { color: '#ff9800', label: 'Alta', value: '500k+' }
      ]
    
    default:
      return [
        { color: '#007cbf', label: 'Dados disponíveis', value: 'Ativo' }
      ]
  }
}

export function LayerLegend({ layerId, layerName, layerType, hasCustomStyle, description }: LayerLegendProps) {
  const legendItems = getLegendConfig(layerId, layerType, hasCustomStyle)

  return (
    <Card className="mb-3 border-none shadow-none">
      <CardHeader className="pb-2 p-0!">
        <CardTitle className="text-sm flex items-center gap-2">
          {layerName}
        </CardTitle>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-2 p-0!">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className={`flex-shrink-0 ${
                layerType === 'line' ? 'w-6 h-0.5' : 
                layerType === 'circle' ? 'w-4 h-4 rounded-full' :
                'w-4 h-4 rounded-sm'
              }`}
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-gray-700">
                {item.label}
              </span>
              {item.value && (
                <Badge variant="outline" className="ml-2 text-xs">
                  {item.value}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

interface MapLegendProps {
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

export function MapLegend({ selectedLayers, selectedCity, cityLayersConfig }: MapLegendProps) {
  const cityLayers = cityLayersConfig[selectedCity] || []
  const enabledLayers = cityLayers.filter(layer => 
    selectedLayers.includes(layer.id) && layer.layerType
  )

  if (enabledLayers.length === 0) {
    return null
  }

  return (
    <div className="space-y-0">
      {enabledLayers.map((layer) => (
        <LayerLegend
          key={layer.id}
          layerId={layer.id}
          layerName={layer.name}
          layerType={layer.layerType || 'fill'}
          hasCustomStyle={layer.hasCustomStyle || false}
          description={layer.description}
        />
      ))}
    </div>
  )
}
