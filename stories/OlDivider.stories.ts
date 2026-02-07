import type { Meta, StoryObj } from '@storybook/vue3'
import { OlDivider } from '@/components/layout'

const meta: Meta<typeof OlDivider> = {
  title: 'Components/Layout/OlDivider',
  component: OlDivider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof OlDivider>

export const Horizontal: Story = {
  render: () => ({
    components: { OlDivider },
    template: `
      <div style="max-width: 400px;">
        <p>Content above</p>
        <OlDivider class="my-4" />
        <p>Content below</p>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { OlDivider },
    template: `
      <div style="max-width: 400px;">
        <p>Content above</p>
        <OlDivider label="OR" class="my-4" />
        <p>Content below</p>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { OlDivider },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; height: 40px;">
        <span>Left</span>
        <OlDivider orientation="vertical" />
        <span>Right</span>
      </div>
    `,
  }),
}
