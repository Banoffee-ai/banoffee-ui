import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('renders without crashing', () => {
    render(<StatusBadge>Active</StatusBadge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders correct variant classes for active', () => {
    const { container } = render(<StatusBadge status="active">Active</StatusBadge>)
    expect(container.firstChild).toHaveClass('text-[var(--color-status-green)]')
  })

  it('renders correct variant classes for error', () => {
    const { container } = render(<StatusBadge status="error">Error</StatusBadge>)
    expect(container.firstChild).toHaveClass('text-[var(--color-status-red)]')
  })

  it('renders the status dot', () => {
    const { container } = render(<StatusBadge>Active</StatusBadge>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLSpanElement | null }
    render(<StatusBadge ref={ref}>Active</StatusBadge>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})
