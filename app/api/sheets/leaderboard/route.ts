import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

// Initialize Google Sheets API
async function getGoogleSheetsClient() {
  try {
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const serviceAccountPrivateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    const sheetId = process.env.GOOGLE_SHEET_ID

    if (!serviceAccountEmail || !serviceAccountPrivateKey || !sheetId) {
      throw new Error("Missing required environment variables")
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: serviceAccountPrivateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    return { sheets, sheetId }
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error)
    throw error
  }
}

// GET - Fetch leaderboard data
export async function GET() {
  try {
    const { sheets, sheetId } = await getGoogleSheetsClient()

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Leaderboard!A2:G1000",
    })

    const rows = response.data.values || []

    const leaderboardData = rows.map((row) => ({
      id: row[0] || "",
      competition: row[1] || "",
      team: row[2] || "",
      position: Number.parseInt(row[3]) || 0,
      points: Number.parseInt(row[4]) || 0,
      notes: row[5] || "",
      timestamp: row[6] || new Date().toISOString(),
    }))

    return NextResponse.json({
      success: true,
      data: leaderboardData,
      count: leaderboardData.length,
    })
  } catch (error) {
    console.error("Error fetching leaderboard data:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch leaderboard data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// POST - Add new leaderboard result
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { competition, team, position, points, notes } = body

    if (!competition || !team || !position || points === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: competition, team, position, points",
        },
        { status: 400 },
      )
    }

    const { sheets, sheetId } = await getGoogleSheetsClient()

    const id = Date.now().toString()
    const timestamp = new Date().toISOString()

    const values = [[id, competition, team, position.toString(), points.toString(), notes || "", timestamp]]

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Leaderboard!A:G",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Leaderboard result added successfully",
      data: {
        id,
        competition,
        team,
        position,
        points,
        notes,
        timestamp,
      },
    })
  } catch (error) {
    console.error("Error adding leaderboard result:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add leaderboard result",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// PUT - Update leaderboard result (placeholder for future implementation)
export async function PUT(request: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      error: "Update functionality not implemented yet",
      message: "Please delete and re-add the result for now",
    },
    { status: 501 },
  )
}

// DELETE - Delete leaderboard result (placeholder for future implementation)
export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      error: "Delete functionality not implemented yet",
      message: "Manual deletion from Google Sheets required for now",
    },
    { status: 501 },
  )
}
