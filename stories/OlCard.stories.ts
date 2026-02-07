import type { Meta, StoryObj } from '@storybook/vue3'
import { OlCard, OlCardHeader, OlCardContent, OlCardFooter } from '@/components/card'
import { OlButton } from '@/components/button'

const meta: Meta<typeof OlCard> = {
  title: 'Components/Card/OlCard',
  component: OlCard,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof OlCard>

export const Default: Story = {
  render: () => ({
    components: { OlCard, OlCardHeader, OlCardContent, OlCardFooter },
    template: `
      <OlCard style="max-width: 400px;">
        <OlCardHeader>
          <h3 style="font-weight: 600;">Card Title</h3>
          <p style="color: var(--ol-text-secondary); font-size: 14px;">Card description text</p>
        </OlCardHeader>
        <OlCardContent>
          <p>This is the main content area of the card component.</p>
        </OlCardContent>
        <OlCardFooter>
          <span style="font-size: 14px; color: var(--ol-text-muted);">Footer content</span>
        </OlCardFooter>
      </OlCard>
    `,
  }),
}

export const WithActions: Story = {
  render: () => ({
    components: { OlCard, OlCardHeader, OlCardContent, OlCardFooter, OlButton },
    template: `
      <OlCard style="max-width: 400px;">
        <OlCardHeader>
          <h3 style="font-weight: 600;">Confirm Action</h3>
        </OlCardHeader>
        <OlCardContent>
          <p>Are you sure you want to proceed with this action?</p>
        </OlCardContent>
        <OlCardFooter>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <OlButton variant="outline" size="sm">Cancel</OlButton>
            <OlButton size="sm">Confirm</OlButton>
          </div>
        </OlCardFooter>
      </OlCard>
    `,
  }),
}

export const Hoverable: Story = {
  render: () => ({
    components: { OlCard, OlCardContent },
    template: `
      <OlCard :hoverable="true" style="max-width: 300px;">
        <OlCardContent>
          <p>Hover over this card to see the shadow effect.</p>
        </OlCardContent>
      </OlCard>
    `,
  }),
}

export const PaddingSizes: Story = {
  render: () => ({
    components: { OlCard, OlCardContent },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <OlCard padding="none" style="max-width: 200px;">
          <OlCardContent>No padding</OlCardContent>
        </OlCard>
        <OlCard padding="sm" style="max-width: 200px;">
          <OlCardContent>Small padding</OlCardContent>
        </OlCard>
        <OlCard padding="md" style="max-width: 200px;">
          <OlCardContent>Medium padding</OlCardContent>
        </OlCard>
        <OlCard padding="lg" style="max-width: 200px;">
          <OlCardContent>Large padding</OlCardContent>
        </OlCard>
      </div>
    `,
  }),
}
