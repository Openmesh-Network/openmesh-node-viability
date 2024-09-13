"use client"

import { Fragment, useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { Toggle } from "@/components/ui/toggle"
import {
  Chain,
  chainData,
  chainNames,
  providers,
  type Provider,
} from "@/config/chains"
import {
  generateYearlyData,
  type DailyData,
  type ProviderData,
} from "@/lib/random-generate"
import { cn } from "@/lib/utils"
import { Server } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Icons } from "./icons"

const chartConfig = {
  price: {
    label: "Ethereum Price",
    color: "var(--chart)",
  },
} satisfies ChartConfig

type ChartDataItem = Pick<DailyData, "date" | "price"> & {
  [key in Provider]: ProviderData
}

type PriceChartProps = {
  chain: Chain
}
export function PriceChart({ chain }: PriceChartProps) {
  const chainChartData = chainData[chain]
  const chainName = chainNames[chain]
  const [visibleProviders, setVisibleProviders] = useState<Provider[]>(
    providers.options,
  )

  const sheetData = useMemo(
    () => generateYearlyData(chainChartData),
    [chainChartData],
  )

  const toggleProvider = (provider: Provider) => {
    setVisibleProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider],
    )
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any[]
    label?: string
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataItem
      return (
        <div className="max-w-xs rounded-lg border border-gray-200 bg-white p-2.5 shadow-md dark:border-gray-800 dark:bg-gray-950">
          <p className="font-medium text-gray-600">{label}</p>
          <p className="text-sm font-semibold">
            <span>{chainName}</span> Price: ${data.price.toFixed(2)}
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            <span />
            <p>Server Cost</p>
            <p>Revenue</p>
            <p>Net</p>
            {visibleProviders.map((provider) => {
              const Icon = Icons[provider as keyof typeof Icons] ?? Server
              const operationalCost = data[provider].operationalCost
              const revenue = data[provider].returns * data.price

              const highlightProvider = provider === "openmesh"

              const net = revenue - operationalCost
              return (
                <Fragment key={provider.toLowerCase()}>
                  <div
                    className={cn(
                      "inline-flex items-center justify-center rounded-md border p-1",
                      highlightProvider
                        ? "bg-primary/10 border-primary/50"
                        : "bg-gray-50",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5",
                        highlightProvider ? "text-primary" : "text-gray-500",
                      )}
                    />
                  </div>
                  <p className="self-center text-sm text-gray-500">
                    ${operationalCost.toFixed(2)}
                  </p>
                  <p className="self-center text-sm text-gray-500">
                    ${revenue.toFixed(2)}
                  </p>
                  <p
                    className={cn(
                      "self-center text-sm font-medium",
                      net === 0 && "text-gray-500",
                      net > 0 && "text-green-600",
                      net < 0 && "text-red-600",
                    )}
                  >
                    ${net.toFixed(2)}
                  </p>
                </Fragment>
              )
            })}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chainName} Price Chart</CardTitle>
        <CardDescription>
          Showing {chainName} price and corresponding provider revenue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-3">
          {providers.options.map((provider) => {
            const Icon = Icons[provider as keyof typeof Icons]
            return (
              <Toggle
                key={provider}
                variant="outline"
                pressed={visibleProviders.includes(provider)}
                onPressedChange={() => toggleProvider(provider)}
                aria-label={`Toggle ${provider.toUpperCase()} data`}
              >
                <div className="flex items-center space-x-2">
                  {Icon ? <Icon className="size-4" /> : null}
                  <span className="capitalize">{provider.toUpperCase()}</span>
                </div>
              </Toggle>
            )
          })}
        </div>
        <ChartContainer className="h-[32rem] w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={sheetData}
            margin={{
              top: 10,
              right: 0,
              left: 30,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-price)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-price)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartConfig.price.color}
              fill="url(#fill)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
