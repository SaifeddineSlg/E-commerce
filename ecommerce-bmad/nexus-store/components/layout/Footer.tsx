'use client'
import Link from 'next/link'
import { Zap, MessageCircle, Camera, Code, Play } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'
import { useLangStore } from '@/store/langStore'

export default function Footer() {
  const { t } = useLangStore()
  const f = t.footer

  return (
    <footer className="border-t border-gray-100 bg-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-violet-200">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg text-gray-900">{SITE_NAME}</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{f.tagline}</p>
            <div className="flex items-center gap-3">
              {[MessageCircle, Camera, Code, Play].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-violet-100 flex items-center justify-center text-gray-400 hover:text-violet-600 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(f.links).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm text-gray-900 mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {(links as unknown as { label: string; href: string }[]).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-violet-600 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">{f.demo}</p>
          <div className="flex items-center gap-1.5 text-gray-300 text-xs">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {f.status}
          </div>
        </div>
      </div>
    </footer>
  )
}
