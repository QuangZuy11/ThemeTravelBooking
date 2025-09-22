// Utility helper functions
export function formatCurrency(amount: number, currency = "VNĐ"): string {
  return `${amount.toLocaleString("vi-VN")} ${currency}`
}

export function formatDate(date: string | Date, format: "short" | "long" = "short"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  if (format === "long") {
    return dateObj.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return dateObj.toLocaleDateString("vi-VN")
}

export function formatDuration(days: number): string {
  if (days === 1) return "1 ngày"
  if (days === 2) return "2 ngày 1 đêm"
  return `${days} ngày ${days - 1} đêm`
}

export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[đĐ]/g, "d") // Replace đ with d
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+84|0)[3-9]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function getImageUrl(imagePath: string, size?: "small" | "medium" | "large"): string {
  if (imagePath.startsWith("http")) return imagePath

  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "/images"
  const sizePrefix = size ? `${size}_` : ""

  return `${baseUrl}/${sizePrefix}${imagePath}`
}

export function calculateAge(birthDate: string | Date): number {
  const today = new Date()
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const past = typeof date === "string" ? new Date(date) : date
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return "vừa xong"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} tháng trước`

  return `${Math.floor(diffInSeconds / 31536000)} năm trước`
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }

  // Fallback for older browsers
  const textArea = document.createElement("textarea")
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand("copy")
  document.body.removeChild(textArea)

  return Promise.resolve()
}
