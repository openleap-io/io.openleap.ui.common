import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlDialog } from '@/components/dialog'
import { OlButton } from '@/components/button'

const meta: Meta<typeof OlDialog> = {
  title: 'Components/Dialog/OlDialog',
  component: OlDialog,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
}

export default meta
type Story = StoryObj<typeof OlDialog>

export const Default: Story = {
  render: () => ({
    components: { OlDialog, OlButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <OlButton @click="open = true">Open Dialog</OlButton>
        <OlDialog v-model:open="open" title="Dialog Title" description="This is a description of the dialog content.">
          <p>Dialog body content goes here.</p>
          <template #footer>
            <OlButton variant="outline" @click="open = false">Cancel</OlButton>
            <OlButton @click="open = false">Save</OlButton>
          </template>
        </OlDialog>
      </div>
    `,
  }),
}

export const WithTriggerSlot: Story = {
  render: () => ({
    components: { OlDialog, OlButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <OlDialog v-model:open="open" title="Triggered Dialog">
        <template #trigger>
          <OlButton>Trigger Slot</OlButton>
        </template>
        <p>Opened via trigger slot.</p>
      </OlDialog>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { OlDialog, OlButton },
    setup() {
      const openSize = ref<string | null>(null)
      return { openSize }
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <OlButton v-for="s in ['sm', 'md', 'lg', 'xl', 'full']" :key="s" variant="outline" @click="openSize = s">{{ s }}</OlButton>
        <OlDialog v-for="s in ['sm', 'md', 'lg', 'xl', 'full']" :key="s" :open="openSize === s" :size="s" :title="'Size: ' + s" @update:open="openSize = null">
          <p>Content for {{ s }} dialog.</p>
        </OlDialog>
      </div>
    `,
  }),
}
