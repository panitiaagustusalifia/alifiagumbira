"use client"

import { Trophy, Medal, Award, Users, Target, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/common/page-container"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { EmptyState } from "@/components/common/empty-state"
import { useLeaderboard } from "@/hooks/use-leaderboard"
import { useState, useEffect } from "react"

export default function Leaderboard() {
  const { leaderboardData, loading, error, refetch } = useLeaderboard()
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Auto refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      refetch()
    }, 30000)

    return () => clearInterval(interval)
  }, [autoRefresh, refetch])

  const teams = [
    "Boulevard (Soedirman)",
    "Lotus Bougenville Senja (A. Yani)",
    "Cendana (Pattimura)",
    "Bintel Perdana (Diponegoro)",
    "Mangga Jambu Bhinneka (Cut Nyak Dhien)",
    "Jati Kenari (Bung Tomo)",
  ]

  // Calculate team standings
  const teamStandings = teams
    .map((team) => {
      const teamResults = leaderboardData.filter((result) => result.team === team)
      const totalPoints = teamResults.reduce((sum, result) => sum + result.points, 0)
      const competitions = teamResults.length
      const gold = teamResults.filter((r) => r.position === 1).length
      const silver = teamResults.filter((r) => r.position === 2).length
      const bronze = teamResults.filter((r) => r.position === 3).length

      return {
        team,
        totalPoints,
        competitions,
        gold,
        silver,
        bronze,
        results: teamResults,
      }
    })
    .sort((a, b) => {
      // Sort by total points first, then by gold medals, then by silver medals
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints
      if (b.gold !== a.gold) return b.gold - a.gold
      if (b.silver !== a.silver) return b.silver - a.silver
      return b.bronze - a.bronze
    })

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-500" />
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />
      case 3:
        return <Award className="w-8 h-8 text-orange-600" />
      default:
        return (
          <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-sm font-bold text-gray-600">
            {position}
          </div>
        )
    }
  }

  const getTeamColor = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
      default:
        return "bg-white border border-gray-200"
    }
  }

  const getShortTeamName = (teamName: string) => {
    return teamName.split(" ")[0]
  }

  if (loading) {
    return (
      <PageContainer title="Klasemen" subtitle="Memuat data klasemen..." backgroundColor="bg-yellow-600">
        <LoadingSpinner size="lg" text="Memuat data klasemen dari Google Sheets..." />
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer title="Klasemen" subtitle="Terjadi kesalahan" backgroundColor="bg-yellow-600">
        <EmptyState
          title="Gagal Memuat Data"
          description={error}
          {
            ... (<Button onClick={refetch} className="bg-yellow-600 hover:bg-yellow-700">
              Coba Lagi
            </Button>)
          }
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer title="Klasemen" subtitle="Peringkat Tim Alifia Gumbira 1.0" backgroundColor="bg-yellow-600">
      {/* Auto Refresh Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Terakhir diperbarui: {new Date().toLocaleTimeString("id-ID")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "bg-green-50 text-green-700 border-green-200" : ""}
          >
            {autoRefresh ? "Auto Refresh ON" : "Auto Refresh OFF"}
          </Button>
          <Button variant="outline" size="sm" onClick={refetch}>
            Refresh Manual
          </Button>
        </div>
      </div>

      {leaderboardData.length === 0 ? (
        <EmptyState
          title="Belum Ada Hasil Lomba"
          description="Klasemen akan muncul setelah hasil lomba diinput oleh panitia"
          {
            ... (<Button onClick={refetch} className="bg-yellow-600 hover:bg-yellow-700">
              Refresh
            </Button>)
          }
        />
      ) : (
        <>
          {/* Podium for Top 3 */}
          {teamStandings.length >= 3 && (
            <Card className="mb-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-gray-800">🏆 Podium Sementara</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-end gap-4 mb-6">
                  {/* 2nd Place */}
                  <div className="text-center">
                    <div className="bg-gradient-to-t from-gray-300 to-gray-500 text-white p-4 rounded-t-lg mb-2 h-24 flex flex-col justify-end">
                      <Medal className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-lg font-bold">{teamStandings[1]?.totalPoints || 0}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {getShortTeamName(teamStandings[1]?.team || "")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {teamStandings[1]?.gold}🥇 {teamStandings[1]?.silver}🥈 {teamStandings[1]?.bronze}🥉
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center">
                    <div className="bg-gradient-to-t from-yellow-400 to-yellow-600 text-white p-4 rounded-t-lg mb-2 h-32 flex flex-col justify-end">
                      <Trophy className="w-10 h-10 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{teamStandings[0]?.totalPoints || 0}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {getShortTeamName(teamStandings[0]?.team || "")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {teamStandings[0]?.gold}🥇 {teamStandings[0]?.silver}🥈 {teamStandings[0]?.bronze}🥉
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center">
                    <div className="bg-gradient-to-t from-orange-400 to-orange-600 text-white p-4 rounded-t-lg mb-2 h-20 flex flex-col justify-end">
                      <Award className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-lg font-bold">{teamStandings[2]?.totalPoints || 0}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {getShortTeamName(teamStandings[2]?.team || "")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {teamStandings[2]?.gold}🥇 {teamStandings[2]?.silver}🥈 {teamStandings[2]?.bronze}🥉
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-600" />
                Klasemen Lengkap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamStandings.map((team, index) => (
                  <div
                    key={team.team}
                    className={`p-6 rounded-lg shadow-sm transition-all hover:shadow-md ${getTeamColor(index + 1)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getRankIcon(index + 1)}
                        <div>
                          <h3 className="text-lg font-bold">{getShortTeamName(team.team)}</h3>
                          <p className="text-sm opacity-80">{team.team}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {team.competitions} lomba
                            </span>
                            <span>{team.gold}🥇</span>
                            <span>{team.silver}🥈</span>
                            <span>{team.bronze}🥉</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{team.totalPoints}</div>
                        <div className="text-sm opacity-80">Total Poin</div>
                      </div>
                    </div>

                    {/* Team Results Detail */}
                    {team.results.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {team.results
                            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                            .map((result) => (
                              <div key={result.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-sm">
                                <div className="font-semibold">{result.competition}</div>
                                <div className="flex items-center justify-between mt-1">
                                  <span>
                                    {result.position === 1 && "🥇"}
                                    {result.position === 2 && "🥈"}
                                    {result.position === 3 && "🥉"}
                                    {result.position > 3 && `#${result.position}`}
                                  </span>
                                  <Badge variant="outline" className="bg-white/30 border-white/50 text-xs">
                                    {result.points} poin
                                  </Badge>
                                </div>
                                {result.notes && <div className="text-xs opacity-75 mt-1">{result.notes}</div>}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Lomba</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {new Set(leaderboardData.map((r) => r.competition)).size}
                </div>
                <p className="text-xs text-gray-500 mt-1">Lomba telah selesai</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Hasil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{leaderboardData.length}</div>
                <p className="text-xs text-gray-500 mt-1">Hasil telah diinput</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Tim Aktif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {teamStandings.filter((t) => t.competitions > 0).length}
                </div>
                <p className="text-xs text-gray-500 mt-1">Tim sudah berkompetisi</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </PageContainer>
  )
}
