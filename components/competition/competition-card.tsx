"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Trophy } from "lucide-react"

interface CompetitionCardProps {
  title: string
  date: string
  time: string
  category: string
  type: "penyisihan" | "semifinal" | "final" | "lomba" | "acara"
  participants?: number
  maxParticipants?: number
  status?: "upcoming" | "ongoing" | "completed"
  onRegister?: () => void
  onViewDetails?: () => void
}

export function CompetitionCard({
  title,
  date,
  time,
  category,
  type,
  participants = 0,
  maxParticipants,
  status = "upcoming",
  onRegister,
  onViewDetails,
}: CompetitionCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "penyisihan":
        return "bg-blue-100 text-blue-800"
      case "semifinal":
        return "bg-yellow-100 text-yellow-800"
      case "final":
        return "bg-red-100 text-red-800"
      case "lomba":
        return "bg-green-100 text-green-800"
      case "acara":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Akan Datang"
      case "ongoing":
        return "Berlangsung"
      case "completed":
        return "Selesai"
      default:
        return "Unknown"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{title}</CardTitle>
          <div className="flex flex-col gap-1">
            <Badge className={getTypeColor(type)}>{type}</Badge>
            <Badge className={getStatusColor(status)}>{getStatusText(status)}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>{category}</span>
          </div>
          {maxParticipants && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>
                {participants}/{maxParticipants} peserta
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {onViewDetails && (
            <Button variant="outline" size="sm" onClick={onViewDetails} className="flex-1 bg-transparent">
              Detail
            </Button>
          )}
          {onRegister && status === "upcoming" && (
            <Button size="sm" onClick={onRegister} className="flex-1">
              Daftar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
