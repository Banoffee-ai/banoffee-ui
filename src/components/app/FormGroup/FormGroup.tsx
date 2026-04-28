import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, label, htmlFor, error, hint, required, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props}>
      <label
        htmlFor={htmlFor}
        className="text-[length:0.76rem] font-semibold text-[var(--color-muted)]"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--color-caramel)]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p className="text-[length:0.76rem] text-[var(--color-status-red)]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[length:0.76rem] text-[var(--color-muted)] opacity-75">{hint}</p>
      ) : null}
    </div>
  )
)

FormGroup.displayName = 'FormGroup'
