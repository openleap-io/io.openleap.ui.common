import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlAlertDialog } from '@/components/dialog'
import { OlButton } from '@/components/button'

const meta: Meta<typeof OlAlertDialog> = {
  title: 'Components/Dialog/OlAlertDialog',
  component: OlAlertDialog,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['danger', 'warning'],
    },
  },
}

export default meta
type Story = StoryObj<typeof OlAlertDialog>

export const Danger: Story = {
  render: () => ({
    components: { OlAlertDialog, OlButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <OlButton variant="destructive" @click="open = true">Delete Item</OlButton>
        <OlAlertDialog
          v-model:open="open"
          variant="danger"
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete the item."
          confirm-label="Delete"
          cancel-label="Cancel"
          @confirm="open = false"
          @cancel="open = false"
        />
      </div>
    `,
  }),
}

export const Warning: Story = {
  render: () => ({
    components: { OlAlertDialog, OlButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <OlButton variant="outline" @click="open = true">Archive Project</OlButton>
        <OlAlertDialog
          v-model:open="open"
          variant="warning"
          title="Archive this project?"
          description="The project will be moved to the archive. You can restore it later."
          confirm-label="Archive"
          @confirm="open = false"
          @cancel="open = false"
        />
      </div>
    `,
  }),
}
