import React from "react"
import { getTableData, getVariableStats, loadPEMOBData } from "../lib/pemob-data"

export function useDashboardData(selectedFilter: string) {
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

  // Get table data for the selected variable
  const data = React.useMemo(() => {
    if (!selectedFilter) return []
    
    return getTableData(selectedFilter).map((item, index) => ({
      id: item.codigo || `${item.municipio}-${index}`,
      municipio: item.municipio,
      unidadeFederativa: item.uf,
      valor: item.valor
    }))
  }, [selectedFilter])

  // Get statistics for the selected variable
  const stats = React.useMemo(() => {
    if (!selectedFilter) return null
    return getVariableStats(selectedFilter)
  }, [selectedFilter])

  return { 
    data,
    stats,
    isLoading,
    error: null
  }
} 