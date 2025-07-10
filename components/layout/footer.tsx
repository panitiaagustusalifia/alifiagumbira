import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Users } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Tanggal Acara</h3>
              <p className="text-sm text-gray-600">2 - 23 Agustus 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Lokasi</h3>
              <p className="text-sm text-gray-600">Cluster Grand Alifia RT/RW 06/06</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Peserta</h3>
              <p className="text-sm text-gray-600">Warga RT/RW 06/06</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center border-t pt-6">
          <h2 className="text-xl font-bold text-red-600 mb-2">Alifia Gumbira 1.0</h2>
          <p className="text-lg font-semibold text-red-500 mb-4">"RUKUN, BERSATU, BERJAYA!"</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Diselenggarakan oleh Panitia RT/RW 06/06</p>
            <p>Kel. Mekarwangi, Kec. Tanah Sareal, Bogor</p>
            <p className="mt-4">© 2025 Alifia Gumbira 1.0. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
