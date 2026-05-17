import { useLangStore } from '@/store/langStore'
import { mockProducts } from '@/mock/products'
import { useAdminStore } from '@/store/adminStore'
import { productTranslations, categoryNames } from './productTranslations'
import type { Product } from '@/types'
import type { Locale } from './translations'

function translateProduct(product: Product, locale: Locale): Product {
  const trans = productTranslations[product.id]
  const catTranslated = categoryNames[product.category]?.[locale] ?? product.category

  if (!trans) return { ...product, category: catTranslated }

  return {
    ...product,
    name: trans[locale]?.name ?? product.name,
    description: trans[locale]?.description ?? product.description,
    longDescription: trans[locale]?.longDescription ?? product.longDescription,
    category: catTranslated,
  }
}

// Hook pour la vitrine (données mock)
export function useTranslatedProducts() {
  const { locale } = useLangStore()
  return mockProducts.map((p) => translateProduct(p, locale))
}

// Hook pour l'admin (données du store — inclut les ajouts CRUD)
export function useTranslatedAdminProducts() {
  const { locale } = useLangStore()
  const { products } = useAdminStore()
  return products.map((p) => translateProduct(p, locale))
}

// Fonction utilitaire pour un seul produit
export function useTranslatedProduct(id: string): Product | undefined {
  const { locale } = useLangStore()
  const { products } = useAdminStore()
  const product = products.find((p) => p.id === id)
  if (!product) return undefined
  return translateProduct(product, locale)
}
