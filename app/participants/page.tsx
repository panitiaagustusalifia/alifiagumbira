"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, RefreshCw, Download } from "lucide-react"
import { useParticipants } from "@/hooks/use-participants"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { EmptyState } from "@/components/common/empty-state"
import { StatsCard } from "@/components/common/stats-card"
import { PageContainer } from "@/components/common/page-container"

export default function Participants() {
  const { participants, loading, error, refetch } = useParticipants()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterTeam, setFilterTeam] = useState("all")

  const getStatusColor = (status: string) => {
    return status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  const getStatusText = (status: string) => {
    return status === "confirmed" ? "Terkonfirmasi" : "Menunggu"
  }

  const getCategoryColor = (category: string) => {
    if (category.includes("Anak")) return "bg-blue-100 text-blue-800"
    if (category === "Ibu-ibu") return "bg-pink-100 text-pink-800"
    if (category === "Bapak-bapak") return "bg-gray-100 text-gray-800"
    return "bg-purple-100 text-purple-800"
  }

  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      const matchesSearch =
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.competition.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = filterCategory === "all" || participant.category === filterCategory
      const matchesStatus = filterStatus === "all" || participant.status === filterStatus
      const matchesTeam = filterTeam === "all" || participant.team === filterTeam

      return matchesSearch && matchesCategory && matchesStatus && matchesTeam
    })
  }, [participants, searchTerm, filterCategory, filterStatus, filterTeam])

  const stats = useMemo(() => {
    return {
      total: participants.length,
      confirmed: participants.filter((p) => p.status === "confirmed").length,
      pending: participants.filter((p) => p.status === "pending").length,
      children: participants.filter((p) => p.category.includes("Anak")).length,
      mothers: participants.filter((p) => p.category === "Ibu-ibu").length,
      fathers: participants.filter((p) => p.category === "Bapak-bapak").length,
    }
  }, [participants])

  const teams = useMemo(() => {
    const uniqueTeams = [...new Set(participants.map((p) => p.team))]
    return uniqueTeams.map((team) => ({ value: team, label: team.split(" ")[0] }))
  }, [participants])

  const exportToCSV = () => {
    const headers = ["Nama", "WhatsApp", "Tim", "Lomba", "Kategori", "Status", "Tanggal Daftar", "Catatan"]
    const csvContent = [
      headers.join(","),
      ...filteredParticipants.map((p) =>
        [
          p.name,
          p.phone,
          p.team,
          p.competition,
          p.category,
          getStatusText(p.status),
          new Date(p.timestamp).toLocaleDateString("id-ID"),
          p.notes || "",
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `peserta-alifia-gumbira-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <PageContainer title="Peserta Terdaftar" subtitle="Memuat data peserta..." backgroundColor="bg-teal-600">
        <LoadingSpinner size="lg" text="Memuat data peserta dari Google Sheets..." />
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer title="Peserta Terdaftar" subtitle="Terjadi kesalahan" backgroundColor="bg-teal-600">
        <EmptyState
          title="Gagal Memuat Data"
          description={`Terjadi kesalahan saat memuat data peserta: ${error}`}
          actionLabel="Coba Lagi"
          actionHref="#"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Peserta Terdaftar"
      subtitle="Daftar peserta yang sudah mendaftar lomba"
      backgroundColor="bg-teal-600"
    >
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatsCard title="Total Peserta" value={stats.total} color="text-teal-600" />
        <StatsCard title="Terkonfirmasi" value={stats.confirmed} color="text-green-600" />
        <StatsCard title="Menunggu" value={stats.pending} color="text-yellow-600" />
        <StatsCard title="Anak-anak" value={stats.children} color="text-blue-600" />
        <StatsCard title="Ibu-ibu" value={stats.mothers} color="text-pink-600" />
        <StatsCard title="Bapak-bapak" value={stats.fathers} color="text-gray-600" />
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Cari nama peserta, tim, atau lomba..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Anak-anak">Anak-anak</SelectItem>
                  <SelectItem value="Ibu-ibu">Ibu-ibu</SelectItem>
                  <SelectItem value="Bapak-bapak">Bapak-bapak</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="confirmed">Terkonfirmasi</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterTeam} onValueChange={setFilterTeam}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Tim" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tim</SelectItem>
                  {teams.map((team) => (
                    <SelectItem key={team.value} value={team.value}>
                      {team.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={refetch} size="sm" className="bg-transparent">
                <RefreshCw className="w-4 h-4" />
              </Button>

              <Button variant="outline" onClick={exportToCSV} size="sm" className="bg-transparent">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            Daftar Peserta ({filteredParticipants.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredParticipants.length === 0 ? (
            <EmptyState
              title="Tidak ada peserta"
              description={
                searchTerm || filterCategory !== "all" || filterStatus !== "all" || filterTeam !== "all"
                  ? "Tidak ada peserta yang sesuai dengan filter yang dipilih"
                  : "Belum ada peserta yang mendaftar"
              }
              actionLabel="Daftar Lomba"
              actionHref="/register-competition"
              icon={<Users className="w-12 h-12 text-gray-300" />}
            />
          ) : (
            <div className="space-y-3">
              {filteredParticipants.map((participant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{participant.name}</h3>
                      <Badge className={getStatusColor(participant.status)}>{getStatusText(participant.status)}</Badge>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-gray-600">
                      <span>
                        Tim: <span className="font-medium">{participant.team.split(" ")[0]}</span>
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span>
                        Lomba: <span className="font-medium">{participant.competition}</span>
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span>
                        WhatsApp: <span className="font-medium">{participant.phone}</span>
                      </span>
                    </div>
                    {participant.notes && (
                      <div className="mt-2 text-sm text-gray-500">Catatan: {participant.notes}</div>
                    )}
                    <div className="mt-1 text-xs text-gray-400">
                      Daftar:{" "}
                      {new Date(participant.timestamp).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getCategoryColor(participant.category)}>{participant.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Registration Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Informasi Pendaftaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Status Pendaftaran:</h4>
              <ul className="space-y-1">
                <li>
                  • <span className="text-green-600 font-medium">Terkonfirmasi</span>: Peserta sudah dikonfirmasi PIC
                </li>
                <li>
                  • <span className="text-yellow-600 font-medium">Menunggu</span>: Menunggu konfirmasi dari PIC
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Catatan:</h4>
              <ul className="space-y-1">
                <li>• Data tersimpan di Google Sheets</li>
                <li>• Data diperbarui secara real-time</li>
                <li>• Peserta dapat diganti hingga H-2 lomba</li>
                <li>• Hubungi PIC untuk perubahan data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
