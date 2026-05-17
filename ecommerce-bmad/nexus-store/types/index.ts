export interface Product {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  category: string
  images: string[]
  stock: number
  rating: number
  reviewCount: number
  featured: boolean
  tags: string[]
  specs?: Record<string, string>
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  customer: {
    name: string
    email: string
  }
  shippingAddress: {
    street: string
    city: string
    country: string
    zip: string
  }
  date: string
  paymentMethod: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
  description: string
}

export interface Review {
  id: string
  productId: string
  author: string
  avatar: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface AdminUser {
  email: string
  password: string
  name: string
  role: 'admin' | 'manager'
}

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  revenueChange: number
  ordersChange: number
  customersChange: number
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
export type OrderStatus = Order['status']
