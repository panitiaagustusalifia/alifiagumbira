"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Users } from "lucide-react"
import { useState } from "react"

interface Participant {
  name: string
  team: string
  competition: string
  category: string
  status: "confirmed" | "pending"
}

interface ParticipantListProps {
  participants: Participant[]
  showSearch?: boolean
  showFilter?: boolean
}

export function ParticipantList({ participants, showSearch = true, showFilter = true }: ParticipantListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

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

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.competition.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterCategory === "all" || participant.category === filterCategory

    return matchesSearch && matchesFilter
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-600" />
          Daftar Peserta ({filteredParticipants.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Search and Filter */}
        {(showSearch || showFilter) && (
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {showSearch && (
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Cari nama peserta..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            {showFilter && (
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            )}
          </div>
        )}

        {/* Participants List */}
        <div className="space-y-3">
          {filteredParticipants.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Tidak ada peserta yang ditemukan</p>
            </div>
          ) : (
            filteredParticipants.map((participant, index) => (
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
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getCategoryColor(participant.category)}>{participant.category}</Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
