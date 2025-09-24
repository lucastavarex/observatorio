export interface LayerStyle {
  id: string
  type: 'fill' | 'line' | 'circle' | 'symbol'
  source: string
  'source-layer': string
  paint: Record<string, unknown>
  layout?: Record<string, unknown>
}

export const layerStyles: Record<string, LayerStyle> = {
  "density-2aws6m": {
    "type": "fill",
    "source": "composite",
    "id": "density-2aws6m",
    "paint": {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "densidade_residencial"],
        0, "hsl(180, 67%, 94%)",
        0.01984, "hsl(182, 42%, 83%)",
        0.0255, "#9ed0d2",
        0.03169, "#78bcbf",
        0.04121, "#4ea7ad",
        271.09192388292587, "#00939c"
      ],
      "fill-outline-color": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0, "#000000",
        22, "#000000"
      ]
    },
    "source-layer": "density-2aws6m"
  },
  "geoses-4hsw1f": {
    "id": "geoses-4hsw1f",
    "type": "fill",
    "source": "composite",
    "source-layer": "geoses-4hsw1f",
    "paint": {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "GeoSES"],
        -1, "#f72626",
        -0.6108, "#f4590b",
        -0.5257, "#f79c2b",
        -0.4365, "#fda468",
        -0.3505, "#fdd087",
        -0.2572, "#feead2",
        -0.1446, "#b8fefb",
        -0.02289, "#a5f9fe",
        0.2006, "#3fe7fd",
        0.5087, "#07c0f2",
        1, "#0095ff"
      ]
    }
  },
  "renda_rio-4ks1k8": {
     "type": "fill",
    "source": "composite",
    "id": "renda_rio-4ks1k8",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        1500,
        "#ece2f0",
        6000,
        "#a6bddb",
        13000,
        "#3690c0",
        25000,
        "#02818a",
        95000,
        "#014636"
      ]
    },
    "source-layer": "renda_rio-4ks1k8"
  },
  "rotas_onibus-5yarkv": {
    "layout": {
      "visibility": "none"
    },
    "type": "line",
    "source": "composite",
    "id": "rotas-onibus-5yarkv",
    "paint": {
      "line-color": "#cb181d"
    },
    "source-layer": "rotas_onibus-5yarkv"
  },
  "heatmap_bilhetagem_rio-59w42o": {
    "type": "fill",
    "source": "composite",
    "id": "heatmap-bilhetagem-rio-59w42o",
    "paint": {
      "fill-color": [
        "step",
        [
          "get",
          "Número de Passageiros"
        ],
        "#000004",
        5,
        "#420a68",
        25,
        "#932667",
        50,
        "#dd513a",
        100,
        "#fca50a",
        18043,
        "#fcffa4"
      ]
    },
    "source-layer": "heatmap_bilhetagem_rio-59w42o",
    "layout": {
      "visibility": "none"
    }
  },
  "populacao_rio-19sjpd": 
  {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-rio-19sjpd",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        500,
        "#e5f5e0",
        1000,
        "#a1d99b",
        2500,
        "#41ab5d",
        5000,
        "#006d2c",
        12281,
        "#00441b"
      ]
    },
    "source-layer": "populacao_rio-19sjpd"
  }
}

// Helper function to get layer style by source layer name
export function getLayerStyle(sourceLayer: string): LayerStyle | null {
  return layerStyles[sourceLayer] || null
}

// Helper function to create a layer configuration with custom style
export function createStyledLayer(layerId: string, sourceLayer: string, tilesetId: string): LayerStyle | null {
  const style = getLayerStyle(sourceLayer)
  if (!style) return null
  
  return {
    ...style,
    id: layerId,
    source: layerId, // Use the layerId as source since we're adding it as a vector source
    'source-layer': sourceLayer
  }
}
