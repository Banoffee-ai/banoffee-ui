import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost', 'ghost-light', 'dark', 'nav'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Book a Call →',
    variant: 'primary',
    size: 'md',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Learn More',
    variant: 'ghost',
    size: 'md',
  },
}

export const GhostLight: Story = {
  args: {
    children: 'Explore Services',
    variant: 'ghost-light',
    size: 'md',
  },
  parameters: {
    backgrounds: { default: 'espresso' },
  },
}

export const Dark: Story = {
  args: {
    children: 'Get Started',
    variant: 'dark',
    size: 'md',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ghost-light">Ghost Light</Button>
      <Button variant="dark">Dark</Button>
      <Button variant="nav">Nav</Button>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'soft' },
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    disabled: true,
  },
}
