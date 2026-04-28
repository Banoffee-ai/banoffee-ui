import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from './StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'App/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['active', 'dev', 'explore', 'warning', 'error', 'idle'] },
  },
}

export default meta
type Story = StoryObj<typeof StatusBadge>

export const Active: Story = {
  args: { children: 'Active', status: 'active' },
}

export const Error: Story = {
  args: { children: 'Failed', status: 'error' },
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <StatusBadge status="active">Active</StatusBadge>
      <StatusBadge status="dev">Dev</StatusBadge>
      <StatusBadge status="explore">Exploring</StatusBadge>
      <StatusBadge status="warning">Warning</StatusBadge>
      <StatusBadge status="error">Error</StatusBadge>
      <StatusBadge status="idle">Idle</StatusBadge>
    </div>
  ),
}
