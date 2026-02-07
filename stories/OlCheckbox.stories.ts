import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlCheckbox } from '@/components/checkbox'

const meta: Meta<typeof OlCheckbox> = {
  title: 'Components/Checkbox/OlCheckbox',
  component: OlCheckbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof OlCheckbox>

export const Default: Story = {
  render: (args) => ({
    components: { OlCheckbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<OlCheckbox v-bind="args" v-model="checked" label="Accept terms" />',
  }),
}

export const Checked: Story = {
  render: () => ({
    components: { OlCheckbox },
    setup() {
      const checked = ref(true)
      return { checked }
    },
    template: '<OlCheckbox v-model="checked" label="Already checked" />',
  }),
}

export const Indeterminate: Story = {
  render: () => ({
    components: { OlCheckbox },
    template: '<OlCheckbox :indeterminate="true" label="Select all (some selected)" />',
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { OlCheckbox },
    template: '<OlCheckbox :disabled="true" label="Disabled checkbox" />',
  }),
}
