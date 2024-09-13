import { ChainData } from "@/config/chains"

export type ProviderData = {
  operationalCost: number
  returns: number
  netProfit: number
}

export type DailyData = {
  date: string
  price: number
  aws: ProviderData
  gcp: ProviderData
  azure: ProviderData
  openmesh: ProviderData
  bareMetal: ProviderData
}

export function generateYearlyData({
  basePrice,
  avgReward,
  operationalCosts,
}: ChainData): DailyData[] {
  const yearlyData: DailyData[] = []
  const startDate = new Date("2024-01-01")

  const randomShift = Math.random() * 4
  for (let i = 0; i < 365; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    const month = currentDate.getMonth()

    const seasonalFactor = 1 + Math.sin(month / 2 - randomShift) * 0.2
    const randomFactor = 1 + (Math.random() - 0.5) * 0.05
    const monthlyFactor = seasonalFactor * randomFactor
    const dailyFactor = 1 + (Math.random() - 0.5) * 0.05
    const price =
      Math.round(basePrice * monthlyFactor * dailyFactor * 100) / 100

    const dailyData: DailyData = {
      date: currentDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      price,
      aws: calculateProviderData(operationalCosts.aws, avgReward),
      gcp: calculateProviderData(operationalCosts.gcp, avgReward),
      azure: calculateProviderData(operationalCosts.azure, avgReward),
      openmesh: calculateProviderData(operationalCosts.openmesh, avgReward),
      bareMetal: calculateProviderData(operationalCosts.bareMetal, avgReward),
    }

    yearlyData.push(dailyData)
  }

  return yearlyData
}

function calculateProviderData(
  operationalCost: number,
  returns: number,
): ProviderData {
  return {
    operationalCost,
    returns,
    netProfit: returns - operationalCost,
  }
}
