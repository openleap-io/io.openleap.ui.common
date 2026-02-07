import type { Preview } from '@storybook/vue3'
import '../src/tokens/base.css'
import '../src/tokens/elara.css'
import '../src/tokens/telos.css'
import '../src/tokens/dark.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    product: {
      name: 'Product',
      description: 'Product theme',
      defaultValue: 'telos',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'telos', title: 'Telos' },
          { value: 'elara', title: 'Elara' },
        ],
        dynamicTitle: true,
      },
    },
    darkMode: {
      name: 'Dark Mode',
      description: 'Toggle dark mode',
      defaultValue: false,
      toolbar: {
        icon: 'moon',
        items: [
          { value: false, title: 'Light' },
          { value: true, title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => ({
      setup() {
        const product = context.globals.product || 'telos'
        const dark = context.globals.darkMode || false
        return { product, dark }
      },
      template: `
        <div
          :data-product="product"
          :class="{ dark }"
          style="padding: 2rem; min-height: 100px;"
          :style="{ background: dark ? '#09090B' : '#FFFFFF', color: dark ? '#FAFAFA' : '#18181B' }"
        >
          <story />
        </div>
      `,
    }),
  ],
}

export default preview
