import type { Meta, StoryObj } from '@storybook/react'
import { Eyebrow } from './Eyebrow'

const meta: Meta<typeof Eyebrow> = {
  title: 'Primitives/Eyebrow',
  component: Eyebrow,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Eyebrow>

export const Light: Story = {
  args: {
    children: 'Our Services',
    variant: 'light',
  },
}

export const Dark: Story = {
  args: {
    children: 'How We Work',
    variant: 'dark',
  },
  parameters: {
    backgrounds: { default: 'espresso' },
  },
}

export const BothVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ padding: '1rem', background: 'var(--color-soft)' }}>
        <Eyebrow variant="light">Light Variant</Eyebrow>
      </div>
      <div style={{ padding: '1rem', background: 'var(--color-espresso)' }}>
        <Eyebrow variant="dark">Dark Variant</Eyebrow>
      </div>
    </div>
  ),
}
