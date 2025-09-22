"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  Users,
  Building2,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Calendar,
  Star,
} from "lucide-react"

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
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

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  // Mock data for admin dashboard
  const systemStats = {
    totalUsers: 1247,
    totalProviders: 89,
    totalBookings: 3456,
    totalRevenue: 2450000000,
    pendingApprovals: 12,
    activeServices: 234,
  }

  const recentUsers = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      role: "traveler",
      status: "active",
      joinDate: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Công ty Du lịch ABC",
      email: "abc@travel.com",
      role: "service_provider",
      status: "pending",
      joinDate: "2024-01-14",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      role: "traveler",
      status: "active",
      joinDate: "2024-01-13",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const serviceProviders = [
    {
      id: "1",
      name: "Công ty Du lịch ABC",
      email: "abc@travel.com",
      services: 8,
      totalBookings: 156,
      revenue: 450000000,
      rating: 4.7,
      status: "active",
      joinDate: "2023-06-15",
    },
    {
      id: "2",
      name: "VietTravel Tours",
      email: "info@viettravel.com",
      services: 12,
      totalBookings: 234,
      revenue: 680000000,
      rating: 4.8,
      status: "active",
      joinDate: "2023-03-20",
    },
    {
      id: "3",
      name: "Sài Gòn Travel",
      email: "contact@saigontravel.com",
      services: 6,
      totalBookings: 89,
      revenue: 320000000,
      rating: 4.5,
      status: "pending",
      joinDate: "2024-01-10",
    },
  ]

  const pendingServices = [
    {
      id: "1",
      name: "Tour Đà Lạt 3N2Đ",
      provider: "Công ty Du lịch ABC",
      price: 2800000,
      status: "pending_approval",
      submittedDate: "2024-01-14",
    },
    {
      id: "2",
      name: "Khám phá Mekong Delta",
      provider: "VietTravel Tours",
      price: 1500000,
      status: "pending_approval",
      submittedDate: "2024-01-13",
    },
  ]

  const systemReports = [
    {
      title: "Báo cáo doanh thu tháng 1",
      type: "revenue",
      period: "Tháng 1/2024",
      value: "245 triệu VNĐ",
      change: "+12%",
      status: "completed",
    },
    {
      title: "Thống kê người dùng mới",
      type: "users",
      period: "Tuần qua",
      value: "89 người dùng",
      change: "+8%",
      status: "completed",
    },
    {
      title: "Hiệu suất hệ thống",
      type: "system",
      period: "24h qua",
      value: "99.8% uptime",
      change: "Ổn định",
      status: "monitoring",
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
              <AvatarFallback className="bg-red-100 text-red-600 text-xl">
                <Shield className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Quản lý hệ thống VietTravel</p>
            </div>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% từ tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nhà cung cấp</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalProviders}</div>
                <p className="text-xs text-muted-foreground">+3 tuần này</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng booking</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalBookings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8% từ tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(systemStats.totalRevenue / 1000000).toFixed(0)}M</div>
                <p className="text-xs text-muted-foreground">VNĐ tháng này</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{systemStats.pendingApprovals}</div>
                <p className="text-xs text-muted-foreground">Cần xử lý</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dịch vụ hoạt động</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.activeServices}</div>
                <p className="text-xs text-muted-foreground">Đang hoạt động</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
            <TabsTrigger value="providers">Nhà cung cấp</TabsTrigger>
            <TabsTrigger value="services">Dịch vụ</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Người dùng mới
                  </CardTitle>
                  <CardDescription>Người dùng đăng ký gần đây</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              user.role === "service_provider"
                                ? "secondary"
                                : user.role === "admin"
                                  ? "destructive"
                                  : "default"
                            }
                          >
                            {user.role === "traveler"
                              ? "Khách hàng"
                              : user.role === "service_provider"
                                ? "Nhà cung cấp"
                                : "Admin"}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(user.joinDate).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Chờ phê duyệt
                  </CardTitle>
                  <CardDescription>Dịch vụ cần được xem xét</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">{service.provider}</p>
                          <p className="text-sm text-orange-600 font-medium">
                            {service.price.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Quản lý Người dùng</CardTitle>
                    <CardDescription>Tất cả người dùng trong hệ thống</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Tìm kiếm người dùng..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Lọc theo vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="traveler">Khách hàng</SelectItem>
                        <SelectItem value="service_provider">Nhà cung cấp</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày tham gia</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "service_provider"
                                ? "secondary"
                                : user.role === "admin"
                                  ? "destructive"
                                  : "default"
                            }
                          >
                            {user.role === "traveler"
                              ? "Khách hàng"
                              : user.role === "service_provider"
                                ? "Nhà cung cấp"
                                : "Admin"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "Hoạt động" : "Chờ duyệt"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString("vi-VN")}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý Nhà cung cấp</CardTitle>
                <CardDescription>Tất cả nhà cung cấp dịch vụ du lịch</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nhà cung cấp</TableHead>
                      <TableHead>Dịch vụ</TableHead>
                      <TableHead>Booking</TableHead>
                      <TableHead>Doanh thu</TableHead>
                      <TableHead>Đánh giá</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceProviders.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{provider.name}</p>
                            <p className="text-sm text-gray-600">{provider.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{provider.services}</TableCell>
                        <TableCell>{provider.totalBookings}</TableCell>
                        <TableCell>{(provider.revenue / 1000000).toFixed(0)}M VNĐ</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{provider.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={provider.status === "active" ? "default" : "secondary"}>
                            {provider.status === "active" ? "Hoạt động" : "Chờ duyệt"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý Dịch vụ</CardTitle>
                <CardDescription>Tất cả dịch vụ du lịch trong hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-600">Nhà cung cấp: {service.provider}</p>
                        <p className="text-sm text-orange-600 font-medium">
                          Giá: {service.price.toLocaleString("vi-VN")}đ
                        </p>
                        <p className="text-xs text-gray-500">
                          Gửi ngày: {new Date(service.submittedDate).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Chờ phê duyệt</Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm">Phê duyệt</Button>
                          <Button size="sm" variant="destructive">
                            Từ chối
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemReports.map((report, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>{report.period}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{report.value}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                          {report.status === "completed" ? "Hoàn thành" : "Đang theo dõi"}
                        </Badge>
                        <span className="text-sm text-green-600">{report.change}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      Xem chi tiết
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Biểu đồ thống kê hệ thống</CardTitle>
                <CardDescription>Tổng quan hiệu suất hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Biểu đồ thống kê chi tiết sẽ được hiển thị ở đây
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
