import type { Meta, StoryObj } from '@storybook/vue3'
import { OlTag } from '@/components/badge'

const meta: Meta<typeof OlTag> = {
  title: 'Components/Badge/OlTag',
  component: OlTag,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    removable: { control: 'boolean' },
    color: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof OlTag>

export const Default: Story = {
  args: {
    label: 'Tag',
  },
  render: (args) => ({
    components: { OlTag },
    setup: () => ({ args }),
    template: '<OlTag v-bind="args" />',
  }),
}

export const Removable: Story = {
  render: () => ({
    components: { OlTag },
    template: `
      <div style="display: flex; gap: 8px;">
        <OlTag label="Vue" :removable="true" />
        <OlTag label="React" :removable="true" />
        <OlTag label="Svelte" :removable="true" />
      </div>
    `,
  }),
}

export const CustomColors: Story = {
  render: () => ({
    components: { OlTag },
    template: `
      <div style="display: flex; gap: 8px;">
        <OlTag label="Success" color="bg-emerald-100 text-emerald-800" />
        <OlTag label="Warning" color="bg-amber-100 text-amber-800" />
        <OlTag label="Error" color="bg-red-100 text-red-800" />
        <OlTag label="Info" color="bg-blue-100 text-blue-800" />
      </div>
    `,
  }),
}
