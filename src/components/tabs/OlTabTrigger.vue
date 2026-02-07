<script setup lang="ts">
import { TabsTrigger } from 'reka-ui'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  value: string
  disabled?: boolean
  class?: string
}>(), {
  disabled: false,
})
</script>

<template>
  <TabsTrigger
    :value="value"
    :disabled="disabled"
    :class="cn(
      'relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors',
      'text-[var(--ol-text-muted)] hover:text-[var(--ol-text-primary)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:text-[var(--ol-text-primary)]',
      'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transition-colors',
      'data-[state=active]:after:bg-[var(--ol-bg-inverse)]',
      props.class,
    )"
  >
    <slot />
  </TabsTrigger>
</template>
