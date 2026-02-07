import type { Meta, StoryObj } from '@storybook/vue3'
import { OlSplitPane } from '@/components/layout'
import { Pane } from 'splitpanes'

const meta: Meta<typeof OlSplitPane> = {
  title: 'Components/Layout/OlSplitPane',
  component: OlSplitPane,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlSplitPane>

export const Horizontal: Story = {
  render: () => ({
    components: { OlSplitPane, Pane },
    template: `
      <OlSplitPane style="height: 300px;">
        <Pane :size="30">
          <div style="padding: 16px; background: #f1f5f9; height: 100%;">Left Pane</div>
        </Pane>
        <Pane :size="70">
          <div style="padding: 16px; height: 100%;">Right Pane</div>
        </Pane>
      </OlSplitPane>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { OlSplitPane, Pane },
    template: `
      <OlSplitPane direction="vertical" style="height: 400px;">
        <Pane :size="40">
          <div style="padding: 16px; background: #f1f5f9; height: 100%;">Top Pane</div>
        </Pane>
        <Pane :size="60">
          <div style="padding: 16px; height: 100%;">Bottom Pane</div>
        </Pane>
      </OlSplitPane>
    `,
  }),
}
