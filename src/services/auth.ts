// Mock authentication service - replace with real implementation
export interface User {
  id: string
  email: string
  name: string
  role: "traveler" | "provider" | "admin"
  avatar?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    email: "traveler@example.com",
    name: "Nguyễn Văn A",
    role: "traveler",
  },
  {
    id: "2",
    email: "provider@example.com",
    name: "Công ty Du lịch ABC",
    role: "provider",
  },
  {
    id: "3",
    email: "admin@example.com",
    name: "Admin",
    role: "admin",
  },
]

export async function signIn(email: string, password: string): Promise<User | null> {
  // Mock authentication - replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password") {
    return user
  }
  return null
}

export async function signOut(): Promise<void> {
  // Mock sign out - replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 500))
}
