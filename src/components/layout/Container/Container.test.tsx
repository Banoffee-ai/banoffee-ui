import { render, screen } from '@testing-library/react'
import { Container } from './Container'

describe('Container', () => {
  it('renders without crashing', () => {
    render(<Container>Content</Container>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<Container><span data-testid="child">Hello</span></Container>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Container ref={ref}>Content</Container>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies custom className', () => {
    const { container } = render(<Container className="my-class">Content</Container>)
    expect(container.firstChild).toHaveClass('my-class')
  })
})
