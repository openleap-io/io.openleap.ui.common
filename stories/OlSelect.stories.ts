import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlSelect } from '@/components/select'

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragonfruit', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
]

const meta: Meta<typeof OlSelect> = {
  title: 'Components/Select/OlSelect',
  component: OlSelect,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof OlSelect>

export const Default: Story = {
  render: (args) => ({
    components: { OlSelect },
    setup() {
      const value = ref('')
      return { args, value, sampleOptions }
    },
    template: '<OlSelect v-bind="args" v-model="value" :options="sampleOptions" placeholder="Pick a fruit..." />',
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { OlSelect },
    setup() {
      const value = ref('')
      return { value, sampleOptions }
    },
    template: '<OlSelect v-model="value" :options="sampleOptions" error="Please select an option" />',
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { OlSelect },
    setup() {
      const value = ref('apple')
      return { value, sampleOptions }
    },
    template: '<OlSelect v-model="value" :options="sampleOptions" :disabled="true" />',
  }),
}
