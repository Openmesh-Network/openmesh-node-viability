"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { chainNames, chains } from "@/config/chains"
import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Coins, Menu } from "lucide-react"
import { z } from "zod"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

type SheetItemProps = {
  chain: [string, string]
  active: boolean
}
function SheetItem({ chain: [chain, name], active }: SheetItemProps) {
  const hypenName = name.toLowerCase().replace(/\s+/g, "-")
  const Icon = Icons[chain as keyof typeof Icons] ?? Coins
  return (
    <Link
      href={{ query: `chain=${hypenName}` }}
      className={cn(
        "flex items-center gap-3 rounded-lg px-2.5 py-1 transition-all",
        active ? "bg-primary/10" : "hover:bg-gray-100",
      )}
    >
      <Icon className="size-4" />
      {name}
    </Link>
  )
}

export default function MobileSheet() {
  const searchParams = useSearchParams()
  const chain = z.string().nullable().parse(searchParams.get("chain"))
  const activeChain =
    chains
      .optional()
      .parse(chain?.replace(/-./g, (match) => match[1].toUpperCase())) ??
    "ethereum"
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <VisuallyHidden>
          <SheetTitle>Mobile Sheet Navigation</SheetTitle>
          <SheetDescription>
            The mobile navigation menu for the different chains and their
            corresponding price histories.
          </SheetDescription>
        </VisuallyHidden>
        <nav className="grid gap-2 text-lg font-medium">
          {Object.entries(chainNames).map(([chain, name]) => (
            <SheetItem
              key={chain}
              chain={[chain, name]}
              active={chain === activeChain}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
