<script setup lang="ts">
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui'
import { cn } from '@/lib/cn'

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

const props = withDefaults(defineProps<{
  open?: boolean
  title?: string
  description?: string
  size?: DialogSize
  class?: string
}>(), {
  open: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const sizeClasses: Record<DialogSize, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[500px]',
  lg: 'max-w-[640px]',
  xl: 'max-w-[780px]',
  full: 'max-w-[95vw]',
}
</script>

<template>
  <DialogRoot
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      />
      <DialogContent
        :class="cn(
          'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] p-6 shadow-lg',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          sizeClasses[size],
          props.class,
        )"
      >
        <!-- Header -->
        <div class="space-y-1.5">
          <DialogTitle v-if="title" class="text-lg font-semibold text-[var(--ol-text-primary)]">
            {{ title }}
          </DialogTitle>
          <DialogDescription v-if="description" class="text-sm text-[var(--ol-text-muted)]">
            {{ description }}
          </DialogDescription>
        </div>

        <!-- Body -->
        <div class="mt-4">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="mt-6 flex justify-end gap-2">
          <slot name="footer" />
        </div>

        <!-- Close button -->
        <DialogClose
          class="absolute right-4 top-4 rounded-sm text-[var(--ol-text-muted)] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)]"
          aria-label="Close"
        >
          <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
