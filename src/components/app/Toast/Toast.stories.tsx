import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'App/Toast',
  component: Toast,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Toast>

export const Success: Story = {
  args: { variant: 'success', title: 'Document uploaded', description: 'Your file has been processed.', onClose: () => {} },
}

export const Error: Story = {
  args: { variant: 'error', title: 'Upload failed', description: 'Please try again or contact support.', onClose: () => {} },
}

export const Info: Story = {
  args: { variant: 'info', title: 'New version available', description: 'Refresh to update.', onClose: () => {} },
}

export const Warning: Story = {
  args: { variant: 'warning', title: 'Storage almost full', description: 'You have used 90% of your storage.', onClose: () => {} },
}
