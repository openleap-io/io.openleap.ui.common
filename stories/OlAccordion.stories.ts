import type { Meta, StoryObj } from '@storybook/vue3'
import { OlAccordion, OlAccordionItem } from '@/components/data-display'

const meta: Meta<typeof OlAccordion> = {
  title: 'Components/DataDisplay/OlAccordion',
  component: OlAccordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
  },
}

export default meta
type Story = StoryObj<typeof OlAccordion>

export const Default: Story = {
  render: () => ({
    components: { OlAccordion, OlAccordionItem },
    template: `
      <OlAccordion type="single" default-value="item-1" style="max-width: 500px;">
        <OlAccordionItem value="item-1">
          <template #trigger>Is it accessible?</template>
          Yes. It adheres to the WAI-ARIA design pattern.
        </OlAccordionItem>
        <OlAccordionItem value="item-2">
          <template #trigger>Is it styled?</template>
          Yes. It comes with default styles using our design tokens.
        </OlAccordionItem>
        <OlAccordionItem value="item-3">
          <template #trigger>Is it animated?</template>
          Yes. It uses CSS animations for smooth open/close transitions.
        </OlAccordionItem>
      </OlAccordion>
    `,
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { OlAccordion, OlAccordionItem },
    template: `
      <OlAccordion type="multiple" style="max-width: 500px;">
        <OlAccordionItem value="item-1">
          <template #trigger>First section</template>
          Content for the first section.
        </OlAccordionItem>
        <OlAccordionItem value="item-2">
          <template #trigger>Second section</template>
          Content for the second section.
        </OlAccordionItem>
      </OlAccordion>
    `,
  }),
}
