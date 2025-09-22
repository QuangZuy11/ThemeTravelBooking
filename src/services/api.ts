// API service for handling HTTP requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api"

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: { email: string; password: string; name: string; role: string }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }

  // Tours endpoints
  async getTours(params?: { destination?: string; minPrice?: number; maxPrice?: number }) {
    const queryString = params ? new URLSearchParams(params as any).toString() : ""
    return this.request(`/tours${queryString ? `?${queryString}` : ""}`)
  }

  async getTour(id: string) {
    return this.request(`/tours/${id}`)
  }

  async createTour(tourData: any) {
    return this.request("/tours", {
      method: "POST",
      body: JSON.stringify(tourData),
    })
  }

  async updateTour(id: string, tourData: any) {
    return this.request(`/tours/${id}`, {
      method: "PUT",
      body: JSON.stringify(tourData),
    })
  }

  async deleteTour(id: string) {
    return this.request(`/tours/${id}`, {
      method: "DELETE",
    })
  }

  // Bookings endpoints
  async getBookings(userId?: string) {
    const queryString = userId ? `?userId=${userId}` : ""
    return this.request(`/bookings${queryString}`)
  }

  async createBooking(bookingData: any) {
    return this.request("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    })
  }

  async updateBooking(id: string, bookingData: any) {
    return this.request(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(bookingData),
    })
  }

  async cancelBooking(id: string) {
    return this.request(`/bookings/${id}/cancel`, {
      method: "POST",
    })
  }

  // Destinations endpoints
  async getDestinations() {
    return this.request("/destinations")
  }

  // User endpoints
  async getProfile() {
    return this.request("/users/profile")
  }

  async updateProfile(userData: any) {
    return this.request("/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  // Admin endpoints
  async getUsers() {
    return this.request("/admin/users")
  }

  async updateUserStatus(userId: string, status: string) {
    return this.request(`/admin/users/${userId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  }

  async getAnalytics() {
    return this.request("/admin/analytics")
  }
}

export const apiService = new ApiService()
