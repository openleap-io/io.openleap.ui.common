<script setup lang="ts">
import { ref, provide, readonly } from 'vue'
import { cn } from '@/lib/cn'
import type { ToastType } from '@/lib/types'
import OlToast from './OlToast.vue'

export interface ToastItem {
  id: string
  type: ToastType
  title?: string
  description?: string
  duration?: number
}

export interface ToastContext {
  add: (toast: Omit<ToastItem, 'id'>) => string
  remove: (id: string) => void
  toasts: ReturnType<typeof readonly<typeof toasts>>
}

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

const props = withDefaults(defineProps<{
  position?: ToastPosition
  maxVisible?: number
}>(), {
  position: 'bottom-right',
  maxVisible: 5,
})

const toasts = ref<ToastItem[]>([])
let counter = 0

function add(toast: Omit<ToastItem, 'id'>): string {
  const id = `toast-${++counter}`
  toasts.value.push({ ...toast, id })
  // Trim to maxVisible
  if (toasts.value.length > props.maxVisible) {
    toasts.value = toasts.value.slice(-props.maxVisible)
  }
  return id
}

function remove(id: string) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

const context: ToastContext = {
  add,
  remove,
  toasts: readonly(toasts),
}

provide('ol-toast', context)

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
}
</script>

<template>
  <slot />

  <Teleport to="body">
    <div
      :class="cn(
        'fixed z-[100] flex w-full max-w-[380px] flex-col gap-2 pointer-events-none',
        positionClasses[position],
      )"
    >
      <TransitionGroup
        name="toast"
        tag="div"
        class="flex flex-col gap-2"
      >
        <OlToast
          v-for="toast in toasts"
          :key="toast.id"
          :type="toast.type"
          :title="toast.title"
          :description="toast.description"
          :duration="toast.duration"
          @close="remove(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}
.toast-leave-active {
  transition: all 0.2s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
