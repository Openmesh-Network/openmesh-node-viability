import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"

import { Suspense } from "react"
import MobileSheet from "@/components/mobile-sheet"
import Sidebar from "@/components/sidebar"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "OpenMesh Node Viability",
  description: "A tool to compare returns on hosting alternatives.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} flex flex-col font-sans antialiased md:flex-row`}
      >
        <header className="bg-gray-50 md:hidden">
          <div className="container my-8">
            <Suspense fallback={<div className="size-10 rounded bg-gray-50" />}>
              <MobileSheet />
            </Suspense>
          </div>
        </header>
        <Suspense fallback={<div className="sticky top-0 h-screen w-64" />}>
          <Sidebar />
        </Suspense>
        <main className="grow bg-gray-50">
          <div className="container md:my-20">{children}</div>
        </main>
      </body>
    </html>
  )
}
