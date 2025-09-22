"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, type AuthState, signIn, signOut as authSignOut } from "@/lib/auth"

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        // Mock check - replace with real session check
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          const user = JSON.parse(savedUser)
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          })
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    checkAuth()
  }, [])

  const handleSignIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }))
      const user = await signIn(email, password)

      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
        return true
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
        return false
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    }
  }

  const handleSignOut = async (): Promise<void> => {
    try {
      await authSignOut()
      localStorage.removeItem("user")
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const setUser = (user: User | null) => {
    setAuthState((prev) => ({
      ...prev,
      user,
      isAuthenticated: !!user,
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn: handleSignIn,
        signOut: handleSignOut,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
