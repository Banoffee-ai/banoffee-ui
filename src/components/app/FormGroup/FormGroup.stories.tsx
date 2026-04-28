import type { Meta, StoryObj } from '@storybook/react'
import { FormGroup } from './FormGroup'
import { Input } from '../../primitives/Input'

const meta: Meta<typeof FormGroup> = {
  title: 'App/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof FormGroup>

export const Default: Story = {
  args: { label: 'Email', htmlFor: 'email' },
  render: (args) => (
    <FormGroup {...args}>
      <Input id="email" placeholder="you@example.com" />
    </FormGroup>
  ),
}

export const Required: Story = {
  args: { label: 'Full Name', htmlFor: 'name', required: true },
  render: (args) => (
    <FormGroup {...args}>
      <Input id="name" placeholder="Jane Doe" />
    </FormGroup>
  ),
}

export const WithHint: Story = {
  args: { label: 'Password', htmlFor: 'pw', hint: 'Must be at least 8 characters' },
  render: (args) => (
    <FormGroup {...args}>
      <Input id="pw" type="password" />
    </FormGroup>
  ),
}

export const WithError: Story = {
  args: { label: 'Email', htmlFor: 'email-err', error: 'Email is required', hint: 'This hint is hidden' },
  render: (args) => (
    <FormGroup {...args}>
      <Input id="email-err" />
    </FormGroup>
  ),
}
