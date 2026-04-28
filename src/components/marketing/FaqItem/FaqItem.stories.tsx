import type { Meta, StoryObj } from '@storybook/react'
import { FaqItem } from './FaqItem'

const meta: Meta<typeof FaqItem> = {
  title: 'Marketing/FaqItem',
  component: FaqItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FaqItem>

export const Closed: Story = {
  args: {
    question: 'What industries do you work with?',
    answer: 'We specialize in legal tech, HR tech, and document intelligence across regulated industries.',
  },
}

export const Open: Story = {
  args: {
    question: 'How long does a typical project take?',
    answer: 'Most pilot projects ship in 4-6 weeks. We work in weekly sprints with continuous feedback loops.',
    defaultOpen: true,
  },
}

export const FaqList: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <FaqItem
        question="What industries do you work with?"
        answer="We specialize in legal tech, HR tech, and document intelligence across regulated industries."
      />
      <FaqItem
        question="How long does a typical project take?"
        answer="Most pilot projects ship in 4-6 weeks. We work in weekly sprints with continuous feedback loops."
      />
      <FaqItem
        question="Do you offer ongoing support?"
        answer="Yes. Every project includes post-launch support, monitoring, and iterative improvements."
      />
    </div>
  ),
}
