import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DataTable, type Column } from './DataTable'

interface User {
  name: string
  age: number
}

const columns: Column<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
]

const data: User[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
]

describe('DataTable', () => {
  it('renders without crashing', () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
  })

  it('renders data rows', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('renders empty message when data is empty', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Nothing here" />)
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('renders default empty message', () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders skeleton rows when loading', () => {
    const { container } = render(<DataTable columns={columns} data={[]} loading />)
    const skeletonCells = container.querySelectorAll('.animate-pulse')
    expect(skeletonCells.length).toBeGreaterThan(0)
  })

  it('calls onRowClick when a row is clicked', () => {
    const onRowClick = vi.fn()
    render(<DataTable columns={columns} data={data} onRowClick={onRowClick} />)
    fireEvent.click(screen.getByText('Alice'))
    expect(onRowClick).toHaveBeenCalledWith(data[0])
  })

  it('forwards ref to the table element', () => {
    const ref = { current: null } as React.RefObject<HTMLTableElement | null>
    render(<DataTable ref={ref} columns={columns} data={data} />)
    expect(ref.current).toBeInstanceOf(HTMLTableElement)
  })

  it('renders custom cell content via render function', () => {
    const customColumns: Column<User>[] = [
      { key: 'name', header: 'Name', render: (val) => <strong>{String(val)}</strong> },
      { key: 'age', header: 'Age' },
    ]
    render(<DataTable columns={customColumns} data={data} />)
    const strong = screen.getByText('Alice')
    expect(strong.tagName).toBe('STRONG')
  })
})
