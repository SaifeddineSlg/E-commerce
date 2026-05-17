"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("category") ?? undefined;
  const filtered = selected ? products.filter((p) => p.category === selected) : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {filtered.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
