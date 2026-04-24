import '../src/styles/index.css'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    // Default background contexts for all stories
    backgrounds: {
      default: 'soft',
      values: [
        { name: 'warm-white', value: '#FEFCF8' },
        { name: 'soft',       value: '#FAF5EC' },
        { name: 'espresso',   value: '#16100A' },
        { name: 'dark-2',     value: '#1F160D' },
        { name: 'caramel',    value: '#C8793A' },
      ],
    },
    // Consistent padding for all stories
    layout: 'centered',
    // Actions
    actions: { argTypesRegex: '^on[A-Z].*' },
    // Controls
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
