import type { Category } from '@/types'

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Audio',
    slug: 'audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    productCount: 5,
    description: 'Casques, écouteurs et enceintes premium',
  },
  {
    id: 'cat-2',
    name: 'Wearables',
    slug: 'wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    productCount: 4,
    description: 'Montres connectées et trackers fitness',
  },
  {
    id: 'cat-3',
    name: 'Smart Home',
    slug: 'smart-home',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80',
    productCount: 4,
    description: 'Automatisez votre maison intelligemment',
  },
  {
    id: 'cat-4',
    name: 'Photography',
    slug: 'photography',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
    productCount: 3,
    description: 'Appareils photo et accessoires',
  },
  {
    id: 'cat-5',
    name: 'Computing',
    slug: 'computing',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    productCount: 3,
    description: 'Laptops, tablettes et périphériques',
  },
  {
    id: 'cat-6',
    name: 'Gaming',
    slug: 'gaming',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80',
    productCount: 3,
    description: 'Consoles, manettes et accessoires gaming',
  },
]
