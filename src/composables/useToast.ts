import { inject } from 'vue'
import type { ToastContext } from '../components/toast/OlToastProvider.vue'
import type { ToastType } from '../lib/types'

interface ToastOptions {
  description?: string
  duration?: number
}

export function useToast() {
  const context = inject<ToastContext>('ol-toast')

  if (!context) {
    throw new Error('useToast() must be used within an <OlToastProvider>')
  }

  function createToast(type: ToastType, title: string, options?: ToastOptions) {
    return context!.add({
      type,
      title,
      description: options?.description,
      duration: options?.duration,
    })
  }

  const toast = {
    success: (title: string, options?: ToastOptions) => createToast('success', title, options),
    error: (title: string, options?: ToastOptions) => createToast('error', title, options),
    warning: (title: string, options?: ToastOptions) => createToast('warning', title, options),
    info: (title: string, options?: ToastOptions) => createToast('info', title, options),
  }

  return {
    toast,
    toasts: context.toasts,
    remove: context.remove,
  }
}
