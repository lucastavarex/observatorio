"use client"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useRef, useState } from "react"
import { cityLayersConfig } from "../lib/city-layers"
import { CityCombobox } from "./city-combobox"
import { CityLayers } from "./city-layers"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const cityCoordinates: Record<string, [number, number]> = {
  "São Paulo": [-46.6388, -23.5505],
  "Rio de Janeiro": [-43.43852, -22.91464],
  "Belo Horizonte": [-43.9388, -19.9167],
  "Niteroi": [-43.12084, -22.89277],
  "Santo André": [-46.19209, -23.67494],
  "Salvador": [-38.51101, -12.97162],
  "Porto Alegre": [-51.2177, -30.0326],
}

export default function PropertyMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [zoom] = useState(10.5)
  const [selectedCity, setSelectedCity] = useState("São Paulo")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [layerLoadingStates, setLayerLoadingStates] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({})

  useEffect(() => {
    if (!mapContainer.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: cityCoordinates[selectedCity],
      zoom,
    })
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right")
    map.current.on('load', () => {
      setMapLoaded(true)
    })
    return () => map.current?.remove()
  }, [zoom])

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    // Reset selected layers when changing city
    setSelectedLayers([])
    
    // Remove all existing custom layers and sources when changing city
    if (map.current && mapLoaded) {
      const cityLayers = cityLayersConfig[city] || []
      cityLayers.forEach(layer => {
        if (layer.tilesetId && map.current?.getLayer(layer.id)) {
          map.current.removeLayer(layer.id)
        }
        if (layer.tilesetId && map.current?.getSource(layer.id)) {
          map.current.removeSource(layer.id)
        }
      })
      // Reset loading states
      setLayerLoadingStates({})
    }
    
    if (map.current) {
      map.current.flyTo({
        center: cityCoordinates[city],
        zoom: 10.5,
        duration: 2000,
      })
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLayersChange = (layers: string[]) => {
    if (!map.current || !mapLoaded) return
    
    console.log('Handling layers change:', { previous: selectedLayers, new: layers, city: selectedCity })
    
    const cityLayers = cityLayersConfig[selectedCity] || []
    const previousLayers = selectedLayers
    const newLayers = layers
    
    // Remove layers that are no longer selected
    previousLayers.forEach(layerId => {
      if (!newLayers.includes(layerId)) {
        const layerConfig = cityLayers.find(l => l.id === layerId)
        if (layerConfig?.tilesetId) {
          console.log(`Removing layer: ${layerId}`)
          if (map.current?.getLayer(layerId)) {
            map.current.removeLayer(layerId)
          }
          if (map.current?.getSource(layerId)) {
            map.current.removeSource(layerId)
          }
          // Update loading state
          setLayerLoadingStates(prev => {
            const newState = { ...prev }
            delete newState[layerId]
            return newState
          })
        }
      }
    })
    
    // Add new layers that are now selected
    newLayers.forEach(layerId => {
      if (!previousLayers.includes(layerId)) {
        const layerConfig = cityLayers.find(l => l.id === layerId)
        if (layerConfig?.tilesetId && layerConfig?.sourceLayer) {
          console.log(`Adding layer: ${layerId}`, { tilesetId: layerConfig.tilesetId, sourceLayer: layerConfig.sourceLayer })
          
          // Set loading state
          setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'loading' }))
          
          try {
            // Add source
            map.current!.addSource(layerId, {
              type: 'vector',
              url: `mapbox://${layerConfig.tilesetId}`
            })
            
            // Add layer
            const layerType = layerConfig.layerType || 'fill'
            const paint = layerType === 'fill' ? {
              'fill-color': '#007cbf',
              'fill-opacity': 0.7,
              'fill-outline-color': '#000',
              'fill-outline-width': 1
            } : {}
            
            map.current!.addLayer({
              id: layerId,
              type: layerType,
              source: layerId,
              'source-layer': layerConfig.sourceLayer,
              layout: {
                visibility: 'visible'
              },
              paint
            })
            
            console.log(`Successfully added layer: ${layerId}`)
            
            // Set loaded state
            setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'loaded' }))
            
            // Note: Error handling can be enhanced with proper event listeners when needed
            
          } catch (error) {
            console.error(`Error adding layer ${layerId}:`, error)
            setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'error' }))
          }
        }
      }
    })
    
    setSelectedLayers(layers)
  }

  return (
    <div className="relative w-full h-screen min-h-lvh">
      <div ref={mapContainer} className="w-full h-full" />

      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 left-4 z-20 md:hidden bg-white shadow-lg h-12 w-12 mr-2"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div className="absolute top-4 right-4 z-10 w-60 md:w-60 max-md:left-20 max-md:right-4 max-md:w-auto">
        <CityCombobox value={selectedCity} onValueChange={handleCityChange} placeholder="Selecionar cidade..." />
      </div>

      <div
        className={`absolute bg-white top-6 left-6 z-10 w-80 rounded-lg lg:min-h-[calc(100vh-48px)] shadow-lg transition-transform duration-300 ease-in-out
          max-md:top-20 max-md:left-4 max-md:right-4 max-md:w-auto max-md:max-h-[calc(100vh-48px)]
          ${isMenuOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full max-md:opacity-0"}
          md:translate-x-0 md:opacity-100
        `}
      >
        <div className="p-4 border-b md:hidden">
          <h2 className="text-lg font-semibold">Selecione as camadas</h2>
        </div>

        <div className="flex flex-col h-full">
          <div className="md:p-4">
            <h2 className="text-xl font-bold text-gray-900 hidden md:block">Selecione as camadas</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <CityLayers
              selectedCity={selectedCity}
              selectedLayers={selectedLayers}
              onLayersChange={handleLayersChange}
              layerLoadingStates={layerLoadingStates}
            />
          </div>
        </div>
      </div>

      {isMenuOpen && <div className="fixed inset-0 bg-opacity-50 z-5 md:hidden" onClick={toggleMenu} />}
    </div>
  )
}
