import { defineNuxtModule, addComponent, addImports, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@openleap/ui',
    configKey: 'openleapUi',
    compatibility: { nuxt: '>=3.0.0' },
  },

  defaults: {
    prefix: 'Ol',
  },

  setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // ── Auto-register components ──
    const components = [
      // Button
      { name: 'OlButton',      filePath: resolve('./components/button/OlButton.vue') },
      { name: 'OlIconButton',  filePath: resolve('./components/button/OlIconButton.vue') },
      // Badge
      { name: 'OlBadge',       filePath: resolve('./components/badge/OlBadge.vue') },
      { name: 'OlStatusBadge', filePath: resolve('./components/badge/OlStatusBadge.vue') },
      // Card
      { name: 'OlCard',        filePath: resolve('./components/card/OlCard.vue') },
      { name: 'OlCardHeader',  filePath: resolve('./components/card/OlCardHeader.vue') },
      { name: 'OlCardContent', filePath: resolve('./components/card/OlCardContent.vue') },
      { name: 'OlCardFooter',  filePath: resolve('./components/card/OlCardFooter.vue') },
      // Input
      { name: 'OlInput',       filePath: resolve('./components/input/OlInput.vue') },
      // Feedback
      { name: 'OlSkeleton',    filePath: resolve('./components/feedback/OlSkeleton.vue') },
      { name: 'OlEmptyState',  filePath: resolve('./components/feedback/OlEmptyState.vue') },
      { name: 'OlSpinner',     filePath: resolve('./components/feedback/OlSpinner.vue') },
    ]

    for (const comp of components) {
      addComponent(comp)
    }

    // ── Auto-import composables (add as they are built) ──
    // addImports([
    //   { name: 'useToast',            from: '@openleap/ui' },
    //   { name: 'useTheme',            from: '@openleap/ui' },
    //   { name: 'useKeyboardShortcut', from: '@openleap/ui' },
    // ])
  },
})
