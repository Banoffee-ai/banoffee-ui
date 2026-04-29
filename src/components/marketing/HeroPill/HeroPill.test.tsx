import { render, screen } from '@testing-library/react'
import { HeroPill } from './HeroPill'

describe('HeroPill', () => {
  it('renders without crashing', () => {
    render(<HeroPill>Hello</HeroPill>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLSpanElement | null }
    render(<HeroPill ref={ref}>Ref test</HeroPill>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('renders the dot indicator as aria-hidden', () => {
    const { container } = render(<HeroPill>Dot</HeroPill>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).toBeInTheDocument()
  })

  it('applies pulse animation by default', () => {
    const { container } = render(<HeroPill>Pulse</HeroPill>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot?.className).toContain('bn-animate-pulse')
  })

  it('removes pulse animation when animate=false', () => {
    const { container } = render(<HeroPill animate={false}>No pulse</HeroPill>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot?.className).not.toContain('bn-animate-pulse')
  })

  it('applies green dot color by default', () => {
    const { container } = render(<HeroPill>Green</HeroPill>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot?.className).toContain('bg-[var(--color-status-green)]')
  })

  it('applies blue dot color when specified', () => {
    const { container } = render(<HeroPill dotColor="blue">Blue</HeroPill>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot?.className).toContain('bg-[var(--color-status-blue)]')
  })

  it('merges custom className', () => {
    render(<HeroPill className="my-custom">Custom</HeroPill>)
    expect(screen.getByText('Custom').closest('span')?.className).toContain('my-custom')
  })
})
