'use client'
import { create } from 'zustand'
import type { Product, Order } from '@/types'
import { mockProducts } from '@/mock/products'
import { mockOrders } from '@/mock/orders'

interface AdminStore {
  products: Product[]
  orders: Order[]
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
}

export const useAdminStore = create<AdminStore>()((set) => ({
  products: mockProducts,
  orders: mockOrders,

  addProduct: (data) => {
    const id = `prod-${Date.now()}`
    const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    const product: Product = {
      ...data,
      id,
      slug,
      rating: 0,
      reviewCount: 0,
    }
    set((state) => ({ products: [product, ...state.products] }))
  },

  updateProduct: (id, data) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }))
  },

  deleteProduct: (id) => {
    set((state) => ({ products: state.products.filter((p) => p.id !== id) }))
  },

  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }))
  },
}))
