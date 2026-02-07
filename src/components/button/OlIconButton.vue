<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import type { Size, Variant, IconComponent } from '@/lib/types'

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:   'bg-[var(--ol-bg-inverse)] text-[var(--ol-text-inverse)] hover:bg-[var(--ol-bg-inverse)]/90',
        outline:   'border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] hover:bg-[var(--ol-bg-secondary)]',
        ghost:     'hover:bg-[var(--ol-bg-secondary)]',
      },
      size: {
        sm: 'size-8',
        md: 'size-9',
        lg: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  },
)

const props = withDefaults(defineProps<{
  icon: IconComponent
  tooltip: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: Size
  disabled?: boolean
  class?: string
}>(), {
  variant: 'ghost',
  size: 'md',
  disabled: false,
})

const classes = computed(() =>
  cn(iconButtonVariants({ variant: props.variant, size: props.size }), props.class)
)

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'size-3.5'
    case 'lg': return 'size-5'
    default:   return 'size-4'
  }
})
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
    :aria-label="tooltip"
    :title="tooltip"
  >
    <component :is="icon" :class="iconSize" />
  </button>
</template>
