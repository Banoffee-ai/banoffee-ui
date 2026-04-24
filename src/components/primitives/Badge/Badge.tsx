import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'rounded-pill px-3 py-1',
    'font-bold uppercase tracking-[0.2em]',
    'text-[length:var(--font-size-eyebrow)]',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        dev: 'bg-[var(--color-status-green)]/10 text-[var(--color-status-green)]',
        explore: 'bg-[var(--color-status-blue)]/10 text-[var(--color-status-blue)]',
        pilot: 'bg-[var(--color-caramel)]/10 text-[var(--color-caramel)]',
        open: 'bg-[var(--color-gold)]/10 text-[var(--color-toffee)]',
        error: 'bg-[var(--color-status-red)]/10 text-[var(--color-status-red)]',
      },
    },
    defaultVariants: {
      variant: 'dev',
    },
  }
)

const dotColorMap: Record<string, string> = {
  dev: 'bg-[var(--color-status-green)]',
  explore: 'bg-[var(--color-status-blue)]',
  pilot: 'bg-[var(--color-caramel)]',
  open: 'bg-[var(--color-gold)]',
  error: 'bg-[var(--color-status-red)]',
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show animated pulsing dot */
  showDot?: boolean
  children: React.ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'dev', showDot = true, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            'inline-block w-1.5 h-1.5 rounded-full bn-animate-pulse',
            dotColorMap[variant ?? 'dev']
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
)

Badge.displayName = 'Badge'
