<script setup lang="ts">
import { cn } from '@/lib/cn'
import type { IconComponent } from '@/lib/types'

defineProps<{
  icon?: IconComponent
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex flex-col items-center justify-center py-12 text-center', $props.class)">
    <!-- Icon -->
    <div v-if="icon || $slots.icon" class="mb-4 text-[var(--ol-text-muted)]">
      <slot name="icon">
        <component :is="icon" class="size-12" />
      </slot>
    </div>

    <!-- Title -->
    <h3 v-if="$slots.title" class="text-sm font-semibold text-[var(--ol-text-primary)]">
      <slot name="title" />
    </h3>

    <!-- Description -->
    <p v-if="$slots.description" class="mt-1 max-w-sm text-sm text-[var(--ol-text-muted)]">
      <slot name="description" />
    </p>

    <!-- Action -->
    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>
