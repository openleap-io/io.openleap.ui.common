<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/lib/cn'
import type { Size } from '@/lib/types'

const props = withDefaults(defineProps<{
  src?: string
  name?: string
  size?: Size
  class?: string
}>(), {
  size: 'md',
})

const imgFailed = ref(false)

const initials = computed(() => {
  if (!props.name) return '?'
  const parts = props.name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
})

function hashHue(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % 360
}

const fallbackBg = computed(() => {
  if (!props.name) return 'hsl(0, 0%, 60%)'
  const hue = hashHue(props.name)
  return `hsl(${hue}, 55%, 55%)`
})

const showFallback = computed(() => !props.src || imgFailed.value)

const sizeClasses: Record<Size, string> = {
  sm: 'size-7 text-xs',
  md: 'size-9 text-sm',
  lg: 'size-12 text-base',
}
</script>

<template>
  <span
    :class="cn(
      'inline-flex items-center justify-center rounded-full overflow-hidden font-medium text-white shrink-0',
      sizeClasses[size],
      props.class,
    )"
    :style="showFallback ? { backgroundColor: fallbackBg } : undefined"
  >
    <img
      v-if="src && !imgFailed"
      :src="src"
      :alt="name || 'Avatar'"
      class="size-full object-cover"
      @error="imgFailed = true"
    />
    <span v-else aria-hidden="true">{{ initials }}</span>
  </span>
</template>
