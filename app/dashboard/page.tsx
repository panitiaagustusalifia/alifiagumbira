import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, UserPlus, Store, Trophy, FileText, Info, Users, Award, Home, Phone, Settings } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const menuItems = [
    {
      title: "Jadwal Kegiatan",
      description: "Lihat jadwal lengkap semua kegiatan",
      icon: Calendar,
      href: "/schedule",
      color: "bg-blue-500",
    },
    {
      title: "Daftar Lomba",
      description: "Daftarkan diri untuk mengikuti lomba",
      icon: UserPlus,
      href: "/register-competition",
      color: "bg-green-500",
    },
    {
      title: "Daftar Bazar",
      description: "Daftarkan stand bazar Anda",
      icon: Store,
      href: "/register-bazaar",
      color: "bg-purple-500",
    },
    {
      title: "Klasemen Sementara",
      description: "Lihat posisi tim saat ini",
      icon: Trophy,
      href: "/leaderboard",
      color: "bg-yellow-500",
    },
    {
      title: "Peraturan Umum",
      description: "Baca peraturan dan ketentuan lomba",
      icon: FileText,
      href: "/rules",
      color: "bg-red-500",
    },
    {
      title: "Sistem Perlombaan",
      description: "Pahami sistem poin dan perlombaan",
      icon: Info,
      href: "/competition-system",
      color: "bg-indigo-500",
    },
    {
      title: "Peserta Terdaftar",
      description: "Daftar peserta yang sudah mendaftar",
      icon: Users,
      href: "/participants",
      color: "bg-teal-500",
    },
    {
      title: "Pemenang Lomba",
      description: "Lihat hasil dan pemenang lomba",
      icon: Award,
      href: "/winners",
      color: "bg-orange-500",
    },
    {
      title: "Kontak Panitia",
      description: "Hubungi PIC setiap perlombaan",
      icon: Phone,
      href: "/contact",
      color: "bg-pink-500",
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Alifia Gumbira 1.0</h1>
              <p className="text-red-100">Menu Utama</p>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="text-white-600 border-white hover:bg-red-50 bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full text-black">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-black-800">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">1</div>
              <div className="text-sm text-gray-600">Tujuan</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">6</div>
              <div className="text-sm text-gray-600">Tim Peserta</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">20</div>
              <div className="text-sm text-gray-600">Jenis Lomba</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">22</div>
              <div className="text-sm text-gray-600">Hari Acara</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
