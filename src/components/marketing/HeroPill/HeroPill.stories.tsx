import type { Meta, StoryObj } from '@storybook/react'
import { HeroPill } from './HeroPill'

const meta: Meta<typeof HeroPill> = {
  title: 'Marketing/HeroPill',
  component: HeroPill,
  tags: ['autodocs'],
  argTypes: {
    dotColor: { control: 'select', options: ['green', 'blue', 'caramel'] },
  },
}

export default meta
type Story = StoryObj<typeof HeroPill>

export const Default: Story = {
  args: { children: 'Now Accepting Pilot Partners', dotColor: 'green' },
  parameters: { backgrounds: { default: 'espresso' } },
}

export const Blue: Story = {
  args: { children: 'Exploring New Markets', dotColor: 'blue' },
  parameters: { backgrounds: { default: 'espresso' } },
}

export const Static: Story = {
  args: { children: 'No Animation', dotColor: 'caramel', animate: false },
  parameters: { backgrounds: { default: 'espresso' } },
}
