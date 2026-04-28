import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const statusBadgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'rounded-pill px-2.5 py-0.5',
    'text-[0.65rem] font-bold',
    'select-none',
  ].join(' '),
  {
    variants: {
      status: {
        active: 'bg-[var(--color-status-green)]/10 text-[var(--color-status-green)]',
        dev: 'bg-[var(--color-caramel)]/10 text-[var(--color-caramel)]',
        explore: 'bg-[var(--color-status-blue)]/10 text-[var(--color-status-blue)]',
        warning: 'bg-[var(--color-banana)]/10 text-[var(--color-toffee)]',
        error: 'bg-[var(--color-status-red)]/10 text-[var(--color-status-red)]',
        idle: 'bg-[var(--color-muted)]/10 text-[var(--color-muted)]',
      },
    },
    defaultVariants: {
      status: 'active',
    },
  }
)

const dotColorMap: Record<string, string> = {
  active: 'bg-[var(--color-status-green)]',
  dev: 'bg-[var(--color-caramel)]',
  explore: 'bg-[var(--color-status-blue)]',
  warning: 'bg-[var(--color-banana)]',
  error: 'bg-[var(--color-status-red)]',
  idle: 'bg-[var(--color-muted)]',
}

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status = 'active', children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    >
      <span
        className={cn('inline-block w-1 h-1 rounded-full', dotColorMap[status ?? 'active'])}
        aria-hidden="true"
      />
      {children}
    </span>
  )
)

StatusBadge.displayName = 'StatusBadge'
