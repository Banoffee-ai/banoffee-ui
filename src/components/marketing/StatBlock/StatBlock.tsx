import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The stat value, e.g. "8+" or "100%" */
  value: string
  /** Description label */
  label: string
  /** Surface context */
  surface?: 'dark' | 'light'
}

export const StatBlock = forwardRef<HTMLDivElement, StatBlockProps>(
  ({ className, value, label, surface = 'dark', ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col', className)} {...props}>
      <span
        className={cn(
          'text-[2.2rem] font-[800] leading-tight tracking-tight',
          surface === 'dark' ? 'text-[var(--color-gold)]' : 'text-[var(--color-caramel)]'
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          'text-[0.76rem] font-medium leading-[1.45] mt-1',
          surface === 'dark' ? 'text-[var(--color-cream-dim)]' : 'text-[var(--color-muted)]'
        )}
      >
        {label}
      </span>
    </div>
  )
)

StatBlock.displayName = 'StatBlock'
