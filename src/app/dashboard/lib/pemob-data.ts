import type { DashboardData, PEMOBCityData } from "./types"

// Import the real PEMOB data synchronously
let pemobData: PEMOBCityData[] = []
let dataInitialized = false

// Initialize with real PEMOB data synchronously
function initializeRealData() {
  if (dataInitialized) return
  
  try {
    // For now, we'll use a synchronous approach to avoid hydration issues
    // In a production app, you might want to move this to a server component
    // or use proper data fetching patterns
    
    // Since dynamic imports cause hydration issues, we'll initialize with empty data
    // and let the component handle the async loading properly
    pemobData = []
    dataInitialized = true
  } catch (error) {
    console.error('Error initializing PEMOB data:', error)
    pemobData = []
    dataInitialized = true
  }
}

// Initialize data immediately
initializeRealData()

// Async function to load data (called from components)
export async function loadPEMOBData(): Promise<PEMOBCityData[]> {
  if (pemobData.length > 0) return pemobData
  
  try {
    const pemobModule = await import('./data/pemob-raw')
    pemobData = pemobModule.variaveis as PEMOBCityData[]
    return pemobData
  } catch (error) {
    console.error('Error loading PEMOB data:', error)
    return []
  }
}

// Get all cities from PEMOB data
export function getPEMOBCities(): string[] {
  return pemobData.map(city => city.Município).sort()
}

// Get data for a specific city
export function getCityData(cityName: string): PEMOBCityData | undefined {
  return pemobData.find(city => city.Município === cityName)
}

// Get data for a specific variable across all cities
export function getVariableData(variableName: string): DashboardData[] {
  return pemobData
    .map(city => ({
      codigo: city.CÓDIGO,
      municipio: city.Município,
      uf: city.UF,
      variavel: variableName,
      valor: typeof city[variableName] === 'number' ? city[variableName] as number : null
    }))
    .filter(item => item.valor !== null) // Only return cities with data for this variable
}

// Get all available variables (column names excluding ID fields)
export function getAvailableVariables(): string[] {
  if (pemobData.length === 0) return []
  
  const excludeFields = ['CÓDIGO', 'UF', 'Município']
  return Object.keys(pemobData[0])
    .filter(key => !excludeFields.includes(key))
    .sort()
}

// Get cities with data for a specific variable
export function getCitiesWithData(variableName: string): string[] {
  return pemobData
    .filter(city => city[variableName] !== null && city[variableName] !== undefined)
    .map(city => city.Município)
    .sort()
}

// Get summary statistics for a variable
export function getVariableStats(variableName: string): {
  min: number
  max: number
  mean: number
  count: number
} | null {
  const values = pemobData
    .map(city => city[variableName])
    .filter((value): value is number => typeof value === 'number' && value !== null)

  if (values.length === 0) return null

  const min = Math.min(...values)
  const max = Math.max(...values)
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length

  return {
    min,
    max,
    mean: Math.round(mean * 100) / 100, // Round to 2 decimal places
    count: values.length
  }
}

// Search cities by name
export function searchPEMOBCities(query: string): string[] {
  if (!query.trim()) return getPEMOBCities()
  
  const searchTerm = query.toLowerCase().trim()
  return pemobData
    .filter(city => city.Município.toLowerCase().includes(searchTerm))
    .map(city => city.Município)
    .sort()
}

// Get formatted data for table display
export function getTableData(variableName: string): Array<{
  municipio: string
  uf: string
  valor: number | null
  codigo: string
}> {
  return pemobData.map(city => ({
    municipio: city.Município,
    uf: city.UF,
    valor: typeof city[variableName] === 'number' ? city[variableName] as number : null,
    codigo: city.CÓDIGO
  }))
}

// Get the raw data (useful for advanced operations)
export function getRawPEMOBData(): PEMOBCityData[] {
  return pemobData
}

// Function to check if data is loaded (useful for debugging)
export function isDataLoaded(): boolean {
  return pemobData.length > 0
}

// Get total number of cities
export function getTotalCities(): number {
  return pemobData.length
} 