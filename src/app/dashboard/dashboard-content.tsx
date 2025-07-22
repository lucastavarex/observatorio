"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Bus, ChevronLeft, ChevronRight, LucideIcon, Search } from "lucide-react"
import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Type definitions for filter structure
type SubcategoryData = {
  icon: LucideIcon
  options: string[]
}

type CategoryData = {
  [subcategoryKey: string]: SubcategoryData
}

type FilterCategoriesType = {
  [categoryKey: string]: CategoryData
}

// Filter categories with nested structure and expanded options
const filterCategories: FilterCategoriesType = {
  "Infraestrutura": {
    "Ônibus": {
      icon: Bus,
      options: [
        "Terminais Rodoviários",
        "Terminais Rodoviários com Acessibilidade (Deficiência Física)",
        "Total de Pontos de Embarque",
        "Total de Pontos de Embarque com Abrigo"
      ]
    }
  },
  "Frota": {
    "Ônibus": {
      icon: Bus,
      options: [
        "Frota de Ônibus Convencional",
        "Capacidade Média da Frota de Ônibus Convencional"
      ]
    }
  },
  "Tarifas": {
    "Valores": {
      icon: Bus,
      options: [
        "Valor Atual da Tarifa Predominante",
        "Valor Anterior da Tarifa Predominante"
      ]
    }
  },
  "Receita": {
    "Ônibus": {
      icon: Bus,
      options: [
        "Receita Tarifária Arrecadada por Ônibus",
        "Valor do Subsídio Tarifário para o Sistema de Ônibus"
      ]
    }
  },
  "Custos": {
    "Ônibus": {
      icon: Bus,
      options: [
        "ISS Incidente no Serviço de Transporte de Ônibus",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de Ônibus"
      ]
    }
  }
}

// Mock data type
type TransportData = {
  id: string
  municipio: string
  unidadeFederativa: string
  valor: number | string
}

// Seeded random number generator for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate consistent mock data
const generateMockData = (indicador: string): TransportData[] => {
  const municipios = [
    { nome: "São Paulo", uf: "SP" },
    { nome: "Rio de Janeiro", uf: "RJ" },
    { nome: "Belo Horizonte", uf: "MG" },
    { nome: "Porto Alegre", uf: "RS" },
    { nome: "Salvador", uf: "BA" },
    { nome: "Brasília", uf: "DF" },
    { nome: "Fortaleza", uf: "CE" },
    { nome: "Curitiba", uf: "PR" },
    { nome: "Recife", uf: "PE" },
    { nome: "Manaus", uf: "AM" },
    { nome: "Belém", uf: "PA" },
    { nome: "Goiânia", uf: "GO" },
    { nome: "Guarulhos", uf: "SP" },
    { nome: "Campinas", uf: "SP" },
    { nome: "São Luís", uf: "MA" },
    { nome: "São Gonçalo", uf: "RJ" },
    { nome: "Maceió", uf: "AL" },
    { nome: "Duque de Caxias", uf: "RJ" },
    { nome: "Natal", uf: "RN" },
    { nome: "Campo Grande", uf: "MS" },
    { nome: "Teresina", uf: "PI" },
    { nome: "São Bernardo do Campo", uf: "SP" },
    { nome: "João Pessoa", uf: "PB" },
    { nome: "Nova Iguaçu", uf: "RJ" },
    { nome: "São José dos Campos", uf: "SP" },
    { nome: "Santo André", uf: "SP" },
    { nome: "Ribeirão Preto", uf: "SP" },
    { nome: "Jaboatão dos Guararapes", uf: "PE" },
    { nome: "Osasco", uf: "SP" },
    { nome: "Uberlândia", uf: "MG" },
  ]

  const data: TransportData[] = []

  municipios.forEach((municipio, index) => {
    // Use a deterministic seed based on index and indicator
    const seed = index + indicador.charCodeAt(0)
    const randomValue = seededRandom(seed)
    
    data.push({
      id: String(index + 1),
      municipio: municipio.nome,
      unidadeFederativa: municipio.uf,
      valor: indicador.includes("Valor") || indicador.includes("Receita") || indicador.includes("Taxa") || indicador.includes("ISS") 
        ? `R$ ${(randomValue * 10000).toFixed(2).replace('.', ',')}`
        : indicador.includes("Capacidade")
        ? Math.floor(randomValue * 100) + 20
        : Math.floor(randomValue * 50) + 1,
    })
  })

  return data
}

