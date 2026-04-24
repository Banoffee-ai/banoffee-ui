import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const dividerVariants = cva('', {
  variants: {
    variant: {
      solid: 'border-[var(--color-border-light)]',
      gradient: '',
      dark: 'border-[var(--color-border-dark)]',
    },
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
  },
  defaultVariants: {
    variant: 'solid',
    orientation: 'horizontal',
  },
})

export interface DividerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof dividerVariants> {}

export const Divider = forwardRef<HTMLElement, DividerProps>(
  ({ className, variant = 'solid', orientation = 'horizontal', ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            'inline-block self-stretch',
            variant === 'gradient'
              ? 'w-px bg-gradient-to-b from-transparent via-[var(--color-border-dark)] to-transparent'
              : cn('w-px', variant === 'dark' ? 'bg-[var(--color-border-dark)]' : 'bg-[var(--color-border-light)]'),
            dividerVariants({ variant, orientation }),
            className
          )}
          {...props}
        />
      )
    }

    if (variant === 'gradient') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="horizontal"
          className={cn(
            'w-full h-px',
            'bg-gradient-to-r from-transparent via-[var(--color-border-dark)] to-transparent',
            className
          )}
          {...props}
        />
      )
    }

    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        className={cn(
          'border-t',
          dividerVariants({ variant, orientation }),
          className
        )}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'
