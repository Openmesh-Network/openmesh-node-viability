"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { chainNames, chains } from "@/config/chains"
import { cn } from "@/lib/utils"
import { Coins } from "lucide-react"
import { z } from "zod"

import { Icons } from "./icons"

type SidebarItemProps = { chain: [string, string]; active: boolean }
function SidebarItem({ chain: [chain, name], active }: SidebarItemProps) {
  const hypenName = name.toLowerCase().replace(/\s+/g, "-")
  const Icon = Icons[chain as keyof typeof Icons] ?? Coins
  return (
    <Link
      href={{ query: `chain=${hypenName}` }}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-2 transition-all",
        active ? "bg-primary/10" : "hover:bg-gray-100",
      )}
    >
      <Icon className="size-4" />
      {name}
    </Link>
  )
}

export default function Sidebar() {
  const searchParams = useSearchParams()
  const chain = z.string().nullable().parse(searchParams.get("chain"))
  const activeChain =
    chains
      .optional()
      .parse(chain?.replace(/-./g, (match) => match[1].toUpperCase())) ??
    "ethereum"
  return (
    <aside className="sticky top-0 hidden h-screen min-w-56 border-r py-12 md:block">
      <nav className="grid items-start gap-1 px-2 font-medium text-gray-700 lg:px-4">
        {Object.entries(chainNames).map(([chain, name]) => (
          <SidebarItem
            key={chain}
            chain={[chain, name]}
            active={chain === activeChain}
          />
        ))}
      </nav>
    </aside>
  )
}
