"use client"


interface EvolucaoChartProps {
  selectedCities: string[]
  selectedVariables: string[]
  year?: number
}

export function EvolucaoChart({ selectedCities, selectedVariables, year }: EvolucaoChartProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Gráfico de Evolução</h3>
        <div className="bg-gray-100 rounded-lg p-8 mb-4">
          <div className="w-64 h-32 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">Line Chart Evolution</span>
          </div>
        </div>
        <p className="text-gray-600 mb-2">Cidades selecionadas: {selectedCities.length}</p>
        <p className="text-gray-600">Variáveis selecionadas: {selectedVariables.length}</p>
        <p className="text-sm text-gray-500 mt-4">Em desenvolvimento...</p>
      </div>
    </div>
  )
} 