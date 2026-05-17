'use client'
import { notFound } from 'next/navigation'
import { mockReviews } from '@/mock/reviews'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useLangStore } from '@/store/langStore'
import { useTranslatedProduct, useTranslatedProducts } from '@/lib/useTranslatedProducts'
import { formatPrice, getDiscountPercent } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Shield, Truck, RotateCcw, ChevronRight, Minus, Plus, Heart, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProductCard from '@/components/products/ProductCard'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = useTranslatedProduct(id)
  const { t } = useLangStore()
  const pd = t.product
  const allProducts = useTranslatedProducts()

  if (!product) notFound()

  const reviews = mockReviews.filter((r) => r.productId === id)
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice ? getDiscountPercent(product.price, product.originalPrice) : null

  const { add, openCart } = useCartStore()
  const { addToast } = useUIStore()
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [wished, setWished] = useState(false)

  const handleAdd = () => {
    add(product, qty)
    addToast(`${product.name} ${t.cart.promo.applied}`, 'success')
    setTimeout(() => openCart(), 200)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
        <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/products" className="hover:text-violet-600 transition-colors">{t.nav.products}</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/products?category=${product.category}`} className="hover:text-violet-600 transition-colors">{product.category}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-700 truncate max-w-xs font-medium">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-14 mb-20">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 mb-4 border border-gray-100">
            <Image src={product.images[activeImg]} alt={product.name} fill className="object-cover" priority />
            {discount && (
              <div className="absolute top-5 left-5 bg-emerald-500 text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-md">
                -{discount}%
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-violet-500 shadow-md shadow-violet-200' : 'border-transparent opacity-50 hover:opacity-75'}`}>
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <Badge variant="purple" className="mb-3">{product.category}</Badge>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight text-gray-900">{product.name}</h1>
            </div>
            <button onClick={() => setWished(!wished)}
              className={`p-3 rounded-2xl border transition-all shrink-0 ${wished ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-700'}`}>
              <Heart className={`w-5 h-5 ${wished ? 'fill-red-400' : ''}`} />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
              ))}
            </div>
            <span className="font-bold text-gray-900">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString('fr-FR')} {pd.reviews.toLowerCase()})</span>
            {product.tags.includes('bestseller') && (
              <Badge variant="warning"><Zap className="w-3 h-3 inline mr-1" />{pd.bestseller}</Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-black text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && <span className="text-xl text-gray-300 line-through">{formatPrice(product.originalPrice)}</span>}
            {discount && <Badge variant="success">-{discount}%</Badge>}
          </div>

          <p className="text-gray-500 leading-relaxed mb-8">{product.longDescription}</p>

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8">
              <h3 className="font-semibold text-sm mb-4 text-gray-600">{pd.specs}</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs text-gray-400">{k}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <>
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span className="text-sm text-emerald-600 font-semibold">
                  {product.stock < 20 ? `${pd.lastUnits} ${product.stock} ${pd.fewLeft}` : pd.inStock}
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-red-400 rounded-full" />
                <span className="text-sm text-red-500 font-semibold">{pd.outOfStock}</span>
              </>
            )}
          </div>

          {/* Qty + Add */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-gray-900">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button size="lg" className="flex-1" onClick={handleAdd} disabled={product.stock === 0}>
              <ShoppingCart className="w-5 h-5" />
              {pd.addToCart} — {formatPrice(product.price * qty)}
            </Button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: pd.shipping, sub: pd.shippingDesc },
              { icon: Shield, label: pd.warranty, sub: pd.warrantyDesc },
              { icon: RotateCcw, label: pd.returns, sub: pd.returnsDesc },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                <Icon className="w-5 h-5 text-violet-600" />
                <p className="text-xs font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-black text-gray-900 mb-8">{pd.reviews} ({reviews.length})</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Image src={r.avatar} alt={r.author} width={36} height={36} className="rounded-full" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{r.author}</p>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  {r.verified && <Badge variant="success" className="ml-auto">{pd.verified}</Badge>}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{r.comment}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8">{pd.related}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  )
}
