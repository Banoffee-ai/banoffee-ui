import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const inputVariants = cva(
  [
    'w-full rounded-[var(--radius-sm)] px-4 py-3',
    'font-[family-name:var(--font-family-sans)]',
    'text-[length:var(--font-size-body)]',
    'transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'placeholder:text-[var(--color-muted)]/60',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--color-warm-white)]',
          'border border-[var(--color-border-light)]',
          'text-[var(--color-espresso)]',
          'focus:border-[var(--color-caramel)]',
        ].join(' '),
        dark: [
          'bg-[var(--color-dark-3)]',
          'border border-[var(--color-border-dark)]',
          'text-[var(--color-cream)]',
          'focus:border-[var(--color-caramel)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Label displayed above the input */
  label?: string
  /** Error message displayed below the input */
  error?: string
  /** Hint text displayed below the input */
  hint?: string
  /** Icon slot on the left side */
  leftIcon?: React.ReactNode
  /** Icon slot on the right side */
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block mb-1.5',
              'text-[length:var(--font-size-xs)] font-semibold',
              'text-[var(--color-muted)]'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant }),
              error && 'border-[var(--color-status-red)] focus:ring-[var(--color-status-red)]/40',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-[length:var(--font-size-xs)] text-[var(--color-status-red)]"
          >
            {error}
          </p>
        )}
        {!error && hint && (
          <p
            id={`${inputId}-hint`}
            className="mt-1 text-[length:var(--font-size-xs)] text-[var(--color-muted)]/70"
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
