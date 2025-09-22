"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/lib/auth"
import { Loader2, Mail, Lock, User, Phone } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "traveler" as UserRole,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await signIn(loginData.email, loginData.password)
      if (success) {
        onOpenChange(false)
        setLoginData({ email: "", password: "" })
      } else {
        setError("Email hoặc mật khẩu không đúng")
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Mock registration - replace with real implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setError("")
      // Switch to login tab after successful registration
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "traveler",
      })
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chào mừng đến với VietTravel</DialogTitle>
          <DialogDescription>Đăng nhập hoặc tạo tài khoản để bắt đầu hành trình của bạn</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Đăng nhập
              </Button>

              <div className="text-sm text-muted-foreground">
                <p>Tài khoản demo:</p>
                <p>• Khách hàng: traveler@example.com</p>
                <p>• Nhà cung cấp: provider@example.com</p>
                <p>• Admin: admin@example.com</p>
                <p>Mật khẩu: bất kỳ</p>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Họ và tên</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="pl-10"
                    value={registerData.name}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={registerData.email}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone">Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="0123456789"
                    className="pl-10"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-role">Loại tài khoản</Label>
                <Select
                  value={registerData.role}
                  onValueChange={(value: UserRole) => setRegisterData((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại tài khoản" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traveler">Khách hàng</SelectItem>
                    <SelectItem value="service_provider">Nhà cung cấp dịch vụ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={registerData.password}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Xác nhận mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Đăng ký
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
