import { render, screen } from '@testing-library/react'
import { ServiceCard } from './ServiceCard'

describe('ServiceCard', () => {
  const defaultProps = {
    number: '01',
    icon: '🚀',
    title: 'Web Development',
    body: 'We build modern web apps.',
  }

  it('renders without crashing', () => {
    render(<ServiceCard {...defaultProps} />)
    expect(screen.getByText('Web Development')).toBeInTheDocument()
  })

  it('renders number, icon, title, and body', () => {
    render(<ServiceCard {...defaultProps} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('🚀')).toBeInTheDocument()
    expect(screen.getByText('We build modern web apps.')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ServiceCard ref={ref} {...defaultProps} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders title as an h3 heading', () => {
    render(<ServiceCard {...defaultProps} />)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Web Development')
  })

  it('has an aria-hidden accent border', () => {
    const { container } = render(<ServiceCard {...defaultProps} />)
    const accent = container.querySelector('[aria-hidden="true"]')
    expect(accent).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(<ServiceCard {...defaultProps} className="custom" />)
    expect(container.firstElementChild?.className).toContain('custom')
  })
})
