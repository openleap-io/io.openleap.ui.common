import type { Meta, StoryObj } from '@storybook/vue3'
import { OlContextMenu } from '@/components/dropdown'
import type { MenuItem } from '@/lib/types'

const sampleItems: MenuItem[] = [
  { id: '1', label: 'Copy', shortcut: '⌘C' },
  { id: '2', label: 'Paste', shortcut: '⌘V' },
  { id: 'sep1', label: '', separator: true },
  { id: '3', label: 'Rename' },
  { id: '4', label: 'Delete', disabled: true },
]

const meta: Meta<typeof OlContextMenu> = {
  title: 'Components/Dropdown/OlContextMenu',
  component: OlContextMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlContextMenu>

export const Default: Story = {
  render: () => ({
    components: { OlContextMenu },
    setup: () => ({ sampleItems }),
    template: `
      <OlContextMenu :items="sampleItems">
        <div style="display: flex; align-items: center; justify-content: center; width: 300px; height: 150px; border: 2px dashed #ccc; border-radius: 8px; color: #888;">
          Right-click here
        </div>
      </OlContextMenu>
    `,
  }),
}
