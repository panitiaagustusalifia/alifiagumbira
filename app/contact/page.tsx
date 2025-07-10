"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Phone, Users, Clock, AlertTriangle, Shield, Headphones, Trophy, Calendar } from "lucide-react"
import { PageContainer } from "@/components/common/page-container"

export default function Contact() {
  const handleWhatsApp = (phone: string, name: string, role: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    const formattedPhone = cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone
    const message = `Halo ${name}, saya ingin bertanya terkait ${role} di acara Alifia Gumbira 1.0.`
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const competitionPICs = [
    {
      competition: "Menghias Tumpeng",
      pics: [
        { name: "Sari Dewi", phone: "081234567890" },
        { name: "Budi Santoso", phone: "081234567891" },
      ],
    },
    {
      competition: "Volly Balon Raksasa",
      pics: [
        { name: "Andi Pratama", phone: "081234567892" },
        { name: "Maya Sari", phone: "081234567893" },
      ],
    },
    {
      competition: "Suit Jepang",
      pics: [
        { name: "Rini Handayani", phone: "081234567894" },
        { name: "Dedi Kurniawan", phone: "081234567895" },
      ],
    },
    {
      competition: "Estafet Air",
      pics: [
        { name: "Lina Marlina", phone: "081234567896" },
        { name: "Agus Setiawan", phone: "081234567897" },
      ],
    },
    {
      competition: "Pukul Paku",
      pics: [
        { name: "Fitri Rahayu", phone: "081234567898" },
        { name: "Hendra Wijaya", phone: "081234567899" },
      ],
    },
    {
      competition: "Tenis Meja",
      pics: [
        { name: "Dewi Lestari", phone: "081234567800" },
        { name: "Bambang Sutrisno", phone: "081234567801" },
      ],
    },
    {
      competition: "Balap Karung Raksasa",
      pics: [
        { name: "Indah Permata", phone: "081234567802" },
        { name: "Rizki Ramadan", phone: "081234567803" },
      ],
    },
    {
      competition: "Volly Sarung",
      pics: [
        { name: "Nurul Hidayah", phone: "081234567804" },
        { name: "Fajar Nugroho", phone: "081234567805" },
      ],
    },
    {
      competition: "Gaple",
      pics: [
        { name: "Siti Nurhaliza", phone: "081234567806" },
        { name: "Wahyu Pranoto", phone: "081234567807" },
      ],
    },
    {
      competition: "Tarik Tambang",
      pics: [
        { name: "Eka Putri", phone: "081234567808" },
        { name: "Doni Setiawan", phone: "081234567809" },
      ],
    },
    {
      competition: "Makan Kerupuk",
      pics: [
        { name: "Ratna Sari", phone: "081234567810" },
        { name: "Joko Widodo", phone: "081234567811" },
      ],
    },
    {
      competition: "Jepit Balon",
      pics: [
        { name: "Ani Yulianti", phone: "081234567812" },
        { name: "Surya Pratama", phone: "081234567813" },
      ],
    },
    {
      competition: "Lomba Mewarnai",
      pics: [
        { name: "Dina Mariana", phone: "081234567814" },
        { name: "Eko Prasetyo", phone: "081234567815" },
      ],
    },
    {
      competition: "Puzzle",
      pics: [
        { name: "Yuni Astuti", phone: "081234567816" },
        { name: "Arif Rahman", phone: "081234567817" },
      ],
    },
    {
      competition: "Lomba Mancing",
      pics: [
        { name: "Wati Suryani", phone: "081234567818" },
        { name: "Benny Kurniawan", phone: "081234567819" },
      ],
    },
  ]

  const organizationContacts = [
    {
      role: "Ketua Panitia",
      name: "Dr. Ahmad Fauzi",
      phone: "081234567820",
      description: "Koordinator utama acara",
    },
    {
      role: "Sekretaris",
      name: "Siti Aminah, S.Pd",
      phone: "081234567821",
      description: "Administrasi dan dokumentasi",
    },
    {
      role: "Bendahara",
      name: "Ir. Budiman",
      phone: "081234567822",
      description: "Keuangan dan sponsorship",
    },
    {
      role: "Koordinator Lomba",
      name: "Drs. Suryanto",
      phone: "081234567823",
      description: "Koordinasi semua perlombaan",
    },
    {
      role: "Koordinator Bazaar",
      name: "Hj. Mariam",
      phone: "081234567824",
      description: "Koordinasi bazaar dan UMKM",
    },
    {
      role: "Humas & Publikasi",
      name: "Rina Kartika, S.Kom",
      phone: "081234567825",
      description: "Media sosial dan publikasi",
    },
  ]

  const emergencyContacts = [
    {
      role: "Keamanan",
      name: "Satpam Komplek",
      phone: "081234567826",
      description: "Keamanan dan ketertiban",
    },
    {
      role: "Kesehatan",
      name: "Tim Medis",
      phone: "081234567827",
      description: "P3K dan kesehatan",
    },
    {
      role: "Teknis",
      name: "Tim IT",
      phone: "081234567828",
      description: "Sound system dan teknis",
    },
  ]

  return (
    <PageContainer title="Kontak" subtitle="Hubungi PIC & Panitia Alifia Gumbira 1.0" backgroundColor="bg-blue-600">
      {/* Guidelines */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <AlertTriangle className="w-5 h-5" />
            Panduan Menghubungi PIC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-semibold mb-2">⏰ Waktu Terbaik:</h4>
              <ul className="space-y-1">
                <li>• Senin-Jumat: 08.00-17.00 WIB</li>
                <li>• Sabtu-Minggu: 09.00-15.00 WIB</li>
                <li>• Hindari jam istirahat (12.00-13.00)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📝 Tips Komunikasi:</h4>
              <ul className="space-y-1">
                <li>• Sebutkan nama dan tim Anda</li>
                <li>• Jelaskan pertanyaan dengan jelas</li>
                <li>• Gunakan bahasa yang sopan</li>
                <li>• Simpan nomor untuk komunikasi lanjutan</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competition PICs */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            PIC Perlombaan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitionPICs.map((comp, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">{comp.competition}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {comp.pics.map((pic, picIndex) => (
                    <div key={picIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-800">{pic.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {pic.phone}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleWhatsApp(pic.phone, pic.name, comp.competition)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Organization Contacts */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Pengurus Panitia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizationContacts.map((contact, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {contact.role}
                      </Badge>
                      <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {contact.phone}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleWhatsApp(contact.phone, contact.name, contact.role)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            Kontak Darurat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="border-2 border-red-200 bg-red-50 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <Badge variant="destructive" className="mb-2">
                      {contact.role}
                    </Badge>
                    <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 text-center flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3" />
                      {contact.phone}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleWhatsApp(contact.phone, contact.name, contact.role)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Hubungi Sekarang
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Jadwal Acara
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Tanggal:</span>
                <span>Sabtu, 15 Juli 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Waktu:</span>
                <span>08.00 - 17.00 WIB</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Lokasi:</span>
                <span>Komplek Perumahan</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Registrasi:</span>
                <span>07.30 - 08.30 WIB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-blue-600" />
              Pusat Informasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1">Website Resmi</h4>
                <p className="text-sm text-blue-600">alifia-gumbira.vercel.app</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1">WhatsApp Group</h4>
                <p className="text-sm text-green-600">Grup koordinasi panitia</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-1">Media Sosial</h4>
                <p className="text-sm text-purple-600">@alifia_gumbira_official</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <Card className="mt-6 bg-gray-50">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Untuk pertanyaan mendesak di luar jam kerja, hubungi kontak darurat di atas</span>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
