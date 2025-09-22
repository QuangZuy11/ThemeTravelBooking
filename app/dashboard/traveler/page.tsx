"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Heart, CreditCard, MapPin, Clock, Star, TrendingUp, Plane, Camera, Gift } from "lucide-react"

export default function TravelerDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "traveler")) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "traveler") {
    return null
  }

  // Mock data for dashboard
  const stats = {
    totalBookings: 12,
    upcomingTrips: 2,
    favoriteDestinations: 8,
    totalSpent: 45000000,
  }

  const upcomingBookings = [
    {
      id: "1",
      title: "Tour Hạ Long Bay 3N2Đ",
      date: "2024-01-15",
      status: "confirmed",
      price: 2500000,
      image: "/ha-long-bay-vietnam-beautiful-landscape-with-limes.jpg",
    },
    {
      id: "2",
      title: "Khám phá Sapa 4N3Đ",
      date: "2024-02-20",
      status: "pending",
      price: 3200000,
      image: "/sapa-vietnam-rice-terraces-mountains-landscape.jpg",
    },
  ]

  const recentBookings = [
    {
      id: "3",
      title: "Tour Phú Quốc 5N4Đ",
      date: "2023-12-10",
      status: "completed",
      rating: 5,
      price: 4500000,
    },
    {
      id: "4",
      title: "Hội An - Đà Nẵng 3N2Đ",
      date: "2023-11-15",
      status: "completed",
      rating: 4,
      price: 2800000,
    },
  ]

  const favoriteDestinations = [
    { name: "Hạ Long Bay", image: "/ha-long-bay-vietnam-beautiful-landscape-with-limes.jpg" },
    { name: "Sapa", image: "/sapa-vietnam-rice-terraces-mountains-landscape.jpg" },
    { name: "Phú Quốc", image: "/phu-quoc-vietnam-tropical-beach-paradise.jpg" },
    { name: "Hội An", image: "/hoi-an-vietnam-ancient-town-lanterns.jpg" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chào mừng trở lại, {user.name}!</h1>
              <p className="text-gray-600">Sẵn sàng cho chuyến phiêu lưu tiếp theo?</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng số booking</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalBookings}</div>
                <p className="text-xs text-muted-foreground">+2 từ tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chuyến đi sắp tới</CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.upcomingTrips}</div>
                <p className="text-xs text-muted-foreground">Trong 3 tháng tới</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Điểm đến yêu thích</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.favoriteDestinations}</div>
                <p className="text-xs text-muted-foreground">Đã lưu</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng chi tiêu</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSpent.toLocaleString("vi-VN")}đ</div>
                <p className="text-xs text-muted-foreground">Năm 2023-2024</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Chuyến đi sắp tới
                </CardTitle>
                <CardDescription>Các tour bạn đã đặt và sắp diễn ra</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{booking.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {new Date(booking.date).toLocaleDateString("vi-VN")}
                        </div>
                        <p className="text-sm font-medium text-orange-600">{booking.price.toLocaleString("vi-VN")}đ</p>
                      </div>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                        {booking.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Xem tất cả booking
                </Button>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Chuyến đi gần đây
                </CardTitle>
                <CardDescription>Lịch sử các tour bạn đã tham gia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{booking.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {new Date(booking.date).toLocaleDateString("vi-VN")}
                        </div>
                        <p className="text-sm font-medium text-orange-600">{booking.price.toLocaleString("vi-VN")}đ</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < booking.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <Badge variant="outline">Hoàn thành</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  Tìm tour mới
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Chia sẻ trải nghiệm
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Gift className="mr-2 h-4 w-4" />
                  Chương trình khuyến mãi
                </Button>
              </CardContent>
            </Card>

            {/* Favorite Destinations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Điểm đến yêu thích
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {favoriteDestinations.map((destination, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-20 rounded-lg object-cover group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                        <p className="text-white text-sm font-medium text-center">{destination.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Xem tất cả
                </Button>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Gợi ý từ AI</CardTitle>
                <CardDescription>Dựa trên sở thích của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm font-medium text-orange-800">Tour Đà Lạt 3N2Đ</p>
                    <p className="text-xs text-orange-600">Phù hợp với sở thích núi non của bạn</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Cần Thơ - Miền Tây 2N1Đ</p>
                    <p className="text-xs text-blue-600">Trải nghiệm văn hóa mới</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Xem thêm gợi ý
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
