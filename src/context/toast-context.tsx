"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success" | "warning"
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  toast: (props: Omit<Toast, "id">) => { id: string; dismiss: () => void; update: (props: Partial<Toast>) => void }
  dismiss: (toastId: string) => void
  dismissAll: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ duration = 5000, ...props }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, duration, ...props }

    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }

    return {
      id,
      dismiss: () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      update: (updateProps: Partial<Toast>) =>
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...updateProps } : t))),
    }
  }, [])

  const dismiss = useCallback((toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
