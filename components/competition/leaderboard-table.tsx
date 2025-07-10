import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

interface Team {
  name: string
  totalPoints: number
  competitions: number[]
  color: string
}

interface LeaderboardTableProps {
  teams: Team[]
  competitions: string[]
}

export function LeaderboardTable({ teams, competitions }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-orange-600" />
      default:
        return (
          <div className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold">
            {rank}
          </div>
        )
    }
  }

  const sortedTeams = [...teams].sort((a, b) => b.totalPoints - a.totalPoints)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Klasemen Lengkap</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {sortedTeams.map((team, index) => (
            <div key={team.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getRankIcon(index + 1)}
                <div className={`w-4 h-4 ${team.color} rounded-full`}></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm">{team.name.split(" ")[0]}</h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-800">{team.totalPoints}</div>
                <div className="text-xs text-gray-600">poin</div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-semibold">Rank</th>
                <th className="text-left p-2 font-semibold">Tim</th>
                {competitions.map((comp, index) => (
                  <th key={index} className="text-center p-2 font-semibold min-w-[60px]">
                    {comp.split(" ")[0]}
                  </th>
                ))}
                <th className="text-center p-2 font-semibold bg-yellow-100">Total</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, teamIndex) => (
                <tr key={team.name} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <div className="flex items-center gap-2">{getRankIcon(teamIndex + 1)}</div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${team.color} rounded-full`}></div>
                      <span className="font-medium text-sm">{team.name.split(" ")[0]}</span>
                    </div>
                  </td>
                  {team.competitions.map((points, compIndex) => (
                    <td key={compIndex} className="text-center p-2">
                      {points > 0 ? (
                        <Badge variant={points === 5 ? "default" : points === 3 ? "secondary" : "outline"}>
                          {points}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                  <td className="text-center p-2 bg-yellow-50 font-bold">{team.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
