import { render, screen } from '@testing-library/react'
import { TechPill } from './TechPill'

describe('TechPill', () => {
  it('renders without crashing', () => {
    render(<TechPill>React</TechPill>)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLSpanElement | null }
    render(<TechPill ref={ref}>Ref</TechPill>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('applies dark surface styles by default', () => {
    render(<TechPill>Dark</TechPill>)
    const el = screen.getByText('Dark')
    expect(el.className).toContain('bg-[var(--color-espresso)]')
    expect(el.className).toContain('border-[var(--color-border-dark)]')
  })

  it('applies light surface styles when specified', () => {
    render(<TechPill surface="light">Light</TechPill>)
    const el = screen.getByText('Light')
    expect(el.className).toContain('bg-[var(--color-soft)]')
    expect(el.className).toContain('border-[var(--color-border-light)]')
  })

  it('merges custom className', () => {
    render(<TechPill className="my-pill">Custom</TechPill>)
    expect(screen.getByText('Custom').className).toContain('my-pill')
  })

  it('passes through HTML attributes', () => {
    render(<TechPill data-testid="pill">Attr</TechPill>)
    expect(screen.getByTestId('pill')).toBeInTheDocument()
  })
})
