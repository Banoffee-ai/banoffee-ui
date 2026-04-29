import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Sidebar, type SidebarItem } from './Sidebar'

const items: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'settings', label: 'Settings', icon: '⚙️', badge: '3' },
  { id: 'analytics', label: 'Analytics', icon: '📊', section: 'Tools' },
]

const defaultProps = {
  items,
  activeId: 'home',
  onNavigate: vi.fn(),
}

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders all nav items', () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('renders brand name', () => {
    render(<Sidebar {...defaultProps} brandName="MyApp" />)
    expect(screen.getByText('MyApp')).toBeInTheDocument()
  })

  it('calls onNavigate when an item is clicked', () => {
    const onNavigate = vi.fn()
    render(<Sidebar {...defaultProps} onNavigate={onNavigate} />)
    fireEvent.click(screen.getByText('Settings'))
    expect(onNavigate).toHaveBeenCalledWith('settings')
  })

  it('highlights the active item', () => {
    render(<Sidebar {...defaultProps} activeId="settings" />)
    const settingsButton = screen.getByText('Settings').closest('button')
    expect(settingsButton?.className).toContain('text-[var(--color-caramel)]')
  })

  it('renders badge', () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders section labels', () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByText('Tools')).toBeInTheDocument()
  })

  it('shows only first letter of brand when collapsed', () => {
    render(<Sidebar {...defaultProps} brandName="MyApp" collapsed />)
    expect(screen.getByText('M')).toBeInTheDocument()
    expect(screen.queryByText('MyApp')).not.toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLElement | null }
    render(<Sidebar ref={ref} {...defaultProps} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
