import { render, screen, fireEvent } from '@testing-library/react'
import { FaqItem } from './FaqItem'

describe('FaqItem', () => {
  it('renders without crashing', () => {
    render(<FaqItem question="What is this?" answer="A component." />)
    expect(screen.getByText('What is this?')).toBeInTheDocument()
  })

  it('hides answer by default (aria-expanded=false)', () => {
    render(<FaqItem question="Q?" answer="A." />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows answer when defaultOpen', () => {
    render(<FaqItem question="Q?" answer="A." defaultOpen />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('toggles answer on click', () => {
    render(<FaqItem question="Q?" answer="A." />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onToggle when toggled', () => {
    const onToggle = vi.fn()
    render(<FaqItem question="Q?" answer="A." onToggle={onToggle} />)
    fireEvent.click(screen.getByText('Q?'))
    expect(onToggle).toHaveBeenCalledWith(true)
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<FaqItem ref={ref} question="Q?" answer="A." />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
