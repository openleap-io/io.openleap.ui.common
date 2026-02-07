<script setup lang="ts">
import { cn } from '@/lib/cn'

type TextSize = 'xs' | 'sm' | 'base' | 'lg'
type TextWeight = 'normal' | 'medium' | 'semibold'
type TextColor = 'primary' | 'secondary' | 'muted'
type TextAs = 'p' | 'span' | 'div'

const props = withDefaults(defineProps<{
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  as?: TextAs
  class?: string
}>(), {
  size: 'base',
  weight: 'normal',
  color: 'primary',
  as: 'p',
})

const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
}

const weightClasses: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
}

const colorClasses: Record<TextColor, string> = {
  primary: 'text-[var(--ol-text-primary)]',
  secondary: 'text-[var(--ol-text-secondary)]',
  muted: 'text-[var(--ol-text-muted)]',
}
</script>

<template>
  <component
    :is="as"
    :class="cn(
      sizeClasses[size],
      weightClasses[weight],
      colorClasses[color],
      props.class,
    )"
  >
    <slot />
  </component>
</template>
