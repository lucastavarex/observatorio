import { LucideIcon } from "lucide-react"

// Transport data structure
export interface TransportData {
  id: string
  municipio: string
  unidadeFederativa: string
  valor: number | string
}

// Filter structure types
export interface SubcategoryData {
  icon: LucideIcon
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