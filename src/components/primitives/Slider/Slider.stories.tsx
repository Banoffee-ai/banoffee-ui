import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 50,
    showValue: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    min: 0,
    max: 10,
    step: 1,
    value: 5,
  },
}

const InteractiveSlider = () => {
  const [val, setVal] = useState(30)
  return <Slider label="Confidence" min={0} max={100} value={val} onChange={setVal} showValue />
}

export const Interactive: Story = {
  render: () => <InteractiveSlider />,
}
