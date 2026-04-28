import type { Meta, StoryObj } from '@storybook/react'
import { TechPill } from './TechPill'

const meta: Meta<typeof TechPill> = {
  title: 'Marketing/TechPill',
  component: TechPill,
  tags: ['autodocs'],
  argTypes: {
    surface: { control: 'select', options: ['dark', 'light'] },
  },
}

export default meta
type Story = StoryObj<typeof TechPill>

export const Dark: Story = {
  args: { children: 'TypeScript', surface: 'dark' },
  parameters: { backgrounds: { default: 'espresso' } },
}

export const Light: Story = {
  args: { children: 'React', surface: 'light' },
}

export const TechStack: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {['Python', 'TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'OpenAI', 'LangChain'].map((t) => (
        <TechPill key={t} surface="dark">{t}</TechPill>
      ))}
    </div>
  ),
  parameters: { backgrounds: { default: 'espresso' } },
}
