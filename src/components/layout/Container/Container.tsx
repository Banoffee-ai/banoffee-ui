import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const containerVariants = cva(
  'mx-auto px-6 md:px-14',
  {
    variants: {
      maxWidth: {
        sm: 'max-w-[640px]',
        md: 'max-w-[768px]',
        lg: 'max-w-[1024px]',
        xl: 'max-w-[1280px]',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      maxWidth: 'xl',
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ maxWidth }), className)}
      {...props}
    >
      {children}
    </div>
  )
)

Container.displayName = 'Container'
