'use client'
import type { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatPrice, getDiscountPercent } from '@/lib/utils'
import { ShoppingCart, Star, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { add, openCart } = useCartStore()
  const { addToast } = useUIStore()
  const [adding, setAdding] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    add(product)
    addToast(`${product.name} ajouté au panier`, 'success')
    setTimeout(() => setAdding(false), 600)
    setTimeout(() => openCart(), 300)
  }

  const discount = product.originalPrice ? getDiscountPercent(product.price, product.originalPrice) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60 transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.featured && (
                <span className="flex items-center gap-1 bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                  <Zap className="w-3 h-3" /> Populaire
                </span>
              )}
              {discount && (
                <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                  -{discount}%
                </span>
              )}
            </div>
            {product.stock < 20 && product.stock > 0 && (
              <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                Plus que {product.stock}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-violet-600 font-semibold mb-1">{product.category}</p>
            <h3 className="font-semibold text-sm text-gray-900 leading-snug mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                ))}
              </div>
              <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString('fr-FR')})</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-black text-lg text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <motion.button
                onClick={handleAdd}
                whileTap={{ scale: 0.9 }}
                animate={adding ? { scale: [1, 1.2, 1] } : {}}
                className="w-9 h-9 bg-violet-600 hover:bg-violet-700 rounded-xl flex items-center justify-center transition-colors shadow-md shadow-violet-200"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
