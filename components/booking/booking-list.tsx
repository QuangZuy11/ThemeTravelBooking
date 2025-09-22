"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
  cancelBooking,
  type Booking,
} from "@/lib/booking-service"
import { useAuth } from "@/contexts/auth-context"
import { Calendar, Users, DollarSign, Phone, Mail, Clock, Eye, CheckCircle, XCircle, CreditCard } from "lucide-react"

interface BookingListProps {
  userRole?: "customer" | "provider"
}

export function BookingList({ userRole = "customer" }: BookingListProps) {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const loadBookings = async () => {
      if (!user) return

      try {
        const userBookings =
          userRole === "customer" ? await getCustomerBookings(user.id) : await getProviderBookings(user.id)
        setBookings(userBookings)
      } catch (error) {
        console.error("Error loading bookings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [user, userRole])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận"
      case "pending":
        return "Chờ xác nhận"
      case "cancelled":
        return "Đã hủy"
      case "completed":
        return "Hoàn thành"
      default:
        return status
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "refunded":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán"
      case "pending":
        return "Chờ thanh toán"
      case "refunded":
        return "Đã hoàn tiền"
      default:
        return status
    }
  }

  const handleUpdateStatus = async (bookingId: string, newStatus: any) => {
    try {
      await updateBookingStatus(bookingId, newStatus)
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus, updatedAt: new Date() } : booking,
        ),
      )
    } catch (error) {
      console.error("Error updating booking status:", error)
    }
  }

  const handleCancelBooking = async (bookingId: string, reason: string) => {
    try {
      await cancelBooking(bookingId, reason)
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled", cancellationReason: reason, updatedAt: new Date() }
            : booking,
        ),
      )
    } catch (error) {
      console.error("Error cancelling booking:", error)
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Calendar className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {userRole === "customer" ? "Chưa có booking nào" : "Chưa có booking từ khách hàng"}
          </h3>
          <p className="text-gray-600 text-center">
            {userRole === "customer"
              ? "Hãy đặt tour đầu tiên để bắt đầu hành trình khám phá!"
              : "Khi có khách hàng đặt dịch vụ, thông tin sẽ hiển thị ở đây."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
            <TabsTrigger value="confirmed">Đã xác nhận</TabsTrigger>
            <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
            <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{booking.serviceName}</CardTitle>
                      <CardDescription>
                        Mã booking: {booking.bookingNumber} •
                        {userRole === "customer" ? ` ${booking.serviceProvider}` : ` ${booking.customerName}`}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(booking.status)}>{getStatusText(booking.status)}</Badge>
                      <Badge variant={getPaymentStatusColor(booking.paymentStatus)}>
                        {getPaymentStatusText(booking.paymentStatus)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        {booking.startDate} - {booking.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{booking.numberOfPeople} người</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-orange-500" />
                      <span className="font-medium text-orange-600">
                        {booking.totalAmount.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{booking.createdAt.toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>

                  {userRole === "provider" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{booking.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{booking.customerEmail}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBooking(booking)}
                      className="bg-transparent"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Chi tiết
                    </Button>

                    {userRole === "provider" && booking.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => handleUpdateStatus(booking.id, "confirmed")}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Xác nhận
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancelBooking(booking.id, "Không thể phục vụ")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Từ chối
                        </Button>
                      </>
                    )}

                    {userRole === "customer" && booking.status === "pending" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleCancelBooking(booking.id, "Khách hàng hủy")}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Hủy booking
                      </Button>
                    )}

                    {booking.paymentStatus === "pending" && booking.status === "confirmed" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Thanh toán
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết booking</DialogTitle>
            <DialogDescription>Mã booking: {selectedBooking?.bookingNumber}</DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              {/* Service Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedBooking.serviceName}</CardTitle>
                  <CardDescription>{selectedBooking.serviceProvider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Ngày bắt đầu:</span>
                      <p className="font-medium">{selectedBooking.startDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Ngày kết thúc:</span>
                      <p className="font-medium">{selectedBooking.endDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Số người:</span>
                      <p className="font-medium">{selectedBooking.numberOfPeople}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Tổng tiền:</span>
                      <p className="font-medium text-orange-600">
                        {selectedBooking.totalAmount.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Thông tin {userRole === "customer" ? "liên hệ" : "khách hàng"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 w-20">Tên:</span>
                      <span className="font-medium">{selectedBooking.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 w-20">Email:</span>
                      <span>{selectedBooking.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 w-20">Điện thoại:</span>
                      <span>{selectedBooking.customerPhone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedBooking.specialRequests && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Yêu cầu đặc biệt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedBooking.specialRequests}</p>
                  </CardContent>
                </Card>
              )}

              {/* Status */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant={getStatusColor(selectedBooking.status)}>
                    {getStatusText(selectedBooking.status)}
                  </Badge>
                  <Badge variant={getPaymentStatusColor(selectedBooking.paymentStatus)}>
                    {getPaymentStatusText(selectedBooking.paymentStatus)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Cập nhật: {selectedBooking.updatedAt.toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
