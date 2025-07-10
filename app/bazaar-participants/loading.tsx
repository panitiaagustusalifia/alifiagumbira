import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Skeleton from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Skeleton className="w-8 h-8 bg-green-500" />
            <div>
              <Skeleton className="w-48 h-8 bg-green-500 mb-2" />
              <Skeleton className="w-32 h-4 bg-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="w-full h-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="w-48 h-6" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="w-32 h-10" />
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-8" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Participants List */}
        <Card>
          <CardHeader>
            <Skeleton className="w-32 h-6" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <Skeleton className="w-48 h-6 mb-2" />
                      <Skeleton className="w-32 h-4 mb-1" />
                      <Skeleton className="w-40 h-4" />
                    </div>
                    <Skeleton className="w-20 h-6" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Skeleton className="w-full h-16" />
                    <Skeleton className="w-full h-16" />
                    <Skeleton className="w-full h-16" />
                    <Skeleton className="w-full h-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
