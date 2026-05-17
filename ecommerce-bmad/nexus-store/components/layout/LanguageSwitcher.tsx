'use client'
import { useLangStore } from '@/store/langStore'
import { type Locale } from '@/lib/translations'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import { useState } from 'react'

const LANGS: { code: Locale; label: string; flag: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLangStore()
  const [open, setOpen] = useState(false)

  const current = LANGS.find((l) => l.code === locale)!

  // Apply dir + lang to <html> on locale change
  useEffect(() => {
    const html = document.documentElement
    const lang = LANGS.find((l) => l.code === locale)!
    html.setAttribute('lang', locale)
    html.setAttribute('dir', lang.dir)
    if (lang.dir === 'rtl') {
      html.style.fontFamily = "'Geist Sans', 'Segoe UI', Tahoma, sans-serif"
    } else {
      html.style.fontFamily = ''
    }
  }, [locale])

  const handleSelect = (code: Locale) => {
    setLocale(code)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:block">{current.flag} {current.label}</span>
        <span className="sm:hidden">{current.flag}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              {LANGS.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left
                    ${locale === lang.code ? 'bg-violet-50 text-violet-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="flex-1">{lang.label}</span>
                  {locale === lang.code && <Check className="w-3.5 h-3.5 text-violet-600" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
