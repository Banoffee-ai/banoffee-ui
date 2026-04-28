import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['light', 'dark'] },
    padding: { control: 'select', options: ['sm', 'md', 'lg'] },
    accentColor: { control: 'select', options: ['none', 'caramel', 'green', 'blue', 'banana'] },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Light: Story = {
  args: {
    variant: 'light',
    accentColor: 'caramel',
    children: (
      <>
        <h3 style={{ fontWeight: 700, fontSize: '1.05rem' }}>Service Title</h3>
        <p style={{ marginTop: '0.5rem', color: 'var(--color-muted)', fontSize: '0.84rem' }}>
          Card body content with a caramel accent that animates on hover.
        </p>
      </>
    ),
  },
}

export const Dark: Story = {
  args: {
    variant: 'dark',
    accentColor: 'green',
    children: (
      <>
        <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-cream)' }}>Dark Card</h3>
        <p style={{ marginTop: '0.5rem', color: 'var(--color-cream-dim)', fontSize: '0.84rem' }}>
          Dark surface card with green accent.
        </p>
      </>
    ),
  },
  parameters: { backgrounds: { default: 'espresso' } },
}

export const AllAccentColors: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '600px' }}>
      {(['caramel', 'green', 'blue', 'banana'] as const).map((color) => (
        <Card key={color} accentColor={color}>
          <p style={{ fontWeight: 700 }}>{color}</p>
          <p style={{ fontSize: '0.84rem', color: 'var(--color-muted)' }}>Hover to see accent</p>
        </Card>
      ))}
    </div>
  ),
}

export const PaddingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg'] as const).map((p) => (
        <Card key={p} padding={p} accentColor="caramel">
          <p style={{ fontWeight: 700 }}>padding=&quot;{p}&quot;</p>
        </Card>
      ))}
    </div>
  ),
}
