import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const selectVariants = cva(
  [
    'w-full rounded-[var(--radius-sm)] px-4 py-3 pr-10',
    'font-[family-name:var(--font-family-sans)]',
    'text-[length:var(--font-size-body)]',
    'transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'appearance-none cursor-pointer',
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

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  /** Options to render */
  options: SelectOption[]
  /** Label displayed above the select */
  label?: string
  /** Placeholder option text */
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, options, label, placeholder, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
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
          <select
            ref={ref}
            id={selectId}
            className={cn(selectVariants({ variant }), className)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'pointer-events-none',
              'text-[var(--color-muted)]'
            )}
            aria-hidden="true"
          >
            ↓
          </span>
        </div>
      </div>
    )
  }
)

Select.displayName = 'Select'
