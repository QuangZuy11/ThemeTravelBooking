"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getNotificationPreferences,
  updateNotificationPreferences,
  type Notification,
  type NotificationPreferences,
} from "@/lib/notification-service"
import { useAuth } from "@/contexts/auth-context"
import {
  Bell,
  Calendar,
  CreditCard,
  Clock,
  Gift,
  Settings,
  Check,
  CheckCheck,
  MoreVertical,
  Mail,
  MessageSquare,
  Smartphone,
} from "lucide-react"

interface NotificationCenterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationCenter({ open, onOpenChange }: NotificationCenterProps) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("notifications")

  useEffect(() => {
    const loadData = async () => {
      if (!user) return

      try {
        const [userNotifications, userPreferences] = await Promise.all([
          getUserNotifications(user.id),
          getNotificationPreferences(user.id),
        ])
        setNotifications(userNotifications)
        setPreferences(userPreferences)
      } catch (error) {
        console.error("Error loading notifications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (open) {
      loadData()
    }
  }, [user, open])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-4 w-4" />
      case "payment":
        return <CreditCard className="h-4 w-4" />
      case "reminder":
        return <Clock className="h-4 w-4" />
      case "promotion":
        return <Gift className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "booking":
        return "text-blue-500"
      case "payment":
        return "text-green-500"
      case "reminder":
        return "text-orange-500"
      case "promotion":
        return "text-purple-500"
      default:
        return "text-gray-500"
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId)
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, status: "read", readAt: new Date() } : notification,
        ),
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const handleMarkAllAsRead = async () => {
    if (!user) return

    try {
      await markAllNotificationsAsRead(user.id)
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          status: "read",
          readAt: notification.readAt || new Date(),
        })),
      )
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const handleUpdatePreferences = async (updatedPreferences: NotificationPreferences) => {
    try {
      await updateNotificationPreferences(updatedPreferences)
      setPreferences(updatedPreferences)
    } catch (error) {
      console.error("Error updating preferences:", error)
    }
  }

  const unreadCount = notifications.filter((n) => n.status === "unread").length

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Thông báo
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>Quản lý thông báo và cài đặt</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications">Thông báo</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4 max-h-[60vh] overflow-y-auto">
            {notifications.length > 0 && (
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{notifications.length} thông báo</p>
                {unreadCount > 0 && (
                  <Button size="sm" variant="outline" onClick={handleMarkAllAsRead} className="bg-transparent">
                    <CheckCheck className="h-4 w-4 mr-1" />
                    Đánh dấu tất cả đã đọc
                  </Button>
                )}
              </div>
            )}

            <div className="space-y-3">
              {notifications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Bell className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Không có thông báo</h3>
                    <p className="text-gray-600 text-center">Các thông báo mới sẽ hiển thị ở đây</p>
                  </CardContent>
                </Card>
              ) : (
                notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`cursor-pointer transition-colors ${
                      notification.status === "unread" ? "border-orange-200 bg-orange-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      if (notification.status === "unread") {
                        handleMarkAsRead(notification.id)
                      }
                      if (notification.actionUrl) {
                        // Navigate to action URL
                        window.location.href = notification.actionUrl
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <div className="flex items-center gap-2">
                              {notification.status === "unread" && (
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <MoreVertical className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {notification.status === "unread" && (
                                    <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                                      <Check className="h-4 w-4 mr-2" />
                                      Đánh dấu đã đọc
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>Xóa thông báo</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.type === "booking"
                                ? "Booking"
                                : notification.type === "payment"
                                  ? "Thanh toán"
                                  : notification.type === "reminder"
                                    ? "Nhắc nhở"
                                    : notification.type === "promotion"
                                      ? "Khuyến mãi"
                                      : "Hệ thống"}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {notification.createdAt.toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {preferences && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Kênh thông báo</CardTitle>
                    <CardDescription>Chọn cách bạn muốn nhận thông báo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="email-notifications">Email</Label>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          handleUpdatePreferences({ ...preferences, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="sms-notifications">SMS</Label>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={preferences.smsNotifications}
                        onCheckedChange={(checked) =>
                          handleUpdatePreferences({ ...preferences, smsNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="push-notifications">Push notification</Label>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) =>
                          handleUpdatePreferences({ ...preferences, pushNotifications: checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Loại thông báo</CardTitle>
                    <CardDescription>Chọn loại thông báo bạn muốn nhận</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <Label htmlFor="booking-updates">Cập nhật booking</Label>
                      </div>
                      <Switch
                        id="booking-updates"
                        checked={preferences.bookingUpdates}
                        onCheckedChange={(checked) =>
                          handleUpdatePreferences({ ...preferences, bookingUpdates: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-green-500" />
                        <Label htmlFor="payment-reminders">Nhắc nhở thanh toán</Label>
                      </div>
                      <Switch
                        id="payment-reminders"
                        checked={preferences.paymentReminders}
                        onCheckedChange={(checked) =>
                          handleUpdatePreferences({ ...preferences, paymentReminders: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Gift className="h-4 w-4 text-purple-500" />
                        <Label htmlFor="promotional-offers">Ưu đãi khuyến mãi</Label>
                      </div>
                      <Switch
                        id="promotional-offers"
                        checked={preferences.promotionalOffers}
                        onCheckedChange={(checked) =>
                          handleUpdatePreferences({ ...preferences, promotionalOffers: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Settings className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="system-alerts">Thông báo hệ thống</Label>
                      </div>
                      <Switch
                        id="system-alerts"
                        checked={preferences.systemAlerts}
                        onCheckedChange={(checked) =>
                          handleUpdatePreferences({ ...preferences, systemAlerts: checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
