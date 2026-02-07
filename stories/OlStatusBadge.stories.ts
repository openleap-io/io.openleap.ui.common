import type { Meta, StoryObj } from '@storybook/vue3'
import { OlStatusBadge } from '@/components/badge'

const meta: Meta<typeof OlStatusBadge> = {
  title: 'Components/Badge/OlStatusBadge',
  component: OlStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['active', 'planned', 'development', 'deprecated', 'retired', 'error', 'warning', 'info', 'draft'],
    },
  },
}

export default meta
type Story = StoryObj<typeof OlStatusBadge>

export const Default: Story = {
  args: { status: 'active' },
}

export const AllStatuses: Story = {
  render: () => ({
    components: { OlStatusBadge },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <OlStatusBadge status="active" />
        <OlStatusBadge status="development" />
        <OlStatusBadge status="planned" />
        <OlStatusBadge status="draft" />
        <OlStatusBadge status="deprecated" />
        <OlStatusBadge status="retired" />
        <OlStatusBadge status="error" />
        <OlStatusBadge status="warning" />
        <OlStatusBadge status="info" />
      </div>
    `,
  }),
}
