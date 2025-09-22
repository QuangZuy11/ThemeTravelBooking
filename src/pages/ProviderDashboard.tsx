"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Settings, LogOut, Eye, Edit, Trash2, Users, Calendar, DollarSign } from "lucide-react"

export default function ProviderDashboard() {
  const { user, signOut } = useAuth()
  const [tours] = useState([
    {
      id: "1",
      title: "Tour Hạ Long Bay 3N2Đ",
      price: "2,500,000 VNĐ",
      status: "active",
      bookings: 15,
      rating: 4.8,
      image: "/ha-long-bay-vietnam-beautiful-landscape-with-limes.jpg",
    },
    {
      id: "2",
      title: "Tour Sapa Trekking 2N1Đ",
      price: "1,800,000 VNĐ",
      status: "draft",
      bookings: 8,
      rating: 4.6,
      image: "/sapa-vietnam-rice-terraces-mountain-landscape.jpg",
    },
  ])

  const [stats] = useState({
    totalTours: 12,
    totalBookings: 156,
    totalRevenue: "450,000,000 VNĐ",
    averageRating: 4.7,
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Nhà cung cấp</h1>
            <p className="text-muted-foreground">Chào mừng trở lại, {user?.name}!</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo tour mới
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng số tour</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTours}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng đặt chỗ</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đánh giá TB</CardTitle>
              <div className="text-yellow-500">★</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tours" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tours">Quản lý Tour</TabsTrigger>
            <TabsTrigger value="bookings">Đặt chỗ</TabsTrigger>
            <TabsTrigger value="analytics">Thống kê</TabsTrigger>
            <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          </TabsList>

          <TabsContent value="tours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách Tour</CardTitle>
                <CardDescription>Quản lý các tour du lịch của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tours.map((tour) => (
                    <div key={tour.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{tour.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Giá: {tour.price}</span>
                          <span>Đặt chỗ: {tour.bookings}</span>
                          <span>Đánh giá: ★ {tour.rating}</span>
                        </div>
                        <div className="mt-2">
                          <Badge variant={tour.status === "active" ? "default" : "secondary"}>
                            {tour.status === "active" ? "Đang hoạt động" : "Bản nháp"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Đặt chỗ gần đây</CardTitle>
                <CardDescription>Quản lý các đặt chỗ từ khách hàng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chưa có đặt chỗ mới</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê doanh thu</CardTitle>
                <CardDescription>Phân tích hiệu suất kinh doanh</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Biểu đồ thống kê sẽ được hiển thị tại đây</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin công ty</CardTitle>
                <CardDescription>Quản lý thông tin nhà cung cấp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Tên công ty</label>
                    <p className="text-foreground">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Vai trò</label>
                    <Badge variant="outline">Nhà cung cấp</Badge>
                  </div>
                  <Button className="mt-4">Chỉnh sửa thông tin</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
