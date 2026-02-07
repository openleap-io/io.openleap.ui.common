import type { Meta, StoryObj } from '@storybook/vue3'
import { OlProgress } from '@/components/feedback'

const meta: Meta<typeof OlProgress> = {
  title: 'Components/Feedback/OlProgress',
  component: OlProgress,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
}

export default meta
type Story = StoryObj<typeof OlProgress>

export const Default: Story = {
  args: {
    value: 60,
  },
}

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
}

export const Variants: Story = {
  render: () => ({
    components: { OlProgress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
        <OlProgress :value="40" variant="default" show-label />
        <OlProgress :value="60" variant="success" show-label />
        <OlProgress :value="80" variant="warning" show-label />
        <OlProgress :value="90" variant="error" show-label />
      </div>
    `,
  }),
}

export const Indeterminate: Story = {
  render: () => ({
    components: { OlProgress },
    template: '<OlProgress style="width: 300px;" />',
  }),
}
