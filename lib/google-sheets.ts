// Google Sheets API integration - Server-side version
interface SheetData {
    range: string
    majorDimension: string
    values: string[][]
  }
  
  interface ParticipantData {
    name: string
    phone: string
    team: string
    competition: string
    category: string
    notes?: string
    timestamp: string
    status: "pending" | "confirmed"
  }
  
  interface BazaarData {
    name: string
    phone: string
    team: string
    businessName: string
    businessType: string
    products: string
    specialRequests?: string
    notes?: string
    timestamp: string
    status: "pending" | "confirmed"
  }
  
  interface LeaderboardData {
    id: string
    competition: string
    team: string
    position: number
    points: number
    notes?: string
    timestamp: string
  }
  
  class GoogleSheetsService {
    // Check if configuration is valid (server-side)
    private isConfigured(): boolean {
      return !!(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
        process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
        process.env.GOOGLE_SHEET_ID
      )
    }
  
    // Get data from Google Sheets via server-side API
    async getSheetData(range: string): Promise<string[][]> {
      try {
        console.log("🔍 Fetching data from server-side API for range:", range)
  
        const response = await fetch(`/api/sheets/get?range=${encodeURIComponent(range)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        console.log("📡 Server API response status:", response.status)
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error("❌ Server API Error:", errorData)
  
          if (response.status === 500 && errorData.details) {
            const { code, message, suggestions } = errorData.details
  
            if (code === 403) {
              throw new Error(`Permission Denied (403) - Server Side
  
  🔍 Error: ${message}
  
  🔧 Kemungkinan solusi:
  ${suggestions?.map((s: string, i: number) => `${i + 1}. ${s}`).join("\n") || ""}
  
  💡 Catatan: Ini error dari server-side (service account), bukan client-side API key.`)
            }
  
            if (code === 404) {
              throw new Error(`Sheet Not Found (404) - Server Side
  
  🔍 Error: ${message}
  
  🔧 Kemungkinan solusi:
  ${suggestions?.map((s: string, i: number) => `${i + 1}. ${s}`).join("\n") || ""}`)
            }
  
            throw new Error(`Server Error (${code}): ${message}`)
          }
  
          throw new Error(`Server API error: ${response.status} - ${errorData.error || response.statusText}`)
        }
  
        const data = await response.json()
        console.log("✅ Successfully fetched data from server:", data)
        console.log("📊 Rows returned:", data.data?.length || 0)
  
        return data.data || []
      } catch (error) {
        console.error("💥 Error fetching sheet data via server:", error)
  
        // Return mock data as fallback
        console.log("🔄 Falling back to mock data")
        return this.getMockData(range)
      }
    }
  
    // Mock data for development/fallback
    private getMockData(range: string): string[][] {
      console.log("🎭 Using mock data for range:", range)
  
      if (range.includes("Participants")) {
        return [
          [
            "Ahmad Rizki",
            "08123456789",
            "Boulevard (Soedirman)",
            "Tenis Meja",
            "Bapak-bapak",
            "",
            new Date().toISOString(),
            "confirmed",
          ],
          [
            "Siti Nurhaliza",
            "08234567890",
            "Lotus Bougenville Senja (A. Yani)",
            "Menghias Tumpeng",
            "Ibu-ibu",
            "",
            new Date().toISOString(),
            "pending",
          ],
          [
            "Budi Santoso",
            "08345678901",
            "Cendana (Pattimura)",
            "Balap Karung Raksasa",
            "Bapak-bapak",
            "",
            new Date().toISOString(),
            "confirmed",
          ],
          [
            "Rina Kartika",
            "08456789012",
            "Bintel Perdana (Diponegoro)",
            "Volly Balon Raksasa",
            "Ibu-ibu",
            "",
            new Date().toISOString(),
            "confirmed",
          ],
          [
            "Aisyah Putri",
            "08567890123",
            "Boulevard (Soedirman)",
            "Makan Kerupuk",
            "Anak-anak",
            "",
            new Date().toISOString(),
            "pending",
          ],
          [
            "Kenzo Pratama",
            "08678901234",
            "Bintel Perdana (Diponegoro)",
            "Jepit Balon",
            "Anak-anak",
            "",
            new Date().toISOString(),
            "confirmed",
          ],
          [
            "Maya Sari",
            "08789012345",
            "Jati Kenari (Bung Tomo)",
            "Suit Jepang",
            "Ibu-ibu",
            "",
            new Date().toISOString(),
            "pending",
          ],
          [
            "Dedi Kurniawan",
            "08890123456",
            "Mangga Jambu Bhinneka (Cut Nyak Dhien)",
            "Gaple",
            "Bapak-bapak",
            "",
            new Date().toISOString(),
            "confirmed",
          ],
        ]
      }
  
      if (range.includes("Bazaar")) {
        return [
          [
            "Maya Sari",
            "08123456789",
            "Jati Kenari (Bung Tomo)",
            "Warung Makan Bu Maya",
            "Makanan & Minuman",
            "Nasi gudeg, soto ayam, es teh",
            "true",
            "true",
            "true",
            "Butuh akses air",
            "",
            new Date().toISOString(),
            "confirmed",
          ],
          [
            "Dedi Kurniawan",
            "08234567890",
            "Boulevard (Soedirman)",
            "Toko Elektronik Dedi",
            "Elektronik",
            "Charger HP, kabel data, powerbank",
            "true",
            "false",
            "false",
            "",
            "",
            new Date().toISOString(),
            "pending",
          ],
          [
            "Sari Indah",
            "08345678901",
            "Cendana (Pattimura)",
            "Kerajinan Sari",
            "Kerajinan Tangan",
            "Tas rajut, dompet, aksesoris",
            "false",
            "true",
            "true",
            "Lokasi teduh",
            "",
            new Date().toISOString(),
            "confirmed",
          ],
        ]
      }
  
      if (range.includes("Leaderboard")) {
        return [
          ["1", "Tenis Meja", "Boulevard (Soedirman)", "1", "5", "", new Date().toISOString()],
          ["2", "Tenis Meja", "Cendana (Pattimura)", "2", "3", "", new Date().toISOString()],
          ["3", "Menghias Tumpeng", "Bintel Perdana (Diponegoro)", "1", "5", "", new Date().toISOString()],
        ]
      }
  
      return []
    }
  
    // Test connection via server-side API
    async testConnection(): Promise<{ success: boolean; message: string; details?: any; steps?: string[] }> {
      try {
        console.log("🧪 Testing connection via server-side API...")
  
        const response = await fetch("/api/sheets/test", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        const data = await response.json()
  
        if (!response.ok) {
          return {
            success: false,
            message: data.message || "Server-side test failed",
            details: data.details,
            steps: data.steps || [],
          }
        }
  
        return {
          success: data.success,
          message: data.message,
          details: data.details,
          steps: data.steps || [],
        }
      } catch (error) {
        return {
          success: false,
          message: `Connection test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
          details: error,
          steps: [
            "Check if development server is running",
            "Verify API routes are accessible",
            "Check server logs for errors",
          ],
        }
      }
    }
  
    // Check if Google Sheets API is enabled (simplified for server-side)
    async checkApiEnabled(): Promise<{ enabled: boolean; message: string }> {
      try {
        const testResult = await this.testConnection()
        return {
          enabled: testResult.success,
          message: testResult.success
            ? "Google Sheets API is working via server-side"
            : "Google Sheets API has issues - check server-side configuration",
        }
      } catch (error) {
        return {
          enabled: false,
          message: "Could not check API status via server",
        }
      }
    }
  
    // Append data to Google Sheets (unchanged - already server-side)
    async appendToSheet(range: string, values: string[][]): Promise<boolean> {
      try {
        const response = await fetch("/api/sheets/append", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            range,
            values,
          }),
        })
  
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to append data")
        }
  
        const result = await response.json()
        return result.success
      } catch (error) {
        console.error("Error appending to sheet:", error)
        return false
      }
    }
  
    // Get participants data
    async getParticipants(): Promise<ParticipantData[]> {
      try {
        const data = await this.getSheetData("Participants!A2:H")
        return data.map((row) => ({
          name: row[0] || "",
          phone: row[1] || "",
          team: row[2] || "",
          competition: row[3] || "",
          category: row[4] || "",
          notes: row[5] || "",
          timestamp: row[6] || new Date().toISOString(),
          status: (row[7] as "pending" | "confirmed") || "pending",
        }))
      } catch (error) {
        console.error("Error getting participants:", error)
        return []
      }
    }
  
    // Get bazaar data
    async getBazaar(): Promise<BazaarData[]> {
      try {
        const data = await this.getSheetData("Bazaar!A2:M")
        return data.map((row) => ({
          name: row[0] || "",
          phone: row[1] || "",
          team: row[2] || "",
          businessName: row[3] || "",
          businessType: row[4] || "",
          products: row[5] || "",
          needElectricity: row[6] === "true",
          needTable: row[7] === "true",
          needChair: row[8] === "true",
          specialRequests: row[9] || "",
          notes: row[10] || "",
          timestamp: row[11] || new Date().toISOString(),
          status: (row[12] as "pending" | "confirmed") || "pending",
        }))
      } catch (error) {
        console.error("Error getting bazaar data:", error)
        return []
      }
    }
  
    // Get leaderboard data
    async getLeaderboard(): Promise<LeaderboardData[]> {
      try {
        const data = await this.getSheetData("Leaderboard!A2:G")
        return data.map((row) => ({
          id: row[0] || "",
          competition: row[1] || "",
          team: row[2] || "",
          position: Number.parseInt(row[3]) || 0,
          points: Number.parseInt(row[4]) || 0,
          notes: row[5] || "",
          timestamp: row[6] || new Date().toISOString(),
        }))
      } catch (error) {
        console.error("Error getting leaderboard data:", error)
        return []
      }
    }
  
    // Add leaderboard result
    async addLeaderboardResult(result: Omit<LeaderboardData, "id" | "timestamp">): Promise<boolean> {
      try {
        const id = Date.now().toString()
        const timestamp = new Date().toISOString()
  
        const values = [
          [
            id,
            result.competition,
            result.team,
            result.position.toString(),
            result.points.toString(),
            result.notes || "",
            timestamp,
          ],
        ]
  
        return await this.appendToSheet("Leaderboard!A:G", values)
      } catch (error) {
        console.error("Error adding leaderboard result:", error)
        return false
      }
    }
  
    // Update leaderboard result (placeholder - would need more complex server-side implementation)
    async updateLeaderboardResult(id: string, result: Partial<LeaderboardData>): Promise<boolean> {
      // This would require a more complex server-side implementation
      // For now, return false to indicate it's not implemented
      console.warn("Update leaderboard result not implemented yet")
      return false
    }
  
    // Delete leaderboard result (placeholder - would need more complex server-side implementation)
    async deleteLeaderboardResult(id: string): Promise<boolean> {
      // This would require a more complex server-side implementation
      // For now, return false to indicate it's not implemented
      console.warn("Delete leaderboard result not implemented yet")
      return false
    }
  
    // Add participant registration
    async addParticipant(participant: Omit<ParticipantData, "timestamp" | "status">): Promise<boolean> {
      try {
        const timestamp = new Date().toISOString()
        const values = [
          [
            participant.name,
            participant.phone,
            participant.team,
            participant.competition,
            participant.category,
            participant.notes || "",
            timestamp,
            "pending",
          ],
        ]
  
        return await this.appendToSheet("Participants!A:H", values)
      } catch (error) {
        console.error("Error adding participant:", error)
        return false
      }
    }
  
    // Add bazaar registration
    async addBazaar(bazaar: Omit<BazaarData, "timestamp" | "status">): Promise<boolean> {
      try {
        const timestamp = new Date().toISOString()
        const values = [
          [
            bazaar.name,
            bazaar.phone,
            bazaar.team,
            bazaar.businessName,
            bazaar.businessType,
            bazaar.products,
            bazaar.specialRequests || "",
            bazaar.notes || "",
            timestamp,
            "pending",
          ],
        ]
  
        return await this.appendToSheet("Bazaar!A:M", values)
      } catch (error) {
        console.error("Error adding bazaar:", error)
        return false
      }
    }
  }
  
  // Export singleton instance
  export const googleSheetsService = new GoogleSheetsService()
  
  // Export types
  export type { ParticipantData, BazaarData, LeaderboardData, SheetData }
  