<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  loading?: boolean
  debounceMs?: number
  class?: string
}>(), {
  modelValue: '',
  placeholder: 'Search...',
  loading: false,
  debounceMs: 300,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [value: string]
}>()

const inputRef = ref<HTMLInputElement>()
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)

  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', value)
  }, props.debounceMs)
}

function clear() {
  emit('update:modelValue', '')
  emit('search', '')
  if (debounceTimer) clearTimeout(debounceTimer)
  inputRef.value?.focus()
}

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

watch(() => props.debounceMs, () => {
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<template>
  <div class="relative">
    <!-- Search icon / loading spinner -->
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--ol-text-muted)]">
      <svg
        v-if="loading"
        data-testid="search-spinner"
        class="size-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <svg
        v-else
        data-testid="search-icon"
        class="size-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </div>

    <input
      ref="inputRef"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :class="cn(
        'flex h-9 w-full rounded-md border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] pl-9 pr-3 py-1 text-sm transition-colors',
        'placeholder:text-[var(--ol-text-muted)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-1',
        modelValue && 'pr-8',
        props.class,
      )"
      @input="onInput"
    />

    <!-- Clear button -->
    <button
      v-if="modelValue"
      type="button"
      data-testid="clear-button"
      class="absolute inset-y-0 right-0 flex items-center pr-2.5 text-[var(--ol-text-muted)] hover:text-[var(--ol-text-secondary)]"
      @click="clear"
      aria-label="Clear search"
    >
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
