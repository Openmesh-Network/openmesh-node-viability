import { z } from "zod"

export const chainNames = {
  ethereum: "Ethereum",
  solana: "Solana",
  avalanche: "Avalanche",
  elrond: "Elrond",
  bandProtocol: "Band Protocol",
  cosmos: "Cosmos",
  nearProtocol: "Near Protocol",
  fantom: "Fantom",
  celo: "Celo",
  binanceSmartChain: "Binance Smart Chain",
  arbitrum: "Arbitrum",
  optimism: "Optimism",
  filecoin: "Filecoin",
  curveFinance: "Curve Finance",
} as const

export const chains = z.enum([
  "ethereum",
  "solana",
  "avalanche",
  "elrond",
  "bandProtocol",
  "cosmos",
  "nearProtocol",
  "fantom",
  "celo",
  "binanceSmartChain",
  "arbitrum",
  "optimism",
  "filecoin",
  "curveFinance",
])
export type Chain = z.infer<typeof chains>

export const providers = z.enum([
  "openmesh",
  "aws",
  "gcp",
  "azure",
  "bareMetal",
])
export type Provider = z.infer<typeof providers>

export type ChainData = {
  basePrice: number
  avgReward: number
  operationalCosts: {
    aws: number
    gcp: number
    azure: number
    openmesh: number
    bareMetal: number
  }
}
export const chainData: Record<Chain, ChainData> = {
  ethereum: {
    basePrice: 2400,
    avgReward: 1100,
    operationalCosts: {
      aws: 1100,
      gcp: 1000,
      azure: 1200,
      openmesh: 400,
      bareMetal: 900,
    },
  },
  solana: {
    basePrice: 140,
    avgReward: 900,
    operationalCosts: {
      aws: 800,
      gcp: 850,
      azure: 820,
      openmesh: 330,
      bareMetal: 670,
    },
  },
  avalanche: {
    basePrice: 11,
    avgReward: 450,
    operationalCosts: {
      aws: 600,
      gcp: 580,
      azure: 620,
      openmesh: 250,
      bareMetal: 520,
    },
  },
  elrond: {
    basePrice: 28,
    avgReward: 380,
    operationalCosts: {
      aws: 550,
      gcp: 530,
      azure: 570,
      openmesh: 220,
      bareMetal: 480,
    },
  },
  bandProtocol: {
    basePrice: 1.2,
    avgReward: 150,
    operationalCosts: {
      aws: 300,
      gcp: 290,
      azure: 310,
      openmesh: 120,
      bareMetal: 260,
    },
  },
  cosmos: {
    basePrice: 7,
    avgReward: 320,
    operationalCosts: {
      aws: 480,
      gcp: 460,
      azure: 500,
      openmesh: 200,
      bareMetal: 420,
    },
  },
  nearProtocol: {
    basePrice: 1.3,
    avgReward: 180,
    operationalCosts: {
      aws: 350,
      gcp: 340,
      azure: 360,
      openmesh: 140,
      bareMetal: 300,
    },
  },
  fantom: {
    basePrice: 0.3,
    avgReward: 100,
    operationalCosts: {
      aws: 250,
      gcp: 240,
      azure: 260,
      openmesh: 100,
      bareMetal: 220,
    },
  },
  celo: {
    basePrice: 0.4,
    avgReward: 90,
    operationalCosts: {
      aws: 230,
      gcp: 220,
      azure: 240,
      openmesh: 95,
      bareMetal: 200,
    },
  },
  binanceSmartChain: {
    basePrice: 220,
    avgReward: 800,
    operationalCosts: {
      aws: 750,
      gcp: 730,
      azure: 770,
      openmesh: 300,
      bareMetal: 650,
    },
  },
  arbitrum: {
    basePrice: 1.1,
    avgReward: 200,
    operationalCosts: {
      aws: 400,
      gcp: 380,
      azure: 420,
      openmesh: 160,
      bareMetal: 350,
    },
  },
  optimism: {
    basePrice: 1.5,
    avgReward: 220,
    operationalCosts: {
      aws: 420,
      gcp: 400,
      azure: 440,
      openmesh: 170,
      bareMetal: 370,
    },
  },
  filecoin: {
    basePrice: 3.8,
    avgReward: 280,
    operationalCosts: {
      aws: 450,
      gcp: 430,
      azure: 470,
      openmesh: 180,
      bareMetal: 400,
    },
  },
  curveFinance: {
    basePrice: 0.5,
    avgReward: 130,
    operationalCosts: {
      aws: 280,
      gcp: 270,
      azure: 290,
      openmesh: 110,
      bareMetal: 240,
    },
  },
} as const
