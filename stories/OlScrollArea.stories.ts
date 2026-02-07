import type { Meta, StoryObj } from '@storybook/vue3'
import { OlScrollArea } from '@/components/layout'

const meta: Meta<typeof OlScrollArea> = {
  title: 'Components/Layout/OlScrollArea',
  component: OlScrollArea,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
    },
  },
}

export default meta
type Story = StoryObj<typeof OlScrollArea>

export const Vertical: Story = {
  render: () => ({
    components: { OlScrollArea },
    template: `
      <OlScrollArea style="height: 200px; width: 300px; border: 1px solid #ccc; border-radius: 8px;">
        <div style="padding: 16px;">
          <p v-for="i in 20" :key="i" style="margin-bottom: 8px;">Item {{ i }}</p>
        </div>
      </OlScrollArea>
    `,
  }),
}

export const Horizontal: Story = {
  render: () => ({
    components: { OlScrollArea },
    template: `
      <OlScrollArea orientation="horizontal" style="width: 300px; border: 1px solid #ccc; border-radius: 8px;">
        <div style="display: flex; gap: 16px; padding: 16px; width: 800px;">
          <div v-for="i in 10" :key="i" style="min-width: 60px; height: 60px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
            {{ i }}
          </div>
        </div>
      </OlScrollArea>
    `,
  }),
}
