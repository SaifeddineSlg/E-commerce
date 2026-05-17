'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/lib/constants'

interface AdminUser {
  email: string
  name: string
  role: string
}

interface AuthStore {
  user: AdminUser | null
  isLoggedIn: boolean
  error: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      error: null,

      login: (email, password) => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          set({
            user: { email, name: 'Admin NEXUS', role: 'admin' },
            isLoggedIn: true,
            error: null,
          })
          return true
        }
        set({ error: 'Email ou mot de passe incorrect' })
        return false
      },

      logout: () => set({ user: null, isLoggedIn: false, error: null }),
      clearError: () => set({ error: null }),
    }),
    { name: 'nexus-auth' }
  )
)
