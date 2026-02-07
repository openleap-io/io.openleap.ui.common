import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlTextarea } from '@/components/input'

const meta: Meta<typeof OlTextarea> = {
  title: 'Components/Input/OlTextarea',
  component: OlTextarea,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: 'number' },
    autoResize: { control: 'boolean' },
    maxLength: { control: 'number' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof OlTextarea>

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
    rows: 3,
  },
  render: (args) => ({
    components: { OlTextarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<OlTextarea v-bind="args" v-model="value" />',
  }),
}

export const WithMaxLength: Story = {
  render: () => ({
    components: { OlTextarea },
    setup() {
      const value = ref('Hello world')
      return { value }
    },
    template: '<OlTextarea v-model="value" :max-length="100" placeholder="Max 100 characters" />',
  }),
}

export const AutoResize: Story = {
  render: () => ({
    components: { OlTextarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: '<OlTextarea v-model="value" :auto-resize="true" placeholder="This textarea grows..." />',
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { OlTextarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: '<OlTextarea v-model="value" error="This field is required" placeholder="Required field" />',
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { OlTextarea },
    template: '<OlTextarea model-value="Cannot edit this" :disabled="true" />',
  }),
}
