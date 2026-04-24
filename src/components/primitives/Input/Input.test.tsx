import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Input label="Email" error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('renders hint when no error', () => {
    render(<Input label="Password" hint="Min 8 chars" />)
    expect(screen.getByText('Min 8 chars')).toBeInTheDocument()
  })

  it('hides hint when error is present', () => {
    render(<Input label="Password" hint="Min 8 chars" error="Too short" />)
    expect(screen.queryByText('Min 8 chars')).not.toBeInTheDocument()
    expect(screen.getByText('Too short')).toBeInTheDocument()
  })

  it('calls onChange', () => {
    const onChange = vi.fn()
    render(<Input label="Name" onChange={onChange} />)
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'test' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>
    render(<Input ref={ref} label="Test" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('sets aria-invalid when error present', () => {
    render(<Input label="Email" error="Invalid" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
  })
})
