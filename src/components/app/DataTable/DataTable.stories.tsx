import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'
import { StatusBadge } from '../StatusBadge'

type Project = { name: string; status: string; progress: number }

const sampleData: Project[] = [
  { name: 'eClarify v2', status: 'active', progress: 78 },
  { name: 'Vidhik HRMS', status: 'dev', progress: 42 },
  { name: 'Contract Parser', status: 'explore', progress: 15 },
]

const columns = [
  { key: 'name' as const, header: 'Project' },
  {
    key: 'status' as const,
    header: 'Status',
    render: (val: unknown) => (
      <StatusBadge status={val as 'active' | 'dev' | 'explore'}>{String(val)}</StatusBadge>
    ),
  },
  { key: 'progress' as const, header: 'Progress', align: 'right' as const },
]

const meta: Meta<typeof DataTable<Project>> = {
  title: 'App/DataTable',
  component: DataTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable<Project>>

export const Default: Story = {
  args: { columns, data: sampleData },
}

export const Loading: Story = {
  args: { columns, data: [], loading: true },
}

export const Empty: Story = {
  args: { columns, data: [], emptyMessage: 'No projects found.' },
}

export const Striped: Story = {
  args: { columns, data: [...sampleData, ...sampleData], striped: true },
}
