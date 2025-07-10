"use client"

import { useState, useEffect } from "react"
import { googleSheetsService, type ParticipantData } from "@/lib/google-sheets"
import { useToast } from "@/hooks/use-toast"

export function useParticipants() {
  const [participants, setParticipants] = useState<ParticipantData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchParticipants = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await googleSheetsService.getParticipants()
      setParticipants(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch participants"
      setError(errorMessage)
      toast({
        title: "Error",
        description: "Gagal memuat data peserta",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addParticipant = async (participant: Omit<ParticipantData, "timestamp" | "status">) => {
    try {
      const success = await googleSheetsService.addParticipant(participant)
      if (success) {
        toast({
          title: "Berhasil!",
          description: "Pendaftaran lomba berhasil disimpan",
        })
        // Refresh data
        await fetchParticipants()
        return true
      }
      return false
    } catch (err) {
      toast({
        title: "Error",
        description: "Gagal menyimpan pendaftaran",
        variant: "destructive",
      })
      return false
    }
  }

  useEffect(() => {
    fetchParticipants()
  }, [])

  return {
    participants,
    loading,
    error,
    addParticipant,
    refetch: fetchParticipants,
  }
}
