import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const speedMap = { slow: '32s', normal: '24s', fast: '14s' }

const marqueeVariants = cva(
  'overflow-hidden w-full',
  {
    variants: {
      surface: {
        caramel: 'bg-[var(--color-caramel)]',
        dark: 'bg-[var(--color-espresso)]',
        soft: 'bg-[var(--color-soft)]',
      },
    },
    defaultVariants: {
      surface: 'caramel',
    },
  }
)

export interface MarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeVariants> {
  /** Items to scroll */
  items: string[]
  /** Separator between items */
  separator?: string
  /** Scroll speed */
  speed?: 'slow' | 'normal' | 'fast'
  /** Scroll direction */
  direction?: 'left' | 'right'
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, items, separator = '◆', speed = 'normal', direction = 'left', surface, ...props }, ref) => {
    const animationStyle = {
      animationDuration: speedMap[speed],
      animationDirection: direction === 'right' ? 'reverse' as const : 'normal' as const,
    }

    const textColorClass = surface === 'soft'
      ? 'text-[var(--color-muted)]'
      : surface === 'dark'
        ? 'text-[var(--color-cream-dim)]'
        : 'text-white'

    const renderItems = () =>
      items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-4">
          <span className="text-[0.76rem] font-bold uppercase tracking-[0.1em] italic whitespace-nowrap">
            {item}
          </span>
          <span className="text-[0.76rem] opacity-50 not-italic">{separator}</span>
        </span>
      ))

    return (
      <div
        ref={ref}
        className={cn(marqueeVariants({ surface }), 'py-3 group', className)}
        {...props}
      >
        <div
          className={cn(
            'flex w-max gap-4 bn-animate-marquee',
            'group-hover:[animation-play-state:paused]',
            textColorClass
          )}
          style={animationStyle}
        >
          {renderItems()}
          {renderItems()}
        </div>
      </div>
    )
  }
)

Marquee.displayName = 'Marquee'
