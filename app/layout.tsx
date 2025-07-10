import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alifia Gumbira 1.0",
  description: "Aplikasi resmi acara kemerdekaan Cluster Grand Alifia RT/RW 06/06, Kelurahan Mekarwangi, Kecamatan Tanah Sareal, Kota Bogor",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
