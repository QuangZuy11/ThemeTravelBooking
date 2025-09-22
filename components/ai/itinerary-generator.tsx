"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { generateItinerary, type TravelPreferences, type AIItinerary, saveItinerary } from "@/lib/ai-service"
import { useAuth } from "@/contexts/auth-context"
import {
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Star,
  Save,
  Loader2,
  Heart,
  Camera,
  Mountain,
  Utensils,
  Building,
  Waves,
} from "lucide-react"

interface ItineraryGeneratorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onItineraryGenerated?: (itinerary: AIItinerary) => void
}

export function ItineraryGenerator({ open, onOpenChange, onItineraryGenerated }: ItineraryGeneratorProps) {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedItinerary, setGeneratedItinerary] = useState<AIItinerary | null>(null)
  const [preferences, setPreferences] = useState<TravelPreferences>({
    destination: "",
    duration: 3,
    budget: 5000000,
    travelStyle: "comfort",
    interests: [],
    groupSize: 2,
  })

  const destinations = ["Hạ Long", "Sapa", "Hội An", "Phú Quốc", "Đà Lạt", "Nha Trang", "Huế", "Cần Thơ"]

  const interestOptions = [
    { id: "nature", label: "Thiên nhiên", icon: Mountain },
    { id: "culture", label: "Văn hóa", icon: Building },
    { id: "food", label: "Ẩm thực", icon: Utensils },
    { id: "adventure", label: "Phiêu lưu", icon: Waves },
    { id: "photography", label: "Chụp ảnh", icon: Camera },
    { id: "relaxation", label: "Nghỉ dưỡng", icon: Heart },
  ]

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interestId] : prev.interests.filter((id) => id !== interestId),
    }))
  }

  const handleGenerateItinerary = async () => {
    if (!preferences.destination || preferences.interests.length === 0) {
      return
    }

    setIsGenerating(true)
    try {
      const itinerary = await generateItinerary(preferences)
      setGeneratedItinerary(itinerary)
      setStep(3)
      onItineraryGenerated?.(itinerary)
    } catch (error) {
      console.error("Error generating itinerary:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveItinerary = async () => {
    if (!generatedItinerary) return

    try {
      await saveItinerary(generatedItinerary)
      // Show success message
    } catch (error) {
      console.error("Error saving itinerary:", error)
    }
  }

  const resetGenerator = () => {
    setStep(1)
    setGeneratedItinerary(null)
    setPreferences({
      destination: "",
      duration: 3,
      budget: 5000000,
      travelStyle: "comfort",
      interests: [],
      groupSize: 2,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-500" />
            Tạo lịch trình du lịch với AI
          </DialogTitle>
          <DialogDescription>Để AI tạo lịch trình cá nhân hóa dựa trên sở thích của bạn</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination">Điểm đến</Label>
                <Select
                  value={preferences.destination}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, destination: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn điểm đến" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest} value={dest}>
                        {dest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label>Thời gian: {preferences.duration} ngày</Label>
                <Slider
                  value={[preferences.duration]}
                  onValueChange={([value]) => setPreferences((prev) => ({ ...prev, duration: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label>Ngân sách: {preferences.budget.toLocaleString("vi-VN")}đ</Label>
                <Slider
                  value={[preferences.budget]}
                  onValueChange={([value]) => setPreferences((prev) => ({ ...prev, budget: value }))}
                  max={20000000}
                  min={1000000}
                  step={500000}
                  className="w-full"
                />
              </div>

              {/* Group Size */}
              <div className="space-y-2">
                <Label>Số người: {preferences.groupSize}</Label>
                <Slider
                  value={[preferences.groupSize]}
                  onValueChange={([value]) => setPreferences((prev) => ({ ...prev, groupSize: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Travel Style */}
            <div className="space-y-2">
              <Label>Phong cách du lịch</Label>
              <Select
                value={preferences.travelStyle}
                onValueChange={(value: any) => setPreferences((prev) => ({ ...prev, travelStyle: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Tiết kiệm</SelectItem>
                  <SelectItem value="comfort">Thoải mái</SelectItem>
                  <SelectItem value="luxury">Sang trọng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => setStep(2)} className="w-full" disabled={!preferences.destination}>
              Tiếp theo
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sở thích của bạn</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interestOptions.map((interest) => {
                  const Icon = interest.icon
                  return (
                    <div key={interest.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest.id}
                        checked={preferences.interests.includes(interest.id)}
                        onCheckedChange={(checked) => handleInterestChange(interest.id, !!checked)}
                      />
                      <Label htmlFor={interest.id} className="flex items-center gap-2 cursor-pointer">
                        <Icon className="h-4 w-4" />
                        {interest.label}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Quay lại
              </Button>
              <Button
                onClick={handleGenerateItinerary}
                className="flex-1"
                disabled={preferences.interests.length === 0 || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tạo lịch trình...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Tạo lịch trình
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && generatedItinerary && (
          <div className="space-y-6">
            {/* Itinerary Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{generatedItinerary.title}</h2>
              <div className="flex justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {generatedItinerary.destination}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {generatedItinerary.duration} ngày
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {generatedItinerary.estimatedCost.toLocaleString("vi-VN")}đ
                </div>
              </div>
            </div>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Điểm nổi bật</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {generatedItinerary.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Itinerary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Lịch trình chi tiết</h3>
              {generatedItinerary.days.map((day) => (
                <Card key={day.day}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Ngày {day.day} - {new Date(day.date).toLocaleDateString("vi-VN")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {day.activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{activity.name}</h4>
                              <Badge variant="outline">{activity.category}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {activity.timeSlot}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {activity.rating.toFixed(1)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-orange-600">{activity.cost.toLocaleString("vi-VN")}đ</p>
                          </div>
                        </div>
                      ))}

                      {day.accommodation && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{day.accommodation.name}</h4>
                              <p className="text-sm text-gray-600">{day.accommodation.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-blue-600">
                                {day.accommodation.price.toLocaleString("vi-VN")}đ
                              </p>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-sm">{day.accommodation.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <Separator />
                      <div className="flex justify-between items-center font-medium">
                        <span>Tổng chi phí ngày {day.day}:</span>
                        <span className="text-orange-600">{day.totalCost.toLocaleString("vi-VN")}đ</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lời khuyên hữu ích</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {generatedItinerary.tips.map((tip, index) => (
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
              <Button variant="outline" onClick={resetGenerator} className="flex-1 bg-transparent">
                Tạo lịch trình mới
              </Button>
              <Button onClick={handleSaveItinerary} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Lưu lịch trình
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
