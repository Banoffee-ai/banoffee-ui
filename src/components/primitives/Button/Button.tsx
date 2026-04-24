import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-bold rounded-pill',
    'transition-all duration-150 cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--color-caramel)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-caramel)] text-white',
          'shadow-[var(--shadow-btn)]',
          'hover:bg-[var(--color-caramel-lt)]',
          'hover:-translate-y-0.5',
          'hover:shadow-[var(--shadow-btn-hover)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--color-muted)]',
          'border border-[var(--color-border-light)]',
          'hover:border-[var(--color-caramel)]',
          'hover:text-[var(--color-caramel)]',
        ].join(' '),
        'ghost-light': [
          'bg-transparent text-[var(--color-cream-dim)]',
          'border border-[var(--color-border-dark)]',
          'hover:border-[var(--color-caramel)]',
          'hover:text-[var(--color-gold)]',
        ].join(' '),
        dark: [
          'bg-[var(--color-espresso)] text-[var(--color-banana)]',
          'shadow-md',
          'hover:-translate-y-0.5',
          'hover:shadow-lg',
        ].join(' '),
        nav: [
          'bg-[var(--color-caramel)] text-white',
          'shadow-sm',
          'hover:bg-[var(--color-caramel-lt)]',
          'hover:-translate-y-px',
        ].join(' '),
      },
      size: {
        sm: 'text-xs px-4 py-2 tracking-wide',
        md: 'text-sm px-8 py-3.5',
        lg: 'text-base px-10 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element (e.g. for wrapping anchor tags) */
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild: _asChild, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)

Button.displayName = 'Button'
