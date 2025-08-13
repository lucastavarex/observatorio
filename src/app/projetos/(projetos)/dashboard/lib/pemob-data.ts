import { variaveis as pemobRawData2019 } from "./data/pemob-2019"
import { variaveis as pemobRawData2020 } from "./data/pemob-2020"
import { variaveis as pemobRawData2021 } from "./data/pemob-2021"
import { variaveis as pemobRawData2022 } from "./data/pemob-2022"
import { variaveis as pemobRawData2023 } from "./data/pemob-2023"
import { variaveis as pemobRawData2024 } from "./data/pemob-2024"
import type { DashboardData, PEMOBCityData } from "./types"

// Data mapping by year
const pemobDataByYear: Record<number, PEMOBCityData[]> = {
  2019: pemobRawData2019,
  2020: pemobRawData2020,
  2021: pemobRawData2021,
  2022: pemobRawData2022,
  2023: pemobRawData2023,
  2024: pemobRawData2024
}

// Default data (2024 for charts, 2023 for table)
const pemobData: PEMOBCityData[] = pemobRawData2024
const pemobDataTable: PEMOBCityData[] = pemobRawData2023
const dataInitialized = true

// Get data for a specific year
export function getPEMOBDataByYear(year: number): PEMOBCityData[] {
  return pemobDataByYear[year] || pemobDataByYear[2024] // fallback to 2024
}

// Async function to load data (for compatibility with existing hooks)
export async function loadPEMOBData(): Promise<PEMOBCityData[]> {
  return pemobData
}

// Get all cities from PEMOB data for a specific year
export function getPEMOBCities(year?: number): string[] {
  const data = year ? getPEMOBDataByYear(year) : pemobData
  return data.map(city => city.Município).sort()
}

// Get data for a specific city for a specific year
export function getCityData(cityName: string, year?: number): PEMOBCityData | undefined {
  const data = year ? getPEMOBDataByYear(year) : pemobData
  return data.find(city => city.Município === cityName)
}

// Get data for a specific variable across all cities for a specific year
export function getVariableData(variableName: string, year?: number): DashboardData[] {
  const data = year ? getPEMOBDataByYear(year) : pemobData
  return data
    .map(city => {
      const dataItem = city.data.find(item => item.label === variableName)
      return {
        codigo: String(city.CÓDIGO), // Convert to string to match DashboardData type
        municipio: city.Município,
        uf: city.UF,
        variavel: variableName,
        valor: dataItem?.valor || null
      }
    })
    .filter(item => item.valor !== null) // Only return cities with data for this variable
}

// Get all available variables (labels from the data array) for a specific year
export function getAvailableVariables(year?: number): string[] {
  const data = year ? getPEMOBDataByYear(year) : pemobData
  if (data.length === 0) return []
  
  // Get all unique labels from the data arrays
  const allLabels = new Set<string>()
  data.forEach(city => {
    city.data.forEach(item => {
      allLabels.add(item.label)
    })
  })
  
  return Array.from(allLabels).sort()
}

// Get cities with data for a specific variable for a specific year
export function getCitiesWithData(variableName: string, year?: number): string[] {
  const data = year ? getPEMOBDataByYear(year) : pemobData
  return data
    .filter(city => {
      const dataItem = city.data.find(item => item.label === variableName)
      return dataItem && dataItem.valor !== null && dataItem.valor !== undefined
    })
    .map(city => city.Município)
    .sort()
}

// Get summary statistics for a variable for a specific year
export function getVariableStats(variableName: string, year?: number): {
  min: number
  max: number
  mean: number
  count: number
} | null {
  const data = year ? getPEMOBDataByYear(year) : pemobData
  const values = data
    .map(city => {
      const dataItem = city.data.find(item => item.label === variableName)
      return dataItem?.valor
    })
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

// Search cities by name for a specific year
export function searchPEMOBCities(query: string, year?: number): string[] {
  const data = year ? getPEMOBDataByYear(year) : pemobData
  if (!query.trim()) return getPEMOBCities(year)
  
  const searchTerm = query.toLowerCase().trim()
  return data
    .filter(city => city.Município.toLowerCase().includes(searchTerm))
    .map(city => city.Município)
    .sort()
}

// Get formatted data for table display (ALWAYS uses 2023 data)
export function getTableData(variableName: string): Array<{
  municipio: string
  uf: string
  valor: number | null
  codigo: string
  pergunta: string
}> {
  return pemobDataTable
    .map(city => {
      const dataItem = city.data.find(item => item.label === variableName)
      return {
        municipio: city.Município,
        uf: city.UF,
        valor: dataItem?.valor || null,
        codigo: String(city.CÓDIGO), // Convert to string to match return type
        pergunta: dataItem?.pergunta || ""
      }
    })
    .sort((a, b) => a.municipio.localeCompare(b.municipio, 'pt-BR'))
}

// Get the raw data for a specific year (useful for advanced operations)
export function getRawPEMOBData(year?: number): PEMOBCityData[] {
  return year ? getPEMOBDataByYear(year) : pemobData
}

// Function to check if data is loaded (useful for debugging)
export function isDataLoaded(): boolean {
  return pemobData.length > 0
}

// Get total number of cities for a specific year
export function getTotalCities(year?: number): number {
  const data = year ? getPEMOBDataByYear(year) : pemobData
  return data.length
}

// NEW: Get percentage of variables filled by a specific city for a specific year
export function getCityVariableFillPercentage(cityName: string, year?: number): number {
  const cityData = getCityData(cityName, year)
  if (!cityData) return 0

  const availableVariables = getAvailableVariables(year)
  if (availableVariables.length === 0) return 0

  const filledVariables = availableVariables.filter(variable => {
    const dataItem = cityData.data.find(item => item.label === variable)
    return dataItem && dataItem.valor !== null && dataItem.valor !== undefined && dataItem.valor !== 0
  })

  return Math.round((filledVariables.length / availableVariables.length) * 100)
}

// NEW: Get percentage of cities that filled a specific variable for a specific year
export function getVariableCityFillPercentage(variableName: string, year?: number): number {
  const data = year ? getPEMOBDataByYear(year) : pemobData
  if (data.length === 0) return 0

  const citiesWithData = data.filter(city => {
    const dataItem = city.data.find(item => item.label === variableName)
    return dataItem && dataItem.valor !== null && dataItem.valor !== undefined && dataItem.valor !== 0
  })

  return Math.round((citiesWithData.length / data.length) * 100)
} 