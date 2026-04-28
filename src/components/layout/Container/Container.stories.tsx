import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    maxWidth: 'xl',
    children: (
      <div style={{ background: 'var(--color-soft)', padding: '2rem', borderRadius: '10px' }}>
        Container content (max-width: xl = 1280px)
      </div>
    ),
  },
  parameters: { layout: 'fullscreen' },
}

export const Small: Story = {
  args: {
    maxWidth: 'sm',
    children: (
      <div style={{ background: 'var(--color-soft)', padding: '2rem', borderRadius: '10px' }}>
        Small container (640px)
      </div>
    ),
  },
  parameters: { layout: 'fullscreen' },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <Container key={size} maxWidth={size}>
          <div style={{ background: 'var(--color-soft)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
            {size}
          </div>
        </Container>
      ))}
    </div>
  ),
  parameters: { layout: 'fullscreen' },
}
