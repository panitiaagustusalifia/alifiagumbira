"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface LeaderboardResult {
  id: string
  competition: string
  team: string
  position: number
  points: number
  notes?: string
  timestamp: string
}

export function useLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/sheets/leaderboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setLeaderboardData(data.data || [])
      } else {
        throw new Error(data.error || "Failed to fetch leaderboard data")
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch leaderboard data")
      toast({
        title: "Error",
        description: "Gagal memuat data klasemen. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const addResult = useCallback(
    async (resultData: Omit<LeaderboardResult, "id" | "timestamp">) => {
      try {
        const response = await fetch("/api/sheets/leaderboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultData),
        })

        const data = await response.json()

        if (data.success) {
          // Refresh data after successful addition
          await fetchLeaderboard()
          return true
        } else {
          throw new Error(data.error || "Failed to add result")
        }
      } catch (err) {
        console.error("Error adding result:", err)
        toast({
          title: "Error",
          description: "Gagal menambahkan hasil lomba. Silakan coba lagi.",
          variant: "destructive",
        })
        return false
      }
    },
    [fetchLeaderboard, toast],
  )

  const updateResult = useCallback(
    async (id: string, resultData: Omit<LeaderboardResult, "id" | "timestamp">) => {
      try {
        const response = await fetch("/api/sheets/leaderboard", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...resultData }),
        })

        const data = await response.json()

        if (data.success) {
          // Refresh data after successful update
          await fetchLeaderboard()
          return true
        } else {
          throw new Error(data.error || "Failed to update result")
        }
      } catch (err) {
        console.error("Error updating result:", err)
        toast({
          title: "Error",
          description: "Gagal mengupdate hasil lomba. Silakan coba lagi.",
          variant: "destructive",
        })
        return false
      }
    },
    [fetchLeaderboard, toast],
  )

  const deleteResult = useCallback(
    async (id: string) => {
      try {
        const response = await fetch("/api/sheets/leaderboard", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        })

        const data = await response.json()

        if (data.success) {
          // Refresh data after successful deletion
          await fetchLeaderboard()
          return true
        } else {
          throw new Error(data.error || "Failed to delete result")
        }
      } catch (err) {
        console.error("Error deleting result:", err)
        toast({
          title: "Error",
          description: "Gagal menghapus hasil lomba. Silakan coba lagi.",
          variant: "destructive",
        })
        return false
      }
    },
    [fetchLeaderboard, toast],
  )

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  return {
    leaderboardData,
    loading,
    error,
    addResult,
    updateResult,
    deleteResult,
    refetch: fetchLeaderboard,
  }
}
