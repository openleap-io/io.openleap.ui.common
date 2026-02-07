<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--ol-bg-tertiary)] text-[var(--ol-text-primary)]',
        outline: 'border border-[var(--ol-border-default)] text-[var(--ol-text-secondary)]',
        filled:  'bg-[var(--ol-bg-inverse)] text-[var(--ol-text-inverse)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const props = withDefaults(defineProps<{
  variant?: 'default' | 'outline' | 'filled'
  class?: string
}>(), {
  variant: 'default',
})

const classes = computed(() => cn(badgeVariants({ variant: props.variant }), props.class))
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
