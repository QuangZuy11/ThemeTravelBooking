// Application constants
export const APP_CONFIG = {
  name: "VietTravel",
  description: "Khám phá Việt Nam cùng chúng tôi",
  version: "1.0.0",
  author: "VietTravel Team",
  contact: {
    email: "info@viettravel.com",
    phone: "+84 123 456 789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  },
  social: {
    facebook: "https://facebook.com/viettravel",
    instagram: "https://instagram.com/viettravel",
    youtube: "https://youtube.com/viettravel",
    twitter: "https://twitter.com/viettravel",
  },
}

export const USER_ROLES = {
  TRAVELER: "traveler",
  PROVIDER: "provider",
  ADMIN: "admin",
} as const

export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const

export const TOUR_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
} as const

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const

export const DESTINATIONS = [
  { id: "ha-long", name: "Vịnh Hạ Long", province: "Quảng Ninh" },
  { id: "sapa", name: "Sapa", province: "Lào Cai" },
  { id: "hoi-an", name: "Hội An", province: "Quảng Nam" },
  { id: "phu-quoc", name: "Phú Quốc", province: "Kiên Giang" },
  { id: "da-lat", name: "Đà Lạt", province: "Lâm Đồng" },
  { id: "ninh-binh", name: "Ninh Bình", province: "Ninh Bình" },
  { id: "da-nang", name: "Đà Nẵng", province: "Đà Nẵng" },
  { id: "nha-trang", name: "Nha Trang", province: "Khánh Hòa" },
  { id: "mui-ne", name: "Mũi Né", province: "Bình Thuận" },
  { id: "can-tho", name: "Cần Thơ", province: "Cần Thơ" },
] as const

export const TOUR_CATEGORIES = [
  { id: "adventure", name: "Phiêu lưu", icon: "🏔️" },
  { id: "cultural", name: "Văn hóa", icon: "🏛️" },
  { id: "beach", name: "Biển đảo", icon: "🏖️" },
  { id: "city", name: "Thành phố", icon: "🏙️" },
  { id: "nature", name: "Thiên nhiên", icon: "🌿" },
  { id: "food", name: "Ẩm thực", icon: "🍜" },
  { id: "history", name: "Lịch sử", icon: "📜" },
  { id: "spiritual", name: "Tâm linh", icon: "🙏" },
] as const

export const PRICE_RANGES = [
  { id: "budget", name: "Tiết kiệm", min: 0, max: 1000000 },
  { id: "mid-range", name: "Trung bình", min: 1000000, max: 3000000 },
  { id: "luxury", name: "Cao cấp", min: 3000000, max: 10000000 },
  { id: "premium", name: "Siêu cao cấp", min: 10000000, max: Number.POSITIVE_INFINITY },
] as const

export const DURATION_OPTIONS = [
  { id: "1-day", name: "1 ngày", days: 1 },
  { id: "2-3-days", name: "2-3 ngày", days: 2 },
  { id: "4-7-days", name: "4-7 ngày", days: 4 },
  { id: "1-week+", name: "1 tuần+", days: 7 },
] as const

export const GROUP_SIZES = [
  { id: "small", name: "Nhóm nhỏ (2-6 người)", min: 2, max: 6 },
  { id: "medium", name: "Nhóm vừa (7-15 người)", min: 7, max: 15 },
  { id: "large", name: "Nhóm lớn (16+ người)", min: 16, max: 50 },
] as const
