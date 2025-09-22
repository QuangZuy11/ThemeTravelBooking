"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getUserItineraries, type AIItinerary } from "@/lib/ai-service"
import { useAuth } from "@/contexts/auth-context"
import { Calendar, MapPin, DollarSign, Eye, Share, Download, Sparkles, Clock } from "lucide-react"

export function SavedItineraries() {
  const { user } = useAuth()
  const [itineraries, setItineraries] = useState<AIItinerary[]>([])
  const [selectedItinerary, setSelectedItinerary] = useState<AIItinerary | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadItineraries = async () => {
      if (!user) return

      try {
        const userItineraries = await getUserItineraries(user.id)
        setItineraries(userItineraries)
      } catch (error) {
        console.error("Error loading itineraries:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadItineraries()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (itineraries.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Sparkles className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Chưa có lịch trình nào</h3>
          <p className="text-gray-600 text-center mb-4">
            Tạo lịch trình đầu tiên với AI để bắt đầu hành trình khám phá!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
          <Card key={itinerary.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-500" />
                {itinerary.title}
              </CardTitle>
              <CardDescription>Tạo ngày {itinerary.createdAt.toLocaleDateString("vi-VN")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {itinerary.destination}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {itinerary.duration} ngày
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-orange-600">
                    {itinerary.estimatedCost.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {itinerary.highlights.slice(0, 2).map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight.length > 20 ? `${highlight.substring(0, 20)}...` : highlight}
                    </Badge>
                  ))}
                  {itinerary.highlights.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{itinerary.highlights.length - 2} khác
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setSelectedItinerary(itinerary)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Xem
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Itinerary Detail Dialog */}
      <Dialog open={!!selectedItinerary} onOpenChange={() => setSelectedItinerary(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              {selectedItinerary?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedItinerary && (
            <div className="space-y-6">
              {/* Itinerary Info */}
              <div className="flex justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedItinerary.destination}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedItinerary.duration} ngày
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {selectedItinerary.estimatedCost.toLocaleString("vi-VN")}đ
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedItinerary.createdAt.toLocaleDateString("vi-VN")}
                </div>
              </div>

              {/* Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Điểm nổi bật</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedItinerary.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lời khuyên hữu ích</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedItinerary.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share className="mr-2 h-4 w-4" />
                  Chia sẻ
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Tải xuống
                </Button>
                <Button className="flex-1">Đặt tour ngay</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
