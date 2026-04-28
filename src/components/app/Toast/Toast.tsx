import {
  forwardRef,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '@/utils/cn'

// ── Types ──

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export interface ToastMessage {
  id: string
  variant: ToastVariant
  title: string
  description?: string
  duration?: number
  action?: { label: string; onClick: () => void }
}

// ── Variant config ──

const variantConfig: Record<
  ToastVariant,
  { borderColor: string; iconColor: string; icon: string }
> = {
  success: {
    borderColor: 'border-l-[var(--color-status-green)]',
    iconColor: 'text-[var(--color-status-green)]',
    icon: '✓',
  },
  error: {
    borderColor: 'border-l-[var(--color-status-red)]',
    iconColor: 'text-[var(--color-status-red)]',
    icon: '✕',
  },
  info: {
    borderColor: 'border-l-[var(--color-status-blue)]',
    iconColor: 'text-[var(--color-status-blue)]',
    icon: 'ℹ',
  },
  warning: {
    borderColor: 'border-l-[var(--color-banana)]',
    iconColor: 'text-[var(--color-banana)]',
    icon: '⚠',
  },
}

// ── Context ──

interface ToastContextValue {
  toast: (options: Omit<ToastMessage, 'id'>) => string
  dismiss: (id: string) => void
  toasts: ToastMessage[]
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

// ── Provider ──

let toastCounter = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (options: Omit<ToastMessage, 'id'>) => {
      const id = `toast-${++toastCounter}`
      const newToast: ToastMessage = { id, ...options }
      setToasts((prev) => [...prev, newToast])
      return id
    },
    []
  )

  return (
    <ToastContext.Provider value={{ toast, dismiss, toasts }}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}

// ── Viewport ──

function ToastViewport({
  toasts,
  dismiss,
}: {
  toasts: ToastMessage[]
  dismiss: (id: string) => void
}) {
  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  )
}

// ── Single toast ──

interface ToastItemProps {
  toast: ToastMessage
  onDismiss: (id: string) => void
}

function ToastItem({ toast: t, onDismiss }: ToastItemProps) {
  const [exiting, setExiting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const config = variantConfig[t.variant]

  useEffect(() => {
    const duration = t.duration ?? 4000
    timerRef.current = setTimeout(() => {
      setExiting(true)
    }, duration)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [t.duration])

  const handleAnimationEnd = () => {
    if (exiting) onDismiss(t.id)
  }

  return (
    <div
      role="alert"
      onAnimationEnd={handleAnimationEnd}
      className={cn(
        'pointer-events-auto flex items-start gap-3',
        'w-80 px-4 py-3 rounded-lg shadow-md',
        'bg-[var(--color-warm-white)] border border-[var(--color-border-light)]',
        'border-l-[3px]',
        config.borderColor,
        exiting ? 'animate-[toast-out_250ms_ease-in_forwards]' : 'animate-[toast-in_250ms_ease-out]'
      )}
    >
      <span className={cn('text-base mt-0.5 shrink-0', config.iconColor)} aria-hidden="true">
        {config.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[length:0.84rem] font-bold text-[var(--color-espresso)]">{t.title}</p>
        {t.description && (
          <p className="text-[length:0.76rem] text-[var(--color-muted)] mt-0.5">{t.description}</p>
        )}
        {t.action && (
          <button
            onClick={t.action.onClick}
            className="mt-1.5 text-[length:0.76rem] font-semibold text-[var(--color-caramel)] hover:underline"
          >
            {t.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => {
          setExiting(true)
        }}
        className="text-[var(--color-muted)] hover:text-[var(--color-espresso)] text-base leading-none shrink-0"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}

// ── Standalone Toast display (for storybook / non-context use) ──

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant
  title: string
  description?: string
  onClose?: () => void
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'info', title, description, onClose, ...props }, ref) => {
    const config = variantConfig[variant]
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex items-start gap-3 w-80 px-4 py-3 rounded-lg shadow-md',
          'bg-[var(--color-warm-white)] border border-[var(--color-border-light)]',
          'border-l-[3px]',
          config.borderColor,
          className
        )}
        {...props}
      >
        <span className={cn('text-base mt-0.5 shrink-0', config.iconColor)} aria-hidden="true">
          {config.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[length:0.84rem] font-bold text-[var(--color-espresso)]">{title}</p>
          {description && (
            <p className="text-[length:0.76rem] text-[var(--color-muted)] mt-0.5">{description}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[var(--color-muted)] hover:text-[var(--color-espresso)] text-base leading-none shrink-0"
            aria-label="Dismiss"
          >
            ×
          </button>
        )}
      </div>
    )
  }
)

Toast.displayName = 'Toast'
