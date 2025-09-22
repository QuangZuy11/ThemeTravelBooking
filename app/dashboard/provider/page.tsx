"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Eye,
  Star,
  MapPin,
  Clock,
  Phone,
  Camera,
} from "lucide-react"

export default function ServiceProviderDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "service_provider")) {
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

  if (!isAuthenticated || user?.role !== "service_provider") {
    return null
  }

  // Mock data for provider dashboard
  const stats = {
    totalServices: 8,
    activeBookings: 15,
    totalRevenue: 125000000,
    averageRating: 4.7,
  }

  const recentBookings = [
    {
      id: "1",
      customerName: "Nguyễn Văn A",
      serviceName: "Tour Hạ Long Bay 3N2Đ",
      date: "2024-01-15",
      status: "confirmed",
      amount: 2500000,
      customerPhone: "0123456789",
    },
    {
      id: "2",
      customerName: "Trần Thị B",
      serviceName: "Khám phá Sapa 4N3Đ",
      date: "2024-02-20",
      status: "pending",
      amount: 3200000,
      customerPhone: "0987654321",
    },
    {
      id: "3",
      customerName: "Lê Văn C",
      serviceName: "Tour Phú Quốc 5N4Đ",
      date: "2024-01-10",
      status: "completed",
      amount: 4500000,
      customerPhone: "0456789123",
    },
  ]

  const services = [
    {
      id: "1",
      name: "Tour Hạ Long Bay 3N2Đ",
      price: 2500000,
      duration: "3 ngày 2 đêm",
      location: "Hạ Long, Quảng Ninh",
      status: "active",
      bookings: 12,
      rating: 4.8,
      image: "/ha-long-bay-vietnam-beautiful-landscape-with-limes.jpg",
    },
    {
      id: "2",
      name: "Khám phá Sapa 4N3Đ",
      price: 3200000,
      duration: "4 ngày 3 đêm",
      location: "Sapa, Lào Cai",
      status: "active",
      bookings: 8,
      rating: 4.6,
      image: "/sapa-vietnam-rice-terraces-mountains-landscape.jpg",
    },
    {
      id: "3",
      name: "Tour Phú Quốc 5N4Đ",
      price: 4500000,
      duration: "5 ngày 4 đêm",
      location: "Phú Quốc, Kiên Giang",
      status: "draft",
      bookings: 0,
      rating: 0,
      image: "/phu-quoc-vietnam-tropical-beach-paradise.jpg",
    },
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
              <h1 className="text-3xl font-bold text-gray-900">Chào mừng, {user.name}!</h1>
              <p className="text-gray-600">Quản lý dịch vụ du lịch của bạn</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng dịch vụ</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalServices}</div>
                <p className="text-xs text-muted-foreground">+1 từ tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Booking đang hoạt động</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeBookings}</div>
                <p className="text-xs text-muted-foreground">+3 từ tuần trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doanh thu tháng</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString("vi-VN")}đ</div>
                <p className="text-xs text-muted-foreground">+12% từ tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đánh giá trung bình</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageRating}</div>
                <p className="text-xs text-muted-foreground">Từ 45 đánh giá</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="bookings">Booking</TabsTrigger>
            <TabsTrigger value="services">Dịch vụ</TabsTrigger>
            <TabsTrigger value="analytics">Thống kê</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Booking gần đây
                  </CardTitle>
                  <CardDescription>Các booking mới nhất từ khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{booking.customerName}</h3>
                          <p className="text-sm text-gray-600">{booking.serviceName}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {new Date(booking.date).toLocaleDateString("vi-VN")}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-orange-600">{booking.amount.toLocaleString("vi-VN")}đ</p>
                          <Badge
                            variant={
                              booking.status === "confirmed"
                                ? "default"
                                : booking.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {booking.status === "confirmed"
                              ? "Đã xác nhận"
                              : booking.status === "pending"
                                ? "Chờ xác nhận"
                                : "Hoàn thành"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    Xem tất cả booking
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Hành động nhanh</CardTitle>
                  <CardDescription>Các tác vụ thường dùng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => setActiveTab("services")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tạo dịch vụ mới
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("bookings")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Quản lý booking
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Xem báo cáo
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Camera className="mr-2 h-4 w-4" />
                    Cập nhật hình ảnh
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Quản lý Booking
                </CardTitle>
                <CardDescription>Tất cả booking từ khách hàng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold">{booking.customerName}</h3>
                            <p className="text-sm text-gray-600">{booking.serviceName}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {new Date(booking.date).toLocaleDateString("vi-VN")}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {booking.customerPhone}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-orange-600">{booking.amount.toLocaleString("vi-VN")}đ</p>
                          <Badge
                            variant={
                              booking.status === "confirmed"
                                ? "default"
                                : booking.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {booking.status === "confirmed"
                              ? "Đã xác nhận"
                              : booking.status === "pending"
                                ? "Chờ xác nhận"
                                : "Hoàn thành"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {booking.status === "pending" && <Button size="sm">Xác nhận</Button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Quản lý Dịch vụ</h2>
                <p className="text-gray-600">Tạo và quản lý các tour du lịch của bạn</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tạo dịch vụ mới
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id}>
                  <div className="relative">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={service.status === "active" ? "default" : "secondary"}
                    >
                      {service.status === "active" ? "Đang hoạt động" : "Nháp"}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-4 w-4" />
                        {service.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Giá:</span>
                        <span className="font-medium text-orange-600">{service.price.toLocaleString("vi-VN")}đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Thời gian:</span>
                        <span className="text-sm">{service.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Booking:</span>
                        <span className="text-sm">{service.bookings}</span>
                      </div>
                      {service.rating > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Đánh giá:</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{service.rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        Sửa
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Doanh thu theo tháng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Biểu đồ doanh thu sẽ được hiển thị ở đây
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top dịch vụ phổ biến</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services
                      .filter((s) => s.status === "active")
                      .map((service, index) => (
                        <div key={service.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-sm text-gray-600">{service.bookings} booking</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{service.price.toLocaleString("vi-VN")}đ</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm">{service.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
