'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Shield, Truck, Star, ChevronRight } from 'lucide-react'
import { mockCategories } from '@/mock/categories'
import ProductCard from '@/components/products/ProductCard'
import Button from '@/components/ui/Button'
import { useLangStore } from '@/store/langStore'
import { useTranslatedProducts } from '@/lib/useTranslatedProducts'
import { PROMO_CODE } from '@/lib/constants'

const FEATURE_ICONS = [Truck, Shield, Star, Zap]

export default function HomePage() {
  const { t } = useLangStore()
  const h = t.home
  const allProducts = useTranslatedProducts()
  const featured = allProducts.filter((p) => p.featured).slice(0, 4)

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-violet-50 via-white to-blue-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-violet-200/40 rounded-full blur-[100px]" />
          <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-violet-100 border border-violet-200 rounded-full px-4 py-1.5 text-sm text-violet-700 font-semibold mb-8">
                <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                {h.badge}
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-gray-900">
                {h.heroTitle}{' '}<span className="gradient-text">{h.heroHighlight}</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">{h.heroDesc}</motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-4">
                <Link href="/products"><Button size="lg">{h.cta} <ArrowRight className="w-5 h-5" /></Button></Link>
                <Link href="/products?featured=true"><Button size="lg" variant="secondary">{h.ctaSecondary}</Button></Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="flex gap-8 mt-12 pt-8 border-t border-gray-100">
                {[['20+', h.stats.products], ['4.8★', h.stats.rating], ['1284', h.stats.orders]].map(([val, label]) => (
                  <div key={label as string}>
                    <div className="text-2xl font-black text-gray-900">{val}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-8 bg-violet-200/60 rounded-[40px] blur-3xl" />
                <div className="relative animate-float">
                  <Image src={allProducts[0].images[0]} alt={allProducts[0].name} width={500} height={500}
                    className="rounded-3xl object-cover shadow-2xl shadow-violet-200/60" />
                  <motion.div initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.7, type: 'spring' }}
                    className="absolute -left-8 top-1/3 bg-white rounded-2xl p-3 shadow-xl border border-gray-100 w-44">
                    <p className="text-xs text-gray-400 mb-1">{h.topSale}</p>
                    <p className="font-bold text-sm text-gray-900">{allProducts[0].name}</p>
                    <p className="text-violet-600 font-black text-lg mt-1">{allProducts[0].price}€</p>
                  </motion.div>
                  <motion.div initial={{ x: 20 }} animate={{ x: 0 }} transition={{ delay: 0.8, type: 'spring' }}
                    className="absolute -right-8 bottom-1/4 bg-white rounded-2xl p-3 shadow-xl border border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <p className="text-xs text-emerald-600 font-semibold">{h.inStock}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{allProducts[0].stock} {h.units}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {h.features.map(({ title, desc }, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <div key={title} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{title}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-violet-600 text-sm font-bold mb-2 uppercase tracking-widest">{h.featured.label}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{h.featured.title}</h2>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm text-gray-400 hover:text-violet-600 transition-colors font-semibold">
            {h.featured.seeAll} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-violet-600 text-sm font-bold mb-2 uppercase tracking-widest">{h.categories.label}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{h.categories.title}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockCategories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link href={`/products?category=${cat.name}`}
                  className="group relative block aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/60 transition-all">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="font-black text-xl text-white">{cat.name}</h3>
                    <p className="text-white/70 text-sm mt-0.5">{cat.productCount} {h.categories.products}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ArrowRight className="w-4 h-4 text-gray-700" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 to-violet-800 p-10 sm:p-16 text-center shadow-2xl shadow-violet-200">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative">
            <p className="text-violet-200 font-semibold mb-4 text-sm uppercase tracking-widest">{h.banner.label}</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{h.banner.title}</h2>
            <p className="text-violet-200 text-lg mb-8">
              {h.banner.desc} <span className="text-white font-black bg-white/20 px-2 py-0.5 rounded">{PROMO_CODE}</span> {h.banner.desc2}
            </p>
            <Link href="/products">
              <button className="bg-white text-violet-700 font-bold text-base px-8 py-4 rounded-2xl hover:bg-violet-50 transition-colors shadow-lg inline-flex items-center gap-2">
                {h.banner.cta} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
