import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon = <AlertCircle className="w-12 h-12 text-gray-400" />,
}: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        {actionLabel && actionHref && (
          <Link href={actionHref}>
            <Button>{actionLabel}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
