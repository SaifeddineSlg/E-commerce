"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const t = useTranslations("product");
  const [added, setAdded] = useState(false);

  function handle() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handle}
      className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg ${
        added
          ? "bg-emerald-500 text-white shadow-emerald-200"
          : "bg-gray-900 text-white hover:bg-gray-700 shadow-gray-900/20"
      }`}
    >
      <ShoppingBag size={18} />
      {added ? "✓ Ajouté !" : t("addToCart")}
    </motion.button>
  );
}
