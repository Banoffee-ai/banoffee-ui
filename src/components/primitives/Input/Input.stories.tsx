import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@company.com',
    type: 'email',
  },
}

export const Dark: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Jane Doe',
    variant: 'dark',
  },
  parameters: {
    backgrounds: { default: 'espresso' },
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@company.com',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Password',
    type: 'password',
    hint: 'Must be at least 8 characters',
  },
}

export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search documents...',
    leftIcon: '🔍',
    type: 'search',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit',
    disabled: true,
  },
}
