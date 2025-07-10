import type React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer" // Pastikan menggunakan named import

interface PageContainerProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  backHref?: string
  backgroundColor?: string
  showFooter?: boolean
}

export function PageContainer({
  children,
  title,
  subtitle,
  backHref,
  backgroundColor,
  showFooter = true,
}: PageContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>

      {showFooter && <Footer />}
    </div>
  )
}
