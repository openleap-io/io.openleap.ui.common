<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

type ProgressVariant = 'default' | 'success' | 'warning' | 'error'

const props = withDefaults(defineProps<{
  value?: number
  variant?: ProgressVariant
  showLabel?: boolean
  class?: string
}>(), {
  variant: 'default',
  showLabel: false,
})

const isIndeterminate = computed(() => props.value === undefined || props.value === null)

const clampedValue = computed(() =>
  isIndeterminate.value ? 0 : Math.max(0, Math.min(100, props.value!))
)

const variantColors: Record<ProgressVariant, string> = {
  default: 'bg-[var(--ol-accent)]',
  success: 'bg-[var(--ol-status-success)]',
  warning: 'bg-[var(--ol-status-warning)]',
  error: 'bg-[var(--ol-status-error)]',
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div
      class="relative h-2 w-full overflow-hidden rounded-full bg-[var(--ol-bg-tertiary)]"
      role="progressbar"
      :aria-valuenow="isIndeterminate ? undefined : clampedValue"
      :aria-valuemin="0"
      :aria-valuemax="100"
    >
      <!-- Determinate fill -->
      <div
        v-if="!isIndeterminate"
        :class="cn('h-full rounded-full transition-[width] duration-300', variantColors[variant])"
        :style="{ width: `${clampedValue}%` }"
      />
      <!-- Indeterminate shimmer -->
      <div
        v-else
        :class="cn('absolute inset-0 h-full w-1/3 animate-[progress-shimmer_1.5s_ease-in-out_infinite] rounded-full', variantColors[variant])"
      />
    </div>
    <span
      v-if="showLabel && !isIndeterminate"
      class="mt-1 block text-xs text-[var(--ol-text-muted)]"
    >
      {{ clampedValue }}%
    </span>
  </div>
</template>

<style>
@keyframes progress-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
</style>
