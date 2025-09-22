"use client"

import type React from "react"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "@/context/auth-context"
import HomePage from "@/pages/HomePage"
import TravelerDashboard from "@/pages/TravelerDashboard"
import ProviderDashboard from "@/pages/ProviderDashboard"
import AdminDashboard from "@/pages/AdminDashboard"

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

// Dashboard Router Component
function DashboardRouter() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" replace />

  switch (user.role) {
    case "traveler":
      return <TravelerDashboard />
    case "provider":
      return <ProviderDashboard />
    case "admin":
      return <AdminDashboard />
    default:
      return <Navigate to="/" replace />
  }
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["traveler", "provider", "admin"]}>
            <DashboardRouter />
          </ProtectedRoute>
        }
      />

      {/* Role-specific Dashboard Routes */}
      <Route
        path="/dashboard/traveler"
        element={
          <ProtectedRoute allowedRoles={["traveler"]}>
            <TravelerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/provider"
        element={
          <ProtectedRoute allowedRoles={["provider"]}>
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background font-sans antialiased">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  )
}
