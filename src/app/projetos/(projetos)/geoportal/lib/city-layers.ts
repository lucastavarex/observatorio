export interface CityLayer {
  id: string
  name: string
  description?: string
  tilesetId?: string
  sourceLayer?: string
  layerType?: 'fill' | 'line' | 'circle' | 'symbol'
  hasCustomStyle?: boolean // Indicates if this layer has a custom style defined in layer-styles.ts
}

export interface CityLayersConfig {
  [cityName: string]: CityLayer[]
}

export const cityLayersConfig: CityLayersConfig = {
  "Rio de Janeiro": [
    { 
      id: "renda", 
      name: "Renda", 
      description: "Renda per capita por bairro",
      tilesetId: "observatorio-nacional.3pcgkauc",
      sourceLayer: "renda_rio-4ks1k8",
      layerType: "fill",
      hasCustomStyle: true
    },
    { 
      id: "rotas-onibus", 
      name: "Rotas de ônibus", 
      description: "Rotas de ônibus por bairro",
      tilesetId: "observatorio-nacional.7qsr7w57",
      sourceLayer: "rotas_onibus-5yarkv",
      layerType: "fill",
      hasCustomStyle: true
    },
    { 
      id: "heatmap-bilhetagem", 
      name: "Heatmap Bilhetagem", 
      description: "Heatmap bilhetagem por bairro",
      tilesetId: "observatorio-nacional.6mbl4ycd",
      sourceLayer: "heatmap_bilhetagem_rio-59w42o",
      layerType: "fill",
      hasCustomStyle: true
    },
    { 
      id: "population-rio", 
      name: "População Rio", 
      description: "Heatmap bilhetagem por bairro",
      tilesetId: "observatorio-nacional.4sg21k6q",
      sourceLayer: "populacao_rio-19sjpd",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "Recife": [
    { 
      id: "populacao-rec-08mi0e", 
      name: "População Recife", 
      description: "População por bairro/distrito",
      tilesetId: "observatorio-nacional.5f7qyfuo",
      sourceLayer: "populacao_rec-08mi0e",
      layerType: "fill",
      hasCustomStyle: true
    },
    { 
      id: "renda-rec-bcpy1l", 
      name: "Renda Recife", 
      description: "Renda per capita por bairro",
      tilesetId: "observatorio-nacional.8kla8qks",
      sourceLayer: "renda_rec-bcpy1l",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "Belo Horizonte": [
    { 
      id: "populacao-a5w87s", 
      name: "Densidade Populacional", 
      description: "Densidade populacional por bairro/distrito",
      tilesetId: "observatorio-nacional.a9leemjp",
      sourceLayer: "populacao-a5w87s",
      layerType: "fill",
      hasCustomStyle: true
    },
    { 
      id: "renda-42uz5h", 
      name: "Renda Belo Horizonte", 
      description: "Renda per capita por bairro",
      tilesetId: "observatorio-nacional.64v29dp1",
      sourceLayer: "renda-42uz5h",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "heatmap_embarques-b8mehl",
      name: "Heatmap Embarques",
      description: "Heatmap embarques por bairro",
      tilesetId: "observatorio-nacional.be236ew7",
      sourceLayer: "heatmap_embarques-b8mehl",
      layerType: "fill",
      hasCustomStyle: true
    },
    { 
      id: "ciclovia-48ed00",
      name: "Ciclovia",
      description: "Ciclovia por bairro",
      tilesetId: "observatorio-nacional.duoax0n7",
      sourceLayer: "ciclovia-48ed00",
      layerType: "line",
      hasCustomStyle: true
    },
    { id: "rotas_onibus_agregado-4r2tni", name: "Rotas de ônibus agregado", 
      description: "Rotas consolidadas por corredores principais",
      tilesetId: "observatorio-nacional.4g9kkgvq",
      sourceLayer: "rotas_onibus_agregado-4r2tni",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "Niteroi": [
    {
      id: "renda-987gzt",
      name: "Renda Niteroi",
      description: "Renda per capita por bairro",
      tilesetId: "observatorio-nacional.5gkcci9a",
      sourceLayer: "renda-987gzt",
      hasCustomStyle: true
    },
    {
      id: "populacao_nit-3oog1f",
      name: "População Niteroi",
      description: "População por bairro",
      tilesetId: "observatorio-nacional.cfffhdz0",
      sourceLayer: "populacao_nit-3oog1f",
      hasCustomStyle: true
    },
    {
      id: "heatmap-2eyldb",
      name: "Heatmap Niteroi",
      description: "Heatmap Niteroi por bairro",
      tilesetId: "observatorio-nacional.1h9a91is",
      sourceLayer: "heatmap-2eyldb",
      hasCustomStyle: true
    },
    {
      id: "rotas_onibus-7wlr7f",
      name: "Rotas de ônibus",
      description: "Rotas de ônibus por bairro",
      tilesetId: "observatorio-nacional.950xc6k6",
      sourceLayer: "rotas_onibus-7wlr7f",
      hasCustomStyle: true
    },
   
  ],
  "Santo André": [
    {
      id: "sinistros-9fw8gm",
      name: "Sinistros Santo André",
      description: "Sinistros por bairro",
      tilesetId: "observatorio-nacional.4d7kb4n8",
      sourceLayer: "sinistros-9fw8gm",
      hasCustomStyle: true
    },
    {
      id: "rotas_onibus_sad-7n78wu",
      name: "Rotas de ônibus Santo André",
      description: "Rotas de ônibus por bairro",
      tilesetId: "observatorio-nacional.2hyb7w6t",
      sourceLayer: "rotas_onibus_sad-7n78wu",
      hasCustomStyle: true
    },
  ],
  "Salvador": [
    {
      id: "ciclovia_tipo-bfdvvr",
      name: "Ciclovia",
      description: "Ciclovia por bairro",
      tilesetId: "observatorio-nacional.awa9a5ko",
      sourceLayer: "ciclovia_tipo-bfdvvr",
      hasCustomStyle: true
    },
    {
      id: "rotas_ottrans-4esuj9",
      name: "Rotas de ônibus",
      description: "Rotas de ônibus por bairro",
      tilesetId: "observatorio-nacional.95abndc3",
      sourceLayer: "rotas_ottrans-4esuj9",
      hasCustomStyle: true
    },
    {
      id: "ciclovia-2zvxww",
      name: "Ciclovia",
      description: "Ciclovia por bairro",
      tilesetId: "observatorio-nacional.6wfgd2uh",
      sourceLayer: "ciclovia-2zvxww",
      hasCustomStyle: true
    },
    {
      id: "renda_ssa-72km6n",
      name: "Renda Salvador",
      description: "Renda per capita por bairro",
      tilesetId: "observatorio-nacional.8e78qgxw",
      sourceLayer: "renda_ssa-72km6n",
      hasCustomStyle: true
    },
    {
      id: "populacao_ssa-dgk2gr",
      name: "População Salvador",
      description: "População por bairro",
      tilesetId: "observatorio-nacional.9zwcybiu",
      sourceLayer: "populacao_ssa-dgk2gr",
      hasCustomStyle: true
    },
  ],
  "Campinas": [
    {
      id: "populacao_cam-dhn9nh",
      name: "População Campinas",
      description: "População por bairro",
      tilesetId: "observatorio-nacional.cv6id9vn",
      sourceLayer: "populacao_cam-dhn9nh",
      hasCustomStyle: true
    },
    {
      id: "renda-2bxm7u",
      name: "Renda Campinas",
      description: "Renda per capita por bairro",
      tilesetId: "observatorio-nacional.5eawzxg0",
      sourceLayer: "renda-2bxm7u",
      hasCustomStyle: true
    },
    {
      id: "rotas_onibus-178ot7",
      name: "Rotas de ônibus",
      description: "Rotas de ônibus por bairro",
      tilesetId: "observatorio-nacional.6tqhobb3",
      sourceLayer: "rotas_onibus-178ot7",
      hasCustomStyle: true
    },
  ],
  "Porto Alegre": [
    {
      id: "renda_poa-0cq519",
      name: "Renda Porto Alegre",
      description: "Renda per capita por bairro",
      tilesetId: "observatorio-nacional.6nhij7jq",
      sourceLayer: "renda_poa-0cq519",
      hasCustomStyle: true
    },
    {
      id: "populacao_poa-6gb3pv",
      name: "População Porto Alegre",
      description: "População por bairro",
      tilesetId: "observatorio-nacional.cvh9drji",
      sourceLayer: "populacao_poa-6gb3pv",
      hasCustomStyle: true
    },
    {
      id: "vitimas_poa-84wkxk",
      name: "Vitimas Porto Alegre",
      description: "Vitimas por bairro",
      tilesetId: "observatorio-nacional.2fbdewky",
      sourceLayer: "vitimas_poa-84wkxk",
      hasCustomStyle: true
    },
    {
      id: "sinistros_poa-8mfstv",
      name: "Sinistros Porto Alegre",
      description: "Sinistros por bairro",
      tilesetId: "observatorio-nacional.a7e3m719",
      sourceLayer: "sinistros_poa-8mfstv",
      hasCustomStyle: true
    },
  ],
  "São Paulo": [
    { 
      id: "density", 
      name: "Densidade Populacional", 
      description: "Densidade populacional por bairro/distrito",
      tilesetId: "observatorio-nacional.3g2magjo",
      sourceLayer: "density-2aws6m",
      layerType: "fill",
      hasCustomStyle: true
    },
     { id: "geoses", name: "Geoses", 
      description: "Sistema de informações geográficas socioeconômicas",
      tilesetId: "observatorio-nacional.ah3u3vxi",
      sourceLayer: "geoses-4hsw1f",
      layerType: "fill",
      hasCustomStyle: true
     },
    { 
      id: "census-iptu", 
      name: "IPTU Census", 
      description: "Informações cadastrais e tributárias dos imóveis",
      tilesetId: "observatorio-nacional.3lrt5ras",
      sourceLayer: "sp_censo_iptu-5t7c18",
      layerType: "fill"
    },
    { 
      id: "census", 
      name: "General Census", 
      description: "Dados demográficos do último censo IBGE",
      tilesetId: "observatorio-nacional.arfcq5q5",
      sourceLayer: "sp_censo-0inwjz",
      layerType: "fill"
    },
    { id: "ubs-expenses", name: "Gastos UBS Distritos", 
      description: "Distribuição de recursos para Unidades Básicas de Saúde",
      tilesetId: "observatorio-nacional.a8auz7xs",
      sourceLayer: "gastos_ubs_distritos-7ty5vi",
      layerType: "fill"
     },
    { id: "deaths", name: "Óbitos", description: "Estatísticas de mortalidade por região",
      tilesetId: "observatorio-nacional.ccitv4rk",
      sourceLayer: "obitos-4e66rs",
      layerType: "fill"
     },
    { id: "population-districts", name: "População Distritos",
      description: "Distribuição populacional por distrito administrativo",
      tilesetId: "observatorio-nacional.7ontnnzr",
      sourceLayer: "populacao_distritos-4x07ah",
      layerType: "fill"
     },
  ],
}
