import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const sampleOptions = [
  { value: 'eclarify', label: 'eClarify' },
  { value: 'vidhik', label: 'Vidhik' },
  { value: 'banoffee', label: 'Banoffee.ai' },
]

export const Default: Story = {
  args: {
    label: 'Product',
    options: sampleOptions,
    placeholder: 'Select a product...',
  },
}

export const Dark: Story = {
  args: {
    label: 'Product',
    options: sampleOptions,
    variant: 'dark',
    placeholder: 'Select a product...',
  },
  parameters: {
    backgrounds: { default: 'espresso' },
  },
}

export const WithoutLabel: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Choose...',
  },
}
