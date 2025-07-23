import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table"
import React from "react"
import { useTableState } from "../hooks/use-table-state"
import { createColumns } from "../lib/table-columns"
import { TransportData } from "../lib/types"
import { TablePagination } from "./table-pagination"

interface DataTableProps {
  data: TransportData[]
  selectedFilter: string
  globalFilter: string
  setGlobalFilter: (value: string) => void
}

export function DataTable({ data, selectedFilter, globalFilter, setGlobalFilter }: DataTableProps) {
  const columns = React.useMemo(
    () => createColumns(selectedFilter),
    [selectedFilter]
  )

  const { table } = useTableState({
    data,
    columns,
    globalFilter,
    setGlobalFilter,
  })

  return (
    <div className="space-y-4">
      {/* Data Table */}
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-4 px-4 lg:px-9">
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
                    <TableCell key={cell.id} className="py-4 px-4 lg:px-9">
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
      <TablePagination table={table} />
    </div>
  )
} 