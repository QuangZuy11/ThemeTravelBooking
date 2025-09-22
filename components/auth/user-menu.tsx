"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { LoginDialog } from "./login-dialog"
import { User, Settings, LogOut, Calendar, Heart, CreditCard, Building2, BarChart3, Users, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserMenu() {
  const { user, isAuthenticated, signOut } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const getDashboardPath = () => {
    switch (user?.role) {
      case "traveler":
        return "/dashboard/traveler"
      case "service_provider":
        return "/dashboard/provider"
      case "admin":
        return "/dashboard/admin"
      default:
        return "/"
    }
  }

  const getRoleLabel = () => {
    switch (user?.role) {
      case "traveler":
        return "Khách hàng"
      case "service_provider":
        return "Nhà cung cấp"
      case "admin":
        return "Quản trị viên"
      default:
        return ""
    }
  }

  const getRoleMenuItems = () => {
    switch (user?.role) {
      case "traveler":
        return (
          <>
            <DropdownMenuItem onClick={() => router.push("/dashboard/traveler")}>
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/bookings")}>
              <Calendar className="mr-2 h-4 w-4" />
              Booking của tôi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/favorites")}>
              <Heart className="mr-2 h-4 w-4" />
              Yêu thích
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/payments")}>
              <CreditCard className="mr-2 h-4 w-4" />
              Thanh toán
            </DropdownMenuItem>
          </>
        )
      case "service_provider":
        return (
          <>
            <DropdownMenuItem onClick={() => router.push("/dashboard/provider")}>
              <Building2 className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/provider/services")}>
              <Calendar className="mr-2 h-4 w-4" />
              Quản lý dịch vụ
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/provider/bookings")}>
              <Users className="mr-2 h-4 w-4" />
              Booking đến
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/provider/analytics")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Thống kê
            </DropdownMenuItem>
          </>
        )
      case "admin":
        return (
          <>
            <DropdownMenuItem onClick={() => router.push("/dashboard/admin")}>
              <Shield className="mr-2 h-4 w-4" />
              Admin Panel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/admin/users")}>
              <Users className="mr-2 h-4 w-4" />
              Quản lý người dùng
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/admin/services")}>
              <Building2 className="mr-2 h-4 w-4" />
              Quản lý dịch vụ
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/admin/reports")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Báo cáo hệ thống
            </DropdownMenuItem>
          </>
        )
      default:
        return null
    }
  }

  if (!isAuthenticated) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => setShowLoginDialog(true)}
          className="text-orange-600 border-orange-600 hover:bg-orange-50"
        >
          Đăng nhập
        </Button>
        <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback className="bg-orange-100 text-orange-600">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            <p className="text-xs leading-none text-orange-600 font-medium">{getRoleLabel()}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {getRoleMenuItems()}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <Settings className="mr-2 h-4 w-4" />
          Cài đặt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
