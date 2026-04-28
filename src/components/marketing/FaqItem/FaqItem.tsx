import { forwardRef, useState, useCallback } from 'react'
import { cn } from '@/utils/cn'

export interface FaqItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /** The question text */
  question: string
  /** The answer text */
  answer: string
  /** Whether the item starts open */
  defaultOpen?: boolean
  /** Callback when toggled — for parent-managed accordion */
  onToggle?: (isOpen: boolean) => void
}

export const FaqItem = forwardRef<HTMLDivElement, FaqItemProps>(
  ({ className, question, answer, defaultOpen = false, onToggle, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const toggle = useCallback(() => {
      const next = !isOpen
      setIsOpen(next)
      onToggle?.(next)
    }, [isOpen, onToggle])

    return (
      <div
        ref={ref}
        className={cn('border-b border-[var(--color-border-light)]', className)}
        {...props}
      >
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          className={cn(
            'flex w-full items-center justify-between py-5 text-left',
            'cursor-pointer',
            'transition-colors duration-150'
          )}
        >
          <span className="text-[1rem] font-bold text-[var(--color-espresso)] pr-4">
            {question}
          </span>

          {/* Chevron circle */}
          <span
            className={cn(
              'flex-shrink-0 inline-flex items-center justify-center',
              'w-8 h-8 rounded-full border border-[var(--color-border-light)]',
              'transition-all duration-250',
              isOpen && 'bg-[var(--color-caramel)] border-[var(--color-caramel)]'
            )}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={cn(
                'transition-transform duration-250',
                isOpen && 'rotate-45'
              )}
            >
              <path d="M6 0v12M0 6h12" stroke={isOpen ? '#fff' : 'var(--color-muted)'} strokeWidth="1.5" />
            </svg>
          </span>
        </button>

        {/* Answer — animated max-height */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-250',
            isOpen ? 'max-h-[200px] pb-5' : 'max-h-0'
          )}
        >
          <p className="text-[0.88rem] text-[var(--color-muted)] leading-relaxed pr-12">
            {answer}
          </p>
        </div>
      </div>
    )
  }
)

FaqItem.displayName = 'FaqItem'
