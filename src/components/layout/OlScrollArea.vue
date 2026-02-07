<script setup lang="ts">
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from 'reka-ui'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  orientation?: 'vertical' | 'horizontal' | 'both'
  class?: string
}>(), {
  orientation: 'vertical',
})

const scrollbarClasses = 'flex touch-none select-none transition-colors data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2'
const thumbClasses = 'relative flex-1 rounded-full bg-[var(--ol-border-default)] opacity-50 hover:opacity-70'
</script>

<template>
  <ScrollAreaRoot :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport class="size-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar
      v-if="orientation === 'vertical' || orientation === 'both'"
      orientation="vertical"
      :class="scrollbarClasses"
    >
      <ScrollAreaThumb :class="thumbClasses" />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar
      v-if="orientation === 'horizontal' || orientation === 'both'"
      orientation="horizontal"
      :class="scrollbarClasses"
    >
      <ScrollAreaThumb :class="thumbClasses" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
