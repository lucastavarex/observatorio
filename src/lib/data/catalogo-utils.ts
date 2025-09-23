import catalogoData from './catalogo_dados.json'

// Type definitions
export interface DataEntry {
  titulo_dado?: string
  link: string
  isDisabled?: boolean
}

export interface CatalogItem {
  grupo_cidade: string
  nome_cidade: string
  tipo_dado: string
  tipo_botao: string
  nome_botao: string
  titulo: string
  texto_apoio: string
  data: DataEntry[]
}

export interface CityData {
  cidade: string
  gtfs: boolean
  gpsEmbarcados: boolean
  bilhetagem: boolean
  arquivosVetoriais: boolean
}

export interface ModalSource {
  name: string
  description: string
  actionText: string
  actionType: 'download' | 'link'
  actionUrl: string
  datasets?: DataEntry[]
  isDisabled?: boolean
}

export interface ModalData {
  title: string
  subtitle: string
  sources: ModalSource[]
}

// Data type mappings
const DATA_TYPE_MAPPING: Record<string, string> = {
  'GTFS': 'gtfs',
  'GPS Embarcados': 'gpsEmbarcados', 
  'Bilhetagem': 'bilhetagem',
  'Outros Arquivos Vetoriais': 'arquivosVetoriais'
}

const DISPLAY_TYPE_MAPPING: Record<string, string> = {
  'GTFS': 'GTFS',
  'GPS Embarcados': 'GPS embarcados',
  'Bilhetagem': 'Bilhetagem', 
  'Outros Arquivos Vetoriais': 'Arquivos vetoriais'
}

// Get unique cities by group
export function getCitiesByGroup(group: 'Cidade Parceira' | 'Dados Abertos'): CityData[] {
  const filteredData = catalogoData.filter(item => item.grupo_cidade === group)
  
  // Group by city name
  const citiesMap = new Map<string, CityData>()
  
  filteredData.forEach(item => {
    const cityName = item.nome_cidade
    const dataTypeKey = DATA_TYPE_MAPPING[item.tipo_dado]
    
    if (!dataTypeKey) return
    
    if (!citiesMap.has(cityName)) {
      citiesMap.set(cityName, {
        cidade: cityName,
        gtfs: false,
        gpsEmbarcados: false,
        bilhetagem: false,
        arquivosVetoriais: false
      })
    }
    
    const cityData = citiesMap.get(cityName)!
    
    // Check if data is available in DataVerse or GeoPortal only
    // Ignore Prefeitura/Fonte links for availability check
    const hasValidData = (item.tipo_botao === 'Dataverse' || item.tipo_botao === 'Geoportal') && 
      item.data.some(d => 
        d.link && 
        d.link !== 'Missing link (dataverse)' && 
        d.link !== 'Missing link (geoportal)'
      )
    
    if (hasValidData) {
      // Type assertion for dynamic property assignment
      ;(cityData as unknown as Record<string, boolean>)[dataTypeKey] = true
    }
  })
  
  return Array.from(citiesMap.values()).sort((a, b) => a.cidade.localeCompare(b.cidade))
}

// Helper function to check if a URL is valid
function isValidUrl(url: string): boolean {
  if (!url || url.includes('Missing link')) return false
  try {
    new URL(url)
    return true
  } catch {
    return url.startsWith('http://') || url.startsWith('https://')
  }
}

// Get modal data for a specific city and data type
export function getModalData(cityName: string, dataType: string, group: 'Cidade Parceira' | 'Dados Abertos'): ModalData | null {
  const filteredData = catalogoData.filter(item => 
    item.nome_cidade === cityName && 
    item.tipo_dado === dataType &&
    item.grupo_cidade === group
  )
  
  if (filteredData.length === 0) return null
  
  // Get title and subtitle from first item
  const firstItem = filteredData[0]
  const displayType = DISPLAY_TYPE_MAPPING[dataType] || dataType
  
  // Group by source type
  const sourcesMap = new Map<string, ModalSource>()
  
  filteredData.forEach(item => {
    const sourceName = item.nome_botao || 'Unknown Source'
    const sourceKey = `${item.tipo_botao}-${sourceName}`
    
    if (!sourcesMap.has(sourceKey)) {
      // Determine action type based on source - most sources should open links
      const actionType: 'download' | 'link' = 'link'
      // Only specific cases should be downloads (if any)
      // For now, all sources open in new tabs
      
      const mainLink = item.data[0]?.link || '#'
      
      sourcesMap.set(sourceKey, {
        name: sourceName,
        description: item.texto_apoio || 'No description available',
        actionText: 'Acesse',
        actionType,
        actionUrl: mainLink,
        datasets: [],
        isDisabled: !isValidUrl(mainLink)
      })
    }
    
    const source = sourcesMap.get(sourceKey)!
    
    // Add all datasets (we'll handle disabled state individually)
    item.data.forEach(dataEntry => {
      if (dataEntry.link) {
        source.datasets!.push({
          ...dataEntry,
          isDisabled: !isValidUrl(dataEntry.link)
        })
      }
    })
  })
  
  // Return ALL sources, don't filter by validity - we'll handle disabled state in UI
  const sources = Array.from(sourcesMap.values())
  
  if (sources.length === 0) return null
  
  return {
    title: displayType,
    subtitle: firstItem.titulo || 'No title available',
    sources
  }
}

// Get all available data for debugging
export function getAllCities() {
  const allCities = new Set<string>()
  catalogoData.forEach(item => {
    allCities.add(item.nome_cidade)
  })
  return Array.from(allCities).sort()
}

export function getAllDataTypes() {
  const allTypes = new Set<string>()
  catalogoData.forEach(item => {
    allTypes.add(item.tipo_dado)
  })
  return Array.from(allTypes).sort()
}
