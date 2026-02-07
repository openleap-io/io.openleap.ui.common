<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'
import type { Size } from '@/lib/types'

const props = withDefaults(defineProps<{
  size?: Size
  class?: string
}>(), {
  size: 'md',
})

const sizeClasses: Record<Size, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
}
</script>

<template>
  <svg
    :class="cn('animate-spin text-[var(--ol-text-muted)]', sizeClasses[size], props.class)"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="status"
    aria-label="Loading"
  >
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
</template>
