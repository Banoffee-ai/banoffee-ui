import type { Meta, StoryObj } from '@storybook/react'
import { StatBlock } from './StatBlock'

const meta: Meta<typeof StatBlock> = {
  title: 'Marketing/StatBlock',
  component: StatBlock,
  tags: ['autodocs'],
  argTypes: {
    surface: { control: 'select', options: ['dark', 'light'] },
  },
}

export default meta
type Story = StoryObj<typeof StatBlock>

export const Dark: Story = {
  args: { value: '8+', label: 'Years NLP & Text Extraction', surface: 'dark' },
  parameters: { backgrounds: { default: 'espresso' } },
}

export const Light: Story = {
  args: { value: '100%', label: 'Client Retention Rate', surface: 'light' },
}

export const StatsRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', background: 'var(--color-espresso)', padding: '2rem', borderRadius: '14px' }}>
      <StatBlock value="8+" label="Years NLP & Text Extraction" surface="dark" />
      <StatBlock value="100%" label="Client Retention Rate" surface="dark" />
      <StatBlock value="3" label="Products in Market" surface="dark" />
    </div>
  ),
  parameters: { backgrounds: { default: 'espresso' } },
}
