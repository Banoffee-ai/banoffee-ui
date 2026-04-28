import { render, screen } from '@testing-library/react'
import { Section } from './Section'

describe('Section', () => {
  it('renders without crashing', () => {
    render(<Section>Content</Section>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<Section><span data-testid="child">Hello</span></Section>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders as a section element', () => {
    const { container } = render(<Section>Content</Section>)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLElement | null }
    render(<Section ref={ref}>Content</Section>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
