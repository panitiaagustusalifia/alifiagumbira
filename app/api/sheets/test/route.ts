import { NextResponse } from "next/server"
import { google } from "googleapis"

export async function GET() {
  try {
    // Check if environment variables are set
    const requiredEnvVars = {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
    }

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Missing environment variables: ${missingVars.join(", ")}`,
        details: {
          configured: Object.fromEntries(Object.entries(requiredEnvVars).map(([key, value]) => [key, !!value])),
        },
        steps: ["Set missing environment variables in .env.local", "Restart development server", "Try test again"],
      })
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

    // Test basic sheet access
    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "properties.title,sheets.properties.title",
    })

    // Test reading data from Participants sheet
    let participantsTest = null
    try {
      const participantsResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Participants!A1:A1",
      })
      participantsTest = {
        success: true,
        message: "Can read Participants sheet",
        data: participantsResponse.data.values,
      }
    } catch (error: any) {
      participantsTest = {
        success: false,
        message: `Cannot read Participants sheet: ${error.message}`,
        suggestions: [
          "Create 'Participants' sheet in your Google Sheet",
          "Add headers in row 1: Name, Phone, Team, Competition, Category, Notes, Timestamp, Status",
        ],
      }
    }

    // Test reading data from Bazaar sheet
    let bazaarTest = null
    try {
      const bazaarResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Bazaar!A1:A1",
      })
      bazaarTest = {
        success: true,
        message: "Can read Bazaar sheet",
        data: bazaarResponse.data.values,
      }
    } catch (error: any) {
      bazaarTest = {
        success: false,
        message: `Cannot read Bazaar sheet: ${error.message}`,
        suggestions: [
          "Create 'Bazaar' sheet in your Google Sheet",
          "Add headers in row 1: Name, Phone, Team, Business Name, Business Type, Products, Need Electricity, Need Table, Need Chair, Special Requests, Notes, Timestamp, Status",
        ],
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully connected to sheet: ${sheetInfo.data.properties?.title}`,
      details: {
        sheetTitle: sheetInfo.data.properties?.title,
        sheets: sheetInfo.data.sheets?.map((sheet) => sheet.properties?.title),
        participantsTest,
        bazaarTest,
      },
      steps: [
        "✅ Service account authentication successful",
        "✅ Can access Google Sheet",
        participantsTest?.success ? "✅ Participants sheet accessible" : "❌ Participants sheet needs setup",
        bazaarTest?.success ? "✅ Bazaar sheet accessible" : "❌ Bazaar sheet needs setup",
      ],
    })
  } catch (error: any) {
    console.error("Error testing Google Sheets connection:", error)

    let errorMessage = "Connection test failed"
    let steps: string[] = []

    if (error.code === 403) {
      errorMessage = "Permission denied - Service account doesn't have access"
      steps = [
        "Check if service account email is correct",
        "Verify private key is properly formatted",
        "Ensure Google Sheets API is enabled",
        "Check if service account has access to the sheet",
      ]
    } else if (error.code === 404) {
      errorMessage = "Sheet not found"
      steps = [
        "Verify GOOGLE_SHEET_ID is correct",
        "Check if sheet exists and is not deleted",
        "Ensure sheet is accessible",
      ]
    } else {
      steps = [
        "Check internet connection",
        "Verify all environment variables are set",
        "Check Google Cloud Console for API status",
      ]
    }

    return NextResponse.json({
      success: false,
      message: errorMessage,
      details: {
        error: error.message,
        code: error.code,
      },
      steps,
    })
  }
}
