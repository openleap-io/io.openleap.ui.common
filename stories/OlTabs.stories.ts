import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { OlTabs, OlTabList, OlTabTrigger, OlTabContent } from '@/components/tabs'

const meta: Meta<typeof OlTabs> = {
  title: 'Components/Tabs/OlTabs',
  component: OlTabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlTabs>

export const Default: Story = {
  render: () => ({
    components: { OlTabs, OlTabList, OlTabTrigger, OlTabContent },
    setup() {
      const tab = ref('account')
      return { tab }
    },
    template: `
      <OlTabs v-model="tab">
        <OlTabList>
          <OlTabTrigger value="account">Account</OlTabTrigger>
          <OlTabTrigger value="password">Password</OlTabTrigger>
          <OlTabTrigger value="settings">Settings</OlTabTrigger>
        </OlTabList>
        <OlTabContent value="account">
          <p>Manage your account settings and preferences.</p>
        </OlTabContent>
        <OlTabContent value="password">
          <p>Change your password here.</p>
        </OlTabContent>
        <OlTabContent value="settings">
          <p>Configure your application settings.</p>
        </OlTabContent>
      </OlTabs>
    `,
  }),
}

export const WithDisabledTab: Story = {
  render: () => ({
    components: { OlTabs, OlTabList, OlTabTrigger, OlTabContent },
    setup() {
      const tab = ref('general')
      return { tab }
    },
    template: `
      <OlTabs v-model="tab">
        <OlTabList>
          <OlTabTrigger value="general">General</OlTabTrigger>
          <OlTabTrigger value="advanced" :disabled="true">Advanced</OlTabTrigger>
          <OlTabTrigger value="billing">Billing</OlTabTrigger>
        </OlTabList>
        <OlTabContent value="general"><p>General settings.</p></OlTabContent>
        <OlTabContent value="advanced"><p>Advanced settings.</p></OlTabContent>
        <OlTabContent value="billing"><p>Billing info.</p></OlTabContent>
      </OlTabs>
    `,
  }),
}
