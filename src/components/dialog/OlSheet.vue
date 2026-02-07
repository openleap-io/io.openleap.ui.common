<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'reka-ui'
import { cn } from '@/lib/cn'

type SheetSide = 'left' | 'right'
type SheetSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  open?: boolean
  title?: string
  side?: SheetSide
  size?: SheetSize
  class?: string
}>(), {
  open: false,
  side: 'right',
  size: 'md',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const sizeClasses: Record<SheetSize, string> = {
  sm: 'w-[320px]',
  md: 'w-[400px]',
  lg: 'w-[540px]',
}

const sideClasses: Record<SheetSide, string> = {
  left: 'inset-y-0 left-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  right: 'inset-y-0 right-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
}
</script>

<template>
  <DialogRoot
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      />
      <DialogContent
        :class="cn(
          'fixed z-50 flex h-full flex-col border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] shadow-lg transition-transform',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          sideClasses[side],
          sizeClasses[size],
          props.class,
        )"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-[var(--ol-border-default)] px-6 py-4">
          <DialogTitle v-if="title" class="text-lg font-semibold text-[var(--ol-text-primary)]">
            {{ title }}
          </DialogTitle>
          <DialogClose
            class="rounded-sm text-[var(--ol-text-muted)] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)]"
            aria-label="Close"
          >
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </DialogClose>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
