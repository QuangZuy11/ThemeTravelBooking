// Local storage service for client-side data persistence
class StorageService {
  // Generic methods
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return null
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  }

  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  }

  // Specific methods for common use cases
  setAuthToken(token: string): void {
    this.setItem("auth_token", token)
  }

  getAuthToken(): string | null {
    return this.getItem<string>("auth_token")
  }

  removeAuthToken(): void {
    this.removeItem("auth_token")
  }

  setUser(user: any): void {
    this.setItem("user", user)
  }

  getUser(): any | null {
    return this.getItem("user")
  }

  removeUser(): void {
    this.removeItem("user")
  }

  // Search history
  addSearchHistory(searchTerm: string): void {
    const history = this.getSearchHistory()
    const updatedHistory = [searchTerm, ...history.filter((term) => term !== searchTerm)].slice(0, 10)
    this.setItem("search_history", updatedHistory)
  }

  getSearchHistory(): string[] {
    return this.getItem<string[]>("search_history") || []
  }

  clearSearchHistory(): void {
    this.removeItem("search_history")
  }

  // Favorites
  addFavorite(tourId: string): void {
    const favorites = this.getFavorites()
    if (!favorites.includes(tourId)) {
      this.setItem("favorites", [...favorites, tourId])
    }
  }

  removeFavorite(tourId: string): void {
    const favorites = this.getFavorites()
    this.setItem(
      "favorites",
      favorites.filter((id) => id !== tourId),
    )
  }

  getFavorites(): string[] {
    return this.getItem<string[]>("favorites") || []
  }

  isFavorite(tourId: string): boolean {
    return this.getFavorites().includes(tourId)
  }

  // Recently viewed
  addRecentlyViewed(tourId: string): void {
    const recent = this.getRecentlyViewed()
    const updated = [tourId, ...recent.filter((id) => id !== tourId)].slice(0, 20)
    this.setItem("recently_viewed", updated)
  }

  getRecentlyViewed(): string[] {
    return this.getItem<string[]>("recently_viewed") || []
  }

  clearRecentlyViewed(): void {
    this.removeItem("recently_viewed")
  }
}

export const storageService = new StorageService()
