import type { Meta, StoryObj } from '@storybook/vue3'
import { inject } from 'vue'
import { OlToast, OlToastProvider } from '@/components/toast'
import { OlButton } from '@/components/button'
import type { ToastContext } from '@/components/toast'

const meta: Meta<typeof OlToast> = {
  title: 'Components/Toast/OlToast',
  component: OlToast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
  },
}

export default meta
type Story = StoryObj<typeof OlToast>

export const AllTypes: Story = {
  render: () => ({
    components: { OlToast },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 380px;">
        <OlToast type="success" title="Success" description="Operation completed successfully." :duration="0" />
        <OlToast type="error" title="Error" description="Something went wrong." :duration="0" />
        <OlToast type="warning" title="Warning" description="Proceed with caution." :duration="0" />
        <OlToast type="info" title="Info" description="Here is some useful information." :duration="0" />
      </div>
    `,
  }),
}

export const WithProvider: Story = {
  render: () => ({
    components: { OlToastProvider, OlButton },
    setup() {
      return {
        triggerToast(type: string) {
          const ctx = inject<ToastContext>('ol-toast')
          ctx?.add({ type: type as any, title: `${type} toast`, description: 'This is a toast notification.' })
        },
      }
    },
    template: `
      <OlToastProvider position="bottom-right">
        <div style="display: flex; gap: 8px;">
          <OlButton variant="outline" @click="triggerToast('success')">Success</OlButton>
          <OlButton variant="outline" @click="triggerToast('error')">Error</OlButton>
          <OlButton variant="outline" @click="triggerToast('warning')">Warning</OlButton>
          <OlButton variant="outline" @click="triggerToast('info')">Info</OlButton>
        </div>
      </OlToastProvider>
    `,
  }),
}
