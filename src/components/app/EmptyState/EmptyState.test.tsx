import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders without crashing', () => {
    render(<EmptyState title="No items" />)
    expect(screen.getByText('No items')).toBeInTheDocument()
  })

  it('renders title', () => {
    render(<EmptyState title="Nothing found" />)
    expect(screen.getByRole('heading', { name: 'Nothing found' })).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<EmptyState title="Empty" description="Try adding some items" />)
    expect(screen.getByText('Try adding some items')).toBeInTheDocument()
  })

  it('renders default icon', () => {
    const { container } = render(<EmptyState title="Empty" />)
    expect(container.textContent).toContain('📭')
  })

  it('renders custom icon', () => {
    const { container } = render(<EmptyState title="Empty" icon="🔍" />)
    expect(container.textContent).toContain('🔍')
  })

  it('renders action', () => {
    render(<EmptyState title="Empty" action={<button>Add item</button>} />)
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<EmptyState title="Empty" />)
    expect(container.querySelectorAll('p').length).toBe(0)
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<EmptyState ref={ref} title="Empty" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
