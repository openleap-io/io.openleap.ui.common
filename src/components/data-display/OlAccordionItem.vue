<script setup lang="ts">
import {
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from 'reka-ui'
import { cn } from '@/lib/cn'

const props = defineProps<{
  value: string
  class?: string
}>()
</script>

<template>
  <AccordionItem
    :value="value"
    :class="cn('border-b border-[var(--ol-border-default)]', props.class)"
  >
    <AccordionHeader class="flex">
      <AccordionTrigger
        :class="cn(
          'flex flex-1 items-center justify-between py-3 text-sm font-medium transition-all',
          'text-[var(--ol-text-primary)] hover:text-[var(--ol-text-primary)]/80',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)]',
          '[&[data-state=open]>svg]:rotate-180',
        )"
      >
        <slot name="trigger" />
        <svg
          class="size-4 shrink-0 text-[var(--ol-text-muted)] transition-transform duration-200"
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
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent
      class="overflow-hidden text-sm text-[var(--ol-text-secondary)] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    >
      <div class="pb-4">
        <slot />
      </div>
    </AccordionContent>
  </AccordionItem>
</template>
