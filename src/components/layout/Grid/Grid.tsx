import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const gridVariants = cva(
  'grid grid-cols-1',
  {
    variants: {
      cols: {
        1: '',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
      },
      gap: {
        sm: 'gap-[var(--spacing-gap-sm)]',
        md: 'gap-[var(--spacing-gap)]',
        lg: 'gap-[var(--spacing-gap-lg)]',
      },
    },
    defaultVariants: {
      cols: 3,
      gap: 'md',
    },
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  children: React.ReactNode
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ cols, gap }), className)}
      {...props}
    >
      {children}
    </div>
  )
)

Grid.displayName = 'Grid'
