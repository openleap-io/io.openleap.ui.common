<script setup lang="ts">
import { cn } from '@/lib/cn'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

const props = withDefaults(defineProps<{
  level?: HeadingLevel
  class?: string
}>(), {
  level: 2,
})

const sizeClasses: Record<HeadingLevel, string> = {
  1: 'text-3xl',
  2: 'text-2xl',
  3: 'text-xl',
  4: 'text-lg',
  5: 'text-base',
  6: 'text-sm',
}
</script>

<template>
  <component
    :is="`h${level}`"
    :class="cn(
      'font-semibold tracking-tight text-[var(--ol-text-primary)]',
      sizeClasses[level],
      props.class,
    )"
  >
    <slot />
  </component>
</template>
