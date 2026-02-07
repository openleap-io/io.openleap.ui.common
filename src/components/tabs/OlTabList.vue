<script setup lang="ts">
import { TabsList } from 'reka-ui'
import { cn } from '@/lib/cn'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <TabsList
    :class="cn(
      'inline-flex w-full items-center border-b border-[var(--ol-border-default)]',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
