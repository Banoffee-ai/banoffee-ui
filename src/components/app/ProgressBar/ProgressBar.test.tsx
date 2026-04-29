import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    render(<ProgressBar value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('sets aria-valuenow to the value', () => {
    render(<ProgressBar value={75} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75')
  })

  it('clamps value to 0-100 range', () => {
    const { rerender } = render(<ProgressBar value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')

    rerender(<ProgressBar value={-20} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })

  it('renders label', () => {
    render(<ProgressBar value={50} label="Upload progress" />)
    expect(screen.getByText('Upload progress')).toBeInTheDocument()
  })

  it('renders percentage when showValue is true', () => {
    render(<ProgressBar value={42} showValue />)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('applies size variant class', () => {
    const { container } = render(<ProgressBar value={50} size="lg" />)
    const track = container.querySelector('[role="progressbar"]')
    expect(track?.className).toContain('h-2.5')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ProgressBar ref={ref} value={50} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
