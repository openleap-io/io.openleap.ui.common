<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { cn } from '@/lib/cn'
import type { ToastType } from '@/lib/types'

const props = withDefaults(defineProps<{
  type?: ToastType
  title?: string
  description?: string
  duration?: number
  class?: string
}>(), {
  type: 'info',
  duration: 5000,
})

const emit = defineEmits<{
  'close': []
}>()

const progress = ref(100)
let startTime = 0
let animationFrame = 0

const typeStyles: Record<ToastType, string> = {
  success: 'border-l-4 border-l-emerald-500',
  error: 'border-l-4 border-l-[var(--ol-status-error)]',
  warning: 'border-l-4 border-l-amber-500',
  info: 'border-l-4 border-l-blue-500',
}

const progressColor: Record<ToastType, string> = {
  success: 'bg-emerald-500',
  error: 'bg-[var(--ol-status-error)]',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
}

const iconColor: Record<ToastType, string> = {
  success: 'text-emerald-500',
  error: 'text-[var(--ol-status-error)]',
  warning: 'text-amber-500',
  info: 'text-blue-500',
}

const progressWidth = computed(() => `${progress.value}%`)

function tick(now: number) {
  const elapsed = now - startTime
  progress.value = Math.max(0, 100 - (elapsed / props.duration) * 100)
  if (progress.value <= 0) {
    emit('close')
    return
  }
  animationFrame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (props.duration > 0) {
    startTime = performance.now()
    animationFrame = requestAnimationFrame(tick)
  }
})

onBeforeUnmount(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div
    role="alert"
    :class="cn(
      'pointer-events-auto relative flex w-full overflow-hidden rounded-md border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] shadow-lg',
      typeStyles[type],
      props.class,
    )"
  >
    <div class="flex flex-1 items-start gap-3 p-4">
      <!-- Type icon -->
      <div :class="cn('mt-0.5 shrink-0', iconColor[type])">
        <!-- Success: CheckCircle -->
        <svg v-if="type === 'success'" class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
        </svg>
        <!-- Error: XCircle -->
        <svg v-else-if="type === 'error'" class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
        </svg>
        <!-- Warning: AlertTriangle -->
        <svg v-else-if="type === 'warning'" class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" />
        </svg>
        <!-- Info: Info -->
        <svg v-else class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <p v-if="title" class="text-sm font-semibold text-[var(--ol-text-primary)]">{{ title }}</p>
        <p v-if="description" class="mt-1 text-sm text-[var(--ol-text-muted)]">{{ description }}</p>
      </div>

      <!-- Close button -->
      <button
        type="button"
        class="shrink-0 rounded-sm text-[var(--ol-text-muted)] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ol-border-focus)]"
        aria-label="Close notification"
        @click="emit('close')"
      >
        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Progress bar -->
    <div
      v-if="duration > 0"
      class="absolute bottom-0 left-0 h-0.5"
      :class="progressColor[type]"
      :style="{ width: progressWidth }"
    />
  </div>
</template>
