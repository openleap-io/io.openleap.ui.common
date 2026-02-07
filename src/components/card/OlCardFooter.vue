<script setup lang="ts">
import { cn } from '@/lib/cn'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex items-center gap-2 pt-3', $props.class)">
    <slot />
  </div>
</template>
