'use client'
import { useState } from 'react'
import { useAdminStore } from '@/store/adminStore'
import { useUIStore } from '@/store/uiStore'
import { useLangStore } from '@/store/langStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Search, Star, Package, X, Check } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import type { Product } from '@/types'
import { mockCategories } from '@/mock/categories'

type FormData = {
  name: string; description: string; longDescription: string; price: string; originalPrice: string;
  category: string; stock: string; featured: boolean; tags: string; images: string
}

const emptyForm: FormData = {
  name: '', description: '', longDescription: '', price: '', originalPrice: '',
  category: 'Audio', stock: '', featured: false, tags: '', images: ''
}

function ProductForm({ initial, onSave, onClose, labels }: {
  initial?: FormData
  onSave: (data: FormData) => void
  onClose: () => void
  labels: { nameLabel: string; desc: string; longDesc: string; price: string; originalPrice: string; stock: string; image: string; tags: string; featured: string; save: string; cancel: string }
}) {
  const [form, setForm] = useState<FormData>(initial ?? emptyForm)
  const set = (key: keyof FormData, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }))

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label={labels.nameLabel} placeholder="NexusAir Pro" value={form.name} onChange={(e) => set('name', e.target.value)} />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Catégorie</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-violet-500 transition-colors">
            {mockCategories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>
      <Input label={labels.desc} placeholder="Un produit incroyable..." value={form.description} onChange={(e) => set('description', e.target.value)} />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">{labels.longDesc}</label>
        <textarea value={form.longDescription} onChange={(e) => set('longDescription', e.target.value)}
          rows={3} placeholder="Description détaillée..."
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500 transition-colors resize-none" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input label={labels.price} type="number" placeholder="299" value={form.price} onChange={(e) => set('price', e.target.value)} />
        <Input label={labels.originalPrice} type="number" placeholder="399" value={form.originalPrice} onChange={(e) => set('originalPrice', e.target.value)} />
        <Input label={labels.stock} type="number" placeholder="50" value={form.stock} onChange={(e) => set('stock', e.target.value)} />
      </div>
      <Input label={labels.image} placeholder="https://images.unsplash.com/..." value={form.images} onChange={(e) => set('images', e.target.value)} />
      <Input label={labels.tags} placeholder="wireless, premium, bestseller" value={form.tags} onChange={(e) => set('tags', e.target.value)} />
      <label className="flex items-center gap-3 cursor-pointer">
        <div onClick={() => set('featured', !form.featured)}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${form.featured ? 'bg-violet-600 border-violet-600' : 'border-gray-300'}`}>
          {form.featured && <Check className="w-3 h-3 text-white" />}
        </div>
        <span className="text-sm font-medium text-gray-700">{labels.featured}</span>
      </label>
      <div className="flex gap-3 pt-2">
        <Button variant="secondary" className="flex-1" onClick={onClose}>{labels.cancel}</Button>
        <Button className="flex-1" onClick={() => onSave(form)}>
          <Check className="w-4 h-4" /> {labels.save}
        </Button>
      </div>
    </div>
  )
}

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdminStore()
  const { addToast } = useUIStore()
  const { t } = useLangStore()
  const a = t.admin
  const pp = a.productsPage
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Product | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (form: FormData) => {
    const data = {
      name: form.name,
      description: form.description,
      longDescription: form.longDescription || form.description,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      category: form.category,
      stock: Number(form.stock),
      images: form.images ? [form.images] : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
      featured: form.featured,
      tags: form.tags.split(',').map((tg) => tg.trim()).filter(Boolean),
    }
    if (editTarget) {
      updateProduct(editTarget.id, data)
      addToast(a.form.editTitle, 'success')
    } else {
      addProduct(data)
      addToast(a.form.addTitle, 'success')
    }
    setModalOpen(false)
    setEditTarget(null)
  }

  const handleDelete = (id: string) => {
    deleteProduct(id)
    addToast(a.delete.title, 'info')
    setDeleteId(null)
  }

  const openEdit = (p: Product) => { setEditTarget(p); setModalOpen(true) }
  const openAdd = () => { setEditTarget(null); setModalOpen(true) }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{pp.title}</h1>
          <p className="text-gray-400 text-sm mt-1">{products.length} {pp.total}</p>
        </div>
        <Button onClick={openAdd}><Plus className="w-4 h-4" /> {pp.add}</Button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={pp.search}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500 transition-colors" />
        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-4 font-medium">Produit</th>
                <th className="px-6 py-4 font-medium">Catégorie</th>
                <th className="px-6 py-4 font-medium">Prix</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Note</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filtered.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 truncate max-w-[180px]">{product.name}</p>
                          {product.featured && <Badge variant="purple" className="mt-0.5">{pp.featured}</Badge>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.category}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                      {product.originalPrice && <span className="text-gray-300 line-through text-xs ml-2">{formatPrice(product.originalPrice)}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${product.stock < 20 ? 'text-orange-500' : product.stock === 0 ? 'text-red-500' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-gray-900">{product.rating > 0 ? product.rating : '—'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={product.stock > 0 ? 'success' : 'error'}>
                        {product.stock > 0 ? pp.inStock : pp.outOfStock}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(product)}
                          className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteId(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="w-12 h-12 text-gray-200 mb-3" />
              <p className="text-gray-400">{a.ordersPage.noOrders}</p>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditTarget(null) }}
        title={editTarget ? a.form.editTitle : a.form.addTitle}
        size="lg">
        <ProductForm
          labels={a.form}
          initial={editTarget ? {
            name: editTarget.name, description: editTarget.description,
            longDescription: editTarget.longDescription, price: String(editTarget.price),
            originalPrice: editTarget.originalPrice ? String(editTarget.originalPrice) : '',
            category: editTarget.category, stock: String(editTarget.stock),
            featured: editTarget.featured, tags: editTarget.tags.join(', '),
            images: editTarget.images[0] || ''
          } : undefined}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditTarget(null) }}
        />
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title={a.delete.title} size="sm">
        <p className="text-gray-400 text-sm mb-6">{a.delete.desc}</p>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteId(null)}>{a.delete.cancel}</Button>
          <Button variant="danger" className="flex-1" onClick={() => deleteId && handleDelete(deleteId)}>
            <Trash2 className="w-4 h-4" /> {a.delete.confirm}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
