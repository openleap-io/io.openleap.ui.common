<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  inline?: boolean
  copyable?: boolean
  class?: string
}>(), {
  inline: true,
  copyable: false,
})

const copied = ref(false)

async function copy() {
  const el = props.inline
    ? document.querySelector('[data-ol-code-inline]')
    : document.querySelector('[data-ol-code-block]')
  const text = el?.textContent || ''
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Clipboard API not available
  }
}
</script>

<template>
  <code
    v-if="inline"
    data-ol-code-inline
    :class="cn(
      'rounded bg-[var(--ol-bg-tertiary)] px-1.5 py-0.5 font-mono text-[0.875em] text-[var(--ol-text-primary)]',
      props.class,
    )"
  >
    <slot />
  </code>

  <div v-else class="relative">
    <pre
      :class="cn(
        'overflow-x-auto rounded-lg bg-[var(--ol-bg-tertiary)] p-4 font-mono text-sm text-[var(--ol-text-primary)]',
        props.class,
      )"
    ><code data-ol-code-block><slot /></code></pre>
    <button
      v-if="copyable"
      type="button"
      class="absolute right-2 top-2 rounded-md border border-[var(--ol-border)] bg-[var(--ol-bg-primary)] p-1.5 text-[var(--ol-text-muted)] transition-colors hover:bg-[var(--ol-bg-tertiary)] hover:text-[var(--ol-text-primary)]"
      aria-label="Copy code"
      @click="copy"
    >
      <svg v-if="!copied" class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
      <svg v-else class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </button>
  </div>
</template>
