'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useLangStore } from '@/store/langStore'
import { LayoutDashboard, Package, ShoppingBag, LogOut, Zap, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const { t } = useLangStore()
  const sb = t.admin.sidebar
  const router = useRouter()

  const NAV = [
    { href: '/admin', label: sb.dashboard, icon: LayoutDashboard },
    { href: '/admin/products', label: sb.products, icon: Package },
    { href: '/admin/orders', label: sb.orders, icon: ShoppingBag },
  ]

  const handleLogout = () => { logout(); router.push('/admin/login') }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col min-h-screen shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-violet-200">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-black text-sm text-gray-900">{sb.admin}</p>
            <p className="text-[10px] text-gray-400">{sb.panel}</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                active
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              )}>
              <Icon className="w-4 h-4" />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-sm font-bold text-violet-600">
            {user?.name?.[0] ?? 'A'}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
          <LogOut className="w-4 h-4" /> {sb.logout}
        </button>
        <Link href="/" className="flex items-center gap-2 w-full px-4 py-2 text-xs text-gray-300 hover:text-violet-600 transition-colors mt-1">
          <Zap className="w-3 h-3" /> {sb.viewStore}
        </Link>
      </div>
    </aside>
  )
}
