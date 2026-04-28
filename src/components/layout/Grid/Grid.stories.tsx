import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './Grid'
import { Card } from '../Card'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: { control: 'select', options: [1, 2, 3, 4] },
    gap: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Grid>

const placeholderCards = Array.from({ length: 6 }, (_, i) => (
  <Card key={i} accentColor="caramel">
    <h3 style={{ fontWeight: 700 }}>Card {i + 1}</h3>
    <p style={{ fontSize: '0.84rem', color: 'var(--color-muted)', marginTop: '0.5rem' }}>
      Grid item content
    </p>
  </Card>
))

export const ThreeColumns: Story = {
  args: { cols: 3, gap: 'md' },
  render: (args) => <Grid {...args}>{placeholderCards}</Grid>,
}

export const TwoColumns: Story = {
  args: { cols: 2, gap: 'md' },
  render: (args) => <Grid {...args}>{placeholderCards.slice(0, 4)}</Grid>,
}

export const FourColumns: Story = {
  args: { cols: 4, gap: 'sm' },
  render: (args) => <Grid {...args}>{placeholderCards.slice(0, 4)}</Grid>,
}
