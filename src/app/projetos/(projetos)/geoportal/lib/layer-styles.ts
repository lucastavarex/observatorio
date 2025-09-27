export interface LayerStyle {
  id: string
  type: 'fill' | 'line' | 'circle' | 'symbol'
  source: string
  'source-layer': string
  paint: Record<string, unknown>
  layout?: Record<string, unknown>
  slot?: string
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
  // ================== START RIO DE JANEIRO ==================
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
  },
  // ================== END RIO DE JANEIRO ==================
  // ================== START RECIFE ==================
  "populacao_rec-08mi0e": 
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-rec-08mi0e",
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
        1500,
        "#a1d99b",
        3000,
        "#41ab5d",
        4500,
        "#006d2c",
        6800,
        "#00441b"
      ]
    },
    "source-layer": "populacao_rec-08mi0e"
  },
  "renda_rec-bcpy1l":{
     "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "renda-rec-bcpy1l",
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
        3000,
        "#a6bddb",
        5500,
        "#3690c0",
        12500,
        "#02818a",
        45000,
        "#014636"
      ]
    },
    "source-layer": "renda_rec-bcpy1l"
  },
  
  // ================== END RECIFE ==================
  // ================== START BELO HORIZONTE ==================
  "populacao-a5w87s":
  {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-a5w87s",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        250,
        "#e5f5e0",
        1000,
        "#a1d99b",
        2000,
        "#41ab5d",
        2500,
        "#006d2c",
        6681,
        "#00441b"
      ]
    },
    "source-layer": "populacao-a5w87s"
  },
  "renda-42uz5h":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "renda-42uz5h",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        3000,
        "#ece2f0",
        4000,
        "#a6bddb",
        5500,
        "#3690c0",
        10000,
        "#02818a",
        78299,
        "#014636"
      ]
    },
    "source-layer": "renda-42uz5h"
  },
  "heatmap_embarques-b8mehl":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "heatmap-embarques-b8mehl",
    "paint": {
      "fill-opacity": 0.7,
      "fill-outline-color": "#000000",
      "fill-color": [
        "step",
        [
          "get",
          "Média de Embarques (dia útil)"
        ],
        "#000004",
        150,
        "#420a68",
        250,
        "#932667",
        400,
        "#dd513a",
        700,
        "#fca50a",
        6144,
        "#fcffa4"
      ]
    },
    "slot": "",
    "source-layer": "heatmap_embarques-b8mehl"
  },
  "ciclovia-48ed00":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "line",
    "source": "composite",
    "id": "ciclovia-48ed00",
    "paint": {
      "line-color": "#006d2c"
    },
    "slot": "",
    "source-layer": "ciclovia-48ed00"
  },
  "rotas_onibus_agregado-4r2tni":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "line",
    "source": "composite",
    "id": "rotas-onibus-agregado-4r2tni",
    "paint": {
      "line-color": "#cb181d"
    },
    "slot": "",
    "source-layer": "rotas_onibus_agregado-4r2tni"
  },
   // ================== END BELO HORIZONTE ==================

   // ================== START NITERÓI ==================
   "renda-987gzt":
   {
    "type": "fill",
    "source": "composite",
    "id": "renda-987gzt",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#ece2f0",
        3400,
        "#a6bddb",
        5400,
        "#3690c0",
        8800,
        "#02818a",
        14960,
        "#014636",
        28550.3109,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "renda-987gzt",
    "layout": {
      "visibility": "none"
    }
  },
  "populacao_nit-3oog1f":
  {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-nit-3oog1f",
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
        3500,
        "#41ab5d",
        7000,
        "#006d2c",
        11250,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "populacao_nit-3oog1f"
  },
  "heatmap-2eyldb":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "heatmap-2eyldb",
    "paint": {
      "fill-opacity": 0.7,
      "fill-outline-color": "#000000",
      "fill-color": [
        "step",
        [
          "get",
          "Passageiros"
        ],
        "#000004",
        30,
        "#420a68",
        150,
        "#932667",
        400,
        "#dd513a",
        900,
        "#fca50a",
        19475,
        "#fcffa4"
      ]
    },
    "slot": "",
    "source-layer": "heatmap-2eyldb"
  },
  "rotas_onibus-7wlr7f":
   {
    "type": "line",
    "source": "composite",
    "id": "rotas-onibus-7wlr7f",
    "paint": {
      "line-color": "#cb181d"
    },
    "slot": "",
    "source-layer": "rotas_onibus-7wlr7f",
    "layout": {
      "visibility": "none"
    }
  }

   // ================== END NITERÓI ==================

   // ================== START SANTO ANDRÉ ==================
   // ================== END SANTO ANDRÉ ==================

   // ================== START SALVADOR ==================
   // ================== END SALVADOR ==================

   // ================== START SALVADOR ==================
   // ================== END SALVADOR ==================

   // ================== START CAMPINAS ==================
   // ================== END CAMPINAS ==================

   // ================== START PORTO ALEGRE ==================
   // ================== END PORTO ALEGRE ==================
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
