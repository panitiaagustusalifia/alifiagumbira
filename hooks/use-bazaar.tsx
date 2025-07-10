"use client"

import { useState, useEffect } from "react"
import { googleSheetsService, type BazaarData } from "@/lib/google-sheets"
import { useToast } from "@/hooks/use-toast"

export function useBazaar() {
  const [bazaarData, setBazaarRegistrations] = useState<BazaarData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchBazaarRegistrations = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await googleSheetsService.getBazaar()
      setBazaarRegistrations(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch bazaar registrations"
      setError(errorMessage)
      toast({
        title: "Error",
        description: "Gagal memuat data pendaftaran bazar",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addBazaarRegistration = async (bazaar: Omit<BazaarData, "timestamp" | "status">) => {
    try {
      const success = await googleSheetsService.addBazaar(bazaar)
      if (success) {
        toast({
          title: "Berhasil!",
          description: "Pendaftaran bazar berhasil disimpan",
        })
        // Refresh data
        await fetchBazaarRegistrations()
        return true
      }
      return false
    } catch (err) {
      toast({
        title: "Error",
        description: "Gagal menyimpan pendaftaran bazar",
        variant: "destructive",
      })
      return false
    }
  }

  useEffect(() => {
    fetchBazaarRegistrations()
  }, [])

  return {
    bazaarData,
    loading,
    error,
    addBazaarRegistration,
    refetch: fetchBazaarRegistrations,
  }
}
