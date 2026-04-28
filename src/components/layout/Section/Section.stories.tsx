import type { Meta, StoryObj } from '@storybook/react'
import { Section } from './Section'
import { Eyebrow } from '../../primitives/Eyebrow'

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'soft', 'dark', 'dark2'],
    },
    containerMaxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Section>

export const Light: Story = {
  args: {
    variant: 'light',
    children: (
      <>
        <Eyebrow variant="light">Our Services</Eyebrow>
        <h2 style={{ fontSize: '1.9rem', fontWeight: 800, marginTop: '0.5rem' }}>What We Do</h2>
        <p style={{ marginTop: '1rem', color: 'var(--color-muted)' }}>Section content on a light surface.</p>
      </>
    ),
  },
  parameters: { layout: 'fullscreen' },
}

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: (
      <>
        <Eyebrow variant="dark">How We Work</Eyebrow>
        <h2 style={{ fontSize: '1.9rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--color-gold)' }}>
          Our Process
        </h2>
        <p style={{ marginTop: '1rem', color: 'var(--color-cream-dim)' }}>Section content on a dark surface.</p>
      </>
    ),
  },
  parameters: { layout: 'fullscreen' },
}

export const AllVariants: Story = {
  render: () => (
    <div>
      {(['light', 'soft', 'dark', 'dark2'] as const).map((v) => (
        <Section key={v} variant={v}>
          <p style={{ color: v.startsWith('dark') ? 'var(--color-cream)' : 'var(--color-espresso)' }}>
            variant=&quot;{v}&quot;
          </p>
        </Section>
      ))}
    </div>
  ),
  parameters: { layout: 'fullscreen' },
}
