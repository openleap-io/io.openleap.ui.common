import type { Meta, StoryObj } from '@storybook/vue3'
import { OlAvatar, OlAvatarGroup } from '@/components/avatar'

const meta: Meta<typeof OlAvatar> = {
  title: 'Components/Avatar/OlAvatar',
  component: OlAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof OlAvatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=alice',
    name: 'Alice Johnson',
    size: 'md',
  },
}

export const WithInitials: Story = {
  args: {
    name: 'Bob Smith',
    size: 'md',
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { OlAvatar },
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <OlAvatar name="Alice" size="sm" />
        <OlAvatar name="Alice" size="md" />
        <OlAvatar name="Alice" size="lg" />
      </div>
    `,
  }),
}

export const Group: Story = {
  render: () => ({
    components: { OlAvatar, OlAvatarGroup },
    template: `
      <OlAvatarGroup :max="3" size="md">
        <OlAvatar name="Alice Johnson" />
        <OlAvatar name="Bob Smith" />
        <OlAvatar name="Carol White" />
        <OlAvatar name="Dave Brown" />
        <OlAvatar name="Eve Davis" />
      </OlAvatarGroup>
    `,
  }),
}
