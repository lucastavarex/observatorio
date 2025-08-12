import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Info } from "lucide-react"
import { TransportData } from "./types"

export function createColumns(selectedFilter: string, question?: string): ColumnDef<TransportData>[] {
  return [
    {
      accessorKey: "municipio",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-3 h-8 pl-0"
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
            className="-ml-3 h-8 pl-0"
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
      header: () => {
        return (
          <div className="flex items-center gap-2">
            <span>{selectedFilter}</span>
            {question && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <span className="text-sm">{question}</span>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("valor")}</div>,
    },
  ]
} 