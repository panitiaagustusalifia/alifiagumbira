import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Users, Trophy, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function Rules() {
  const generalRules = [
    "Peserta lomba merupakan warga RT/RW 06/06 baik sewa maupun pribadi",
    "Peserta lomba mewakili setiap team yang sudah ditentukan berdasarkan gang rumah, sehingga peserta tidak bisa mewakili team atau gang lain",
    "Peserta lomba hanya diperbolehkan mengikuti salah satu jenis perlombaan saja (1 peserta, 1 lomba)",
    "Peserta lomba boleh digantikan apabila peserta tersebut cedera, sakit atau berhalangan hadir oleh peserta lain di team yang sama",
    "Peserta lomba harus mengikuti peraturan pertandingan yang diikuti",
  ]

  const scoringSystem = [
    {
      title: "Sistem Perlombaan",
      points: [
        "Lomba 17'an terdiri dari 10 pertandingan",
        "Team peserta terdiri dari 6 team yang sudah ditentukan",
        "Setiap pertandingan memiliki bagan yang berbeda dengan bagan pertandingan lainnya",
        "Team peserta berlomba mengumpulkan poin dari setiap pertandingan",
        "Setiap pertandingan menggunakan sistem grup atau gugur",
      ],
    },
    {
      title: "Sistem Poin",
      points: [
        "Juara 1 di setiap pertandingan mendapatkan 5 poin",
        "Juara 2 mendapat 3 poin",
        "Juara 3 mendapat 1 poin",
        "Juara umum yaitu team yang mengumpulkan poin terbanyak dari 10 pertandingan",
      ],
    },
  ]

  const teams = [
    "Boulevard (Soedirman)",
    "Lotus Bougenville Senja (A. Yani)",
    "Cendana (Pattimura)",
    "Bintel Perdana (Diponegoro)",
    "Mangga Jambu Bhinneka (Cut Nyak Dhien)",
    "Jati Kenari (Bung Tomo)",
  ]

  const competitions = [
    {
      category: "Anak-anak (2-4 Tahun)",
      items: ["Memasukan Bola", "Memindahkan Bendera", "Memindahkan Bola Dengan Centong"],
    },
    {
      category: "Anak-anak (5-8 Tahun)",
      items: ["Memasukan Pensil Kedalam Botol", "Estafet Kardus", "Memindahkan Gelas Menggunakan Balon"],
    },
    { category: "Anak-anak (9-12 Tahun)", items: ["Makan Kerupuk", "Jepit Balon", "Joget Bola Dalam Kardus"] },
    {
      category: "Ibu-ibu",
      items: ["Menghias Tumpeng", "Volly Balon Raksasa", "Suit Jepang", "Estafet Air", "Pukul Paku"],
    },
    {
      category: "Bapak-bapak",
      items: [
        "Tenis Meja",
        "Balap Karung Raksasa",
        "Volly Sarung",
        "Gaple",
        "Tarik Tambang",
        "Lomba Mancing (Opsional)",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="text-red-600 border-white hover:bg-red-50 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Peraturan Umum</h1>
              <p className="text-red-100">Ketentuan dan peraturan lomba</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Content */}
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* General Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              Peraturan Umum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generalRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{rule}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scoring System */}
        {scoringSystem.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Point Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Poin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600 mb-2">5</div>
                <Badge className="bg-yellow-600">Juara 1</Badge>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <div className="text-3xl font-bold text-gray-600 mb-2">3</div>
                <Badge variant="secondary">Juara 2</Badge>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">1</div>
                <Badge className="bg-orange-600">Juara 3</Badge>
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {teams.map((team, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800">{team}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competition Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Perlombaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {competitions.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {category.items.map((item, itemIndex) => (
                      <Badge key={itemIndex} variant="outline" className="justify-start p-2">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="w-5 h-5" />
              Penting untuk Diperhatikan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-orange-800">
              <p>• Semua peserta wajib hadir tepat waktu sesuai jadwal yang telah ditentukan</p>
              <p>• Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat</p>
              <p>• Panitia berhak mendiskualifikasi peserta yang melanggar peraturan</p>
              <p>• Untuk informasi lebih lanjut, hubungi PIC masing-masing perlombaan</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
