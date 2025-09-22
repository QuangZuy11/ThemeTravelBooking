"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Star, Heart, Settings, LogOut } from "lucide-react"

export default function TravelerDashboard() {
  const { user, signOut } = useAuth()
  const [activeBookings] = useState([
    {
      id: "1",
      title: "Tour Hạ Long Bay 3N2Đ",
      destination: "Quảng Ninh",
      date: "2024-03-15",
      status: "confirmed",
      price: "2,500,000 VNĐ",
      image: "/ha-long-bay-vietnam-beautiful-landscape-with-limes.jpg",
    },
    {
      id: "2",
      title: "Tour Sapa Trekking 2N1Đ",
      destination: "Lào Cai",
      date: "2024-04-20",
      status: "pending",
      price: "1,800,000 VNĐ",
      image: "/sapa-vietnam-rice-terraces-mountain-landscape.jpg",
    },
  ])

  const [favoriteDestinations] = useState([
    { id: "1", name: "Phú Quốc", image: "/phu-quoc-beach.jpg", rating: 4.8 },
    { id: "2", name: "Đà Nẵng", image: "/da-nang-beach.jpg", rating: 4.7 },
    { id: "3", name: "Hội An", image: "/hoi-an-ancient-town.jpg", rating: 4.9 },
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Du khách</h1>
            <p className="text-muted-foreground">Chào mừng trở lại, {user?.name}!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Đặt chỗ của tôi</TabsTrigger>
            <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
            <TabsTrigger value="history">Lịch sử</TabsTrigger>
            <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chuyến đi sắp tới</CardTitle>
                  <CardDescription>Quản lý các tour đã đặt</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{booking.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {booking.destination}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {booking.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                            </Badge>
                            <span className="font-semibold text-primary">{booking.price}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Chi tiết
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Điểm đến yêu thích</CardTitle>
                <CardDescription>Những nơi bạn muốn khám phá</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {favoriteDestinations.map((destination) => (
                    <div key={destination.id} className="relative group cursor-pointer">
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold">{destination.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{destination.rating}</span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-4 right-4 text-white hover:bg-white/20"
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử chuyến đi</CardTitle>
                <CardDescription>Những chuyến đi đã hoàn thành</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chưa có chuyến đi nào được hoàn thành</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Quản lý thông tin tài khoản của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Họ và tên</label>
                    <p className="text-foreground">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Vai trò</label>
                    <Badge variant="outline">Du khách</Badge>
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
