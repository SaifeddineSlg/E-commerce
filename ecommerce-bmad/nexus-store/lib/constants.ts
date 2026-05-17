export const SITE_NAME = 'NEXUS Store'
export const SITE_TAGLINE = 'The future, delivered.'
export const ADMIN_EMAIL = 'admin@nexus.store'
export const ADMIN_PASSWORD = 'admin123'

export const PROMO_CODE = 'NEXUS20'
export const PROMO_DISCOUNT = 0.2

export const FREE_SHIPPING_THRESHOLD = 100

export const CATEGORIES = [
  'Audio',
  'Wearables',
  'Smart Home',
  'Photography',
  'Computing',
  'Gaming',
] as const

export const ORDER_STATUSES = {
  pending: { label: 'En attente', color: 'yellow' },
  processing: { label: 'En cours', color: 'blue' },
  shipped: { label: 'Expédié', color: 'purple' },
  delivered: { label: 'Livré', color: 'green' },
  cancelled: { label: 'Annulé', color: 'red' },
} as const
