import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  color?: string
  description?: string
}

export function StatsCard({ title, value, icon: Icon, color = "text-red-600", description }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        {Icon && <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />}
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
        {description && <div className="text-xs text-gray-500 mt-1">{description}</div>}
      </CardContent>
    </Card>
  )
}
