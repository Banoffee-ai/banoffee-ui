import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const trackVariants = cva('w-full rounded-full bg-[var(--color-soft)] overflow-hidden', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-1.5',
      lg: 'h-2.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const fillColorMap = {
  caramel: 'bg-[var(--color-caramel)]',
  green: 'bg-[var(--color-status-green)]',
  blue: 'bg-[var(--color-status-blue)]',
} as const

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof trackVariants> {
  value: number
  label?: string
  showValue?: boolean
  color?: 'caramel' | 'green' | 'blue'
  animated?: boolean
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { className, value, label, showValue, size, color = 'caramel', animated = false, ...props },
    ref
  ) => {
    const clampedValue = Math.max(0, Math.min(100, value))

    return (
      <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="text-[length:0.76rem] font-semibold text-[var(--color-muted)]">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-[length:0.76rem] font-bold text-[var(--color-caramel)]">
                {clampedValue}%
              </span>
            )}
          </div>
        )}
        <div
          className={trackVariants({ size })}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={cn(
              'h-full rounded-full transition-[width] duration-500 ease-out',
              fillColorMap[color],
              animated && 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]'
            )}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'
