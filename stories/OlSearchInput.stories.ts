import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlSearchInput } from '@/components/input'

const meta: Meta<typeof OlSearchInput> = {
  title: 'Components/Input/OlSearchInput',
  component: OlSearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    loading: { control: 'boolean' },
    debounceMs: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof OlSearchInput>

export const Default: Story = {
  render: (args) => ({
    components: { OlSearchInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<OlSearchInput v-bind="args" v-model="value" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { OlSearchInput },
    setup() {
      const value = ref('Example search')
      return { value }
    },
    template: '<OlSearchInput v-model="value" />',
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { OlSearchInput },
    setup() {
      const value = ref('searching...')
      return { value }
    },
    template: '<OlSearchInput v-model="value" :loading="true" />',
  }),
}
