import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies light variant classes', () => {
    const { container } = render(<Card variant="light">Content</Card>)
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('bg-[var(--color-warm-white)]')
  })

  it('applies dark variant classes', () => {
    const { container } = render(<Card variant="dark">Content</Card>)
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('bg-[var(--color-dark-2)]')
  })

  it('renders accent border when accentColor is set', () => {
    const { container } = render(<Card accentColor="caramel">Content</Card>)
    const accent = container.querySelector('[aria-hidden="true"]')
    expect(accent).toBeInTheDocument()
    expect(accent?.className).toContain('bg-[var(--color-caramel)]')
  })

  it('does not render accent border when accentColor is none', () => {
    const { container } = render(<Card accentColor="none">Content</Card>)
    const accent = container.querySelector('[aria-hidden="true"]')
    expect(accent).not.toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>
    render(<Card ref={ref}>Content</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
