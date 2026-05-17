"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();
  const t = useTranslations("product");
  const tCat = useTranslations("categories");
  const locale = useLocale();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:shadow-black/8 transition-all duration-500"
    >
      {/* Image */}
      <Link href={`/${locale}/products/${product.id}`} className="block relative h-56 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5"
          >
            <Eye size={13} /> Voir le produit
          </motion.div>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {tCat(product.category as Parameters<typeof tCat>[0])}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/${locale}/products/${product.id}`}>
          <h2 className="font-bold text-gray-900 text-base leading-snug hover:text-gray-600 transition-colors line-clamp-1">
            {product.name}
          </h2>
        </Link>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-xl font-black text-gray-900">{product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-400 ml-1">€</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              added
                ? "bg-green-500 text-white"
                : "bg-gray-950 text-white hover:bg-gray-700"
            }`}
          >
            <ShoppingBag size={14} />
            {added ? "✓" : t("addToCart")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
