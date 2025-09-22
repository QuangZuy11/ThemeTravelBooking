"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, LogOut, Users, Building, MapPin, DollarSign, TrendingUp, Eye, Edit, Trash2 } from "lucide-react"

export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const [stats] = useState({
    totalUsers: 1250,
    totalProviders: 45,
    totalTours: 320,
    totalRevenue: "15,500,000,000 VNĐ",
    monthlyGrowth: "+12.5%",
  })

  const [recentUsers] = useState([
    { id: "1", name: "Nguyễn Văn A", email: "user1@example.com", role: "traveler", status: "active" },
    { id: "2", name: "Công ty Du lịch XYZ", email: "provider1@example.com", role: "provider", status: "pending" },
    { id: "3", name: "Trần Thị B", email: "user2@example.com", role: "traveler", status: "active" },
  ])

  const [recentTours] = useState([
    { id: "1", title: "Tour Hạ Long Bay", provider: "ABC Travel", status: "approved", price: "2,500,000 VNĐ" },
    { id: "2", title: "Tour Sapa Trekking", provider: "XYZ Tours", status: "pending", price: "1,800,000 VNĐ" },
    { id: "3", title: "Tour Phú Quốc", provider: "Beach Resort", status: "approved", price: "3,200,000 VNĐ" },
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Quản trị</h1>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nhà cung cấp</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProviders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng tour</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTours}</div>
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
              <CardTitle className="text-sm font-medium">Tăng trưởng</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.monthlyGrowth}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">Người dùng</TabsTrigger>
            <TabsTrigger value="providers">Nhà cung cấp</TabsTrigger>
            <TabsTrigger value="tours">Tour</TabsTrigger>
            <TabsTrigger value="analytics">Thống kê</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý người dùng</CardTitle>
                <CardDescription>Danh sách người dùng gần đây</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.role === "provider" ? "secondary" : "default"}>
                          {user.role === "provider" ? "Nhà cung cấp" : "Du khách"}
                        </Badge>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status === "active" ? "Hoạt động" : "Chờ duyệt"}
                        </Badge>
                        <div className="flex gap-1">
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý Tour</CardTitle>
                <CardDescription>Duyệt và quản lý các tour du lịch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTours.map((tour) => (
                    <div key={tour.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{tour.title}</h3>
                          <p className="text-sm text-muted-foreground">Bởi {tour.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">{tour.price}</span>
                        <Badge variant={tour.status === "approved" ? "default" : "secondary"}>
                          {tour.status === "approved" ? "Đã duyệt" : "Chờ duyệt"}
                        </Badge>
                        <div className="flex gap-1">
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê hệ thống</CardTitle>
                <CardDescription>Phân tích hiệu suất tổng thể</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Biểu đồ thống kê chi tiết sẽ được hiển thị tại đây</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt hệ thống</CardTitle>
                <CardDescription>Quản lý cấu hình hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Tên hệ thống</label>
                    <p className="text-foreground">VietTravel Admin</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email quản trị</label>
                    <p className="text-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Vai trò</label>
                    <Badge variant="outline">Quản trị viên</Badge>
                  </div>
                  <Button className="mt-4">Cập nhật cài đặt</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
