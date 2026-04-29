import { render, screen } from '@testing-library/react'
import { StatBlock } from './StatBlock'

describe('StatBlock', () => {
  it('renders without crashing', () => {
    render(<StatBlock value="8+" label="Years Experience" />)
    expect(screen.getByText('8+')).toBeInTheDocument()
    expect(screen.getByText('Years Experience')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<StatBlock ref={ref} value="100%" label="Uptime" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies dark surface styles by default', () => {
    render(<StatBlock value="50" label="Projects" />)
    const value = screen.getByText('50')
    expect(value.className).toContain('text-[var(--color-gold)]')
  })

  it('applies light surface styles when specified', () => {
    render(<StatBlock value="50" label="Projects" surface="light" />)
    const value = screen.getByText('50')
    expect(value.className).toContain('text-[var(--color-caramel)]')
  })

  it('applies light surface label styles', () => {
    render(<StatBlock value="50" label="Projects" surface="light" />)
    const label = screen.getByText('Projects')
    expect(label.className).toContain('text-[var(--color-muted)]')
  })

  it('merges custom className', () => {
    const { container } = render(<StatBlock value="1" label="L" className="my-class" />)
    expect(container.firstElementChild?.className).toContain('my-class')
  })
})
