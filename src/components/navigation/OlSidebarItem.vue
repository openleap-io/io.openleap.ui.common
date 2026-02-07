<script setup lang="ts">
import type { Component } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  icon?: Component
  label: string
  to?: string
  active?: boolean
  badge?: string | number
  class?: string
}>(), {
  active: false,
})
</script>

<template>
  <component
    :is="to ? 'a' : 'button'"
    :href="to || undefined"
    :type="to ? undefined : 'button'"
    :class="cn(
      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
      active
        ? 'bg-[var(--ol-bg-tertiary)] font-semibold text-[var(--ol-text-primary)]'
        : 'text-[var(--ol-text-secondary)] hover:bg-[var(--ol-bg-tertiary)] hover:text-[var(--ol-text-primary)]',
      props.class,
    )"
  >
    <component
      v-if="icon"
      :is="icon"
      class="size-5 shrink-0"
    />
    <span class="flex-1 truncate text-left">{{ label }}</span>
    <span
      v-if="badge != null"
      class="ml-auto shrink-0 rounded-full bg-[var(--ol-bg-tertiary)] px-2 py-0.5 text-xs font-medium text-[var(--ol-text-secondary)]"
    >
      {{ badge }}
    </span>
  </component>
</template>
