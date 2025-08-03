// SVG icon imports from assets directory
import aeromovelIcon from "@/app/assets/images/aeromovel.svg"
import bandeiraIcon from "@/app/assets/images/bandeira.svg"
import barcoIcon from "@/app/assets/images/barco.svg"
import bicicletaIcon from "@/app/assets/images/bicicleta.svg"
import brtIcon from "@/app/assets/images/BRT.svg"
import carroIcon from "@/app/assets/images/carro.svg"
import equipamentosIcon from "@/app/assets/images/equipamentos.svg"
import monotrilhoIcon from "@/app/assets/images/monotrilho.svg"
import mototaxisIcon from "@/app/assets/images/mototaxis.svg"
import multasIcon from "@/app/assets/images/multas.svg"
import onibusIcon from "@/app/assets/images/onibus.svg"
import pedestreIcon from "@/app/assets/images/pedestre.svg"
import subsidiosIcon from "@/app/assets/images/subsidios.svg"
import taxisIcon from "@/app/assets/images/taxis.svg"
import trabalhadoresIcon from "@/app/assets/images/trabalhadores.svg"
import tremIcon from "@/app/assets/images/trem.svg"
import tributosIcon from "@/app/assets/images/tributos.svg"
import valoresIcon from "@/app/assets/images/valores.svg"
import vanIcon from "@/app/assets/images/van.svg"
import viagensIcon from "@/app/assets/images/viagens.svg"
import vltIcon from "@/app/assets/images/VLT.svg"

import { FilterCategoriesType } from "./types"

