import { render, screen } from '@testing-library/react'
import { FormGroup } from './FormGroup'

describe('FormGroup', () => {
  it('renders without crashing', () => {
    render(<FormGroup label="Name" htmlFor="name"><input id="name" /></FormGroup>)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <FormGroup label="Email" htmlFor="email">
        <input id="email" data-testid="input" />
      </FormGroup>
    )
    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('shows required asterisk', () => {
    const { container } = render(
      <FormGroup label="Name" htmlFor="name" required>
        <input id="name" />
      </FormGroup>
    )
    expect(container.textContent).toContain('*')
  })

  it('shows hint text', () => {
    render(
      <FormGroup label="Name" htmlFor="name" hint="Enter your full name">
        <input id="name" />
      </FormGroup>
    )
    expect(screen.getByText('Enter your full name')).toBeInTheDocument()
  })

  it('shows error and hides hint', () => {
    render(
      <FormGroup label="Name" htmlFor="name" error="Required" hint="Hint text">
        <input id="name" />
      </FormGroup>
    )
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.queryByText('Hint text')).not.toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(
      <FormGroup ref={ref} label="Name" htmlFor="name">
        <input id="name" />
      </FormGroup>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
