import type { Meta, StoryObj } from '@storybook/react'
import { ProcessStep } from './ProcessStep'

const meta: Meta<typeof ProcessStep> = {
  title: 'Marketing/ProcessStep',
  component: ProcessStep,
  tags: ['autodocs'],
  argTypes: {
    surface: { control: 'select', options: ['dark', 'light'] },
  },
}

export default meta
type Story = StoryObj<typeof ProcessStep>

export const Light: Story = {
  args: {
    number: '01',
    title: 'Discovery Call',
    body: 'We learn about your workflows, pain points, and what success looks like.',
    surface: 'light',
  },
}

export const Dark: Story = {
  args: {
    number: '02',
    title: 'Build & Iterate',
    body: 'We ship working software in weekly sprints with your feedback baked in.',
    surface: 'dark',
  },
  parameters: { backgrounds: { default: 'espresso' } },
}

export const FullProcess: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <ProcessStep number="01" title="Discovery Call" body="We learn about your workflows and pain points." />
      <ProcessStep number="02" title="Build & Iterate" body="We ship working software in weekly sprints." />
      <ProcessStep number="03" title="Launch & Support" body="Go live with ongoing maintenance and support." isLast />
    </div>
  ),
}
