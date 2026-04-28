import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'App/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { value: 65 },
}

export const WithLabel: Story = {
  args: { value: 42, label: 'Processing', showValue: true },
}

export const Small: Story = {
  args: { value: 80, size: 'sm', color: 'green' },
}

export const Large: Story = {
  args: { value: 30, size: 'lg', color: 'blue', label: 'Upload progress', showValue: true },
}

export const Animated: Story = {
  args: { value: 55, animated: true, label: 'Scanning', showValue: true },
}
