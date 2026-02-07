<script setup lang="ts">
import { computed } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectIcon,
} from 'reka-ui'
import { cn } from '@/lib/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: string
  class?: string
}>(), {
  modelValue: '',
  options: () => [],
  placeholder: 'Select...',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onValueChange(value: string) {
  emit('update:modelValue', value)
}

const triggerClasses = computed(() =>
  cn(
    'flex h-9 w-full items-center justify-between rounded-md border bg-[var(--ol-bg-primary)] px-3 py-1 text-sm transition-colors',
    'placeholder:text-[var(--ol-text-muted)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
    props.error
      ? 'border-[var(--ol-status-error)] focus-visible:ring-[var(--ol-status-error)]'
      : 'border-[var(--ol-border-default)]',
    props.class,
  )
)
</script>

<template>
  <div class="space-y-1">
    <SelectRoot
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="onValueChange"
    >
      <SelectTrigger :class="triggerClasses" aria-label="Select option">
        <SelectValue :placeholder="placeholder" />
        <SelectIcon>
          <svg
            class="size-4 text-[var(--ol-text-muted)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          :side-offset="4"
          class="z-50 min-w-[var(--reka-select-trigger-width)] overflow-hidden rounded-md border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] shadow-md"
        >
          <SelectViewport class="p-1">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
              :class="cn(
                'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
                'data-[highlighted]:bg-[var(--ol-bg-secondary)] data-[highlighted]:text-[var(--ol-text-primary)]',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              )"
            >
              <span class="absolute left-2 flex size-4 items-center justify-center">
                <SelectItemIndicator>
                  <svg
                    class="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </SelectItemIndicator>
              </span>
              <SelectItemText>{{ option.label }}</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <p v-if="error" class="text-xs text-[var(--ol-status-error)]">{{ error }}</p>
  </div>
</template>
