"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Menu, X, MapPin, Phone, Mail, Bell } from "lucide-react"
import { UserMenu } from "@/components/auth/user-menu"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const { user } = useAuth()

  const unreadCount = 3

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>+84 123 456 789</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>info@viettravel.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Chào mừng đến với VietTravel!</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">VietTravel</h1>
              <p className="text-xs text-muted-foreground">Khám phá Việt Nam</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Trang chủ
            </a>
            <a href="#destinations" className="text-foreground hover:text-primary transition-colors font-medium">
              Điểm đến
            </a>
            <a href="#tours" className="text-foreground hover:text-primary transition-colors font-medium">
              Tour du lịch
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              Về chúng tôi
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Liên hệ
            </a>
          </nav>

          {/* Search, CTA and User Menu */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm tour..." className="pl-10 w-64" />
            </div>
            <Button className="bg-primary hover:bg-primary/90">Đặt tour ngay</Button>
            {user && (
              <Button variant="ghost" size="icon" className="relative" onClick={() => setIsNotificationOpen(true)}>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
            )}
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 mt-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                Trang chủ
              </a>
              <a href="#destinations" className="text-foreground hover:text-primary transition-colors font-medium">
                Điểm đến
              </a>
              <a href="#tours" className="text-foreground hover:text-primary transition-colors font-medium">
                Tour du lịch
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                Về chúng tôi
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Liên hệ
              </a>
            </nav>
            <div className="mt-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Tìm kiếm tour..." className="pl-10" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Đặt tour ngay</Button>
              <div className="flex justify-center gap-2">
                {user && (
                  <Button variant="ghost" size="icon" className="relative" onClick={() => setIsNotificationOpen(true)}>
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </Badge>
                    )}
                  </Button>
                )}
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </div>

      <NotificationCenter open={isNotificationOpen} onOpenChange={setIsNotificationOpen} />
    </header>
  )
}
