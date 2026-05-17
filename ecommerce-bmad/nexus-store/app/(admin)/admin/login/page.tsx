'use client'
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useLangStore } from '@/store/langStore'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function AdminLoginPage() {
  const { login, isLoggedIn, error, clearError } = useAuthStore()
  const { t } = useLangStore()
  const l = t.admin.login
  const router = useRouter()
  const [email, setEmail] = useState('admin@nexus.store')
  const [password, setPassword] = useState('admin123')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (isLoggedIn) router.push('/admin') }, [isLoggedIn, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    login(email, password)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-[80px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-2xl shadow-gray-200/60">
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-violet-200">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">{l.title}</h1>
            <p className="text-gray-400 text-sm mt-1">{l.subtitle}</p>
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-6">
            <p className="text-xs text-violet-700 font-semibold mb-1">{l.demoLabel}</p>
            <p className="text-xs text-violet-500 font-mono">admin@nexus.store / admin123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />} placeholder="admin@nexus.store" />
            <div className="relative">
              <Input label={t.common.confirm} type={showPass ? 'text' : 'password'} value={password}
                onChange={(e) => setPassword(e.target.value)} icon={<Lock className="w-4 h-4" />} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-700 transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </motion.div>
            )}
            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">{l.submit}</Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
