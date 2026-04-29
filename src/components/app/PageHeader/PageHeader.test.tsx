import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
  it('renders without crashing', () => {
    render(<PageHeader title="Dashboard" />)
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('renders title', () => {
    render(<PageHeader title="Users" />)
    expect(screen.getByText('Users')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<PageHeader title="Users" subtitle="Manage your team" />)
    expect(screen.getByText('Manage your team')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    const { container } = render(<PageHeader title="Users" />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs.length).toBe(0)
  })

  it('renders breadcrumbs', () => {
    render(
      <PageHeader
        title="Edit User"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
          { label: 'Edit User' },
        ]}
      />
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument()
  })

  it('renders breadcrumb links', () => {
    render(
      <PageHeader
        title="Edit"
        breadcrumbs={[{ label: 'Home', href: '/' }]}
      />
    )
    const link = screen.getByText('Home')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders actions', () => {
    render(<PageHeader title="Users" actions={<button>Add User</button>} />)
    expect(screen.getByRole('button', { name: 'Add User' })).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<PageHeader ref={ref} title="Test" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
