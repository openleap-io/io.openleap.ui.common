<script setup lang="ts">
import { cn } from '@/lib/cn'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex items-start justify-between gap-4', $props.class)">
    <div class="space-y-1">
      <h3 class="text-sm font-semibold leading-none tracking-tight">
        <slot name="title" />
      </h3>
      <p v-if="$slots.description" class="text-xs text-[var(--ol-text-muted)]">
        <slot name="description" />
      </p>
    </div>
    <div v-if="$slots.actions" class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
