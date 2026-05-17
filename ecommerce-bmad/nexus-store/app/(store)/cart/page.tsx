'use client'
import { useCartStore } from '@/store/cartStore'
import { useLangStore } from '@/store/langStore'
import { useTranslatedProduct } from '@/lib/useTranslatedProducts'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD, PROMO_CODE } from '@/lib/constants'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import type { CartItem } from '@/types'

// Ligne traduite individuellement
function CartItemRow({ item, onUpdate, onRemove }: {
  item: CartItem
  onUpdate: (id: string, qty: number) => void
  onRemove: (id: string) => void
}) {
  const translated = useTranslatedProduct(item.product.id)
  const name = translated?.name ?? item.product.name
  const category = translated?.category ?? item.product.category

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
      className="flex gap-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
        <Image src={item.product.images[0]} alt={name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-violet-600 font-semibold mb-1">{category}</p>
        <Link href={`/products/${item.product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-violet-600 transition-colors">{name}</h3>
        </Link>
        <p className="text-gray-400 text-sm mt-0.5">{formatPrice(item.product.price)} / unité</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1.5">
            <button onClick={() => onUpdate(item.product.id, item.quantity - 1)} className="text-gray-500 hover:text-gray-900 transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-gray-900">{item.quantity}</span>
            <button onClick={() => onUpdate(item.product.id, item.quantity + 1)} className="text-gray-500 hover:text-gray-900 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-black text-lg text-gray-900">{formatPrice(item.product.price * item.quantity)}</span>
            <button onClick={() => onRemove(item.product.id)} className="text-gray-300 hover:text-red-500 transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CartPage() {
  const { items, remove, updateQty, total, subtotal, promoApplied, applyPromo, clear } = useCartStore()
  const { t } = useLangStore()
  const c = t.cart
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')

  const sub = subtotal()
  const discount = promoApplied ? sub * 0.2 : 0
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : sub > 0 ? 9.99 : 0
  const tot = total() + shipping

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)

  const handlePromo = () => {
    if (promoInput.toUpperCase() === PROMO_CODE) { applyPromo(); setPromoError('') }
    else setPromoError(c.promo.invalid)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-28 h-28 bg-gray-100 border border-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-14 h-14 text-gray-300" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">{c.empty}</h1>
          <p className="text-gray-400 mb-8">{c.emptyDesc}</p>
          <Link href="/products"><Button size="lg">{c.browse} <ArrowRight className="w-5 h-5" /></Button></Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          {c.title} <span className="text-gray-300">({totalItems})</span>
        </h1>
        <button onClick={clear} className="text-sm text-gray-300 hover:text-red-500 transition-colors">{c.clear}</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <CartItemRow key={item.product.id} item={item} onUpdate={updateQty} onRemove={remove} />
            ))}
          </AnimatePresence>
          <Link href="/products" className="flex items-center gap-2 text-sm text-gray-400 hover:text-violet-600 transition-colors mt-6">
            <ArrowLeft className="w-4 h-4" /> {c.continueShopping}
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-6 space-y-5 shadow-sm">
            <h2 className="font-bold text-lg text-gray-900">{c.summary}</h2>

            {/* Promo */}
            {!promoApplied ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={promoInput} onChange={(e) => { setPromoInput(e.target.value); setPromoError('') }}
                      placeholder={c.promo.placeholder}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" />
                  </div>
                  <Button size="sm" variant="secondary" onClick={handlePromo}>{c.promo.apply}</Button>
                </div>
                {promoError && <p className="text-xs text-red-500">{promoError}</p>}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
                <Tag className="w-4 h-4" /> {PROMO_CODE} — {c.promo.applied}
              </div>
            )}

            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-500"><span>{c.subtotal}</span><span>{formatPrice(sub)}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald-600"><span>{c.discount}</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between text-gray-500">
                <span>{c.shipping}</span>
                <span>{shipping === 0 ? <span className="text-emerald-600">{c.free}</span> : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-black text-lg pt-3 border-t border-gray-100">
                <span className="text-gray-900">{c.total}</span>
                <span className="text-violet-600">{formatPrice(tot)}</span>
              </div>
            </div>

            {sub < FREE_SHIPPING_THRESHOLD && sub > 0 && (
              <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 text-xs text-violet-700 text-center">
                {c.moreToBuy} <span className="font-bold">{formatPrice(FREE_SHIPPING_THRESHOLD - sub)}</span> {c.freeShipping} !
              </div>
            )}

            <Link href="/checkout"><Button size="lg" className="w-full">{c.checkout} <ArrowRight className="w-5 h-5" /></Button></Link>

            <div className="flex items-center justify-center gap-4 pt-2">
              {c.payments.map((p: string) => (
                <span key={p} className="text-xs text-gray-300 font-medium">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
