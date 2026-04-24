import { forwardRef, useCallback } from 'react'
import { cn } from '@/utils/cn'

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Current value */
  value?: number
  /** Change handler */
  onChange?: (value: number) => void
  /** Label displayed above the slider */
  label?: string
  /** Show current value next to label */
  showValue?: boolean
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, value = 50, onChange, label, showValue = false, id, ...props }, ref) => {
    const sliderId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(Number(e.target.value))
      },
      [onChange]
    )

    return (
      <div className="w-full">
        {label && (
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor={sliderId}
              className={cn(
                'text-[length:var(--font-size-xs)] font-semibold',
                'text-[var(--color-muted)]'
              )}
            >
              {label}
            </label>
            {showValue && (
              <span className="text-[length:var(--font-size-xs)] font-bold text-[var(--color-caramel)]">
                {value}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={cn(
            'w-full h-1.5 rounded-full appearance-none cursor-pointer',
            'bg-[var(--color-soft)]',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-[var(--color-caramel)]',
            '[&::-webkit-slider-thumb]:shadow-sm',
            '[&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4',
            '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0',
            '[&::-moz-range-thumb]:bg-[var(--color-caramel)]',
            '[&::-moz-range-thumb]:cursor-pointer',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Slider.displayName = 'Slider'
