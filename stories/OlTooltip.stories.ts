import type { Meta, StoryObj } from '@storybook/vue3'
import { OlTooltip, OlTooltipProvider } from '@/components/tooltip'
import { OlButton } from '@/components/button'

const meta: Meta<typeof OlTooltip> = {
  title: 'Components/Tooltip/OlTooltip',
  component: OlTooltip,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    content: { control: 'text' },
    delayMs: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof OlTooltip>

export const Default: Story = {
  render: () => ({
    components: { OlTooltip, OlTooltipProvider, OlButton },
    template: `
      <OlTooltipProvider>
        <OlTooltip content="This is a tooltip">
          <OlButton variant="outline">Hover me</OlButton>
        </OlTooltip>
      </OlTooltipProvider>
    `,
  }),
}

export const AllSides: Story = {
  render: () => ({
    components: { OlTooltip, OlTooltipProvider, OlButton },
    template: `
      <OlTooltipProvider>
        <div style="display: flex; gap: 16px; padding: 64px; justify-content: center;">
          <OlTooltip content="Top tooltip" side="top">
            <OlButton variant="outline">Top</OlButton>
          </OlTooltip>
          <OlTooltip content="Right tooltip" side="right">
            <OlButton variant="outline">Right</OlButton>
          </OlTooltip>
          <OlTooltip content="Bottom tooltip" side="bottom">
            <OlButton variant="outline">Bottom</OlButton>
          </OlTooltip>
          <OlTooltip content="Left tooltip" side="left">
            <OlButton variant="outline">Left</OlButton>
          </OlTooltip>
        </div>
      </OlTooltipProvider>
    `,
  }),
}
