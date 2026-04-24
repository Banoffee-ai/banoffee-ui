import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dev', 'explore', 'pilot', 'open', 'error'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Dev: Story = {
  args: { children: 'In Development', variant: 'dev' },
}

export const Explore: Story = {
  args: { children: 'Exploring', variant: 'explore' },
}

export const Pilot: Story = {
  args: { children: 'Pilot', variant: 'pilot' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge variant="dev">In Development</Badge>
      <Badge variant="explore">Exploring</Badge>
      <Badge variant="pilot">Pilot</Badge>
      <Badge variant="open">Open</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
}

export const WithoutDot: Story = {
  args: { children: 'No Dot', variant: 'pilot', showDot: false },
}
