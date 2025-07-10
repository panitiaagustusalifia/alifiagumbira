"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface SuccessModalProps {
  title: string
  message: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export function SuccessModal({
  title,
  message,
  primaryAction = { label: "Kembali ke Menu Utama", href: "/dashboard" },
  secondaryAction,
}: SuccessModalProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="space-y-2">
            <Link href={primaryAction.href}>
              <Button className="w-full">{primaryAction.label}</Button>
            </Link>
            {secondaryAction && (
              <Button variant="outline" onClick={secondaryAction.onClick} className="w-full bg-transparent">
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
