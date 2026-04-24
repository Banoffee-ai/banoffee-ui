import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const eyebrowVariants = cva(
  [
    'uppercase tracking-[0.2em] font-bold',
    'text-[length:var(--font-size-eyebrow)]',
  ].join(' '),
  {
    variants: {
      variant: {
        light: 'text-[var(--color-caramel)]',
        dark: 'text-[var(--color-gold)]',
      },
    },
    defaultVariants: {
      variant: 'light',
    },
  }
)

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof eyebrowVariants> {
  children: string
}

export const Eyebrow = forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ className, variant, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(eyebrowVariants({ variant }), className)}
      {...props}
    >
      {children}
    </p>
  )
)

Eyebrow.displayName = 'Eyebrow'
