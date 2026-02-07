<script setup lang="ts">
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  label: string
  color?: string
  removable?: boolean
  class?: string
}>(), {
  removable: false,
})

const emit = defineEmits<{
  'remove': []
}>()
</script>

<template>
  <span
    :class="cn(
      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
      color || 'bg-[var(--ol-bg-tertiary)] text-[var(--ol-text-primary)]',
      props.class,
    )"
  >
    {{ label }}
    <button
      v-if="removable"
      type="button"
      class="ml-0.5 inline-flex size-3.5 items-center justify-center rounded-full transition-colors hover:bg-black/10"
      aria-label="Remove tag"
      @click="emit('remove')"
    >
      <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>
