'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  promoApplied: boolean
  add: (product: Product, qty?: number) => void
  remove: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
  applyPromo: () => void
  total: () => number
  subtotal: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoApplied: false,

      add: (product, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity: qty }] }
        })
      },

      remove: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) }))
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().remove(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity: qty } : i
          ),
        }))
      },

      clear: () => set({ items: [], promoApplied: false }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      applyPromo: () => set({ promoApplied: true }),

      subtotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      total: () => {
        const sub = get().subtotal()
        return get().promoApplied ? sub * 0.8 : sub
      },
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'nexus-cart' }
  )
)
