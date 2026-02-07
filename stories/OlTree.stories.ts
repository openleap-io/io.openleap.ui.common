import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlTree } from '@/components/data-display'

const meta: Meta<typeof OlTree> = {
  title: 'Components/DataDisplay/OlTree',
  component: OlTree,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlTree>

const treeItems = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'button', label: 'Button.vue' },
          { id: 'input', label: 'Input.vue' },
        ],
      },
      { id: 'utils', label: 'utils.ts' },
    ],
  },
  {
    id: 'tests',
    label: 'tests',
    children: [
      { id: 'unit', label: 'unit', children: [{ id: 'button-test', label: 'Button.test.ts' }] },
    ],
  },
  { id: 'readme', label: 'README.md' },
]

export const Default: Story = {
  render: () => ({
    components: { OlTree },
    setup() {
      const expandedKeys = ref(['src', 'components'])
      const selectedKey = ref('button')
      return { treeItems, expandedKeys, selectedKey }
    },
    template: `
      <OlTree
        :items="treeItems"
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKey="selectedKey"
        style="width: 300px;"
      />
    `,
  }),
}
