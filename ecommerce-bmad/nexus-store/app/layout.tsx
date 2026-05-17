import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ToastContainer from '@/components/ui/Toast'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEXUS Store — The future, delivered.',
  description: 'Gadgets tech et accessoires premium nouvelle génération.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#f8f7ff] text-gray-900 antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
