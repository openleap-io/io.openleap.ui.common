import { onMounted, onBeforeUnmount, type Ref } from 'vue'

interface KeyboardShortcutOptions {
  enabled?: Ref<boolean>
}

function parseShortcut(shortcut: string) {
  const parts = shortcut.toLowerCase().split('+')
  return {
    mod: parts.includes('mod'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
    key: parts.filter(p => !['mod', 'shift', 'alt'].includes(p))[0] || '',
  }
}

function isInputElement(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false
  const tagName = el.tagName.toLowerCase()
  return tagName === 'input' || tagName === 'textarea' || el.isContentEditable
}

export function useKeyboardShortcut(
  shortcut: string,
  handler: () => void,
  options?: KeyboardShortcutOptions,
) {
  const parsed = parseShortcut(shortcut)
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)

  function onKeyDown(e: KeyboardEvent) {
    if (options?.enabled && !options.enabled.value) return
    if (isInputElement(e.target)) return

    const modPressed = isMac ? e.metaKey : e.ctrlKey
    if (parsed.mod && !modPressed) return
    if (parsed.shift && !e.shiftKey) return
    if (parsed.alt && !e.altKey) return

    if (e.key.toLowerCase() === parsed.key) {
      e.preventDefault()
      handler()
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('keydown', onKeyDown)
  })

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('keydown', onKeyDown)
  })
}
