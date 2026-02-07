import type { Meta, StoryObj } from '@storybook/vue3'
import { OlErrorState } from '@/components/feedback'

const meta: Meta<typeof OlErrorState> = {
  title: 'Components/Feedback/OlErrorState',
  component: OlErrorState,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlErrorState>

export const Default: Story = {
  args: {
    title: 'Something went wrong',
    description: 'We encountered an unexpected error. Please try again.',
  },
}

export const CustomTitle: Story = {
  args: {
    title: 'Connection Lost',
    description: 'Unable to reach the server. Check your internet connection.',
  },
}

export const NoDescription: Story = {
  args: {},
}
