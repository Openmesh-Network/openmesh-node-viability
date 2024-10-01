"use client"

import {
  Fragment,
  startTransition,
  useCallback,
  useMemo,
  useOptimistic,
  useState,
} from "react"
import { useRouter } from "next/navigation"
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
import {
  Chain,
  chainData,
  chainNames,
  chains,
  providers,
  type Provider,
} from "@/config/chains"
import { priceData } from "@/config/data"
import { type DailyData, type ProviderData } from "@/lib/random-generate"
import { cn, formatNumber } from "@/lib/utils"
import { compareAsc, format } from "date-fns"
import { Check, ChevronsUpDown, PlusCircle, Server } from "lucide-react"
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Separator } from "./ui/separator"
import { Toggle } from "./ui/toggle"

type ChartDataItem = Pick<DailyData, "date" | "price"> & {
  [key in Provider]: ProviderData
}

function calculateProviderProfits(
  operationalCost: number,
  tokenReturn: number,
  currentPrice: number,
): ProviderData {
  return Math.round((currentPrice * tokenReturn - operationalCost) * 100) / 100
}

type PriceChartProps = {
  chain: Chain
  compare?: Set<Provider>
  accumulative?: boolean
}
export function PriceChart({ chain, compare, accumulative }: PriceChartProps) {
  const router = useRouter()

  const [optimisticChain, setOptimisticChain] = useOptimistic(chain)
  const [optimisticCompare, setOptimisticCompare] = useOptimistic(compare)
  const [optimisticAccumulative, setOptimisticAccumulative] = useState(
    accumulative === undefined ? false : accumulative,
  )

  const chainChartData = chainData[optimisticChain]
  const chainName = chainNames[optimisticChain]
  const ChainIcon = Icons[optimisticChain as keyof typeof Icons]

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      openmesh: {
        label: "OPENMESH",
        color: "hsl(var(--chart-openmesh))",
      },
    }
    optimisticCompare?.forEach((provider) => {
      config[provider] = {
        label: provider.toUpperCase(),
        color: `hsl(var(--chart-${provider.toLowerCase()}))`,
      }
    })
    return config
  }, [optimisticCompare])

  const sheetData = useMemo(() => {
    return Object.entries(priceData[optimisticChain])
      .sort(([dateA], [dateB]) => compareAsc(dateA, dateB))
      .map(([date, price]) => {
        const dataPoint: DailyData & {
          [key in Provider]?: number
        } = {
          date,
          price,
          openmesh: calculateProviderProfits(
            chainChartData.operationalCosts.openmesh,
            chainChartData.avgReward,
            price,
          ),
        }
        optimisticCompare?.forEach((provider) => {
          dataPoint[provider] = calculateProviderProfits(
            chainChartData.operationalCosts[provider],
            chainChartData.avgReward,
            price,
          )
        })
        return dataPoint
      })
  }, [
    optimisticChain,
    chainChartData.operationalCosts,
    chainChartData.avgReward,
    optimisticCompare,
  ])

  const accSheetData = useMemo(() => {
    const providersArray = Object.values(providers.Values)
    const providerSum = providersArray.reduce(
      (acc, provider) => {
        acc[provider] = 0
        return acc
      },
      {} as { [key in Provider]: number },
    )

    return sheetData.map((originalDataPoint) => {
      const dataPoint = { ...originalDataPoint }
      providersArray.forEach((provider) => {
        if (dataPoint[provider] !== undefined) {
          providerSum[provider] += dataPoint[provider]
          dataPoint[provider] = providerSum[provider]
        }
      })
      return dataPoint
    })
  }, [sheetData])

  const toggleProvider = useCallback(
    (provider: Provider) => {
      const newCompareList = new Set(compare)
      if (compare?.has(provider)) newCompareList.delete(provider)
      else newCompareList.add(provider)

      const newParams = new URLSearchParams()
      newParams.set("chain", optimisticChain)
      newCompareList?.forEach((provider) =>
        newParams.append("provider", provider),
      )

      startTransition(() => {
        setOptimisticCompare(newCompareList)
        router.push(`/?${newParams.toString()}`, { scroll: false })
      })
    },
    [compare, optimisticChain, router, setOptimisticCompare],
  )

  const toggleChain = useCallback(
    (chain: Chain) => {
      const newParams = new URLSearchParams(
        Array.from(optimisticCompare ?? []).map((v) => ["provider", v]),
      )
      newParams.set("chain", chain)

      startTransition(() => {
        setOptimisticChain(chain)
        router.push(`/?${newParams.toString()}`, { scroll: false })
      })
    },
    [optimisticCompare, router, setOptimisticChain],
  )

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
        <div className="max-w-xs rounded-lg border border-gray-200 bg-white/75 p-2.5 shadow-md backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950">
          <p className="font-medium text-gray-600">{label}</p>
          <p className="text-sm font-semibold">
            <span>{chainName}</span> Price: ${data.price.toFixed(2)}
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            <span />
            <p>Server Cost</p>
            <p>Revenue</p>
            <p>Net</p>
            {Array.from(optimisticCompare ?? [])
              .sort((a, b) => data[b] - data[a])
              .map((provider) => {
                const Icon = Icons[provider as keyof typeof Icons] ?? Server
                const operationalCost =
                  chainChartData.operationalCosts[provider]
                const net = data[provider]
                const revenue = net + operationalCost

                const highlightProvider = provider === "openmesh"

                return (
                  <Fragment key={provider.toLowerCase()}>
                    <div
                      className={cn(
                        "inline-flex items-center justify-center rounded-md border p-1",
                        highlightProvider
                          ? "border-primary/50 bg-primary/10"
                          : "bg-gray-100/50",
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
                      ${formatNumber(operationalCost)}
                    </p>
                    <p className="self-center text-sm text-gray-500">
                      ${formatNumber(revenue)}
                    </p>
                    <p
                      className={cn(
                        "self-center text-sm font-medium",
                        net === 0 && "text-gray-500",
                        net > 0 && "text-green-600",
                        net < 0 && "text-red-600",
                      )}
                    >
                      ${formatNumber(net)}
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

  const [chainsOpen, setChainsOpen] = useState<boolean>(false)
  const [providersOpen, setProvidersOpen] = useState<boolean>(false)

  return (
    <Card className="max-md:-mx-4 max-md:rounded-none">
      <CardHeader className="max-md:px-4">
        <CardTitle>{chainName} Price Chart</CardTitle>
        <CardDescription>
          Showing {chainName} price and corresponding provider revenue.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-md:px-4">
        <div className="mb-4 flex flex-wrap gap-4">
          <Popover onOpenChange={setChainsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-64 justify-between">
                <span className="flex items-center gap-1.5">
                  <ChainIcon className="size-4" />
                  {chainName}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={`w-[--radix-popover-trigger-width] p-0 ${chainsOpen || "border-0"}`}
            >
              {chainsOpen && (
                <Command>
                  <CommandInput placeholder="Search chain..." />
                  <CommandList>
                    <CommandEmpty>No chain found.</CommandEmpty>
                    <CommandGroup>
                      {chains.options.map((chain) => {
                        const Icon = Icons[chain as keyof typeof Icons]
                        return (
                          <CommandItem
                            key={chain}
                            value={chain}
                            onSelect={() => toggleChain(chain)}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4 transition-transform",
                                optimisticChain === chain
                                  ? "scale-100"
                                  : "scale-0",
                              )}
                            />
                            {Icon ? <Icon className="mr-2 size-4" /> : null}
                            {chainNames[chain]}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              )}
            </PopoverContent>
          </Popover>
          <Popover onOpenChange={setProvidersOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "min-w-56 justify-between",
                  optimisticCompare?.size && "border-dashed",
                )}
              >
                <span className="flex">
                  <span className="flex items-center gap-2">
                    <PlusCircle className="size-4" />
                    Providers
                  </span>
                  {optimisticCompare?.size ? (
                    <>
                      <span className="mx-2 my-1 block">
                        <Separator orientation="vertical" />
                      </span>
                      <span className="flex gap-1.5">
                        {Array.from(optimisticCompare ?? []).map((provider) => {
                          const Icon = Icons[provider as keyof typeof Icons]
                          return (
                            <span
                              key={`selected-provider-${provider}`}
                              className="flex size-7 items-center justify-center rounded border"
                            >
                              {Icon ? (
                                <Icon className="size-4" />
                              ) : (
                                <Server className="size-4 text-gray-600" />
                              )}
                              <span className="sr-only">{provider}</span>
                            </span>
                          )
                        })}
                      </span>
                    </>
                  ) : null}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={`w-[--radix-popover-trigger-width] p-0 ${providersOpen || "border-0"}`}
            >
              {providersOpen && (
                <Command>
                  <CommandInput placeholder="Search provider..." />
                  <CommandList>
                    <CommandEmpty>No provider found.</CommandEmpty>
                    <CommandGroup>
                      {providers.options.map((provider) => {
                        const Icon = Icons[provider as keyof typeof Icons]
                        return (
                          <CommandItem
                            key={provider}
                            value={provider}
                            onSelect={() => toggleProvider(provider)}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4 transition-transform",
                                optimisticCompare?.has(provider)
                                  ? "scale-100"
                                  : "scale-0",
                              )}
                            />
                            {Icon ? <Icon className="mr-2 size-4" /> : null}
                            {provider.toUpperCase()}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              )}
            </PopoverContent>
          </Popover>
          <Toggle
            variant="outline"
            pressed={optimisticAccumulative}
            onPressedChange={setOptimisticAccumulative}
          >
            <span>Accumulative</span>
          </Toggle>
        </div>
        <ChartContainer
          className="h-56 w-full sm:h-80 lg:h-[32rem]"
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={optimisticAccumulative ? accSheetData : sheetData}
            margin={{
              top: 10,
              right: 10,
              left: 30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray={2} vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              minTickGap={80}
              tickFormatter={(value) => format(value, "MMM dd, yyyy")}
            />
            <YAxis
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${formatNumber(value)}`}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <Legend />
            {Array.from(optimisticCompare ?? []).map((provider) => (
              <Line
                key={`line-${provider}`}
                type="monotone"
                dataKey={provider}
                name={provider.toUpperCase()}
                stroke={chartConfig[provider].color}
                dot={false}
                activeDot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
