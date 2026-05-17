'use client'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { useAuthStore } from '@/store/authStore'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoggedIn && pathname !== '/admin/login') router.push('/admin/login')
  }, [isLoggedIn, pathname, router])

  if (pathname === '/admin/login') return <>{children}</>
  if (!isLoggedIn) return null

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
