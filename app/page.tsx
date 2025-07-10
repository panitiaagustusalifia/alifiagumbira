import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, Trophy } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          {/* Logo/Header */}
          <div className="space-y-2">
            <div className="w-24 h-24 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-800">Alifia Gumbira 1.0</h1>
            <p className="text-xl md:text-2xl font-semibold text-red-600">"RUKUN, BERSATU, BERJAYA!"</p>
          </div>

          {/* Event Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <Card className="border-red-200">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Tanggal</h3>
                <p className="text-sm text-gray-600">2 - 23 Agustus 2025</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Lokasi</h3>
                <p className="text-sm text-gray-600">Cluster Grand Alifia RT/RW 06/06</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Peserta</h3>
                <p className="text-sm text-gray-600">Warga RT/RW 06/06</p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Selamat datang di aplikasi resmi acara kemerdekaan Cluster Grand Alifia! Bergabunglah dalam berbagai lomba
              seru untuk anak-anak, ibu-ibu, dan bapak-bapak. Mari bersama-sama merayakan kemerdekaan Indonesia dengan
              penuh semangat persatuan.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore
              </Button>
            </Link>
          </div>

          {/* Footer Info */}
          <div className="pt-8 text-center text-sm text-gray-500">
            <p>Diselenggarakan oleh Panitia RT/RW 06/06</p>
            <p>Kel. Mekarwangi, Kec. Tanah Sareal, Bogor</p>
          </div>
        </div>
      </div>
    </div>
  )
}
