<script setup lang="ts">
import { cn } from '@/lib/cn'

defineProps<{
  class?: string
  rounded?: boolean
}>()
</script>

<template>
  <div
    :class="cn(
      'animate-pulse bg-[var(--ol-bg-tertiary)]',
      rounded ? 'rounded-full' : 'rounded-md',
      $props.class,
    )"
  />
</template>
