// Notification Service for managing user notifications
export type NotificationType = "booking" | "payment" | "reminder" | "promotion" | "system"
export type NotificationStatus = "unread" | "read" | "archived"

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  status: NotificationStatus
  createdAt: Date
  readAt?: Date
  actionUrl?: string
  metadata?: {
    bookingId?: string
    paymentId?: string
    amount?: number
  }
}

export interface NotificationPreferences {
  userId: string
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  bookingUpdates: boolean
  paymentReminders: boolean
  promotionalOffers: boolean
  systemAlerts: boolean
}

// Create notification
export const createNotification = async (
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  actionUrl?: string,
  metadata?: any,
): Promise<Notification> => {
  const notification: Notification = {
    id: Date.now().toString(),
    userId,
    type,
    title,
    message,
    status: "unread",
    createdAt: new Date(),
    actionUrl,
    metadata,
  }

  // In real implementation, save to database and send push notification
  await new Promise((resolve) => setTimeout(resolve, 200))

  return notification
}

// Get user notifications
export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock notifications
  return [
    {
      id: "1",
      userId,
      type: "booking",
      title: "Booking được xác nhận",
      message: "Tour Hạ Long Bay 3N2Đ của bạn đã được xác nhận. Chúng tôi sẽ liên hệ với bạn sớm.",
      status: "unread",
      createdAt: new Date("2024-01-16"),
      actionUrl: "/bookings/1",
      metadata: { bookingId: "1" },
    },
    {
      id: "2",
      userId,
      type: "payment",
      title: "Thanh toán thành công",
      message: "Thanh toán 5.000.000đ cho booking VT123456 đã được xử lý thành công.",
      status: "unread",
      createdAt: new Date("2024-01-15"),
      actionUrl: "/payments/1",
      metadata: { paymentId: "1", amount: 5000000 },
    },
    {
      id: "3",
      userId,
      type: "reminder",
      title: "Nhắc nhở thanh toán",
      message: "Bạn có booking chưa thanh toán. Vui lòng hoàn tất thanh toán để đảm bảo chỗ.",
      status: "read",
      createdAt: new Date("2024-01-20"),
      readAt: new Date("2024-01-21"),
      actionUrl: "/bookings/2",
      metadata: { bookingId: "2" },
    },
    {
      id: "4",
      userId,
      type: "promotion",
      title: "Ưu đãi đặc biệt",
      message: "Giảm 20% cho tất cả tour Sapa trong tháng 2. Đặt ngay để không bỏ lỡ!",
      status: "read",
      createdAt: new Date("2024-01-18"),
      readAt: new Date("2024-01-19"),
      actionUrl: "/tours?destination=sapa",
    },
  ]
}

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return true
}

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return true
}

// Get notification preferences
export const getNotificationPreferences = async (userId: string): Promise<NotificationPreferences> => {
  await new Promise((resolve) => setTimeout(resolve, 200))

  return {
    userId,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    bookingUpdates: true,
    paymentReminders: true,
    promotionalOffers: false,
    systemAlerts: true,
  }
}

// Update notification preferences
export const updateNotificationPreferences = async (preferences: NotificationPreferences): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return true
}

// Send booking confirmation notification
export const sendBookingConfirmation = async (userId: string, bookingId: string, serviceName: string) => {
  await createNotification(
    userId,
    "booking",
    "Booking được xác nhận",
    `${serviceName} của bạn đã được xác nhận. Chúng tôi sẽ liên hệ với bạn sớm.`,
    `/bookings/${bookingId}`,
    { bookingId },
  )
}

// Send payment confirmation notification
export const sendPaymentConfirmation = async (
  userId: string,
  paymentId: string,
  amount: number,
  bookingNumber: string,
) => {
  await createNotification(
    userId,
    "payment",
    "Thanh toán thành công",
    `Thanh toán ${amount.toLocaleString("vi-VN")}đ cho booking ${bookingNumber} đã được xử lý thành công.`,
    `/payments/${paymentId}`,
    { paymentId, amount },
  )
}

// Send payment reminder
export const sendPaymentReminder = async (userId: string, bookingId: string, amount: number) => {
  await createNotification(
    userId,
    "reminder",
    "Nhắc nhở thanh toán",
    `Bạn có booking chưa thanh toán ${amount.toLocaleString("vi-VN")}đ. Vui lòng hoàn tất thanh toán để đảm bảo chỗ.`,
    `/bookings/${bookingId}`,
    { bookingId, amount },
  )
}
