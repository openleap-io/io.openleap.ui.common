<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  hoverable?: boolean
  clickable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  class?: string
}>(), {
  hoverable: false,
  clickable: false,
  padding: 'md',
})

const paddingClasses: Record<string, string> = {
  none: '',
  sm:   'p-3',
  md:   'p-4',
  lg:   'p-6',
}

const classes = computed(() => cn(
  'rounded-lg border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] text-[var(--ol-text-primary)] shadow-sm',
  paddingClasses[props.padding],
  props.hoverable && 'transition-shadow hover:shadow-md',
  props.clickable && 'cursor-pointer',
  props.class,
))
</script>

<template>
  <div :class="classes" :role="clickable ? 'button' : undefined" :tabindex="clickable ? 0 : undefined">
    <slot />
  </div>
</template>
