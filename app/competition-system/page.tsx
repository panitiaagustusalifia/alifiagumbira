import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Info, Trophy, Users, Target, Calendar } from "lucide-react"
import Link from "next/link"

export default function CompetitionSystem() {
  const systemPoints = [
    "Lomba 17'an terdiri dari 10 pertandingan utama",
    "Team peserta terdiri dari 6 team yang sudah ditentukan berdasarkan gang",
    "Setiap pertandingan memiliki bagan yang berbeda dengan bagan pertandingan lainnya",
    "Team peserta berlomba mengumpulkan poin dari setiap pertandingan",
    "Setiap pertandingan menggunakan sistem grup atau gugur",
    "Juara umum yaitu team yang mengumpulkan poin terbanyak dari 10 pertandingan",
  ]

  const competitions = [
    { name: "Menghias Tumpeng", type: "Individu", system: "Penilaian Juri", category: "Ibu-ibu" },
    { name: "Volly Balon Raksasa", type: "Tim", system: "Sistem Gugur", category: "Ibu-ibu" },
    { name: "Suit Jepang", type: "Individu", system: "Sistem Gugur", category: "Ibu-ibu" },
    { name: "Estafet Air", type: "Tim", system: "Waktu Tercepat", category: "Ibu-ibu" },
    { name: "Pukul Paku", type: "Individu", system: "Waktu Tercepat", category: "Ibu-ibu" },
    { name: "Tenis Meja", type: "Individu", system: "Sistem Gugur", category: "Bapak-bapak" },
    { name: "Balap Karung Raksasa", type: "Tim", system: "Waktu Tercepat", category: "Bapak-bapak" },
    { name: "Volly Sarung", type: "Tim", system: "Sistem Gugur", category: "Bapak-bapak" },
    { name: "Gaple", type: "Individu", system: "Sistem Gugur", category: "Bapak-bapak" },
    { name: "Tarik Tambang", type: "Tim", system: "Sistem Gugur", category: "Bapak-bapak" },
  ]

  const teams = [
    { name: "Boulevard (Soedirman)", color: "bg-red-500" },
    { name: "Lotus Bougenville Senja (A. Yani)", color: "bg-blue-500" },
    { name: "Cendana (Pattimura)", color: "bg-green-500" },
    { name: "Bintel Perdana (Diponegoro)", color: "bg-yellow-500" },
    { name: "Mangga Jambu Bhinneka (Cut Nyak Dhien)", color: "bg-purple-500" },
    { name: "Jati Kenari (Bung Tomo)", color: "bg-orange-500" },
  ]

  const getSystemColor = (system: string) => {
    switch (system) {
      case "Sistem Gugur":
        return "bg-red-100 text-red-800"
      case "Waktu Tercepat":
        return "bg-blue-100 text-blue-800"
      case "Penilaian Juri":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    return type === "Tim" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-indigo-600 border-white hover:bg-indigo-50 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Sistem Perlombaan</h1>
              <p className="text-indigo-100">Pahami sistem poin dan perlombaan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600" />
              Sistem Perlombaan Umum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Point System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Sistem Poin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-4xl font-bold text-yellow-600 mb-2">5</div>
                <div className="text-lg font-semibold text-yellow-800">Juara 1</div>
                <p className="text-sm text-gray-600 mt-2">Poin tertinggi untuk setiap perlombaan</p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div className="text-4xl font-bold text-gray-600 mb-2">3</div>
                <div className="text-lg font-semibold text-gray-800">Juara 2</div>
                <p className="text-sm text-gray-600 mt-2">Poin menengah untuk runner up</p>
              </div>

              <div className="text-center p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">1</div>
                <div className="text-lg font-semibold text-orange-800">Juara 3</div>
                <p className="text-sm text-gray-600 mt-2">Poin apresiasi untuk posisi ketiga</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Catatan Penting:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Total poin dari 10 perlombaan menentukan juara umum</li>
                <li>• Jika ada seri poin, akan dilihat jumlah juara 1 terbanyak</li>
                <li>• Keputusan juri bersifat final dan tidak dapat diganggu gugat</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Teams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Tim Peserta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map((team, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                  <div
                    className={`w-12 h-12 ${team.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{team.name}</h3>
                    <p className="text-sm text-gray-600">Berdasarkan gang rumah</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competition Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Detail Perlombaan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitions.map((comp, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{comp.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getTypeColor(comp.type)}>{comp.type}</Badge>
                      <Badge className={getSystemColor(comp.system)}>{comp.system}</Badge>
                      <Badge variant="outline">{comp.category}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competition Flow */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Alur Perlombaan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800">Penyisihan</h3>
                  <p className="text-sm text-gray-600">
                    Seleksi awal untuk menentukan peserta yang lolos ke tahap berikutnya
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-800">Semifinal</h3>
                  <p className="text-sm text-gray-600">Babak penentuan untuk masuk ke final dan perebutan juara 3</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Final & Perebutan Juara 3</h3>
                  <p className="text-sm text-gray-600">Penentuan juara 1, 2, dan 3 untuk setiap perlombaan</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Rules */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800">Peraturan Khusus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-orange-800">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Lomba Anak-anak:</strong> Tidak menggunakan sistem poin untuk juara umum, hanya untuk
                  apresiasi
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Lomba Mancing:</strong> Bersifat opsional dan tidak wajib diikuti semua tim
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Penggantian Peserta:</strong> Diizinkan hingga H-1 lomba dengan syarat dari tim yang sama
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Diskualifikasi:</strong> Peserta yang melanggar peraturan akan didiskualifikasi dan tim tidak
                  mendapat poin
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
