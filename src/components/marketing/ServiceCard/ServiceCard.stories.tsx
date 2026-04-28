import type { Meta, StoryObj } from '@storybook/react'
import { ServiceCard } from './ServiceCard'

const meta: Meta<typeof ServiceCard> = {
  title: 'Marketing/ServiceCard',
  component: ServiceCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ServiceCard>

export const Default: Story = {
  args: {
    number: '01',
    icon: '🧠',
    title: 'NLP & Text Intelligence',
    body: 'Extract meaning from contracts, policies, and legal prose using fine-tuned language models.',
  },
}

export const SecondCard: Story = {
  args: {
    number: '02',
    icon: '⚙️',
    title: 'Workflow Automation',
    body: 'Automate repetitive legal and HR processes with intelligent pipelines.',
  },
}

export const GridOfCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '900px' }}>
      <ServiceCard number="01" icon="🧠" title="NLP & Text Intelligence" body="Extract meaning from contracts and legal prose." />
      <ServiceCard number="02" icon="⚙️" title="Workflow Automation" body="Automate repetitive legal and HR processes." />
      <ServiceCard number="03" icon="📊" title="Data Analytics" body="Turn unstructured documents into structured insights." />
    </div>
  ),
}
