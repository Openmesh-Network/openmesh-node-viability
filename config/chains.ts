import { z } from "zod"

export const chainNames = {
  ethereum: "Ethereum",
  polkadot: "Polkadot",
  cosmos: "Cosmos",
  avalanche: "Avalanche",
  algorand: "Algorand",
  nearProtocol: "Near Protocol",
  fantom: "Fantom",
  kusama: "Kusama",
  celo: "Celo",
  polygon: "Polygon",
  zilliqa: "Zilliqa",
} as const

export const chains = z.enum([
  "ethereum",
  // "polkadot",
  "cosmos",
  "avalanche",
  "algorand",
  "nearProtocol",
  "fantom",
  "kusama",
  "celo",
  "polygon",
  "zilliqa",
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
    avgReward: 0.13,
    operationalCosts: {
      aws: 210.0,
      gcp: 205.0,
      azure: 384,
      openmesh: 25.5,
      bareMetal: 85.0,
    },
  },
  // polkadot: {
  //   avgReward: 22628.0,
  //   operationalCosts: {
  //     aws: 176.66,
  //     gcp: 210.0,
  //     azure: 580,
  //     openmesh: 22.5,
  //     bareMetal: 75.0,
  //   },
  // },
  cosmos: {
    avgReward: 747.08,
    operationalCosts: {
      aws: 176.66,
      gcp: 210.0,
      azure: 518,
      openmesh: 20.5,
      bareMetal: 70.0,
    },
  },
  avalanche: {
    avgReward: 14.17,
    operationalCosts: {
      aws: 176.66,
      gcp: 160.0,
      azure: 625,
      openmesh: 27.5,
      bareMetal: 92.5,
    },
  },
  algorand: {
    avgReward: 250.0,
    operationalCosts: {
      aws: 100.0,
      gcp: 90.0,
      azure: 167,
      openmesh: 10.5,
      bareMetal: 35.0,
    },
  },
  nearProtocol: {
    avgReward: 697.92,
    operationalCosts: {
      aws: 160.0,
      gcp: 140.0,
      azure: 645,
      openmesh: 31.5,
      bareMetal: 105.0,
    },
  },
  fantom: {
    avgReward: 5350.0,
    operationalCosts: {
      aws: 385.0,
      gcp: 425.0,
      azure: 1638,
      openmesh: 37.5,
      bareMetal: 125.0,
    },
  },
  kusama: {
    avgReward: 583.0,
    operationalCosts: {
      aws: 195.0,
      gcp: 225.0,
      azure: 580,
      openmesh: 22.5,
      bareMetal: 75.0,
    },
  },
  celo: {
    avgReward: 58.0,
    operationalCosts: {
      aws: 290.0,
      gcp: 340.0,
      azure: 645,
      openmesh: 31.5,
      bareMetal: 105.0,
    },
  },
  polygon: {
    avgReward: 1667.0,
    operationalCosts: {
      aws: 111.36,
      gcp: 283.44,
      azure: 283,
      openmesh: 20.5,
      bareMetal: 85.0,
    },
  },
  zilliqa: {
    avgReward: 8333.0,
    operationalCosts: {
      aws: 111.36,
      gcp: 283.44,
      azure: 283,
      openmesh: 20.5,
      bareMetal: 85.0,
    },
  },
} as const
