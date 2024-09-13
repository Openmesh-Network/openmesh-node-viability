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
    basePrice: 2258.79,
    avgReward: 0.21,
    operationalCosts: {
      aws: 1100,
      gcp: 1000,
      azure: 1200,
      openmesh: 300,
      bareMetal: 900,
    },
  },
  solana: {
    basePrice: 21.97,
    avgReward: 42,
    operationalCosts: {
      aws: 800,
      gcp: 850,
      azure: 820,
      openmesh: 250,
      bareMetal: 670,
    },
  },
  avalanche: {
    basePrice: 21.97,
    avgReward: 35,
    operationalCosts: {
      aws: 600,
      gcp: 580,
      azure: 620,
      openmesh: 190,
      bareMetal: 520,
    },
  },
  elrond: {
    basePrice: 30.85,
    avgReward: 25,
    operationalCosts: {
      aws: 650,
      gcp: 630,
      azure: 670,
      openmesh: 200,
      bareMetal: 570,
    },
  },
  bandProtocol: {
    basePrice: 1.12,
    avgReward: 300,
    operationalCosts: {
      aws: 300,
      gcp: 290,
      azure: 310,
      openmesh: 90,
      bareMetal: 260,
    },
  },
  cosmos: {
    basePrice: 4.24,
    avgReward: 120,
    operationalCosts: {
      aws: 480,
      gcp: 460,
      azure: 500,
      openmesh: 150,
      bareMetal: 420,
    },
  },
  nearProtocol: {
    basePrice: 4.18,
    avgReward: 115,
    operationalCosts: {
      aws: 450,
      gcp: 430,
      azure: 470,
      openmesh: 135,
      bareMetal: 390,
    },
  },
  fantom: {
    basePrice: 0.3,
    avgReward: 2500,
    operationalCosts: {
      aws: 250,
      gcp: 240,
      azure: 260,
      openmesh: 75,
      bareMetal: 220,
    },
  },
  celo: {
    basePrice: 0.44,
    avgReward: 1800,
    operationalCosts: {
      aws: 230,
      gcp: 220,
      azure: 240,
      openmesh: 70,
      bareMetal: 200,
    },
  },
  binanceSmartChain: {
    basePrice: 220,
    avgReward: 3.8,
    operationalCosts: {
      aws: 750,
      gcp: 730,
      azure: 770,
      openmesh: 225,
      bareMetal: 650,
    },
  },
  arbitrum: {
    basePrice: 1.4,
    avgReward: 350,
    operationalCosts: {
      aws: 400,
      gcp: 380,
      azure: 420,
      openmesh: 120,
      bareMetal: 350,
    },
  },
  optimism: {
    basePrice: 1.39,
    avgReward: 360,
    operationalCosts: {
      aws: 420,
      gcp: 400,
      azure: 440,
      openmesh: 125,
      bareMetal: 370,
    },
  },
  filecoin: {
    basePrice: 3.67,
    avgReward: 130,
    operationalCosts: {
      aws: 450,
      gcp: 430,
      azure: 470,
      openmesh: 135,
      bareMetal: 400,
    },
  },
  curveFinance: {
    basePrice: 0.5,
    avgReward: 1000,
    operationalCosts: {
      aws: 280,
      gcp: 270,
      azure: 290,
      openmesh: 85,
      bareMetal: 240,
    },
  },
} as const
