import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"

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
        <main className="grow bg-gray-50">
          <div className="container my-20">{children}</div>
        </main>
      </body>
    </html>
  )
}
