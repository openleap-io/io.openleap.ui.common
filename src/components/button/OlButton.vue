<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import type { Size, IconComponent } from '@/lib/types'

const buttonVariants = cva(
  // Base styles applied to every button
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:     'bg-[var(--ol-bg-inverse)] text-[var(--ol-text-inverse)] hover:bg-[var(--ol-bg-inverse)]/90',
        destructive: 'bg-[var(--ol-status-error)] text-[var(--ol-text-inverse)] hover:bg-[var(--ol-status-error)]/90',
        outline:     'border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] hover:bg-[var(--ol-bg-secondary)] hover:text-[var(--ol-text-primary)]',
        secondary:   'bg-[var(--ol-bg-tertiary)] text-[var(--ol-text-primary)] hover:bg-[var(--ol-bg-tertiary)]/80',
        ghost:       'hover:bg-[var(--ol-bg-secondary)] hover:text-[var(--ol-text-primary)]',
        link:        'text-[var(--ol-text-link)] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>

const props = withDefaults(defineProps<{
  variant?: NonNullable<ButtonVariants['variant']>
  size?: Size
  loading?: boolean
  disabled?: boolean
  icon?: IconComponent
  class?: string
}>(), {
  variant: 'default',
  size: 'md',
  loading: false,
  disabled: false,
})

const attrs = useAttrs()

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
)
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    v-bind="attrs"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      data-testid="spinner"
      class="size-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>

    <!-- Leading icon -->
    <component v-else-if="icon" :is="icon" class="size-4" />

    <!-- Button content -->
    <slot />
  </button>
</template>
