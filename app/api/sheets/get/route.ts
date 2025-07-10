import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get("range")

    if (!range) {
      return NextResponse.json({ success: false, error: "Range parameter is required" }, { status: 400 })
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
      return NextResponse.json({ success: false, error: "Google Sheet ID not configured" }, { status: 500 })
    }

    // Get data from sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    })

    return NextResponse.json({
      success: true,
      data: response.data.values || [],
      range: response.data.range,
    })
  } catch (error: any) {
    console.error("Error getting data from Google Sheets:", error)

    // Provide detailed error information
    let errorMessage = "Failed to get data from Google Sheets"
    let errorDetails = {}

    if (error.code === 403) {
      errorMessage = "Permission denied. Check if Google Sheets API is enabled and service account has access."
      errorDetails = {
        code: error.code,
        message: error.message,
        suggestions: [
          "Enable Google Sheets API in Google Cloud Console",
          "Check service account permissions",
          "Verify GOOGLE_SHEET_ID is correct",
          "Ensure service account credentials are valid",
        ],
      }
    } else if (error.code === 404) {
      errorMessage = "Sheet not found. Check Sheet ID and range."
      errorDetails = {
        code: error.code,
        message: error.message,
        suggestions: [
          "Verify GOOGLE_SHEET_ID is correct",
          "Check if sheet exists",
          "Verify range format (e.g., 'Participants!A1:H100')",
        ],
      }
    } else {
      errorDetails = {
        code: error.code || "UNKNOWN",
        message: error.message || "Unknown error",
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 },
    )
  }
}
