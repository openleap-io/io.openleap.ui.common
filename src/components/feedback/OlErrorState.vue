<script setup lang="ts">
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  class?: string
}>(), {
  title: 'Something went wrong',
})

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div :class="cn('flex flex-col items-center justify-center py-12 text-center', props.class)">
    <!-- AlertTriangle icon -->
    <div class="mb-4 text-[var(--ol-status-error)]">
      <svg class="size-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    </div>

    <h3 class="text-sm font-semibold text-[var(--ol-text-primary)]">
      {{ title }}
    </h3>

    <p v-if="description" class="mt-1 max-w-sm text-sm text-[var(--ol-text-muted)]">
      {{ description }}
    </p>

    <div class="mt-4">
      <slot name="action">
        <button
          type="button"
          class="rounded-md bg-[var(--ol-bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--ol-text-primary)] transition-colors hover:bg-[var(--ol-border)]"
          @click="emit('retry')"
        >
          Try again
        </button>
      </slot>
    </div>
  </div>
</template>
