// Authentication utilities and types
export type UserRole = "traveler" | "service_provider" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock authentication functions - replace with real implementation
export const mockUsers: User[] = [
  {
    id: "1",
    email: "traveler@example.com",
    name: "Nguyễn Văn A",
    role: "traveler",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "0123456789",
    createdAt: new Date(),
  },
  {
    id: "2",
    email: "provider@example.com",
    name: "Công ty Du lịch ABC",
    role: "service_provider",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "0987654321",
    createdAt: new Date(),
  },
  {
    id: "3",
    email: "admin@example.com",
    name: "Admin System",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date(),
  },
]

export const signIn = async (email: string, password: string): Promise<User | null> => {
  // Mock authentication - replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const user = mockUsers.find((u) => u.email === email)
  return user || null
}

export const signUp = async (userData: Omit<User, "id" | "createdAt">): Promise<User> => {
  // Mock registration - replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date(),
  }
  return newUser
}

export const signOut = async (): Promise<void> => {
  // Mock sign out - replace with real implementation
  await new Promise((resolve) => setTimeout(resolve, 500))
}
