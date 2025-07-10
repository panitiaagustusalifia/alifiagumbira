import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

interface Winner {
  position: number
  name: string
  team: string
  points: number
}

interface WinnerCardProps {
  competition: string
  date: string
  status: "completed" | "ongoing" | "upcoming"
  results?: Winner[]
}

export function WinnerCard({ competition, date, status, results = [] }: WinnerCardProps) {
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-orange-600" />
      default:
        return null
    }
  }

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-200"
      case 3:
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai"
      case "ongoing":
        return "Berlangsung"
      case "upcoming":
        return "Akan Datang"
      default:
        return "Unknown"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-600" />
            {competition}
          </CardTitle>
          <Badge className={getStatusColor(status)}>
            {getStatusText(status)} - {date}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {status === "completed" && results.length > 0 ? (
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${getRankColor(result.position)}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(result.position)}
                    <span className="font-bold text-lg">#{result.position}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{result.name}</div>
                    <div className="text-sm text-gray-600">{result.team}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{result.points}</div>
                  <div className="text-sm text-gray-600">poin</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>
              {status === "upcoming"
                ? "Lomba belum dimulai"
                : status === "ongoing"
                  ? "Lomba sedang berlangsung"
                  : "Hasil belum tersedia"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
