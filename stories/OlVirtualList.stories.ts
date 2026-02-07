import type { Meta, StoryObj } from '@storybook/vue3'
import { OlVirtualList } from '@/components/data-display'

const meta: Meta<typeof OlVirtualList> = {
  title: 'Components/DataDisplay/OlVirtualList',
  component: OlVirtualList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlVirtualList>

export const Default: Story = {
  render: () => ({
    components: { OlVirtualList },
    setup() {
      const items = Array.from({ length: 10000 }, (_, i) => ({ id: i, label: `Item ${i + 1}` }))
      return { items }
    },
    template: `
      <OlVirtualList
        :items="items"
        :item-height="40"
        style="height: 400px; width: 300px; border: 1px solid #ccc; border-radius: 8px;"
      >
        <template #item="{ item, index }">
          <div style="padding: 8px 16px; border-bottom: 1px solid #eee;">
            {{ item.label }}
          </div>
        </template>
      </OlVirtualList>
    `,
  }),
}
