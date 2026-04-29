import { render, screen } from '@testing-library/react'
import { ProcessStep } from './ProcessStep'

describe('ProcessStep', () => {
  const defaultProps = {
    number: '01',
    title: 'Discovery',
    body: 'We learn about your needs.',
  }

  it('renders without crashing', () => {
    render(<ProcessStep {...defaultProps} />)
    expect(screen.getByText('Discovery')).toBeInTheDocument()
  })

  it('renders number, title, and body', () => {
    render(<ProcessStep {...defaultProps} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('We learn about your needs.')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ProcessStep ref={ref} {...defaultProps} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies light surface styles by default', () => {
    render(<ProcessStep {...defaultProps} />)
    const title = screen.getByText('Discovery')
    expect(title.className).toContain('text-[var(--color-espresso)]')
  })

  it('applies dark surface styles when specified', () => {
    render(<ProcessStep {...defaultProps} surface="dark" />)
    const title = screen.getByText('Discovery')
    expect(title.className).toContain('text-[var(--color-cream)]')
  })

  it('renders bottom border by default', () => {
    const { container } = render(<ProcessStep {...defaultProps} />)
    expect(container.firstElementChild?.className).toContain('border-b')
  })

  it('removes bottom border when isLast', () => {
    const { container } = render(<ProcessStep {...defaultProps} isLast />)
    expect(container.firstElementChild?.className).not.toContain('border-b')
  })

  it('merges custom className', () => {
    const { container } = render(<ProcessStep {...defaultProps} className="extra" />)
    expect(container.firstElementChild?.className).toContain('extra')
  })
})
