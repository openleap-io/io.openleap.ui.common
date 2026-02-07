<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/lib/cn'
import type { IconComponent } from '@/lib/types'

const props = withDefaults(defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  icon?: IconComponent
  error?: string
  clearable?: boolean
  disabled?: boolean
  class?: string
}>(), {
  modelValue: '',
  type: 'text',
  clearable: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = ref<HTMLInputElement>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function clear() {
  emit('update:modelValue', '')
  inputRef.value?.focus()
}
</script>

<template>
  <div class="space-y-1">
    <div class="relative">
      <!-- Leading icon -->
      <div v-if="icon" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--ol-text-muted)]">
        <component :is="icon" class="size-4" />
      </div>

      <input
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="cn(
          'flex h-9 w-full rounded-md border bg-[var(--ol-bg-primary)] px-3 py-1 text-sm transition-colors',
          'placeholder:text-[var(--ol-text-muted)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-[var(--ol-status-error)] focus-visible:ring-[var(--ol-status-error)]'
            : 'border-[var(--ol-border-default)]',
          icon && 'pl-9',
          clearable && modelValue && 'pr-8',
          props.class,
        )"
        @input="onInput"
      />

      <!-- Clear button -->
      <button
        v-if="clearable && modelValue"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-2.5 text-[var(--ol-text-muted)] hover:text-[var(--ol-text-secondary)]"
        @click="clear"
        aria-label="Clear input"
      >
        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Error message -->
    <p v-if="error" class="text-xs text-[var(--ol-status-error)]">{{ error }}</p>
  </div>
</template>
