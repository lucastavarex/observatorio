import { variaveis as pemobRawData } from "./data/pemob-raw"
import type { DashboardData, PEMOBCityData } from "./types"

// Use the imported data directly
const pemobData: PEMOBCityData[] = pemobRawData
const dataInitialized = true

// Async function to load data (for compatibility with existing hooks)
export async function loadPEMOBData(): Promise<PEMOBCityData[]> {
  return pemobData
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

// NEW: Get percentage of variables filled by a specific city
export function getCityVariableFillPercentage(cityName: string): number {
  const cityData = getCityData(cityName)
  if (!cityData) return 0

  const availableVariables = getAvailableVariables()
  if (availableVariables.length === 0) return 0

  const filledVariables = availableVariables.filter(variable => {
    const value = cityData[variable]
    return value !== null && value !== undefined && value !== 0
  })

  return Math.round((filledVariables.length / availableVariables.length) * 100)
}

// NEW: Get percentage of cities that filled a specific variable
export function getVariableCityFillPercentage(variableName: string): number {
  if (pemobData.length === 0) return 0

  const citiesWithData = pemobData.filter(city => {
    const value = city[variableName]
    return value !== null && value !== undefined && value !== 0
  })

  return Math.round((citiesWithData.length / pemobData.length) * 100)
} 