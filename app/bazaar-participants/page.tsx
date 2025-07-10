"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"
import { useBazaar } from "@/hooks/use-bazaar"
import { BazaarParticipantsList } from "@/components/bazaar/bazaar-participants-list"
import { Suspense } from "react"

export default function BazaarParticipants() {
  const { bazaarData, loading, error, refetch } = useBazaar()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBusinessType, setFilterBusinessType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterTeam, setFilterTeam] = useState("all")

  const getStatusColor = (status: string) => {
    return status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  const getStatusText = (status: string) => {
    return status === "confirmed" ? "Terkonfirmasi" : "Menunggu"
  }

  const getBusinessTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Makanan & Minuman": "bg-orange-100 text-orange-800",
      "Pakaian & Aksesoris": "bg-purple-100 text-purple-800",
      "Kerajinan Tangan": "bg-blue-100 text-blue-800",
      "Produk Kecantikan": "bg-pink-100 text-pink-800",
      "Mainan Anak": "bg-green-100 text-green-800",
      Elektronik: "bg-gray-100 text-gray-800",
      Lainnya: "bg-indigo-100 text-indigo-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const filteredRegistrations = useMemo(() => {
    return bazaarData.filter((registration) => {
      const matchesSearch =
        registration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registration.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registration.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registration.products.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBusinessType = filterBusinessType === "all" || registration.businessType === filterBusinessType
      const matchesStatus = filterStatus === "all" || registration.status === filterStatus
      const matchesTeam = filterTeam === "all" || registration.team === filterTeam

      return matchesSearch && matchesBusinessType && matchesStatus && matchesTeam
    })
  }, [bazaarData, searchTerm, filterBusinessType, filterStatus, filterTeam])

  const stats = useMemo(() => {
    return {
      total: bazaarData.length,
      confirmed: bazaarData.filter((r) => r.status === "confirmed").length,
      pending: bazaarData.filter((r) => r.status === "pending").length,
    }
  }, [bazaarData])

  const teams = useMemo(() => {
    const uniqueTeams = [...new Set(bazaarData.map((r) => r.team))]
    return uniqueTeams.map((team) => ({ value: team, label: team.split(" ")[0] }))
  }, [bazaarData])

  const businessTypes = useMemo(() => {
    const uniqueTypes = [...new Set(bazaarData.map((r) => r.businessType))]
    return uniqueTypes.map((type) => ({ value: type, label: type }))
  }, [bazaarData])

  const exportToCSV = () => {
    const headers = [
      "Nama Pemilik",
      "WhatsApp",
      "Tim",
      "Nama Usaha",
      "Jenis Usaha",
      "Produk",
      "Butuh Listrik",
      "Butuh Meja",
      "Butuh Kursi",
      "Permintaan Khusus",
      "Status",
      "Tanggal Daftar",
      "Catatan",
    ]
    const csvContent = [
      headers.join(","),
      ...filteredRegistrations.map((r) =>
        [
          r.name,
          r.phone,
          r.team,
          r.businessName,
          r.businessType,
          r.products,
          r.specialRequests || "",
          getStatusText(r.status),
          new Date(r.timestamp).toLocaleDateString("id-ID"),
          r.notes || "",
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `peserta-bazaar-alifia-gumbira-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 border-white hover:bg-green-50 bg-transparent"
              >
                <Search className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Peserta Bazaar</h1>
              <p className="text-green-100">Daftar Pedagang & UMKM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <BazaarParticipantsList />
        </Suspense>
      </div>
    </div>
  )
}
