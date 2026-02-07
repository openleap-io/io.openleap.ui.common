<script setup lang="ts">
import { cn } from '@/lib/cn'
import type { Orientation } from '@/lib/types'

const props = withDefaults(defineProps<{
  orientation?: Orientation
  class?: string
}>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <div
    role="group"
    :class="cn(
      'inline-flex',
      orientation === 'horizontal'
        ? '[&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:-ml-px'
        : 'flex-col [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:-mt-px',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
