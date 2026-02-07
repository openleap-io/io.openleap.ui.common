<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  items: any[]
  itemHeight: number
  overscan?: number
  class?: string
}>(), {
  overscan: 5,
})

const containerRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const containerHeight = ref(0)

const totalHeight = computed(() => props.items.length * props.itemHeight)

const visibleRange = computed(() => {
  const start = Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.overscan)
  const visibleCount = Math.ceil(containerHeight.value / props.itemHeight)
  const end = Math.min(props.items.length, start + visibleCount + props.overscan * 2)
  return { start, end }
})

const visibleItems = computed(() => {
  const { start, end } = visibleRange.value
  return props.items.slice(start, end).map((item, i) => ({
    item,
    index: start + i,
    offset: (start + i) * props.itemHeight,
  }))
})

function onScroll() {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop
  }
}

let observer: ResizeObserver | null = null

onMounted(() => {
  if (containerRef.value) {
    containerHeight.value = containerRef.value.clientHeight
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerHeight.value = entry.contentRect.height
      }
    })
    observer.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('overflow-auto', props.class)"
    @scroll="onScroll"
  >
    <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
      <div
        v-for="{ item, index, offset } in visibleItems"
        :key="index"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: `${itemHeight}px`,
          transform: `translateY(${offset}px)`,
        }"
      >
        <slot name="item" :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>
