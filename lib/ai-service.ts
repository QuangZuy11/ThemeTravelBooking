// AI Service for generating personalized itineraries
export interface TravelPreferences {
  destination: string
  duration: number // days
  budget: number // VND
  travelStyle: "budget" | "comfort" | "luxury"
  interests: string[]
  groupSize: number
  travelDates?: {
    startDate: string
    endDate: string
  }
}

export interface ItineraryDay {
  day: number
  date: string
  activities: Activity[]
  accommodation?: {
    name: string
    type: string
    price: number
    rating: number
  }
  totalCost: number
}

export interface Activity {
  id: string
  name: string
  description: string
  location: string
  duration: string // e.g., "2 hours"
  cost: number
  category: string
  rating: number
  image?: string
  timeSlot: string // e.g., "09:00 - 11:00"
}

export interface AIItinerary {
  id: string
  title: string
  destination: string
  duration: number
  totalBudget: number
  estimatedCost: number
  days: ItineraryDay[]
  highlights: string[]
  tips: string[]
  createdAt: Date
  userId: string
}

// Mock AI service - replace with real AI API integration
export const generateItinerary = async (preferences: TravelPreferences): Promise<AIItinerary> => {
  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Mock itinerary generation based on preferences
  const mockItinerary: AIItinerary = {
    id: Date.now().toString(),
    title: `Khám phá ${preferences.destination} ${preferences.duration} ngày`,
    destination: preferences.destination,
    duration: preferences.duration,
    totalBudget: preferences.budget,
    estimatedCost: Math.floor(preferences.budget * 0.85),
    days: generateMockDays(preferences),
    highlights: [
      `Trải nghiệm ${preferences.interests.join(", ")} tại ${preferences.destination}`,
      `Phù hợp với ngân sách ${preferences.budget.toLocaleString("vi-VN")}đ`,
      `Thiết kế cho ${preferences.groupSize} người`,
      `Phong cách du lịch ${preferences.travelStyle === "budget" ? "tiết kiệm" : preferences.travelStyle === "comfort" ? "thoải mái" : "sang trọng"}`,
    ],
    tips: [
      "Đặt trước các hoạt động để được giá tốt hơn",
      "Mang theo kem chống nắng và nước uống",
      "Kiểm tra thời tiết trước khi khởi hành",
      "Chuẩn bị một số tiền mặt cho các chi phí nhỏ",
    ],
    createdAt: new Date(),
    userId: "current-user-id",
  }

  return mockItinerary
}

const generateMockDays = (preferences: TravelPreferences): ItineraryDay[] => {
  const days: ItineraryDay[] = []

  for (let i = 1; i <= preferences.duration; i++) {
    const activities = generateMockActivities(preferences, i)
    const accommodation = i < preferences.duration ? generateMockAccommodation(preferences) : undefined

    days.push({
      day: i,
      date: new Date(Date.now() + (i - 1) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      activities,
      accommodation,
      totalCost: activities.reduce((sum, activity) => sum + activity.cost, 0) + (accommodation?.price || 0),
    })
  }

  return days
}

const generateMockActivities = (preferences: TravelPreferences, day: number): Activity[] => {
  const activities: Activity[] = []
  const baseActivities = {
    "Hạ Long": [
      {
        name: "Du thuyền Hạ Long Bay",
        description: "Khám phá vịnh Hạ Long trên du thuyền",
        location: "Vịnh Hạ Long",
        category: "Tham quan",
        cost: 500000,
      },
      {
        name: "Thăm hang Sửng Sốt",
        description: "Khám phá hang động nổi tiếng",
        location: "Đảo Bồ Hòn",
        category: "Tham quan",
        cost: 200000,
      },
      {
        name: "Kayak trên vịnh",
        description: "Chèo kayak khám phá các hang động",
        location: "Vịnh Hạ Long",
        category: "Thể thao",
        cost: 300000,
      },
    ],
    Sapa: [
      {
        name: "Trekking ruộng bậc thang",
        description: "Đi bộ ngắm ruộng bậc thang",
        location: "Mường Hoa",
        category: "Trekking",
        cost: 400000,
      },
      {
        name: "Thăm bản Cát Cát",
        description: "Tìm hiểu văn hóa dân tộc",
        location: "Bản Cát Cát",
        category: "Văn hóa",
        cost: 250000,
      },
      {
        name: "Chinh phục Fansipan",
        description: "Leo núi cao nhất Việt Nam",
        location: "Fansipan",
        category: "Thể thao",
        cost: 600000,
      },
    ],
  }

  const destinationActivities =
    baseActivities[preferences.destination as keyof typeof baseActivities] || baseActivities["Hạ Long"]

  // Select 2-3 activities per day based on preferences
  const selectedActivities = destinationActivities.slice(0, day === 1 ? 2 : 3)

  selectedActivities.forEach((activity, index) => {
    activities.push({
      id: `${day}-${index}`,
      name: activity.name,
      description: activity.description,
      location: activity.location,
      duration: "2-3 giờ",
      cost: Math.floor(
        activity.cost * (preferences.travelStyle === "luxury" ? 1.5 : preferences.travelStyle === "budget" ? 0.7 : 1),
      ),
      category: activity.category,
      rating: 4.5 + Math.random() * 0.5,
      timeSlot: index === 0 ? "09:00 - 12:00" : index === 1 ? "14:00 - 17:00" : "19:00 - 21:00",
    })
  })

  return activities
}

const generateMockAccommodation = (preferences: TravelPreferences) => {
  const accommodationTypes = {
    budget: { name: "Khách sạn 2 sao", type: "Hotel", price: 500000, rating: 3.5 },
    comfort: { name: "Khách sạn 3 sao", type: "Hotel", price: 1000000, rating: 4.2 },
    luxury: { name: "Resort 5 sao", type: "Resort", price: 2500000, rating: 4.8 },
  }

  return accommodationTypes[preferences.travelStyle]
}

// Get saved itineraries for user
export const getUserItineraries = async (userId: string): Promise<AIItinerary[]> => {
  // Mock saved itineraries
  return [
    {
      id: "1",
      title: "Khám phá Hạ Long 3 ngày",
      destination: "Hạ Long",
      duration: 3,
      totalBudget: 5000000,
      estimatedCost: 4200000,
      days: [],
      highlights: ["Du thuyền Hạ Long Bay", "Thăm hang Sửng Sốt", "Kayak trên vịnh"],
      tips: ["Đặt trước du thuyền", "Mang theo kem chống nắng"],
      createdAt: new Date("2024-01-10"),
      userId,
    },
    {
      id: "2",
      title: "Trekking Sapa 4 ngày",
      destination: "Sapa",
      duration: 4,
      totalBudget: 6000000,
      estimatedCost: 5100000,
      days: [],
      highlights: ["Trekking ruộng bậc thang", "Thăm bản Cát Cát", "Chinh phục Fansipan"],
      tips: ["Chuẩn bị giày trekking", "Mang theo áo ấm"],
      createdAt: new Date("2024-01-05"),
      userId,
    },
  ]
}

export const saveItinerary = async (itinerary: AIItinerary): Promise<boolean> => {
  // Mock save to database
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return true
}
