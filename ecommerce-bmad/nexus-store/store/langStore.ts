'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { translations, type Locale } from '@/lib/translations'

type AnyTranslation = typeof translations[Locale]

interface LangStore {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: AnyTranslation
}

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      locale: 'fr' as Locale,
      t: translations.fr as AnyTranslation,
      setLocale: (locale: Locale) => set({ locale, t: translations[locale] as AnyTranslation }),
    }),
    { name: 'nexus-lang' }
  )
)
