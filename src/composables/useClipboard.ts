import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)

  async function copy(text: string) {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return

    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      setTimeout(() => { copied.value = false }, 2000)
    } catch {
      // Clipboard API not available or permission denied
    }
  }

  return {
    copy,
    copied,
  }
}
