import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders pulsing dot by default', () => {
    const { container } = render(<Badge>Status</Badge>)
    const dot = container.querySelector('.bn-animate-pulse')
    expect(dot).toBeInTheDocument()
  })

  it('hides dot when showDot is false', () => {
    const { container } = render(<Badge showDot={false}>Status</Badge>)
    const dot = container.querySelector('.bn-animate-pulse')
    expect(dot).not.toBeInTheDocument()
  })

  it('applies variant class correctly', () => {
    const { container } = render(<Badge variant="error">Error</Badge>)
    const badge = container.firstElementChild as HTMLElement
    expect(badge.className).toContain('text-[var(--color-status-red)]')
  })

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement | null>
    render(<Badge ref={ref}>Test</Badge>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})
