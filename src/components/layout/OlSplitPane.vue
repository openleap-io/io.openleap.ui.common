<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
  class?: string
}>(), {
  direction: 'horizontal',
})
</script>

<template>
  <Splitpanes
    :horizontal="direction === 'vertical'"
    :class="cn('splitpanes-ol', props.class)"
  >
    <slot />
  </Splitpanes>
</template>

<style>
.splitpanes-ol .splitpanes__splitter {
  background-color: var(--ol-border, #e5e7eb);
  position: relative;
  transition: background-color 150ms;
}
.splitpanes-ol .splitpanes__splitter:hover {
  background-color: var(--ol-border-focus, #3b82f6);
}
.splitpanes-ol.splitpanes--horizontal > .splitpanes__splitter {
  width: 1px;
  min-width: 1px;
}
.splitpanes-ol.splitpanes--vertical > .splitpanes__splitter {
  height: 1px;
  min-height: 1px;
}
</style>
