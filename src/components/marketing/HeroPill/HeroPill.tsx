import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const dotColorMap: Record<string, string> = {
  green: 'bg-[var(--color-status-green)]',
  blue: 'bg-[var(--color-status-blue)]',
  caramel: 'bg-[var(--color-caramel)]',
}

export interface HeroPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string
  /** Dot colour */
  dotColor?: 'green' | 'blue' | 'caramel'
  /** Whether the dot pulses */
  animate?: boolean
}

export const HeroPill = forwardRef<HTMLSpanElement, HeroPillProps>(
  ({ className, children, dotColor = 'green', animate = true, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2',
        'rounded-pill px-4 py-1.5',
        'bg-[var(--color-caramel)]/10',
        'border border-[var(--color-caramel)]/26',
        'text-[var(--color-gold)]',
        'uppercase tracking-[0.06em] font-semibold',
        'text-[length:var(--font-size-eyebrow)]',
        'select-none',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block w-1.5 h-1.5 rounded-full',
          animate && 'bn-animate-pulse',
          dotColorMap[dotColor]
        )}
        aria-hidden="true"
      />
      {children}
    </span>
  )
)

HeroPill.displayName = 'HeroPill'
