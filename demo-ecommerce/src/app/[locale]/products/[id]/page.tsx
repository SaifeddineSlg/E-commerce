import { getProductById, products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Star, Shield, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import ProductPageAnimations from "@/components/ProductPageAnimations";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  const t = await getTranslations("product");
  const tCat = await getTranslations("categories");

  const perks = [
    { Icon: Truck, label: "Livraison gratuite dès 50€" },
    { Icon: RotateCcw, label: "Retours sous 30 jours" },
    { Icon: Shield, label: "Paiement 100% sécurisé" },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fff0f5 100%)" }}>

      <ProductPageAnimations />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <Link href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-10 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Boutique
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-xl shadow-gray-200/60 border border-gray-100">
              <Image src={product.image} alt={product.name} fill className="object-cover" priority />
              {product.stock < 10 && (
                <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Plus que {product.stock} !
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-violet-400/20 blur-2xl rounded-full" />
          </div>

          {/* Info */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                {tCat(product.category as Parameters<typeof tCat>[0])}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                <span className="text-xs text-gray-400 ms-1 font-medium">(128)</span>
              </div>
            </div>

            <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
            <p className="text-gray-500 leading-relaxed text-base mb-8">{product.description}</p>

            {/* Price block */}
            <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm shadow-gray-200/60 border border-gray-100">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-black text-gray-900">{product.price.toFixed(2)}</span>
                <span className="text-2xl text-gray-300 mb-1.5">€</span>
              </div>
              <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse" />
                {product.stock} {t("inStock")}
              </p>
            </div>

            <AddToCartButton product={product} />

            {/* Perks */}
            <div className="mt-8 pt-8 border-t border-gray-100 space-y-3">
              {perks.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="w-8 h-8 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-gray-500" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
