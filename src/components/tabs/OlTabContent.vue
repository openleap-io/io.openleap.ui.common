<script setup lang="ts">
import { TabsContent } from 'reka-ui'
import { cn } from '@/lib/cn'

const props = defineProps<{
  value: string
  class?: string
}>()
</script>

<template>
  <TabsContent
    :value="value"
    :class="cn(
      'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-2',
      props.class,
    )"
  >
    <slot />
  </TabsContent>
</template>
