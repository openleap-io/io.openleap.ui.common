<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  rows?: number
  autoResize?: boolean
  maxLength?: number
  error?: string
  disabled?: boolean
  class?: string
}>(), {
  modelValue: '',
  rows: 3,
  autoResize: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement>()

function onInput(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
}

function resize() {
  if (!props.autoResize || !textareaRef.value) return
  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
}

watch(() => props.modelValue, () => {
  if (props.autoResize) nextTick(resize)
})

const charCount = computed(() => props.modelValue.length)
</script>

<template>
  <div class="space-y-1">
    <textarea
      ref="textareaRef"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :maxlength="maxLength"
      :class="cn(
        'flex w-full rounded-md border bg-[var(--ol-bg-primary)] px-3 py-2 text-sm transition-colors',
        'placeholder:text-[var(--ol-text-muted)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        autoResize && 'resize-none overflow-hidden',
        error
          ? 'border-[var(--ol-status-error)] focus-visible:ring-[var(--ol-status-error)]'
          : 'border-[var(--ol-border-default)]',
        props.class,
      )"
      @input="onInput"
      @focus="resize"
    />

    <div class="flex justify-between">
      <p v-if="error" class="text-xs text-[var(--ol-status-error)]">{{ error }}</p>
      <span v-else />
      <span
        v-if="maxLength !== undefined"
        class="text-xs text-[var(--ol-text-muted)]"
      >
        {{ charCount }}/{{ maxLength }}
      </span>
    </div>
  </div>
</template>
