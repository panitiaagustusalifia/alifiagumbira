"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Store, Phone, MapPin, Zap, Table, RockingChairIcon as Chair } from "lucide-react"
import { useBazaar } from "@/hooks/use-bazaar"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { EmptyState } from "@/components/common/empty-state"

export function BazaarParticipantsList() {
  const { bazaarData, loading, error } = useBazaar()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  // Filter and search data
  const filteredData = useMemo(() => {
    return bazaarData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.products.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      const matchesType = typeFilter === "all" || item.businessType === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [bazaarData, searchTerm, statusFilter, typeFilter])

  // Get unique business types for filter
  const businessTypes = useMemo(() => {
    const types = [...new Set(bazaarData.map((item) => item.businessType))]
    return types.filter(Boolean)
  }, [bazaarData])

  // Calculate stats
  const stats = useMemo(() => {
    const total = bazaarData.length
    const confirmed = bazaarData.filter((item) => item.status === "confirmed").length

    return { total, confirmed }
  }, [bazaarData])

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Nama Pemilik",
      "No. HP",
      "Tim",
      "Nama Usaha",
      "Jenis Usaha",
      "Produk",
      "Butuh Listrik",
      "Butuh Meja",
      "Butuh Kursi",
      "Permintaan Khusus",
      "Catatan",
      "Status",
      "Tanggal Daftar",
    ]

    const csvData = filteredData.map((item) => [
      item.name,
      item.phone,
      item.team,
      item.businessName,
      item.businessType,
      item.products,
      item.specialRequests || "",
      item.notes || "",
      item.status === "confirmed" ? "Dikonfirmasi" : "Menunggu",
      new Date(item.timestamp).toLocaleDateString("id-ID"),
    ])

    const csvContent = [headers, ...csvData].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `peserta-bazaar-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  // Format WhatsApp number and create link
  const getWhatsAppLink = (phone: string, name: string, businessName: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    const waPhone = cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone
    const message = `Halo ${name}, saya ingin bertanya tentang ${businessName} di acara Alifia Gumbira 1.0`
    return `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <EmptyState
        title="Gagal Memuat Data"
        description={error}
        {...(<Button onClick={() => window.location.reload()}>Coba Lagi</Button>)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Store className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Peserta</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Badge className="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center">✓</Badge>
              <div>
                <div className="text-2xl font-bold">{stats.confirmed}</div>
                <div className="text-sm text-gray-600">Dikonfirmasi</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Filter & Pencarian</span>
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nama, usaha, tim, atau produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Jenis Usaha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-600">
            Menampilkan {filteredData.length} dari {bazaarData.length} peserta
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Peserta</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredData.length === 0 ? (
            <EmptyState title="Tidak Ada Data" description="Tidak ada peserta bazaar yang sesuai dengan filter" />
          ) : (
            <div className="space-y-4">
              {filteredData.map((participant, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{participant.businessName}</h3>
                      <p className="text-gray-600">Pemilik: {participant.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {participant.team}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={participant.status === "confirmed" ? "default" : "secondary"}>
                        {participant.status === "confirmed" ? "Dikonfirmasi" : "Menunggu"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(
                            getWhatsAppLink(participant.phone, participant.name, participant.businessName),
                            "_blank",
                          )
                        }
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-sm font-medium text-gray-700 mb-1">Jenis Usaha</div>
                      <div className="text-sm">{participant.businessType}</div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-sm font-medium text-gray-700 mb-1">Produk</div>
                      <div className="text-sm">{participant.products}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-sm font-medium text-gray-700 mb-1">Kontak</div>
                      <div className="text-sm">{participant.phone}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Daftar: {new Date(participant.timestamp).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                  </div>

                  {(participant.specialRequests || participant.notes) && (
                    <div className="mt-3 p-3 bg-blue-50 rounded">
                      {participant.specialRequests && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-blue-700">Permintaan Khusus: </span>
                          <span className="text-sm text-blue-600">{participant.specialRequests}</span>
                        </div>
                      )}
                      {participant.notes && (
                        <div>
                          <span className="text-sm font-medium text-blue-700">Catatan: </span>
                          <span className="text-sm text-blue-600">{participant.notes}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
