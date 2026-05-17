'use client'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useLangStore } from '@/store/langStore'
import { useTranslatedProduct } from '@/lib/useTranslatedProducts'
import { formatPrice, generateOrderId } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Lock, CreditCard, Truck, CheckCircle, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { CartItem } from '@/types'

const CARDS = [
  { number: '4242 4242 4242 4242', label: 'Visa test' },
  { number: '5555 5555 5555 4444', label: 'MC test' },
]

function OrderItem({ item }: { item: CartItem }) {
  const translated = useTranslatedProduct(item.product.id)
  const name = translated?.name ?? item.product.name
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
        <Image src={item.product.images[0]} alt={name} fill className="object-cover" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 rounded-full text-[10px] font-bold text-white flex items-center justify-center">{item.quantity}</span>
      </div>
      <p className="text-sm flex-1 line-clamp-1 text-gray-700">{name}</p>
      <p className="font-semibold text-sm shrink-0 text-gray-900">{formatPrice(item.product.price * item.quantity)}</p>
    </div>
  )
}

export default function CheckoutPage() {
  const { items, total, subtotal, promoApplied, clear } = useCartStore()
  const { t } = useLangStore()
  const c = t.checkout
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cardError, setCardError] = useState(false)

  const sub = subtotal()
  const discount = promoApplied ? sub * 0.2 : 0
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99
  const tot = total() + shipping

  const [shipping_form, setShippingForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zip: '', country: 'France' })
  const [payment_form, setPaymentForm] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' })

  const formatCard = (v: string) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  const formatExpiry = (v: string) => {
    const clean = v.replace(/\D/g, '')
    return clean.length >= 2 ? clean.slice(0, 2) + '/' + clean.slice(2, 4) : clean
  }

  const handlePayment = async () => {
    setCardError(false)
    if (!payment_form.cardNumber || !payment_form.expiry || !payment_form.cvv || !payment_form.name) {
      setCardError(true)
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2200))
    clear()
    router.push(`/checkout/success?order=${generateOrderId()}`)
  }

  if (items.length === 0 && step < 2) {
    router.push('/cart')
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black mb-10 text-gray-900">{c.title}</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-12">
        {c.steps.map((s: string, i: number) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 text-sm font-semibold transition-colors ${i === step ? 'text-violet-600' : i < step ? 'text-emerald-600' : 'text-gray-300'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${i === step ? 'bg-violet-600 text-white' : i < step ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className="hidden sm:block">{s}</span>
            </div>
            {i < c.steps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Form area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 0: Shipping */}
            {step === 0 && (
              <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-5 h-5 text-violet-600" />
                  <h2 className="text-xl font-bold text-gray-900">{c.shipping.title}</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label={c.shipping.firstName} placeholder="Jean" value={shipping_form.firstName} onChange={(e) => setShippingForm({ ...shipping_form, firstName: e.target.value })} />
                  <Input label={c.shipping.lastName} placeholder="Dupont" value={shipping_form.lastName} onChange={(e) => setShippingForm({ ...shipping_form, lastName: e.target.value })} />
                  <Input label={c.shipping.email} type="email" placeholder="jean@email.com" value={shipping_form.email} onChange={(e) => setShippingForm({ ...shipping_form, email: e.target.value })} />
                  <Input label={c.shipping.phone} type="tel" placeholder="+33 6 12 34 56 78" value={shipping_form.phone} onChange={(e) => setShippingForm({ ...shipping_form, phone: e.target.value })} />
                </div>
                <Input label={c.shipping.address} placeholder="12 rue de la Paix" value={shipping_form.address} onChange={(e) => setShippingForm({ ...shipping_form, address: e.target.value })} />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label={c.shipping.city} placeholder="Paris" value={shipping_form.city} onChange={(e) => setShippingForm({ ...shipping_form, city: e.target.value })} />
                  <Input label={c.shipping.zip} placeholder="75001" value={shipping_form.zip} onChange={(e) => setShippingForm({ ...shipping_form, zip: e.target.value })} />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-600">{c.shipping.country}</label>
                    <select value={shipping_form.country} onChange={(e) => setShippingForm({ ...shipping_form, country: e.target.value })}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-violet-500 transition-colors">
                      {['France', 'Belgique', 'Suisse', 'Luxembourg', 'Canada'].map((ctry) => <option key={ctry}>{ctry}</option>)}
                    </select>
                  </div>
                </div>
                <Button size="lg" className="w-full" onClick={() => setStep(1)}>
                  {c.shipping.continue} <ChevronRight className="w-5 h-5" />
                </Button>
              </motion.div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-violet-600" />
                  <h2 className="text-xl font-bold text-gray-900">{c.payment.title}</h2>
                  <div className="ml-auto flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                    <Lock className="w-3.5 h-3.5" /> {c.payment.ssl}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-700 mb-1">{c.payment.demoTitle}</p>
                      {CARDS.map((card) => (
                        <p key={card.number} className="text-xs text-gray-500 font-mono">{card.number} <span className="text-gray-400">({card.label})</span></p>
                      ))}
                      <p className="text-xs text-gray-400 mt-1">{c.payment.demoNote}</p>
                    </div>
                  </div>
                </div>

                {/* Card visual */}
                <div className="relative bg-gradient-to-br from-violet-800 to-violet-950 rounded-2xl p-6 h-44 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="absolute top-4 right-6">
                    <div className="w-10 h-7 bg-yellow-400/80 rounded-md" />
                  </div>
                  <p className="absolute bottom-14 left-6 font-mono text-white/80 text-lg tracking-widest">
                    {payment_form.cardNumber || '•••• •••• •••• ••••'}
                  </p>
                  <div className="absolute bottom-5 left-6 right-6 flex justify-between">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider">Titulaire</p>
                      <p className="text-white font-semibold text-sm">{payment_form.name || 'VOTRE NOM'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-xs uppercase tracking-wider">Expire</p>
                      <p className="text-white font-semibold text-sm">{payment_form.expiry || 'MM/AA'}</p>
                    </div>
                  </div>
                </div>

                {cardError && (
                  <p className="text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {c.payment.error}
                  </p>
                )}

                <Input label={c.payment.cardNumber} placeholder="1234 5678 9012 3456"
                  value={payment_form.cardNumber}
                  onChange={(e) => setPaymentForm({ ...payment_form, cardNumber: formatCard(e.target.value) })}
                  icon={<CreditCard className="w-4 h-4" />}
                />
                <Input label={c.payment.cardName} placeholder="Jean Dupont"
                  value={payment_form.name}
                  onChange={(e) => setPaymentForm({ ...payment_form, name: e.target.value.toUpperCase() })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input label={c.payment.expiry} placeholder="MM/AA"
                    value={payment_form.expiry}
                    onChange={(e) => setPaymentForm({ ...payment_form, expiry: formatExpiry(e.target.value) })}
                  />
                  <Input label={c.payment.cvv} placeholder="123" maxLength={4}
                    value={payment_form.cvv}
                    onChange={(e) => setPaymentForm({ ...payment_form, cvv: e.target.value.replace(/\D/g, '') })}
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" className="flex-1" onClick={() => setStep(0)}>{c.payment.back}</Button>
                  <Button className="flex-1" size="lg" loading={loading} onClick={handlePayment}>
                    <Lock className="w-4 h-4" /> {c.payment.pay} {formatPrice(tot)}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-24 shadow-sm">
            <h2 className="font-bold mb-5 text-gray-900">{c.order}</h2>
            <div className="space-y-3 mb-5">
              {items.map((item) => <OrderItem key={item.product.id} item={item} />)}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>{t.cart.subtotal}</span><span>{formatPrice(sub)}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald-600"><span>{t.cart.discount}</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between text-gray-500">
                <span>{t.cart.shipping}</span>
                <span>{shipping === 0 ? <span className="text-emerald-600">{t.cart.free}</span> : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-black text-base pt-2 border-t border-gray-100">
                <span className="text-gray-900">{t.cart.total}</span><span className="text-violet-600">{formatPrice(tot)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
