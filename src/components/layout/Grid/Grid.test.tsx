import { render, screen } from '@testing-library/react'
import { Grid } from './Grid'

describe('Grid', () => {
  it('renders without crashing', () => {
    render(<Grid>Content</Grid>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <Grid>
        <div data-testid="a">A</div>
        <div data-testid="b">B</div>
      </Grid>
    )
    expect(screen.getByTestId('a')).toBeInTheDocument()
    expect(screen.getByTestId('b')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Grid ref={ref}>Content</Grid>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies grid class', () => {
    const { container } = render(<Grid>Content</Grid>)
    expect(container.firstChild).toHaveClass('grid')
  })
})