// Complete filter categories extracted from arvore.js with all transportation data
export const filterCategories: FilterCategoriesType = {
  "Infraestrutura": {
    "Ônibus": {
      icon: onibusIcon.src,
      options: [
        "Terminais Rodoviários",
        "Terminais Rodoviários com Acessibilidade (Deficiência Física)",
        "Terminais Rodoviários com Acessibilidade (Deficiência Visual)",
        "Terminais Rodoviários com Integração Física",
        "Total de Pontos de Embarque",
        "Total de Pontos de Embarque com Abrigo",
        "Total de Pontos de Embarque com Acessibilidade",
        "Pontos de Embarque são georreferenciados?",
        "Quilometragem de Corredores Exclusivos de Ônibus",
        "Quilometragem de Faixas Exclusivas",
        "Velocidade Média dos Corredores de Ônibus em Horário de Pico",
        "Velocidade Média das Faixas Exclusivas de Ônibus em Horário de Pico",
        "Velocidade Média do Sistema de Transporte Público Coletivo em Vias de Tráfego Misto no Horário de Pico",
        "Terminais Rodoviários com Informações de Itinerário",
        "Terminais Rodoviários com Informações de Horários",
        "Terminais Rodoviários com Informações de Tarifas",
        "Terminais Rodoviários com Informações de Integração",
        "Pontos de Embarque com Informações de Itinerários",
        "Pontos de Embarque com Informações de Horários",
        "Pontos de Embarque com Informações de Tarifas",
        "Pontos de Embarque com Informações de Integração",
        "Proporção de Viagens de Ônibus Realizadas dentro o Horário Programado",
        "Proporção de Viagens de Ônibus não Completadas"
      ]
    },
    "Metrô/Trem": {
      icon: tremIcon.src,
      options: [
        "Estações Metroferroviárias",
        "Estações Metroferroviárias com Acessibilidade (Deficiência Física)",
        "Estações Metroferroviárias com Acessibilidade (Deficiência Visual)",
        "Estações Metroferroviárias com Integração Física",
        "Estações Metroferroviárias com Informações de Itinerários",
        "Estações Metroferroviárias com Informações de Horários",
        "Estações Metroferroviárias com Informações de Tarifas",
        "Estações Metroferroviárias com Informações de Integração"
      ]
    },
    "Pedestre": {
      icon: pedestreIcon.src,
      options: [
        "Quilometragem de Vias Exclusivas para Pedestres",
        "Quilometragem de Vias Exclusivas Temporárias para Pedestres",
        "Quilometragem de calçadas"
      ]
    },
    "BRT": {
      icon: brtIcon.src,
      options: [
        "Quilometragem de Vias Exclusivas para BRT",
        "Velocidade Média do BRT em Horário de Pico"
      ]
    },
    "Bicicletas": {
      icon: bicicletaIcon.src,
      options: [
        "Quilometragem de Ciclovias Exclusivas",
        "Quilometragem de Ciclofaixas Exclusivas"
      ]
    },
    "Metrô": {
      icon: tremIcon.src,
      options: [
        "Quilometragem de Linhas de Metrô",
        "Velocidade Média do Sistema de Metrô no Horário de Pico",
        "Proporção de Viagens de Metrô Realizadas dentro do Horário Programado",
        "Proporção de Viagens de Metro não Completadas"
      ]
    },
    "Trem": {
      icon: tremIcon.src,
      options: [
        "Quilometragem de Linhas de Trem",
        "Velocidade Média do Sistema de Trem no Horário de Pico",
        "Proporção de Viagens de Trem Realizadas dentro do Horário Programado",
        "Proporção de Viagens de Trem não Completadas"
      ]
    },
    "VLT": {
      icon: vltIcon.src,
      options: [
        "Quilometragem de Linhas de VLT",
        "Velocidade Média do Sistema de VLT no Horário de Pico",
        "Proporção de Viagens de VLT Realizadas dentro do Horário Programado",
        "Proporção de Viagens de VLT não Completadas"
      ]
    },
    "Monotrilho": {
      icon: monotrilhoIcon.src,
      options: [
        "Quilometragem de Linhas de Monotrilho",
        "Velocidade Média do Sistema de Monotrilho no Horário de Pico",
        "Proporção de Viagens de Monotrilho Realizadas dentro do Horário Programado",
        "Proporção de Viagens de Monotrilho não Completadas"
      ]
    },
    "Aeromóvel": {
      icon: aeromovelIcon.src,
      options: [
        "Quilometragem de Vias Exclusivas de Aeromóvel",
        "Velocidade Média do Sistema de Aeromóvel no Horário de Pico",
        "Proporção de Viagens de Aeromóvel Realizadas dentro do Horário Programado",
        "Proporção de Viagens de Aeromóvel não Completadas"
      ]
    },
    "Vans/Microônibus": {
      icon: vanIcon.src,
      options: [
        "Proporção de Viagens de Vans/Microônibus Realizadas dentro do Horário Programado",
        "Proporção de Viagens de Vans/Microônibus não Completadas"
      ]
    },
    "Barco": {
      icon: barcoIcon.src,
      options: [
        "Proporção de Viagens de Barco Realizadas dentro do Horário Programado",
        "Proporção de Viagens de Barco não Completadas"
      ]
    },
    "Automóvel": {
      icon: carroIcon.src,
      options: [
        "Vagas de Estacionamento Regulamentados no município?",
        "Proporção de Vagas de Estacionamento para PCDs",
        "Proporção de Vagas de Estacionamento para Idosos",
        "Proporção de Vagas de Estacionamento para Gestantes"
      ]
    },
    "Trabalhadores": {
      icon: trabalhadoresIcon.src,
      options: [
        "Agentes de Trânsito em Exercício"
      ]
    },
    "Equipamentos": {
      icon: equipamentosIcon.src,
      options: [
        "Equipamentos de Fiscalização de Velocidade Existentes"
      ]
    }
  },
  "Frota": {
    "Ônibus": {
      icon: onibusIcon.src,
      options: [
        "Frota de Ônibus Convencional",
        "Capacidade Média da Frota de Ônibus Convencional",
        "Frota de Ônibus Convencional com Piso Baixo",
        "Frota de Ônibus Convencional com Plataforma Elevatória",
        "Frota de Ônibus Articulado",
        "Capacidade Média da Frota de Ônibus Articulado",
        "Frota de Ônibus Articulado com Piso Baixo",
        "Frota de Ônibus Articulado com Plataforma Elevatória",
        "Frota de Ônibus Biarticulado",
        "Capacidade Média da Frota de Ônibus Biarticulado",
        "Frota de Ônibus Biarticulado com Piso Baixo",
        "Frota de Ônibus Biarticulado com Plataforma Elevatória",
        "Frota de Veículos Fretados para Passageiros",
        "Frota de Veículos Escolares",
        "Quilometragem Percorrida pela Frota de Ônibus",
        "Idade Média da Frota de Ônibus"
      ]
    },
    "Vans/Microônibus": {
      icon: vanIcon.src,
      options: [
        "Frota de Vans/Microônibus",
        "Capacidade Média da Frota de Vans/Microônibus",
        "Quilometragem Percorrida pela Frota de Vans/Microônibus",
        "Idade Média da Frota de Vans/Microônibus"
      ]
    },
    "Táxis": {
      icon: taxisIcon.src,
      options: [
        "Frota de Táxis",
        "Idade Média da Frota de Táxi",
        "Proporção da Frota de Táxi que Utiliza Etanol como Fonte de Energia",
        "Proporção da Frota de Táxi que Utiliza Eletricidade como Fonte de Energia",
        "Proporção da Frota de Táxi que Utiliza Gás Natural como Fonte de Energia",
        "Proporção da Frota de Táxi que Utiliza Energia Híbrida como Fonte de Energia"
      ]
    },
    "Mototáxis": {
      icon: mototaxisIcon.src,
      options: [
        "Frota de Mototáxis"
      ]
    },
    "Metrô": {
      icon: tremIcon.src,
      options: [
        "Frota (composições) de Metrôs",
        "Capacidade Média da Frota (composições) de Metrô",
        "Quilometragem Percorrida pela Frota de Metrô",
        "Idade Média da Frota de Metrô"
      ]
    },
    "Trem": {
      icon: tremIcon.src,
      options: [
        "Frota (composições) de Trem",
        "Capacidade Média da Frota (composição) de Trem",
        "Quilometragem Percorrida pela Frota de Trem",
        "Idade Média da Frota de Trem"
      ]
    },
    "Barco": {
      icon: barcoIcon.src,
      options: [
        "Frota de Barcos",
        "Capacidade Média da Frota de Barcos",
        "Quilometragem Percorrida pela Frota de Barcos"
      ]
    },
    "VLT": {
      icon: vltIcon.src,
      options: [
        "Frota (composições) de VLT",
        "Capacidade Média da Frota (composição) de VLT",
        "Quilometragem Percorrida pela Frota de VLT",
        "Idade Média da Frota de VLT"
      ]
    },
    "Monotrilho": {
      icon: monotrilhoIcon.src,
      options: [
        "Frota (composição) de Monotrilho",
        "Capacidade da Frota (composição) de Monotrilho",
        "Quilometragem Percorrida pela Frota de Monotrilho",
        "Idade Média da Frota de Monotrilho"
      ]
    },
    "Aeromóvel": {
      icon: aeromovelIcon.src,
      options: [
        "Frota de Aeromóvel",
        "Capacidade média da Frota de Aeromóvel",
        "Quilometragem Percorrida pela Frota de Aeromóvel",
        "Idade Média da Frota de Aeromóvel"
      ]
    },
    "Bicicletas": {
      icon: bicicletaIcon.src,
      options: [
        "Frota de Bicicletas Compartilhadas"
      ]
    },
    "Automóvel": {
      icon: carroIcon.src,
      options: [
        "Proporção de Frota que Usa Etanol como Fonte de Energia",
        "Proporção de Frota que Usa Eletricidade como Fonte de Energia",
        "Proporção de Frota que Usa Gás Natural como Fonte de Energia",
        "Proporção de Frota que Usa Hidrogênio como Fonte de Energia",
        "Proporção de Frota que Usa Biodiesel como Fonte de Energia",
        "Proporção de Frota que Usa Energia Híbrida como Fonte de Energia",
        "Quilometragem Percorrida por Transporte Remunerado Individual de Passageiros"
      ]
    }
  },
  "Tarifas": {
    "Valores": {
      icon: valoresIcon.src,
      options: [
        "Valor Atual da Tarifa Predominante",
        "Valor Anterior da Tarifa Predominante"
      ]
    },
    "Subsídios": {
      icon: subsidiosIcon.src,
      options: [
        "Desconto para Passageiros de Baixa Renda",
        "Renda Máxima para Baixa Renda",
        "Desconto para Passageiros entre 60 e 64 anos",
        "Descontos para PCDs",
        "Desconto para Estudantes da Rede Pública",
        "Desconto para Estudantes da Rede Privada"
      ]
    },
    "Bandeira": {
      icon: bandeiraIcon.src,
      options: [
        "Valor da Bandeira para Táxi",
        "Valor da Bandeira 1 para Táxi por Km rodado",
        "Valor da Bandeira 2 para Táxi por Km rodado",
        "Valor do Serviço de Táxi por hora parada",
        "Valor da Tarifa Aeroporto do Serviço de Táxi",
        "Valor da Bandeira para Mototáxi",
        "Valor da Bandeira 1 para Mototáxi por Km rodado",
        "Valor da Bandeira 2 para Mototáxi por Km rodado",
        "Valor do Serviço de Mototáxi por hora parada",
        "Valor da Tarifa Aeroporto do Serviço de Mototáxi"
      ]
    }
  },
  "Receita": {
    "Ônibus": {
      icon: onibusIcon.src,
      options: [
        "Receita Tarifária Arrecadada por Ônibus",
        "Valor do Subsídio Tarifário para o Sistema de Ônibus",
        "Valor do Subsídio Direto ao Sistema de Ônibus",
        "Valor Arrecadado com Publicidade no Sistema de Ônibus",
        "Valor Arrecadado com Outras Fontes de Recursos no Sistema de Ônibus"
      ]
    },
    "Vans/Microônibus": {
      icon: vanIcon.src,
      options: [
        "Receita Tarifária Arrecadada com Vans/Microõnibus",
        "Valor do Subsídio Tarifário para o Sistema de Vans/Microônibus",
        "Valor do Subsídio Direto ao Sistema de Vans/Microônibus",
        "Valor Arrecadado com Publicidade no Sistema de Vans/Microônibus",
        "Valor Arrecadado com Outras Fontes de Recursos no Sistema de Vans/Microônibus"
      ]
    },
    "Metrô": {
      icon: tremIcon.src,
      options: [
        "Receita Tarifária Arrecadada com Metrô",
        "Valor do Subsídio Tarifário para o Sistema de Metrô",
        "Valor do Subsídio Direto ao Sistema de Metrô",
        "Valor Arrecadado com Publicidade no Sistema de Metrô",
        "Valor Arrecadado com Outras Fontes de Recursos no Sistema de Metrô"
      ]
    },
    "Trem": {
      icon: tremIcon.src,
      options: [
        "Receita Tarifária Arrecadada com Trem",
        "Valor do Subsídio Tarifário para o Sistema de Trem",
        "Valor do Subsídio Direto ao Sistema de Trem",
        "Valor Arrecadado com Publicidade no Sistema de Trem",
        "Valor Arrecadado com Outras Fontes de Recursos no Sistema de Trem"
      ]
    },
    "Barco": {
      icon: barcoIcon.src,
      options: [
        "Receita Tarifária Arrecadada com Barco",
        "Valor do Subsídio Tarifário para o Sistema de Barco",
        "Valor do Subsídio Direto ao Sistema de Barco",
        "Valor Arrecadado com Publicidade no Sistema de Barco",
        "Valor Arrecadado com Outras Fontes de Recursos no Sistema de Barco"
      ]
    },
    "VLT": {
      icon: vltIcon.src,
      options: [
        "Receita Tarifária Arrecadada com VLT",
        "Valor do Subsídio Tarifário para o Sistema de VLT",
        "Valor do Subsídio Direto ao Sistema de VLT",
        "Valor Arrecadado com Publicidade no Sistema de VLT",
        "Valor Arrecadado com Outras Fontes de Recursos no Sistema de VLT"
      ]
    },
    "Monotrilho": {
      icon: monotrilhoIcon.src,
      options: [
        "Receita Tarifária Arrecadada com Monotrilho",
        "Valor do Subsídio Tarifário para o Sistema de Monotrilho",
        "Valor do Subsídio Direto ao Sistema de Monotrilho",
        "Valor Arrecadado com Publicidade no Sistema de Monotrilho",
        "Valor Arrecadado com Outras Fontes de Recursos no Sistema de Monotrilho"
      ]
    },
    "Aeromóvel": {
      icon: aeromovelIcon.src,
      options: [
        "Receita Tarifária Arrecadada com Aeromóvel",
        "Valor do Subsídio Tarifário para o Sistema de Aeromóvel",
        "Valor do Subsídio Direto ao Sistema de Aeromóvel",
        "Valor Arrecadado com Publicidade no Sistema de Aeromóvel",
        "Valor Arrecadado com Outras Fontes de Recursos no Sistema de Aeromóvel"
      ]
    }
  },
  "Custos": {
    "Ônibus": {
      icon: onibusIcon.src,
      options: [
        "ISS Incidente no Serviço de Transporte de Ônibus",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de Ônibus",
        "PIS Incidente no Serviço de Transporte de Ônibus",
        "Cofins Incidente no Serviço de Transporte de Ônibus",
        "Outros Impostos Incidentes no Serviço de Transporte de Ônibus",
        "Custo de Mão de Obra Operacional do Serviço de Ônibus",
        "Custo de Mão de Obra Administrativa do Serviço de Ônibus",
        "Custo de Combustíveis no Serviço de Ônibus",
        "Custo de Depreciação no Serviço de Ônibus",
        "Custo de Remuneração de Serviços no Serviço de Ônibus",
        "Custo de Peças no Serviço de Ônibus",
        "Custo de Impostos no Serviço de Ônibus",
        "Custo de Despesas Administrativas no Serviço de Ônibus",
        "Custo de Outros Insumos no Serviço de Ônibus"
      ]
    },
    "Vans/Microônibus": {
      icon: vanIcon.src,
      options: [
        "ISS Incidente no Serviço de Transporte de Vans/Microônibus",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de Vans/Microônibus",
        "PIS Incidente no Serviço de Transporte de Vans/Microônibus",
        "Cofins Incidente no Serviço de Transporte de Vans/Microônibus",
        "Outros Impostos Incidentes no Serviço de Transporte de Vans/Microônibus",
        "Custo de Mão de Obra Operacional do Serviço de Vans/Microônibus",
        "Custo de Mão de Obra Administrativa do Serviço de Vans/Microônibus",
        "Custo de Combustíveis no Serviço de Vans/Microônibus",
        "Custo de Depreciação no Serviço de Vans/Microônibus",
        "Custo de Remuneração de Serviços no Serviço de Vans/Microônibus",
        "Custo de Peças no Serviço de Vans/Microônibus",
        "Custo de Impostos no Serviço de Vans/Microônibus",
        "Custo de Despesas Administrativas no Serviço de Vans/Microônibus",
        "Custo de Outros Insumos no Serviço de Vans/Microônibus"
      ]
    },
    "Metrô": {
      icon: tremIcon.src,
      options: [
        "ISS Incidente no Serviço de Transporte de Metrô",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de Metrô",
        "PIS Incidente no Serviço de Transporte de Metrô",
        "Cofins Incidente no Serviço de Transporte de Metrô",
        "Outros Impostos Incidentes no Serviço de Transporte de Metrô",
        "Custo de Mão de Obra Operacional do Serviço de Metrô",
        "Custo de Mão de Obra Administrativa do Serviço de Metrô",
        "Custo de Combustíveis no Serviço de Metrô",
        "Custo de Depreciação no Serviço de Metrô",
        "Custo de Remuneração de Serviços no Serviço de Metrô",
        "Custo de Peças no Serviço de Metrô",
        "Custo de Impostos no Serviço de Metrô",
        "Custo de Despesas Administrativas no Serviço de Metrô",
        "Custo de Energia no Serviço de Metrô",
        "Custo de IPTU no Serviço de Metrô",
        "Custo de Outros Insumos no Serviço de Metrô"
      ]
    },
    "Trem": {
      icon: tremIcon.src,
      options: [
        "ISS Incidente no Serviço de Transporte de Trem",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de Trem",
        "PIS Incidente no Serviço de Transporte de Trem",
        "Cofins Incidente no Serviço de Transporte de Trem",
        "Outros Impostos Incidentes no Serviço de Transporte de Trem",
        "Custo de Mão de Obra Operacional do Serviço de Trem",
        "Custo de Mão de Obra Administrativa do Serviço de Trem",
        "Custo de Combustíveis no Serviço de Trem",
        "Custo de Depreciação no Serviço de Trem",
        "Custo de Remuneração de Serviços no Serviço de Trem",
        "Custo de Peças no Serviço de Trem",
        "Custo de Impostos no Serviço de Trem",
        "Custo de Despesas Administrativas no Serviço de Trem",
        "Custo de Energia no Serviço de Trem",
        "Custo de IPTU no Serviço de Trem",
        "Custo de Outros Insumos no Serviço de Trem"
      ]
    },
    "Barco": {
      icon: barcoIcon.src,
      options: [
        "ISS Incidente no Serviço de Transporte de Barco",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de Barco",
        "PIS Incidente no Serviço de Transporte de Barco",
        "Cofins Incidente no Serviço de Transporte de Barco",
        "Outros Impostos Incidentes no Serviço de Transporte de Barco",
        "Custo de Mão de Obra Operacional do Serviço de Barco",
        "Custo de Mão de Obra Administrativa do Serviço de Barco",
        "Custo de Combustíveis no Serviço de Barco",
        "Custo de Depreciação no Serviço de Barco",
        "Custo de Remuneração de Serviços no Serviço de Barco",
        "Custo de Peças no Serviço de Barco",
        "Custo de Impostos no Serviço de Barco",
        "Custo de Despesas Administrativas no Serviço de Barco",
        "Custo de Outros Insumos no Serviço de Barco"
      ]
    },
    "VLT": {
      icon: vltIcon.src,
      options: [
        "ISS Incidente no Serviço de Transporte de VLT",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de VLT",
        "PIS Incidente no Serviço de Transporte de VLT",
        "Cofins Incidente no Serviço de Transporte de VLT",
        "Outros Impostos Incidentes no Serviço de Transporte de VLT",
        "Custo de Mão de Obra Operacional do Serviço de VLT",
        "Custo de Mão de Obra Administrativa do Serviço de VLT",
        "Custo de Combustíveis no Serviço de VLT",
        "Custo de Depreciação no Serviço de VLT",
        "Custo de Remuneração de Serviços no Serviço de VLT",
        "Custo de Peças no Serviço de VLT",
        "Custo de Impostos no Serviço de VLT",
        "Custo de Despesas Administrativas no Serviço de VLT",
        "Custo de Energia no Serviço de VLT",
        "Custo de IPTU no Serviço de VLT",
        "Custo de Outros Insumos no Serviço de VLT"
      ]
    },
    "Monotrilho": {
      icon: monotrilhoIcon.src,
      options: [
        "ISS Incidente no Serviço de Transporte de Monotrilho",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de Monotrilho",
        "PIS Incidente no Serviço de Transporte de Monotrilho",
        "Cofins Incidente no Serviço de Transporte de Monotrilho",
        "Outros Impostos Incidentes no Serviço de Transporte de Monotrilho",
        "Custo de Mão de Obra Operacional do Serviço de Monotrilho",
        "Custo de Mão de Obra Administrativa do Serviço de Monotrilho",
        "Custo de Combustíveis no Serviço de Monotrilho",
        "Custo de Depreciação no Serviço de Monotrilho",
        "Custo de Remuneração de Serviços no Serviço de Monotrilho",
        "Custo de Peças no Serviço de Monotrilho",
        "Custo de Impostos no Serviço de Monotrilho",
        "Custo de Despesas Administrativas no Serviço de Monotrilho",
        "Custo de Energia no Serviço de Monotrilho",
        "Custo de IPTU no Serviço de Monotrilho",
        "Custo de Outros Insumos no Serviço de Monotrilho"
      ]
    },
    "Aeromóvel": {
      icon: aeromovelIcon.src,
      options: [
        "ISS Incidente no Serviço de Transporte de Aeromóvel",
        "Taxa de Gerenciamento Incidente no Serviço de Transporte de Aeromóvel",
        "PIS Incidente no Serviço de Transporte de Aeromóvel",
        "Cofins Incidente no Serviço de Transporte de Aeromóvel",
        "Outros Impostos Incidentes no Serviço de Transporte de Aeromóvel",
        "Custo de Mão de Obra Operacional do Serviço de Aeromóvel",
        "Custo de Mão de Obra Administrativa do Serviço de Aeromóvel",
        "Custo de Combustíveis no Serviço de Aeromóvel",
        "Custo de Depreciação no Serviço de Aeromóvel",
        "Custo de Remuneração de Serviços no Serviço de Aeromóvel",
        "Custo de Peças no Serviço de Aeromóvel",
        "Custo de Impostos no Serviço de Aeromóvel",
        "Custo de Despesas Administrativas no Serviço de Aeromóvel",
        "Custo de Energia no Serviço de Aeromóvel",
        "Custo de IPTU no Serviço de Aeromóvel",
        "Custo de Outros Insumos no Serviço de Aeromóvel"
      ]
    }
  },
  "Demanda": {
    "Ônibus": {
      icon: onibusIcon.src,
      options: [
        "Passageiros Comuns Transportados por Ônibus",
        "Passageiros de Vale Transporte Transportados por Ônibus",
        "Estudantes Transportados por Ônibus",
        "Passageiros de Integração Transportados por Ônibus",
        "Gratuidades no Transporte de Ônibus",
        "Total Equivalente de Passageiros Transportados por Ônibus"
      ]
    },
    "Vans/Microônibus": {
      icon: vanIcon.src,
      options: [
        "Passageiros Comuns Transportados por Vans/Microônibus",
        "Passageiros de Vale Transporte Transportados por Vans/Microônibus",
        "Estudantes Transportados por Vans/Microônibus",
        "Passageiros de Integração Transportados por Vans/Microônibus",
        "Gratuidades no Transporte de Vans/Microônibus",
        "Total Equivalente de Passageiros Transportados por Vans/Microônibus"
      ]
    },
    "Metrô": {
      icon: tremIcon.src,
      options: [
        "Passageiros Comuns Transportados por Metrô",
        "Passageiros de Vale Transporte Transportados por Metrô",
        "Estudantes Transportados por Metrô",
        "Passageiros de Integração Transportados por Metrô",
        "Gratuidades no Transporte de Metrô",
        "Total Equivalente de Passageiros Transportados por Metrô"
      ]
    },
    "Trem": {
      icon: tremIcon.src,
      options: [
        "Passageiros Comuns Transportados por Trem",
        "Passageiros de Vale Transporte Transportados por Trem",
        "Estudantes Transportados por Trem",
        "Passageiros de Integração Transportados por Trem",
        "Gratuidades no Transporte de Trem",
        "Total Equivalente de Passageiros Transportados por Trem"
      ]
    },
    "Barco": {
      icon: barcoIcon.src,
      options: [
        "Passageiros Comuns Transportados por Barco",
        "Passageiros de Vale Transporte Transportados por Barco",
        "Estudantes Transportados por Barco",
        "Passageiros de Integração Transportados por Barco",
        "Gratuidades no Transporte de Barco",
        "Total Equivalente de Passageiros Transportados por Barco"
      ]
    },
    "VLT": {
      icon: vltIcon.src,
      options: [
        "Passageiros Comuns Transportados por VLT",
        "Passageiros de Vale Transporte Transportados por VLT",
        "Estudantes Transportados por VLT",
        "Passageiros de Integração Transportados por VLT",
        "Gratuidades no Transporte de VLT",
        "Total Equivalente de Passageiros Transportados por VLT"
      ]
    },
    "Monotrilho": {
      icon: monotrilhoIcon.src,
      options: [
        "Passageiros Comuns Transportados por Monotrilho",
        "Passageiros de Vale Transporte Transportados por Monotrilho",
        "Estudantes Transportados por Monotrilho",
        "Passageiros de Integração Transportados por Monotrilho",
        "Gratuidades no Transporte de Monotrilho",
        "Total Equivalente de Passageiros Transportados por Monotrilho"
      ]
    },
    "Aeromóvel": {
      icon: aeromovelIcon.src,
      options: [
        "Passageiros Comuns Transportados por Aeromóvel",
        "Passageiros de Vale Transporte Transportados por Aeromóvel",
        "Estudantes Transportados por Aeromóvel",
        "Passageiros de Integração Transportados por Aeromóvel",
        "Gratuidades no Transporte de Aeromóvel",
        "Total Equivalente de Passageiros Transportados por Aeromóvel"
      ]
    },
    "Viagens": {
      icon: viagensIcon.src,
      options: [
        "Número Médio de Viagens Diárias no Município",
        "Distância Média das Viagens no Município",
        "Tempo Médio das Viagens no Município",
        "Proporção de Viagens a Pé",
        "Proporção de Viagens de Bicicleta",
        "Proporção de Viagens em Transporte Coletivo",
        "Proporção de Viagens em Transporte Individual Motorizado",
        "Proporção de Viagens em Transporte Individual Motocicleta",
        "Proporção de Viagens em Transporte Individual Remunerado",
        "Proporção de Viagens em Outros Modos de Transporte",
        "Viagens Realizadas por Transporte Remunerado Individual de Passageiros"
      ]
    }
  },
  "Arrecadação": {
    "Tributos": {
      icon: tributosIcon.src,
      options: [
        "Arrecadação Anual Tributos pela Utilização da Infraestrutura em Perímetro Urbano",
        "Valor Arrecadado com Cobrança de Estacionamento",
        "Arrecadação por Transporte Remunerado Individual de Passageiros"
      ]
    },
    "Multas": {
      icon: multasIcon.src,
      options: [
        "Arrecadação anual com Multas de Trânsito"
      ]
    }
  }
} 