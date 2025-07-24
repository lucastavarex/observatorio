import React from "react"
import { getTableData, getVariableStats, isDataLoaded, loadPEMOBData } from "../lib/pemob-data"

export function useDashboardData(selectedFilter: string) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [dataLoaded, setDataLoaded] = React.useState(false)

  // Load PEMOB data on client side only
  React.useEffect(() => {
    const loadData = async () => {
      if (!isDataLoaded()) {
        setIsLoading(true)
        await loadPEMOBData()
        setDataLoaded(true)
      }
      setIsLoading(false)
    }

    loadData()
  }, [])

  // Get table data for the selected variable
  const data = React.useMemo(() => {
    if (!selectedFilter || !dataLoaded) return []
    
    return getTableData(selectedFilter).map((item, index) => ({
      id: item.codigo || `${item.municipio}-${index}`,
      municipio: item.municipio,
      unidadeFederativa: item.uf,
      valor: item.valor
    }))
  }, [selectedFilter, dataLoaded])

  // Get statistics for the selected variable
  const stats = React.useMemo(() => {
    if (!selectedFilter || !dataLoaded) return null
    return getVariableStats(selectedFilter)
  }, [selectedFilter, dataLoaded])

  return { 
    data,
    stats,
    isLoading,
    error: null
  }
} 