import { onMounted, onBeforeUnmount, watch, type Ref } from 'vue'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  function getFocusableElements(): HTMLElement[] {
    if (!containerRef.value) return []
    return Array.from(containerRef.value.querySelectorAll(FOCUSABLE_SELECTOR))
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return

    const focusable = getFocusableElements()
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  function activate() {
    if (!containerRef.value) return
    containerRef.value.addEventListener('keydown', onKeyDown)
    const focusable = getFocusableElements()
    if (focusable.length > 0) {
      focusable[0].focus()
    }
  }

  function deactivate() {
    containerRef.value?.removeEventListener('keydown', onKeyDown)
  }

  onMounted(() => {
    if (containerRef.value) activate()
  })

  watch(containerRef, (newVal, oldVal) => {
    if (oldVal) deactivate()
    if (newVal) activate()
  })

  onBeforeUnmount(() => {
    deactivate()
  })
}
