import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface ProcessStepProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step number, e.g. "01" */
  number: string
  /** Step title */
  title: string
  /** Step description */
  body: string
  /** Surface context */
  surface?: 'dark' | 'light'
  /** If true, no bottom border */
  isLast?: boolean
}

export const ProcessStep = forwardRef<HTMLDivElement, ProcessStepProps>(
  ({ className, number, title, body, surface = 'light', isLast = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-[72px_1fr] gap-8 py-8',
        'transition-all duration-250',
        'hover:pl-2',
        !isLast && (surface === 'dark'
          ? 'border-b border-[var(--color-border-dark)]'
          : 'border-b border-[var(--color-border-light)]'),
        'group',
        className
      )}
      {...props}
    >
      {/* Number */}
      <span
        className={cn(
          'text-[3rem] font-[800] leading-none transition-colors duration-250',
          surface === 'dark'
            ? 'text-[var(--color-dark-3)] group-hover:text-[var(--color-toffee)]'
            : 'text-[var(--color-soft)] group-hover:text-[var(--color-toffee)]'
        )}
      >
        {number}
      </span>

      {/* Content */}
      <div>
        <h3
          className={cn(
            'text-[1.05rem] font-bold',
            surface === 'dark' ? 'text-[var(--color-cream)]' : 'text-[var(--color-espresso)]'
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'mt-2 text-[0.84rem] leading-[1.74]',
            surface === 'dark' ? 'text-[var(--color-cream-dim)]' : 'text-[var(--color-muted)]'
          )}
        >
          {body}
        </p>
      </div>
    </div>
  )
)

ProcessStep.displayName = 'ProcessStep'
