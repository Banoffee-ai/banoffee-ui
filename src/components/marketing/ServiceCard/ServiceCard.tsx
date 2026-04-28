import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Decorative number, e.g. "01" */
  number: string
  /** Emoji or React node icon */
  icon: React.ReactNode
  /** Card title */
  title: string
  /** Card body text */
  body: string
}

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, number, icon, title, body, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative group',
        'bg-[var(--color-soft)] rounded-[var(--radius-lg)]',
        'border border-[var(--color-border-light)]',
        'p-8 overflow-hidden',
        'transition-all duration-250',
        'hover:-translate-y-[5px] hover:shadow-[var(--shadow-lg)]',
        'hover:border-[var(--color-caramel)]/30',
        className
      )}
      {...props}
    >
      {/* Accent top border */}
      <span
        className={cn(
          'absolute top-0 left-0 right-0 h-[3px]',
          'bg-[var(--color-caramel)]',
          'origin-left scale-x-0 transition-transform duration-250',
          'group-hover:scale-x-100'
        )}
        aria-hidden="true"
      />

      {/* Decorative number */}
      <span className="block text-[3rem] font-[800] leading-none text-[var(--color-caramel)]/10">
        {number}
      </span>

      {/* Icon */}
      <span className="block text-2xl mt-2">{icon}</span>

      {/* Title */}
      <h3 className="mt-4 text-[1.05rem] font-bold text-[var(--color-espresso)]">
        {title}
      </h3>

      {/* Body */}
      <p className="mt-2 text-[0.84rem] text-[var(--color-muted)] leading-[1.74]">
        {body}
      </p>
    </div>
  )
)

ServiceCard.displayName = 'ServiceCard'
