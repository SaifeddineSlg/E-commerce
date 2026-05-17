'use client'
import { useCartStore } from '@/store/cartStore'
import { useLangStore } from '@/store/langStore'
import { useTranslatedProduct } from '@/lib/useTranslatedProducts'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { PROMO_CODE, FREE_SHIPPING_THRESHOLD } from '@/lib/constants'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import type { CartItem } from '@/types'

// Sous-composant pour un item traduit
function CartItemRow({ item, onUpdate, onRemove }: {
  item: CartItem
  onUpdate: (id: string, qty: number) => void
  onRemove: (id: string) => void
}) {
  const translated = useTranslatedProduct(item.product.id)
  const name = translated?.name ?? item.product.name

  return (
    <motion.div layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 shadow-sm">
        <Image src={item.product.images[0]} alt={name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-900 truncate">{name}</p>
        <p className="text-violet-600 font-bold text-sm mt-0.5">{formatPrice(item.product.price)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => onUpdate(item.product.id, item.quantity - 1)}
            className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-violet-400 transition-colors">
            <Minus className="w-3 h-3 text-gray-600" />
          </button>
          <span className="text-sm font-bold w-6 text-center text-gray-900">{item.quantity}</span>
          <button onClick={() => onUpdate(item.product.id, item.quantity + 1)}
            className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-violet-400 transition-colors">
            <Plus className="w-3 h-3 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button onClick={() => onRemove(item.product.id)} className="text-gray-300 hover:text-red-500 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
        <span className="font-bold text-sm text-gray-900">{formatPrice(item.product.price * item.quantity)}</span>
      </div>
    </motion.div>
  )
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, remove, updateQty, total, subtotal, promoApplied, applyPromo } = useCartStore()
  const { t } = useLangStore()
  const c = t.cart
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')

  const sub = subtotal()
  const tot = total()
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99
  const discount = promoApplied ? sub * 0.2 : 0

  const handlePromo = () => {
    if (promoInput.toUpperCase() === PROMO_CODE) { applyPromo(); setPromoError('') }
    else setPromoError(c.promo.invalid)
  }

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart} className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-gray-100 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-violet-600" />
                <span className="font-bold text-lg text-gray-900">{c.title}</span>
                {totalItems > 0 && (
                  <span className="bg-violet-100 text-violet-600 text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
                )}
              </div>
              <button onClick={closeCart} className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-gray-400">{c.empty}</p>
                    <Button size="sm" variant="outline" onClick={closeCart}>
                      <Link href="/products">{c.browse}</Link>
                    </Button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <CartItemRow key={item.product.id} item={item} onUpdate={updateQty} onRemove={remove} />
                  ))
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50">
                {!promoApplied ? (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input value={promoInput} onChange={(e) => { setPromoInput(e.target.value); setPromoError('') }}
                        placeholder={c.promo.placeholder}
                        className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" />
                    </div>
                    <Button size="sm" variant="secondary" onClick={handlePromo}>{c.promo.apply}</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                    <Tag className="w-4 h-4" /> {PROMO_CODE} — {c.promo.applied}
                  </div>
                )}
                {promoError && <p className="text-red-500 text-xs -mt-2">{promoError}</p>}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500"><span>{c.subtotal}</span><span>{formatPrice(sub)}</span></div>
                  {discount > 0 && <div className="flex justify-between text-emerald-600"><span>{c.discount}</span><span>-{formatPrice(discount)}</span></div>}
                  <div className="flex justify-between text-gray-500">
                    <span>{c.shipping}</span>
                    <span>{shipping === 0 ? <span className="text-emerald-600">{c.free}</span> : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                    <span className="text-gray-900">{c.total}</span>
                    <span className="text-violet-600">{formatPrice(tot + shipping)}</span>
                  </div>
                </div>

                {sub < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-gray-400 text-center">
                    {c.moreToBuy} <span className="text-violet-600 font-semibold">{formatPrice(FREE_SHIPPING_THRESHOLD - sub)}</span> {c.freeShipping}
                  </p>
                )}
                <Link href="/checkout" onClick={closeCart}>
                  <Button className="w-full" size="lg">{c.checkout} <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <Link href="/cart" onClick={closeCart}>
                  <button className="w-full text-center text-sm text-gray-400 hover:text-gray-700 transition-colors py-1">{c.viewCart}</button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
