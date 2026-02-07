<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  label?: string
  disabled?: boolean
  class?: string
}>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function onCheckedChange(value: boolean) {
  emit('update:modelValue', value)
}
</script>

<template>
  <label :class="cn('inline-flex items-center gap-2', disabled && 'cursor-not-allowed opacity-50', props.class)">
    <SwitchRoot
      :model-value="modelValue"
      :disabled="disabled"
      :class="cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        'data-[state=checked]:bg-[var(--ol-bg-inverse)]',
        'data-[state=unchecked]:bg-[var(--ol-bg-tertiary)]',
      )"
      @update:model-value="onCheckedChange"
    >
      <SwitchThumb
        :class="cn(
          'pointer-events-none block size-4 rounded-full bg-[var(--ol-bg-primary)] shadow-sm ring-0 transition-transform',
          'data-[state=checked]:translate-x-4',
          'data-[state=unchecked]:translate-x-0',
        )"
      />
    </SwitchRoot>
    <span v-if="label" class="text-sm text-[var(--ol-text-primary)]">{{ label }}</span>
  </label>
</template>
