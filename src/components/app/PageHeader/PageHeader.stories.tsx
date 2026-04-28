import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from './PageHeader'

const meta: Meta<typeof PageHeader> = {
  title: 'App/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: { title: 'Documents' },
}

export const WithSubtitle: Story = {
  args: { title: 'Documents', subtitle: 'Manage all your uploaded documents' },
}

export const WithBreadcrumbs: Story = {
  args: {
    title: 'Contract Review',
    subtitle: 'AI-powered clause analysis',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Documents', href: '/documents' },
      { label: 'Contract Review' },
    ],
  },
}

export const WithActions: Story = {
  args: {
    title: 'Team Members',
    subtitle: '12 active members',
    actions: <button className="px-3 py-1.5 text-sm bg-[var(--color-caramel)] text-white rounded-lg">+ Invite</button>,
  },
}
