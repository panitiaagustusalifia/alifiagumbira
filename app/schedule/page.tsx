import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function Schedule() {
  const scheduleData = [
    {
      date: "Sabtu, 02 Agustus 2025",
      events: [
        { time: "19:00-23:00", activity: "Penyisihan Tenis Meja", type: "penyisihan" },
        { time: "19:00-23:00", activity: "Penyisihan Gaple", type: "penyisihan" },
      ],
    },
    {
      date: "Minggu, 03 Agustus 2025",
      events: [
        { time: "08:00-10:00", activity: "Penyisihan Volly Raksasa", type: "penyisihan" },
        { time: "10:00-12:00", activity: "Penyisihan Volly Sarung", type: "penyisihan" },
        { time: "13:00-15:00", activity: "Penyisihan Balap Karung Raksasa", type: "penyisihan" },
        { time: "15:00-17:00", activity: "Penyisihan Tarik Tambang", type: "penyisihan" },
      ],
    },
    {
      date: "Sabtu, 09 Agustus 2025",
      events: [
        { time: "19:00-23:00", activity: "Semifinal Tenis Meja", type: "semifinal" },
        { time: "19:00-23:00", activity: "Semifinal Gaple", type: "semifinal" },
      ],
    },
    {
      date: "Minggu, 10 Agustus 2025",
      events: [
        { time: "08:00-12:00", activity: "Semifinal & Perebutan Tempat Juara 3 Volly Raksasa", type: "semifinal" },
        { time: "13:00-15:00", activity: "Semifinal & Perebutan Tempat Juara 3 Volly Sarung", type: "semifinal" },
        {
          time: "15:00-18:00",
          activity: "Semifinal & Perebutan Tempat Juara 3 Balap Karung Raksasa",
          type: "semifinal",
        },
        { time: "15:00-17:00", activity: "Semifinal & Perebutan Tempat Juara 3 Tarik Tambang", type: "semifinal" },
      ],
    },
    {
      date: "Sabtu, 16 Agustus 2025",
      events: [
        { time: "08:00-17:00", activity: "Mancing", type: "lomba" },
        { time: "19:00-23:00", activity: "Perebutan Tempat Ketiga & Final Tenis Meja serta Gaple", type: "final" },
      ],
    },
    {
      date: "Minggu, 17 Agustus 2025",
      events: [
        { time: "06:00-08:00", activity: "Jalan Sehat & Senam Pagi", type: "acara" },
        { time: "08:00-09:00", activity: "Lomba Anak (Usia 2-4, 5-8, 9-12 Tahun) - Sesi 1", type: "lomba" },
        { time: "09:00-10:00", activity: "Lomba Anak (Usia 2-4, 5-8, 9-12 Tahun) - Sesi 2", type: "lomba" },
        { time: "10:00-11:00", activity: "Lomba Anak (Usia 2-4, 5-8, 9-12 Tahun) - Sesi 3", type: "lomba" },
        { time: "11:00-12:00", activity: "Final Tarik Tambang", type: "final" },
        { time: "13:00-14:00", activity: "Final Volly Raksasa Ibu-Ibu", type: "final" },
        { time: "14:00-15:00", activity: "Final Volly Sarung Bapak-Bapak", type: "final" },
        { time: "15:00-16:00", activity: "Final Balap Karung Raksasa", type: "final" },
        { time: "16:00-18:00", activity: "Lomba Suit Jepang, Estafet Air, Pukul Paku", type: "lomba" },
      ],
    },
    {
      date: "Sabtu, 23 Agustus 2025",
      events: [
        { time: "08:00-17:00", activity: "Lomba Menghias Tumpeng", type: "lomba" },
        { time: "19:00-19:15", activity: "Pembukaan", type: "acara" },
        { time: "19:15-19:20", activity: "Sambutan Panitia", type: "acara" },
        { time: "19:20-19:25", activity: "Sambutan Pengurus RT", type: "acara" },
        { time: "19:25-19:40", activity: "Pengumuman Lomba Tumpeng", type: "pengumuman" },
        { time: "19:40-20:00", activity: "Pembagian Door Prize", type: "acara" },
        { time: "20:00-21:00", activity: "Penampilan Antar Team", type: "acara" },
        { time: "21:00-21:15", activity: "Pembagian Hadiah", type: "pengumuman" },
        { time: "21:15-21:30", activity: "Doa Penutup", type: "acara" },
      ],
    },
  ]

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
      case "pengumuman":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-white-600 border-white hover:bg-blue-50 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Jadwal Kegiatan</h1>
              <p className="text-blue-100">Alifia Gumbira 1.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {scheduleData.map((day, dayIndex) => (
            <Card key={dayIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  {day.date}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {day.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-600 min-w-[100px]">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <p className="font-medium text-gray-800 flex-1">{event.activity}</p>
                          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Location Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-red-600" />
              Lokasi Kegiatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Seluruh rangkaian kegiatan akan dilaksanakan di lingkungan Perumahan Cluster Grand Alifia, RT/RW 06/06,
              Kecamatan Tanah Sareal.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
