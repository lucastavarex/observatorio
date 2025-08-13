import React from "react"
import { getTableData, getVariableStats, loadPEMOBData } from "../lib/pemob-data"

export function useDashboardData(selectedFilter: string, year?: number) {
  const [isLoading, setIsLoading] = React.useState(true)

  // Load PEMOB data on client side only
  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      // Since data is now loaded synchronously, this will be immediate
      await loadPEMOBData()
      setIsLoading(false)
    }

    loadData()
  }, [])

  // Get table data for the selected variable (ALWAYS uses 2023 data for table)
  const data = React.useMemo(() => {
    if (!selectedFilter) return []
    
    return getTableData(selectedFilter).map((item, index) => ({
      id: item.codigo || `${item.municipio}-${index}`,
      municipio: item.municipio,
      unidadeFederativa: item.uf,
      valor: item.valor,
      pergunta: item.pergunta
    }))
  }, [selectedFilter])

  // Get statistics for the selected variable (uses year parameter for charts)
  const stats = React.useMemo(() => {
    if (!selectedFilter) return null
    return getVariableStats(selectedFilter, year)
  }, [selectedFilter, year])

  return { 
    data,
    stats,
    isLoading,
    error: null
  }
} 