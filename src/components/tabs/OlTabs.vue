<script setup lang="ts">
import { TabsRoot } from 'reka-ui'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  modelValue?: string
  class?: string
}>(), {
  modelValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <TabsRoot
    :model-value="modelValue"
    :class="cn('w-full', props.class)"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <slot />
  </TabsRoot>
</template>
