export type ProviderData = number
export type DailyData = {
  date: string
  price: number
}

// export function generateYearlyData(
//   basePrice: ChainData["basePrice"],
// ): DailyData[] {
//   const yearlyData: DailyData[] = []
//   const startDate = new Date()
//   startDate.setFullYear(2023)

//   const randomShift = Math.random() * 4
//   for (let i = 0; i < 365; i++) {
//     const currentDate = new Date(startDate)
//     currentDate.setDate(startDate.getDate() + i)
//     const month = currentDate.getMonth()

//     const seasonalFactor = 1 + Math.sin(month / 2 - randomShift) * 0.2
//     const randomFactor = 1 + (Math.random() - 0.5) * 0.05
//     const monthlyFactor = seasonalFactor * randomFactor
//     const dailyFactor = 1 + (Math.random() - 0.5) * 0.05
//     const price =
//       Math.round(basePrice * monthlyFactor * dailyFactor * 100) / 100

//     const dailyData: DailyData = {
//       date: currentDate.toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "long",
//         year: "numeric",
//       }),
//       price,
//     }

//     yearlyData.push(dailyData)
//   }

//   return yearlyData
// }
