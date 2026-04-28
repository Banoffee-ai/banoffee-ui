import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar, type SidebarItem } from './Sidebar'

const sampleItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Main' },
  { id: 'documents', label: 'Documents', icon: '📄', badge: '12', section: 'Main' },
  { id: 'contracts', label: 'Contracts', icon: '📝', section: 'Main' },
  { id: 'team', label: 'Team', icon: '👥', section: 'Manage' },
  { id: 'settings', label: 'Settings', icon: '⚙️', section: 'Manage' },
]

const meta: Meta<typeof Sidebar> = {
  title: 'App/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ height: 480 }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: { items: sampleItems, activeId: 'dashboard', onNavigate: () => {} },
}

export const Collapsed: Story = {
  args: { items: sampleItems, activeId: 'documents', onNavigate: () => {}, collapsed: true },
}

export const CustomBrand: Story = {
  args: { items: sampleItems, activeId: 'team', onNavigate: () => {}, brandName: 'eClarify' },
}
