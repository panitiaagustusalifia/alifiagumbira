"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Settings, CheckCircle, AlertCircle, ExternalLink, Copy, Key, Shield } from "lucide-react"
import { PageContainer } from "@/components/common/page-container"
import { useState } from "react"

export default function SetupGuide() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  const currentSheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID
  const currentApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <PageContainer
      title="Setup Google Sheets"
      subtitle="Panduan konfigurasi integrasi Google Sheets"
      backgroundColor="bg-indigo-600"
    >
      {/* Current Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            Status Konfigurasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Google Sheet ID:</span>
              <Badge variant={currentSheetId ? "default" : "destructive"}>
                {currentSheetId ? "Configured" : "Not Set"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Google API Key:</span>
              <Badge variant={currentApiKey ? "default" : "destructive"}>
                {currentApiKey ? "Configured" : "Not Set"}
              </Badge>
            </div>
            {currentSheetId && (
              <div className="text-sm text-gray-600">
                Sheet ID: <code className="bg-gray-100 px-2 py-1 rounded">{currentSheetId}</code>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicator */}
      <Card className="mb-6 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            Great Progress! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-green-700 space-y-2">
            <p>✅ You have a Google Cloud project set up</p>
            <p>
              ✅ You have a service account created:{" "}
              <code className="bg-green-100 px-2 py-1 rounded text-sm">
                admin-901@projectagustusan.iam.gserviceaccount.com
              </code>
            </p>
            <p className="font-semibold">🔄 Next: Create an API Key for Google Sheets API</p>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Create API Key (CURRENT STEP) */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            Create API Key (Current Step)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Key className="h-4 w-4" />
            <AlertDescription className="text-blue-800">
              <strong>You're currently in the right place!</strong> Now you need to create an API Key.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <p className="text-blue-700">Follow these steps in your current Google Cloud Console page:</p>

            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>
                  Click the <strong>"+ CREATE CREDENTIALS"</strong> button at the top
                </li>
                <li>
                  Select <strong>"API key"</strong> from the dropdown
                </li>
                <li>
                  A popup will show your new API key - <strong>copy it immediately!</strong>
                </li>
                <li>
                  Click <strong>"RESTRICT KEY"</strong> for security
                </li>
                <li>Give it a name like "Sheets API Key"</li>
                <li>
                  Under "API restrictions", select <strong>"Restrict key"</strong>
                </li>
                <li>
                  Choose <strong>"Google Sheets API"</strong> from the list
                </li>
                <li>
                  Under "Application restrictions", choose <strong>"None"</strong> for development
                </li>
                <li>
                  Click <strong>"SAVE"</strong>
                </li>
              </ol>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Copy the API key immediately when it's shown - you won't be able to see it
                again!
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Enable Google Sheets API */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </span>
            Enable Google Sheets API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Make sure the Google Sheets API is enabled for your project:</p>

          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => window.open("https://console.cloud.google.com/apis/library/sheets.googleapis.com", "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Enable Google Sheets API
          </Button>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Click the "ENABLE" button if it's not already enabled. If you see "MANAGE" instead of "ENABLE", it's
              already enabled.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Step 3: Create Google Sheet */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            Create Google Sheet with Correct Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => window.open("https://sheets.google.com", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Create New Google Sheet
            </Button>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Required Sheet Structure:</strong>
                <br />
                <strong>Sheet 1: "Participants"</strong> with headers in row 1:
                <br />
                <code className="text-xs bg-gray-100 px-1">
                  Name | Phone | Team | Competition | Category | Notes | Timestamp | Status
                </code>
                <br />
                <br />
                <strong>Sheet 2: "Bazaar"</strong> with headers in row 1:
                <br />
                <code className="text-xs bg-gray-100 px-1">
                  Name | Phone | Team | Business Name | Business Type | Products | Need Electricity | Need Table | Need
                  Chair | Special Requests | Notes | Timestamp | Status
                </code>
              </AlertDescription>
            </Alert>

            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Quick Setup Steps:</h4>
              <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
                <li>Create a new Google Sheet</li>
                <li>Rename "Sheet1" to "Participants"</li>
                <li>Add the headers in row 1 as shown above</li>
                <li>Create a new sheet and name it "Bazaar"</li>
                <li>Add the bazaar headers in row 1</li>
                <li>Share the sheet: Anyone with the link → Viewer</li>
                <li>Copy the Sheet ID from the URL</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Get Sheet ID */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              4
            </span>
            Get Sheet ID & Make it Public
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-600">Copy Sheet ID from URL and make it publicly accessible:</p>

            <div className="bg-gray-100 p-3 rounded-lg">
              <code className="text-sm">
                https://docs.google.com/spreadsheets/d/<span className="bg-yellow-200 px-1">SHEET_ID_HERE</span>/edit
              </code>
            </div>

            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">🔐 Critical: Make Sheet Public</h4>
              <ol className="list-decimal list-inside text-sm text-red-700 space-y-1">
                <li>Click the "Share" button in your Google Sheet</li>
                <li>Click "Change to anyone with the link"</li>
                <li>Set permission to "Viewer"</li>
                <li>Click "Done"</li>
                <li>
                  <strong>Test:</strong> Open the sheet in incognito mode - you should be able to view it without
                  logging in
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 5: Environment Variables */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              5
            </span>
            Set Environment Variables
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Add these to your .env.local file:</p>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>NEXT_PUBLIC_GOOGLE_SHEET_ID=your_sheet_id_here</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("NEXT_PUBLIC_GOOGLE_SHEET_ID=your_sheet_id_here")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Replace "your_sheet_id_here" and "your_api_key_here" with your actual values, then restart your
              development server.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Step 6: Test Connection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              6
            </span>
            Test Your Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Once you've completed all steps above:</p>

          <Button className="w-full" onClick={() => window.open("/test-connection", "_blank")}>
            <Shield className="w-4 h-4 mr-2" />
            Test Google Sheets Connection
          </Button>

          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-800">
              If the test passes, you're all set! The app will be able to read and write data to your Google Sheet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Common Issues & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-red-600">❌ "The caller does not have permission"</h4>
              <ul className="text-sm text-gray-600 ml-4 list-disc space-y-1">
                <li>Google Sheets API not enabled → Enable it</li>
                <li>Sheet not public → Make it "Anyone with the link"</li>
                <li>Wrong Sheet ID → Double-check the ID from URL</li>
                <li>API key restrictions → Allow Google Sheets API</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-600">❌ "API_KEY_HTTP_REFERRER_BLOCKED"</h4>
              <ul className="text-sm text-gray-600 ml-4 list-disc space-y-1">
                <li>Set Application restrictions to "None" for development</li>
                <li>Or add your domain to HTTP referrers list</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-600">❌ 404 Not Found</h4>
              <ul className="text-sm text-gray-600 ml-4 list-disc space-y-1">
                <li>Wrong Sheet ID</li>
                <li>Sheet names "Participants" and "Bazaar" must be exact</li>
                <li>Sheet was deleted or moved</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-600">✅ Development Mode</h4>
              <p className="text-sm text-gray-600">
                If Google Sheets is not configured, the app will use mock data so you can still develop and test the UI.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
