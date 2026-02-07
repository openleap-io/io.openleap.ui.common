import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlCommandPalette } from '@/components/navigation'
import type { CommandGroup } from '@/lib/types'

const meta: Meta<typeof OlCommandPalette> = {
  title: 'Components/Navigation/OlCommandPalette',
  component: OlCommandPalette,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlCommandPalette>

const groups: CommandGroup[] = [
  {
    heading: 'Actions',
    items: [
      { id: 'new-file', label: 'New File', shortcut: 'Ctrl+N' },
      { id: 'open', label: 'Open File', shortcut: 'Ctrl+O' },
      { id: 'save', label: 'Save', shortcut: 'Ctrl+S' },
    ],
  },
  {
    heading: 'Navigation',
    items: [
      { id: 'dashboard', label: 'Go to Dashboard' },
      { id: 'settings', label: 'Go to Settings' },
      { id: 'profile', label: 'Go to Profile' },
    ],
  },
]

export const Default: Story = {
  render: () => ({
    components: { OlCommandPalette },
    setup() {
      const open = ref(true)
      return { open, groups }
    },
    template: `
      <div>
        <button @click="open = true">Open Command Palette</button>
        <OlCommandPalette v-model:open="open" :groups="groups" />
      </div>
    `,
  }),
}
