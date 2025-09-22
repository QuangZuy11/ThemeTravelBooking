"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { createBooking, type BookingRequest, type Service } from "@/lib/booking-service"
import { useAuth } from "@/contexts/auth-context"
import {
  Users,
  DollarSign,
  MapPin,
  Clock,
  Star,
  Phone,
  Mail,
  User,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react"

interface BookingFormProps {
  service: Service
  open: boolean
  onOpenChange: (open: boolean) => void
  onBookingCreated?: (booking: any) => void
}

export function BookingForm({ service, open, onOpenChange, onBookingCreated }: BookingFormProps) {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    numberOfPeople: 1,
    customerName: user?.name || "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || "",
    specialRequests: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
  })

  const totalAmount = service.price * bookingData.numberOfPeople

  const handleSubmitBooking = async () => {
    if (!user) return

    setIsSubmitting(true)
    try {
      const bookingRequest: BookingRequest = {
        serviceId: service.id,
        serviceName: service.name,
        serviceProvider: service.provider.name,
        customerId: user.id,
        customerName: bookingData.customerName,
        customerEmail: bookingData.customerEmail,
        customerPhone: bookingData.customerPhone,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        numberOfPeople: bookingData.numberOfPeople,
        totalAmount,
        specialRequests: bookingData.specialRequests,
        emergencyContact: bookingData.emergencyContact.name ? bookingData.emergencyContact : undefined,
      }

      const booking = await createBooking(bookingRequest)
      setStep(3)
      onBookingCreated?.(booking)
    } catch (error) {
      console.error("Error creating booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setBookingData({
      startDate: "",
      endDate: "",
      numberOfPeople: 1,
      customerName: user?.name || "",
      customerEmail: user?.email || "",
      customerPhone: user?.phone || "",
      specialRequests: "",
      emergencyContact: {
        name: "",
        phone: "",
        relationship: "",
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Đặt tour: {service.name}</DialogTitle>
          <DialogDescription>Điền thông tin để hoàn tất đặt tour</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            {/* Service Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin tour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>
                        {service.rating} ({service.reviewCount} đánh giá)
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>Tối đa {service.maxPeople} người</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-orange-500" />
                      <span className="font-medium text-orange-600">
                        {service.price.toLocaleString("vi-VN")}đ/người
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Bao gồm:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chi tiết đặt tour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Ngày bắt đầu</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, startDate: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Ngày kết thúc</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, endDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfPeople">Số người tham gia</Label>
                  <Select
                    value={bookingData.numberOfPeople.toString()}
                    onValueChange={(value) =>
                      setBookingData((prev) => ({ ...prev, numberOfPeople: Number.parseInt(value) }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: service.maxPeople }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} người
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Yêu cầu đặc biệt (tùy chọn)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Ví dụ: Ăn chay, dị ứng thực phẩm, yêu cầu phòng..."
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tổng chi phí</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Giá tour ({bookingData.numberOfPeople} người):</span>
                    <span>{totalAmount.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-orange-600">{totalAmount.toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => setStep(2)}
              className="w-full"
              disabled={!bookingData.startDate || !bookingData.endDate}
            >
              Tiếp theo
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Họ và tên</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="customerName"
                        className="pl-10"
                        value={bookingData.customerName}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, customerName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Số điện thoại</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="customerPhone"
                        className="pl-10"
                        value={bookingData.customerPhone}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, customerPhone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="customerEmail"
                      type="email"
                      className="pl-10"
                      value={bookingData.customerEmail}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, customerEmail: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Liên hệ khẩn cấp (tùy chọn)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Họ và tên</Label>
                    <Input
                      id="emergencyName"
                      value={bookingData.emergencyContact.name}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          emergencyContact: { ...prev.emergencyContact, name: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Số điện thoại</Label>
                    <Input
                      id="emergencyPhone"
                      value={bookingData.emergencyContact.phone}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          emergencyContact: { ...prev.emergencyContact, phone: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Mối quan hệ</Label>
                  <Input
                    id="emergencyRelationship"
                    placeholder="Ví dụ: Vợ/chồng, Con, Bạn bè..."
                    value={bookingData.emergencyContact.relationship}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, relationship: e.target.value },
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-800">Chính sách hủy tour</h4>
                  <p className="text-sm text-orange-700 mt-1">{service.cancellationPolicy}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 bg-transparent">
                Quay lại
              </Button>
              <Button
                onClick={handleSubmitBooking}
                className="flex-1"
                disabled={
                  !bookingData.customerName || !bookingData.customerEmail || !bookingData.customerPhone || isSubmitting
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Xác nhận đặt tour"
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Đặt tour thành công!</h2>
              <p className="text-gray-600">
                Yêu cầu đặt tour của bạn đã được gửi đến nhà cung cấp. Bạn sẽ nhận được xác nhận trong vòng 24 giờ.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span>Tour:</span>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ngày:</span>
                    <span>
                      {bookingData.startDate} - {bookingData.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số người:</span>
                    <span>{bookingData.numberOfPeople}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tổng tiền:</span>
                    <span className="font-medium text-orange-600">{totalAmount.toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  resetForm()
                }}
                className="flex-1 bg-transparent"
              >
                Đóng
              </Button>
              <Button
                onClick={() => {
                  onOpenChange(false)
                  resetForm()
                }}
                className="flex-1"
              >
                Xem booking của tôi
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
