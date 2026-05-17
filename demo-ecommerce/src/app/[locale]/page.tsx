import { categories } from "@/lib/products";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Hero from "@/components/Hero";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen">
      <Hero />
      <section id="products" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-black text-gray-900">{t("title")}</h2>
          <CategoryFilter categories={categories} />
        </div>
        <Suspense>
          <ProductGrid />
        </Suspense>
      </section>
    </div>
  );
}
