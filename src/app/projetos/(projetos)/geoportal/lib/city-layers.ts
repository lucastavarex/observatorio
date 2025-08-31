export interface CityLayer {
  id: string
  name: string
  description?: string
}

export interface CityLayersConfig {
  [cityName: string]: CityLayer[]
}

export const cityLayersConfig: CityLayersConfig = {
  "Rio de Janeiro": [
    { id: "gps-sample", name: "Amostra de GPS", description: "Dados de localização GPS coletados em tempo real" },
    { id: "bus-routes", name: "Rotas de ônibus", description: "Rede completa de linhas e rotas de ônibus municipais" },
    { id: "heat-island-area", name: "Ilha de calor (Área)", description: "Zonas de temperatura elevada identificadas por satélite" },
    { id: "heat-island-points", name: "Ilha de calor (Pontos)", description: "Pontos específicos de medição de temperatura urbana" },
    { id: "air-quality-area", name: "Qualidade do ar (Área)", description: "Mapa de qualidade do ar por região da cidade" },
    { id: "air-quality-points", name: "Qualidade do ar (Pontos)", description: "Estações de monitoramento da qualidade do ar" },
  ],
  "São Paulo": [
    { id: "density", name: "Densidade", description: "Densidade populacional por bairro/distrito" },
    { id: "census", name: "Censo", description: "Dados demográficos do último censo IBGE" },
    { id: "census-iptu", name: "Censo IPTU", description: "Informações cadastrais e tributárias dos imóveis" },
    { id: "ubs-expenses", name: "Gastos UBS Distritos", description: "Distribuição de recursos para Unidades Básicas de Saúde" },
    { id: "geoses", name: "Geoses", description: "Sistema de informações geográficas socioeconômicas" },
    { id: "deaths", name: "Óbitos", description: "Estatísticas de mortalidade por região" },
    { id: "population-districts", name: "População Distritos", description: "Distribuição populacional por distrito administrativo" },
  ],
  "Belo Horizonte": [
    { id: "bike-lanes", name: "Ciclovia", description: "Rede de ciclovias e infraestrutura para bicicletas" },
    { id: "bus-routes", name: "Rotas de ônibus", description: "Sistema de transporte público por ônibus" },
    { id: "bus-routes-aggregated", name: "Rotas de ônibus agregado", description: "Rotas consolidadas por corredores principais" },
  ],
  "Niteroi": [
    { id: "bus-routes", name: "Rotas de ônibus", description: "Sistema de transporte público municipal" },
  ],
  "Santo André": [
    { id: "intercity-bus-lines", name: "Linhas de ônibus intermunicipais", description: "Conectividade com municípios vizinhos" },
    { id: "city-bus-lines", name: "Linhas de ônibus municipais", description: "Transporte público dentro do município" },
    { id: "traffic-accidents", name: "Sinistros de trânsito", description: "Registro de acidentes e ocorrências de trânsito" },
  ],
  "Salvador": [
    { id: "bike-lanes", name: "Ciclovia", description: "Infraestrutura para mobilidade ativa" },
    { id: "ottrans-routes", name: "Rotas ottrans", description: "Sistema de transporte público integrado" },
  ],
  "Porto Alegre": [
    { id: "motorcycle-accessibility-2023", name: "Acessibilidade de moto 2023", description: "Análise de acessibilidade para motociclistas" },
    { id: "motorcycle-accidents-grid", name: "Grid acidentes de moto", description: "Distribuição espacial de acidentes com motos" },
    { id: "pedestrians-grid", name: "Grid pedestres", description: "Análise da mobilidade pedestre por região" },
    { id: "pedestrian-victims-2023", name: "Pedestres vítimas 2023", description: "Registro de pedestres vítimas de acidentes" },
    { id: "taxi-points", name: "Pontos de táxi", description: "Localização dos pontos de táxi oficiais" },
  ],
}
