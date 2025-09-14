"use client"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeftIcon, Compass, Layers, Menu, Minus, Plus, X } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { cityLayersConfig } from "../lib/city-layers"
import { createStyledLayer } from "../lib/layer-styles"
import { CityCombobox } from "./city-combobox"
import { CityLayers } from "./city-layers"
import { CityLayersComparison } from "./city-layers-comparison"
import { CollapsibleLegend } from "./collapsible-legend"

// Dynamic import for mapbox-gl-compare to avoid SSR issues
type MapboxCompareInstance = {
  setSlider: (slider: number) => void
  on: (event: string, callback: () => void) => void
  off: (event: string, callback: () => void) => void
  remove: () => void
}

let mapboxglCompare: (new (
  before: mapboxgl.Map,
  after: mapboxgl.Map,
  container: HTMLElement,
  options?: { orientation?: 'vertical' | 'horizontal'; mousemove?: boolean; touchmove?: boolean }
) => MapboxCompareInstance) | null = null
if (typeof window !== 'undefined') {
  import('mapbox-gl-compare').then(module => {
    mapboxglCompare = module.default
  })
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// Helper function to create default layer configuration
function createDefaultLayerConfig(layerId: string, layerConfig: { layerType?: 'fill' | 'line' | 'circle' | 'symbol'; sourceLayer: string }): mapboxgl.AnyLayer {
  const layerType = layerConfig.layerType || 'fill'
  const defaultOpacity = 0.8 // 80% opacity as default
  
  let paint: Record<string, unknown> = {}
  
  if (layerType === 'fill') {
    paint = {
      'fill-color': '#007cbf',
      'fill-opacity': defaultOpacity,
      'fill-outline-color': '#000',
      'fill-outline-width': 1
    }
  } else if (layerType === 'line') {
    paint = {
      'line-color': '#007cbf',
      'line-opacity': defaultOpacity,
      'line-width': 2
    }
  } else if (layerType === 'circle') {
    paint = {
      'circle-color': '#007cbf',
      'circle-opacity': defaultOpacity,
      'circle-radius': 5
    }
  } else if (layerType === 'symbol') {
    paint = {
      'text-color': '#007cbf',
      'text-opacity': defaultOpacity,
      'icon-opacity': defaultOpacity
    }
  }
  
  return {
    id: layerId,
    type: layerType as 'fill' | 'line' | 'circle' | 'symbol',
    source: layerId,
    'source-layer': layerConfig.sourceLayer,
    layout: {
      visibility: 'visible'
    },
    paint
  } as mapboxgl.AnyLayer
}

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
  const router = useRouter()
  const mapContainer = useRef<HTMLDivElement>(null)
  const beforeMapContainer = useRef<HTMLDivElement>(null)
  const afterMapContainer = useRef<HTMLDivElement>(null)
  const comparisonContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const beforeMap = useRef<mapboxgl.Map | null>(null)
  const afterMap = useRef<mapboxgl.Map | null>(null)
  const compare = useRef<MapboxCompareInstance | null>(null)
  const [zoom] = useState(10.5)
  const [selectedCity, setSelectedCity] = useState("São Paulo")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [isComparisonMode, setIsComparisonMode] = useState(false)
  const [selectedLayer1, setSelectedLayer1] = useState<string | null>(null)
  const [selectedLayer2, setSelectedLayer2] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [layerLoadingStates, setLayerLoadingStates] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({})
  const [layerOpacities, setLayerOpacities] = useState<Record<string, number>>({})
  const [, setHoveredFeature] = useState<{
    feature: mapboxgl.MapboxGeoJSONFeature
    layerName: string
    coordinates: [number, number]
  } | null>(null)
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  const eventHandlersRef = useRef<Map<string, { mouseenter: () => void; mouseleave: () => void; mousemove: (e: mapboxgl.MapLayerMouseEvent) => void }>>(new Map())
  
  // Function to add hover handlers for a layer
  const addHoverHandlers = (layerId: string, layerName: string, targetMap?: mapboxgl.Map) => {
    const mapInstance = targetMap || map.current
    if (!mapInstance) return

    // Create event handler functions
    const mouseenterHandler = () => {
      if (mapInstance) {
        mapInstance.getCanvas().style.cursor = 'pointer'
      }
    }

    const mouseleaveHandler = () => {
      if (mapInstance) {
        mapInstance.getCanvas().style.cursor = ''
      }
      // Remove popup when mouse leaves
      if (popupRef.current) {
        popupRef.current.remove()
        popupRef.current = null
      }
      setHoveredFeature(null)
    }

    const mousemoveHandler = (e: mapboxgl.MapLayerMouseEvent) => {
      if (!mapInstance || !e.features || e.features.length === 0) return

      const feature = e.features[0]
      const coordinates = e.lngLat.toArray() as [number, number]

      // Remove existing popup
      if (popupRef.current) {
        popupRef.current.remove()
      }

      // Create new popup
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '400px'
      })

      // Create popup content
      const popupContent = document.createElement('div')
      popupContent.innerHTML = `
        <div class="p-2 min-w-50">
          <h3 class="font-semibold text-sm mb-2">${layerName}</h3>
          <div class="space-y-1 overflow-y-auto">
            ${Object.entries(feature.properties || {})
              .filter(([key, value]) => {
                const excludeKeys = ['id', 'geometry', 'type', 'coordinates']
                return !excludeKeys.includes(key.toLowerCase()) && 
                       value !== null && 
                       value !== undefined &&
                       value !== ''
              })
              .slice(0, 8)
              .map(([key, value]) => {
                const formattedValue = typeof value === 'number' 
                  ? (Number.isInteger(value) ? value.toLocaleString() : value.toFixed(2))
                  : String(value)
                return `
                  <div class="flex justify-between items-center text-xs">
                    <span class="font-medium text-gray-600 capitalize">${key.replace(/_/g, ' ')}:</span>
                    <span class="bg-gray-100 px-2 py-1 rounded text-gray-800">${formattedValue}</span>
                  </div>
                `
              }).join('')}
          </div>
        </div>
      `

      popup.setLngLat(coordinates)
        .setDOMContent(popupContent)
        .addTo(mapInstance)

      popupRef.current = popup
      setHoveredFeature({ feature, layerName, coordinates })
    }

    // Store handlers for later removal
    eventHandlersRef.current.set(layerId, {
      mouseenter: mouseenterHandler,
      mouseleave: mouseleaveHandler,
      mousemove: mousemoveHandler
    })

    // Add event listeners
    mapInstance.on('mouseenter', layerId, mouseenterHandler)
    mapInstance.on('mouseleave', layerId, mouseleaveHandler)
    mapInstance.on('mousemove', layerId, mousemoveHandler)
  }

  // Function to remove hover handlers for a layer
  const removeHoverHandlers = (layerId: string, targetMap?: mapboxgl.Map) => {
    const mapInstance = targetMap || map.current
    if (!mapInstance) return

    const handlers = eventHandlersRef.current.get(layerId)
    if (handlers) {
      // Remove event listeners using the stored handler functions
      mapInstance.off('mouseenter', layerId, handlers.mouseenter)
      mapInstance.off('mouseleave', layerId, handlers.mouseleave)
      mapInstance.off('mousemove', layerId, handlers.mousemove)
      
      // Remove from stored handlers
      eventHandlersRef.current.delete(layerId)
    }
  }

  // Function to update layer opacity
  const updateLayerOpacity = (layerId: string, opacity: number, targetMap?: mapboxgl.Map) => {
    const mapInstance = targetMap || map.current
    if (!mapInstance || !mapInstance.getLayer(layerId)) return

    const layer = mapInstance.getLayer(layerId)
    if (!layer) return

    const opacityValue = opacity / 100 // Convert percentage to 0-1 range

    try {
      // Update fill-opacity for fill layers
      if (layer.type === 'fill') {
        mapInstance.setPaintProperty(layerId, 'fill-opacity', opacityValue)
      }
      // Update line-opacity for line layers
      else if (layer.type === 'line') {
        mapInstance.setPaintProperty(layerId, 'line-opacity', opacityValue)
      }
      // Update circle-opacity for circle layers
      else if (layer.type === 'circle') {
        mapInstance.setPaintProperty(layerId, 'circle-opacity', opacityValue)
      }
      // Update text-opacity for symbol layers
      else if (layer.type === 'symbol') {
        mapInstance.setPaintProperty(layerId, 'text-opacity', opacityValue)
        mapInstance.setPaintProperty(layerId, 'icon-opacity', opacityValue)
      }
      
      console.log(`Updated opacity for layer ${layerId} to ${opacity}%`)
    } catch (error) {
      console.error(`Error updating opacity for layer ${layerId}:`, error)
    }
  }

  // Function to handle opacity changes
  const handleOpacityChange = (layerId: string, opacity: number) => {
    console.log(`handleOpacityChange called: layerId=${layerId}, opacity=${opacity}, isComparisonMode=${isComparisonMode}`)
    setLayerOpacities(prev => ({ ...prev, [layerId]: opacity }))
    
    if (isComparisonMode) {
      // In comparison mode, update opacity on the map that contains the layer
      if (beforeMap.current && beforeMap.current.getLayer(layerId)) {
        console.log(`Updating opacity for layer ${layerId} on beforeMap`)
        updateLayerOpacity(layerId, opacity, beforeMap.current)
      }
      if (afterMap.current && afterMap.current.getLayer(layerId)) {
        console.log(`Updating opacity for layer ${layerId} on afterMap`)
        updateLayerOpacity(layerId, opacity, afterMap.current)
      }
    } else {
      // In normal mode, update opacity on the main map
      updateLayerOpacity(layerId, opacity)
    }
  }

  // Zoom in functionality
  const handleZoomIn = () => {
    if (isComparisonMode) {
      if (beforeMap.current) {
        beforeMap.current.zoomIn()
      }
      if (afterMap.current) {
        afterMap.current.zoomIn()
      }
    } else {
      if (map.current) {
        map.current.zoomIn()
      }
    }
  }

  // Zoom out functionality
  const handleZoomOut = () => {
    if (isComparisonMode) {
      if (beforeMap.current) {
        beforeMap.current.zoomOut()
      }
      if (afterMap.current) {
        afterMap.current.zoomOut()
      }
    } else {
      if (map.current) {
        map.current.zoomOut()
      }
    }
  }

  // Recenter map functionality
  const handleRecenter = () => {
    const center = cityCoordinates[selectedCity]
    const zoomLevel = 10.5
    const pitch = 0 // Reset to flat view
    const bearing = 0 // Reset to north-up orientation
    
    if (isComparisonMode) {
      if (beforeMap.current) {
        beforeMap.current.flyTo({
          center,
          zoom: zoomLevel,
          pitch,
          bearing,
          duration: 2000,
        })
      }
      if (afterMap.current) {
        afterMap.current.flyTo({
          center,
          zoom: zoomLevel,
          pitch,
          bearing,
          duration: 2000,
        })
      }
    } else {
      if (map.current) {
        map.current.flyTo({
          center,
          zoom: zoomLevel,
          pitch,
          bearing,
          duration: 2000,
        })
      }
    }
  }

  // Initialize single map
  useEffect(() => {
    if (!mapContainer.current || isComparisonMode) return
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: cityCoordinates[selectedCity],
      zoom,
    })
    map.current.on('load', () => {
      setMapLoaded(true)
    })
    
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [zoom, selectedCity, isComparisonMode])

  // Initialize comparison maps
  useEffect(() => {
    if (!isComparisonMode || !beforeMapContainer.current || !afterMapContainer.current || !comparisonContainer.current) return

    // Clean up existing maps
    if (beforeMap.current) beforeMap.current.remove()
    if (afterMap.current) afterMap.current.remove()
    if (compare.current) compare.current.remove()

    beforeMap.current = new mapboxgl.Map({
      container: beforeMapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: cityCoordinates[selectedCity],
      zoom,
    })

    afterMap.current = new mapboxgl.Map({
      container: afterMapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: cityCoordinates[selectedCity],
      zoom,
    })

    // Initialize comparison with dynamic import
    const initializeComparison = async () => {
      if (!mapboxglCompare) {
        const compareModule = await import('mapbox-gl-compare')
        mapboxglCompare = compareModule.default
      }
      
      const isMobile = window.innerWidth < 768 // md breakpoint
      compare.current = new mapboxglCompare(
        beforeMap.current!,
        afterMap.current!,
        comparisonContainer.current!,
        {
          orientation: isMobile ? 'horizontal' : 'vertical',
          // mousemove: true,
          // touchmove: true
        }
      )
    }

    initializeComparison()

    // Set map loaded when both maps are ready
    let mapsLoaded = 0
    const onMapLoad = () => {
      mapsLoaded++
      if (mapsLoaded === 2) {
        setMapLoaded(true)
      }
    }

    beforeMap.current.on('load', onMapLoad)
    afterMap.current.on('load', onMapLoad)

    // Handle window resize to update orientation
    const isMobile = window.innerWidth < 768 // md breakpoint
    let currentOrientation = isMobile ? 'horizontal' : 'vertical'
    const handleResize = async () => {
      if (compare.current) {
        const isMobileResize = window.innerWidth < 768
        const newOrientation = isMobileResize ? 'horizontal' : 'vertical'
        
        // Only update if orientation changed
        if (currentOrientation !== newOrientation) {
          currentOrientation = newOrientation
          compare.current.remove()
          
          // Ensure mapboxglCompare is loaded
          if (!mapboxglCompare) {
            const compareModule = await import('mapbox-gl-compare')
            mapboxglCompare = compareModule.default
          }
          
          compare.current = new mapboxglCompare(
            beforeMap.current!,
            afterMap.current!,
            comparisonContainer.current!,
            {
              orientation: newOrientation,
            }
          )
        }
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (compare.current) {
        compare.current.remove()
        compare.current = null
      }
      if (beforeMap.current) {
        beforeMap.current.remove()
        beforeMap.current = null
      }
      if (afterMap.current) {
        afterMap.current.remove()
        afterMap.current = null
      }
    }
  }, [zoom, selectedCity, isComparisonMode])

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    // Reset selected layers when changing city
    setSelectedLayers([])
    setSelectedLayer1(null)
    setSelectedLayer2(null)
    // Reset layer opacities when changing city
    setLayerOpacities({})
    
    // Clear all layers when changing city
    clearAllLayers()
    
    // Fly to new city on the appropriate map(s)
    if (isComparisonMode) {
      if (beforeMap.current) {
        beforeMap.current.flyTo({
          center: cityCoordinates[city],
          zoom: 10.5,
          duration: 2000,
        })
      }
      if (afterMap.current) {
        afterMap.current.flyTo({
          center: cityCoordinates[city],
          zoom: 10.5,
          duration: 2000,
        })
      }
    } else {
      if (map.current) {
        map.current.flyTo({
          center: cityCoordinates[city],
          zoom: 10.5,
          duration: 2000,
        })
      }
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleComparisonMode = () => {
    if (!isComparisonMode) {
      // Switching to comparison mode - clear all existing layers first
      clearAllLayers()
      setIsComparisonMode(true)
      setSelectedLayers([])
      setSelectedLayer1(null)
      setSelectedLayer2(null)
      setMapLoaded(false) // Reset map loaded state
      
      // Show success toast
      toast.success("Modo de Comparação Ativado", {
        description: "Selecione 2 camadas diferentes para comparação",
        duration: 4000,
      })
    } else {
      // Switching back to normal mode - clear comparison mode selections
      clearAllLayers()
      setIsComparisonMode(false)
      setSelectedLayer1(null)
      setSelectedLayer2(null)
      setSelectedLayers([])
      setMapLoaded(false) // Reset map loaded state
      
      // Show info toast
      toast.info("Modo de Comparação Desativado", {
        description: "Voltando ao modo normal de visualização",
        duration: 3000,
      })
    }
  }

  const clearAllLayers = () => {
    const cityLayers = cityLayersConfig[selectedCity] || []
    
    // Clear single map layers
    if (map.current && mapLoaded) {
      cityLayers.forEach(layer => {
        if (layer.tilesetId && map.current?.getLayer(layer.id)) {
          removeHoverHandlers(layer.id, map.current)
          map.current.removeLayer(layer.id)
        }
        if (layer.tilesetId && map.current?.getSource(layer.id)) {
          map.current.removeSource(layer.id)
        }
      })
    }
    
    // Clear comparison map layers
    if (beforeMap.current && afterMap.current && mapLoaded) {
      cityLayers.forEach(layer => {
        if (layer.tilesetId) {
          // Clear from before map
          if (beforeMap.current?.getLayer(layer.id)) {
            removeHoverHandlers(layer.id, beforeMap.current)
            beforeMap.current.removeLayer(layer.id)
          }
          if (beforeMap.current?.getSource(layer.id)) {
            beforeMap.current.removeSource(layer.id)
          }
          
          // Clear from after map
          if (afterMap.current?.getLayer(layer.id)) {
            removeHoverHandlers(layer.id, afterMap.current)
            afterMap.current.removeLayer(layer.id)
          }
          if (afterMap.current?.getSource(layer.id)) {
            afterMap.current.removeSource(layer.id)
          }
        }
      })
    }
    
    // Reset all states
    setLayerLoadingStates({})
    setLayerOpacities({})
    
    // Clear popup
    if (popupRef.current) {
      popupRef.current.remove()
      popupRef.current = null
    }
    setHoveredFeature(null)
  }

  const handleLayer1Change = (layerId: string | null) => {
    // Remove previous layer first if exists
    if (selectedLayer1 && beforeMap.current && afterMap.current && mapLoaded) {
      removeComparisonLayer(selectedLayer1)
    }
    
    setSelectedLayer1(layerId)
    
    // Add new layer if provided
    if (layerId) {
      handleComparisonLayerChange(layerId, true)
    }
  }

  const handleLayer2Change = (layerId: string | null) => {
    // Remove previous layer first if exists
    if (selectedLayer2 && beforeMap.current && afterMap.current && mapLoaded) {
      removeComparisonLayer(selectedLayer2)
    }
    
    setSelectedLayer2(layerId)
    
    // Add new layer if provided
    if (layerId) {
      handleComparisonLayerChange(layerId, false)
    }
  }

  const handleComparisonLayerChange = (layerId: string, isLayer1: boolean) => {
    if (!beforeMap.current || !afterMap.current || !mapLoaded) return
    
    const cityLayers = cityLayersConfig[selectedCity] || []
    const layerConfig = cityLayers.find(l => l.id === layerId)
    
    if (layerConfig?.tilesetId && layerConfig?.sourceLayer) {
      console.log(`Adding comparison layer: ${layerId}`, { isLayer1, tilesetId: layerConfig.tilesetId, sourceLayer: layerConfig.sourceLayer })
      
      // Set loading state
      setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'loading' }))
      
      try {
        // Determine target map
        const targetMap = isLayer1 ? beforeMap.current : afterMap.current
        
        // Add source
        targetMap!.addSource(layerId, {
          type: 'vector',
          url: `mapbox://${layerConfig.tilesetId}`
        })
        
        // Check if layer has custom style
        let layerConfigToAdd: mapboxgl.AnyLayer
        
        if (layerConfig.hasCustomStyle) {
          // Use custom style from Mapbox Studio
          const customStyle = createStyledLayer(layerId, layerConfig.sourceLayer, layerConfig.tilesetId)
          if (customStyle) {
            layerConfigToAdd = {
              ...customStyle,
              layout: {
                ...customStyle.layout,
                visibility: 'visible'
              }
            }
            console.log(`Using custom style for comparison layer: ${layerId}`)
          } else {
            // Fallback to default style if custom style not found
            layerConfigToAdd = createDefaultLayerConfig(layerId, { 
              layerType: layerConfig.layerType, 
              sourceLayer: layerConfig.sourceLayer 
            })
            console.log(`Custom style not found, using default for comparison layer: ${layerId}`)
          }
        } else {
          // Use default style
          layerConfigToAdd = createDefaultLayerConfig(layerId, { 
            layerType: layerConfig.layerType, 
            sourceLayer: layerConfig.sourceLayer 
          })
          console.log(`Using default style for comparison layer: ${layerId}`)
        }
        
        targetMap!.addLayer(layerConfigToAdd)
        
        // Add hover functionality for this layer
        addHoverHandlers(layerId, layerConfig.name, targetMap)
        
        // Set default opacity for the layer
        const defaultOpacity = 80
        setLayerOpacities(prev => ({ ...prev, [layerId]: defaultOpacity }))
        updateLayerOpacity(layerId, defaultOpacity, targetMap)
        
        console.log(`Successfully added comparison layer: ${layerId}`)
        
        // Set loaded state
        setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'loaded' }))
        
      } catch (error) {
        console.error(`Error adding comparison layer ${layerId}:`, error)
        setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'error' }))
      }
    }
  }

  const removeComparisonLayer = (layerId: string) => {
    if (!beforeMap.current || !afterMap.current || !mapLoaded) return

    const cityLayers = cityLayersConfig[selectedCity] || []
    const layerConfig = cityLayers.find(l => l.id === layerId)
    
    if (layerConfig?.tilesetId) {
      console.log(`Removing comparison layer: ${layerId}`)
      
      // Remove from both maps
      const mapsToClean = [beforeMap.current, afterMap.current]
      for (const mapInstance of mapsToClean) {
        if (mapInstance) {
          // Remove hover handlers first
          removeHoverHandlers(layerId, mapInstance)
          
          if (mapInstance.getLayer(layerId)) {
            mapInstance.removeLayer(layerId)
          }
          if (mapInstance.getSource(layerId)) {
            mapInstance.removeSource(layerId)
          }
        }
      }
      
      // Update loading state
      setLayerLoadingStates(prev => {
        const newState = { ...prev }
        delete newState[layerId]
        return newState
      })
      
      // Remove opacity
      setLayerOpacities(prev => {
        const newState = { ...prev }
        delete newState[layerId]
        return newState
      })
    }
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
          
          // Remove hover handlers first
          removeHoverHandlers(layerId, map.current!)
          
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
          // Remove opacity state
          setLayerOpacities(prev => {
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
            
            // Check if layer has custom style
            let layerConfigToAdd: mapboxgl.AnyLayer
            
            if (layerConfig.hasCustomStyle) {
              // Use custom style from Mapbox Studio
              const customStyle = createStyledLayer(layerId, layerConfig.sourceLayer, layerConfig.tilesetId)
              if (customStyle) {
                layerConfigToAdd = {
                  ...customStyle,
                  layout: {
                    ...customStyle.layout,
                    visibility: 'visible'
                  }
                }
                console.log(`Using custom style for layer: ${layerId}`)
              } else {
                // Fallback to default style if custom style not found
                layerConfigToAdd = createDefaultLayerConfig(layerId, { 
                  layerType: layerConfig.layerType, 
                  sourceLayer: layerConfig.sourceLayer 
                })
                console.log(`Custom style not found, using default for layer: ${layerId}`)
              }
            } else {
              // Use default style
              layerConfigToAdd = createDefaultLayerConfig(layerId, { 
                layerType: layerConfig.layerType, 
                sourceLayer: layerConfig.sourceLayer 
              })
              console.log(`Using default style for layer: ${layerId}`)
            }
            
            map.current!.addLayer(layerConfigToAdd)
            
            // Add hover functionality for this layer
            addHoverHandlers(layerId, layerConfig.name, map.current!)
            
            // Set default opacity for the layer
            const defaultOpacity = 80
            setLayerOpacities(prev => ({ ...prev, [layerId]: defaultOpacity }))
            updateLayerOpacity(layerId, defaultOpacity, map.current!)
            
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
      {isComparisonMode ? (
        <div 
          ref={comparisonContainer} 
          className="w-full h-full"
          style={{ position: 'relative' }}
        >
          <div 
            ref={beforeMapContainer} 
            className="w-full h-full"
            style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
          />
          <div 
            ref={afterMapContainer} 
            className="w-full h-full"
            style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
          />
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-full" />
      )}

      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 left-4 z-20 md:hidden bg-white shadow-lg h-12 w-12 mr-2"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div className="absolute top-4 right-4 z-10 w-60 md:w-60 max-md:left-20 max-md:right-4 max-md:w-auto shadow-xl">
        <CityCombobox value={selectedCity} onValueChange={handleCityChange} placeholder="Selecionar cidade..." />
      </div>

      <div
        className={`absolute bg-white top-6 left-6 z-20 overflow-y-auto! w-80 rounded-lg lg:min-h-[calc(100vh-48px)] max-h-[calc(100vh-48px)] shadow-lg transition-transform duration-300 ease-in-out
          max-md:top-20 max-md:left-4 max-md:right-4 max-md:w-auto max-md:max-h-[calc(100vh-100px)]
          ${isMenuOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full max-md:opacity-0"}
          md:translate-x-0 md:opacity-100
        `}
      >
        <div className="p-4 border-b md:hidden">
          <h2 className="text-lg font-semibold">Selecione as camadas</h2>
        </div>

        <div className="flex flex-col h-full">
          <div className="md:p-4">
          <button className="z-20 pb-4 pt-2 hover:cursor-pointer text-sm mr-2 bg-transparent p-0 flex flex-row items-center gap-2" onClick={() => router.back()}><ChevronLeftIcon className="w-5 h-5" /> Voltar</button>
            <h2 className="text-xl font-bold text-gray-900 hidden md:block">Selecione as camadas</h2>
          </div>

          <div className="flex-1 overflow-y-auto!">
            {isComparisonMode ? (
              <CityLayersComparison
                selectedCity={selectedCity}
                selectedLayer1={selectedLayer1}
                selectedLayer2={selectedLayer2}
                onLayer1Change={handleLayer1Change}
                onLayer2Change={handleLayer2Change}
                layerLoadingStates={layerLoadingStates}
                layerOpacities={layerOpacities}
                onOpacityChange={handleOpacityChange}
              />
            ) : (
              <CityLayers
                selectedCity={selectedCity}
                selectedLayers={selectedLayers}
                onLayersChange={handleLayersChange}
                layerLoadingStates={layerLoadingStates}
                layerOpacities={layerOpacities}
                onOpacityChange={handleOpacityChange}
              />
            )}
          </div>
        </div>
      </div>

       {/* legends */}
       <CollapsibleLegend 
         selectedLayers={isComparisonMode ? [selectedLayer1, selectedLayer2].filter(Boolean) as string[] : selectedLayers}
         selectedCity={selectedCity}
         cityLayersConfig={cityLayersConfig}
       />
       <div className="absolute top-32 right-4 z-9">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleComparisonMode}
              className={`p-2 rounded-md outline-none transition-colors ${
                isComparisonMode 
                  ? 'bg-primary  hover:bg-primary/90 border-primary text-white' 
                  : 'bg-white hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <Layers className="w-5 h-5"/>
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isComparisonMode ? 'Sair do Modo de Comparação' : 'Comparar Camadas'}</p>
          </TooltipContent>
        </Tooltip>
        </div>

        {/* Custom zoom and recenter buttons */}
        <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-2">
          {/* Zoom In Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleZoomIn}
                className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <Plus className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Zoom In</p>
            </TooltipContent>
          </Tooltip>

          {/* Zoom Out Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleZoomOut}
                className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <Minus className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Zoom Out</p>
            </TooltipContent>
          </Tooltip>

          {/* Recenter Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleRecenter}
                className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <Compass className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Reset Map View</p>
            </TooltipContent>
          </Tooltip>
        </div>



      {isMenuOpen && <div className="fixed inset-0 bg-opacity-50 z-5 md:hidden" onClick={toggleMenu} />}
    </div>
  )
}
