import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlSidebar, OlSidebarItem, OlSidebarGroup } from '@/components/navigation'

const meta: Meta<typeof OlSidebar> = {
  title: 'Components/Navigation/OlSidebar',
  component: OlSidebar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlSidebar>

export const Default: Story = {
  render: () => ({
    components: { OlSidebar, OlSidebarItem, OlSidebarGroup },
    setup() {
      const collapsed = ref(false)
      return { collapsed }
    },
    template: `
      <div style="height: 400px; display: flex;">
        <OlSidebar v-model:collapsed="collapsed">
          <template #header>
            <button @click="collapsed = !collapsed" style="font-size: 12px;">Toggle</button>
          </template>

          <OlSidebarGroup label="Main">
            <OlSidebarItem label="Dashboard" :active="true" />
            <OlSidebarItem label="Projects" to="/projects" badge="3" />
            <OlSidebarItem label="Tasks" to="/tasks" />
          </OlSidebarGroup>

          <OlSidebarGroup label="Settings" collapsible>
            <OlSidebarItem label="Profile" to="/profile" />
            <OlSidebarItem label="Preferences" to="/preferences" />
          </OlSidebarGroup>

          <template #footer>
            <span style="font-size: 12px; color: gray;">v1.0.0</span>
          </template>
        </OlSidebar>
        <div style="flex: 1; padding: 16px;">Main content area</div>
      </div>
    `,
  }),
}
