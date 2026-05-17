'use client'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Home, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLangStore } from '@/store/langStore'

const STEP_ICONS = [CheckCircle, Package, Truck, Home]

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order') || 'ORD-DEMO'
  const { t } = useLangStore()
  const s = t.success

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        className="relative inline-block mb-8"
      >
        <div className="w-28 h-28 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', damping: 12 }}
          >
            <CheckCircle className="w-14 h-14 text-emerald-500" />
          </motion.div>
        </div>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((i / 8) * Math.PI * 2) * 80,
              y: Math.sin((i / 8) * Math.PI * 2) * 80,
              opacity: [0, 1, 0],
            }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-violet-400"
          />
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">{s.title}</h1>
        <p className="text-gray-400 text-lg mb-2">{s.subtitle}</p>
        <p className="text-gray-300 text-sm mb-10">
          {s.orderNum} <span className="font-mono text-violet-600 font-semibold">{orderId}</span>
        </p>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 text-left shadow-sm">
          <h2 className="font-bold mb-6 text-gray-900">{s.tracking}</h2>
          <div className="relative">
            <div className="absolute left-4 top-8 bottom-8 w-px bg-gray-100" />
            <div className="space-y-6">
              {s.steps.map((label: string, i: number) => {
                const Icon = STEP_ICONS[i]
                return (
                  <div key={label} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${i === 0 ? 'bg-emerald-500' : 'bg-gray-100'}`}>
                      <Icon className={`w-4 h-4 ${i === 0 ? 'text-white' : 'text-gray-300'}`} />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${i === 0 ? 'text-emerald-600' : 'text-gray-300'}`}>{label}</p>
                      <p className={`text-xs mt-0.5 ${i === 0 ? 'text-gray-400' : 'text-gray-200'}`}>{s.times[i]}</p>
                    </div>
                    {i === 0 && (
                      <span className="ml-auto text-xs bg-emerald-100 text-emerald-600 font-semibold px-2 py-1 rounded-lg">{s.current}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products">
            <Button size="lg">
              {s.continueShopping} <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="secondary">
              {s.backHome}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}
