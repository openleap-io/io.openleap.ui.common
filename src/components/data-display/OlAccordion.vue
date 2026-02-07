<script setup lang="ts">
import { AccordionRoot } from 'reka-ui'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  collapsible?: boolean
  class?: string
}>(), {
  type: 'single',
  collapsible: true,
})
</script>

<template>
  <AccordionRoot
    :type="type"
    :default-value="defaultValue"
    :collapsible="collapsible"
    :class="cn('w-full', props.class)"
  >
    <slot />
  </AccordionRoot>
</template>
