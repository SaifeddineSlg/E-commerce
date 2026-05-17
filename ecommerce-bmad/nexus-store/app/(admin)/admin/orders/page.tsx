'use client'
import { useState } from 'react'
import { useAdminStore } from '@/store/adminStore'
import { useUIStore } from '@/store/uiStore'
import { useLangStore } from '@/store/langStore'
import { formatPrice, formatDate } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/constants'
import { motion } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import type { Order } from '@/types'

const STATUS_VARIANT: Record<string, 'warning' | 'info' | 'purple' | 'success' | 'error'> = {
  yellow: 'warning', blue: 'info', purple: 'purple', green: 'success', red: 'error'
}

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdminStore()
  const { addToast } = useUIStore()
  const { t } = useLangStore()
  const op = t.admin.ordersPage
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || o.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status)
    addToast(`${op.changeStatus}: ${ORDER_STATUSES[status].label}`, 'success')
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">{op.title}</h1>
        <p className="text-gray-400 text-sm mt-1">{orders.length} {op.total}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={op.search}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500 transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', ...Object.keys(ORDER_STATUSES)] as (Order['status'] | 'all')[]).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${filterStatus === s ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {s === 'all' ? op.all : ORDER_STATUSES[s as Order['status']].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {(Object.entries(ORDER_STATUSES) as [Order['status'], typeof ORDER_STATUSES[keyof typeof ORDER_STATUSES]][]).map(([key, val]) => {
          const count = orders.filter((o) => o.status === key).length
          return (
            <div key={key} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-black text-gray-900">{count}</p>
              <Badge variant={STATUS_VARIANT[val.color]} className="mt-1">{val.label}</Badge>
            </div>
          )
        })}
      </div>

      <div className="space-y-3">
        {filtered.map((order, i) => {
          const statusInfo = ORDER_STATUSES[order.status]
          const isExpanded = expandedId === order.id
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
            >
              <div
                className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <div>
                  <p className="font-mono text-xs text-violet-600 font-semibold">{order.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.date)}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{order.customer.name}</p>
                  <p className="text-xs text-gray-400">{order.customer.email}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-500">{order.items.length} article{order.items.length > 1 ? 's' : ''}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="font-black text-gray-900">{formatPrice(order.total)}</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Badge variant={STATUS_VARIANT[statusInfo.color]}>{statusInfo.label}</Badge>
                  <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-100 p-5"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">{op.products}</h3>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.product.name} × {item.quantity}</span>
                            <span className="font-semibold text-gray-900">{formatPrice(item.product.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">{op.shippingTitle}</h3>
                        <p className="text-sm text-gray-700">{order.shippingAddress.street}</p>
                        <p className="text-sm text-gray-500">{order.shippingAddress.zip} {order.shippingAddress.city}, {order.shippingAddress.country}</p>
                        <p className="text-xs text-gray-400 mt-1">{order.paymentMethod}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">{op.changeStatus}</h3>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                          className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                        >
                          {(Object.entries(ORDER_STATUSES) as [Order['status'], typeof ORDER_STATUSES[keyof typeof ORDER_STATUSES]][]).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📦</p>
            <p>{op.noOrders}</p>
          </div>
        )}
      </div>
    </div>
  )
}
