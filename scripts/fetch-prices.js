const { writeFile } = require("fs/promises")

const output = "config/data.ts"
const currencies = [
  {
    name: "ethereum",
    coingeckoId: "ethereum",
  },
  {
    name: "polkadot",
    coingeckoId: "polkadot",
  },
  {
    name: "cosmos",
    coingeckoId: "cosmos",
  },
  {
    name: "avalanche",
    coingeckoId: "avalanche-2",
  },
  {
    name: "algorand",
    coingeckoId: "algorand",
  },
  {
    name: "nearProtocol",
    coingeckoId: "near",
  },
  {
    name: "fantom",
    coingeckoId: "fantom",
  },
  {
    name: "kusama",
    coingeckoId: "kusama",
  },
  {
    name: "celo",
    coingeckoId: "celo",
  },
  {
    name: "polygon",
    coingeckoId: "matic-network",
  },
  {
    name: "zilliqa",
    coingeckoId: "zilliqa",
  },
]

Promise.all(
  currencies.map((c, i) =>
    new Promise(
      (resolve) => setTimeout(resolve, 90 * 1000 * Math.floor(i / 5)), // 5 calls per minute
    )
      .then(() =>
        fetch(
          `https://api.coingecko.com/api/v3/coins/${c.coingeckoId}/market_chart?vs_currency=usd&days=365`,
          {
            method: "GET",
            headers: { accept: "application/json" },
          },
        ),
      )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          throw new Error(`${c.name}: ${json.error.status.error_message}`)
        }
        if (json.status) {
          throw new Error(`${c.name}: ${json.status.error_message}`)
        }
        return json
      })
      .then(
        (json) =>
          `${c.name}: { ${json.prices
            .slice(0, -1) // Remove current price (todays price at midnight already included)
            .map((p) => `${timeKey(p[0])}: ${p[1]}`)
            .join(", ")} }`,
      )
      .catch((err) => {
        console.error(err)
        return `${c.name}: {}` // No price data
      }),
  ),
)
  .then((s) => `export const priceData = { ${s.join(", ")} } as const`)
  .then((data) => writeFile(output, data))

function timeKey(timestamp) {
  const date = new Date(timestamp)
  return `"${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}"`
}
