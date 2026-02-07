import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlSheet } from '@/components/dialog'
import { OlButton } from '@/components/button'

const meta: Meta<typeof OlSheet> = {
  title: 'Components/Dialog/OlSheet',
  component: OlSheet,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof OlSheet>

export const Right: Story = {
  render: () => ({
    components: { OlSheet, OlButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <OlButton @click="open = true">Open Sheet (Right)</OlButton>
        <OlSheet v-model:open="open" title="Sheet Title" side="right">
          <p>Sheet content goes here. It slides in from the right side.</p>
        </OlSheet>
      </div>
    `,
  }),
}

export const Left: Story = {
  render: () => ({
    components: { OlSheet, OlButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <OlButton @click="open = true">Open Sheet (Left)</OlButton>
        <OlSheet v-model:open="open" title="Navigation" side="left">
          <p>Left-side navigation or content.</p>
        </OlSheet>
      </div>
    `,
  }),
}

export const Large: Story = {
  render: () => ({
    components: { OlSheet, OlButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <OlButton @click="open = true">Open Large Sheet</OlButton>
        <OlSheet v-model:open="open" title="Details" size="lg">
          <p>A wider sheet for detailed content.</p>
        </OlSheet>
      </div>
    `,
  }),
}
