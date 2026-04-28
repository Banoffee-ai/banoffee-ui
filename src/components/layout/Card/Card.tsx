import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const accentColorMap: Record<string, string> = {
  caramel: 'bg-[var(--color-caramel)]',
  green: 'bg-[var(--color-status-green)]',
  blue: 'bg-[var(--color-status-blue)]',
  banana: 'bg-[var(--color-banana)]',
}

const cardVariants = cva(
  [
    'relative rounded-[var(--radius-lg)] overflow-hidden',
    'border transition-all duration-250',
    'hover:-translate-y-[5px] hover:shadow-[var(--shadow-lg)]',
    'hover:border-[var(--color-caramel)]/30',
  ].join(' '),
  {
    variants: {
      variant: {
        light: 'bg-[var(--color-warm-white)] border-[var(--color-border-light)]',
        dark: 'bg-[var(--color-dark-2)] border-[var(--color-border-dark)]',
      },
      padding: {
        sm: 'p-[1.4rem]',
        md: 'p-8',
        lg: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'light',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Top accent border colour — animates scaleX on hover */
  accentColor?: 'caramel' | 'green' | 'blue' | 'banana' | 'none'
  children: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, accentColor = 'none', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), 'group', className)}
      {...props}
    >
      {accentColor !== 'none' && (
        <span
          className={cn(
            'absolute top-0 left-0 right-0 h-[3px]',
            'origin-left scale-x-0 transition-transform duration-250',
            'group-hover:scale-x-100',
            accentColorMap[accentColor]
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  )
)

Card.displayName = 'Card'
