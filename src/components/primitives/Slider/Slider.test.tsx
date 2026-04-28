import { render, screen, fireEvent } from '@testing-library/react'
import { Slider } from './Slider'

describe('Slider', () => {
  it('renders without crashing', () => {
    render(<Slider />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<Slider label="Volume" />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('shows value when showValue is true', () => {
    render(<Slider label="Volume" value={75} showValue />)
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('calls onChange with numeric value', () => {
    const onChange = vi.fn()
    render(<Slider onChange={onChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '30' } })
    expect(onChange).toHaveBeenCalledWith(30)
  })

  it('handles disabled state', () => {
    render(<Slider disabled />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<Slider ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
