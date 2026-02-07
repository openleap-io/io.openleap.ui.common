import type { Meta, StoryObj } from '@storybook/vue3'
import { OlDropdown } from '@/components/dropdown'
import { OlButton } from '@/components/button'
import type { MenuItem } from '@/lib/types'

const sampleItems: MenuItem[] = [
  { id: '1', label: 'Edit', shortcut: '⌘E', action: () => console.log('edit') },
  { id: '2', label: 'Duplicate', shortcut: '⌘D' },
  { id: 'sep1', label: '', separator: true },
  { id: '3', label: 'Archive' },
  { id: '4', label: 'Delete', disabled: true },
]

const meta: Meta<typeof OlDropdown> = {
  title: 'Components/Dropdown/OlDropdown',
  component: OlDropdown,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
}

export default meta
type Story = StoryObj<typeof OlDropdown>

export const Default: Story = {
  render: () => ({
    components: { OlDropdown, OlButton },
    setup: () => ({ sampleItems }),
    template: `
      <OlDropdown :items="sampleItems">
        <template #trigger>
          <OlButton variant="outline">Actions</OlButton>
        </template>
      </OlDropdown>
    `,
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { OlDropdown, OlButton },
    setup: () => ({ sampleItems }),
    template: `
      <OlDropdown :items="sampleItems" label="Actions">
        <template #trigger>
          <OlButton variant="outline">Menu with Label</OlButton>
        </template>
      </OlDropdown>
    `,
  }),
}

export const AlignEnd: Story = {
  render: () => ({
    components: { OlDropdown, OlButton },
    setup: () => ({ sampleItems }),
    template: `
      <div style="display: flex; justify-content: flex-end;">
        <OlDropdown :items="sampleItems" align="end">
          <template #trigger>
            <OlButton variant="outline">Align End</OlButton>
          </template>
        </OlDropdown>
      </div>
    `,
  }),
}
