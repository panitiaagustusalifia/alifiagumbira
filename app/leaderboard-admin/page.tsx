"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Plus, Edit, Trash2, Trophy, Medal, Award } from "lucide-react"
import Link from "next/link"
import { useLeaderboard } from "@/hooks/use-leaderboard"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { EmptyState } from "@/components/common/empty-state"
import { useToast } from "@/hooks/use-toast"

export default function LeaderboardAdmin() {
  const { leaderboardData, loading, error, addResult, updateResult, deleteResult } = useLeaderboard()
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingResult, setEditingResult] = useState<any>(null)

  // Form state
  const [formData, setFormData] = useState({
    competition: "",
    team: "",
    position: 1,
    points: 5,
    notes: "",
  })

  const competitions = [
    "Menghias Tumpeng",
    "Volly Balon Raksasa",
    "Suit Jepang",
    "Estafet Air",
    "Pukul Paku",
    "Tenis Meja",
    "Balap Karung Raksasa",
    "Volly Sarung",
    "Gaple",
    "Tarik Tambang",
    "Makan Kerupuk",
    "Jepit Balon",
    "Lomba Mewarnai",
    "Puzzle",
  ]

  const teams = [
    "Boulevard (Soedirman)",
    "Lotus Bougenville Senja (A. Yani)",
    "Cendana (Pattimura)",
    "Bintel Perdana (Diponegoro)",
    "Mangga Jambu Bhinneka (Cut Nyak Dhien)",
    "Jati Kenari (Bung Tomo)",
  ]

  const positions = [
    { value: 1, label: "Juara 1", points: 5 },
    { value: 2, label: "Juara 2", points: 3 },
    { value: 3, label: "Juara 3", points: 1 },
  ]

  const handlePositionChange = (position: string) => {
    const pos = Number.parseInt(position)
    const points = positions.find((p) => p.value === pos)?.points || 0
    setFormData((prev) => ({ ...prev, position: pos, points }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.competition || !formData.team) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib",
        variant: "destructive",
      })
      return
    }

    const success = await addResult(formData)

    if (success) {
      toast({
        title: "Berhasil",
        description: "Hasil lomba berhasil ditambahkan",
      })
      setFormData({ competition: "", team: "", position: 1, points: 5, notes: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEdit = (result: any) => {
    setEditingResult(result)
    setFormData({
      competition: result.competition,
      team: result.team,
      position: result.position,
      points: result.points,
      notes: result.notes || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingResult) return

    const success = await updateResult(editingResult.id, formData)

    if (success) {
      toast({
        title: "Berhasil",
        description: "Hasil lomba berhasil diupdate",
      })
      setIsEditDialogOpen(false)
      setEditingResult(null)
    } else {
      toast({
        title: "Info",
        description: "Fitur update belum tersedia, silakan hapus dan tambah ulang",
        variant: "default",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus hasil ini?")) return

    const success = await deleteResult(id)

    if (success) {
      toast({
        title: "Berhasil",
        description: "Hasil lomba berhasil dihapus",
      })
    } else {
      toast({
        title: "Info",
        description: "Fitur hapus belum tersedia",
        variant: "default",
      })
    }
  }

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-orange-600" />
      default:
        return (
          <div className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold">
            {position}
          </div>
        )
    }
  }

  // Calculate team standings
  const teamStandings = teams
    .map((team) => {
      const teamResults = leaderboardData.filter((result) => result.team === team)
      const totalPoints = teamResults.reduce((sum, result) => sum + result.points, 0)
      return { team, totalPoints, results: teamResults }
    })
    .sort((a, b) => b.totalPoints - a.totalPoints)

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-purple-600 border-white hover:bg-purple-50 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Admin Klasemen</h1>
              <p className="text-purple-100">Kelola Hasil Lomba & Klasemen</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Hasil
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Hasil Lomba</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="competition">Lomba *</Label>
                    <Select
                      value={formData.competition}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, competition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih lomba" />
                      </SelectTrigger>
                      <SelectContent>
                        {competitions.map((comp) => (
                          <SelectItem key={comp} value={comp}>
                            {comp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="team">Tim *</Label>
                    <Select
                      value={formData.team}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, team: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tim" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team} value={team}>
                            {team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="position">Posisi *</Label>
                    <Select value={formData.position.toString()} onValueChange={handlePositionChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih posisi" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((pos) => (
                          <SelectItem key={pos.value} value={pos.value.toString()}>
                            {pos.label} ({pos.points} poin)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Catatan</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Catatan tambahan (opsional)"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Simpan
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Batal
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Team Standings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Klasemen Sementara</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamStandings.map((team, index) => (
                <div key={team.team} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">{getRankIcon(index + 1)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{team.team}</h3>
                    <p className="text-sm text-gray-600">{team.results.length} lomba diikuti</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{team.totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Poin</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Hasil Lomba</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <EmptyState
                title="Error"
                description={error}
                {...(<Button onClick={() => window.location.reload()}>Coba Lagi</Button>)}
              />
            )}

            {leaderboardData.length === 0 ? (
              <EmptyState
                title="Belum Ada Hasil"
                description="Belum ada hasil lomba yang diinput"
                { ...
                  (<Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Hasil Pertama
                  </Button>)
                }
              />
            ) : (
              <div className="space-y-3">
                {leaderboardData
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((result, index) => (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getRankIcon(result.position)}
                        <div>
                          <h3 className="font-semibold">{result.competition}</h3>
                          <p className="text-sm text-gray-600">{result.team}</p>
                          {result.notes && <p className="text-xs text-gray-500 mt-1">{result.notes}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-bold">
                          {result.points} poin
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {new Date(result.timestamp).toLocaleDateString("id-ID")}
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(result)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(result.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Hasil Lomba</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label htmlFor="competition">Lomba *</Label>
              <Select
                value={formData.competition}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, competition: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih lomba" />
                </SelectTrigger>
                <SelectContent>
                  {competitions.map((comp) => (
                    <SelectItem key={comp} value={comp}>
                      {comp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="team">Tim *</Label>
              <Select
                value={formData.team}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, team: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tim" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="position">Posisi *</Label>
              <Select value={formData.position.toString()} onValueChange={handlePositionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih posisi" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos.value} value={pos.value.toString()}>
                      {pos.label} ({pos.points} poin)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Catatan tambahan (opsional)"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Update
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
