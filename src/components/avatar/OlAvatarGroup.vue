<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { cn } from '@/lib/cn'
import type { Size } from '@/lib/types'

const props = withDefaults(defineProps<{
  max?: number
  size?: Size
  class?: string
}>(), {
  max: 3,
  size: 'md',
})

const slots = useSlots()

const children = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []
  // Flatten fragments
  return defaultSlot.flatMap(node =>
    node.type === Symbol.for('v-fgt') ? (node.children as any[]) || [] : [node]
  )
})

const visible = computed(() => children.value.slice(0, props.max))
const overflow = computed(() => Math.max(0, children.value.length - props.max))

const sizeClasses: Record<Size, string> = {
  sm: 'size-7 text-xs',
  md: 'size-9 text-sm',
  lg: 'size-12 text-base',
}
</script>

<template>
  <div
    :class="cn(
      'flex items-center -space-x-2',
      props.class,
    )"
  >
    <component
      :is="child"
      v-for="(child, i) in visible"
      :key="i"
      class="ring-2 ring-[var(--ol-bg-primary)] rounded-full"
    />
    <span
      v-if="overflow > 0"
      :class="cn(
        'inline-flex items-center justify-center rounded-full bg-[var(--ol-bg-tertiary)] text-[var(--ol-text-secondary)] font-medium ring-2 ring-[var(--ol-bg-primary)]',
        sizeClasses[size],
      )"
    >
      +{{ overflow }}
    </span>
  </div>
</template>
