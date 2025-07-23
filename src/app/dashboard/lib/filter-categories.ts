import { Bus } from "lucide-react"
import { FilterCategoriesType } from "./types"

// Filter categories with nested structure and expanded options
export const filterCategories: FilterCategoriesType = {
  "Infraestrutura": {
    "Ônibus": {
      icon: Bus,
      options: [
        "Terminais Rodoviários",
        "Terminais Rodoviários com Acessibilidade (Deficiência Física)",
        "Total de Pontos de Embarque",
        "Total de Pontos de Embarque com Abrigo"
      ]
    },
     "Custo": {
      icon: Bus,
      options: [
        "ISS Incidente no Serviço de Transporte de Ônibus",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de Ônibus"
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