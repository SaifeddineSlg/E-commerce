'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useMemo, useState, Suspense, useTransition } from 'react'
import { mockCategories } from '@/mock/categories'
import ProductCard from '@/components/products/ProductCard'
import { SlidersHorizontal, X, Search, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SortOption } from '@/types'
import { useLangStore } from '@/store/langStore'
import { useTranslatedProducts } from '@/lib/useTranslatedProducts'

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const { t } = useLangStore()
  const p = t.products
  const allProducts = useTranslatedProducts()

  const category = searchParams.get('category') || ''
  const search = searchParams.get('q') || ''

  const [sort, setSort] = useState<SortOption>('featured')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [localSearch, setLocalSearch] = useState(search)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'featured', label: p.sortOptions.featured },
    { value: 'price-asc', label: p.sortOptions['price-asc'] },
    { value: 'price-desc', label: p.sortOptions['price-desc'] },
    { value: 'rating', label: p.sortOptions.rating },
    { value: 'newest', label: p.sortOptions.newest },
  ]

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    startTransition(() => { router.push(`${pathname}?${params.toString()}`, { scroll: false }) })
  }

  const handleSearchSubmit = (e: React.FormEvent) => { e.preventDefault(); setParam('q', localSearch) }

  const filtered = useMemo(() => {
    let list = [...allProducts]
    if (search) list = list.filter((pr) =>
      pr.name.toLowerCase().includes(search.toLowerCase()) ||
      pr.description.toLowerCase().includes(search.toLowerCase())
    )
    // La catégorie filtre sur la clé originale (anglais) pour rester stable via l'URL
    if (category) list = list.filter((pr) => pr.category === category || pr.category.toLowerCase() === category.toLowerCase())
    list = list.filter((pr) => pr.price <= maxPrice)
    switch (sort) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      case 'rating': return list.sort((a, b) => b.rating - a.rating)
      case 'newest': return list.sort((a, b) => Number(b.id.split('-')[1]) - Number(a.id.split('-')[1]))
      default: return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }, [allProducts, search, category, sort, maxPrice])

  const title = category ? category : search ? `${p.searchResult} "${search}"` : p.title
  const countLabel = `${filtered.length} ${filtered.length === 1 ? p.found : p.foundPlural}`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500">{countLabel}</p>
      </div>

      {/* Search + sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} placeholder={t.search.placeholder}
            className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-10 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 shadow-sm transition-all" />
          {localSearch && (
            <button type="button" onClick={() => { setLocalSearch(''); setParam('q', '') }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-violet-500 shadow-sm cursor-pointer">
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 border rounded-xl px-4 py-3 text-sm font-medium shadow-sm transition-all ${filtersOpen ? 'bg-violet-600 text-white border-violet-600' : 'bg-white border-gray-200 text-gray-700 hover:border-violet-400'}`}>
          <SlidersHorizontal className="w-4 h-4" /> {p.filters}
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 grid sm:grid-cols-2 gap-8 shadow-sm">
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-4">{p.category}</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setParam('category', '')}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${!category ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {p.all}
                  </button>
                  {mockCategories.map((cat) => (
                    <button key={cat.id} onClick={() => setParam('category', cat.name)}
                      className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${category === cat.name ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-4">{p.maxPrice} : <span className="text-violet-600">{maxPrice}€</span></p>
                <input type="range" min={20} max={5000} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-violet-600" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0€</span><span>5000€</span></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filters */}
      {(category || search) && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-gray-500">{p.filtersActive}</span>
          {category && (
            <button onClick={() => setParam('category', '')}
              className="flex items-center gap-1.5 bg-violet-100 text-violet-700 text-sm px-3 py-1 rounded-full hover:bg-violet-200 transition-colors font-medium">
              {category} <X className="w-3 h-3" />
            </button>
          )}
          {search && (
            <button onClick={() => { setLocalSearch(''); setParam('q', '') }}
              className="flex items-center gap-1.5 bg-violet-100 text-violet-700 text-sm px-3 py-1 rounded-full hover:bg-violet-200 transition-colors font-medium">
              &quot;{search}&quot; <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Loading */}
      <AnimatePresence>
        {isPending && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 py-6 mb-4">
            <Loader2 className="w-5 h-5 text-violet-600 animate-spin" />
            <span className="text-sm text-gray-500 font-medium">{p.loading}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {!isPending && filtered.length > 0 ? (
          <motion.div key={`${search}-${category}-${sort}-${maxPrice}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((pr, i) => <ProductCard key={pr.id} product={pr} index={i} />)}
          </motion.div>
        ) : !isPending ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl font-bold text-gray-800 mb-2">{p.empty}</p>
            <p className="text-gray-400">{p.emptyDesc}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function ProductsPage() {
  return <Suspense><ProductsContent /></Suspense>
}
