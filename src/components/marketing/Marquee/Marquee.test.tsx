import { render, screen } from '@testing-library/react'
import { Marquee } from './Marquee'

describe('Marquee', () => {
  const items = ['React', 'TypeScript', 'Tailwind']

  it('renders without crashing', () => {
    render(<Marquee items={items} />)
    // Items are duplicated for seamless scroll
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(2)
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Marquee ref={ref} items={items} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders all items', () => {
    render(<Marquee items={items} />)
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Tailwind').length).toBeGreaterThanOrEqual(1)
  })

  it('renders custom separator', () => {
    render(<Marquee items={items} separator="•" />)
    expect(screen.getAllByText('•').length).toBeGreaterThanOrEqual(1)
  })

  it('applies default caramel surface', () => {
    const { container } = render(<Marquee items={items} />)
    expect(container.firstElementChild?.className).toContain('bg-[var(--color-caramel)]')
  })

  it('applies dark surface variant', () => {
    const { container } = render(<Marquee items={items} surface="dark" />)
    expect(container.firstElementChild?.className).toContain('bg-[var(--color-espresso)]')
  })

  it('sets reverse animation direction for right', () => {
    const { container } = render(<Marquee items={items} direction="right" />)
    const inner = container.querySelector('.bn-animate-marquee') as HTMLElement
    expect(inner?.style.animationDirection).toBe('reverse')
  })

  it('merges custom className', () => {
    const { container } = render(<Marquee items={items} className="extra" />)
    expect(container.firstElementChild?.className).toContain('extra')
  })
})