export default function DashboardContent() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("Terminais Rodoviários")
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [searchFilter, setSearchFilter] = React.useState("")

  // Generate mock data based on selected filter
  const data = React.useMemo(
    () => generateMockData(selectedFilter),
    [selectedFilter]
  )

  // Filter options based on search
  const filteredCategories = React.useMemo(() => {
    if (!searchFilter) return filterCategories

    const filtered: FilterCategoriesType = {}
    
    Object.entries(filterCategories).forEach(([categoria, subcategorias]) => {
      const filteredSubcategorias: CategoryData = {}
      
      Object.entries(subcategorias).forEach(([subcategoria, data]) => {
        const filteredOptions = data.options.filter(option =>
          option.toLowerCase().includes(searchFilter.toLowerCase())
        )
        
        if (filteredOptions.length > 0) {
          filteredSubcategorias[subcategoria] = {
            ...data,
            options: filteredOptions
          }
        }
      })
      
      if (Object.keys(filteredSubcategorias).length > 0) {
        filtered[categoria] = filteredSubcategorias
      }
    })
    
    return filtered
  }, [searchFilter])

  const columns: ColumnDef<TransportData>[] = React.useMemo(
    () => [
      {
        accessorKey: "municipio",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4 h-8 pl-0"
            >
              Município
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("municipio")}</div>,
      },
      {
        accessorKey: "unidadeFederativa",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4 h-8 pl-0"
            >
              Unidade Federativa
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("unidadeFederativa")}</div>,
      },
      {
        accessorKey: "valor",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4 h-8 pl-0"
            >
              {selectedFilter}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("valor")}</div>,
      },
    ],
    [selectedFilter]
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: (row, columnId, filterValue) => {
      const municipio = row.getValue("municipio") as string
      const uf = row.getValue("unidadeFederativa") as string
      const search = filterValue.toLowerCase()
      return municipio.toLowerCase().includes(search) || uf.toLowerCase().includes(search)
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  // Calculate the range of items being displayed
  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const startRange = pageIndex * pageSize + 1
  const endRange = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Filters Sidebar */}
      <aside className="w-96 border-r bg-muted/10 p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Pesquisa Nacional de Mobilidade Urbana</h2>
            <p className="text-sm text-gray-600">Selecione uma das variáveis</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por variável..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <Accordion type="multiple" defaultValue={["Infraestrutura"]} className="w-full">
            {Object.entries(filteredCategories).map(([categoria, subcategorias]) => (
              <AccordionItem key={categoria} value={categoria}>
                <AccordionTrigger className="text-left font-semibold">
                  {categoria}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {Object.entries(subcategorias).map(([subcategoria, data]) => {
                      const IconComponent = data.icon
                      return (
                        <div key={subcategoria} className="space-y-3">
                          <div className="flex items-center space-x-2 pl-4">
                            <IconComponent className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-800">{subcategoria}</span>
                          </div>
                          <div className="space-y-2 pl-8">
                            {data.options.map(opcao => (
                              <div key={opcao} className="flex items-center justify-between pr-2">
                                <label
                                  htmlFor={opcao}
                                  className="text-sm text-gray-700 cursor-pointer flex-1 pr-4"
                                >
                                  {opcao}
                                </label>
                                <Switch
                                  id={opcao}
                                  checked={selectedFilter === opcao}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedFilter(opcao)
                                    }
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Filtrar por município ou UF..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>

          {/* Data Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="py-4 px-9">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4 px-9">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center py-6 px-9"
                    >
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-muted-foreground">
              {totalRows > 0 
                ? `Mostrando ${startRange} até ${endRange} de ${totalRows} resultados`
                : "Nenhum resultado encontrado"
              }
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <div className="text-sm">
                Página {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 