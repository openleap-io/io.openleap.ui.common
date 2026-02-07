<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  label?: string
  indeterminate?: boolean
  disabled?: boolean
  class?: string
}>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checked = computed(() => {
  if (props.indeterminate) return 'indeterminate'
  return props.modelValue
})

function onCheckedChange(value: boolean | 'indeterminate') {
  if (typeof value === 'boolean') {
    emit('update:modelValue', value)
  }
}
</script>

<template>
  <label :class="cn('inline-flex items-center gap-2', disabled && 'cursor-not-allowed opacity-50', props.class)">
    <CheckboxRoot
      :model-value="checked"
      :disabled="disabled"
      :class="cn(
        'peer size-4 shrink-0 rounded border border-[var(--ol-border-default)] transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-1',
        'data-[state=checked]:bg-[var(--ol-bg-inverse)] data-[state=checked]:border-[var(--ol-bg-inverse)] data-[state=checked]:text-[var(--ol-text-inverse)]',
        'data-[state=indeterminate]:bg-[var(--ol-bg-inverse)] data-[state=indeterminate]:border-[var(--ol-bg-inverse)] data-[state=indeterminate]:text-[var(--ol-text-inverse)]',
        'disabled:cursor-not-allowed',
      )"
      @update:model-value="onCheckedChange"
    >
      <CheckboxIndicator class="flex items-center justify-center">
        <!-- Check icon -->
        <svg
          v-if="!indeterminate"
          class="size-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <!-- Minus icon for indeterminate -->
        <svg
          v-else
          class="size-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14" />
        </svg>
      </CheckboxIndicator>
    </CheckboxRoot>
    <span v-if="label" class="text-sm text-[var(--ol-text-primary)]">{{ label }}</span>
  </label>
</template>
