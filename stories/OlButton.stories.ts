import type { Meta, StoryObj } from '@storybook/vue3'
import { OlButton } from '@/components/button'

const meta: Meta<typeof OlButton> = {
  title: 'Components/Button/OlButton',
  component: OlButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof OlButton>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => ({
    components: { OlButton },
    setup: () => ({ args }),
    template: '<OlButton v-bind="args">Button</OlButton>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { OlButton },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <OlButton variant="default">Default</OlButton>
        <OlButton variant="secondary">Secondary</OlButton>
        <OlButton variant="outline">Outline</OlButton>
        <OlButton variant="ghost">Ghost</OlButton>
        <OlButton variant="link">Link</OlButton>
        <OlButton variant="destructive">Destructive</OlButton>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { OlButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <OlButton size="sm">Small</OlButton>
        <OlButton size="md">Medium</OlButton>
        <OlButton size="lg">Large</OlButton>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { OlButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <OlButton :loading="true">Saving...</OlButton>
        <OlButton variant="outline" :loading="true">Loading</OlButton>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { OlButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <OlButton :disabled="true">Disabled</OlButton>
        <OlButton variant="outline" :disabled="true">Disabled</OlButton>
      </div>
    `,
  }),
}
