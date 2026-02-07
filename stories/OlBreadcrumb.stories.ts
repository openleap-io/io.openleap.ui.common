import type { Meta, StoryObj } from '@storybook/vue3'
import { OlBreadcrumb } from '@/components/navigation'

const meta: Meta<typeof OlBreadcrumb> = {
  title: 'Components/Navigation/OlBreadcrumb',
  component: OlBreadcrumb,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlBreadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Products', to: '/products' },
      { label: 'Widget Pro' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Settings', to: '/settings' },
      { label: 'Profile' },
    ],
    separator: '>',
  },
}

export const SingleItem: Story = {
  args: {
    items: [
      { label: 'Dashboard' },
    ],
  },
}
