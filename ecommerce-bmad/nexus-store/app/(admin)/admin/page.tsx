'use client'
import { motion } from 'framer-motion'
import { TrendingUp, ShoppingBag, Package, Users, ArrowUpRight, Activity } from 'lucide-react'
import { mockStats, mockRevenueChart, mockTopProducts } from '@/mock/stats'
import { useAdminStore } from '@/store/adminStore'
import { useLangStore } from '@/store/langStore'
import { formatPrice } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/constants'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'

function StatCard({ icon: Icon, label, value, change, color, iconColor }: {
  icon: React.ElementType, label: string, value: string, change: number, color: string, iconColor: string
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <ArrowUpRight className="w-3 h-3" />+{change}%
        </div>
      </div>
      <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const { orders } = useAdminStore()
  const { t } = useLangStore()
  const a = t.admin
  const recentOrders = orders.slice(0, 5)
  const maxRevenue = Math.max(...mockRevenueChart.map((d) => d.revenue))

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">{a.dashboard}</h1>
        <p className="text-gray-400 text-sm mt-1">{a.welcome}</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <StatCard icon={TrendingUp} label={a.revenue} value={formatPrice(mockStats.totalRevenue)} change={mockStats.revenueChange} color="bg-violet-100" iconColor="text-violet-600" />
        <StatCard icon={ShoppingBag} label={a.orders} value={mockStats.totalOrders.toLocaleString()} change={mockStats.ordersChange} color="bg-blue-100" iconColor="text-blue-600" />
        <StatCard icon={Package} label={a.products} value={mockStats.totalProducts.toString()} change={5} color="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard icon={Users} label={a.customers} value={mockStats.totalCustomers.toLocaleString()} change={mockStats.customersChange} color="bg-orange-100" iconColor="text-orange-600" />
      </div>

      <div className="grid xl:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">{a.monthlyRevenue}</h2>
            <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold">
              <Activity className="w-4 h-4" /> +18.4%
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {mockRevenueChart.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <p className="text-xs font-bold text-gray-600">{Math.round(d.revenue / 1000)}k€</p>
                <motion.div
                  initial={{ height: 0 }} animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`w-full rounded-t-lg cursor-pointer transition-colors ${i === mockRevenueChart.length - 2 ? 'bg-violet-600 hover:bg-violet-700' : 'bg-violet-100 hover:bg-violet-200'}`}
                />
                <p className="text-xs text-gray-400">{d.month}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-5">{a.topProducts}</h2>
          <div className="space-y-4">
            {mockTopProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.sold} {a.sold}</p>
                </div>
                <p className="text-sm font-bold text-violet-600 shrink-0">{formatPrice(p.revenue)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900">{a.recentOrders}</h2>
          <Link href="/admin/orders" className="text-sm text-violet-600 hover:text-violet-700 font-semibold transition-colors">{a.seeAll}</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-semibold">{a.ordersPage.title}</th>
                <th className="pb-3 font-semibold">{a.customers}</th>
                <th className="pb-3 font-semibold">Total</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => {
                const statusInfo = ORDER_STATUSES[order.status]
                const variantMap: Record<string, 'warning' | 'info' | 'purple' | 'success' | 'error'> = {
                  yellow: 'warning', blue: 'info', purple: 'purple', green: 'success', red: 'error'
                }
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-mono text-xs text-violet-600 font-semibold">{order.id}</td>
                    <td className="py-3 text-gray-900 font-medium">{order.customer.name}</td>
                    <td className="py-3 font-bold text-gray-900">{formatPrice(order.total)}</td>
                    <td className="py-3"><Badge variant={variantMap[statusInfo.color]}>{statusInfo.label}</Badge></td>
                    <td className="py-3 text-gray-400">{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
