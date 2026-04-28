import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'App/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: { title: 'No documents yet', description: 'Upload your first document to get started with AI analysis.' },
}

export const CustomIcon: Story = {
  args: { icon: '🔍', title: 'No results found', description: 'Try adjusting your search or filters.' },
}

export const WithAction: Story = {
  args: {
    icon: '📁',
    title: 'No projects',
    description: 'Create a project to organize your work.',
    action: <button className="px-3 py-1.5 text-sm bg-[var(--color-caramel)] text-white rounded-lg">Create Project</button>,
  },
}
