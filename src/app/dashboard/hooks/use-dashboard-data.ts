import React from "react"
import { generateMockData } from "../lib/mock-data"

export function useDashboardData(selectedFilter: string) {
  // Generate mock data based on selected filter
  const data = React.useMemo(
    () => generateMockData(selectedFilter),
    [selectedFilter]
  )

  return { data }
} 