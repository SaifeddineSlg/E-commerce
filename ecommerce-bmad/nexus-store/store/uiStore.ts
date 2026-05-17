'use client'
import { create } from 'zustand'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface UIStore {
  toasts: Toast[]
  isLoading: boolean
  addToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
  setLoading: (v: boolean) => void
}

export const useUIStore = create<UIStore>()((set) => ({
  toasts: [],
  isLoading: false,

  addToast: (message, type = 'success') => {
    const id = Date.now().toString()
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 3500)
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },

  setLoading: (v) => set({ isLoading: v }),
}))
