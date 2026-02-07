<script setup lang="ts">
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from 'reka-ui'
import { cn } from '@/lib/cn'

type AlertVariant = 'danger' | 'warning'

const props = withDefaults(defineProps<{
  open?: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: AlertVariant
  class?: string
}>(), {
  open: false,
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'danger',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'confirm': []
  'cancel': []
}>()

const confirmClasses: Record<AlertVariant, string> = {
  danger: 'bg-[var(--ol-status-error)] text-[var(--ol-text-inverse)] hover:bg-[var(--ol-status-error)]/90',
  warning: 'bg-amber-500 text-white hover:bg-amber-500/90',
}

function onConfirm() {
  emit('confirm')
  emit('update:open', false)
}

function onCancel() {
  emit('cancel')
  emit('update:open', false)
}
</script>

<template>
  <AlertDialogRoot
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <AlertDialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>

    <AlertDialogPortal>
      <AlertDialogOverlay
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      />
      <AlertDialogContent
        :class="cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] p-6 shadow-lg',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          props.class,
        )"
      >
        <AlertDialogTitle v-if="title" class="text-lg font-semibold text-[var(--ol-text-primary)]">
          {{ title }}
        </AlertDialogTitle>
        <AlertDialogDescription v-if="description" class="mt-2 text-sm text-[var(--ol-text-muted)]">
          {{ description }}
        </AlertDialogDescription>

        <div class="mt-6 flex justify-end gap-2">
          <AlertDialogCancel
            :class="cn(
              'inline-flex h-9 items-center justify-center rounded-md border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] px-4 text-sm font-medium transition-colors',
              'hover:bg-[var(--ol-bg-secondary)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-2',
            )"
            @click="onCancel"
          >
            {{ cancelLabel }}
          </AlertDialogCancel>
          <AlertDialogAction
            :class="cn(
              'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)] focus-visible:ring-offset-2',
              confirmClasses[variant],
            )"
            @click="onConfirm"
          >
            {{ confirmLabel }}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
