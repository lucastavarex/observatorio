"use client"

import React from "react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { getVariableData } from "../../lib/pemob-data"

interface RadarChartProps {
  selectedCities: string[]
  selectedVariables: string[]
}

interface RadarChartDataPoint {
  variable: string
  [cityName: string]: string | number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number
    color: string
  }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 max-w-[350px] border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold mb-2 text-sm leading-tight break-words">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-xs leading-tight" style={{ color: entry.color }}>
              <span className="font-medium">{entry.dataKey}:</span> {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function ChartRadarMultiple({ selectedCities, selectedVariables }: RadarChartProps) {
  const chartData = React.useMemo(() => {
    if (selectedVariables.length === 0 || selectedCities.length === 0) {
      return []
    }

    // Create radar chart data structure
    const data: RadarChartDataPoint[] = selectedVariables.map(variable => {
      const dataPoint: RadarChartDataPoint = { variable }
      
      const variableData = getVariableData(variable)
      
             // Calculate the sum of ALL cities' values for this variable (not just selected)
       const totalSum = variableData.reduce((sum, item) => {
         return sum + (item.valor !== null ? item.valor : 0)
       }, 0)
      
      // Calculate proportional percentage for each city
      selectedCities.forEach(city => {
        const cityData = variableData.find(item => item.municipio === city)
        if (cityData && cityData.valor !== null && totalSum > 0) {
          // Calculate percentage as (city_value / total_sum) * 100
          const percentage = (cityData.valor / totalSum) * 100
          dataPoint[city] = Math.max(0, percentage)
        } else {
          dataPoint[city] = 0 // Default to 0 if no data or total sum is 0
        }
      })
      
      return dataPoint
    })

    return data
  }, [selectedCities, selectedVariables])

  const colors = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"] // red, green, blue, yellow, purple

  if (selectedVariables.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Selecione pelo menos uma variável para visualizar o gráfico
      </div>
    )
  }

  if (selectedCities.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Selecione pelo menos uma cidade para visualizar o gráfico
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} margin={{ top: 40, right: 100, bottom: 40, left: 100 }}>
            <PolarGrid gridType="circle" />
            <PolarRadiusAxis 
              domain={[0, 100]} 
              tick={false}
              tickCount={6}
            />
            <PolarAngleAxis 
              dataKey="variable" 
              tick={{ fontSize: 12 }}
              className="text-xs"
              tickFormatter={(value) => {
                // Truncate long variable names
                if (value.length > 25) {
                  return value.substring(0, 30) + '...'
                }
                return value
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {selectedCities.slice(0, 5).map((city, index) => (
              <Radar
                key={city}
                name={city}
                dataKey={city}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-col items-start mt-4 gap-2 text-sm flex-shrink-0">
        {selectedCities.slice(0, 5).map((city, index) => (
          <div key={city} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span>{city}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
