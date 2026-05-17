import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
      {
        'bg-gray-100 text-gray-600': variant === 'default',
        'bg-emerald-50 text-emerald-700 border border-emerald-200': variant === 'success',
        'bg-yellow-50 text-yellow-700 border border-yellow-200': variant === 'warning',
        'bg-red-50 text-red-700 border border-red-200': variant === 'error',
        'bg-blue-50 text-blue-700 border border-blue-200': variant === 'info',
        'bg-violet-100 text-violet-700': variant === 'purple',
      },
      className
    )}>
      {children}
    </span>
  )
}
