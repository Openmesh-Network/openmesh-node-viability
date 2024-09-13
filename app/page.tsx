import Image from "next/image"
import { PriceChart } from "@/components/price-chart"
import { chains, type Chain } from "@/config/chains"
import { z } from "zod"

const FALLBACK_CHAIN: Chain = "ethereum"

type PageParams = {
  searchParams: { [key: string]: string | string[] | undefined }
}
export default function Home({ searchParams }: PageParams) {
  const chain = z.string().optional().parse(searchParams.chain)
  const parsedChain = chains
    .optional()
    .parse(chain?.replace(/-./g, (match) => match[1].toUpperCase()))

  return (
    <div className="container my-20">
      <h1 className="text-4xl font-bold">Web3 Node-as-a-service economics</h1>
      <p className="text-2xl font-light text-gray-600">
        Node operation economic viability is key to maintaining decentralization
        and efficiency in the Web3 ecosystem, ensuring sustainable incentives,
        network security, and scalability.
      </p>
      <div className="mt-8">
        <PriceChart chain={parsedChain ?? FALLBACK_CHAIN} />
      </div>
      <div className="mt-12">
        <h2 className="mt-4 font-bold">[Q1/Q2 2024]</h2>
        <ul className="list-inside list-disc">
          <li>
            Integrate Xnode with Equnix, Hivolcity, Google, Vultr,
            ValidationCloud, Snowflake, Aiven
          </li>
          <li>Xnode Studio V.4.0 Beta</li>
          <li>Decentralized Cloud Initiative 2024</li>
          <li>
            Launched World&apos;s First Decentralized Virtual Machine (DVM)
          </li>
        </ul>

        <h2 className="mt-4 font-bold">[Q3/Q4 2024]</h2>
        <ul className="list-inside list-disc">
          <li>
            Openmesh is giving away USD100m worth of cloud credit to Web3
            startups, protocols, and DAOs to jump-start the DePIN movement.
          </li>
          <li>
            Artificial Superintelligence Alliance RFP - Large-scale AI-optimized
            data center in collaboration with Nvidia, The Xnode MDC (Modular
            Data Center).
          </li>
          <li>
            Web3 Node Adoption Initiative with Chainlink, Fantom, Polygon,
            Avalanche, and 6+ more chains.
          </li>
          <li>
            Openmesh Decentralized &amp; Immutable Cloud: Up to 80% cheaper that
            incumbent web2 providers
          </li>
          <li>Xnode integrations with the Solana</li>
          <li>Xnode Studio v6 launch with 10,000+ apps</li>
          <li>
            Partnership with Hackernoon to host a DePIN educational content
            hackathon.
          </li>
          <li>Openmesh Node Sale.</li>
          <li>Validator Nodes Rewards Beta</li>
          <li>
            Openmesh Town Hall Event (Nvidia, Snowflake, Polygon, Databricks,
            MongoDB, Avien, Hivelocity, Google, and more)
          </li>
          <li>
            CCIP &lt;&gt; Xnode Launch—Connecting On-chain to Web2
            Infrastructure for devs, Web3 startups, protocols &amp; DAOs + $5m
            Openmesh
          </li>
          <li>Cloud Resources announcement.</li>
          <li>Xnode Node Hardware Launch.</li>
          <li>OpenD/I 2024 Conference in New York by Openmesh.</li>
          <li>OpenD/I Developer Conference 2024 in Bangalore by Openmesh.</li>
          <li>OpenAPI v6 Launch</li>
        </ul>
      </div>
      <div className="mt-12 space-y-2">
        <h2 className="text-3xl font-bold">Technical Architecture</h2>
        <Image
          src="/tech-stack.webp"
          alt="Tech Stack"
          width={2126}
          height={1062}
          className="rounded-lg border object-contain"
        />
      </div>
    </div>
  )
}
