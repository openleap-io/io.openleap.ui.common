import type { Meta, StoryObj } from '@storybook/vue3'
import { OlButton, OlButtonGroup } from '@/components/button'

const meta: Meta<typeof OlButtonGroup> = {
  title: 'Components/Button/OlButtonGroup',
  component: OlButtonGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlButtonGroup>

export const Horizontal: Story = {
  render: () => ({
    components: { OlButton, OlButtonGroup },
    template: `
      <OlButtonGroup>
        <OlButton variant="outline">Left</OlButton>
        <OlButton variant="outline">Center</OlButton>
        <OlButton variant="outline">Right</OlButton>
      </OlButtonGroup>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { OlButton, OlButtonGroup },
    template: `
      <OlButtonGroup orientation="vertical">
        <OlButton variant="outline">Top</OlButton>
        <OlButton variant="outline">Middle</OlButton>
        <OlButton variant="outline">Bottom</OlButton>
      </OlButtonGroup>
    `,
  }),
}
