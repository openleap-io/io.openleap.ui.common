import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlSwitch } from '@/components/checkbox'

const meta: Meta<typeof OlSwitch> = {
  title: 'Components/Checkbox/OlSwitch',
  component: OlSwitch,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof OlSwitch>

export const Default: Story = {
  render: (args) => ({
    components: { OlSwitch },
    setup() {
      const enabled = ref(false)
      return { args, enabled }
    },
    template: '<OlSwitch v-bind="args" v-model="enabled" label="Enable notifications" />',
  }),
}

export const On: Story = {
  render: () => ({
    components: { OlSwitch },
    setup() {
      const enabled = ref(true)
      return { enabled }
    },
    template: '<OlSwitch v-model="enabled" label="Enabled" />',
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { OlSwitch },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <OlSwitch :disabled="true" label="Disabled off" />
        <OlSwitch :disabled="true" :model-value="true" label="Disabled on" />
      </div>
    `,
  }),
}
