import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Primitives/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'gradient', 'dark'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Solid: Story = {
  args: { variant: 'solid' },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
}

export const Gradient: Story = {
  args: { variant: 'gradient' },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
}

export const DarkVariant: Story = {
  args: { variant: 'dark' },
  parameters: {
    backgrounds: { default: 'espresso' },
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '60px' }}>
      <span>Left</span>
      <Divider orientation="vertical" variant="solid" />
      <span>Right</span>
    </div>
  ),
}
