"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("cart");
  const locale = useLocale();

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const { url } = await res.json();
    window.location.href = url;
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">{t("empty")}</h2>
        <p className="text-gray-400 mt-2 mb-8">Ajoutez des produits pour commencer</p>
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
          <ArrowLeft size={16} /> {t("continueShopping")}
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black text-gray-900 mb-10"
        >
          {t("title")}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40, height: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center hover:shadow-md transition-shadow"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{item.price.toFixed(2)} € / unité</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 font-bold">−</button>
                      <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 font-bold">+</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <p className="font-black text-gray-900 text-lg">{(item.price * item.quantity).toFixed(2)} €</p>
                    <button onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-950 rounded-3xl p-6 h-fit text-white sticky top-24"
          >
            <h3 className="font-bold text-lg mb-6">Résumé</h3>
            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>Sous-total</span><span>{total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-6">
              <span>Livraison</span><span className="text-green-400">Gratuite</span>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between font-black text-xl mb-6">
              <span>{t("total")}</span><span>{total.toFixed(2)} €</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-white text-gray-900 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin" />{t("redirecting")}</>
              ) : (
                <>{t("checkout")} →</>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
