'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useLangStore } from '@/store/langStore'
import { ShoppingBag, Search, Zap, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SITE_NAME, PROMO_CODE } from '@/lib/constants'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { itemCount, openCart } = useCartStore()
  const { t, locale } = useLangStore()
  const count = itemCount()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const router = useRouter()

  const NAV_LINKS = [
    { href: '/products', label: t.nav.products },
    { href: '/products?category=Audio', label: t.nav.audio },
    { href: '/products?category=Wearables', label: t.nav.wearables },
    { href: '/products?category=Gaming', label: t.nav.gaming },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchVal.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchVal.trim())}`)
      setSearchOpen(false)
      setSearchVal('')
    }
  }

  return (
    <>
      {/* Promo bar */}
      <div className="bg-violet-600 text-center py-2 text-xs text-white font-medium tracking-wide">
        🚀 {t.promo.text} <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded">{PROMO_CODE}</span> {t.promo.suffix}
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center group-hover:bg-violet-700 transition-colors shadow-md shadow-violet-200">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg tracking-tight text-gray-900">{SITE_NAME}</span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-5">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}
                  className="text-sm text-gray-500 hover:text-violet-600 transition-colors font-semibold">
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 transition-all rounded-xl">
                <Search className="w-5 h-5" />
              </button>

              <button onClick={openCart} className="relative p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 transition-all rounded-xl">
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-600 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </button>

              <LanguageSwitcher />

              <button onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-violet-600 transition-colors rounded-xl">
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 bg-white">
              <div className="px-4 py-4 flex flex-col gap-3">
                {NAV_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                    className="text-gray-600 hover:text-violet-600 font-semibold transition-colors py-1">
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}>
            <motion.form initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="relative shadow-2xl">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input autoFocus value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
                  placeholder={t.search.placeholder}
                  className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-6 py-5 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />
              </div>
              <p className="text-center text-white/80 text-sm mt-3 drop-shadow">{t.search.hint}</p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
