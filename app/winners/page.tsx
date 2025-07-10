import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Trophy, Medal, Crown } from "lucide-react"
import Link from "next/link"

export default function Winners() {
  // Sample winners data - in real app this would come from database
  const winners = [
    {
      competition: "Tenis Meja",
      date: "16 Agustus 2025",
      status: "completed",
      results: [
        { position: 1, name: "Ahmad Rizki", team: "Boulevard (Soedirman)", points: 5 },
        { position: 2, name: "Budi Santoso", team: "Cendana (Pattimura)", points: 3 },
        { position: 3, name: "Dimas Pratama", team: "Mangga Jambu Bhinneka", points: 1 },
      ],
    },
    {
      competition: "Gaple",
      date: "16 Agustus 2025",
      status: "completed",
      results: [
        { position: 1, name: "Fajar Nugroho", team: "Cendana (Pattimura)", points: 5 },
        { position: 2, name: "Andi Wijaya", team: "Boulevard (Soedirman)", points: 3 },
        { position: 3, name: "Arif Rahman", team: "Mangga Jambu Bhinneka", points: 1 },
      ],
    },
    {
      competition: "Menghias Tumpeng",
      date: "23 Agustus 2025",
      status: "completed",
      results: [
        { position: 1, name: "Rina Kartika", team: "Bintel Perdana (Diponegoro)", points: 5 },
        { position: 2, name: "Siti Nurhaliza", team: "Lotus Bougenville Senja", points: 3 },
        { position: 3, name: "Maya Sari", team: "Jati Kenari (Bung Tomo)", points: 1 },
      ],
    },
    {
      competition: "Volly Balon Raksasa",
      date: "17 Agustus 2025",
      status: "completed",
      results: [
        { position: 1, name: "Tim Lotus Bougenville", team: "Lotus Bougenville Senja", points: 5 },
        { position: 2, name: "Tim Jati Kenari", team: "Jati Kenari (Bung Tomo)", points: 3 },
        { position: 3, name: "Tim Bintel Perdana", team: "Bintel Perdana (Diponegoro)", points: 1 },
      ],
    },
    {
      competition: "Makan Kerupuk (Anak 9-12 Tahun)",
      date: "17 Agustus 2025",
      status: "completed",
      results: [
        { position: 1, name: "Aisyah Putri", team: "Boulevard (Soedirman)", points: 5 },
        { position: 2, name: "Kenzo Pratama", team: "Bintel Perdana (Diponegoro)", points: 3 },
        { position: 3, name: "Raffi Ahmad", team: "Lotus Bougenville Senja", points: 1 },
      ],
    },
  ]

  const upcomingCompetitions = [
    { name: "Tarik Tambang", date: "17 Agustus 2025", time: "11:00-12:00" },
    { name: "Balap Karung Raksasa", date: "17 Agustus 2025", time: "15:00-16:00" },
    { name: "Volly Sarung", date: "17 Agustus 2025", time: "14:00-15:00" },
    { name: "Suit Jepang", date: "17 Agustus 2025", time: "16:00-18:00" },
    { name: "Estafet Air", date: "17 Agustus 2025", time: "16:00-18:00" },
    { name: "Pukul Paku", date: "17 Agustus 2025", time: "16:00-18:00" },
  ]

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-orange-600 border-white hover:bg-orange-50 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Pemenang Lomba</h1>
              <p className="text-orange-100">Hasil dan pemenang setiap perlombaan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overall Champion Preview */}
        <Card className="mb-8 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Crown className="w-6 h-6" />
              Juara Umum Sementara
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">Boulevard (Soedirman)</div>
              <div className="text-lg text-gray-600">
                Total Poin: <span className="font-bold">18</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">*Berdasarkan lomba yang sudah selesai</p>
            </div>
          </CardContent>
        </Card>

        {/* Completed Competitions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Lomba yang Sudah Selesai</h2>

          {winners.map((competition, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    {competition.competition}
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">Selesai - {competition.date}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {competition.results.map((result, resultIndex) => (
                    <div
                      key={resultIndex}
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Competitions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Lomba yang Akan Datang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingCompetitions.map((comp, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800">{comp.name}</h3>
                  <div className="text-sm text-blue-600 mt-1">
                    {comp.date} • {comp.time}
                  </div>
                  <Badge variant="outline" className="mt-2 border-blue-300 text-blue-700">
                    Belum Dimulai
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competition Rules Reminder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Sistem Penilaian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">5</div>
                <div className="text-sm text-gray-600">Poin Juara 1</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-600">3</div>
                <div className="text-sm text-gray-600">Poin Juara 2</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">1</div>
                <div className="text-sm text-gray-600">Poin Juara 3</div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Juara umum ditentukan berdasarkan total poin dari semua perlombaan
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
