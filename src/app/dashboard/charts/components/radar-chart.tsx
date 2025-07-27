"use client"


interface RadarChartProps {
  selectedCities: string[]
  selectedVariables: string[]
}

export function RadarChart({ selectedCities, selectedVariables }: RadarChartProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Gráfico Radar</h3>
        <div className="bg-gray-100 rounded-lg p-8 mb-4">
          <div className="w-48 h-48 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-sm">Radar Chart</span>
          </div>
        </div>
        <p className="text-gray-600 mb-2">Cidades selecionadas: {selectedCities.length}</p>
        <p className="text-gray-600">Variáveis selecionadas: {selectedVariables.length}</p>
        <p className="text-sm text-gray-500 mt-4">Em desenvolvimento...</p>
      </div>
    </div>
  )
} 