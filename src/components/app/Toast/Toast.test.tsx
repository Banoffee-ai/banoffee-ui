import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Toast, ToastProvider, useToast } from './Toast'

describe('Toast (standalone)', () => {
  it('renders without crashing', () => {
    render(<Toast title="Hello" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders title and description', () => {
    render(<Toast title="Success" description="Your changes were saved" />)
    expect(screen.getByText('Success')).toBeInTheDocument()
    expect(screen.getByText('Your changes were saved')).toBeInTheDocument()
  })

  it('renders dismiss button when onClose provided', () => {
    const onClose = vi.fn()
    render(<Toast title="Info" onClose={onClose} />)
    const dismissBtn = screen.getByLabelText('Dismiss')
    fireEvent.click(dismissBtn)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not render dismiss button when onClose is not provided', () => {
    render(<Toast title="Info" />)
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Toast ref={ref} title="Test" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

// Helper component to trigger toasts via the hook
function ToastTrigger() {
  const { toast, dismiss, toasts } = useToast()
  return (
    <div>
      <button onClick={() => toast({ variant: 'success', title: 'Saved!' })}>
        Show Toast
      </button>
      <button onClick={() => { if (toasts.length > 0) dismiss(toasts[0].id) }}>
        Dismiss First
      </button>
      <span data-testid="count">{toasts.length}</span>
    </div>
  )
}

describe('ToastProvider + useToast', () => {
  it('renders provider children', () => {
    render(
      <ToastProvider>
        <span>App content</span>
      </ToastProvider>
    )
    expect(screen.getByText('App content')).toBeInTheDocument()
  })

  it('shows a toast when triggered', () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    )
    fireEvent.click(screen.getByText('Show Toast'))
    expect(screen.getByText('Saved!')).toBeInTheDocument()
  })

  it('dismisses a toast', () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    )
    fireEvent.click(screen.getByText('Show Toast'))
    expect(screen.getByTestId('count').textContent).toBe('1')

    act(() => {
      fireEvent.click(screen.getByText('Dismiss First'))
    })
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  it('throws when useToast is used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ToastTrigger />)).toThrow(
      'useToast must be used within a ToastProvider'
    )
    spy.mockRestore()
  })
})
