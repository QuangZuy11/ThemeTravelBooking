// Booking Management System
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "refunded"

export interface BookingRequest {
  serviceId: string
  serviceName: string
  serviceProvider: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  startDate: string
  endDate: string
  numberOfPeople: number
  totalAmount: number
  specialRequests?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface Booking extends BookingRequest {
  id: string
  bookingNumber: string
  status: BookingStatus
  createdAt: Date
  updatedAt: Date
  paymentStatus: "pending" | "paid" | "refunded"
  paymentMethod?: string
  cancellationReason?: string
  providerNotes?: string
  customerNotes?: string
}

export interface Service {
  id: string
  name: string
  description: string
  provider: {
    id: string
    name: string
    email: string
    phone: string
  }
  price: number
  duration: string
  location: string
  maxPeople: number
  images: string[]
  amenities: string[]
  cancellationPolicy: string
  rating: number
  reviewCount: number
  availability: {
    startDate: string
    endDate: string
    availableSlots: number
  }[]
}

// Mock services data
const mockServices: Service[] = [
  {
    id: "1",
    name: "Tour Hạ Long Bay 3N2Đ",
    description: "Khám phá vịnh Hạ Long với du thuyền sang trọng, thăm hang động và tận hưởng cảnh đẹp thiên nhiên.",
    provider: {
      id: "provider1",
      name: "Công ty Du lịch ABC",
      email: "abc@travel.com",
      phone: "0123456789",
    },
    price: 2500000,
    duration: "3 ngày 2 đêm",
    location: "Hạ Long, Quảng Ninh",
    maxPeople: 20,
    images: ["/ha-long-bay-vietnam-beautiful-landscape-with-limes.jpg"],
    amenities: ["Du thuyền", "Bữa ăn", "Hướng dẫn viên", "Vé tham quan"],
    cancellationPolicy: "Hủy miễn phí trước 7 ngày",
    rating: 4.8,
    reviewCount: 156,
    availability: [
      { startDate: "2024-02-01", endDate: "2024-02-03", availableSlots: 5 },
      { startDate: "2024-02-15", endDate: "2024-02-17", availableSlots: 8 },
    ],
  },
  {
    id: "2",
    name: "Khám phá Sapa 4N3Đ",
    description: "Trekking ruộng bậc thang, thăm bản làng dân tộc và chinh phục đỉnh Fansipan.",
    provider: {
      id: "provider2",
      name: "VietTravel Tours",
      email: "info@viettravel.com",
      phone: "0987654321",
    },
    price: 3200000,
    duration: "4 ngày 3 đêm",
    location: "Sapa, Lào Cai",
    maxPeople: 15,
    images: ["/sapa-vietnam-rice-terraces-mountains-landscape.jpg"],
    amenities: ["Khách sạn", "Bữa ăn", "Xe đưa đón", "Hướng dẫn viên"],
    cancellationPolicy: "Hủy miễn phí trước 5 ngày",
    rating: 4.6,
    reviewCount: 89,
    availability: [
      { startDate: "2024-02-10", endDate: "2024-02-13", availableSlots: 3 },
      { startDate: "2024-02-20", endDate: "2024-02-23", availableSlots: 6 },
    ],
  },
]

// Get all available services
export const getServices = async (): Promise<Service[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockServices
}

// Get service by ID
export const getServiceById = async (id: string): Promise<Service | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockServices.find((service) => service.id === id) || null
}

// Create booking
export const createBooking = async (bookingRequest: BookingRequest): Promise<Booking> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const booking: Booking = {
    ...bookingRequest,
    id: Date.now().toString(),
    bookingNumber: `VT${Date.now().toString().slice(-6)}`,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
    paymentStatus: "pending",
  }

  return booking
}

// Get bookings for customer
export const getCustomerBookings = async (customerId: string): Promise<Booking[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock customer bookings
  return [
    {
      id: "1",
      bookingNumber: "VT123456",
      serviceId: "1",
      serviceName: "Tour Hạ Long Bay 3N2Đ",
      serviceProvider: "Công ty Du lịch ABC",
      customerId,
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@email.com",
      customerPhone: "0123456789",
      startDate: "2024-02-01",
      endDate: "2024-02-03",
      numberOfPeople: 2,
      totalAmount: 5000000,
      status: "confirmed",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-16"),
      paymentStatus: "paid",
      paymentMethod: "credit_card",
    },
    {
      id: "2",
      bookingNumber: "VT789012",
      serviceId: "2",
      serviceName: "Khám phá Sapa 4N3Đ",
      serviceProvider: "VietTravel Tours",
      customerId,
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@email.com",
      customerPhone: "0123456789",
      startDate: "2024-02-20",
      endDate: "2024-02-23",
      numberOfPeople: 2,
      totalAmount: 6400000,
      status: "pending",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-20"),
      paymentStatus: "pending",
    },
  ]
}

// Get bookings for service provider
export const getProviderBookings = async (providerId: string): Promise<Booking[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock provider bookings
  return [
    {
      id: "1",
      bookingNumber: "VT123456",
      serviceId: "1",
      serviceName: "Tour Hạ Long Bay 3N2Đ",
      serviceProvider: "Công ty Du lịch ABC",
      customerId: "customer1",
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@email.com",
      customerPhone: "0123456789",
      startDate: "2024-02-01",
      endDate: "2024-02-03",
      numberOfPeople: 2,
      totalAmount: 5000000,
      status: "confirmed",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-16"),
      paymentStatus: "paid",
      paymentMethod: "credit_card",
    },
    {
      id: "3",
      bookingNumber: "VT345678",
      serviceId: "1",
      serviceName: "Tour Hạ Long Bay 3N2Đ",
      serviceProvider: "Công ty Du lịch ABC",
      customerId: "customer2",
      customerName: "Trần Thị B",
      customerEmail: "tranthib@email.com",
      customerPhone: "0987654321",
      startDate: "2024-02-15",
      endDate: "2024-02-17",
      numberOfPeople: 4,
      totalAmount: 10000000,
      status: "pending",
      createdAt: new Date("2024-01-22"),
      updatedAt: new Date("2024-01-22"),
      paymentStatus: "pending",
    },
  ]
}

// Update booking status
export const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus,
  notes?: string,
): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  // Mock update
  return true
}

// Cancel booking
export const cancelBooking = async (bookingId: string, reason: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // Mock cancellation
  return true
}
