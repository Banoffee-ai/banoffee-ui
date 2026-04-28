import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string
  title: string
  description?: string
  action?: React.ReactNode
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon = '📭', title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col items-center justify-center gap-3 py-16', className)}
      {...props}
    >
      <span className="text-[length:2.5rem] opacity-30" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-[length:1rem] font-bold text-[var(--color-espresso)]">{title}</h3>
      {description && (
        <p className="text-[length:0.84rem] text-[var(--color-muted)] max-w-[32ch] text-center">
          {description}
        </p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
)

EmptyState.displayName = 'EmptyState'
