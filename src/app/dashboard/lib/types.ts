// Transport data structure
export interface TransportData {
  id: string
  municipio: string
  unidadeFederativa: string
  valor: number | string | null // Allow null values
}

// PEMOB (Pesquisa Nacional de Mobilidade Urbana) data structure
export interface PEMOBCityData {
  "CÓDIGO": string
  "UF": string
  "Município": string
  [key: string]: string | number | null // All transportation variables
}

// Processed PEMOB data for the dashboard
export interface DashboardData {
  codigo: string
  municipio: string
  uf: string
  variavel: string
  valor: number | null
}

// Filter structure types
export interface SubcategoryData {
  icon: string // Changed from LucideIcon to string for SVG paths
  options: string[]
}

export interface CategoryData {
  [subcategoryKey: string]: SubcategoryData
}

export interface FilterCategoriesType {
  [categoryKey: string]: CategoryData
}

// Table state types (using React Table types)
export interface TableState {
  sorting: {
    id: string
    desc: boolean
  }[]
  columnFilters: {
    id: string
    value: unknown
  }[]
  columnVisibility: Record<string, boolean>
  globalFilter: string
}

// Municipality data for mock generation
export interface Municipality {
  nome: string
  uf: string
} 