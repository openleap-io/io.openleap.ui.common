<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(defineProps<{
  label: string
  collapsible?: boolean
  class?: string
}>(), {
  collapsible: false,
})

const expanded = ref(true)
</script>

<template>
  <div :class="cn('mb-2', props.class)">
    <button
      v-if="collapsible"
      type="button"
      class="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--ol-text-muted)] hover:text-[var(--ol-text-secondary)]"
      @click="expanded = !expanded"
    >
      <span class="flex-1 text-left">{{ label }}</span>
      <svg
        class="size-3.5 transition-transform duration-200"
        :class="{ 'rotate-180': !expanded }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
    <span
      v-else
      class="block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--ol-text-muted)]"
    >
      {{ label }}
    </span>

    <div v-show="expanded" class="mt-0.5 space-y-0.5">
      <slot />
    </div>
  </div>
</template>
