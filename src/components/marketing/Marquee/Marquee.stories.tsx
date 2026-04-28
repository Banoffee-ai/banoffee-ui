import type { Meta, StoryObj } from '@storybook/react'
import { Marquee } from './Marquee'

const meta: Meta<typeof Marquee> = {
  title: 'Marketing/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  argTypes: {
    surface: { control: 'select', options: ['caramel', 'dark', 'soft'] },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'] },
    direction: { control: 'select', options: ['left', 'right'] },
  },
}

export default meta
type Story = StoryObj<typeof Marquee>

const techItems = ['Python', 'TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'OpenAI', 'LangChain', 'Next.js']

export const Caramel: Story = {
  args: { items: techItems, surface: 'caramel', speed: 'normal' },
  parameters: { layout: 'fullscreen' },
}

export const Dark: Story = {
  args: { items: techItems, surface: 'dark', speed: 'fast' },
  parameters: { layout: 'fullscreen', backgrounds: { default: 'espresso' } },
}

export const Soft: Story = {
  args: { items: techItems, surface: 'soft', speed: 'slow', direction: 'right' },
  parameters: { layout: 'fullscreen' },
}
