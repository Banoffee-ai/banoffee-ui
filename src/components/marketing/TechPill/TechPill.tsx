import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface TechPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string
  /** Surface context */
  surface?: 'dark' | 'light'
}

export const TechPill = forwardRef<HTMLSpanElement, TechPillProps>(
  ({ className, children, surface = 'dark', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-block rounded-pill px-3 py-1',
        'text-[0.7rem] font-semibold tracking-[0.06em] whitespace-nowrap',
        'border',
        surface === 'dark'
          ? 'bg-[var(--color-espresso)] text-[var(--color-cream-dim)] border-[var(--color-border-dark)]'
          : 'bg-[var(--color-soft)] text-[var(--color-muted)] border-[var(--color-border-light)]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
)

TechPill.displayName = 'TechPill'
