"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, RefreshCw, ExternalLink, AlertTriangle, Server } from "lucide-react"
import { PageContainer } from "@/components/common/page-container"
import { googleSheetsService } from "@/lib/google-sheets"

export default function TestConnection() {
  const [testing, setTesting] = useState(false)
  const [checkingApi, setCheckingApi] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    details?: any
    steps?: string[]
  } | null>(null)
  const [apiStatus, setApiStatus] = useState<{
    enabled: boolean
    message: string
  } | null>(null)

  const testConnection = async () => {
    setTesting(true)
    setResult(null)

    try {
      const result = await googleSheetsService.testConnection()
      setResult(result)
    } catch (error) {
      setResult({
        success: false,
        message: `Test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setTesting(false)
    }
  }

  const checkApiStatus = async () => {
    setCheckingApi(true)
    setApiStatus(null)

    try {
      const status = await googleSheetsService.checkApiEnabled()
      setApiStatus(status)
    } catch (error) {
      setApiStatus({
        enabled: false,
        message: `Error checking API status: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setCheckingApi(false)
    }
  }

  // Server-side environment variables
  const hasServerConfig = !!(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ||
    process.env.GOOGLE_SHEET_ID
  )

  return (
    <PageContainer
      title="Test Google Sheets Connection"
      subtitle="Uji koneksi ke Google Sheets API (Server-Side)"
      backgroundColor="bg-blue-600"
    >
      {/* Configuration Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            Status Konfigurasi Server-Side
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 border-blue-200 bg-blue-50">
            <Server className="h-4 w-4" />
            <AlertDescription className="text-blue-800">
              <strong>✅ CORS Issue Fixed!</strong> Sekarang menggunakan server-side API routes untuk menghindari CORS.
              Semua request ke Google Sheets API sekarang melalui server Next.js.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Service Account Email:</span>
              <Badge variant={hasServerConfig ? "default" : "destructive"}>
                {hasServerConfig ? "✓ Configured" : "✗ Not Set"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Service Account Private Key:</span>
              <Badge variant={hasServerConfig ? "default" : "destructive"}>
                {hasServerConfig ? "✓ Configured" : "✗ Not Set"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Google Sheet ID:</span>
              <Badge variant={hasServerConfig ? "default" : "destructive"}>
                {hasServerConfig ? "✓ Configured" : "✗ Not Set"}
              </Badge>
            </div>
          </div>

          {!hasServerConfig && (
            <Alert className="mt-4 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-orange-800">
                <strong>Environment variables tidak terdeteksi.</strong> Pastikan Anda sudah set environment variables
                di .env.local dan restart development server.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Check API Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={checkApiStatus} disabled={checkingApi} className="w-full mb-3">
              {checkingApi ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Check Server API Status
                </>
              )}
            </Button>

            {apiStatus && (
              <Alert className={apiStatus.enabled ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <div className="flex items-start gap-2">
                  {apiStatus.enabled ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                  )}
                  <AlertDescription className={apiStatus.enabled ? "text-green-800" : "text-red-800"}>
                    {apiStatus.message}
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test Server Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={testConnection} disabled={testing} className="w-full">
              {testing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing Server Connection...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Test Server Connection
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Test Results */}
      {result && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Server-Side Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <div className="flex items-start gap-2">
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                    <div className="font-medium mb-2">
                      {result.success ? "✅ Server Connection Successful!" : "❌ Server Connection Failed"}
                    </div>
                    <div className="text-sm whitespace-pre-line">{result.message}</div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {result.steps && result.steps.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">{result.success ? "✅ Status:" : "🔧 Next Steps:"}</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {result.steps.map((step, index) => (
                    <li key={index} className={result.success ? "text-green-700" : "text-gray-700"}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {result.details && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Server Response Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {/* Server-Side Setup Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Server-Side Setup Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                <strong>✅ CORS Problem Solved!</strong> Dengan menggunakan server-side API routes, tidak ada lagi
                masalah CORS karena request dilakukan dari server Next.js ke Google Sheets API.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <h4 className="font-semibold">Environment Variables Required</h4>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Set these in your .env.local file:</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                    <div>GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com</div>
                    <div>GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----...</div>
                    <div>GOOGLE_SHEET_ID=your_google_sheet_id</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <h4 className="font-semibold">Service Account Setup</h4>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>You already have a service account! Use these credentials:</p>
                  <div className="bg-blue-50 p-2 rounded">
                    <code className="text-xs">admin-901@projectagustusan.iam.gserviceaccount.com</code>
                  </div>
                  <p>Make sure to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Enable Google Sheets API for your project</li>
                    <li>Share your Google Sheet with the service account email</li>
                    <li>Give "Editor" permission to the service account</li>
                  </ul>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                  onClick={() => window.open("https://console.cloud.google.com/iam-admin/serviceaccounts", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Service Accounts
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <h4 className="font-semibold">Share Google Sheet</h4>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Share your Google Sheet with the service account:</p>
                  <ol className="list-decimal list-inside ml-4 space-y-1">
                    <li>Open your Google Sheet</li>
                    <li>Click "Share" button</li>
                    <li>Add: admin-901@projectagustusan.iam.gserviceaccount.com</li>
                    <li>Set permission to "Editor"</li>
                    <li>Click "Send"</li>
                  </ol>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  <h4 className="font-semibold">Benefits of Server-Side Approach</h4>
                </div>
                <div className="text-sm text-gray-600">
                  <ul className="list-disc list-inside space-y-1">
                    <li>✅ No CORS issues</li>
                    <li>✅ More secure (credentials not exposed to client)</li>
                    <li>✅ Better error handling</li>
                    <li>✅ Can use service account for more permissions</li>
                    <li>✅ Works in all browsers and environments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
