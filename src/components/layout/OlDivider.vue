<script setup lang="ts">
import { cn } from '@/lib/cn'
import type { Orientation } from '@/lib/types'

const props = withDefaults(defineProps<{
  orientation?: Orientation
  label?: string
  class?: string
}>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <!-- Horizontal with label -->
  <div
    v-if="orientation === 'horizontal' && label"
    :class="cn('flex items-center gap-3', props.class)"
    role="separator"
    aria-orientation="horizontal"
  >
    <div class="h-px flex-1 bg-[var(--ol-border-default)]" />
    <span class="text-xs text-[var(--ol-text-muted)]">{{ label }}</span>
    <div class="h-px flex-1 bg-[var(--ol-border-default)]" />
  </div>

  <!-- Horizontal without label -->
  <div
    v-else-if="orientation === 'horizontal'"
    :class="cn('h-px w-full bg-[var(--ol-border-default)]', props.class)"
    role="separator"
    aria-orientation="horizontal"
  />

  <!-- Vertical -->
  <div
    v-else
    :class="cn('w-px self-stretch bg-[var(--ol-border-default)]', props.class)"
    role="separator"
    aria-orientation="vertical"
  />
</template>
