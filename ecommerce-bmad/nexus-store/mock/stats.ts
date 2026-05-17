import type { DashboardStats } from '@/types'

export const mockStats: DashboardStats = {
  totalRevenue: 142847,
  totalOrders: 1284,
  totalProducts: 20,
  totalCustomers: 876,
  revenueChange: 18.4,
  ordersChange: 12.7,
  customersChange: 9.2,
}

export const mockRevenueChart = [
  { month: 'Nov', revenue: 9200 },
  { month: 'Déc', revenue: 18400 },
  { month: 'Jan', revenue: 11200 },
  { month: 'Fév', revenue: 13800 },
  { month: 'Mar', revenue: 15600 },
  { month: 'Avr', revenue: 21400 },
  { month: 'Mai', revenue: 19800 },
]

export const mockTopProducts = [
  { name: 'NexusWatch Ultra', sold: 342, revenue: 204958 },
  { name: 'ProBook Ultra 14', sold: 187, revenue: 336613 },
  { name: 'NexusAir Pro', sold: 521, revenue: 181829 },
  { name: 'NexusDrone Air', sold: 98, revenue: 88102 },
  { name: 'VisionVR Elite', sold: 134, revenue: 107066 },
]
