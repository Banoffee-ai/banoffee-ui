import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { Container, type ContainerProps } from '../Container'

const sectionVariants = cva(
  'py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]',
  {
    variants: {
      variant: {
        light: 'bg-[var(--color-warm-white)]',
        soft: 'bg-[var(--color-soft)]',
        dark: 'bg-[var(--color-espresso)]',
        dark2: 'bg-[var(--color-dark-2)]',
      },
    },
    defaultVariants: {
      variant: 'light',
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** Max-width passed to the inner Container */
  containerMaxWidth?: ContainerProps['maxWidth']
  children: React.ReactNode
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant, containerMaxWidth, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ variant }), className)}
      {...props}
    >
      <Container maxWidth={containerMaxWidth}>
        {children}
      </Container>
    </section>
  )
)

Section.displayName = 'Section'
