<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  collapsed?: boolean
  width?: string
  collapsedWidth?: string
  class?: string
}>(), {
  collapsed: false,
  width: '240px',
  collapsedWidth: '56px',
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const currentWidth = computed(() => props.collapsed ? props.collapsedWidth : props.width)
</script>

<template>
  <aside
    :class="cn(
      'flex flex-col border-r border-[var(--ol-border)] bg-[var(--ol-bg-secondary)] transition-[width] duration-200 overflow-hidden',
      props.class,
    )"
    :style="{ width: currentWidth }"
  >
    <div v-if="$slots.header" class="shrink-0 border-b border-[var(--ol-border)] p-3">
      <slot name="header" :collapsed="collapsed" />
    </div>

    <nav class="flex-1 overflow-y-auto p-2">
      <slot :collapsed="collapsed" />
    </nav>

    <div v-if="$slots.footer" class="shrink-0 border-t border-[var(--ol-border)] p-3">
      <slot name="footer" :collapsed="collapsed" />
    </div>
  </aside>
</template>
