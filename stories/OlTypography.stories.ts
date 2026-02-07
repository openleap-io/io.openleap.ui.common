import type { Meta, StoryObj } from '@storybook/vue3'
import { OlHeading, OlText, OlCode } from '@/components/typography'

const meta: Meta = {
  title: 'Components/Typography',
  tags: ['autodocs'],
}

export default meta

export const Headings: StoryObj = {
  render: () => ({
    components: { OlHeading },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <OlHeading :level="1">Heading 1</OlHeading>
        <OlHeading :level="2">Heading 2</OlHeading>
        <OlHeading :level="3">Heading 3</OlHeading>
        <OlHeading :level="4">Heading 4</OlHeading>
        <OlHeading :level="5">Heading 5</OlHeading>
        <OlHeading :level="6">Heading 6</OlHeading>
      </div>
    `,
  }),
}

export const TextVariants: StoryObj = {
  render: () => ({
    components: { OlText },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <OlText>Default paragraph text.</OlText>
        <OlText size="sm" color="secondary">Small secondary text.</OlText>
        <OlText size="xs" color="muted">Extra small muted text.</OlText>
        <OlText size="lg" weight="semibold">Large semibold text.</OlText>
        <OlText as="span" weight="medium">Inline span with medium weight.</OlText>
      </div>
    `,
  }),
}

export const InlineCode: StoryObj = {
  render: () => ({
    components: { OlText, OlCode },
    template: `
      <OlText>
        Use the <OlCode>cn()</OlCode> utility for class merging.
      </OlText>
    `,
  }),
}

export const CodeBlock: StoryObj = {
  render: () => ({
    components: { OlCode },
    template: `
      <OlCode :inline="false" copyable>import { OlButton } from '@openleap-io/ui'</OlCode>
    `,
  }),
}
